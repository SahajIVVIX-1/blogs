---
title: "Pandas · Series and DataFrame"
categories: ["study"]
tags: ["pandas", "dataframes"]
summary: "Series (a labelled 1-D array) and DataFrame (a table of Series sharing an index), and how index alignment works."
sources: 
  - title: "10 minutes to pandas"
    url: "https://pandas.pydata.org/docs/user_guide/10min.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:43:57.610Z"
  - title: "Intro to data structures"
    url: "https://pandas.pydata.org/docs/user_guide/dsintro.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:43:58.003Z"
  - title: "Python for Data Analysis, 3E (ch. 5)"
    url: "https://wesmckinney.com/book/pandas-basics"
    publisher: "Wes McKinney"
    fetched_at: "2026-10-29T15:43:58.728Z"
highlights: ["A DataFrame is a dict of Series that share one index.", "Operations between Series align on index labels, not on position."]
phase: 4
step: 1
draft: false
date: "2024-03-01"
---

- A **Series** is a 1-D NumPy array plus an **index** (labels).
- A **DataFrame** is a table: a dict of Series (columns) that share one row index.

The important new idea is **alignment**. When you add two Series, pandas matches them by **index label**, not by position. A label present in only one of them gives `NaN`.

Useful first commands: `df.head()`, `df.info()`, `df.describe()`, `df.shape`, `df.dtypes`.

```python run
import pandas as pd

s = pd.Series([88, 79, 95], index=["maths", "physics", "python"], name="marks")
print(s)
print(s["python"], s.mean().round(2))

bonus = pd.Series({"python": 5, "maths": 2, "chemistry": 10})
print(s + bonus)                       # aligned by label

df = pd.DataFrame({
    "name": ["Asha", "Ravi", "Sahaj", "Meet"],
    "branch": ["CSE", "ICT", "ICT", "ME"],
    "cgpa": [8.4, 7.1, 8.9, 6.8],
})
print(df)
print(df.shape, list(df.columns))
print(df.describe().round(2))
```

Output:

```text
maths      88
physics    79
python     95
Name: marks, dtype: int64
95 87.33
chemistry      NaN
maths         90.0
physics        NaN
python       100.0
dtype: float64
    name branch  cgpa
0   Asha    CSE   8.4
1   Ravi    ICT   7.1
2  Sahaj    ICT   8.9
3   Meet     ME   6.8
(4, 3) ['name', 'branch', 'cgpa']
       cgpa
count  4.00
mean   7.80
std    1.01
min    6.80
25%    7.02
50%    7.75
75%    8.52
max    8.90
```
