---
title: "Python · Files: reading and writing"
categories: ["study"]
tags: ["python", "files"]
summary: "Opening files with with-blocks, text vs binary modes, encodings, reading line by line, and pathlib."
sources: 
  - title: "Reading and Writing Files"
    url: "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:54.178Z"
  - title: "pathlib: object-oriented filesystem paths"
    url: "https://docs.python.org/3/library/pathlib.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:55.053Z"
  - title: "Built-in functions: open"
    url: "https://docs.python.org/3/library/functions.html#open"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:55.527Z"
highlights: ["The with statement closes the file even if an exception happens.", "Always pass encoding=\"utf-8\" for text files; the default depends on the operating system."]
phase: 1
step: 15
draft: false
date: "2023-09-29"
---

`open(path, mode)` returns a file object. The modes I need most:

| mode | meaning |
|---|---|
| `"r"` | read text (the default) |
| `"w"` | write text; **truncates** the file |
| `"a"` | append |
| `"rb"` / `"wb"` | read/write bytes |

Always use `with open(...) as f:`. It closes the file even if an exception happens.

Pass `encoding="utf-8"` explicitly. On Windows the default text encoding can be a locale code page, so a file that reads fine on Linux can break here.

Iterating over a file object yields one line at a time, so even a huge file never sits in memory all at once. `pathlib.Path` makes path handling cleaner than string concatenation.

```python run
from pathlib import Path
import tempfile

folder = Path(tempfile.mkdtemp())
p = folder / "notes.txt"

with open(p, "w", encoding="utf-8") as f:
    f.write("line one\n")
    f.write("line two – with a dash\n")

with open(p, "a", encoding="utf-8") as f:
    print("line three", file=f)

with open(p, encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        print(i, line.rstrip())

print(p.name, p.suffix, p.stat().st_size, "bytes")
print(p.read_text(encoding="utf-8").count("\n"), "lines")
print(sorted(x.name for x in folder.iterdir()))
```

Output:

```text
1 line one
2 line two � with a dash
3 line three
notes.txt .txt 48 bytes
3 lines
['notes.txt']
```
