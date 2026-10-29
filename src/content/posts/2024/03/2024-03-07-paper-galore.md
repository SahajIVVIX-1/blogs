---
title: "Paper summary: GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection"
categories: ["papers"]
tags: ["llm", "training", "efficiency"]
summary: "GaLore projects gradients into a low-rank subspace for the optimizer state while still updating all weights, cutting optimizer memory by up to 65.5% (82.5% in 8-bit) without LoRA's accuracy trade-off."
sources: 
  - title: "GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection (arXiv:2403.03507)"
    url: "https://arxiv.org/abs/2403.03507"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:25.795Z"
  - title: "Hugging Face Daily Papers, 2024-03-07"
    url: "https://huggingface.co/papers?date=2024-03-07"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:06.982Z"
  - title: "GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection (arXiv HTML full text)"
    url: "https://arxiv.org/html/2403.03507"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:25.795Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/jiaweizzhao/galore"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:40:25.795Z"
highlights: ["LoRA restricts the *weights* to a low-rank update; GaLore keeps full-rank weights and compresses the *gradients* instead.", "The paper reports pre-training a 7B model on a consumer GPU with 24 GB of memory."]
papers: 
  - title: "GaLore: Memory-Efficient LLM Training by Gradient Low-Rank Projection"
    authors: ["Jiawei Zhao", "Zhenyu Zhang", "Beidi Chen", "Zhangyang Wang", "Anima Anandkumar", "Yuandong Tian"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2403.03507"
    pdf: "https://arxiv.org/pdf/2403.03507v2"
    code: "https://github.com/jiaweizzhao/galore"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Memory-efficient LLM pre-training and fine-tuning"
  method: "Gradient Low-Rank Projection: project gradients to a low-rank subspace for optimizer states; full-parameter learning"
  data: "LLaMA 1B and 7B pre-training on C4 (up to 19.7B tokens); RoBERTa fine-tuning on GLUE"
  result: "Up to 65.5% less optimizer-state memory; 8-bit GaLore up to 82.5% less optimizer memory, per the abstract"
draft: false
date: "2024-03-07"
---

## Problem

Training LLMs needs memory for weights **and** optimizer states (Adam keeps two extra values per parameter). LoRA reduces this by training only a small low-rank update, but the abstract notes that LoRA-style methods usually **underperform full-rank training**. They limit the search to a low-rank subspace, change training dynamics, and may need a full-rank warm start.

## Method

**GaLore** keeps **full-parameter learning** but makes the **gradients** low-rank. At each step, the gradient matrix is projected onto a low-rank subspace, where the optimizer keeps its states. The update is projected back and applied to all weights. The subspace is refreshed periodically, so over time training can still explore the full space.

## Key results

From the abstract:

- up to **65.5%** less memory in optimizer states, while keeping efficiency and performance for pre-training LLaMA 1B and 7B on C4 (up to 19.7B tokens) and for fine-tuning RoBERTa on GLUE
- **8-bit GaLore** reduces optimizer memory by up to **82.5%**
- the paper also reports pre-training a **7B** model on a consumer GPU with **24 GB** of memory, without model parallelism, checkpointing or offloading

## Limitations

There's no dedicated limitations section in the extracted text. The savings target optimizer states and gradients. Activations and weights still need memory as usual.
