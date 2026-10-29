---
title: "Probability and Statistics · Probability rules"
categories: ["study"]
tags: ["probability"]
summary: "Sample spaces and events, the complement, addition and multiplication rules, independence, and checking them by simulation."
sources: 
  - title: "MIT 18.05 Introduction to Probability and Statistics (Spring 2022)"
    url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T16:06:42.472Z"
  - title: "Seeing Theory: basic probability"
    url: "https://seeing-theory.brown.edu/basic-probability/index.html"
    publisher: "Brown University"
    fetched_at: "2026-10-29T16:06:44.982Z"
  - title: "OpenIntro Statistics (ch. 3, probability)"
    url: "https://www.openintro.org/book/os/"
    publisher: "OpenIntro"
    fetched_at: "2026-10-29T16:06:39.881Z"
highlights: ["P(A or B) = P(A) + P(B) − P(A and B), because the overlap is otherwise counted twice.", "Simulation is a quick sanity check for any probability calculation."]
phase: 6
step: 2
draft: false
date: "2024-05-07"
---

- **Sample space** S: every possible outcome. An **event** is a subset of S.
- **Complement**: P(not A) = 1 − P(A). This is often the easiest route ("at least one" problems).
- **Addition rule**: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Subtract the overlap so it isn't counted twice.
- **Independence**: P(A ∩ B) = P(A)·P(B). Knowing A tells you nothing about B.

Classic check with two dice: A = "the first die is even", B = "the sum is 7". The question is whether they're independent.

I verify each rule two ways: exact counting over all 36 outcomes, and a simulation.

```python run
from itertools import product
from fractions import Fraction
import numpy as np

S = list(product(range(1, 7), repeat=2))
P = lambda event: Fraction(sum(event(a, b) for a, b in S), len(S))

A = lambda a, b: a % 2 == 0
B = lambda a, b: a + b == 7
AB = lambda a, b: A(a, b) and B(a, b)
AorB = lambda a, b: A(a, b) or B(a, b)

print("P(A)", P(A), "P(B)", P(B), "P(A and B)", P(AB))
print("addition rule holds:", P(AorB) == P(A) + P(B) - P(AB))
print("independent:", P(AB) == P(A) * P(B))
print("P(at least one six) =", 1 - Fraction(5, 6) ** 2)

rng = np.random.default_rng(0)
d = rng.integers(1, 7, size=(200_000, 2))
print("simulated P(at least one six) ~", round(((d == 6).any(axis=1)).mean(), 3), "exact", round(11 / 36, 3))
```

Output:

```text
P(A) 1/2 P(B) 1/6 P(A and B) 1/12
addition rule holds: True
independent: True
P(at least one six) = 11/36
simulated P(at least one six) ~ 0.305 exact 0.306
```
