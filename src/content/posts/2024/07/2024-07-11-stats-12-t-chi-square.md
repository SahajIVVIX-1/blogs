---
title: "Probability and Statistics · t-test and chi-square"
categories: ["study"]
tags: ["statistics", "hypothesis-testing"]
summary: "One-sample, two-sample (Welch) and paired t-tests, and the chi-square test of independence for categorical data."
sources: 
  - title: "scipy.stats.ttest_ind"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:07:12.618Z"
  - title: "scipy.stats.chi2_contingency"
    url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chi2_contingency.html"
    publisher: "SciPy"
    fetched_at: "2026-10-29T16:07:12.873Z"
  - title: "OpenIntro Statistics (ch. 6–7)"
    url: "https://www.openintro.org/book/os/"
    publisher: "OpenIntro"
    fetched_at: "2026-10-29T16:06:39.881Z"
highlights: ["Use Welch's t-test by default for two groups; it does not assume equal variances.", "Chi-square compares observed counts with the counts expected under independence."]
phase: 6
step: 12
draft: false
date: "2024-07-11"
---

Which test fits which question:

| question | test | scipy |
|---|---|---|
| is the mean equal to some value? | one-sample t | `ttest_1samp` |
| do two independent groups differ? | **Welch** two-sample t | `ttest_ind(equal_var=False)` |
| before/after on the same subjects? | paired t | `ttest_rel` |
| are two categorical variables related? | χ² independence | `chi2_contingency` |

Welch's version doesn't assume equal variances, which makes it a safer default. A paired test removes the between-subject variation, so it's more powerful when the design really is paired. Chi-square compares the observed table with the counts expected under independence.

Alongside the p-value I also report the **effect size** (here the mean difference), because a tiny effect can be "significant" with enough data.

```python run
import numpy as np
from scipy import stats

rng = np.random.default_rng(7)
group_a = rng.normal(72, 8, 40)       # e.g. scores with method A
group_b = rng.normal(77, 12, 35)      # method B
t, p = stats.ttest_ind(group_a, group_b, equal_var=False)
print(f"Welch t={t:.3f}, p={p:.4f}, mean diff={group_b.mean() - group_a.mean():.2f}")

before = rng.normal(60, 10, 25)
after = before + rng.normal(3, 4, 25)  # same students, small improvement
print("independent test p =", round(stats.ttest_ind(after, before).pvalue, 4),
      "| paired test p =", round(stats.ttest_rel(after, before).pvalue, 6))

table = np.array([[30, 10],    # rows: branch ICT, CSE ; cols: uses Linux yes/no
                  [18, 22]])
chi2, p, dof, expected = stats.chi2_contingency(table)
print(f"chi2={chi2:.3f}, dof={dof}, p={p:.4f}")
print("expected under independence:\n", expected.round(1))
```

Output:

```text
Welch t=-3.853, p=0.0003, mean diff=8.31
independent test p = 0.3794 | paired test p = 0.001915
chi2=6.302, dof=1, p=0.0121
expected under independence:
 [[24. 16.]
 [24. 16.]]
```
