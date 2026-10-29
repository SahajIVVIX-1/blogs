---
title: "NLP · Tokenisation"
categories: ["study"]
tags: ["nlp", "tokenisation"]
summary: "Word, character and subword tokenisation compared, out-of-vocabulary words, and what a real BERT WordPiece tokenizer does to unusual words."
sources: 
  - title: "Hugging Face LLM Course: Tokenizers"
    url: "https://huggingface.co/learn/llm-course/chapter2/4"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T18:45:18.192Z"
  - title: "Hugging Face: Summary of the tokenizers"
    url: "https://huggingface.co/docs/transformers/tokenizer_summary"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T18:45:18.705Z"
  - title: "Sennrich et al. (2016), Neural Machine Translation of Rare Words with Subword Units"
    url: "https://arxiv.org/abs/1508.07909"
    publisher: "arXiv"
    fetched_at: "2026-10-29T18:45:20.128Z"
highlights: ["Subword tokenisation splits rare words into known pieces, so there are no out-of-vocabulary words.", "Word-level vocabularies explode in size; character-level sequences become very long."]
phase: 9
step: 2
draft: false
date: "2025-05-09"
---

A model needs integer IDs, so text must be split into **tokens** first. The three choices:

| level | vocabulary | sequence length | unknown words |
|---|---|---|---|
| word | huge (every inflection) | short | many OOV words |
| character | tiny | very long | none |
| **subword** (BPE, WordPiece) | about 30k–100k | medium | none, rare words split into pieces |

Subword methods (Sennrich et al., 2016, brought BPE to NMT) keep frequent words whole and break rare ones into reusable pieces. I'll build BPE from scratch in the LLM phase. Today I just inspected a real tokenizer: BERT's WordPiece, loaded from the Hugging Face Hub. The `##` prefix means "continues the previous piece".

```python run
import re
from transformers import AutoTokenizer

sentence = "Tokenisation of unbelievably rare words like Gandhinagar"
print("word :", re.findall(r"\w+", sentence))
print("char :", list(sentence[:20]), "...")

tok = AutoTokenizer.from_pretrained("bert-base-uncased")
pieces = tok.tokenize(sentence)
print("bert :", pieces)
ids = tok(sentence)["input_ids"]
print("ids  :", ids)
print("back :", tok.decode(ids))
print("vocab size:", tok.vocab_size)
```

Output:

```text
word : ['Tokenisation', 'of', 'unbelievably', 'rare', 'words', 'like', 'Gandhinagar']
char : ['T', 'o', 'k', 'e', 'n', 'i', 's', 'a', 't', 'i', 'o', 'n', ' ', 'o', 'f', ' ', 'u', 'n', 'b', 'e'] ...
bert : ['token', '##isation', 'of', 'un', '##bel', '##ie', '##va', '##bly', 'rare', 'words', 'like', 'gandhi', '##nagar']
ids  : [101, 19204, 6648, 1997, 4895, 8671, 2666, 3567, 6321, 4678, 2616, 2066, 12338, 14346, 102]
back : [CLS] tokenisation of unbelievably rare words like gandhinagar [SEP]
vocab size: 30522
```
