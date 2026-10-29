---
title: "Probability and Statistics · Point and interval estimation"
categories: ["study"]
tags: ["statistics", "inference"]
summary: "Estimators and their bias, standard error, and building and interpreting 95% confidence intervals with the t distribution."
sources: 
  - title: "MIT 18.05 Reading 22: Confidence intervals for the normal distribution"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
  - title: "scipy.stats.t"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.t.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:07:06.663Z"
  - title: "Seeing Theory: frequentist inference"
    url: "https://seeing-theory.brown.edu/frequentist-inference/index.html"
    publisher: "Brown University"
    fetched_at: "2026-10-29T16:07:10.708Z"
highlights: ["A 95% confidence interval comes from a method that captures the true value in about 95% of repeated samples.", "Use the t distribution when σ is estimated from the sample."]
phase: 6
step: 10
draft: false
date: "2024-06-28"
---

- A **point estimate** is one best guess, e.g. x̄ for μ. An estimator is **unbiased** if its average over repeated samples equals the true value. The sample variance with n − 1 is unbiased; with n it isn't.
- An **interval estimate** adds a margin: x̄ ± t* · s/√n, where t* comes from the **t distribution** with n − 1 degrees of freedom. We use t because σ is estimated, which adds uncertainty.

How to read a **95% CI** correctly: the *procedure* captures the true μ in about 95% of repeated samples. It does not mean "there's a 95% probability μ is in this particular interval." I checked that coverage claim by simulation.

```python run
import numpy as np
from scipy import stats

rng = np.random.default_rng(5)
mu, sigma, n = 50, 10, 25

sample = rng.normal(mu, sigma, n)
xbar, s = sample.mean(), sample.std(ddof=1)
tstar = stats.t.ppf(0.975, df=n - 1)
print(f"x̄={xbar:.2f}, s={s:.2f}, t*={tstar:.3f}, CI=({xbar - tstar * s / n**0.5:.2f}, {xbar + tstar * s / n**0.5:.2f})")
print("scipy:", tuple(round(v, 2) for v in stats.t.interval(0.95, n - 1, loc=xbar, scale=stats.sem(sample))))

trials = 10_000
X = rng.normal(mu, sigma, (trials, n))
m, sd = X.mean(1), X.std(1, ddof=1)
half = tstar * sd / np.sqrt(n)
print("coverage over 10k samples:", ((m - half <= mu) & (mu <= m + half)).mean())

v_n, v_n1 = X.var(1, ddof=0).mean(), X.var(1, ddof=1).mean()
print("avg var with n:", round(v_n, 1), "| with n-1:", round(v_n1, 1), "| true:", sigma ** 2)
```

Output:

```text
x̄=48.29, s=8.85, t*=2.064, CI=(44.64, 51.94)
scipy: (np.float64(44.64), np.float64(51.94))
coverage over 10k samples: 0.9481
avg var with n: 96.3 | with n-1: 100.3 | true: 100
```
