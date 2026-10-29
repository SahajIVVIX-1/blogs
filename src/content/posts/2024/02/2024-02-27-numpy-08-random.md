---
title: "NumPy · Random numbers"
categories: ["study"]
tags: ["numpy", "random"]
summary: "The Generator API (default_rng), seeding for reproducibility, distributions, shuffling, and sampling without replacement."
sources: 
  - title: "Random sampling (numpy.random)"
    url: "https://numpy.org/doc/stable/reference/random/index.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:55.509Z"
  - title: "Random Generator"
    url: "https://numpy.org/doc/stable/reference/random/generator.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:56.163Z"
  - title: "NEP 19: Random number generator policy"
    url: "https://numpy.org/neps/nep-0019-rng-policy.html"
    publisher: "NumPy"
    fetched_at: "2026-10-29T15:43:56.960Z"
highlights: ["Use rng = np.random.default_rng(seed); the old np.random.seed global state is legacy.", "The same seed gives the same sequence, which makes experiments reproducible."]
phase: 3
step: 8
draft: false
date: "2024-02-27"
---

The NumPy docs recommend the **Generator** API: `rng = np.random.default_rng(seed)`. The older `np.random.seed()` + `np.random.rand()` style relies on global state and is kept for backward compatibility (NEP 19 explains why).

- The same seed gives the **same sequence**, which is essential for reproducible ML experiments.
- `rng.integers`, `rng.random`, `rng.normal(mu, sigma, size)`, `rng.choice(a, size, replace=False)`, `rng.permutation`.
- To split a dataset, shuffle the indices and slice them.

```python run
import numpy as np

rng = np.random.default_rng(42)
print(rng.integers(1, 7, size=10))             # dice rolls
print(rng.random(3).round(4))

samples = rng.normal(loc=170, scale=8, size=100_000)
print(round(samples.mean(), 2), round(samples.std(), 2))

rng_a = np.random.default_rng(7)
rng_b = np.random.default_rng(7)
print(np.array_equal(rng_a.random(5), rng_b.random(5)))

idx = rng.permutation(10)
train, test = idx[:8], idx[8:]
print("train", np.sort(train), "test", np.sort(test))
print(rng.choice(["python", "c++", "numpy", "pandas"], size=2, replace=False))
```

Output:

```text
[1 5 4 3 3 6 1 5 2 1]
[0.9756 0.7611 0.7861]
169.97 8.03
True
train [2 3 4 5 6 7 8 9] test [0 1]
['pandas' 'c++']
```

That finishes NumPy. Pandas is built on top of it, so that's next.
