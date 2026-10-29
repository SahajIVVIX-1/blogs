---
title: "Python · Strings: f-strings and formatting"
categories: ["study"]
tags: ["python", "strings"]
summary: "f-strings, the format mini-language (width, precision, alignment, thousands separators) and the = debugging shortcut."
sources: 
  - title: "PEP 498: Literal String Interpolation"
    url: "https://peps.python.org/pep-0498/"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:37.665Z"
  - title: "Format Specification Mini-Language"
    url: "https://docs.python.org/3/library/string.html#format-specification-mini-language"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:38.038Z"
  - title: "Input and Output: formatted string literals"
    url: "https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:38.633Z"
highlights: ["Everything after the colon in {value:spec} is the format spec: width, alignment, precision, type.", "f\"{x=}\" prints both the expression and its value, which is handy for debugging."]
phase: 1
step: 5
draft: false
date: "2023-08-21"
---

An f-string is a string literal prefixed with `f`. Anything inside `{ }` is evaluated as a Python expression and inserted into the text. PEP 498 added them in Python 3.6.

After a colon you can add a **format spec**: `{value:spec}`. The parts I practised:

- `:.2f`: 2 decimal places
- `:>10` / `:<10` / `:^10`: right, left or centre align in a width of 10
- `:,`: thousands separator
- `:08.3f`: pad with zeros to width 8
- `:.1%`: show as a percentage
- `:b`, `:x`: binary, hex

Writing `{x=}` prints the expression text *and* its value, which saves a lot of debugging prints.

```python run
name, marks, total = "Sahaj", 437, 500
pct = marks / total

print(f"{name} scored {marks}/{total} = {pct:.1%}")
print(f"|{name:<10}|{name:^10}|{name:>10}|")
print(f"{1234567.891:,.2f}")
print(f"{3.14159:08.3f}")
print(f"{255:b} {255:x} {255:o}")
print(f"{marks=}, {pct=:.3f}")
```

Output:

```text
Sahaj scored 437/500 = 87.4%
|Sahaj     |  Sahaj   |     Sahaj|
1,234,567.89
0003.142
11111111 ff 377
marks=437, pct=0.874
```
