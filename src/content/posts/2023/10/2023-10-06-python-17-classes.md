---
title: "Python · OOP: classes and objects"
categories: ["study"]
tags: ["python", "oop"]
summary: "Defining classes, __init__ and self, instance vs class attributes, methods, and properties."
sources: 
  - title: "Classes"
    url: "https://docs.python.org/3/tutorial/classes.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:57.839Z"
  - title: "Built-in functions: property"
    url: "https://docs.python.org/3/library/functions.html#property"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:58.591Z"
  - title: "Class and instance variables"
    url: "https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:59.048Z"
highlights: ["self is just the instance, passed automatically as the first argument of a method.", "Class attributes are shared by all instances; instance attributes belong to one object."]
phase: 1
step: 17
draft: false
date: "2023-10-06"
---

A **class** is a blueprint, and an **object** (instance) is one thing built from it.

- `__init__` runs when an object is created and sets up the instance attributes.
- `self` is the instance itself. Python passes it automatically, so `obj.method(x)` becomes `Class.method(obj, x)`.
- **Class attributes** are defined in the class body and shared by every instance. **Instance attributes** are set on `self` and belong to one object.
- `@property` lets a method be read like an attribute. That's useful for computed values or for validating input.

```python run
class Student:
    university = "PDEU"                  # class attribute (shared)

    def __init__(self, name, marks):
        self.name = name                 # instance attributes
        self._marks = marks

    @property
    def marks(self):
        return self._marks

    @marks.setter
    def marks(self, value):
        if not 0 <= value <= 100:
            raise ValueError("marks must be 0..100")
        self._marks = value

    def passed(self, cutoff=40):
        return self._marks >= cutoff

a = Student("Sahaj", 88)
b = Student("Ravi", 35)
print(a.name, a.marks, a.passed(), b.passed())
print(a.university, b.university, Student.university)
a.marks = 91
print(a.marks)
try:
    a.marks = 150
except ValueError as e:
    print("ValueError:", e)
print(Student.passed(b, cutoff=30))   # what a.method() really does
```

Output:

```text
Sahaj 88 True False
PDEU PDEU PDEU
91
ValueError: marks must be 0..100
True
```
