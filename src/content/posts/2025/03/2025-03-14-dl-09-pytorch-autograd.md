---
title: "Deep Learning · PyTorch tensors and autograd"
categories: ["study"]
tags: ["pytorch", "autograd"]
summary: "PyTorch tensors (NumPy-like, with devices and dtypes), the dynamic computation graph, requires_grad, backward(), and no_grad."
sources: 
  - title: "PyTorch: Tensors tutorial"
    url: "https://docs.pytorch.org/tutorials/beginner/basics/tensorqs_tutorial.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:17.269Z"
  - title: "PyTorch: Automatic differentiation with torch.autograd"
    url: "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:18.045Z"
  - title: "Dive into Deep Learning: Automatic Differentiation"
    url: "https://d2l.ai/chapter_preliminaries/autograd.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T17:55:18.618Z"
highlights: ["Autograd records operations on tensors with requires_grad=True and computes gradients when you call backward().", "Gradients accumulate, so they must be zeroed before each new backward pass."]
phase: 8
step: 9
draft: false
date: "2025-03-14"
---

After writing backprop by hand, today I let PyTorch do it.

- **Tensors** are like NumPy arrays plus a `device` (CPU or GPU) and autograd support. `torch.from_numpy` shares memory with the NumPy array.
- Setting `requires_grad=True` makes PyTorch **record** every operation in a graph that is built on the fly as the code runs (a *dynamic* graph).
- `loss.backward()` walks the graph backwards and fills in `.grad`.
- Gradients **accumulate**, so zero them each step (`optimizer.zero_grad()`).
- `with torch.no_grad():` turns recording off, for inference and manual weight updates.

```python run
import numpy as np
import torch

a = np.arange(6, dtype=np.float32).reshape(2, 3)
t = torch.from_numpy(a)
a[0, 0] = 100
print(t[0, 0].item(), t.shape, t.dtype, t.device)

x = torch.tensor(2.0, requires_grad=True)
y = x ** 3 + 2 * x            # dy/dx = 3x^2 + 2 = 14 at x=2
y.backward()
print("dy/dx at 2:", x.grad.item(), "| graph node:", type(y.grad_fn).__name__)

y = x ** 3 + 2 * x
y.backward()
print("accumulated grad:", x.grad.item())
x.grad.zero_()

w = torch.randn(3, requires_grad=True)
with torch.no_grad():
    z = w * 2
print("recorded inside no_grad?", z.requires_grad)

# same gradient as the manual formula for MSE
X, yv = torch.randn(50, 3), torch.randn(50)
loss = ((X @ w - yv) ** 2).mean()
loss.backward()
manual = 2 / 50 * X.T @ (X @ w - yv)
print("autograd == manual MSE gradient:", torch.allclose(w.grad, manual.detach(), atol=1e-6))
```

Output:

```text
100.0 torch.Size([2, 3]) torch.float32 cpu
dy/dx at 2: 14.0 | graph node: AddBackward0
accumulated grad: 28.0
recorded inside no_grad? False
autograd == manual MSE gradient: True
```
