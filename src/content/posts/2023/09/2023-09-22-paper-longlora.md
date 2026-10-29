---
title: "Paper summary: LongLoRA: Efficient Fine-tuning of Long-Context Large Language Models"
categories: ["papers"]
tags: ["llm", "long-context", "fine-tuning"]
summary: "LongLoRA extends the context window of pretrained LLMs cheaply by fine-tuning with shifted sparse local attention plus a LoRA variant that also trains embeddings and norms."
sources: 
  - title: "LongLoRA: Efficient Fine-tuning of Long-Context Large Language Models (arXiv:2309.12307)"
    url: "https://arxiv.org/abs/2309.12307"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:56.476Z"
  - title: "Hugging Face Daily Papers, 2023-09-22"
    url: "https://huggingface.co/papers?date=2023-09-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:25.464Z"
  - title: "LongLoRA: Efficient Fine-tuning of Long-Context Large Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2309.12307"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:56.476Z"
  - title: "Code repository"
    url: "https://github.com/dvlab-research/longlora"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:37:56.476Z"
highlights: ["Fine-tuning can use cheap local attention even though inference keeps full attention.", "LoRA works for context extension only when embeddings and normalisation layers are trainable too."]
papers: 
  - title: "LongLoRA: Efficient Fine-tuning of Long-Context Large Language Models"
    authors: ["Yukang Chen", "Shengju Qian", "Haotian Tang", "Xin Lai", "Zhijian Liu", "Song Han", "Jiaya Jia"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2309.12307"
    pdf: "https://arxiv.org/pdf/2309.12307v3"
    code: "https://github.com/dvlab-research/longlora"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Extending LLM context length with limited compute"
  method: "Shifted sparse attention (S²-Attn) during fine-tuning + LoRA with trainable embedding and normalisation layers"
  data: "Llama 2 models from 7B to 70B"
  result: "Llama 2 7B extended from 4k to 100k context, or 70B to 32k, on one 8×A100 machine, per the abstract"
draft: false
date: "2023-09-22"
---

## Problem

Training on long sequences is expensive because self-attention cost grows quadratically. The paper's example: a context of 8,192 needs 16× the attention compute of 2,048. So extending a pretrained model's context window usually means heavy fine-tuning.

## Method

Two ideas, combined:

1. **Shifted sparse attention (S²-Attn)**: during *fine-tuning*, split the sequence into groups and attend only within each group. In half of the attention heads, shift the groups by half a group, so information still flows between neighbouring groups. The authors say this takes about two lines of code, and that the model still uses normal full attention at inference.
2. **Improved LoRA**: standard LoRA alone didn't extend context well. It works once the **embedding and normalisation layers are also trainable**.

## Key results

The paper reports strong results on Llama 2 from 7B to 70B. One example: extending Llama 2 7B from 4k to **100k** tokens, or 70B to **32k**, on a single machine with 8 A100 GPUs, while keeping the original architecture.

## Limitations

The approach is about *fine-tuning* efficiency. The extended models still pay full long-context attention cost at inference. The conclusion reports a "minimal accuracy compromise" compared with full fine-tuning, not zero.
