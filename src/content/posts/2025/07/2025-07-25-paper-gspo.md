---
title: "Paper summary: Group Sequence Policy Optimization"
categories: ["papers"]
tags: ["llm", "rl", "alignment"]
summary: "Group Sequence Policy Optimization computes importance ratios and clipping at the level of whole sequences rather than tokens, and is reported to be more stable and efficient than GRPO, especially for MoE models."
sources: 
  - title: "Group Sequence Policy Optimization (arXiv:2507.18071)"
    url: "https://arxiv.org/abs/2507.18071"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:55.274Z"
  - title: "Hugging Face Daily Papers, 2025-07-25"
    url: "https://huggingface.co/papers?date=2025-07-25"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:39.474Z"
  - title: "Group Sequence Policy Optimization (arXiv HTML full text)"
    url: "https://arxiv.org/html/2507.18071"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:55.274Z"
highlights: ["GRPO weights each token separately; GSPO uses the likelihood of the whole sequence for the ratio, clipping and reward.", "The authors credit GSPO for the improvements in the latest Qwen3 models."]
papers: 
  - title: "Group Sequence Policy Optimization"
    authors: ["Chujie Zheng", "Shixuan Liu", "Mingze Li", "Xiong-Hui Chen", "Bowen Yu", "Chang Gao", "Kai Dang", "Yuqiong Liu", "Rui Men", "An Yang", "Jingren Zhou", "Junyang Lin"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2507.18071"
    pdf: "https://arxiv.org/pdf/2507.18071v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Stable, efficient RL for training LLMs"
  method: "Sequence-level importance ratio, clipping, rewarding and optimisation"
  data: "RL training of Qwen models, including MoE"
  result: "Better efficiency and performance than GRPO; stabilises MoE RL training, per the abstract"
draft: false
date: "2025-07-25"
---

## Problem

RL algorithms for LLMs, like **GRPO** (introduced in the DeepSeekMath paper, summarised here in Feb 2024), compute **importance ratios per token**. The authors argue this can make training unstable, especially for **Mixture-of-Experts** models.

## Method

**GSPO** defines the importance ratio from the **sequence likelihood**, and does **clipping, rewarding and optimisation at the sequence level**. The unit of reward (a whole response) now matches the unit of optimisation.

## Key results

From the abstract: GSPO has better training efficiency and performance than GRPO, notably **stabilises MoE RL training**, and may simplify RL infrastructure. The authors credit it for the improvements in the latest **Qwen3** models.

## Limitations

There's no dedicated limitations section in the extracted text. The evidence comes from the authors' own Qwen training runs.
