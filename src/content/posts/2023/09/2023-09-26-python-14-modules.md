---
title: "Python · Modules and imports"
categories: ["study"]
tags: ["python", "modules"]
summary: "How import finds modules, the different import forms, packages with __init__.py, and the if __name__ == \"__main__\" guard."
sources: 
  - title: "Modules"
    url: "https://docs.python.org/3/tutorial/modules.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:52.562Z"
  - title: "The import system"
    url: "https://docs.python.org/3/reference/import.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:53.163Z"
  - title: "__main__: top-level code environment"
    url: "https://docs.python.org/3/library/__main__.html"
    publisher: "Python Software Foundation"
    fetched_at: "2026-10-29T15:29:53.767Z"
highlights: ["A module is just a .py file, and importing it runs it once and caches it in sys.modules.", "The __name__ == \"__main__\" guard keeps test code from running when the file is imported."]
phase: 1
step: 14
draft: false
date: "2023-09-26"
---

A **module** is a `.py` file. A **package** is a folder of modules, traditionally with an `__init__.py`.

- `import math` gives you the module object, and you write `math.sqrt`.
- `from math import sqrt` imports one name.
- `import numpy as np` imports under an alias.
- Avoid `from x import *`, because it hides where names come from.

The first import of a module **runs** the module once and caches it in `sys.modules`. Later imports reuse that cached object. Python looks for modules in the directories listed in `sys.path`.

When a file is run directly, `__name__` is `"__main__"`. When it is imported, `__name__` is the module's name. The `if __name__ == "__main__":` guard uses this to keep demo or test code from running on import.

```python run
import sys, os, tempfile, importlib

# create a tiny module on the fly and import it
d = tempfile.mkdtemp()
with open(os.path.join(d, "mathx.py"), "w") as f:
    f.write(
        'print("mathx is being imported")\n'
        "def area(r):\n"
        "    return 3.14159 * r * r\n"
        'if __name__ == "__main__":\n'
        '    print("run directly")\n'
    )
sys.path.insert(0, d)

import mathx
import mathx            # second import: cached, no print
from mathx import area
print(area(2))
print(mathx.__name__, "mathx" in sys.modules)
print(importlib.import_module("math").sqrt(81))
```

Output:

```text
mathx is being imported
12.56636
mathx True
9.0
```
