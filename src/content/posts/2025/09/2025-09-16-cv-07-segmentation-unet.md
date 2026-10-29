---
title: "Computer Vision · Segmentation and U-Net"
categories: ["study"]
tags: ["computer-vision", "segmentation", "unet"]
summary: "Semantic segmentation as per-pixel classification, the U-Net encoder–decoder with skip connections, Dice/IoU, and a tiny U-Net trained on synthetic shapes."
sources: 
  - title: "Ronneberger, Fischer & Brox (2015), U-Net: Convolutional Networks for Biomedical Image Segmentation"
    url: "https://arxiv.org/abs/1505.04597"
    publisher: "arXiv"
    fetched_at: "2026-10-29T19:07:45.568Z"
  - title: "Dive into Deep Learning: Semantic Segmentation and the Dataset"
    url: "https://d2l.ai/chapter_computer-vision/semantic-segmentation-and-dataset.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T19:07:46.145Z"
  - title: "torch.nn.ConvTranspose2d"
    url: "https://docs.pytorch.org/docs/stable/generated/torch.nn.ConvTranspose2d.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T19:07:46.618Z"
highlights: ["Segmentation classifies every pixel, so the output has the same height and width as the input.", "U-Net's skip connections hand fine spatial detail from the encoder straight to the decoder."]
phase: 10
step: 7
draft: false
date: "2025-09-16"
---

**Semantic segmentation** gives every pixel a class, so the output is a mask the same size as the image.

**U-Net** (Ronneberger, Fischer and Brox, 2015) was built for biomedical images with little training data:

- an **encoder** (convolutions + downsampling) captures *what* is in the image
- a **decoder** (upsampling + convolutions) restores *where*
- **skip connections** concatenate encoder feature maps into the decoder at the same resolution, which restores fine boundaries that downsampling loses

The overlap metrics are **IoU** and **Dice** = 2|A∩B| / (|A| + |B|).

My dataset is synthetic, so it runs on a CPU and the true masks are exact: random circles and squares on noise. The task is to segment the circles only.

```python run
import os
import numpy as np, torch, torch.nn as nn, torch.nn.functional as F
import matplotlib.pyplot as plt

torch.manual_seed(0); rng = np.random.default_rng(0); torch.set_num_threads(4)
def sample(n, S=64):
    X = rng.normal(0.2, 0.15, (n, 1, S, S)).astype(np.float32); Y = np.zeros((n, 1, S, S), np.float32)
    yy, xx = np.mgrid[:S, :S]
    for i in range(n):
        for _ in range(rng.integers(1, 4)):
            cx, cy, r = rng.integers(10, S - 10, 2).tolist() + [int(rng.integers(5, 10))]
            m = (xx - cx) ** 2 + (yy - cy) ** 2 <= r * r; X[i, 0][m] += 0.6; Y[i, 0][m] = 1
        x0, y0 = rng.integers(0, S - 14, 2); X[i, 0, y0:y0 + 12, x0:x0 + 12] += 0.6       # distractor square
    return torch.tensor(X), torch.tensor(Y)

def block(i, o): return nn.Sequential(nn.Conv2d(i, o, 3, padding=1), nn.ReLU(), nn.Conv2d(o, o, 3, padding=1), nn.ReLU())
class TinyUNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.e1, self.e2, self.mid = block(1, 16), block(16, 32), block(32, 64)
        self.u2, self.d2 = nn.ConvTranspose2d(64, 32, 2, 2), block(64, 32)
        self.u1, self.d1 = nn.ConvTranspose2d(32, 16, 2, 2), block(32, 16)
        self.out = nn.Conv2d(16, 1, 1)
    def forward(self, x):
        e1 = self.e1(x); e2 = self.e2(F.max_pool2d(e1, 2)); m = self.mid(F.max_pool2d(e2, 2))
        d2 = self.d2(torch.cat([self.u2(m), e2], 1))          # skip connection
        d1 = self.d1(torch.cat([self.u1(d2), e1], 1))         # skip connection
        return self.out(d1)

net = TinyUNet(); opt = torch.optim.Adam(net.parameters(), lr=2e-3)
for step in range(400):
    x, y = sample(16)
    opt.zero_grad(); F.binary_cross_entropy_with_logits(net(x), y).backward(); opt.step()
x, y = sample(64)
with torch.no_grad():
    p = (torch.sigmoid(net(x)) > 0.5).float()
inter = (p * y).sum(); union = ((p + y) > 0).sum()
print("output shape:", tuple(p.shape), "| IoU", round((inter / union).item(), 3), "| Dice", round((2 * inter / (p.sum() + y.sum())).item(), 3))

fig, axs = plt.subplots(3, 4, figsize=(9, 7), dpi=130)
for j in range(4):
    for i, (im, t) in enumerate([(x[j, 0], "input"), (y[j, 0], "true circles"), (p[j, 0], "U-Net output")]):
        axs[i, j].imshow(im, cmap="gray"); axs[i, j].axis("off"); axs[i, j].set_title(t, fontsize=9)
fig.tight_layout(); fig.savefig(os.environ["SNIPPET_FIG"])
```

Output:

```text
output shape: (64, 1, 64, 64) | IoU 0.938 | Dice 0.968
```

![A grid of synthetic noisy images with circles and a distractor square, the true circle masks, and the tiny U-Net's predicted masks](/images/2025/cv-07-segmentation-unet.webp)
