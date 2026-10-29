---
title: "Probability and Statistics · Correlation"
categories: ["study"]
tags: ["statistics", "correlation"]
summary: "Covariance, Pearson vs Spearman correlation, what r does and doesn't capture, and why correlation is not causation."
sources: 
  - title: "scipy.stats.pearsonr"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.pearsonr.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:07:13.522Z"
  - title: "scipy.stats.spearmanr"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:07:14.109Z"
  - title: "Anscombe's quartet (Wikipedia)"
    url: "https://en.wikipedia.org/wiki/Anscombe%27s_quartet"
    publisher: "Wikipedia"
    fetched_at: "2026-10-29T16:07:17.031Z"
highlights: ["Pearson's r measures linear association only; a perfect curve can have r near zero.", "Spearman's rank correlation catches monotonic relationships and resists outliers."]
phase: 6
step: 13
draft: false
date: "2024-07-18"
---

- **Covariance** says whether two variables move together, but its scale depends on their units.
- **Pearson's r** = cov / (σₓσᵧ), always between −1 and 1. It measures **linear** association only.
- **Spearman's ρ** is Pearson computed on *ranks*. It catches any **monotonic** relationship and resists outliers.

Lessons:

- A perfect U-shape can have r ≈ 0. Always plot first. **Anscombe's quartet** is four datasets with nearly identical r but completely different shapes.
- **Correlation ≠ causation**. A hidden third variable can drive both, like ice-cream sales and drownings both rising with temperature.

```python run
import numpy as np
from scipy import stats

rng = np.random.default_rng(8)
x = rng.uniform(-3, 3, 200)

linear = 2 * x + rng.normal(0, 1, 200)
u_shape = x ** 2 + rng.normal(0, 0.3, 200)
monotone = np.exp(x) + rng.normal(0, 0.5, 200)

for name, y in [("linear", linear), ("u-shape", u_shape), ("exp (monotone)", monotone)]:
    r = stats.pearsonr(x, y).statistic
    rho = stats.spearmanr(x, y).statistic
    print(f"{name:>15}: pearson {r:+.3f}  spearman {rho:+.3f}")

# one outlier
a = np.arange(10.0); b = a.copy(); b[-1] = -50
print("with outlier: pearson", round(stats.pearsonr(a, b).statistic, 3), "spearman", round(stats.spearmanr(a, b).statistic, 3))

# hidden third variable
temp = rng.normal(30, 5, 300)
ice = 3 * temp + rng.normal(0, 5, 300)
swims = 2 * temp + rng.normal(0, 5, 300)
print("ice vs swims r =", round(stats.pearsonr(ice, swims).statistic, 3), "(both driven by temperature)")
```

Output:

```text
         linear: pearson +0.958  spearman +0.959
        u-shape: pearson +0.018  spearman -0.050
 exp (monotone): pearson +0.815  spearman +0.870
with outlier: pearson -0.389 spearman 0.455
ice vs swims r = 0.802 (both driven by temperature)
```
