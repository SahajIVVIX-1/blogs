---
title: "Python · Syntax: indentation, comments, print"
categories: ["study"]
tags: ["python", "syntax"]
summary: "How Python uses indentation instead of braces, how comments work, and the options print() takes."
sources: 
  - title: "An Informal Introduction to Python"
    url: "https://docs.python.org/3/tutorial/introduction.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:30.825Z"
  - title: "Lexical analysis: indentation"
    url: "https://docs.python.org/3/reference/lexical_analysis.html#indentation"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:31.505Z"
  - title: "PEP 8: Style Guide for Python Code"
    url: "https://peps.python.org/pep-0008/"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:32.294Z"
  - title: "Built-in functions: print"
    url: "https://docs.python.org/3/library/functions.html#print"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:32.863Z"
highlights: ["Indentation is not style in Python, it is syntax: it decides which statements belong to a block.", "print() accepts sep and end to control what goes between and after values."]
phase: 1
step: 2
draft: false
date: "2023-08-08"
---

Python has no `{ }` around blocks. A colon opens a block, and every line in that block is indented by the same amount. PEP 8 recommends 4 spaces. If the indentation is inconsistent you get an `IndentationError`, so here indentation is syntax, not just style.

Comments start with `#` and run to the end of the line. A string on its own line (often triple-quoted) is not a comment; it is an expression whose value is thrown away. At the top of a function, though, it becomes the docstring.

`print()` takes any number of values. It also has keyword arguments:

- `sep`: what goes *between* values (default is a space)
- `end`: what goes *after* the last value (default is a newline)

```python run
# a block is opened by ":" and defined by indentation
x = 7
if x > 5:
    print("x is big")       # inside the if-block
    print("still inside")
print("outside the block")

print("a", "b", "c")             # default sep=" "
print("a", "b", "c", sep="-")    # custom separator
print("no newline", end=" | ")
print("same line")
```

Output:

```text
x is big
still inside
outside the block
a b c
a-b-c
no newline | same line
```
