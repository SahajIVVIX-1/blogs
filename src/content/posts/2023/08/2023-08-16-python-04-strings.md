---
title: "Python · Strings: indexing, slicing, methods"
categories: ["study"]
tags: ["python", "strings"]
summary: "Strings as immutable sequences: indexing, negative indexes, slicing with steps, and the common methods."
sources: 
  - title: "An Informal Introduction to Python: text"
    url: "https://docs.python.org/3/tutorial/introduction.html#text"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:35.197Z"
  - title: "String methods"
    url: "https://docs.python.org/3/library/stdtypes.html#string-methods"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:36.345Z"
  - title: "Common sequence operations"
    url: "https://docs.python.org/3/library/stdtypes.html#common-sequence-operations"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:36.922Z"
highlights: ["Strings are immutable: every method returns a new string.", "A slice s[start:stop:step] includes start but stops before stop."]
phase: 1
step: 4
draft: false
date: "2023-08-16"
---

A string is an **immutable sequence** of Unicode characters. Immutable means `s[0] = "X"` raises an error, and every "changing" method actually returns a *new* string.

Indexing starts at 0. Negative indexes count from the end, so `s[-1]` is the last character.

Slicing is `s[start:stop:step]`. `start` is included and `stop` is excluded, and any of the three can be left out. `s[::-1]` reverses a string.

The methods I'll use most:

| method | does |
|---|---|
| `strip()` | removes whitespace at both ends |
| `lower()` / `upper()` | changes case |
| `split(sep)` | turns a string into a list of parts |
| `"sep".join(list)` | the reverse of split |
| `replace(a, b)` | returns a copy with replacements |
| `find(x)` / `in` | searches |

```python run
s = "  Pandit Deendayal Energy University  "
t = s.strip()
print(repr(t))
print(t[0], t[-1], t[7:16], t[::-1][:10])

words = t.split()
print(words, len(words))
print("".join(w[0] for w in words))   # initials
print(t.lower().replace("university", "Univ."))
print("Energy" in t, t.find("Energy"))

try:
    t[0] = "p"
except TypeError as e:
    print("TypeError:", e)
```

Output:

```text
'Pandit Deendayal Energy University'
P y Deendayal ytisrevinU
['Pandit', 'Deendayal', 'Energy', 'University'] 4
PDEU
pandit deendayal energy Univ.
True 17
TypeError: 'str' object does not support item assignment
```
