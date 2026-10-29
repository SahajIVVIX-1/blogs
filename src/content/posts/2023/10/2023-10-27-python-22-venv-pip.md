---
title: "Python · venv and pip"
categories: ["study"]
tags: ["python", "tooling"]
summary: "Isolating project dependencies with venv, installing with pip, and pinning versions in requirements.txt."
sources: 
  - title: "Virtual Environments and Packages"
    url: "https://docs.python.org/3/tutorial/venv.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:07.333Z"
  - title: "venv: creation of virtual environments"
    url: "https://docs.python.org/3/library/venv.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:30:08.014Z"
  - title: "pip user guide"
    url: "https://pip.pypa.io/en/stable/user_guide/"
    publisher: "Python Packaging Authority"
    fetched_at: "2026-10-29T15:30:09.197Z"
  - title: "Installing packages using pip and virtual environments"
    url: "https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/"
    publisher: "Python Packaging Authority"
    fetched_at: "2026-10-29T15:30:09.929Z"
highlights: ["A virtual environment is a folder with its own interpreter link and its own site-packages.", "pip freeze > requirements.txt records exact versions so the project can be rebuilt later."]
phase: 1
step: 22
draft: false
date: "2023-10-27"
---

I closed the Python phase with tooling. Different projects need different library versions, and installing everything globally ends in conflicts. A **virtual environment** is a folder with its own `python` and its own `site-packages`.

```text
python -m venv .venv            # create
.venv\Scripts\activate          # Windows (source .venv/bin/activate on Linux/macOS)
python -m pip install numpy     # install into the venv only
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt   # rebuild elsewhere
deactivate
```

Habits I'm keeping:

- Run pip as `python -m pip`, so it is always the pip of the active interpreter.
- Add `.venv/` to `.gitignore` and commit `requirements.txt` instead.

The snippet below checks, from inside Python, whether it is running in a venv.

```python run
import sys, venv, tempfile, pathlib, subprocess

print("in a venv:", sys.prefix != sys.base_prefix)

env_dir = pathlib.Path(tempfile.mkdtemp()) / "demo-env"
venv.create(env_dir, with_pip=False)
py = env_dir / ("Scripts/python.exe" if sys.platform == "win32" else "bin/python")
out = subprocess.run([str(py), "-c", "import sys; print(sys.prefix != sys.base_prefix)"],
                     capture_output=True, text=True)
print("new env created:", py.exists(), "| its python is in a venv:", out.stdout.strip())
```

Output:

```text
in a venv: True
new env created: True | its python is in a venv: True
```

With this, phase 1 is done. Next up is C++.
