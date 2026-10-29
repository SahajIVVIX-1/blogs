---
title: "NumPy · Broadcasting"
categories: ["study"]
tags: ["numpy", "broadcasting"]
summary: "The broadcasting rules that let arrays of different shapes combine, and three uses: centring columns, outer products, and pairwise distances."
sources: 
  - title: "Broadcasting"
    url: "https://numpy.org/doc/stable/user/basics.broadcasting.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:48.558Z"
  - title: "numpy.newaxis"
    url: "https://numpy.org/doc/stable/reference/constants.html#numpy.newaxis"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:49.200Z"
  - title: "CS231n Python/NumPy tutorial: broadcasting"
    url: "https://cs231n.github.io/python-numpy-tutorial/#broadcasting"
    publisher: "Stanford CS231n"
    fetched_at: "2026-10-29T15:43:49.496Z"
highlights: ["Shapes are compared from the right; two dimensions are compatible if they are equal or one of them is 1.", "Broadcasting stretches arrays virtually; no data is actually copied."]
phase: 3
step: 5
draft: false
date: "2024-02-15"
---

Broadcasting is how NumPy combines arrays of **different shapes** without loops. The rules:

1. Line the shapes up from the **right**.
2. Two dimensions are compatible if they are **equal** or one of them is **1**.
3. A size-1 dimension is stretched (virtually, with no copy) to match.

Examples: `(3, 4) + (4,)` works because the row is added to every row. `(3, 1) * (1, 4)` gives a `(3, 4)` outer product. `(3, 4) + (3,)` **fails**, because 4 ≠ 3. To fix it, make the vector a column with `[:, None]`.

```python run
import numpy as np

X = np.array([[1., 2., 3.], [4., 5., 6.], [7., 8., 9.], [10., 11., 12.]])
centred = X - X.mean(axis=0)          # (4,3) - (3,)
print(centred)

col = np.arange(1, 4)[:, None]        # (3,1)
row = np.arange(1, 5)[None, :]        # (1,4)
print(col * row)                      # (3,4) multiplication table

try:
    X + np.array([1, 2, 3, 4])
except ValueError as e:
    print("ValueError:", e)
print((X + np.array([1, 2, 3, 4])[:, None])[:, 0])

P = np.array([[0, 0], [3, 4], [6, 8]])
D = np.sqrt(((P[:, None, :] - P[None, :, :]) ** 2).sum(-1))   # pairwise distances
print(D)
```

Output:

```text
[[-4.5 -4.5 -4.5]
 [-1.5 -1.5 -1.5]
 [ 1.5  1.5  1.5]
 [ 4.5  4.5  4.5]]
[[ 1  2  3  4]
 [ 2  4  6  8]
 [ 3  6  9 12]]
ValueError: operands could not be broadcast together with shapes (4,3) (4,) 
[ 2.  6. 10. 14.]
[[ 0.  5. 10.]
 [ 5.  0.  5.]
 [10.  5.  0.]]
```
