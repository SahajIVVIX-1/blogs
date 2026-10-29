---
title: "Paper summary: Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
categories: ["papers"]
tags: ["llm", "architectures", "state-space-models"]
summary: "Mamba makes state-space model parameters depend on the input, so the model can choose what to remember or forget, and pairs this with a hardware-aware scan: linear-time sequence modelling without attention."
sources: 
  - title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces (arXiv:2312.00752)"
    url: "https://arxiv.org/abs/2312.00752"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:04.748Z"
  - title: "Hugging Face Daily Papers, 2023-12-04"
    url: "https://huggingface.co/papers?date=2023-12-04"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:09.815Z"
  - title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces (arXiv HTML full text)"
    url: "https://arxiv.org/html/2312.00752"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:04.748Z"
  - title: "Code repository"
    url: "https://github.com/state-spaces/mamba"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:39:04.748Z"
highlights: ["Letting the SSM parameters depend on the current token gives the model the content-based selection that earlier SSMs lacked.", "The paper reports about 5× higher inference throughput than Transformers and linear scaling in sequence length."]
papers: 
  - title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
    authors: ["Albert Gu", "Tri Dao"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2312.00752"
    pdf: "https://arxiv.org/pdf/2312.00752v2"
    code: "https://github.com/state-spaces/mamba"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Sequence modelling (language, audio, genomics) without attention"
  method: "Selective state-space model with input-dependent parameters; hardware-aware parallel scan; simple block with no attention or MLP"
  data: "Language modelling and other modalities"
  result: "~5× higher inference throughput than Transformers, linear scaling in length, strong language-modelling quality, per the abstract"
draft: false
date: "2023-12-04"
---

## Problem

Transformers' attention costs grow quadratically with sequence length. Many subquadratic alternatives exist (linear attention, gated convolutions, recurrent models, structured **state-space models** or SSMs), but on language they had lagged behind attention. The authors locate the weakness in an inability to do **content-based reasoning**: to decide, from the current token, what to keep and what to ignore.

## Method

1. **Selection**: make the SSM's parameters **functions of the input**, so the model can selectively propagate or forget information depending on the current token.
2. This breaks the convolution trick earlier SSMs used for fast training, so the authors design a **hardware-aware parallel algorithm** that computes the recurrence efficiently on GPUs.
3. They build a simplified architecture, **Mamba**, with no attention and no separate MLP blocks.

## Key results

From the abstract: Mamba has fast inference, about **5× the throughput of Transformers**, and **linear scaling** in sequence length. The paper reports strong results on language, audio and genomics. On language modelling, **Mamba-3B** outperforms Transformers of the same size and matches Transformers **twice its size**, both in pre-training and downstream evaluation. Code and checkpoints are open-sourced.

## Limitations

The paper's discussion includes a "no free lunch" point. Structured SSMs came from continuous systems and carry an inductive bias toward continuous signals like audio or video. The selection mechanism that helps on discrete data like text can trade off against that, and the authors discuss this spectrum rather than claiming a universal win.
