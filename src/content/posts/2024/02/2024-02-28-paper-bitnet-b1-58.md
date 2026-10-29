---
title: "Paper summary: The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits"
categories: ["papers"]
tags: ["llm", "efficiency", "quantisation"]
summary: "BitNet b1.58 restricts every weight to −1, 0 or +1 (about 1.58 bits) and reports matching full-precision LLMs of the same size and data on perplexity and end tasks, at much lower cost."
sources: 
  - title: "The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits (arXiv:2402.17764)"
    url: "https://arxiv.org/abs/2402.17764"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:21.321Z"
  - title: "Hugging Face Daily Papers, 2024-02-28"
    url: "https://huggingface.co/papers?date=2024-02-28"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:02.111Z"
  - title: "The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits (arXiv HTML full text)"
    url: "https://arxiv.org/html/2402.17764"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:21.321Z"
highlights: ["Adding 0 to binary weights gives ternary {−1, 0, 1}: log₂3 ≈ 1.58 bits per weight.", "The authors argue this defines a new scaling law and recipe, and motivates hardware built for 1-bit LLMs."]
papers: 
  - title: "The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits"
    authors: ["Shuming Ma", "Hongyu Wang", "Lingxiao Ma", "Lei Wang", "Wenhui Wang", "Shaohan Huang", "Li Dong", "Ruiping Wang", "Jilong Xue", "Furu Wei"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2402.17764"
    pdf: "https://arxiv.org/pdf/2402.17764v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Cost-effective LLMs (latency, memory, throughput, energy)"
  method: "Ternary weights {−1, 0, 1} in every linear layer, trained from scratch (successor to BitNet)"
  data: "Compared with FP16/BF16 Transformers at the same size and training tokens"
  result: "Matches full-precision perplexity and end-task performance while being significantly cheaper, per the abstract"
draft: false
date: "2024-02-28"
---

## Problem

This continues **BitNet**, which I summarised in October 2023: can LLMs be trained with extremely low-precision weights and still match full precision?

## Method

**BitNet b1.58** makes every weight **ternary**: −1, 0 or +1. That's log₂(3) ≈ **1.58 bits**. Compared with pure 1-bit weights, the extra 0 lets the model effectively switch features off. Most matrix multiplications become additions and subtractions.

## Key results

The abstract claims BitNet b1.58 **matches FP16/BF16 Transformers of the same size, trained on the same number of tokens**, in both perplexity and end-task performance, while being significantly cheaper in latency, memory, throughput and energy. The authors argue it defines a new scaling law and training recipe, and opens the door to hardware designed for 1-bit LLMs.

## Limitations

This is a short paper without a dedicated limitations section. The efficiency benefits depend on hardware and kernels that can exploit ternary weights.
