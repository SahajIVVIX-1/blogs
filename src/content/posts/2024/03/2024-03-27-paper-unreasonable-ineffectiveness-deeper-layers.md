---
title: "Paper summary: The Unreasonable Ineffectiveness of the Deeper Layers"
categories: ["papers"]
tags: ["llm", "pruning", "interpretability"]
summary: "Removing up to about half of the layers of some open LLMs, chosen by layer similarity and followed by a little QLoRA \"healing\", barely hurts question-answering performance."
sources: 
  - title: "The Unreasonable Ineffectiveness of the Deeper Layers (arXiv:2403.17887)"
    url: "https://arxiv.org/abs/2403.17887"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:44.401Z"
  - title: "Hugging Face Daily Papers, 2024-03-27"
    url: "https://huggingface.co/papers?date=2024-03-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:19.214Z"
  - title: "The Unreasonable Ineffectiveness of the Deeper Layers (arXiv HTML full text)"
    url: "https://arxiv.org/html/2403.17887"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:44.401Z"
highlights: ["Choosing which contiguous block of layers to drop by representation similarity, then healing with QLoRA, leaves QA performance largely intact.", "Either pre-training underuses the deeper layers, or the shallow layers do most of the knowledge storage."]
papers: 
  - title: "The Unreasonable Ineffectiveness of the Deeper Layers"
    authors: ["Andrey Gromov", "Kushal Tirumala", "Hassan Shapourian", "Paolo Glorioso", "Daniel A. Roberts"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2403.17887"
    pdf: "https://arxiv.org/pdf/2403.17887v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Understanding where knowledge sits in LLM layers, via pruning"
  method: "Pick the optimal block of layers to remove using cross-layer similarity; heal with a small amount of QLoRA fine-tuning"
  data: "Common open-weight models; question-answering benchmarks"
  result: "Minimal degradation until a large fraction (up to half) of layers is removed for some models, per the abstract"
draft: false
date: "2024-03-27"
---

## Problem

How is knowledge stored across an LLM's layers? Pruning can test this: if removing a layer doesn't change performance on knowledge-heavy QA benchmarks, that layer isn't needed to store the knowledge those questions use.

## Method

1. Measure **similarity** between the representations at different depths, and find the contiguous block of layers whose removal changes the representation least.
2. Remove that block.
3. **"Heal"** the model with a small amount of parameter-efficient fine-tuning (**QLoRA**). Each experiment fits on a single 40GB A100.

## Key results

For some common open-weight models, performance on QA benchmarks shows **minimal degradation until a large fraction, up to half, of the layers is removed**. The authors give two possible readings: current pre-training doesn't make good use of deeper layers, or shallow layers play a critical role in storing knowledge.

## Limitations

There's no dedicated limitations section in the extracted text. The finding is measured on question-answering benchmarks. Other abilities, such as reasoning or long-form generation, can depend on different layers.
