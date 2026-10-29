---
title: "Transformers · Attention Is All You Need"
categories: ["study"]
tags: ["transformers", "attention", "papers"]
summary: "Reading the 2017 Transformer paper: dropping recurrence entirely, building everything from attention and feed-forward layers, and why that parallelises so well."
sources: 
  - title: "Vaswani et al. (2017), Attention Is All You Need"
    url: "https://arxiv.org/abs/1706.03762"
    publisher: "arXiv"
    fetched_at: "2026-10-29T21:57:34.099Z"
  - title: "The Annotated Transformer (Harvard NLP)"
    url: "https://nlp.seas.harvard.edu/annotated-transformer/"
    publisher: "Harvard NLP"
    fetched_at: "2026-10-29T21:57:36.806Z"
  - title: "Dive into Deep Learning: The Transformer Architecture"
    url: "https://d2l.ai/chapter_attention-mechanisms-and-transformers/transformer.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T21:57:38.624Z"
highlights: ["The Transformer removes recurrence: every position attends to every other position in one step.", "Without recurrence, all positions in a sequence can be processed in parallel during training."]
phase: 11
step: 1
draft: false
date: "2025-10-01"
---

Phase 11 starts with the paper behind everything since: **"Attention Is All You Need"** (Vaswani et al., 2017).

What I took from it:

- **No recurrence, no convolution.** The model is built only from **attention** and position-wise **feed-forward** layers, plus residual connections and layer norm.
- In an RNN, step t has to wait for step t − 1. Here every position attends to every other position **in one step**, so a whole sequence is processed **in parallel** during training. That's a big reason Transformers scaled so well on GPUs.
- The path between any two positions is a single attention hop, instead of a chain of t steps. That eases the long-range dependency problem from my LSTM post.
- Order information has to be added explicitly (**positional encodings**), because attention by itself treats the input as a set.
- The original model is an **encoder–decoder** for translation, with 6 layers each, d_model = 512 and 8 heads in the base configuration.

The next posts take it apart piece by piece. As a first check, here's the paper's base configuration built with PyTorch's `nn.Transformer`, with its parameter count. The paper's Table 3 lists the base model as about 65M parameters, which includes the embeddings. `nn.Transformer` has no embeddings, so its count is lower. Adding one shared ~37k-token embedding (my assumption, based on the paper's English–German setup) brings my rough total close to 65M.

```python run
import torch, torch.nn as nn

model = nn.Transformer(d_model=512, nhead=8, num_encoder_layers=6, num_decoder_layers=6,
                       dim_feedforward=2048, dropout=0.1, batch_first=True)
core = sum(p.numel() for p in model.parameters())
emb = 37000 * 512          # shared source/target BPE vocabulary of ~37k tokens, as in the paper's EN-DE setup
print(f"encoder+decoder parameters: {core / 1e6:.1f}M | + one shared embedding: {(core + emb) / 1e6:.1f}M")

src, tgt = torch.randn(2, 10, 512), torch.randn(2, 7, 512)
mask = model.generate_square_subsequent_mask(7)
out = model(src, tgt, tgt_mask=mask)
print("output shape:", tuple(out.shape), "| causal mask row 2:", mask[2].tolist())
```

Output:

```text
encoder+decoder parameters: 44.1M | + one shared embedding: 63.1M
output shape: (2, 7, 512) | causal mask row 2: [0.0, 0.0, 0.0, -inf, -inf, -inf, -inf]
```
