---
title: "Pandas · Missing data"
categories: ["study"]
tags: ["pandas", "missing-data"]
summary: "Detecting NaN with isna, counting missing values per column, dropna vs fillna, filling with group means, and interpolation."
sources: 
  - title: "Working with missing data"
    url: "https://pandas.pydata.org/docs/user_guide/missing_data.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:05.172Z"
  - title: "pandas.DataFrame.fillna"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.fillna.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:05.766Z"
  - title: "pandas.DataFrame.interpolate"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.interpolate.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:06.367Z"
highlights: ["df.isna().sum() is the first thing to run on any new dataset.", "Filling with a group mean keeps more information than filling with one global value."]
phase: 4
step: 5
draft: false
date: "2024-03-14"
---

Pandas marks missing values as `NaN` (or `NaT` for dates, `pd.NA` for nullable types).

- `df.isna().sum()` counts missing values per column. I'm making it the first thing I run on new data.
- `dropna()` removes rows (or, with `axis=1`, columns). Use it when only a few rows are affected.
- `fillna(value)` fills with a constant, `ffill()` / `bfill()` carry neighbouring values, and `interpolate()` estimates values in a series.
- A better fill is often per group: `df.groupby("g")["x"].transform("mean")`.
- Aggregations like `mean()` skip `NaN` by default.

```python run
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "branch": ["ICT", "ICT", "CSE", "CSE", "ME", "ME"],
    "cgpa": [8.9, np.nan, 8.4, 7.9, np.nan, 6.8],
    "attendance": [92, 85, np.nan, 78, 88, 90],
})
print(df.isna().sum())
print("mean skips NaN:", round(df.cgpa.mean(), 3))

print(df.dropna())
filled = df.copy()
filled["cgpa"] = filled["cgpa"].fillna(filled.groupby("branch")["cgpa"].transform("mean"))
filled["attendance"] = filled["attendance"].fillna(filled["attendance"].median())
print(filled)

s = pd.Series([1.0, np.nan, np.nan, 4.0])
print(s.interpolate().tolist(), s.ffill().tolist())
```

Output:

```text
branch        0
cgpa          2
attendance    1
dtype: int64
mean skips NaN: 8.0
  branch  cgpa  attendance
0    ICT   8.9        92.0
3    CSE   7.9        78.0
5     ME   6.8        90.0
  branch  cgpa  attendance
0    ICT   8.9        92.0
1    ICT   8.9        85.0
2    CSE   8.4        88.0
3    CSE   7.9        78.0
4     ME   6.8        88.0
5     ME   6.8        90.0
[1.0, 2.0, 3.0, 4.0] [1.0, 1.0, 1.0, 4.0]
```
