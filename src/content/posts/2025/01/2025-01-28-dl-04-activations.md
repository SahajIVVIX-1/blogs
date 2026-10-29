---
title: "Deep Learning · Activation functions"
categories: ["study"]
tags: ["deep-learning", "activations"]
summary: "Sigmoid, tanh, ReLU, Leaky ReLU and GELU compared by shape and gradient, and why saturating activations make deep networks hard to train."
sources: 
  - title: "CS231n: Neural Networks Part 1 (activation functions)"
    url: "https://cs231n.github.io/neural-networks-1/#actfun"
    publisher: "Stanford CS231n"
    fetched_at: "2026-10-29T17:55:00.189Z"
  - title: "PyTorch: Non-linear activations"
    url: "https://docs.pytorch.org/docs/stable/nn.html#non-linear-activations-weighted-sum-nonlinearity"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:01.446Z"
  - title: "Hendrycks & Gimpel (2016), Gaussian Error Linear Units (GELUs)"
    url: "https://arxiv.org/abs/1606.08415"
    publisher: "arXiv"
    fetched_at: "2026-10-29T17:55:02.774Z"
highlights: ["Sigmoid and tanh saturate, so their gradients vanish for large inputs.", "ReLU's gradient is exactly 1 for positive inputs, which keeps signals flowing in deep nets."]
phase: 8
step: 4
draft: false
date: "2025-01-28"
---

| activation | range | gradient notes |
|---|---|---|
| sigmoid | (0, 1) | at most 0.25, vanishes for large inputs |
| tanh | (−1, 1) | at most 1, zero-centred, still saturates |
| ReLU | [0, ∞) | exactly 1 for positive inputs, 0 otherwise (units can "die") |
| Leaky ReLU | ℝ | a small slope for negative inputs avoids dead units |
| GELU | ℝ | smooth, used in Transformers (Hendrycks and Gimpel, 2016) |

Why it matters: backprop *multiplies* local gradients layer after layer. With sigmoids, each factor is at most 0.25, so after 10 layers the gradient can shrink by about 0.25¹⁰. That's the **vanishing gradient**. I measured the input-gradient norm through 10-layer stacks using PyTorch autograd.

```python run
import torch

x = torch.linspace(-4, 4, 9, requires_grad=True)
acts = {"sigmoid": torch.sigmoid, "tanh": torch.tanh, "relu": torch.relu,
        "leaky_relu": torch.nn.functional.leaky_relu, "gelu": torch.nn.functional.gelu}
for name, f in acts.items():
    g, = torch.autograd.grad(f(x).sum(), x)
    print(f"{name:>10}: grad at x=-4..4 -> {[round(v, 3) for v in g.tolist()]}")

torch.manual_seed(0)
for name, f in [("sigmoid", torch.sigmoid), ("tanh", torch.tanh), ("relu", torch.relu)]:
    layers = [torch.nn.Linear(64, 64) for _ in range(10)]
    for l in layers:
        torch.nn.init.kaiming_normal_(l.weight) if name == "relu" else torch.nn.init.xavier_normal_(l.weight)
    inp = torch.randn(32, 64, requires_grad=True)
    h = inp
    for l in layers:
        h = f(l(h))
    h.sum().backward()
    print(f"{name:>8} 10-layer stack: input-gradient norm {inp.grad.norm():.2e}")
```

Output:

```text
   sigmoid: grad at x=-4..4 -> [0.018, 0.045, 0.105, 0.197, 0.25, 0.197, 0.105, 0.045, 0.018]
      tanh: grad at x=-4..4 -> [0.001, 0.01, 0.071, 0.42, 1.0, 0.42, 0.071, 0.01, 0.001]
      relu: grad at x=-4..4 -> [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0]
leaky_relu: grad at x=-4..4 -> [0.01, 0.01, 0.01, 0.01, 0.01, 1.0, 1.0, 1.0, 1.0]
      gelu: grad at x=-4..4 -> [-0.001, -0.012, -0.085, -0.083, 0.5, 1.083, 1.085, 1.012, 1.001]
 sigmoid 10-layer stack: input-gradient norm 1.40e-05
    tanh 10-layer stack: input-gradient norm 9.23e+00
    relu 10-layer stack: input-gradient norm 8.39e+01
```
