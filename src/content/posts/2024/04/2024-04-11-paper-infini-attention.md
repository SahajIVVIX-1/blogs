---
title: "Paper summary: Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention"
categories: ["papers"]
tags: ["llm", "long-context", "attention"]
summary: "Infini-attention adds a compressive memory to standard attention, combining local masked attention with long-term linear attention so Transformers can stream unbounded inputs with bounded memory."
sources: 
  - title: "Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention (arXiv:2404.07143)"
    url: "https://arxiv.org/abs/2404.07143"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:56.763Z"
  - title: "Hugging Face Daily Papers, 2024-04-11"
    url: "https://huggingface.co/papers?date=2024-04-11"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:28.211Z"
  - title: "Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention (arXiv HTML full text)"
    url: "https://arxiv.org/html/2404.07143"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:56.763Z"
highlights: ["Each block mixes normal local attention with retrieval from a fixed-size compressive memory of everything earlier.", "The paper reports 1M-token passkey retrieval and 500K-token book summarisation with 1B and 8B models."]
papers: 
  - title: "Leave No Context Behind: Efficient Infinite Context Transformers with Infini-attention"
    authors: ["Tsendsuren Munkhdalai", "Manaal Faruqui", "Siddharth Gopal"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2404.07143"
    pdf: "https://arxiv.org/pdf/2404.07143v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Processing arbitrarily long inputs with bounded memory"
  method: "Infini-attention: compressive memory inside the attention layer, combining masked local attention and long-term linear attention"
  data: "Long-context LM benchmarks; 1M-length passkey retrieval; 500K-length book summarisation"
  result: "Effective on these tasks with 1B and 8B LLMs, with minimal bounded memory parameters, per the abstract"
draft: false
date: "2024-04-11"
---

## Problem

Standard attention's memory grows with the context: the KV cache keeps every past token. To handle unboundedly long inputs, a model needs memory that stays the same size.

## Method

**Infini-attention** builds a **compressive memory** into the attention mechanism itself. Within a single Transformer block it combines:

- **masked local attention** over the current segment, as usual
- **long-term linear attention** that reads from and updates a fixed-size memory summarising all earlier segments

The input is processed segment by segment as a stream, so memory and compute stay **bounded**.

## Key results

The abstract reports effectiveness on long-context language-modelling benchmarks, on **1M-length passkey** retrieval and on **500K-length book summarisation**, using **1B and 8B** LLMs. It adds only minimal memory parameters and allows fast streaming inference.

## Limitations

The extracted text has no dedicated limitations section. A fixed-size compressive memory necessarily loses some detail of the distant past.
