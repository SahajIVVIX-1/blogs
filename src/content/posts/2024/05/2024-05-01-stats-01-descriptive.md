---
title: "Probability and Statistics · Descriptive statistics"
categories: ["study"]
tags: ["statistics"]
summary: "Summarising data with centre (mean, median, mode) and spread (variance, standard deviation, IQR), and why the median resists outliers."
sources: 
  - title: "OpenIntro Statistics (free textbook)"
    url: "https://www.openintro.org/book/os/"
    publisher: "OpenIntro"
    fetched_at: "2026-10-29T16:06:39.881Z"
  - title: "statistics: mathematical statistics functions"
    url: "https://docs.python.org/3/library/statistics.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T16:06:40.402Z"
  - title: "NIST/SEMATECH e-Handbook: measures of location"
    url: "https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm"
    publisher: "NIST"
    fetched_at: "2026-10-29T16:06:41.945Z"
highlights: ["The mean is pulled by outliers; the median is not.", "Sample variance divides by n − 1, not n, to avoid underestimating the population variance."]
phase: 6
step: 1
draft: false
date: "2024-05-01"
---

Phase 6 starts with the vocabulary for describing a dataset.

**Centre**
- **mean**: the sum divided by n. Outliers pull it.
- **median**: the middle value. It's *robust* to outliers.
- **mode**: the most common value.

**Spread**
- **variance**: the average squared distance from the mean. The *sample* version divides by **n − 1** (Bessel's correction).
- **standard deviation**: the square root of the variance, in the data's own units.
- **IQR**: Q3 − Q1, the range of the middle 50%. The usual outlier rule flags points beyond 1.5 × IQR from the quartiles.

In NumPy, `np.std` divides by n by default (`ddof=0`). For the sample version, pass `ddof=1`.

```python run
import numpy as np
import statistics as st

salaries = np.array([32, 35, 36, 38, 40, 41, 43, 45, 47, 250])   # in thousands, one outlier
print("mean", salaries.mean(), "median", np.median(salaries))
print("mode of [1,2,2,3]:", st.mode([1, 2, 2, 3]))

print("pop. var", salaries.var().round(2), "sample var", salaries.var(ddof=1).round(2))
print("sample std", salaries.std(ddof=1).round(2), "==", round(st.stdev(salaries.tolist()), 2))

q1, q3 = np.percentile(salaries, [25, 75])
iqr = q3 - q1
outliers = salaries[(salaries < q1 - 1.5 * iqr) | (salaries > q3 + 1.5 * iqr)]
print("Q1", q1, "Q3", q3, "IQR", iqr, "outliers", outliers)
print("without outlier: mean", salaries[:-1].mean().round(2), "median", np.median(salaries[:-1]))
```

Output:

```text
mean 60.7 median 40.5
mode of [1,2,2,3]: 2
pop. var 4000.81 sample var 4445.34
sample std 66.67 == 66.67
Q1 36.5 Q3 44.5 IQR 8.0 outliers [250]
without outlier: mean 39.67 median 40.0
```
