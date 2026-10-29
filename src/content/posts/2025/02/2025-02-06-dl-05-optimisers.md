---
title: "Deep Learning · Optimisers: SGD, momentum, Adam"
categories: ["study"]
tags: ["deep-learning", "optimisation"]
summary: "Mini-batch SGD, momentum, RMSProp-style scaling and Adam compared on an ill-conditioned valley, using torch.optim."
sources: 
  - title: "Kingma & Ba (2014), Adam: A Method for Stochastic Optimization"
    url: "https://arxiv.org/abs/1412.6980"
    publisher: "arXiv"
    fetched_at: "2026-10-29T17:55:05.198Z"
  - title: "Dive into Deep Learning: Optimization Algorithms"
    url: "https://d2l.ai/chapter_optimization/index.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T17:55:05.907Z"
  - title: "torch.optim"
    url: "https://docs.pytorch.org/docs/stable/optim.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:06.914Z"
highlights: ["Momentum smooths noisy gradients and speeds up travel along long, shallow valleys.", "Adam adapts a separate step size per parameter from running averages of the gradient and its square."]
phase: 8
step: 5
draft: false
date: "2025-02-06"
---

Plain **SGD** steps along the negative gradient of a mini-batch. Its problems: noisy gradients, and slow progress in "valleys" that are steep in one direction and shallow in another (ill-conditioned problems).

- **Momentum** keeps a velocity $v \leftarrow \beta v + g$ and steps along v. Noise averages out, and consistent directions build up speed.
- **RMSProp** divides each parameter's step by a running RMS of its gradients. Steep directions get smaller steps.
- **Adam** (Kingma and Ba, 2014) combines both: running averages of g and g², with bias correction. It's the common default.

The test surface is $f(x, y) = x^2 + 50y^2$, a stretched bowl with its minimum at (0, 0). Every optimiser started at (−4, 2) and got 100 steps.

```python run
import torch

def bowl(p):
    return p[0] ** 2 + 50 * p[1] ** 2

configs = {
    "SGD lr=0.01": lambda p: torch.optim.SGD([p], lr=0.01),
    "SGD+momentum": lambda p: torch.optim.SGD([p], lr=0.01, momentum=0.9),
    "RMSprop": lambda p: torch.optim.RMSprop([p], lr=0.05),
    "Adam": lambda p: torch.optim.Adam([p], lr=0.3),
}
for name, make in configs.items():
    p = torch.tensor([-4.0, 2.0], requires_grad=True)
    opt = make(p)
    for _ in range(100):
        opt.zero_grad()
        loss = bowl(p)
        loss.backward()
        opt.step()
    print(f"{name:>13}: final point ({p[0]:+.4f}, {p[1]:+.4f}), loss {bowl(p).item():.2e}")
```

Output:

```text
  SGD lr=0.01: final point (-0.5305, +0.0000), loss 2.81e-01
 SGD+momentum: final point (-0.0169, +0.0027), loss 6.51e-04
      RMSprop: final point (-0.0060, +0.0000), loss 3.56e-05
         Adam: final point (+0.0057, +0.0007), loss 5.35e-05
```

These are tuned-by-hand learning rates on a toy surface. The ranking can change on real networks.
