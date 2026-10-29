---
title: "Pandas · Selection with loc and iloc"
categories: ["study"]
tags: ["pandas", "indexing"]
summary: "Label-based loc versus position-based iloc, boolean filtering, query(), and avoiding chained assignment."
sources: 
  - title: "Indexing and selecting data"
    url: "https://pandas.pydata.org/docs/user_guide/indexing.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:01.507Z"
  - title: "pandas.DataFrame.query"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.query.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:01.909Z"
  - title: "Copy-on-Write (CoW)"
    url: "https://pandas.pydata.org/docs/user_guide/copy_on_write.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:02.972Z"
highlights: ["loc selects by label and its slices include the end; iloc selects by position and its slices exclude the end.", "Assign with one df.loc[rows, col] = value call, not chained brackets."]
phase: 4
step: 3
draft: false
date: "2024-03-07"
---

| | `df.loc[...]` | `df.iloc[...]` |
|---|---|---|
| selects by | **labels** | **integer positions** |
| slice `a:b` | **includes** `b` | excludes `b` |
| boolean mask | yes | yes (as an array) |

- `df["col"]` gives one column (a Series). `df[["a", "b"]]` gives a DataFrame.
- Filter rows with a mask: `df[df.cgpa > 8]`. `df.query("cgpa > 8 and branch == 'ICT'")` reads well too.
- To **assign**, use a single `df.loc[mask, "col"] = value`. Chained indexing like `df[mask]["col"] = value` may modify a temporary copy and get lost. Under pandas' Copy-on-Write it never updates `df`.

```python run
import pandas as pd

df = pd.DataFrame(
    {"branch": ["CSE", "ICT", "ICT", "ME", "ICT"], "cgpa": [8.4, 7.1, 8.9, 6.8, 9.2]},
    index=["Asha", "Ravi", "Sahaj", "Meet", "Dev"],
)
print(df.loc["Ravi":"Meet"])           # label slice: includes Meet
print(df.iloc[1:3])                    # position slice: excludes 3
print(df.loc[df.cgpa > 8, "branch"])
print(df.query("branch == 'ICT' and cgpa > 8"))

df.loc[df.cgpa >= 9, "honours"] = True
df["honours"] = df["honours"].fillna(False).astype(bool)
print(df)
print(df.iloc[-1, 0], df.at["Sahaj", "cgpa"])
```

Output:

```text
      branch  cgpa
Ravi     ICT   7.1
Sahaj    ICT   8.9
Meet      ME   6.8
      branch  cgpa
Ravi     ICT   7.1
Sahaj    ICT   8.9
Asha     CSE
Sahaj    ICT
Dev      ICT
Name: branch, dtype: str
      branch  cgpa
Sahaj    ICT   8.9
Dev      ICT   9.2
      branch  cgpa  honours
Asha     CSE   8.4    False
Ravi     ICT   7.1    False
Sahaj    ICT   8.9    False
Meet      ME   6.8    False
Dev      ICT   9.2     True
ICT 8.9
```
