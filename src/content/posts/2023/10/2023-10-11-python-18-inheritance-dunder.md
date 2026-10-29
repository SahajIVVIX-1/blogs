---
title: "Python · OOP: inheritance and dunder methods"
categories: ["study"]
tags: ["python", "oop"]
summary: "Subclassing with super(), method overriding, and dunder methods (__repr__, __eq__, __len__, __add__) that plug objects into Python syntax."
sources: 
  - title: "Inheritance"
    url: "https://docs.python.org/3/tutorial/classes.html#inheritance"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:59.675Z"
  - title: "Data model: special method names"
    url: "https://docs.python.org/3/reference/datamodel.html#special-method-names"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:00.675Z"
  - title: "Built-in functions: super"
    url: "https://docs.python.org/3/library/functions.html#super"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:01.032Z"
highlights: ["Dunder methods are how your objects plug into Python syntax like len(), ==, + and print.", "super().__init__(...) lets the parent class do its part of the setup."]
phase: 1
step: 18
draft: false
date: "2023-10-11"
---

**Inheritance:** `class Child(Parent)` reuses everything the parent has. The child can **override** methods and call the parent's version through `super()`.

**Dunder** ("double underscore") methods are how objects hook into Python's own syntax:

| you write | Python calls |
|---|---|
| `repr(v)` / in the REPL | `__repr__` |
| `str(v)` / `print(v)` | `__str__` |
| `a == b` | `__eq__` |
| `a + b` | `__add__` |
| `len(v)` | `__len__` |

```python run
import math

class Shape:
    def __init__(self, name):
        self.name = name
    def area(self):
        raise NotImplementedError
    def __repr__(self):
        return f"{type(self).__name__}({self.name!r}, area={self.area():.2f})"

class Circle(Shape):
    def __init__(self, r):
        super().__init__("circle")
        self.r = r
    def area(self):
        return math.pi * self.r ** 2

class Vec:
    def __init__(self, *xs): self.xs = xs
    def __add__(self, o):    return Vec(*(a + b for a, b in zip(self.xs, o.xs)))
    def __eq__(self, o):     return self.xs == o.xs
    def __len__(self):       return len(self.xs)
    def __repr__(self):      return f"Vec{self.xs}"

print(Circle(1))
print(isinstance(Circle(2), Shape))
v = Vec(1, 2, 3) + Vec(10, 20, 30)
print(v, len(v), v == Vec(11, 22, 33))
```

Output:

```text
Circle('circle', area=3.14)
True
Vec(11, 22, 33) 3 True
```
