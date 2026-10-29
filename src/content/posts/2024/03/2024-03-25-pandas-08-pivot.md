---
title: "Pandas · pivot_table"
categories: ["study"]
tags: ["pandas", "reshaping"]
summary: "Reshaping between long and wide formats with pivot_table, melt and crosstab, including margins and fill_value."
sources: 
  - title: "Reshaping and pivot tables"
    url: "https://pandas.pydata.org/docs/user_guide/reshaping.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:10.401Z"
  - title: "pandas.pivot_table"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.pivot_table.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:11.002Z"
  - title: "pandas.melt"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.melt.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:11.603Z"
highlights: ["pivot_table is groupby plus reshaping: index becomes rows, columns becomes columns, values get aggregated.", "melt is the inverse: it turns wide columns back into long rows."]
phase: 4
step: 8
draft: false
date: "2024-03-25"
---

Data comes in two shapes:

- **long**: one row per observation (`student, subject, marks`), which is best for analysis
- **wide**: one column per category (`student, maths, physics, …`), which is best for reading

`pivot_table(index=, columns=, values=, aggfunc=)` goes from long to wide and aggregates duplicates on the way. In effect it's `groupby` plus a reshape. `margins=True` adds totals. `melt` goes back from wide to long. `pd.crosstab` counts combinations of two categorical columns.

```python run
import pandas as pd

long = pd.DataFrame({
    "student": ["Asha", "Asha", "Ravi", "Ravi", "Sahaj", "Sahaj", "Sahaj"],
    "subject": ["maths", "python", "maths", "python", "maths", "python", "python"],
    "marks":   [81, 77, 64, 70, 88, 93, 97],
})
wide = long.pivot_table(index="student", columns="subject", values="marks",
                        aggfunc="mean", margins=True)
print(wide.round(1))

back = wide.drop(index="All", columns="All").reset_index().melt(
    id_vars="student", var_name="subject", value_name="avg_marks")
print(back)

long["band"] = pd.cut(long.marks, bins=[0, 70, 85, 100], labels=["<70", "70-85", "85+"])
print(pd.crosstab(long.subject, long.band))
```

Output:

```text
subject  maths  python   All
student                     
Asha      81.0    77.0  79.0
Ravi      64.0    70.0  67.0
Sahaj     88.0    95.0  92.7
All       77.7    84.2  81.4
  student subject  avg_marks
0    Asha   maths       81.0
1    Ravi   maths       64.0
2   Sahaj   maths       88.0
3    Asha  python       77.0
4    Ravi  python       70.0
5   Sahaj  python       95.0
band     <70  70-85  85+
subject                 
maths      1      1    1
python     1      1    2
```
