---
title: "Probability and Statistics · Random variables"
categories: ["study"]
tags: ["probability"]
summary: "Random variables as numbers attached to outcomes, PMF vs PDF vs CDF, expectation and variance, and linearity of expectation."
sources: 
  - title: "MIT 18.05 Reading 4a: Discrete random variables"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
  - title: "Seeing Theory: probability distributions"
    url: "https://seeing-theory.brown.edu/probability-distributions/index.html"
    publisher: "Brown University"
    fetched_at: "2026-10-29T16:06:48.503Z"
  - title: "scipy.stats"
    url: "https://docs.scipy.org/doc/scipy/reference/stats.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:06:50.207Z"
highlights: ["E[X] is a probability-weighted average of the values X can take.", "Linearity of expectation holds even when the variables are dependent."]
phase: 6
step: 5
draft: false
date: "2024-05-27"
---

A **random variable** X assigns a number to each outcome, for example "the sum of two dice".

- Discrete X has a **PMF** p(x) = P(X = x).
- Continuous X has a **PDF** f(x). Probabilities are *areas* under it, so P(X = x) = 0 for any single value.
- Both have a **CDF** F(x) = P(X ≤ x).
- **Expectation**: E[X] = Σ x·p(x), the long-run average.
- **Variance**: Var(X) = E[(X − E[X])²] = E[X²] − E[X]².
- **Linearity**: E[aX + bY] = aE[X] + bE[Y], *always*, even when X and Y are dependent. Variance only adds this way for independent variables.

```python run
import numpy as np
from itertools import product
from collections import Counter

sums = Counter(a + b for a, b in product(range(1, 7), repeat=2))
pmf = {s: c / 36 for s, c in sorted(sums.items())}
E = sum(s * p for s, p in pmf.items())
Var = sum(s * s * p for s, p in pmf.items()) - E ** 2
print("PMF(7) =", round(pmf[7], 4), "E[X] =", round(E, 4), "Var =", round(Var, 4))
print("CDF(4) = P(X<=4) =", round(sum(p for s, p in pmf.items() if s <= 4), 4))

rng = np.random.default_rng(2)
d = rng.integers(1, 7, size=(500_000, 2))
x = d.sum(axis=1)
print("simulated mean", round(x.mean(), 3), "var", round(x.var(), 3))

# linearity with dependent variables: Y = X^2 depends on X
X = rng.integers(1, 7, size=500_000)
print("E[X + X^2] ~", round((X + X ** 2).mean(), 2), "vs E[X]+E[X^2] =", round(3.5 + 91 / 6, 2))
```

Output:

```text
PMF(7) = 0.1667 E[X] = 7.0 Var = 5.8333
CDF(4) = P(X<=4) = 0.1667
simulated mean 7.003 var 5.831
E[X + X^2] ~ 18.65 vs E[X]+E[X^2] = 18.67
```
