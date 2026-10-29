---
title: "Paper summary: Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach"
categories: ["papers"]
tags: ["llm", "reasoning", "architectures"]
summary: "A language model that \"thinks\" by looping a recurrent block more times at test time, reasoning in latent space instead of writing out more chain-of-thought tokens; a 3.5B proof of concept."
sources: 
  - title: "Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach (arXiv:2502.05171)"
    url: "https://arxiv.org/abs/2502.05171"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:28.890Z"
  - title: "Hugging Face Daily Papers, 2025-02-10"
    url: "https://huggingface.co/papers?date=2025-02-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:34.007Z"
  - title: "Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach (arXiv HTML full text)"
    url: "https://arxiv.org/html/2502.05171"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:28.890Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/seal-rg/recurrent-pretraining"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:45:28.890Z"
highlights: ["More test-time compute here means more passes through the same block, not more generated tokens.", "Unlike chain-of-thought, it needs no special training data and can capture reasoning that isn't easily put into words."]
papers: 
  - title: "Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach"
    authors: ["Jonas Geiping", "Sean McLeish", "Neel Jain", "John Kirchenbauer", "Siddharth Singh", "Brian R. Bartoldson", "Bhavya Kailkhura", "Abhinav Bhatele", "Tom Goldstein"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2502.05171"
    pdf: "https://arxiv.org/pdf/2502.05171v2"
    code: "https://github.com/seal-rg/recurrent-pretraining"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Scaling test-time computation for reasoning"
  method: "Recurrent-depth architecture: iterate a shared block an arbitrary number of times at inference"
  data: "3.5B-parameter model trained on 800B tokens"
  result: "Reasoning-benchmark gains, sometimes dramatic, up to compute equivalent to a 50B-parameter model, per the abstract"
draft: false
date: "2025-02-10"
---

## Problem

Reasoning models usually spend more test-time compute by **generating more tokens**: long chains of thought. That needs suitable training data and long context windows, and it forces all reasoning through words.

## Method

The authors build a model with a **recurrent block** that can be **iterated** any number of times. At test time it can be unrolled to arbitrary depth, so it "thinks" longer in **latent space** before producing a token. According to the abstract, this:

- needs no specialised training data
- works with small context windows
- can capture kinds of reasoning that are hard to express in words

They scale a proof of concept to **3.5B parameters** trained on **800B tokens**.

## Key results

The model improves on reasoning benchmarks as it's given more iterations, sometimes dramatically, up to a compute load the authors equate to a **50B-parameter** model.

## Limitations

There's no dedicated limitations section in the extracted text. It's described as a proof of concept at 3.5B scale.
