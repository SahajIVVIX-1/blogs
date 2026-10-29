---
title: "Probability and Statistics · Conditional probability"
categories: ["study"]
tags: ["probability"]
summary: "P(A | B) as shrinking the sample space to B, the multiplication rule, the law of total probability, and the Monty Hall problem by simulation."
sources: 
  - title: "MIT 18.05 Reading 3: Conditional probability"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/readings/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:18:15.854Z"
  - title: "Seeing Theory: compound probability"
    url: "https://seeing-theory.brown.edu/compound-probability/index.html"
    publisher: "Brown University"
    fetched_at: "2026-10-29T16:06:45.644Z"
  - title: "OpenIntro Statistics"
    url: "https://www.openintro.org/book/os/"
    publisher: "OpenIntro"
    fetched_at: "2026-10-29T16:06:39.881Z"
highlights: ["Conditioning on B means throwing away every outcome where B didn't happen.", "The law of total probability splits a hard probability into easier cases."]
phase: 6
step: 3
draft: false
date: "2024-05-14"
---

**P(A | B) = P(A ∩ B) / P(B)**. Conditioning on B means restricting the world to the outcomes where B happened, then asking how often A happens inside it.

- Multiplication rule: P(A ∩ B) = P(A | B)·P(B).
- **Law of total probability**: if B₁…Bₖ split S into pieces, then P(A) = Σ P(A | Bᵢ)·P(Bᵢ).

**Monty Hall** is the standard intuition test. You pick door 1. The host, who knows where the car is, opens a different door that has a goat. Should you switch? Conditioning says switching wins 2/3 of the time. I didn't trust that until I simulated it.

```python run
import numpy as np

rng = np.random.default_rng(1)
n = 100_000
car = rng.integers(0, 3, n)
pick = np.zeros(n, dtype=int)

# host opens a goat door that is not the pick
host = np.empty(n, dtype=int)
for i in range(n):
    options = [d for d in (0, 1, 2) if d != pick[i] and d != car[i]]
    host[i] = options[rng.integers(len(options))]
switch_to = 3 - pick - host

print("stay wins  :", round((pick == car).mean(), 3))
print("switch wins:", round((switch_to == car).mean(), 3))

# law of total probability: P(defect) from two machines
p_m = {"M1": 0.6, "M2": 0.4}
p_def_given = {"M1": 0.02, "M2": 0.05}
print("P(defect) =", sum(p_m[m] * p_def_given[m] for m in p_m))
```

Output:

```text
stay wins  : 0.334
switch wins: 0.666
P(defect) = 0.032
```
