---
title: "Paper summary: Self-Alignment with Instruction Backtranslation"
categories: ["papers"]
tags: ["llm", "alignment", "data"]
summary: "Instruction backtranslation lets a language model label unlabelled web text with the instructions it answers, then pick the best pairs to fine-tune itself."
sources: 
  - title: "Self-Alignment with Instruction Backtranslation (arXiv:2308.06259)"
    url: "https://arxiv.org/abs/2308.06259"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:32.204Z"
  - title: "Hugging Face Daily Papers, 2023-08-14"
    url: "https://huggingface.co/papers?date=2023-08-14"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:01.825Z"
  - title: "Self-Alignment with Instruction Backtranslation (arXiv HTML full text)"
    url: "https://arxiv.org/html/2308.06259"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:32.204Z"
highlights: ["The model writes the missing instruction for an existing human-written answer, which is the reverse of normal generation.", "Self-curation, where the model scores its own candidate pairs, matters as much as self-augmentation."]
papers: 
  - title: "Self-Alignment with Instruction Backtranslation"
    authors: ["Xian Li", "Ping Yu", "Chunting Zhou", "Timo Schick", "Omer Levy", "Luke Zettlemoyer", "Jason Weston", "Mike Lewis"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2308.06259"
    pdf: "https://arxiv.org/pdf/2308.06259v3"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Building instruction-following LLMs without large human-labelled instruction sets"
  method: "Self-augmentation (generate instructions for web documents) + self-curation (model rates candidates), iterated twice"
  data: "Small seed set of human-written examples plus a large web corpus; LLaMa base models"
  result: "Outperforms other LLaMa-based models on the Alpaca leaderboard that do not use distillation data, per the authors"
draft: false
date: "2023-08-14"
---

## Problem

Instruction tuning needs many (instruction, response) pairs. Human-written pairs are expensive, and distilling them from a stronger proprietary model brings its own dependency. Meanwhile the web is full of high-quality human-written *responses* (guides, explanations) that have no instruction attached.

## Method

The name borrows from **backtranslation** in machine translation:

1. Fine-tune a seed model on a small amount of human-written instruction data.
2. **Self-augmentation**: for each web document, have the model generate the instruction that the document would answer.
3. **Self-curation**: have the model itself rate the candidate pairs, and keep only the high-quality ones.
4. Fine-tune a stronger model on the curated pairs and repeat. The paper uses two iterations.

## Key results

The authors report that fine-tuning LLaMa with two iterations gives a model (called Humback) that outperforms all other LLaMa-based models on the Alpaca leaderboard that don't rely on distillation data. They describe this as effective **self-alignment**.

## Limitations

The paper doesn't include a separate limitations section in the HTML version. By design, the method depends on the web corpus it starts from and on the model's own quality ratings during self-curation. The headline result in the abstract is measured on the Alpaca leaderboard.
