---
title: "Python · Types: int, float, bool, None"
categories: ["study"]
tags: ["python", "types"]
summary: "Python's basic scalar types, why 0.1 + 0.2 is not exactly 0.3, and how None differs from False."
sources: 
  - title: "Built-in Types: numeric types"
    url: "https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:33.853Z"
  - title: "Floating-Point Arithmetic: Issues and Limitations"
    url: "https://docs.python.org/3/tutorial/floatingpoint.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:34.160Z"
  - title: "Truth Value Testing"
    url: "https://docs.python.org/3/library/stdtypes.html#truth-value-testing"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:35.001Z"
highlights: ["Python ints have arbitrary precision, so they never overflow.", "Floats are binary approximations, so compare them with math.isclose, not ==."]
phase: 1
step: 3
draft: false
date: "2023-08-11"
---

Today's topic was Python's four basic scalar types.

- **int**: whole numbers. Python ints have *arbitrary precision*, so `2**100` just works and never overflows.
- **float**: double-precision floating point. Floats are binary approximations, so `0.1 + 0.2` is not exactly `0.3`. Use `math.isclose` to compare them.
- **bool**: `True` and `False`. `bool` is a subclass of `int`, so `True + True == 2`.
- **None**: the single value of type `NoneType`. It means "no value", and you test for it with `is None`.

`/` always returns a float. `//` is floor division and `%` is the remainder. `type()` tells you what you have.

Truthiness: `0`, `0.0`, `""`, `[]`, `{}` and `None` are all falsy. Most other values are truthy.

```python run
import math

print(2 ** 100)
print(7 / 2, 7 // 2, 7 % 2)
print(0.1 + 0.2, 0.1 + 0.2 == 0.3, math.isclose(0.1 + 0.2, 0.3))
print(True + True, isinstance(True, int))

result = None
print(result is None, type(result).__name__)
for v in [0, 1, "", "hi", [], None]:
    print(repr(v), "->", bool(v))
```

Output:

```text
1267650600228229401496703205376
3.5 3 1
0.30000000000000004 False True
2 True
True NoneType
0 -> False
1 -> True
'' -> False
'hi' -> True
[] -> False
None -> False
```
