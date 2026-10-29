---
title: "Computer Vision · Transfer learning"
categories: ["study"]
tags: ["computer-vision", "transfer-learning"]
summary: "Reusing an ImageNet-pretrained ResNet-18: frozen features plus a new linear head versus training from scratch, on the 8×8 digits upsampled."
sources: 
  - title: "PyTorch tutorial: Transfer learning for computer vision"
    url: "https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T19:07:37.613Z"
  - title: "Yosinski et al. (2014), How transferable are features in deep neural networks?"
    url: "https://arxiv.org/abs/1411.1792"
    publisher: "arXiv"
    fetched_at: "2026-10-29T19:07:38.583Z"
  - title: "torchvision.models.resnet18"
    url: "https://docs.pytorch.org/vision/stable/models/generated/torchvision.models.resnet18.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T19:07:38.921Z"
  - title: "CS231n: Transfer learning"
    url: "https://cs231n.github.io/transfer-learning/"
    publisher: "Stanford CS231n"
    fetched_at: "2026-10-29T19:07:39.747Z"
highlights: ["Early CNN layers learn general features (edges, textures) that transfer to new tasks.", "Transfer helps most when the new images look like the pretraining images; tiny upsampled digits are far from ImageNet photos."]
phase: 10
step: 5
draft: false
date: "2025-09-01"
---

Training a big CNN needs a lot of data. **Transfer learning** reuses a network pretrained on ImageNet:

1. **Feature extraction**: freeze the backbone and train only a new final layer.
2. **Fine-tuning**: also update some or all of the pretrained layers, with a small learning rate.

This works because early layers learn general features like edges and textures (Yosinski et al., 2014, measured how transferability falls off with depth).

To keep it CPU-sized, I used only **200 training images**: scikit-learn's digits upsampled to 64×64 and copied into 3 channels. I compared frozen ImageNet ResNet-18 features plus logistic regression against the same architecture trained from scratch on those 200 images.

```python run
import numpy as np, torch, torch.nn as nn, torch.nn.functional as F
from torchvision.models import resnet18, ResNet18_Weights
from sklearn.datasets import load_digits
from sklearn.linear_model import LogisticRegression

torch.manual_seed(0); torch.set_num_threads(4)
X, y = load_digits(return_X_y=True)
rng = np.random.default_rng(0); idx = rng.permutation(len(X))
tr, te = idx[:200], idx[200:1000]
def prep(a):
    t = torch.tensor(a / 16.0, dtype=torch.float32).reshape(-1, 1, 8, 8)
    t = F.interpolate(t, size=64, mode="bilinear").repeat(1, 3, 1, 1)
    mean, std = torch.tensor([0.485, 0.456, 0.406]).view(1, 3, 1, 1), torch.tensor([0.229, 0.224, 0.225]).view(1, 3, 1, 1)
    return (t - mean) / std
Xtr, Xte = prep(X[tr]), prep(X[te])

backbone = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1).eval()
backbone.fc = nn.Identity()
with torch.no_grad():
    ftr, fte = backbone(Xtr).numpy(), backbone(Xte).numpy()
head = LogisticRegression(max_iter=3000).fit(ftr, y[tr])
print("pretrained features:", ftr.shape[1], "dims | frozen backbone + linear head, test acc:", round(head.score(fte, y[te]), 3))

scratch = resnet18(weights=None, num_classes=10)
opt = torch.optim.Adam(scratch.parameters(), lr=1e-3)
ytr = torch.tensor(y[tr])
for epoch in range(15):
    scratch.train()
    for i in range(0, 200, 32):
        opt.zero_grad(); F.cross_entropy(scratch(Xtr[i:i + 32]), ytr[i:i + 32]).backward(); opt.step()
scratch.eval()
with torch.no_grad():
    acc = (scratch(Xte).argmax(1).numpy() == y[te]).mean()
print("same ResNet-18 trained from scratch on 200 images, test acc:", round(float(acc), 3))
```

Output:

```text
pretrained features: 512 dims | frozen backbone + linear head, test acc: 0.919
same ResNet-18 trained from scratch on 200 images, test acc: 0.94
```

This didn't turn out the way I expected. With only 200 images, the frozen ImageNet features plus a linear head reach about 92%, a strong result for almost no training. But the network trained from scratch did slightly *better* here. My reading: 8×8 digits blown up to 64×64 look nothing like ImageNet photos, so features tuned for natural images aren't a perfect fit. Digits are also an easy task, and even a small network learns it quickly. Transfer learning shines when the target images resemble the pretraining data, or when there are far fewer labelled examples than this. Fine-tuning the backbone instead of freezing it would be the next thing to try.
