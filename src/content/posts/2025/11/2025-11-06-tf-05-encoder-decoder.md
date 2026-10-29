---
title: "Transformers · Encoder and decoder"
categories: ["study"]
tags: ["transformers", "architectures"]
summary: "How the encoder layer, the decoder layer and cross-attention fit together, with residual connections and layer norm, and the three families they led to: encoder-only, decoder-only and encoder–decoder."
sources: 
  - title: "Vaswani et al. (2017), Attention Is All You Need (section 3.1)"
    url: "https://arxiv.org/abs/1706.03762"
    publisher: "arXiv"
    fetched_at: "2026-10-29T21:57:34.099Z"
  - title: "torch.nn.TransformerEncoderLayer"
    url: "https://docs.pytorch.org/docs/stable/generated/torch.nn.TransformerEncoderLayer.html"
    publisher: "PyTorch"
    fetched_at: "2026-10-29T21:57:43.858Z"
  - title: "Hugging Face LLM Course: How do Transformers work?"
    url: "https://huggingface.co/learn/llm-course/chapter1/4"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T21:57:45.306Z"
highlights: ["The decoder has three sublayers: masked self-attention, cross-attention to the encoder output, and a feed-forward network.", "BERT keeps only the encoder, GPT only the decoder, and T5 keeps both."]
phase: 11
step: 5
draft: false
date: "2025-11-06"
---

**Encoder layer** (×N):
1. multi-head **self-attention** (every token sees every token)
2. position-wise **feed-forward** network (two linear layers with an activation)

Each sublayer is wrapped as `LayerNorm(x + Sublayer(x))`, with a residual connection plus normalisation. Many later models move the norm before the sublayer ("pre-norm") for more stable training.

**Decoder layer** (×N):
1. **masked** self-attention (no peeking at future tokens)
2. **cross-attention**: queries come from the decoder, keys and values from the **encoder output**. This is how the translation "looks at" the source sentence.
3. feed-forward

**Three families** came from this design:

| family | keeps | good for | examples |
|---|---|---|---|
| encoder-only | encoder | understanding, classification, embeddings | BERT |
| decoder-only | decoder (no cross-attention) | text generation | GPT |
| encoder–decoder | both | sequence-to-sequence | T5, the original Transformer |

```python run
import torch, torch.nn as nn

torch.manual_seed(0)
d = 32
enc = nn.TransformerEncoderLayer(d, nhead=4, dim_feedforward=64, batch_first=True, dropout=0.0)
dec = nn.TransformerDecoderLayer(d, nhead=4, dim_feedforward=64, batch_first=True, dropout=0.0)
print("encoder sublayers:", [n for n, _ in enc.named_children() if n in ("self_attn", "linear1", "linear2", "norm1", "norm2")])
print("decoder sublayers:", [n for n, _ in dec.named_children() if n in ("self_attn", "multihead_attn", "linear1", "norm1", "norm2", "norm3")])

src, tgt = torch.randn(1, 6, d), torch.randn(1, 4, d)
memory = enc(src)
mask = nn.Transformer.generate_square_subsequent_mask(4)
y = dec(tgt, memory, tgt_mask=mask)
print("memory", tuple(memory.shape), "-> decoder output", tuple(y.shape))

# cross-attention really uses the encoder: change the source, decoder output changes
y2 = dec(tgt, enc(src + 1.0), tgt_mask=mask)
print("decoder output depends on encoder memory:", not torch.allclose(y, y2))
# masking: changing a *future* target token does not affect earlier positions
tgt2 = tgt.clone(); tgt2[:, 3] += 5.0
y3 = dec(tgt2, memory, tgt_mask=mask)
print("positions 0-2 unchanged when token 3 changes:", torch.allclose(y[:, :3], y3[:, :3], atol=1e-6))
```

Output:

```text
encoder sublayers: ['self_attn', 'linear1', 'linear2', 'norm1', 'norm2']
decoder sublayers: ['self_attn', 'multihead_attn', 'linear1', 'norm1', 'norm2', 'norm3']
memory (1, 6, 32) -> decoder output (1, 4, 32)
decoder output depends on encoder memory: True
positions 0-2 unchanged when token 3 changes: True
```
