---
title: "Transformers · Multi-head attention"
categories: ["study"]
tags: ["transformers", "attention"]
summary: "Splitting d_model into several heads so attention can look at different things at once, implemented by reshaping, and checked against nn.MultiheadAttention."
sources: 
  - title: "Vaswani et al. (2017), Attention Is All You Need (section 3.2.2)"
    url: "https://arxiv.org/abs/1706.03762"
    publisher: "arXiv"
    fetched_at: "2026-10-29T21:57:34.099Z"
  - title: "torch.nn.MultiheadAttention"
    url: "https://docs.pytorch.org/docs/stable/generated/torch.nn.MultiheadAttention.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T21:57:40.841Z"
  - title: "Dive into Deep Learning: Multi-Head Attention"
    url: "https://d2l.ai/chapter_attention-mechanisms-and-transformers/multihead-attention.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T21:57:41.310Z"
highlights: ["Multi-head attention runs h smaller attentions in parallel and concatenates the results.", "With d_k = d_model / h, total compute stays about the same as one big head."]
phase: 11
step: 3
draft: false
date: "2025-10-20"
---

One attention head produces one weighted average per position, which mixes everything together. **Multi-head attention** runs **h** attentions in parallel, each with its own projections into a smaller space (d_k = d_model / h), then concatenates the outputs and projects them back:

$$\text{MultiHead}(X) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)\,W_O$$

Different heads can specialise: one may track the previous token, another a related word further away. Because each head is smaller, the total compute is similar to one full-size head.

In code, "splitting into heads" is just a **reshape**: (B, T, d_model) → (B, h, T, d_k). I wrote it by hand, copied in the weights from PyTorch's `nn.MultiheadAttention`, and compared outputs.

```python run
import torch, torch.nn as nn, torch.nn.functional as F

torch.manual_seed(0)
B, T, D, H = 2, 6, 16, 4
x = torch.randn(B, T, D)
mha = nn.MultiheadAttention(D, H, batch_first=True, bias=True)

Wq, Wk, Wv = mha.in_proj_weight.chunk(3)
bq, bk, bv = mha.in_proj_bias.chunk(3)
split = lambda t: t.view(B, T, H, D // H).transpose(1, 2)          # (B, H, T, d_k)
Q, K, V = split(x @ Wq.T + bq), split(x @ Wk.T + bk), split(x @ Wv.T + bv)
heads = F.scaled_dot_product_attention(Q, K, V)                     # (B, H, T, d_k)
mine = heads.transpose(1, 2).reshape(B, T, D) @ mha.out_proj.weight.T + mha.out_proj.bias

ref, attn = mha(x, x, x, average_attn_weights=False)
print("per-head shape:", tuple(heads.shape), "| attention weights:", tuple(attn.shape))
print("hand-written == nn.MultiheadAttention:", torch.allclose(mine, ref, atol=1e-6))
print("params:", sum(p.numel() for p in mha.parameters()), "= 4 x D x D + 4 x D =", 4 * D * D + 4 * D)
```

Output:

```text
per-head shape: (2, 4, 6, 4) | attention weights: (2, 4, 6, 6)
hand-written == nn.MultiheadAttention: True
params: 1088 = 4 x D x D + 4 x D = 1088
```
