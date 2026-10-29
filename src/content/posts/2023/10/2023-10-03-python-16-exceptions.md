---
title: "Python · Exceptions"
categories: ["study"]
tags: ["python", "exceptions"]
summary: "try/except/else/finally, catching specific exceptions, raising your own, and custom exception classes."
sources: 
  - title: "Errors and Exceptions"
    url: "https://docs.python.org/3/tutorial/errors.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:56.210Z"
  - title: "Built-in Exceptions"
    url: "https://docs.python.org/3/library/exceptions.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:56.911Z"
  - title: "The try statement"
    url: "https://docs.python.org/3/reference/compound_stmts.html#the-try-statement"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:57.503Z"
highlights: ["Catch the narrowest exception you can handle; a bare except also swallows bugs.", "else runs only when the try block raised nothing, and finally always runs."]
phase: 1
step: 16
draft: false
date: "2023-10-03"
---

How the four blocks fit together:

```text
try:      code that might fail
except E: runs if an E (or subclass) was raised
else:     runs only if nothing was raised
finally:  always runs (cleanup)
```

Lessons from today:

- Catch **specific** exceptions such as `ValueError` or `KeyError`. A bare `except:` also catches bugs and even `KeyboardInterrupt`.
- `raise ValueError("msg")` signals an error yourself.
- Custom exceptions are simple subclasses of `Exception`.
- `raise NewError(...) from e` keeps the original cause attached.

```python run
class MarksError(ValueError):
    """Marks outside the allowed range."""

def parse_marks(text):
    try:
        m = int(text)
    except ValueError as e:
        raise MarksError(f"not a number: {text!r}") from e
    else:
        if not 0 <= m <= 100:
            raise MarksError(f"out of range: {m}")
        return m
    finally:
        print(f"  checked {text!r}")

for raw in ["88", "abc", "140"]:
    try:
        print("ok:", parse_marks(raw))
    except MarksError as e:
        print("error:", e, "| cause:", type(e.__cause__).__name__)
```

Output:

```text
  checked '88'
ok: 88
  checked 'abc'
error: not a number: 'abc' | cause: ValueError
  checked '140'
error: out of range: 140 | cause: NoneType
```
