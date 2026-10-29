---
title: "NumPy · Linear algebra"
categories: ["study"]
tags: ["numpy", "linear-algebra"]
summary: "Matrix multiplication with @, solving linear systems, inverse vs solve, determinants, norms, and eigen decomposition."
sources: 
  - title: "Linear algebra (numpy.linalg)"
    url: "https://numpy.org/doc/stable/reference/routines.linalg.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:51.917Z"
  - title: "numpy.linalg.solve"
    url: "https://numpy.org/doc/stable/reference/generated/numpy.linalg.solve.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:52.408Z"
  - title: "CS229 Linear Algebra Review and Reference"
    url: "https://cs229.stanford.edu/section/cs229-linalg.pdf"
    publisher: "Stanford CS229"
    fetched_at: "2026-10-29T15:43:55.047Z"
highlights: ["* multiplies element-wise; @ is real matrix multiplication.", "np.linalg.solve(A, b) is faster and more accurate than computing inv(A) @ b."]
phase: 3
step: 7
draft: false
date: "2024-02-22"
---

This is the maths I'll need for ML:

- `A * B` is **element-wise**. `A @ B` is **matrix multiplication** (it needs inner dimensions to match: `(m,k) @ (k,n)`).
- To solve `Ax = b`, use `np.linalg.solve(A, b)`. It's faster and more numerically accurate than `inv(A) @ b`.
- `np.linalg.det`, `np.linalg.norm`, `np.linalg.eig` / `eigh` (`eigh` for symmetric matrices).
- Check results with `np.allclose`, because floats are rarely exactly equal.

```python run
import numpy as np

A = np.array([[3., 1.], [1., 2.]])
b = np.array([9., 8.])

print(A * A)
print(A @ A)

x = np.linalg.solve(A, b)
print("x =", x, "check:", np.allclose(A @ x, b))
print("det =", round(np.linalg.det(A), 6), "norm(b) =", round(np.linalg.norm(b), 4))

vals, vecs = np.linalg.eigh(A)
print("eigenvalues:", vals.round(4))
v = vecs[:, 0]
print("A v == lambda v:", np.allclose(A @ v, vals[0] * v))
print(np.linalg.inv(A).round(4))
```

Output:

```text
[[9. 1.]
 [1. 4.]]
[[10.  5.]
 [ 5.  5.]]
x = [2. 3.] check: True
det = 5.0 norm(b) = 12.0416
eigenvalues: [1.382 3.618]
A v == lambda v: True
[[ 0.4 -0.2]
 [-0.2  0.6]]
```
