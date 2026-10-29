---
title: "Machine Learning · Gradient descent"
categories: ["study"]
tags: ["machine-learning", "optimisation"]
summary: "Fitting linear regression by gradient descent from scratch: the gradient of MSE, the learning rate, and what happens when it is too small or too big."
sources: 
  - title: "CS229 Lecture Notes (LMS algorithm and gradient descent)"
    url: "https://cs229.stanford.edu/main_notes.pdf"
    publisher: "Stanford CS229"
    fetched_at: "2026-10-29T16:25:53.825Z"
  - title: "Google ML Crash Course: Gradient descent"
    url: "https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent"
    publisher: "Google for Developers"
    fetched_at: "2026-10-29T16:25:55.402Z"
  - title: "Dive into Deep Learning: Gradient Descent"
    url: "https://d2l.ai/chapter_optimization/gd.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T16:25:56.035Z"
highlights: ["Gradient descent repeatedly steps opposite the gradient, the direction of steepest increase in loss.", "Too small a learning rate crawls; too large a rate diverges."]
phase: 7
step: 3
draft: false
date: "2024-08-19"
---

The normal equation doesn't scale to huge data or to non-linear models. **Gradient descent** does, and it's the optimiser behind all of deep learning.

For MSE, the gradient with respect to the weights is

$$\nabla_{\mathbf{w}} = \frac{2}{n}X^\top(X\mathbf{w}+b-\mathbf{y}),\quad \nabla_b = \frac{2}{n}\sum(X\mathbf{w}+b-\mathbf{y})$$

and each step is $\mathbf{w} \leftarrow \mathbf{w} - \eta\nabla_{\mathbf{w}}$.

The **learning rate η** matters a lot. I ran the same problem with three rates. Too small barely moves, a good rate converges, and too big makes the loss explode.

```python run
import numpy as np

rng = np.random.default_rng(0)
X = rng.normal(size=(200, 3))
true_w, true_b = np.array([2.0, -1.0, 0.5]), 4.0
y = X @ true_w + true_b + rng.normal(0, 0.3, 200)

def gd(lr, steps=200):
    w, b = np.zeros(3), 0.0
    for _ in range(steps):
        err = X @ w + b - y
        w -= lr * 2 / len(y) * X.T @ err
        b -= lr * 2 * err.mean()
    return w, b, float(np.mean((X @ w + b - y) ** 2))

for lr in [0.001, 0.1, 1.2]:
    w, b, mse = gd(lr)
    print(f"lr={lr:<5}: mse={mse:.4g}  w={np.round(w, 2)}  b={b:.2f}")
print("true w:", true_w, "true b:", true_b)
```

Output:

```text
lr=0.001: mse=9.393  w=[ 0.59 -0.31  0.07]  b=1.26
lr=0.1  : mse=0.09001  w=[ 1.97 -1.03  0.52]  b=3.99
lr=1.2  : mse=4.209e+84  w=[ 1.60786683e+42 -3.42390685e+41 -6.38889360e+41]  b=-838659476340198925976164680586602970349568.00
true w: [ 2.  -1.   0.5] true b: 4.0
```
