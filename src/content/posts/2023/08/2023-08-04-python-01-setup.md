---
title: "Python · Setup: installing Python and running a script"
categories: ["study"]
tags: ["python", "setup"]
summary: "Day one: installing Python 3, checking the version, and running a first script from the terminal."
sources: 
  - title: "Using the Python Interpreter"
    url: "https://docs.python.org/3/tutorial/interpreter.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:29.145Z"
  - title: "Using Python on Windows"
    url: "https://docs.python.org/3/using/windows.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:29.432Z"
  - title: "The Python Tutorial"
    url: "https://docs.python.org/3/tutorial/index.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:30.477Z"
highlights: ["A Python file is just text; the interpreter reads it top to bottom and runs each statement.", "`python --version` is the first thing to check when something behaves oddly."]
phase: 1
step: 1
draft: false
date: "2023-08-04"
---

I started the Python part of my path today with the most basic step: getting an interpreter installed and running.

On Windows the installer from python.org (or the `py` launcher) puts `python` on the PATH. A Python program is a plain text file ending in `.py`. Running `python hello.py` starts the interpreter, which reads the file from top to bottom and executes each statement in order.

There are two ways to work:

- **Interactive mode (the REPL):** type `python` with no file. Each line runs as soon as you press Enter. This is good for quick experiments.
- **Script mode:** write the code in a file and run the whole file. This is what real programs use.

The `sys` module can tell a script which interpreter is running it. That helps when more than one Python is installed.

```python run
import sys
import platform

print("Hello, Python!")
print("Version:", platform.python_version())
print("Major/minor:", sys.version_info[:2])
```

Output:

```text
Hello, Python!
Version: 3.12.10
Major/minor: (3, 12)
```

What I'm taking away: check `python --version` first whenever something behaves strangely, because a different interpreter is a very common cause.
