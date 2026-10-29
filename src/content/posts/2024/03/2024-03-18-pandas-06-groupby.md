---
title: "Pandas · groupby"
categories: ["study"]
tags: ["pandas", "groupby"]
summary: "Split-apply-combine with groupby: aggregations, named agg, multiple keys, transform vs agg, and filter."
sources: 
  - title: "Group by: split-apply-combine"
    url: "https://pandas.pydata.org/docs/user_guide/groupby.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:07.043Z"
  - title: "DataFrameGroupBy.agg"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.api.typing.DataFrameGroupBy.agg.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T16:18:28.962Z"
  - title: "Python for Data Analysis, 3E (ch. 10)"
    url: "https://wesmckinney.com/book/data-aggregation"
    publisher: "Wes McKinney"
    fetched_at: "2026-10-29T15:44:08.158Z"
highlights: ["groupby is split, then apply, then combine.", "transform returns a result the same shape as the input; agg returns one row per group."]
phase: 4
step: 6
draft: false
date: "2024-03-18"
---

`groupby` follows the **split-apply-combine** pattern: split the rows into groups by key, apply a function to each group, and combine the results.

- `df.groupby("branch")["cgpa"].mean()`: one number per group.
- **Named aggregation**: `.agg(avg=("cgpa", "mean"), n=("cgpa", "size"))` gives clean column names.
- Several keys: `groupby(["branch", "year"])` produces a MultiIndex.
- `transform` returns a result **the same length as the input**, e.g. each row's deviation from its group mean.
- `filter` keeps whole groups that satisfy a condition.

```python run
import pandas as pd

df = pd.DataFrame({
    "branch": ["ICT", "ICT", "CSE", "CSE", "ME", "ICT", "ME"],
    "year":   [1, 2, 1, 2, 1, 1, 2],
    "cgpa":   [8.9, 7.1, 8.4, 7.9, 6.8, 9.2, 7.5],
})
print(df.groupby("branch")["cgpa"].mean().round(2))
print(df.groupby("branch").agg(avg=("cgpa", "mean"), best=("cgpa", "max"), n=("cgpa", "size")).round(2))
print(df.groupby(["branch", "year"])["cgpa"].mean())

df["vs_branch_avg"] = (df["cgpa"] - df.groupby("branch")["cgpa"].transform("mean")).round(2)
print(df)
print(df.groupby("branch").filter(lambda g: len(g) >= 3)["branch"].unique())
```

Output:

```text
branch
CSE    8.15
ICT    8.40
ME     7.15
Name: cgpa, dtype: float64
         avg  best  n
branch               
CSE     8.15   8.4  2
ICT     8.40   9.2  3
ME      7.15   7.5  2
branch  year
CSE     1       8.40
        2       7.90
ICT     1       9.05
        2       7.10
ME      1       6.80
        2       7.50
Name: cgpa, dtype: float64
  branch  year  cgpa  vs_branch_avg
0    ICT     1   8.9           0.50
1    ICT     2   7.1          -1.30
2    CSE     1   8.4           0.25
3    CSE     2   7.9          -0.25
4     ME     1   6.8          -0.35
5    ICT     1   9.2           0.80
6     ME     2   7.5           0.35
<StringArray>
['ICT']
Length: 1, dtype: str
```
