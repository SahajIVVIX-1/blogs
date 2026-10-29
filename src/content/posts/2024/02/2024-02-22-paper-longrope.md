---
title: "Paper summary: LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens"
categories: ["papers"]
tags: ["llm", "long-context"]
summary: "LongRoPE extends a pretrained LLM's context window to 2048k tokens by searching for non-uniform RoPE interpolation, extending progressively, and readjusting for short contexts."
sources: 
  - title: "LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens (arXiv:2402.13753)"
    url: "https://arxiv.org/abs/2402.13753"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:14.305Z"
  - title: "Hugging Face Daily Papers, 2024-02-22"
    url: "https://huggingface.co/papers?date=2024-02-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:58.453Z"
  - title: "LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens (arXiv HTML full text)"
    url: "https://arxiv.org/html/2402.13753"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:14.305Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/microsoft/longrope"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:40:14.305Z"
highlights: ["Positional interpolation works better when it isn't uniform across RoPE dimensions and token positions.", "Extension happens in stages, 256k with fine-tuning then a second interpolation to 2048k, with only up to 1k fine-tuning steps."]
papers: 
  - title: "LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens"
    authors: ["Yiran Ding", "Li Lyna Zhang", "Chengruidong Zhang", "Yuanyuan Xu", "Ning Shang", "Jiahang Xu", "Fan Yang", "Mao Yang"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2402.13753"
    pdf: "https://arxiv.org/pdf/2402.13753v1"
    code: "https://github.com/microsoft/longrope"
    license: "http://creativecommons.org/licenses/by-nc-nd/4.0/"
card: 
  task: "Extending LLM context windows far beyond 128k"
  method: "Search over non-uniform positional interpolation; progressive extension (256k fine-tune, then interpolate to 2048k); readjust at 8k for short-context performance"
  data: "LLaMA2 and Mistral"
  result: "Context window of 2048k tokens with up to 1k fine-tuning steps at ≤256k training length, per the abstract"
draft: false
date: "2024-02-22"
---

## Problem

Extended context windows had topped out around **128k tokens**. Fine-tuning at long lengths is costly, long training texts are scarce, and new, unseen token positions introduce "catastrophic" values in positional encodings.

## Method

Three ideas around **RoPE** (rotary position embeddings):

1. **Non-uniform interpolation**: an efficient search finds how much to rescale each RoPE dimension, and at which positions. This gives a better starting point for fine-tuning, and alone enables about **8× extension** without fine-tuning.
2. **Progressive extension**: first fine-tune a **256k**-length model, then apply a second interpolation to reach **2048k**.
3. **Readjust at 8k** so performance on the original short context window is recovered.

## Key results

The abstract reports, for the first time, a **2048k-token** context window for pre-trained LLMs, using **up to only 1k fine-tuning steps** at training lengths within 256k, while keeping performance on the original short window. Experiments cover LLaMA2 and Mistral.

## Limitations

There's no dedicated limitations section in the extracted text. Supporting a window doesn't mean equal quality across it, and actually running a 2M-token context still has large compute and memory costs at inference.
