---
title: "Python · Control flow: if, for, while"
categories: ["study"]
tags: ["python", "control-flow"]
summary: "if/elif/else, for loops over iterables with range, enumerate and zip, while loops, and break/continue/else."
sources: 
  - title: "More Control Flow Tools"
    url: "https://docs.python.org/3/tutorial/controlflow.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:46.267Z"
  - title: "Built-in functions: enumerate"
    url: "https://docs.python.org/3/library/functions.html#enumerate"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:46.828Z"
  - title: "Built-in functions: zip"
    url: "https://docs.python.org/3/library/functions.html#zip"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:47.397Z"
highlights: ["Python's for loops over items of an iterable, not over an index counter.", "A loop's else block runs only when the loop finishes without break."]
phase: 1
step: 10
draft: false
date: "2023-09-08"
---

- `if / elif / else` picks a branch.
- `for x in iterable` loops over the **items** of anything iterable. To get index numbers, use `range(n)`, or `enumerate(seq)` when you need the index and the item together.
- `zip(a, b)` walks two sequences side by side.
- `while cond` repeats as long as the condition is true.
- `break` exits the loop and `continue` skips to the next iteration.
- A loop's `else:` block runs only if the loop finished **without** `break`. That's handy for searches.

```python run
for n in [7, 12, 0]:
    if n == 0:
        kind = "zero"
    elif n % 2 == 0:
        kind = "even"
    else:
        kind = "odd"
    print(n, kind)

subjects = ["maths", "physics", "python"]
scores = [88, 79, 95]
for i, (s, m) in enumerate(zip(subjects, scores), start=1):
    print(i, s, m)

# first prime above 90, using while + for/else
n = 90
while True:
    n += 1
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            break
    else:
        print("first prime above 90:", n)
        break
```

Output:

```text
7 odd
12 even
0 zero
1 maths 88
2 physics 79
3 python 95
first prime above 90: 97
```
