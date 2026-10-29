---
title: "Transformers · Hugging Face Transformers: pipelines"
categories: ["study"]
tags: ["transformers", "hugging-face"]
summary: "The pipeline() API for quick inference (sentiment, zero-shot classification, NER, summarisation) and what happens inside: tokenizer → model → post-processing."
sources: 
  - title: "Hugging Face: Pipelines"
    url: "https://huggingface.co/docs/transformers/main_classes/pipelines"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T21:58:02.728Z"
  - title: "Hugging Face LLM Course: Behind the pipeline"
    url: "https://huggingface.co/learn/llm-course/chapter2/2"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T21:58:03.482Z"
  - title: "distilbert/distilbert-base-uncased-finetuned-sst-2-english model card"
    url: "https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T21:58:03.926Z"
highlights: ["A pipeline bundles three steps: tokenise, run the model, turn logits back into labels or text.", "Always pin a model name; the default model for a task can change between library versions."]
phase: 11
step: 9
draft: false
date: "2025-12-12"
---

`pipeline(task, model=...)` is the fastest way to use a pretrained model. Behind it are the three steps the Hugging Face course walks through:

1. **Tokenizer**: text → input IDs and attention mask
2. **Model**: IDs → logits
3. **Post-processing**: logits → labels with scores (or generated text)

One habit I'm keeping: always pass `model=`. Without it, the library picks a default that can change between versions, and the results quietly change with it.

```python run
import torch
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification

name = "distilbert/distilbert-base-uncased-finetuned-sst-2-english"
clf = pipeline("sentiment-analysis", model=name)
texts = ["This course finally made attention click for me.", "The lecture was long and confusing."]
print(clf(texts))

# the same thing by hand
tok = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name).eval()
enc = tok(texts, padding=True, return_tensors="pt")
with torch.no_grad():
    probs = model(**enc).logits.softmax(-1)
print([(model.config.id2label[int(p.argmax())], round(p.max().item(), 4)) for p in probs])

ner = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")
print([(e["word"], e["entity_group"]) for e in ner("Sahaj studies at Pandit Deendayal Energy University in Gandhinagar.")])
```

Output:

```text
[{'label': 'POSITIVE', 'score': 0.9977986216545105}, {'label': 'NEGATIVE', 'score': 0.99891197681427}]
[('POSITIVE', 0.9978), ('NEGATIVE', 0.9989)]
[('Saha', 'PER'), ('Pandit Deendayal Energy University', 'ORG'), ('Gandhinagar', 'LOC')]
```

The NER model finds the university and the city, but my own name comes back as "Saha". The tokenizer splits "Sahaj" into sub-word pieces, and only some of them got the PER label, so the aggregated span is cut short. Rare names are a known weak spot.
