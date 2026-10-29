---
title: "Paper summary: Instruction Pre-Training: Language Models are Supervised Multitask Learners"
categories: ["papers"]
tags: ["llm", "pre-training", "data"]
summary: "Instruction Pre-Training augments raw pre-training text with synthesised instruction–response pairs (200M of them across 40+ task types) and reports stronger base models and better gains from later instruction tuning."
sources: 
  - title: "Instruction Pre-Training: Language Models are Supervised Multitask Learners (arXiv:2406.14491)"
    url: "https://arxiv.org/abs/2406.14491"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:57.919Z"
  - title: "Hugging Face Daily Papers, 2024-06-21"
    url: "https://huggingface.co/papers?date=2024-06-21"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:11.601Z"
  - title: "Instruction Pre-Training: Language Models are Supervised Multitask Learners (arXiv HTML full text)"
    url: "https://arxiv.org/html/2406.14491"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:57.919Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/microsoft/LMOps"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:41:57.919Z"
highlights: ["Instead of only predicting raw text, the model also learns from question–answer pairs generated about that same text.", "With continual pre-training, the paper reports Llama3-8B comparable to or better than Llama3-70B on its evaluations."]
papers: 
  - title: "Instruction Pre-Training: Language Models are Supervised Multitask Learners"
    authors: ["Daixuan Cheng", "Yuxian Gu", "Shaohan Huang", "Junyu Bi", "Minlie Huang", "Furu Wei"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2406.14491"
    pdf: "https://arxiv.org/pdf/2406.14491v2"
    code: "https://github.com/microsoft/LMOps"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Supervised multitask learning during pre-training"
  method: "An open-model instruction synthesizer generates instruction–response pairs from raw corpora; LMs pre-trained on the augmented corpus"
  data: "200M synthesised pairs across 40+ task categories"
  result: "Better base models that benefit more from instruction tuning; Llama3-8B comparable to or above Llama3-70B in continual pre-training, per the abstract"
draft: false
date: "2024-06-21"
---

## Problem

Pre-training is unsupervised: predict the next token of raw text. Supervised multitask learning (instruction tuning) improves generalisation, but it usually happens only after pre-training. Can supervision be brought into pre-training itself, at scale?

## Method

**Instruction Pre-Training** adds **instruction–response pairs** to the raw corpus. An **instruction synthesizer**, built on open-source models, reads a raw text and generates related tasks with answers. The LM is pre-trained on the raw text plus these pairs. The authors synthesise **200M pairs across 40+ task categories**.

## Key results

From the abstract:

- pre-training from scratch: consistently better base models, which also gain **more** from later instruction tuning
- continual pre-training: **Llama3-8B** becomes comparable to, or better than, **Llama3-70B** on their evaluations

## Limitations

From the paper's own section:

- synthetic data can introduce **hallucinations**; their analysis puts the accuracy of the instruction-augmented corpora at about **70%**
- the pre-training scale is far below the trillions of tokens used for frontier models
