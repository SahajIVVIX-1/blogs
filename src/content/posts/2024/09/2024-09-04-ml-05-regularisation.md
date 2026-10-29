---
title: "Machine Learning · Regularisation: ridge and lasso"
categories: ["study"]
tags: ["machine-learning", "regularisation"]
summary: "Overfitting with too many features, and how L2 (ridge) shrinks weights while L1 (lasso) drives some exactly to zero."
sources: 
  - title: "scikit-learn: Ridge regression"
    url: "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:25:57.692Z"
  - title: "scikit-learn: Lasso"
    url: "https://scikit-learn.org/stable/modules/linear_model.html#lasso"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:25:58.321Z"
  - title: "An Introduction to Statistical Learning (ch. 6)"
    url: "https://www.statlearning.com/"
    publisher: "James, Witten, Hastie, Tibshirani"
    fetched_at: "2026-10-29T16:25:59.308Z"
highlights: ["Regularisation adds a penalty on weight size so the model prefers simpler fits.", "Lasso's L1 penalty sets some weights to exactly zero, which is a built-in feature selection."]
phase: 7
step: 5
draft: false
date: "2024-09-04"
---

A model with many features can **overfit**: it memorises noise and does well on training data but badly on new data. **Regularisation** adds a penalty on the size of the weights:

- **Ridge (L2)**: loss + α·Σw². It shrinks all weights smoothly.
- **Lasso (L1)**: loss + α·Σ|w|. It pushes some weights **exactly to zero**, which is built-in feature selection.
- α controls the strength. α = 0 is plain linear regression, and a very large α underfits.

Features should be on the same scale first (StandardScaler), otherwise the penalty treats them unequally.

To see overfitting happen, I fit polynomial features of degree 14 to only 15 noisy points from a sine curve. The plain model has nearly as many weights as data points.

```python run
import numpy as np
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(0)
x = rng.uniform(-3, 3, 15)[:, None]
y = np.sin(x).ravel() + rng.normal(0, 0.3, 15)
x_test = np.linspace(-2.8, 2.8, 200)[:, None]
y_test = np.sin(x_test).ravel()

for name, reg in [("plain", LinearRegression()), ("ridge a=0.1", Ridge(alpha=0.1)), ("lasso a=0.02", Lasso(alpha=0.02, max_iter=100_000))]:
    m = make_pipeline(PolynomialFeatures(14), StandardScaler(), reg).fit(x, y)
    coef = m[-1].coef_
    print(f"{name:>12}: train mse {mean_squared_error(y, m.predict(x)):.3f} | test mse {mean_squared_error(y_test, m.predict(x_test)):.3f}"
          f" | max|w| {np.abs(coef).max():9.2f} | zero weights {(np.abs(coef) < 1e-8).sum()}")
```

Output:

```text
       plain: train mse 0.004 | test mse 88.295 | max|w|   1414.00 | zero weights 1
 ridge a=0.1: train mse 0.036 | test mse 0.041 | max|w|      1.51 | zero weights 1
lasso a=0.02: train mse 0.070 | test mse 0.067 | max|w|      1.05 | zero weights 12
```

The plain fit drives its training error close to zero but swings wildly between the points, so its test error explodes. Both penalties keep the weights small and the curve close to the sine. I had to try a few setups (number of points, degree, α) before the effect was this clear. With more data, plain regression overfits much less.
