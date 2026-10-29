---
title: "Python · Decorators"
categories: ["study"]
tags: ["python", "decorators"]
summary: "Functions as objects, closures, writing decorators with functools.wraps, and decorators that take arguments."
sources: 
  - title: "PEP 318: Decorators for Functions and Methods"
    url: "https://peps.python.org/pep-0318/"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:05.811Z"
  - title: "Glossary: decorator"
    url: "https://docs.python.org/3/glossary.html#term-decorator"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:06.075Z"
  - title: "functools.wraps"
    url: "https://docs.python.org/3/library/functools.html#functools.wraps"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:06.784Z"
highlights: ["@decorator above def f is just f = decorator(f).", "functools.wraps copies the original function's name and docstring onto the wrapper."]
phase: 1
step: 21
draft: false
date: "2023-10-24"
---

Functions are objects. They can be passed around, returned, and kept inside other functions (closures). A **decorator** is a function that takes a function and returns a new one, usually a wrapper that adds behaviour before or after the original runs.

```text
@timer
def f(): ...
```

is exactly the same as `f = timer(f)`.

- Use `functools.wraps` on the wrapper. Otherwise the decorated function loses its `__name__` and docstring.
- A decorator that takes **arguments** (`@repeat(3)`) needs one extra layer: a function that *returns* a decorator.
- The standard library already ships useful ones, for example `functools.lru_cache`.

```python run
import functools, time

def timer(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        t0 = time.perf_counter()
        result = fn(*args, **kwargs)
        ms = (time.perf_counter() - t0) * 1000
        print(f"{fn.__name__} took {'<1' if ms < 1 else round(ms)} ms")
        return result
    return wrapper

def repeat(n):
    def deco(fn):
        @functools.wraps(fn)
        def wrapper(*a, **k):
            return [fn(*a, **k) for _ in range(n)]
        return wrapper
    return deco

@timer
def add(a, b):
    """Add two numbers."""
    return a + b

@repeat(3)
def hello(name):
    return f"hi {name}"

print(add(2, 3), add.__name__, add.__doc__)
print(hello("Sahaj"))

@functools.lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
print(fib(80), fib.cache_info().hits)
```

Output:

```text
add took <1 ms
5 add Add two numbers.
['hi Sahaj', 'hi Sahaj', 'hi Sahaj']
23416728348467685 78
```
