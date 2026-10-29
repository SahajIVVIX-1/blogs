---
title: "Python · Lists"
categories: ["study"]
tags: ["python", "data-structures"]
summary: "Lists as mutable sequences: append vs extend, slicing, sorting in place vs sorted(), and the aliasing trap."
sources: 
  - title: "Data Structures: more on lists"
    url: "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:39.235Z"
  - title: "Mutable sequence types"
    url: "https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:40.080Z"
  - title: "Sorting Techniques"
    url: "https://docs.python.org/3/howto/sorting.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:40.449Z"
highlights: ["b = a does not copy a list; both names point to the same object.", "list.sort() changes the list and returns None; sorted() returns a new list."]
phase: 1
step: 6
draft: false
date: "2023-08-24"
---

A list is an ordered, **mutable** collection, and it can hold items of different types. The operations I worked through today:

- `append(x)` adds one item. `extend(iterable)` adds every item from another iterable.
- `insert(i, x)`, `pop(i)` and `remove(x)` insert or delete items.
- `sort()` sorts **in place** and returns `None`. `sorted(lst)` returns a **new** list and leaves the original alone.
- `key=` sorts by a computed value, for example `key=len`.

The biggest trap is **aliasing**. `b = a` does not copy the list. It gives the same list a second name, so changing `b` also changes `a`. Use `a.copy()` or `a[:]` to get a real copy (a shallow one).

```python run
a = [3, 1, 2]
a.append(4)
a.extend([0, 9])
print(a)

print(sorted(a), a)          # sorted() leaves a alone
print(a.sort(), a)           # sort() returns None, changes a

b = a          # alias
c = a.copy()   # copy
b.append(100)
print("a:", a)
print("c:", c)

words = ["numpy", "c++", "python", "ai"]
print(sorted(words, key=len))
print(sorted(words, key=len, reverse=True))
```

Output:

```text
[3, 1, 2, 4, 0, 9]
[0, 1, 2, 3, 4, 9] [3, 1, 2, 4, 0, 9]
None [0, 1, 2, 3, 4, 9]
a: [0, 1, 2, 3, 4, 9, 100]
c: [0, 1, 2, 3, 4, 9]
['ai', 'c++', 'numpy', 'python']
['python', 'numpy', 'c++', 'ai']
```
