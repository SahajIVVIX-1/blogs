---
title: "Python · Functions: *args, **kwargs and scope"
categories: ["study"]
tags: ["python", "functions"]
summary: "Variable-length arguments with *args and **kwargs, keyword-only parameters, unpacking at the call site, and LEGB scope."
sources: 
  - title: "Arbitrary Argument Lists"
    url: "https://docs.python.org/3/tutorial/controlflow.html#arbitrary-argument-lists"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:49.669Z"
  - title: "Python Scopes and Namespaces"
    url: "https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:50.494Z"
  - title: "PEP 3102: Keyword-Only Arguments"
    url: "https://peps.python.org/pep-3102/"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:51.034Z"
highlights: ["*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict.", "Python looks names up in the order Local, Enclosing, Global, Built-in."]
phase: 1
step: 12
draft: false
date: "2023-09-18"
---

- `*args` collects any extra **positional** arguments into a tuple.
- `**kwargs` collects any extra **keyword** arguments into a dict.
- Parameters listed after a bare `*` are **keyword-only** (PEP 3102).
- At the call site it works the other way round: `f(*lst)` and `f(**d)` *unpack* a list or dict into arguments.

**Scope (LEGB).** Python looks a name up in this order: **L**ocal, then **E**nclosing function, then **G**lobal (the module), then **B**uilt-in. To assign to a variable from an outer scope, you need `nonlocal` (enclosing function) or `global` (module level).

```python run
def describe(*args, sep=", ", **kwargs):
    print("args:", args)
    print("kwargs:", kwargs)
    return sep.join(map(str, args))

print(describe(1, 2, 3, sep=" | ", unit="cm", rounded=True))

nums = [4, 5]
opts = {"sep": "+"}
print(describe(*nums, **opts))

def counter():
    count = 0
    def inc():
        nonlocal count
        count += 1
        return count
    return inc

c = counter()
print(c(), c(), c())
len = 5          # shadows the built-in in this module (don't do this!)
print(len)
del len
print(len("abc"))
```

Output:

```text
args: (1, 2, 3)
kwargs: {'unit': 'cm', 'rounded': True}
1 | 2 | 3
args: (4, 5)
kwargs: {}
4+5
1 2 3
5
3
```
