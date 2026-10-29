---
title: "NumPy · Boolean and fancy indexing"
categories: ["study"]
tags: ["numpy", "indexing"]
summary: "Selecting with boolean masks and integer arrays, combining conditions with & and |, np.where, and why these return copies."
sources: 
  - title: "Indexing: boolean array indexing"
    url: "https://numpy.org/doc/stable/user/basics.indexing.html#boolean-array-indexing"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:46.624Z"
  - title: "Indexing: integer array indexing"
    url: "https://numpy.org/doc/stable/user/basics.indexing.html#integer-array-indexing"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:47.133Z"
  - title: "numpy.where"
    url: "https://numpy.org/doc/stable/reference/generated/numpy.where.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:47.995Z"
highlights: ["A comparison like a > 5 gives a boolean mask, and a[mask] selects the matching elements.", "Use & and", "with parentheses, not and/or, to combine element-wise conditions."]
phase: 3
step: 4
draft: false
date: "2024-02-12"
---

Two more ways to index, and both return **copies** rather than views:

- **Boolean mask:** `a > 5` gives an array of `True`/`False`, and `a[mask]` keeps the `True` positions. Combine conditions with `&`, `|` and `~`, **with parentheses**, because `and` and `or` don't work element-wise.
- **Fancy indexing:** pass an array of integer positions, e.g. `a[[0, 3, 3]]`.
- `np.where(cond, x, y)` picks element-wise from `x` or `y`, a vectorised if/else.

Assigning through a mask (`a[a < 0] = 0`) *does* modify `a` in place. It's the selection that makes a copy.

```python run
import numpy as np

marks = np.array([88, 35, 72, 91, 40, 55, 28])
passed = marks >= 40
print(passed)
print(marks[passed], passed.sum(), "passed")
print(marks[(marks >= 50) & (marks < 90)])
print(marks[[0, 3, 3]])

grades = np.where(marks >= 85, "A", np.where(marks >= 50, "B", "C"))
print(grades)

clipped = marks.copy()
clipped[clipped < 40] = 40
print(clipped)
print(np.argsort(marks)[::-1][:3], "-> top-3 positions")
```

Output:

```text
[ True False  True  True  True  True False]
[88 72 91 40 55] 5 passed
[88 72 55]
[88 91 91]
['A' 'C' 'B' 'A' 'C' 'B' 'C']
[88 40 72 91 40 55 40]
[3 0 2] -> top-3 positions
```
