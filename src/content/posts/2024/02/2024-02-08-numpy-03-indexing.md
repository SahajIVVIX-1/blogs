---
title: "NumPy · Indexing and slicing"
categories: ["study"]
tags: ["numpy", "indexing"]
summary: "Multi-dimensional indexing with a[i, j], slicing rows and columns, and the most important rule: basic slices are views, not copies."
sources: 
  - title: "Indexing on ndarrays"
    url: "https://numpy.org/doc/stable/user/basics.indexing.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:44.966Z"
  - title: "Copies and views"
    url: "https://numpy.org/doc/stable/user/basics.copies.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:45.564Z"
  - title: "NumPy quickstart: indexing, slicing and iterating"
    url: "https://numpy.org/doc/stable/user/quickstart.html#indexing-slicing-and-iterating"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:46.259Z"
highlights: ["A basic slice of a NumPy array is a view, so writing to it changes the original array.", "Use .copy() when you need an independent array."]
phase: 3
step: 3
draft: false
date: "2024-02-08"
---

- One comma-separated index per axis: `a[row, col]`. This is cleaner than Python's `a[row][col]`.
- Slices work on every axis: `a[1:3, ::2]`, `a[:, 0]` for the first column, `a[-1]` for the last row.
- `...` (Ellipsis) stands for "all remaining axes".

**The key difference from Python lists:** slicing a list makes a copy, but a *basic slice* of an ndarray is a **view** into the same memory. Writing to the view changes the original. Use `.copy()` when you need an independent array.

```python run
import numpy as np

a = np.arange(1, 13).reshape(3, 4)
print(a)
print(a[1, 2], a[-1], a[:, 0])
print(a[0:2, 1:3])
print(a[:, ::2])

view = a[0, :]
view[:] = 0                      # writes into a!
print(a)

safe = a[1, :].copy()
safe[:] = -1
print(a[1], np.shares_memory(a, view), np.shares_memory(a, safe))

lst = [1, 2, 3]
part = lst[0:2]; part[0] = 99
print(lst)                       # list slice was a copy
```

Output:

```text
[[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
7 [ 9 10 11 12] [1 5 9]
[[2 3]
 [6 7]]
[[ 1  3]
 [ 5  7]
 [ 9 11]]
[[ 0  0  0  0]
 [ 5  6  7  8]
 [ 9 10 11 12]]
[5 6 7 8] True False
[1, 2, 3]
```
