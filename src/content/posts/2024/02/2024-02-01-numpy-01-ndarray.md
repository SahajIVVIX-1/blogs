---
title: "NumPy · ndarray basics"
categories: ["study"]
tags: ["numpy", "arrays"]
summary: "The ndarray: creating arrays, shape, ndim, size, reshape, and why one NumPy array beats a list of floats."
sources: 
  - title: "NumPy: the absolute basics for beginners"
    url: "https://numpy.org/doc/stable/user/absolute_beginners.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:41.235Z"
  - title: "The N-dimensional array (ndarray)"
    url: "https://numpy.org/doc/stable/reference/arrays.ndarray.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:41.745Z"
  - title: "Array creation"
    url: "https://numpy.org/doc/stable/user/basics.creation.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:42.637Z"
highlights: ["An ndarray is one contiguous block of same-typed values plus metadata (shape, dtype, strides).", "reshape returns a view when it can, so no data is copied."]
phase: 3
step: 1
draft: false
date: "2024-02-01"
---

I'm back in Python, now with NumPy. Its core object is the **ndarray**: one contiguous block of memory holding values of a *single* type, plus metadata describing how to read it:

- `shape`: the length along each axis, e.g. `(3, 4)`
- `ndim`: the number of axes
- `size`: the total number of elements
- `dtype`: the element type
- `strides`: how many bytes to jump to move one step along each axis

This is the C++ `std::vector` idea from last month, wrapped for Python. Because the data is contiguous and typed, operations run in compiled loops instead of the Python interpreter.

Common ways to create arrays: `np.array(list)`, `np.zeros`, `np.ones`, `np.arange`, `np.linspace`, `np.eye`.

```python run
import numpy as np

a = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
print(a.shape, a.ndim, a.size, a.dtype, a.strides)

print(np.zeros((2, 3)))
print(np.arange(0, 10, 2), np.linspace(0, 1, 5))

b = a.reshape(4, 3)
print(b)
print("shares memory with a:", np.shares_memory(a, b))
print(a.T.shape, a.ravel()[:5])
```

Output:

```text
(3, 4) 2 12 int64 (32, 8)
[[0. 0. 0.]
 [0. 0. 0.]]
[0 2 4 6 8] [0.   0.25 0.5  0.75 1.  ]
[[ 1  2  3]
 [ 4  5  6]
 [ 7  8  9]
 [10 11 12]]
shares memory with a: True
(4, 3) [1 2 3 4 5]
```
