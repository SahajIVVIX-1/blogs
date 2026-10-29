---
title: "LLMs · Pre-training"
categories: ["study"]
tags: ["llm", "pre-training"]
summary: "Pre-training as next-token prediction on lots of text, shown end to end with a tiny character-level Transformer trained on a few paragraphs, before and after."
sources: 
  - title: "Karpathy, nanoGPT"
    url: "https://github.com/karpathy/nanoGPT"
    publisher: "GitHub"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Hugging Face LLM Course: Training a causal language model from scratch"
    url: "https://huggingface.co/learn/llm-course/chapter7/6"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Brown et al. (2020), Language Models are Few-Shot Learners"
    url: "https://arxiv.org/abs/2005.14165"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Pre-training is the same next-token objective as GPT-2, at enormous scale.", "Even a tiny model trained for a minute goes from random characters to word-like text."]
phase: 12
step: 1
draft: false
date: "2026-01-01"
---

Phase 12 starts with how an LLM is made. **Pre-training** is the next-token objective from my GPT post, applied to a huge text corpus: trillions of tokens, billions of parameters, weeks of GPU time. The result is a **base model** that continues text well but doesn't yet follow instructions. Later posts cover that.

To see the whole loop on a CPU, I trained a **tiny character-level GPT** (in the spirit of Karpathy's nanoGPT) on a few paragraphs of my own Python notes. Same ingredients, just very small:

1. tokenise (here: characters)
2. sample random windows of text
3. predict every next character with a causal Transformer
4. minimise cross-entropy with AdamW

```python run
import torch, torch.nn as nn, torch.nn.functional as F
torch.manual_seed(0); torch.set_num_threads(4)

text = ("a list is an ordered mutable collection. a tuple is an ordered immutable collection. "
        "a dict maps keys to values. a set holds unique items. a function takes arguments and returns values. "
        "a class is a blueprint and an object is an instance of a class. a generator yields values lazily. ") * 20
chars = sorted(set(text)); stoi = {c: i for i, c in enumerate(chars)}
data = torch.tensor([stoi[c] for c in text])
V, T, D = len(chars), 32, 64

class TinyGPT(nn.Module):
    def __init__(self):
        super().__init__()
        self.tok, self.pos = nn.Embedding(V, D), nn.Embedding(T, D)
        layer = nn.TransformerEncoderLayer(D, 4, 4 * D, dropout=0.0, batch_first=True, norm_first=True)
        self.blocks = nn.TransformerEncoder(layer, 2)
        self.head = nn.Linear(D, V)
    def forward(self, idx):
        t = idx.size(1)
        h = self.tok(idx) + self.pos(torch.arange(t))
        mask = nn.Transformer.generate_square_subsequent_mask(t)
        return self.head(self.blocks(h, mask=mask, is_causal=True))

def sample(model, n=60):
    idx = torch.tensor([[stoi["a"]]])
    for _ in range(n):
        logits = model(idx[:, -T:])[:, -1]
        idx = torch.cat([idx, logits.softmax(-1).multinomial(1)], 1)
    return "".join(chars[i] for i in idx[0])

m = TinyGPT(); opt = torch.optim.AdamW(m.parameters(), lr=3e-3)
print("vocab", V, "| params", sum(p.numel() for p in m.parameters()))
print("before:", repr(sample(m)))
for step in range(600):
    ix = torch.randint(len(data) - T - 1, (32,))
    x = torch.stack([data[i:i + T] for i in ix]); y = torch.stack([data[i + 1:i + T + 1] for i in ix])
    loss = F.cross_entropy(m(x).reshape(-1, V), y.reshape(-1))
    opt.zero_grad(); loss.backward(); opt.step()
    if step % 200 == 0: print(f"step {step}: loss {loss.item():.3f}")
print("after :", repr(sample(m)))
```

Output:

```text
vocab 26 | params 105370
before: 'alqimt cgbqym yo.uljkshhmqfdlzokvuffztmk.gbtlnjpgbarukmvgmpjp'
step 0: loss 3.691
step 200: loss 0.134
step 400: loss 0.120
after : 'a class. a generator yields values lazily. a list is an order'
```

The model memorises its tiny corpus rather than "understanding" anything, but the mechanics are exactly what real pre-training scales up.
