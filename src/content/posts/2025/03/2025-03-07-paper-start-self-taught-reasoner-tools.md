---
title: "Paper summary: START: Self-taught Reasoner with Tools"
categories: ["papers"]
tags: ["llm", "reasoning", "tools", "agents"]
summary: "START teaches a long chain-of-thought reasoning model to call a Python interpreter mid-reasoning, using inserted hints (\"Wait, maybe using Python here is a good idea\") and rejection-sampling fine-tuning."
sources: 
  - title: "START: Self-taught Reasoner with Tools (arXiv:2503.04625)"
    url: "https://arxiv.org/abs/2503.04625"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:47.581Z"
  - title: "Hugging Face Daily Papers, 2025-03-07"
    url: "https://huggingface.co/papers?date=2025-03-07"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:49.143Z"
  - title: "START: Self-taught Reasoner with Tools (arXiv HTML full text)"
    url: "https://arxiv.org/html/2503.04625"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:47.581Z"
highlights: ["A simple inserted hint is enough to get a reasoning model to start using code execution, with no demonstration data.", "The tool lets the model compute, self-check and debug instead of relying only on its internal reasoning."]
papers: 
  - title: "START: Self-taught Reasoner with Tools"
    authors: ["Chengpeng Li", "Mingfeng Xue", "Zhenru Zhang", "Jiaxi Yang", "Beichen Zhang", "Xiang Wang", "Bowen Yu", "Binyuan Hui", "Junyang Lin", "Dayiheng Liu"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2503.04625"
    pdf: "https://arxiv.org/pdf/2503.04625v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Tool-integrated long chain-of-thought reasoning"
  method: "Hint-infer (inserted hints prompt tool use) + Hint-RFT (score, filter and modify tool-using trajectories, then fine-tune); applied to QwQ-32B"
  data: "GPQA, AMC23, AIME24, AIME25, LiveCodeBench"
  result: "63.6% GPQA, 95.0% AMC23, 66.7% AIME24, 47.1% AIME25, 47.3% LiveCodeBench, per the abstract"
draft: false
date: "2025-03-07"
---

## Problem

Large reasoning models (like o1 and DeepSeek-R1) think in long chains of thought, but only internally. That leads to hallucinated calculations and inefficiency.

## Method

**START** adds a **Python interpreter** to long chain-of-thought reasoning, learned through self-training:

1. **Hint-infer**: insert hand-designed hints into the model's reasoning at inference time, such as *"Wait, maybe using Python here is a good idea."* This alone triggers tool use, with no demonstrations, and also works as a simple test-time scaling method.
2. **Hint-RFT**: generate tool-using trajectories with Hint-infer, then score, filter and modify them, and fine-tune the model on the result (rejection-sampling fine-tuning).

They apply this to **QwQ-32B**.

## Key results

From the abstract: **63.6%** on GPQA, **95.0%** on AMC23, **66.7%** on AIME24, **47.1%** on AIME25 and **47.3%** on LiveCodeBench. That's significantly above base QwQ-32B and comparable to R1-Distill-Qwen-32B and o1-Preview.

## Limitations

From the paper:

- the Python interpreter is the **only tool**; search engines or other tools are left for future work
- the manually designed hints may disrupt the model's natural flow of thought
