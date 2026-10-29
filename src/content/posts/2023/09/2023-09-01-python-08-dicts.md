---
title: "Python · Dictionaries"
categories: ["study"]
tags: ["python", "data-structures"]
summary: "Dictionaries for key-value lookups: get() with defaults, iterating items(), insertion order, and counting with Counter."
sources: 
  - title: "Data Structures: dictionaries"
    url: "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:42.115Z"
  - title: "Mapping types: dict"
    url: "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:43.535Z"
  - title: "collections.Counter"
    url: "https://docs.python.org/3/library/collections.html#collections.Counter"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:43.725Z"
highlights: ["Since Python 3.7, dicts keep insertion order as a language guarantee.", "d.get(key, default) avoids a KeyError when the key may be missing."]
phase: 1
step: 8
draft: false
date: "2023-09-01"
---

A dict maps **keys** to **values**. Looking up a key is fast (a hash table on average). Keys must be hashable, so ints, strings and tuples work but lists don't.

Things I practised:

- `d[k]` raises `KeyError` if `k` is missing. `d.get(k, default)` returns the default instead.
- `d.items()`, `d.keys()` and `d.values()` give live *views* of the dict.
- Since Python 3.7, dicts keep **insertion order** as a language guarantee.
- `d.setdefault(k, [])` and `collections.defaultdict` make grouping easy.
- `collections.Counter` is a dict built for counting.
- `d1 | d2` merges two dicts (Python 3.9+).

```python run
from collections import Counter, defaultdict

marks = {"maths": 88, "physics": 79}
marks["python"] = 95
print(marks)
print(marks.get("chemistry", "n/a"))

for subject, m in marks.items():
    print(f"{subject:>8}: {m}")

text = "to be or not to be"
print(Counter(text.split()).most_common(2))

by_len = defaultdict(list)
for w in text.split():
    by_len[len(w)].append(w)
print(dict(by_len))
print({"a": 1} | {"b": 2})
```

Output:

```text
{'maths': 88, 'physics': 79, 'python': 95}
n/a
   maths: 88
 physics: 79
  python: 95
[('to', 2), ('be', 2)]
{2: ['to', 'be', 'or', 'to', 'be'], 3: ['not']}
{'a': 1, 'b': 2}
```
