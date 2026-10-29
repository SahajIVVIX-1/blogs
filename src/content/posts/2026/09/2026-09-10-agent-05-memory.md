---
title: "Agentic AI · Agent memory"
categories: ["study"]
tags: ["agents", "memory", "retrieval"]
summary: "Short-term memory (the conversation in the context window) versus long-term memory (facts stored outside and retrieved when relevant), with a small long-term store built on embeddings."
sources: 
  - title: "Park et al. (2023), Generative Agents: Interactive Simulacra of Human Behavior"
    url: "https://arxiv.org/abs/2304.03442"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Packer et al. (2023), MemGPT: Towards LLMs as Operating Systems"
    url: "https://arxiv.org/abs/2310.08560"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain docs: Long-term memory"
    url: "https://docs.langchain.com/oss/python/langchain/long-term-memory"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Short-term memory is just the message history; long-term memory is a searchable store the agent writes to and reads from.", "Retrieval-based memory means the agent only pulls in what's relevant now, instead of everything it ever saw."]
phase: 15
step: 5
draft: false
date: "2026-09-10"
---

Two kinds of memory, building on my LangChain memory post:

- **Short-term**: the current conversation, kept in the context window. It's limited by context length, so it gets trimmed or summarised.
- **Long-term**: facts saved **outside** the model (a vector store, a database) and **retrieved** when relevant.

Two papers I looked at:

- **Generative Agents** (Park et al., 2023): simulated characters keep a memory stream and retrieve memories by relevance, recency and importance.
- **MemGPT** (Packer et al., 2023): treats the context window like RAM and external storage like disk, with the model moving information between them.

My version: a long-term store that saves facts with embeddings and timestamps and retrieves by **similarity × recency**, so a newer fact can beat an older one that contradicts it. In my first try, recency only adjusted the score by up to 30%. The old "TensorFlow" fact still won, because its wording matched the question more closely. Giving recency more weight fixed it. How much weight to give recency is a real design choice: too much, and an agent forgets stable facts.

```python run
import math, torch, torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

name = "sentence-transformers/all-MiniLM-L6-v2"
tok, enc = AutoTokenizer.from_pretrained(name), AutoModel.from_pretrained(name).eval()
def embed(texts):
    b = tok(texts, padding=True, return_tensors="pt")
    with torch.no_grad(): h = enc(**b).last_hidden_state
    m = b.attention_mask.unsqueeze(-1).float()
    return F.normalize((h * m).sum(1) / m.sum(1), dim=-1)

class LongTermMemory:
    def __init__(self, half_life_days=30):
        self.items, self.vecs, self.half_life = [], None, half_life_days
    def write(self, text, day):
        v = embed([text])
        self.items.append((text, day)); self.vecs = v if self.vecs is None else torch.cat([self.vecs, v])
    def read(self, query, today, k=2):
        sim = (embed([query]) @ self.vecs.T)[0]
        recency = torch.tensor([0.5 ** ((today - d) / self.half_life) for _, d in self.items])
        score = sim * (0.4 + 0.6 * recency)          # recency matters a lot here
        top = score.topk(k).indices.tolist()
        return [(self.items[i][0], round(score[i].item(), 3)) for i in top]

mem = LongTermMemory()
mem.write("The user's favourite framework is TensorFlow.", day=0)
mem.write("The user studies B.Tech ICT at PDEU.", day=5)
mem.write("The user now prefers PyTorch over TensorFlow.", day=300)
mem.write("The user's project AgentForge uses CrewAI.", day=310)
for q in ["Which deep learning framework does the user like?", "Where does the user study?"]:
    print(q, "->", mem.read(q, today=320))
```

Output:

```text
Which deep learning framework does the user like? -> [('The user now prefers PyTorch over TensorFlow.', 0.367), ("The user's favourite framework is TensorFlow.", 0.289)]
Where does the user study? -> [('The user studies B.Tech ICT at PDEU.', 0.186), ("The user's project AgentForge uses CrewAI.", 0.134)]
```
