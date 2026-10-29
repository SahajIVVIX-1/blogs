---
title: "NLP · Attention (Bahdanau)"
categories: ["study"]
tags: ["nlp", "attention"]
summary: "Additive attention lets the decoder look at every encoder state instead of one summary vector; the same reversal task with attention, and its alignment weights."
sources: 
  - title: "Bahdanau, Cho & Bengio (2014), Neural Machine Translation by Jointly Learning to Align and Translate"
    url: "https://arxiv.org/abs/1409.0473"
    publisher: "arXiv"
    fetched_at: "2026-10-29T18:49:27.098Z"
  - title: "Dive into Deep Learning: The Bahdanau Attention Mechanism"
    url: "https://d2l.ai/chapter_attention-mechanisms-and-transformers/bahdanau-attention.html"
    publisher: "d2l.ai"
    fetched_at: "2026-10-29T18:49:30.807Z"
  - title: "Attention and Augmented Recurrent Neural Networks (Olah & Carter, Distill)"
    url: "https://distill.pub/2016/augmented-rnns/"
    publisher: "Distill"
    fetched_at: "2026-10-29T18:49:33.178Z"
highlights: ["Attention computes, at every decoding step, a weighted average of all encoder states, with weights the model learns.", "For string reversal, the learned attention weights come out close to an anti-diagonal: output step t mostly looks at input step L−1−t."]
phase: 9
step: 7
draft: false
date: "2025-06-25"
---

Bahdanau, Cho and Bengio (2014) removed the bottleneck. Instead of squeezing the input into one vector, at each decoding step the decoder computes a **score** for every encoder state:

$$e_{t,s} = \mathbf{v}^\top\tanh(W_1\mathbf{h}^{dec}_{t-1} + W_2\mathbf{h}^{enc}_s), \quad \alpha_{t,s} = \text{softmax}_s(e_{t,s}), \quad \mathbf{c}_t = \sum_s \alpha_{t,s}\mathbf{h}^{enc}_s$$

The **context** $\mathbf{c}_t$ is fed into the decoder, along with the previous token. The α weights are a soft **alignment**: which input positions matter for this output.

This is the idea that becomes the Transformer later in my path. I reran last week's reversal task with attention added, and printed where each output step looks.

```python run
import torch, torch.nn as nn, torch.nn.functional as F
torch.manual_seed(0)
V, SOS, H = 12, 10, 128

def batch(n, lo=5, hi=10):
    L = torch.randint(lo, hi + 1, (1,)).item()
    x = torch.randint(0, 10, (n, L)); return x, x.flip(1)

class AttnSeq2Seq(nn.Module):
    def __init__(self):
        super().__init__()
        self.emb = nn.Embedding(V, 32)
        self.enc = nn.GRU(32, H, batch_first=True)
        self.W1, self.W2, self.v = nn.Linear(H, H), nn.Linear(H, H), nn.Linear(H, 1)
        self.dec = nn.GRU(32 + H, H, batch_first=True)
        self.out = nn.Linear(H, V)
    def forward(self, x, y=None, steps=None):
        enc, h = self.enc(self.emb(x))                         # (B, L, H)
        tok, logits, alphas = torch.full((x.size(0), 1), SOS), [], []
        for t in range(steps or y.size(1)):
            e = self.v(torch.tanh(self.W1(h[-1]).unsqueeze(1) + self.W2(enc)))  # (B, L, 1)
            a = F.softmax(e, dim=1)
            ctx = (a * enc).sum(1, keepdim=True)
            o, h = self.dec(torch.cat([self.emb(tok), ctx], -1), h)
            logits.append(self.out(o)); alphas.append(a.squeeze(-1))
            tok = y[:, t:t + 1] if y is not None else logits[-1].argmax(-1)
        return torch.cat(logits, 1), torch.stack(alphas, 1)

m = AttnSeq2Seq(); opt = torch.optim.Adam(m.parameters(), lr=2e-3)
for step in range(2500):
    x, y = batch(64)
    loss = F.cross_entropy(m(x, y)[0].reshape(-1, V), y.reshape(-1))
    opt.zero_grad(); loss.backward(); opt.step()
with torch.no_grad():
    for L in [5, 7, 10]:
        x, y = batch(500, L, L)
        pred = m(x, steps=L)[0].argmax(-1)
        print(f"length {L:>2}: exact-match {(pred == y).all(1).float().mean():.3f}")
    x, _ = batch(1, 6, 6)
    _, A = m(x, steps=6)
    print("input:", x.tolist()[0])
    print("attention (rows = output steps, cols = input positions):")
    print((A[0] * 100).round().int())
```

Output:

```text
length  5: exact-match 0.990
length  7: exact-match 0.972
length 10: exact-match 0.886
input: [7, 3, 2, 7, 7, 1]
attention (rows = output steps, cols = input positions):
tensor([[  0,   0,   0,   0,   2,  97],
        [  0,   0,   0,   0,   0, 100],
        [  0,   0,   0,   1,  99,   0],
        [  0,   0,   0,  99,   0,   0],
        [  0,   0, 100,   0,   0,   0],
        [  0, 100,   0,   0,   0,   0]], dtype=torch.int32)
```

Attention clearly helps on the longest strings. The weights are close to the anti-diagonal you would draw by hand, with one exception: at the second output step the model still put its weight on the last input position instead of the second-to-last. Attention weights are a learned soft lookup, not a guaranteed alignment, so they're worth reading with some care.
