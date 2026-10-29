---
title: "Probability and Statistics · Simple linear regression"
categories: ["study"]
tags: ["statistics", "regression"]
summary: "Fitting y = a + bx by least squares, reading slope and intercept, R², residuals, and the bridge to machine learning."
sources: 
  - title: "scipy.stats.linregress"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.linregress.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:07:17.309Z"
  - title: "OpenIntro Statistics (ch. 8, linear regression)"
    url: "https://www.openintro.org/book/os/"
    publisher: "OpenIntro"
    fetched_at: "2026-10-29T16:06:39.881Z"
  - title: "MIT 18.05 Reading 25: Linear regression"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
highlights: ["Least squares picks the line that minimises the sum of squared residuals.", "R² is the share of the variance in y that the line explains."]
phase: 6
step: 14
draft: false
date: "2024-07-25"
---

The last statistics topic is also the first ML model. **Simple linear regression** fits ŷ = a + b·x.

- **Least squares**: choose a and b to minimise Σ(yᵢ − ŷᵢ)². The closed form is b = cov(x, y)/var(x) and a = ȳ − b·x̄.
- **Slope b**: the expected change in y for one unit of x. **Intercept a**: the prediction at x = 0, which isn't always meaningful.
- **R²** = 1 − SS_res/SS_tot, the share of y's variance the line explains. For simple regression, R² = r².
- **Residuals** should look like structureless noise. A pattern in them means the model is missing something.

```python run
import numpy as np
from scipy import stats

rng = np.random.default_rng(9)
hours = rng.uniform(0, 10, 60)
score = 42 + 4.5 * hours + rng.normal(0, 5, 60)

b = np.cov(hours, score, ddof=1)[0, 1] / hours.var(ddof=1)
a = score.mean() - b * hours.mean()
print(f"by hand : score = {a:.2f} + {b:.2f} * hours")

res = stats.linregress(hours, score)
print(f"linregress: intercept {res.intercept:.2f}, slope {res.slope:.2f}, r^2 {res.rvalue**2:.3f}, p {res.pvalue:.2e}")

pred = a + b * hours
resid = score - pred
r2 = 1 - (resid ** 2).sum() / ((score - score.mean()) ** 2).sum()
print("R^2 by hand:", round(r2, 3), "| mean residual ~ 0:", round(resid.mean(), 6))
print("prediction for 7 hours:", round(a + b * 7, 1))
```

Output:

```text
by hand : score = 41.87 + 4.67 * hours
linregress: intercept 41.87, slope 4.67, r^2 0.885, p 5.88e-29
R^2 by hand: 0.885 | mean residual ~ 0: 0.0
prediction for 7 hours: 74.6
```

That completes phase 6. Machine learning starts next, where this same line gets fitted by gradient descent instead of a formula.
