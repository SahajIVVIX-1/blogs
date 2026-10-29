---
title: "Transformers · Hugging Face Transformers: fine-tuning"
categories: ["study"]
tags: ["transformers", "hugging-face", "fine-tuning"]
summary: "Fine-tuning a small pretrained encoder (BERT-mini) for sentiment on Rotten Tomatoes with a plain PyTorch loop, and an honest comparison with the TF-IDF baseline from my NLP phase."
sources: 
  - title: "Hugging Face LLM Course: Fine-tuning a pretrained model"
    url: "https://huggingface.co/learn/llm-course/chapter3/1"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T21:58:04.531Z"
  - title: "Hugging Face: Fine-tune a pretrained model"
    url: "https://huggingface.co/docs/transformers/training"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T21:58:05.149Z"
  - title: "google/bert_uncased_L-4_H-256_A-4 model card (BERT-mini)"
    url: "https://huggingface.co/google/bert_uncased_L-4_H-256_A-4"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T21:58:05.747Z"
highlights: ["Fine-tuning reuses everything the model learned in pre-training and only has to learn the new head and small adjustments.", "An 11M-parameter BERT-mini only tied the TF-IDF baseline here: model size matters, and strong classical baselines are hard to beat on short texts."]
phase: 11
step: 10
draft: false
date: "2025-12-23"
---

The last Transformers topic connects back to the sentiment post from July. That TF-IDF + logistic regression baseline scored 0.79 on Rotten Tomatoes. Can a fine-tuned Transformer beat it, on a CPU?

To keep it laptop-sized I used **BERT-mini** (Google's 4-layer, 256-wide BERT, about 11M parameters), trained on all **8,530** training sentences for 2 epochs. My first run used only 4,000 sentences and reached 0.770. A separate 3-epoch test peaked after epoch 2 (0.791, then 0.782), so I kept 2. Fine-tuning means:

1. load the pretrained encoder plus a fresh classification head
2. train everything with a **small learning rate** (here 5e-5), so the pretrained knowledge isn't overwritten
3. evaluate on the held-out test set

I wrote a plain PyTorch loop so every step stays visible. The `Trainer` class wraps the same steps.

```python run
import torch, numpy as np
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification

torch.manual_seed(0); torch.set_num_threads(4)
name = "google/bert_uncased_L-4_H-256_A-4"
ds = load_dataset("cornell-movie-review-data/rotten_tomatoes")
train = ds["train"].shuffle(seed=0)
test = ds["test"]
tok = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name, num_labels=2)
print("parameters:", round(sum(p.numel() for p in model.parameters()) / 1e6, 1), "M")

def batches(split, bs, shuffle):
    idx = np.random.default_rng(0).permutation(len(split)) if shuffle else np.arange(len(split))
    for i in range(0, len(split), bs):
        rows = split[idx[i:i + bs].tolist()]
        enc = tok(rows["text"], padding=True, truncation=True, max_length=64, return_tensors="pt")
        yield enc, torch.tensor(rows["label"])

def accuracy():
    model.eval(); correct = 0
    with torch.no_grad():
        for enc, y in batches(test, 128, False):
            correct += (model(**enc).logits.argmax(-1) == y).sum().item()
    return correct / len(test)

print("before fine-tuning:", round(accuracy(), 3))
opt = torch.optim.AdamW(model.parameters(), lr=5e-5)
for epoch in range(2):
    model.train()
    for enc, y in batches(train, 32, True):
        loss = model(**enc, labels=y).loss
        opt.zero_grad(); loss.backward(); opt.step()
    print(f"epoch {epoch + 1}: last loss {loss.item():.3f} | test accuracy {accuracy():.3f}")
```

Output:

```text
parameters: 11.2 M
before fine-tuning: 0.506
epoch 1: last loss 0.553 | test accuracy 0.765
epoch 2: last loss 0.289 | test accuracy 0.791
```

The result: about **0.79**, essentially a tie with TF-IDF + logistic regression (0.79). The fine-tuned model is far more expensive to train and run, and at this size it isn't better. Larger encoders (BERT-base and up) are where fine-tuning normally pulls ahead, but they were too slow for my CPU run. It was a useful reminder to always compare against a simple baseline.

That closes the Transformers phase. Next, LLMs: how these models are pre-trained at scale and then turned into assistants.
