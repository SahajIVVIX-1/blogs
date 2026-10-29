---
title: "LLMs · Embeddings"
categories: ["study"]
tags: ["llm", "embeddings", "retrieval"]
summary: "Sentence embeddings for semantic search: mean-pooling a small encoder (all-MiniLM-L6-v2), cosine similarity, and finding the most relevant sentence for a query without any shared keywords."
sources: 
  - title: "Reimers & Gurevych (2019), Sentence-BERT"
    url: "https://arxiv.org/abs/1908.10084"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "sentence-transformers/all-MiniLM-L6-v2 model card"
    url: "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Sentence Transformers documentation"
    url: "https://sbert.net/"
    publisher: "UKP Lab"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["An embedding model maps a whole sentence to one vector, so similar meanings land close together even with different words.", "This is the retrieval half of RAG, which the LangChain phase builds on."]
phase: 12
step: 13
draft: false
date: "2026-03-25"
---

The last LLM topic bridges to the next phase. An **embedding model** turns a sentence into one fixed-size vector, and **cosine similarity** between vectors measures similarity of meaning.

Sentence-BERT (Reimers and Gurevych, 2019) trained BERT-style encoders so that these sentence vectors work well for similarity. The common recipe is **mean pooling**: average the token vectors, ignoring padding, then L2-normalise.

I used **all-MiniLM-L6-v2** (384 dimensions) through plain `transformers`, implementing the pooling myself as its model card describes. Then I searched a few of my own note titles with a query that shares almost no words with the best match.

```python run
import torch, torch.nn.functional as F
from transformers import AutoTokenizer, AutoModel

name = "sentence-transformers/all-MiniLM-L6-v2"
tok = AutoTokenizer.from_pretrained(name)
model = AutoModel.from_pretrained(name).eval()

def embed(texts):
    enc = tok(texts, padding=True, truncation=True, return_tensors="pt")
    with torch.no_grad():
        h = model(**enc).last_hidden_state
    mask = enc.attention_mask.unsqueeze(-1).float()
    return F.normalize((h * mask).sum(1) / mask.sum(1), dim=-1)

docs = [
    "Gradient descent updates weights in the direction that reduces the loss.",
    "Dropout randomly zeroes activations during training to reduce overfitting.",
    "Pandas groupby splits rows into groups, applies a function and combines results.",
    "BPE merges the most frequent pair of symbols to build a subword vocabulary.",
    "LoRA freezes pretrained weights and learns a small low-rank update.",
]
D = embed(docs)
print("embedding shape:", tuple(D.shape))
for query in ["how do I stop my network from memorising the training set?", "cheap way to adapt a big model to my task"]:
    s = embed([query]) @ D.T
    best = s.argmax().item()
    print(f"\nquery: {query}\n -> {docs[best]}  (cos {s[0, best]:.3f})")
    print("    all scores:", [round(v, 3) for v in s[0].tolist()])
```

Output:

```text
embedding shape: (5, 384)

query: how do I stop my network from memorising the training set?
 -> Dropout randomly zeroes activations during training to reduce overfitting.  (cos 0.476)
    all scores: [0.378, 0.476, -0.147, 0.04, 0.339]

query: cheap way to adapt a big model to my task
 -> LoRA freezes pretrained weights and learns a small low-rank update.  (cos 0.101)
    all scores: [0.091, 0.014, -0.03, 0.063, 0.101]
```

Both queries find the right note without sharing its keywords. The first match is clear (0.476 vs 0.378 for the next). The second is barely ahead: 0.101 vs 0.091, with every score low. In a real RAG system I'd treat that as "no confident match" and set a minimum score threshold, rather than always returning the top result.

That ends the LLM phase. In April, LangChain wires these pieces (models, prompts, embeddings, retrieval) into applications.
