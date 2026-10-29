---
title: "NumPy · Vectorisation"
categories: ["study"]
tags: ["numpy", "performance"]
summary: "Replacing Python loops with whole-array operations and ufuncs, with a timing comparison and the axis argument for reductions."
sources: 
  - title: "What is NumPy? (why NumPy is fast)"
    url: "https://numpy.org/doc/stable/user/whatisnumpy.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:49.716Z"
  - title: "Universal functions (ufunc)"
    url: "https://numpy.org/doc/stable/reference/ufuncs.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:50.589Z"
  - title: "NumPy quickstart: universal functions"
    url: "https://numpy.org/doc/stable/user/quickstart.html#universal-functions"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:50.951Z"
highlights: ["Vectorised code runs the loop in compiled C instead of the Python interpreter.", "axis=0 reduces down the rows (one result per column); axis=1 reduces across each row."]
phase: 3
step: 6
draft: false
date: "2024-02-20"
---

**Vectorisation** means expressing a computation as whole-array operations so that NumPy runs the loop in compiled C. **ufuncs** (`np.sqrt`, `np.exp`, `+`, `*`) apply element-wise. **Reductions** (`sum`, `mean`, `max`) collapse an axis:

- `axis=0`: down the rows, giving one result per **column**
- `axis=1`: across each row, giving one result per **row**

I timed the same computation (root-mean-square of a million numbers) both ways. The exact numbers depend on the machine, so the snippet only prints the speed-up factor, rounded.

```python run
import numpy as np, time, math, random

random.seed(0)
data = [random.random() for _ in range(1_000_000)]
arr = np.array(data)

t0 = time.perf_counter()
rms_loop = math.sqrt(sum(x * x for x in data) / len(data))
t1 = time.perf_counter()
rms_vec = np.sqrt(np.mean(arr ** 2))
t2 = time.perf_counter()

print(round(rms_loop, 6), round(float(rms_vec), 6))
print("vectorised is faster:", (t2 - t1) < (t1 - t0))
print("speed-up at least 10x:", (t1 - t0) / (t2 - t1) > 10)

M = np.arange(12).reshape(3, 4)
print(M.sum(axis=0), M.sum(axis=1), M.max())
print(np.exp(np.array([0.0, 1.0])).round(4))
```

Output:

```text
0.577079 0.577079
vectorised is faster: True
speed-up at least 10x: True
[12 15 18 21] [ 6 22 38] 11
[1.     2.7183]
```
