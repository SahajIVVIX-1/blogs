---
title: "LLMs · Tokenizers: BPE"
categories: ["study"]
tags: ["llm", "tokenisation", "bpe"]
summary: "Byte-pair encoding from scratch: start from characters, repeatedly merge the most frequent adjacent pair, and use the learned merges to tokenise new words, compared with GPT-2's real tokenizer."
sources: 
  - title: "Sennrich, Haddow & Birch (2016), Neural Machine Translation of Rare Words with Subword Units"
    url: "https://arxiv.org/abs/1508.07909"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Hugging Face LLM Course: Byte-Pair Encoding tokenization"
    url: "https://huggingface.co/learn/llm-course/chapter6/5"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Karpathy, minbpe"
    url: "https://github.com/karpathy/minbpe"
    publisher: "GitHub"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["BPE learns its vocabulary by repeatedly merging the most frequent adjacent pair of symbols.", "Frequent words become single tokens; rare words are split into known pieces."]
phase: 12
step: 3
draft: false
date: "2026-01-14"
---

In the NLP phase I *used* WordPiece. Today I built **byte-pair encoding (BPE)**, the method GPT models use, from scratch:

1. Start with each word split into characters, plus an end-of-word marker.
2. Count every **adjacent pair** of symbols across the corpus, weighted by word frequency.
3. **Merge** the most frequent pair into a new symbol and record the merge.
4. Repeat until the vocabulary is big enough.

To tokenise new text, apply the learned merges **in order**. Frequent words end up as one token, and rare ones fall back to smaller pieces. GPT-2 does this on **bytes**, so any string can be encoded with no unknown tokens.

```python run
from collections import Counter

corpus = "low low low low lower lower newest newest newest newest newest newest widest widest widest".split()
words = Counter(tuple(w) + ("</w>",) for w in corpus)

def pair_counts(words):
    c = Counter()
    for w, n in words.items():
        for a, b in zip(w, w[1:]):
            c[(a, b)] += n
    return c

def merge(words, pair):
    out = {}
    for w, n in words.items():
        new, i = [], 0
        while i < len(w):
            if i < len(w) - 1 and (w[i], w[i + 1]) == pair:
                new.append(w[i] + w[i + 1]); i += 2
            else:
                new.append(w[i]); i += 1
        out[tuple(new)] = n
    return out

merges = []
for step in range(10):
    best = pair_counts(words).most_common(1)[0][0]
    merges.append(best); words = merge(words, best)
    print(f"merge {step + 1:>2}: {best[0]!r} + {best[1]!r}")

def encode(word):
    w = tuple(word) + ("</w>",)
    for p in merges:
        w = tuple(merge({w: 1}, p))[0]
    return list(w)

for w in ["lowest", "newer", "wider"]:
    print(w, "->", encode(w))

from transformers import AutoTokenizer
gpt2 = AutoTokenizer.from_pretrained("gpt2")
print("GPT-2:", gpt2.tokenize("Tokenization in Gandhinagar is unbelievably fun"))
```

Output:

```text
merge  1: 'e' + 's'
merge  2: 'es' + 't'
merge  3: 'est' + '</w>'
merge  4: 'l' + 'o'
merge  5: 'lo' + 'w'
merge  6: 'n' + 'e'
merge  7: 'ne' + 'w'
merge  8: 'new' + 'est</w>'
merge  9: 'low' + '</w>'
merge 10: 'w' + 'i'
lowest -> ['low', 'est</w>']
newer -> ['new', 'e', 'r', '</w>']
wider -> ['wi', 'd', 'e', 'r', '</w>']
GPT-2: ['Token', 'ization', 'Ġin', 'ĠGand', 'hin', 'agar', 'Ġis', 'Ġunbelievably', 'Ġfun']
```
