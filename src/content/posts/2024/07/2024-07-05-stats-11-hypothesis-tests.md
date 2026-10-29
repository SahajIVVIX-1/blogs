---
title: "Probability and Statistics · Hypothesis tests"
categories: ["study"]
tags: ["statistics", "hypothesis-testing"]
summary: "The logic of a hypothesis test: null and alternative, test statistic, p-value, significance level, and the two types of error."
sources: 
  - title: "OpenIntro Statistics (ch. 5, foundations for inference)"
    url: "https://www.openintro.org/book/os/"
    publisher: "OpenIntro"
    fetched_at: "2026-10-29T16:06:39.881Z"
  - title: "MIT 18.05 Reading 17a: Frequentist significance tests"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
  - title: "The ASA Statement on p-Values: Context, Process, and Purpose"
    url: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf"
    publisher: "American Statistical Association"
    fetched_at: "2026-10-29T16:18:17.526Z"
highlights: ["A p-value is the probability of data at least this extreme if the null hypothesis were true; it is not the probability that the null is true.", "Failing to reject H₀ is not the same as proving it."]
phase: 6
step: 11
draft: false
date: "2024-07-05"
---

The recipe:

1. **H₀** (null): "no effect", e.g. the coin is fair. **H₁**: what you suspect.
2. Choose α (often 0.05) **before** looking at the data.
3. Compute a **test statistic** and its **p-value**: how likely data at least this extreme would be *if H₀ were true*.
4. If p < α, reject H₀.

The errors: a **Type I** error is rejecting a true H₀, and its rate is α. A **Type II** error is missing a real effect. **Power** = 1 − P(Type II).

The ASA's 2016 statement on p-values warns against reading a p-value as the probability that H₀ is true, or as a measure of effect size. I simulated the Type I rate to see α in action.

```python run
import numpy as np
from scipy import stats

# 62 heads in 100 flips: is the coin fair?
res = stats.binomtest(62, n=100, p=0.5, alternative="two-sided")
print("p-value:", round(res.pvalue, 4), "-> reject at 0.05:", res.pvalue < 0.05)

rng = np.random.default_rng(6)
# Type I error rate: test a fair coin many times
pvals = np.array([stats.binomtest(int(k), 100, 0.5).pvalue for k in rng.binomial(100, 0.5, 2000)])
print("false-positive rate at alpha=0.05:", round((pvals < 0.05).mean(), 3))

# power: coin with p=0.6, n=100
pvals_alt = np.array([stats.binomtest(int(k), 100, 0.5).pvalue for k in rng.binomial(100, 0.6, 2000)])
print("power to detect p=0.6 with n=100:", round((pvals_alt < 0.05).mean(), 3))
```

Output:

```text
p-value: 0.021 -> reject at 0.05: True
false-positive rate at alpha=0.05: 0.037
power to detect p=0.6 with n=100: 0.456
```

The false-positive rate comes out a little under 0.05 because the binomial test is discrete and conservative.
