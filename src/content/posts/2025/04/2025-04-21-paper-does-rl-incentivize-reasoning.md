---
title: "Paper summary: Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?"
categories: ["papers"]
tags: ["llm", "reasoning", "rl"]
summary: "Measuring pass@k at large k, this study finds RL with verifiable rewards makes models better at k = 1 but doesn't expand what the base model can solve at all; distillation, by contrast, can."
sources: 
  - title: "Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model? (arXiv:2504.13837)"
    url: "https://arxiv.org/abs/2504.13837"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:34.470Z"
  - title: "Hugging Face Daily Papers, 2025-04-21"
    url: "https://huggingface.co/papers?date=2025-04-21"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:16.688Z"
  - title: "Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model? (arXiv HTML full text)"
    url: "https://arxiv.org/html/2504.13837"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:34.470Z"
highlights: ["RL-trained models win at pass@1, but base models solve more problems when allowed many attempts (large k).", "The reasoning paths after RLVR were already present in the base model; RL mostly makes them more likely."]
papers: 
  - title: "Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?"
    authors: ["Yang Yue", "Zhiqi Chen", "Rui Lu", "Andrew Zhao", "Zhaokai Wang", "Yang Yue", "Shiji Song", "Gao Huang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2504.13837"
    pdf: "https://arxiv.org/pdf/2504.13837v5"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Testing whether RLVR creates new reasoning ability"
  method: "pass@k at large k across model families, RL algorithms, and maths/coding/visual benchmarks; coverage and perplexity analysis"
  data: "Maths, coding and visual reasoning benchmarks"
  result: "Base models achieve higher pass@k at large k; six RLVR algorithms perform similarly and remain far from the base-model bound, per the abstract"
draft: false
date: "2025-04-21"
---

## Problem

RL with verifiable rewards (RLVR), as in DeepSeek-R1 (Jan 2025 on this blog), clearly improves reasoning scores. A common belief is that it lets models discover **new** reasoning strategies beyond their base model. Is that true?

## Method

The authors probe the **boundary** of what models can solve, using **pass@k at large k**: with many attempts, can the model solve the problem at least once? They compare base and RLVR-trained models across model families, RL algorithms, and maths, coding and visual reasoning benchmarks, plus coverage and perplexity analyses.

## Key results

From the abstract:

- RLVR models beat their base models at **small k** (e.g. k = 1), but **base models reach higher pass@k at large k**
- the reasoning abilities seen after RLVR **originate from and are bounded by** the base model
- **six** popular RLVR algorithms perform similarly and remain far from fully using the base model's potential
- **distillation** from a stronger teacher, by contrast, can add genuinely new reasoning patterns

## Limitations

The paper frames its conclusions about *current* RLVR methods. The authors suggest the limitation may come from weak exploration in the vast language space, and point to continual scaling and multi-turn agent–environment interaction as directions.
