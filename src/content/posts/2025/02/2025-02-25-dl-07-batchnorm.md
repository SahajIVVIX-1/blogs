---
title: "Deep Learning · Batch normalisation"
categories: ["study"]
tags: ["deep-learning", "normalisation"]
summary: "Normalising each feature over the mini-batch, the learnable scale and shift, train vs eval mode, and its effect on a deep MLP."
sources: 
  - title: "Ioffe & Szegedy (2015), Batch Normalization"
    url: "https://arxiv.org/abs/1502.03167"
    publisher: "arXiv"
    fetched_at: "2026-10-29T17:55:12.308Z"
  - title: "Dive into Deep Learning: Batch Normalization"
    url: "https://d2l.ai/chapter_convolutional-modern/batch-norm.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T17:55:13.182Z"
  - title: "torch.nn.BatchNorm1d"
    url: "https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm1d.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:13.668Z"
highlights: ["BatchNorm normalises each feature using the mini-batch mean and variance, then rescales with learnable γ and β.", "In eval mode BatchNorm uses running averages, so model.eval() is not optional."]
phase: 8
step: 7
draft: false
date: "2025-02-25"
---

**Batch normalisation** (Ioffe and Szegedy, 2015) normalises each feature over the current mini-batch:

$$\hat{x} = \frac{x-\mu_B}{\sqrt{\sigma_B^2+\epsilon}}, \qquad y = \gamma\hat{x} + \beta$$

γ and β are learned, so the network can undo the normalisation if that helps.

- During **training** it uses the batch statistics and updates running averages.
- During **evaluation** it uses those running averages. Forgetting `model.eval()` changes the outputs.
- In practice it lets you train with higher learning rates and makes deep nets less sensitive to initialisation.

The comparison: a 10-layer MLP on a synthetic classification task, trained with and without BatchNorm, using the same seed and the same SGD settings.

```python run
import torch, torch.nn as nn
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=4000, n_features=20, n_informative=10, random_state=0)
X, y = torch.tensor(X, dtype=torch.float32), torch.tensor(y)

def make(bn):
    layers, d = [], 20
    for _ in range(10):
        layers += [nn.Linear(d, 64)] + ([nn.BatchNorm1d(64)] if bn else []) + [nn.ReLU()]
        d = 64
    return nn.Sequential(*layers, nn.Linear(64, 2))

for bn in (False, True):
    torch.manual_seed(0)
    net = make(bn)
    opt = torch.optim.SGD(net.parameters(), lr=0.05)
    for epoch in range(5):
        for i in range(0, 4000, 64):
            opt.zero_grad()
            nn.functional.cross_entropy(net(X[i:i + 64]), y[i:i + 64]).backward()
            opt.step()
    net.eval()
    with torch.no_grad():
        acc = (net(X).argmax(1) == y).float().mean().item()
    print(f"BatchNorm={bn}: training accuracy after 5 epochs {acc:.3f}")

bnl = nn.BatchNorm1d(3); bnl.train(); _ = bnl(torch.randn(8, 3) * 5 + 10)
print("running mean after one batch:", [round(v, 2) for v in bnl.running_mean.tolist()])
```

Output:

```text
BatchNorm=False: training accuracy after 5 epochs 0.500
BatchNorm=True: training accuracy after 5 epochs 0.972
running mean after one batch: [0.92, 1.17, 1.26]
```
