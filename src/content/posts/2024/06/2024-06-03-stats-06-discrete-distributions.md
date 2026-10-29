---
title: "Probability and Statistics · Discrete distributions"
categories: ["study"]
tags: ["probability", "distributions"]
summary: "Bernoulli, binomial, geometric and Poisson distributions: what each one counts, their means, and computing them with scipy.stats."
sources: 
  - title: "scipy.stats.binom"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binom.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:06:50.482Z"
  - title: "scipy.stats.poisson"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:06:51.185Z"
  - title: "MIT 18.05 Reading 4b: Discrete distributions"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
highlights: ["Binomial counts successes in n fixed trials; geometric counts trials until the first success; Poisson counts events in an interval.", "Every scipy.stats distribution has the same pmf / cdf / rvs interface."]
phase: 6
step: 6
draft: false
date: "2024-06-03"
---

| distribution | counts | parameters | mean |
|---|---|---|---|
| Bernoulli | one yes/no trial | p | p |
| Binomial | successes in n trials | n, p | np |
| Geometric | trials until the first success | p | 1/p |
| Poisson | events in a fixed interval | λ | λ |

Poisson is also the limit of Binomial(n, p) when n is large and p is small, with λ = np.

In `scipy.stats`, every distribution shares one interface: `pmf` (or `pdf`), `cdf`, `sf` (= 1 − cdf), `mean`, `var`, `rvs` (random samples).

```python run
from scipy import stats

b = stats.binom(n=10, p=0.3)
print("P(exactly 3 of 10) =", round(b.pmf(3), 4), "| P(at most 3) =", round(b.cdf(3), 4), "| mean", b.mean())

g = stats.geom(p=1 / 6)
print("P(first six on roll 4) =", round(g.pmf(4), 4), "| mean rolls", g.mean())

pois = stats.poisson(mu=4)          # e.g. 4 emails per hour
print("P(0 emails) =", round(pois.pmf(0), 4), "| P(more than 6) =", round(pois.sf(6), 4))

big = stats.binom(n=1000, p=0.004)  # Poisson approximation, lambda = 4
print("binomial vs poisson at k=2:", round(big.pmf(2), 5), round(pois.pmf(2), 5))
print("samples:", b.rvs(size=8, random_state=0))
```

Output:

```text
P(exactly 3 of 10) = 0.2668 | P(at most 3) = 0.6496 | mean 3.0
P(first six on roll 4) = 0.0965 | mean rolls 6.0
P(0 emails) = 0.0183 | P(more than 6) = 0.1107
binomial vs poisson at k=2: 0.14638 0.14653
samples: [3 4 3 3 3 3 3 5]
```
