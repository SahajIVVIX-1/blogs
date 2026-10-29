---
title: "Python · Comprehensions"
categories: ["study"]
tags: ["python", "comprehensions"]
summary: "List, dict and set comprehensions, filtering with if, nested loops, and when a generator expression is the better choice."
sources: 
  - title: "List Comprehensions"
    url: "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:51.135Z"
  - title: "PEP 202: List Comprehensions"
    url: "https://peps.python.org/pep-0202/"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:51.477Z"
  - title: "Generator expressions"
    url: "https://docs.python.org/3/reference/expressions.html#generator-expressions"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:52.036Z"
highlights: ["A comprehension reads like the loop it replaces: expression, then for, then an optional if.", "Inside sum() or any(), a generator expression avoids building a whole list in memory."]
phase: 1
step: 13
draft: false
date: "2023-09-21"
---

A comprehension builds a collection in one expression. It reads in the same order as the loop it replaces:

```text
[expression for item in iterable if condition]
```

- `{k: v for ...}` builds a dict, and `{x for ...}` builds a set.
- You can chain loops: `[(i, j) for i in a for j in b]`. The loops nest left to right.
- `(x for ...)` in round brackets is a **generator expression**. It's lazy, so `sum(x*x for x in range(10**6))` never builds the full list.

My rule from today: if the comprehension needs more than one `if`, or a nested loop that is hard to read, write the plain loop instead.

```python run
squares = [n * n for n in range(10)]
evens = [n for n in squares if n % 2 == 0]
print(squares)
print(evens)

words = ["python", "numpy", "pandas", "torch"]
lengths = {w: len(w) for w in words}
firsts = {w[0] for w in words}
print(lengths)
print(sorted(firsts))

pairs = [(i, j) for i in range(3) for j in range(3) if i < j]
print(pairs)

matrix = [[1, 2, 3], [4, 5, 6]]
transpose = [[row[c] for row in matrix] for c in range(3)]
print(transpose)
print(sum(n * n for n in range(1_000_000)))
```

Output:

```text
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
[0, 4, 16, 36, 64]
{'python': 6, 'numpy': 5, 'pandas': 6, 'torch': 5}
['n', 'p', 't']
[(0, 1), (0, 2), (1, 2)]
[[1, 4], [2, 5], [3, 6]]
333332833333500000
```
