---
title: "Transformers · Self-attention"
categories: ["study"]
tags: ["transformers", "attention"]
summary: "Scaled dot-product self-attention from scratch: queries, keys, values, the √d scaling, softmax weights, and a causal mask, checked against PyTorch's built-in function."
sources: 
  - title: "Vaswani et al. (2017), Attention Is All You Need (section 3.2.1)"
    url: "https://arxiv.org/abs/1706.03762"
    publisher: "arXiv"
    fetched_at: "2026-10-29T21:57:34.099Z"
  - title: "torch.nn.functional.scaled_dot_product_attention"
    url: "https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T21:57:40.200Z"
  - title: "Dive into Deep Learning: Attention Scoring Functions"
    url: "https://d2l.ai/chapter_attention-mechanisms-and-transformers/attention-scoring-functions.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T21:57:40.337Z"
highlights: ["Each token makes a query, compares it with every key, and takes a softmax-weighted average of the values.", "Dividing by √d keeps the dot products from growing with dimension and saturating the softmax."]
phase: 11
step: 2
draft: false
date: "2025-10-09"
---

**Self-attention** in one line:

$$\text{Attention}(Q,K,V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$$

For each token:

- **Query** (q = xW_Q): what am I looking for?
- **Key** (k = xW_K): what do I contain?
- **Value** (v = xW_V): what do I pass on if someone attends to me?

Scores are q·k for every pair of positions. The paper divides by **√d_k** because dot products grow with dimension and would push the softmax into regions with tiny gradients. A **causal mask** sets future positions to −∞ before the softmax, so a decoder can't look ahead.

This is Bahdanau attention from the NLP phase, generalised: now the sequence attends to *itself*, with dot-product scores.

```python run
import math, torch, torch.nn.functional as F

torch.manual_seed(0)
T, d = 5, 8
x = torch.randn(1, T, d)
Wq, Wk, Wv = (torch.randn(d, d) / math.sqrt(d) for _ in range(3))
Q, K, V = x @ Wq, x @ Wk, x @ Wv

scores = Q @ K.transpose(-2, -1) / math.sqrt(d)
causal = torch.triu(torch.ones(T, T, dtype=torch.bool), 1)
weights = scores.masked_fill(causal, float("-inf")).softmax(-1)
out = weights @ V
print("attention weights (row = query position):\n", weights[0].round(decimals=2))
print("rows sum to 1:", torch.allclose(weights.sum(-1), torch.ones(1, T)))

ref = F.scaled_dot_product_attention(Q, K, V, is_causal=True)
print("matches PyTorch SDPA:", torch.allclose(out, ref, atol=1e-6))

for dim in (8, 512):
    q, k = torch.randn(10000, dim), torch.randn(10000, dim)
    dots = (q * k).sum(-1)
    print(f"d={dim:>3}: std of q·k = {dots.std():6.2f} | after /sqrt(d) = {(dots / math.sqrt(dim)).std():.2f}")
```

Output:

```text
attention weights (row = query position):
 tensor([[1.0000, 0.0000, 0.0000, 0.0000, 0.0000],
        [0.4800, 0.5200, 0.0000, 0.0000, 0.0000],
        [0.2000, 0.3300, 0.4700, 0.0000, 0.0000],
        [0.1400, 0.3200, 0.2300, 0.3100, 0.0000],
        [0.0700, 0.0600, 0.3900, 0.1000, 0.3900]])
rows sum to 1: True
matches PyTorch SDPA: True
d=  8: std of q·k =   2.79 | after /sqrt(d) = 0.99
d=512: std of q·k =  22.67 | after /sqrt(d) = 1.00
```
