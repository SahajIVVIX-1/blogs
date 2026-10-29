---
title: "Python · Iterators"
categories: ["study"]
tags: ["python", "iterators"]
summary: "The iterator protocol behind every for loop: iter(), next(), StopIteration, and writing an iterator class."
sources: 
  - title: "Iterators (tutorial)"
    url: "https://docs.python.org/3/tutorial/classes.html#iterators"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:01.490Z"
  - title: "Iterator types"
    url: "https://docs.python.org/3/library/stdtypes.html#iterator-types"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:02.358Z"
  - title: "Glossary: iterable"
    url: "https://docs.python.org/3/glossary.html#term-iterable"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:03.420Z"
highlights: ["A for loop calls iter() once, then next() repeatedly until StopIteration.", "An iterable gives you iterators; an iterator is used up after one pass."]
phase: 1
step: 19
draft: false
date: "2023-10-16"
---

What `for x in obj:` really does:

1. `it = iter(obj)` asks the iterable for an iterator (`obj.__iter__()`).
2. It calls `next(it)` again and again (`it.__next__()`).
3. It stops when `StopIteration` is raised.

An **iterable** (list, string, dict, file) can hand out fresh iterators. An **iterator** remembers where it is and is **used up** after one pass. That explains why looping over the same `zip` or `map` object a second time gives nothing.

To write your own iterator, give the class `__iter__` (which returns `self`) and `__next__`.

```python run
nums = [10, 20, 30]
it = iter(nums)
print(next(it), next(it), next(it))
try:
    next(it)
except StopIteration:
    print("StopIteration")

class Countdown:
    def __init__(self, start):
        self.n = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

print(list(Countdown(5)))

z = zip("abc", [1, 2, 3])
print(list(z))
print(list(z))   # exhausted iterator
```

Output:

```text
10 20 30
StopIteration
[5, 4, 3, 2, 1]
[('a', 1), ('b', 2), ('c', 3)]
[]
```
