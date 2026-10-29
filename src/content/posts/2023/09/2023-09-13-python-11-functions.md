---
title: "Python · Functions: arguments and return values"
categories: ["study"]
tags: ["python", "functions"]
summary: "Defining functions, positional vs keyword arguments, default values, the mutable-default trap, and returning several values."
sources: 
  - title: "Defining Functions"
    url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:47.866Z"
  - title: "More on Defining Functions"
    url: "https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:48.460Z"
  - title: "Programming FAQ: default values shared between objects"
    url: "https://docs.python.org/3/faq/programming.html#why-are-default-values-shared-between-objects"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:49.391Z"
highlights: ["Default values are evaluated once, when the function is defined, so never use a mutable default like [].", "Returning a, b actually returns one tuple, which the caller can unpack."]
phase: 1
step: 11
draft: false
date: "2023-09-13"
---

`def name(params):` defines a function, and a docstring right under the `def` line documents it. If a function has no `return`, it returns `None`.

Arguments can be passed **by position** or **by keyword** (`f(x=1)`), and parameters can have **default values**.

The classic trap: default values are evaluated *once*, when the `def` runs. A mutable default like `[]` is therefore shared by every call. The fix is to default to `None` and create the list inside the function.

`return a, b` returns a single tuple, and the caller unpacks it.

```python run
def grade(marks, total=100):
    """Return percentage and letter grade."""
    pct = 100 * marks / total
    letter = "A" if pct >= 85 else "B" if pct >= 70 else "C"
    return pct, letter

p, g = grade(88)
print(p, g)
print(grade(total=50, marks=40))

def bad_append(x, items=[]):
    items.append(x)
    return items

def good_append(x, items=None):
    if items is None:
        items = []
    items.append(x)
    return items

print(bad_append(1), bad_append(2))    # shared list!
print(good_append(1), good_append(2))
print(grade.__doc__)
```

Output:

```text
88.0 A
(80.0, 'B')
[1, 2] [1, 2]
[1] [2]
Return percentage and letter grade.
```
