---
title: "Probability and Statistics · Sampling"
categories: ["study"]
tags: ["statistics", "sampling"]
summary: "Population vs sample, simple random vs stratified sampling, sampling bias, and the bootstrap for estimating uncertainty."
sources: 
  - title: "OpenIntro Statistics (ch. 1, sampling)"
    url: "https://www.openintro.org/book/os/"
    publisher: "OpenIntro"
    fetched_at: "2026-10-29T16:06:39.881Z"
  - title: "scipy.stats.bootstrap"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:07:05.194Z"
  - title: "MIT 18.05 Reading 24: Bootstrap confidence intervals"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
highlights: ["A biased sample stays biased no matter how large it gets.", "The bootstrap estimates uncertainty by resampling your own data with replacement."]
phase: 6
step: 9
draft: false
date: "2024-06-21"
---

- **Population**: everyone you care about. **Sample**: the part you actually measure. A **parameter** describes the population (μ), and a **statistic** describes the sample (x̄).
- **Simple random sampling**: everyone has an equal chance of being picked.
- **Stratified sampling**: sample within groups (strata) so each group is represented. It reduces variance when the groups differ.
- **Bias**: a biased method (convenience samples, non-response) stays biased **no matter how large the sample** is. More data doesn't fix a bad design.

The **bootstrap** resamples the sample *with replacement* many times and recomputes the statistic each time. The spread of those values estimates the standard error, with no formula needed. `scipy.stats.bootstrap` does this for you.

```python run
import numpy as np
from scipy import stats

rng = np.random.default_rng(4)
# population: two branches with different mean scores
pop_a = rng.normal(70, 8, 8000)     # 80% of students
pop_b = rng.normal(85, 5, 2000)     # 20% of students
population = np.concatenate([pop_a, pop_b])
print("true mean", round(population.mean(), 2))

srs = rng.choice(population, 200, replace=False)
strat = np.concatenate([rng.choice(pop_a, 160, replace=False), rng.choice(pop_b, 40, replace=False)])
biased = rng.choice(pop_b, 200, replace=False)          # only surveyed one branch
print("random", round(srs.mean(), 2), "| stratified", round(strat.mean(), 2), "| biased", round(biased.mean(), 2))

res = stats.bootstrap((srs,), np.mean, n_resamples=5000, random_state=rng)
lo, hi = res.confidence_interval
print("bootstrap SE", round(res.standard_error, 3), "| 95% CI", round(lo, 2), "to", round(hi, 2))
```

Output:

```text
true mean 73.13
random 73.12 | stratified 73.06 | biased 84.82
bootstrap SE 0.71 | 95% CI 71.77 to 74.54
```
