---
title: "Python · Generators"
categories: ["study"]
tags: ["python", "generators"]
summary: "Generator functions with yield, lazy evaluation, infinite sequences, pipelines, and itertools."
sources: 
  - title: "Generators (tutorial)"
    url: "https://docs.python.org/3/tutorial/classes.html#generators"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:03.926Z"
  - title: "PEP 255: Simple Generators"
    url: "https://peps.python.org/pep-0255/"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:04.494Z"
  - title: "itertools"
    url: "https://docs.python.org/3/library/itertools.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:05.466Z"
highlights: ["A function with yield returns a generator that pauses at each yield and resumes on next().", "Generators produce values lazily, so they can describe infinite or very large sequences."]
phase: 1
step: 20
draft: false
date: "2023-10-19"
---

A **generator function** is a function that contains `yield`. Calling it doesn't run the body. Instead it returns a generator object, which is an iterator. Each `next()` runs the body up to the next `yield`, hands out that value, and **pauses** with its local state kept.

Why this is useful:

- **Lazy**: values are produced only when someone asks for them, so memory stays small.
- **Infinite sequences** are fine, as long as you take only what you need (`itertools.islice`).
- **Pipelines**: chaining generators gives a stream-processing style.

The class iterator I wrote yesterday shrinks to a few lines as a generator.

```python run
from itertools import islice, count

def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(5)))

def fib():
    a, b = 0, 1
    while True:          # infinite, but lazy
        yield a
        a, b = b, a + b

print(list(islice(fib(), 12)))

# pipeline: numbers -> squares -> only even -> first 5
squares = (n * n for n in count(1))
even_sq = (s for s in squares if s % 2 == 0)
print(list(islice(even_sq, 5)))

g = countdown(2)
print(next(g), next(g), next(g, "done"))
```

Output:

```text
[5, 4, 3, 2, 1]
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
[4, 16, 36, 64, 100]
2 1 done
```
