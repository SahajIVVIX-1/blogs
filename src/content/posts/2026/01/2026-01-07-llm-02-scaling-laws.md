---
title: "LLMs · Scaling laws"
categories: ["study"]
tags: ["llm", "scaling"]
summary: "Loss falls predictably as a power law in model size, data and compute; using the Chinchilla paper's fitted formula to see the compute-optimal trade-off between parameters and tokens."
sources: 
  - title: "Kaplan et al. (2020), Scaling Laws for Neural Language Models"
    url: "https://arxiv.org/abs/2001.08361"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Hoffmann et al. (2022), Training Compute-Optimal Large Language Models (Chinchilla)"
    url: "https://arxiv.org/abs/2203.15556"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Stanford CS324: Large Language Models"
    url: "https://stanford-cs324.github.io/winter2022/"
    publisher: "Stanford University"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Scaling laws say loss improves as a smooth power law when you scale parameters, data and compute together.", "Chinchilla's finding: for a fixed compute budget, parameters and training tokens should grow at roughly the same rate."]
phase: 12
step: 2
draft: false
date: "2026-01-07"
---

**Scaling laws** (Kaplan et al., 2020) found that language-model loss falls as a smooth **power law** in model size N, dataset size D and compute C, over many orders of magnitude. You can predict a big model's loss from small runs.

**Chinchilla** (Hoffmann et al., 2022) refined the recipe. Their fitted loss model is

$$L(N, D) = E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}}$$

with E = 1.69, A = 406.4, B = 410.7, α = 0.34 and β = 0.28 (their "Approach 3" fit). Training compute is approximately C ≈ 6ND FLOPs. The practical conclusion: for a fixed budget, grow parameters and tokens **together**. Many earlier models were too big for the data they saw.

I plugged their published constants in and searched, for a few budgets, which N minimises predicted loss when D = C / 6N.

```python run
import numpy as np

E, A, B, alpha, beta = 1.69, 406.4, 410.7, 0.34, 0.28
L = lambda N, D: E + A / N**alpha + B / D**beta

for C in [1e21, 1e23, 5.76e23]:
    Ns = np.logspace(8, 12, 4000)
    Ds = C / (6 * Ns)
    i = np.argmin(L(Ns, Ds))
    print(f"C={C:.2e} FLOPs -> best N ~ {Ns[i] / 1e9:6.1f}B params, D ~ {Ds[i] / 1e9:7.0f}B tokens, "
          f"tokens/param ~ {Ds[i] / Ns[i]:4.1f}, predicted loss {L(Ns[i], Ds[i]):.3f}")

C = 5.76e23
for N in [70e9, 280e9]:
    print(f"same budget, N={N / 1e9:.0f}B -> D={C / (6 * N) / 1e9:.0f}B tokens, predicted loss {L(N, C / (6 * N)):.3f}")
```

Output:

```text
C=1.00e+21 FLOPs -> best N ~    1.8B params, D ~      91B tokens, tokens/param ~ 50.0, predicted loss 2.329
C=1.00e+23 FLOPs -> best N ~   14.6B params, D ~    1141B tokens, tokens/param ~ 78.1, predicted loss 2.005
C=5.76e+23 FLOPs -> best N ~   32.2B params, D ~    2983B tokens, tokens/param ~ 92.7, predicted loss 1.931
same budget, N=70B -> D=1371B tokens, predicted loss 1.938
same budget, N=280B -> D=343B tokens, predicted loss 1.984
```

5.76e23 FLOPs is the budget the paper used for Gopher and Chinchilla. With these constants, a ~70B model on more tokens is predicted to beat a 280B model on fewer tokens. That matches the paper's headline. The exact optimum from this one fitted formula differs a little from the paper's other two estimation approaches.
