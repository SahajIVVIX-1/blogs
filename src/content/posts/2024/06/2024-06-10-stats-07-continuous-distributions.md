---
title: "Probability and Statistics · Continuous distributions"
categories: ["study"]
tags: ["probability", "distributions"]
summary: "Uniform, normal and exponential distributions, z-scores, the 68–95–99.7 rule, and computing areas with cdf and ppf."
sources: 
  - title: "scipy.stats.norm"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:06:52.188Z"
  - title: "MIT 18.05 Reading 5b: Continuous distributions"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
  - title: "NIST e-Handbook: normal distribution"
    url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda3661.htm"
    publisher: "NIST"
    fetched_at: "2026-10-29T16:06:54.279Z"
highlights: ["For a normal distribution about 68%, 95% and 99.7% of values fall within 1, 2 and 3 standard deviations.", "ppf is the inverse of cdf: it turns a probability back into a value."]
phase: 6
step: 7
draft: false
date: "2024-06-10"
---

- **Uniform(a, b)**: every value in [a, b] is equally likely.
- **Normal(μ, σ)**: the bell curve. The **z-score** z = (x − μ)/σ says how many standard deviations a value sits from the mean. The **68–95–99.7** rule gives the share within 1, 2 and 3 σ.
- **Exponential(λ)**: the waiting time between Poisson events. It's *memoryless*.

For any continuous distribution:

- `cdf(x)` = P(X ≤ x), the area to the left
- `ppf(q)` is the inverse of the cdf, giving the value with area q to its left (quantiles, cut-offs)

```python run
from scipy import stats

z = stats.norm(0, 1)
for k in (1, 2, 3):
    print(f"within {k} sd: {z.cdf(k) - z.cdf(-k):.4f}")

h = stats.norm(loc=170, scale=8)      # heights in cm
print("P(height > 185) =", round(h.sf(185), 4), "| z =", (185 - 170) / 8)
print("95th percentile =", round(h.ppf(0.95), 2), "cm")

wait = stats.expon(scale=1 / 4)       # 4 arrivals per hour -> mean wait 15 min
print("mean wait (h)", wait.mean(), "| P(wait > 30 min) =", round(wait.sf(0.5), 4))
print("memoryless:", round(wait.sf(0.75) / wait.sf(0.25), 4), "==", round(wait.sf(0.5), 4))
```

Output:

```text
within 1 sd: 0.6827
within 2 sd: 0.9545
within 3 sd: 0.9973
P(height > 185) = 0.0304 | z = 1.875
95th percentile = 183.16 cm
mean wait (h) 0.25 | P(wait > 30 min) = 0.1353
memoryless: 0.1353 == 0.1353
```
