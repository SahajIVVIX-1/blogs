---
title: "Pandas · merge and join"
categories: ["study"]
tags: ["pandas", "merge"]
summary: "SQL-style joins with merge (inner, left, right, outer), the indicator flag, validate, and stacking with concat."
sources: 
  - title: "Merge, join, concatenate and compare"
    url: "https://pandas.pydata.org/docs/user_guide/merging.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:08.542Z"
  - title: "pandas.merge"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.merge.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:09.142Z"
  - title: "Comparison with SQL"
    url: "https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:09.807Z"
highlights: ["merge is pandas' SQL JOIN; the how argument picks inner, left, right or outer.", "indicator=True adds a column saying where each row came from, which is great for debugging joins."]
phase: 4
step: 7
draft: false
date: "2024-03-21"
---

`pd.merge(left, right, on="key", how=...)` is a SQL join:

| `how` | keeps |
|---|---|
| `inner` | keys present in both tables |
| `left` | every row of the left table |
| `right` | every row of the right table |
| `outer` | everything, filling gaps with NaN |

- `indicator=True` adds a `_merge` column (`both`, `left_only`, `right_only`). It's very useful for checking a join.
- `validate="one_to_one"` / `"many_to_one"` raises if the keys aren't as unique as you expect.
- `pd.concat([df1, df2])` *stacks* tables instead of matching on keys.

```python run
import pandas as pd

students = pd.DataFrame({"sid": [1, 2, 3, 4], "name": ["Asha", "Ravi", "Sahaj", "Meet"]})
marks = pd.DataFrame({"sid": [1, 3, 3, 5], "subject": ["ml", "ml", "dsa", "ml"], "marks": [81, 92, 88, 70]})

print(pd.merge(students, marks, on="sid", how="inner"))
print(pd.merge(students, marks, on="sid", how="outer", indicator=True))

try:
    pd.merge(students, marks, on="sid", validate="one_to_one")
except Exception as e:
    print(type(e).__name__, "->", str(e)[:60])

more = pd.DataFrame({"sid": [5], "name": ["Dev"]})
print(pd.concat([students, more], ignore_index=True).tail(2))
```

Output:

```text
   sid   name subject  marks
0    1   Asha      ml     81
1    3  Sahaj      ml     92
2    3  Sahaj     dsa     88
   sid   name subject  marks      _merge
0    1   Asha      ml   81.0        both
1    2   Ravi     NaN    NaN   left_only
2    3  Sahaj      ml   92.0        both
3    3  Sahaj     dsa   88.0        both
4    4   Meet     NaN    NaN   left_only
5    5    NaN      ml   70.0  right_only
MergeError -> Merge keys are not unique in right dataset; not a one-to-one
   sid  name
3    4  Meet
4    5   Dev
```
