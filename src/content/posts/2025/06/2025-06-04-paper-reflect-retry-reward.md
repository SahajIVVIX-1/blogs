---
title: "Paper summary: Reflect, Retry, Reward: Self-Improving LLMs via Reinforcement Learning"
categories: ["papers"]
tags: ["llm", "rl", "self-improvement"]
summary: "When a model fails a task, it writes a self-reflection and tries again; if the retry succeeds, the reflection tokens are rewarded, which trains better self-reflection with only binary feedback."
sources: 
  - title: "Reflect, Retry, Reward: Self-Improving LLMs via Reinforcement Learning (arXiv:2505.24726)"
    url: "https://arxiv.org/abs/2505.24726"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:11.883Z"
  - title: "Hugging Face Daily Papers, 2025-06-04"
    url: "https://huggingface.co/papers?date=2025-06-04"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:43.536Z"
  - title: "Reflect, Retry, Reward: Self-Improving LLMs via Reinforcement Learning (arXiv HTML full text)"
    url: "https://arxiv.org/html/2505.24726"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:11.883Z"
highlights: ["Only the reflection is rewarded, not the answer, so the model learns to write reflections that actually help.", "The paper reports fine-tuned 1.5B–7B models outperforming same-family models ten times larger."]
papers: 
  - title: "Reflect, Retry, Reward: Self-Improving LLMs via Reinforcement Learning"
    authors: ["Shelly Bensal", "Umar Jamil", "Christopher Bryant", "Melisa Russak", "Kiran Kamble", "Dmytro Mozolevskyi", "Muayad Ali", "Waseem AlShikh"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2505.24726"
    pdf: "https://arxiv.org/pdf/2505.24726v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Self-improvement with only binary success/failure feedback"
  method: "Fail → self-reflect → retry with the reflection in context; reward reflection tokens when the retry succeeds (RL)"
  data: "Math equation writing and function calling tasks"
  result: "Up to +34.7% on math equation writing and +18.1% on function calling, per the abstract"
draft: false
date: "2025-06-04"
---

## Problem

Improving models on hard, verifiable tasks usually needs good training data, which may not exist. Sometimes all you have is a **binary** signal: did it succeed or not?

## Method

A two-stage loop:

1. When the model **fails** a task, it writes a **self-reflective commentary** analysing its previous attempt.
2. It gets **another attempt** with that reflection in context.
3. If the retry **succeeds**, the tokens of the **self-reflection** are rewarded with RL.

The model is optimised to write useful reflections rather than to memorise answers.

## Key results

From the abstract: substantial gains across model architectures, up to **34.7%** on math equation writing and **18.1%** on function calling. Smaller fine-tuned models (**1.5B–7B**) outperform models in the same family that are **10× larger**.

## Limitations

From the paper:

- a binary success/fail validator isn't easy to define for every task
- the method doesn't work for every model and task: the model needs basic ability to do the task, reflect and learn (e.g. Llama3.2-3B Instruct couldn't learn to self-correct on function calling)
