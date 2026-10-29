---
title: "NumPy · dtypes"
categories: ["study"]
tags: ["numpy", "dtypes"]
summary: "NumPy dtypes (int32, int64, float32, float64, bool), memory per element, casting with astype, and silent integer overflow."
sources: 
  - title: "Data types"
    url: "https://numpy.org/doc/stable/user/basics.types.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:43.137Z"
  - title: "Data type objects (dtype)"
    url: "https://numpy.org/doc/stable/reference/arrays.dtypes.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:43.735Z"
  - title: "numpy.ndarray.astype"
    url: "https://numpy.org/doc/stable/reference/generated/numpy.ndarray.astype.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:44.354Z"
highlights: ["Every element in an array has the same dtype, and the dtype fixes how many bytes each one takes.", "NumPy integer arrays wrap around on overflow instead of growing like Python ints."]
phase: 3
step: 2
draft: false
date: "2024-02-05"
---

Every element of an array shares one **dtype**, and the dtype decides how many bytes each element takes.

| dtype | bytes | typical use |
|---|---|---|
| `int64` | 8 | default integers on most platforms |
| `int32` | 4 | compact integers |
| `float64` | 8 | default floats |
| `float32` | 4 | deep learning (half the memory) |
| `bool` | 1 | masks |

- `astype` converts and returns a **copy**. Going from float to int truncates toward zero.
- Unlike Python ints, NumPy ints are fixed width, so they **wrap around** on overflow. That's the C++ lesson again.
- `float32` stores fewer significant digits than `float64`.

```python run
import numpy as np

x = np.array([1, 2, 3])
y = np.array([1.5, 2.7, -3.9])
print(x.dtype, y.dtype, x.itemsize, y.itemsize)

print(y.astype(np.int64))                     # truncates toward zero
small = np.array([1.0, 2.0, 3.0], dtype=np.float32)
print(small.dtype, small.nbytes, "bytes vs", small.astype(np.float64).nbytes)

i8 = np.array([120, 127], dtype=np.int8)
print(i8 + np.int8(10))                       # wraps around!
print(np.iinfo(np.int8), sep="")
print(np.float32(0.1) == np.float64(0.1), np.finfo(np.float32).eps)
```

Output:

```text
int64 float64 8 8
[ 1  2 -3]
float32 12 bytes vs 24
[-126 -119]
Machine parameters for int8
---------------------------------------------------------------
min = -128
max = 127
---------------------------------------------------------------

False 1.1920929e-07
```
