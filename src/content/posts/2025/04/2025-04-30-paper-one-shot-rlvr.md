---
title: "Paper summary: Reinforcement Learning for Reasoning in Large Language Models with One Training Example"
categories: ["papers"]
tags: ["llm", "reasoning", "rl"]
summary: "RL with verifiable rewards on a single maths training example lifts Qwen2.5-Math-1.5B on MATH500 from 36.0% to 73.6%, matching training on a 1.2k-example dataset."
sources: 
  - title: "Reinforcement Learning for Reasoning in Large Language Models with One Training Example (arXiv:2504.20571)"
    url: "https://arxiv.org/abs/2504.20571"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:40.661Z"
  - title: "Hugging Face Daily Papers, 2025-04-30"
    url: "https://huggingface.co/papers?date=2025-04-30"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:22.171Z"
  - title: "Reinforcement Learning for Reasoning in Large Language Models with One Training Example (arXiv HTML full text)"
    url: "https://arxiv.org/html/2504.20571"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:40.661Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/ypwang61/One-Shot-RLVR"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:46:40.661Z"
highlights: ["One carefully chosen training example produced most of the gain of a 1,200-example RL dataset.", "The authors separate the real gain from mere output-format correction."]
papers: 
  - title: "Reinforcement Learning for Reasoning in Large Language Models with One Training Example"
    authors: ["Yiping Wang", "Qing Yang", "Zhiyuan Zeng", "Liliang Ren", "Liyuan Liu", "Baolin Peng", "Hao Cheng", "Xuehai He", "Kuan Wang", "Jianfeng Gao", "Weizhu Chen", "Shuohang Wang", "Simon Shaolei Du", "Yelong Shen"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2504.20571"
    pdf: "https://arxiv.org/pdf/2504.20571v3"
    code: "https://github.com/ypwang61/One-Shot-RLVR"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Data efficiency of RL for maths reasoning"
  method: "RLVR with one (or two) training examples"
  data: "Qwen2.5-Math-1.5B and other models; MATH500 and five other maths benchmarks"
  result: "MATH500 36.0% → 73.6% with one example (8.6% beyond format correction), matching the 1.2k DeepScaleR subset, per the abstract"
draft: false
date: "2025-04-30"
---

## Problem

How much data does RL with verifiable rewards actually need to improve maths reasoning?

## Method

Apply **RLVR** to a base model with just **one training example** ("1-shot RLVR"), and compare with the same training on a larger dataset that contains that example.

## Key results

From the abstract, on **Qwen2.5-Math-1.5B**:

- **MATH500: 36.0% → 73.6%** with one example, of which 8.6 points go beyond format correction
- average across six maths benchmarks: **17.6% → 35.7%** (7.0 points non-format gain)
- this **matches** training on the 1.2k-example DeepScaleR subset (73.6%, 35.9%)
- **two** examples slightly exceed it (74.8%, 36.6%)
- similar gains appear for Qwen2.5-Math-7B, Llama3.2-3B-Instruct and others

## Limitations

From the paper: larger models such as Qwen2.5-32B weren't tried because of compute limits, and only the maths domain was studied, not coding or other verifiable domains.
