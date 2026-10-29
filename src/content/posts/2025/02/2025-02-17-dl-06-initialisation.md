---
title: "Deep Learning · Weight initialisation"
categories: ["study"]
tags: ["deep-learning", "initialisation"]
summary: "Why initial weight scale matters, Xavier/Glorot for tanh and He/Kaiming for ReLU, and watching activations explode or collapse through 50 layers."
sources: 
  - title: "Glorot & Bengio (2010), Understanding the difficulty of training deep feedforward neural networks"
    url: "https://proceedings.mlr.press/v9/glorot10a.html"
    publisher: "PMLR"
    fetched_at: "2026-10-29T17:55:08.633Z"
  - title: "He et al. (2015), Delving Deep into Rectifiers"
    url: "https://arxiv.org/abs/1502.01852"
    publisher: "arXiv"
    fetched_at: "2026-10-29T17:55:09.265Z"
  - title: "torch.nn.init"
    url: "https://docs.pytorch.org/docs/stable/nn.init.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:09.701Z"
highlights: ["Initial weights should keep the variance of activations roughly constant from layer to layer.", "He initialisation scales by √(2/fan_in) to compensate for ReLU zeroing half its inputs."]
phase: 8
step: 6
draft: false
date: "2025-02-17"
---

If the weights start too small, activations shrink toward zero layer after layer. If they start too large, they blow up. Either way, the gradients follow. The goal is to keep the **variance of activations roughly constant** through depth:

- **Xavier/Glorot** (2010): Var(w) = 2/(fan_in + fan_out). Designed for tanh and sigmoid.
- **He/Kaiming** (2015): Var(w) = 2/fan_in. The extra factor 2 compensates for ReLU zeroing about half of its inputs.

I pushed a batch through 50 layers of width 256 and printed the activation standard deviation at a few depths.

```python run
import torch

def run(act, std_fn, depth=50, width=256):
    torch.manual_seed(0)
    h = torch.randn(512, width)
    stds = []
    for i in range(depth):
        W = torch.randn(width, width) * std_fn(width)
        h = act(h @ W)
        if i in (0, 9, 29, 49):
            stds.append(f"{h.std().item():.2e}")
    return stds

cases = [
    ("relu, std=0.01", torch.relu, lambda n: 0.01),
    ("relu, std=1.0", torch.relu, lambda n: 1.0),
    ("relu, He", torch.relu, lambda n: (2 / n) ** 0.5),
    ("tanh, Xavier", torch.tanh, lambda n: (2 / (n + n)) ** 0.5),
]
print("activation std after layers 1 / 10 / 30 / 50")
for name, act, fn in cases:
    print(f"{name:>15}: {run(act, fn)}")
```

Output:

```text
activation std after layers 1 / 10 / 30 / 50
 relu, std=0.01: ['9.33e-02', '2.88e-10', '2.53e-29', '0.00e+00']
  relu, std=1.0: ['9.33e+00', '2.88e+10', '2.53e+31', 'nan']
       relu, He: ['8.24e-01', '8.38e-01', '6.23e-01', '3.86e-01']
   tanh, Xavier: ['6.28e-01', '2.32e-01', '1.32e-01', '9.35e-02']
```

Too small and too large both fail within a few layers. He keeps ReLU activations in a healthy range even at depth 50. Xavier with tanh still shrinks slowly here, because tanh squashes its inputs, but it stays far from zero compared with the naive choices.
