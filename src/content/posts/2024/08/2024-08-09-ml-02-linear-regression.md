---
title: "Machine Learning · Linear regression"
categories: ["study"]
tags: ["machine-learning", "regression"]
summary: "Linear regression with many features: the model, the squared-error cost, the normal equation, and scikit-learn's LinearRegression with RMSE and R²."
sources: 
  - title: "scikit-learn: Ordinary Least Squares"
    url: "https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:25:50.338Z"
  - title: "CS229 Lecture Notes (supervised learning, linear regression)"
    url: "https://cs229.stanford.edu/main_notes.pdf"
    publisher: "Stanford CS229"
    fetched_at: "2026-10-29T16:25:53.825Z"
  - title: "Dive into Deep Learning: Linear Regression"
    url: "https://d2l.ai/chapter_linear-regression/linear-regression.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T16:25:54.431Z"
highlights: ["Linear regression predicts a weighted sum of features plus a bias.", "Mean squared error punishes big mistakes much more than small ones."]
phase: 7
step: 2
draft: false
date: "2024-08-09"
---

This is the statistics regression from July, generalised to many features:

$$\hat{y} = w_1x_1 + \dots + w_dx_d + b = \mathbf{w}^\top\mathbf{x} + b$$

- The **cost** is mean squared error, $\frac{1}{n}\sum(y_i-\hat{y}_i)^2$. Squaring punishes big errors much more than small ones.
- A closed-form solution exists, the **normal equation** $\mathbf{w} = (X^\top X)^{-1}X^\top y$. In practice you solve it with least squares rather than an explicit inverse.
- Report **RMSE**, which is in the target's units, and **R²**.

The data below is scikit-learn's *diabetes* dataset: 442 patients, 10 standardised features, and a disease-progression target.

```python run
import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

X, y = load_diabetes(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)

lr = LinearRegression().fit(X_tr, y_tr)
pred = lr.predict(X_te)
print("RMSE:", round(mean_squared_error(y_te, pred) ** 0.5, 2), "| R2:", round(r2_score(y_te, pred), 3))

# normal equation via least squares, with a column of ones for the bias
A = np.c_[np.ones(len(X_tr)), X_tr]
w, *_ = np.linalg.lstsq(A, y_tr, rcond=None)
print("same bias:", np.isclose(w[0], lr.intercept_), "| same weights:", np.allclose(w[1:], lr.coef_))
print("largest |weight| feature index:", int(np.abs(lr.coef_).argmax()))
```

Output:

```text
RMSE: 56.39 | R2: 0.359
same bias: True | same weights: True
largest |weight| feature index: 8
```
