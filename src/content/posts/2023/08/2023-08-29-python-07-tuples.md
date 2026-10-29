---
title: "Python · Tuples and unpacking"
categories: ["study"]
tags: ["python", "data-structures"]
summary: "Tuples as fixed records, the one-element tuple comma, unpacking with *rest, and swapping without a temp variable."
sources: 
  - title: "Tuples and Sequences"
    url: "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:40.877Z"
  - title: "PEP 3132: Extended Iterable Unpacking"
    url: "https://peps.python.org/pep-3132/"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:41.339Z"
  - title: "collections.namedtuple"
    url: "https://docs.python.org/3/library/collections.html#collections.namedtuple"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:41.768Z"
highlights: ["It is the comma that makes a tuple, not the parentheses.", "Star-unpacking (first, *rest = seq) collects the leftovers into a list."]
phase: 1
step: 7
draft: false
date: "2023-08-29"
---

A tuple is an **immutable** sequence. I use one when a group of values belongs together and shouldn't change, such as a coordinate or a database row. Because tuples are immutable (and hashable when their items are), they can be dictionary keys.

It's the **comma** that makes a tuple. `(5)` is just the int 5, while `(5,)` and `5,` are one-element tuples.

**Unpacking** assigns the items of a sequence to several names at once:

- `x, y = point`
- `a, b = b, a` swaps two values with no temporary variable
- `first, *rest = items` collects whatever is left into a list (PEP 3132)

`collections.namedtuple` lets you access the fields by name, which makes the code easier to read.

```python run
from collections import namedtuple

point = (3, 4)
x, y = point
print(x, y, type((5)).__name__, type((5,)).__name__)

a, b = 1, 2
a, b = b, a
print(a, b)

first, *middle, last = [10, 20, 30, 40, 50]
print(first, middle, last)

Student = namedtuple("Student", ["name", "branch", "year"])
s = Student("Sahaj", "ICT", 2023)
print(s.name, s.branch, s[2])
print({(0, 0): "origin"}[(0, 0)])
```

Output:

```text
3 4 int tuple
2 1
10 [20, 30, 40] 50
Sahaj ICT 2023
origin
```
