---
title: "Deep Learning · The perceptron"
categories: ["study"]
tags: ["deep-learning", "neural-networks"]
summary: "Rosenblatt's perceptron from scratch: a weighted sum, a step function, and the update rule; it learns AND but can never learn XOR."
sources: 
  - title: "Dive into Deep Learning: Multilayer Perceptrons"
    url: "https://d2l.ai/chapter_multilayer-perceptrons/mlp.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T17:54:45.200Z"
  - title: "CS231n: Neural Networks Part 1"
    url: "https://cs231n.github.io/neural-networks-1/"
    publisher: "Stanford CS231n"
    fetched_at: "2026-10-29T17:54:45.920Z"
  - title: "scikit-learn: Perceptron"
    url: "https://scikit-learn.org/stable/modules/linear_model.html#perceptron"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T17:54:46.955Z"
highlights: ["A perceptron is a linear classifier: weighted sum, then a hard threshold.", "No single line separates XOR, which is why we need hidden layers."]
phase: 8
step: 1
draft: false
date: "2025-01-01"
---

I started phase 8, deep learning, with the smallest possible unit. A **perceptron** computes a weighted sum and applies a step function:

$$\hat{y} = \begin{cases}1 & \mathbf{w}^\top\mathbf{x}+b > 0\\0 & \text{otherwise}\end{cases}$$

The learning rule is to nudge the weights toward each misclassified example: $\mathbf{w} \leftarrow \mathbf{w} + \eta(y-\hat{y})\mathbf{x}$. If the data is **linearly separable**, this is guaranteed to converge.

It's a linear classifier, though. **XOR** (output 1 when exactly one input is 1) can't be split by a single line, so the perceptron never gets all four cases right. Fixing that is the reason hidden layers exist, and it's the next post.

```python run
import numpy as np

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
targets = {"AND": np.array([0, 0, 0, 1]), "OR": np.array([0, 1, 1, 1]), "XOR": np.array([0, 1, 1, 0])}

def train_perceptron(X, y, epochs=50, lr=0.1):
    w, b = np.zeros(2), 0.0
    for _ in range(epochs):
        for xi, yi in zip(X, y):
            pred = int(xi @ w + b > 0)
            w += lr * (yi - pred) * xi
            b += lr * (yi - pred)
    return w, b

for name, y in targets.items():
    w, b = train_perceptron(X, y)
    pred = (X @ w + b > 0).astype(int)
    print(f"{name:>3}: predictions {pred}, correct {(pred == y).sum()}/4, w={w}, b={b:.1f}")
```

Output:

```text
AND: predictions [0 0 0 1], correct 4/4, w=[0.2 0.1], b=-0.2
 OR: predictions [0 1 1 1], correct 4/4, w=[0.1 0.1], b=0.0
XOR: predictions [1 1 0 0], correct 2/4, w=[-0.1  0. ], b=0.1
```
