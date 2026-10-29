---
title: "Deep Learning · PyTorch training loop"
categories: ["study"]
tags: ["pytorch", "training"]
summary: "The standard PyTorch loop with Dataset, DataLoader, nn.Module, a loss, an optimiser and an evaluation pass, applied to scikit-learn's handwritten digits."
sources: 
  - title: "PyTorch: Optimizing model parameters"
    url: "https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:19.015Z"
  - title: "PyTorch: Datasets & DataLoaders"
    url: "https://docs.pytorch.org/tutorials/beginner/basics/data_tutorial.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:19.319Z"
  - title: "PyTorch: Build the neural network"
    url: "https://docs.pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T17:55:20.619Z"
highlights: ["Every PyTorch training step is the same five lines: zero_grad, forward, loss, backward, step.", "Switch between model.train() and model.eval() so dropout and batch norm behave correctly."]
phase: 8
step: 10
draft: false
date: "2025-03-25"
---

Every PyTorch project I've read follows the same skeleton:

```text
for epoch in range(E):
    model.train()
    for xb, yb in train_loader:
        optimizer.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward()
        optimizer.step()
    model.eval()
    with torch.no_grad(): evaluate on validation data
```

- `Dataset` / `TensorDataset` holds the samples. `DataLoader` batches and shuffles them.
- An `nn.Module` subclass defines the layers in `__init__` and the computation in `forward`.
- `nn.CrossEntropyLoss` takes raw logits; it applies log-softmax internally.

The data is scikit-learn's 8×8 handwritten digits: 1,797 images, 10 classes, small enough for a CPU.

```python run
import torch, torch.nn as nn
from torch.utils.data import TensorDataset, DataLoader
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

torch.manual_seed(0)
X, y = load_digits(return_X_y=True)
X = X / 16.0
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0, stratify=y)
to_t = lambda a, dt: torch.tensor(a, dtype=dt)
train_dl = DataLoader(TensorDataset(to_t(X_tr, torch.float32), to_t(y_tr, torch.long)), batch_size=64, shuffle=True)
X_te_t, y_te_t = to_t(X_te, torch.float32), to_t(y_te, torch.long)

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(64, 128), nn.ReLU(), nn.Dropout(0.2), nn.Linear(128, 10))
    def forward(self, x):
        return self.net(x)

model = MLP()
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()
print("parameters:", sum(p.numel() for p in model.parameters()))

for epoch in range(1, 21):
    model.train()
    for xb, yb in train_dl:
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward()
        opt.step()
    if epoch % 5 == 0:
        model.eval()
        with torch.no_grad():
            acc = (model(X_te_t).argmax(1) == y_te_t).float().mean().item()
        print(f"epoch {epoch:>2}: last batch loss {loss.item():.4f} | test accuracy {acc:.3f}")
```

Output:

```text
parameters: 9610
epoch  5: last batch loss 0.6777 | test accuracy 0.889
epoch 10: last batch loss 0.2797 | test accuracy 0.922
epoch 15: last batch loss 0.2040 | test accuracy 0.947
epoch 20: last batch loss 0.1845 | test accuracy 0.958
```
