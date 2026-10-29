---
title: "Paper summary: GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization"
categories: ["papers"]
tags: ["llm", "rl", "alignment"]
summary: "With several rewards (correctness, format, length…), GRPO's group normalisation can collapse different reward combinations into identical advantages; GDPO normalises each reward separately and trains more stably."
sources: 
  - title: "GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization (arXiv:2601.05242)"
    url: "https://arxiv.org/abs/2601.05242"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:27.279Z"
  - title: "Hugging Face Daily Papers, 2026-01-09"
    url: "https://huggingface.co/papers?date=2026-01-09"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:21.191Z"
  - title: "GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization (arXiv HTML full text)"
    url: "https://arxiv.org/html/2601.05242"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:27.279Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/NVlabs/GDPO"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:50:27.279Z"
highlights: ["Normalising the summed reward can give the same advantage to quite different outcomes, which blurs the training signal.", "Decoupling the normalisation of each reward keeps their relative differences."]
papers: 
  - title: "GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization"
    authors: ["Shih-Yang Liu", "Xin Dong", "Ximing Lu", "Shizhe Diao", "Peter Belcak", "Mingjie Liu", "Min-Hung Chen", "Hongxu Yin", "Yu-Chiang Frank Wang", "Kwang-Ting Cheng", "Yejin Choi", "Jan Kautz", "Pavlo Molchanov"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2601.05242"
    pdf: "https://arxiv.org/pdf/2601.05242v1"
    code: "https://github.com/NVlabs/GDPO"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2601.05242.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2601.05242\">Liu et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. (a) An overview of our proposed GDPO"
images: 
  - src: "images/2026/paper-2601.05242.webp"
    alt: "Figure from the paper \"GDPO: Group reward-Decoupled Normalization Policy Optimization for Multi-reward RL Optimization\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2601.05242\">Liu et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. (a) An overview of our proposed GDPO"
card: 
  task: "Reinforcement learning with multiple rewards"
  method: "Group reward-Decoupled Normalization Policy Optimization: normalise each reward separately before combining"
  data: "Tool calling, maths reasoning, coding reasoning"
  result: "Consistently outperforms GRPO on correctness and constraint-adherence metrics, per the abstract"
draft: false
date: "2026-01-09"
---

## Problem

RL pipelines now use **multiple rewards**: correctness, format, length, and other preferences. Most simply apply **GRPO** to the combined reward. The authors show that normalising combined rewards this way can make different reward combinations **collapse into identical advantage values**. That reduces the signal's resolution, causes suboptimal convergence, and sometimes leads to early training failure.

## Method

**GDPO** (Group reward-Decoupled Normalization Policy Optimization) **normalises each reward separately** before combining them, which keeps their relative differences and makes multi-reward optimisation more accurate and more stable.

## Key results

From the abstract: across **tool calling**, **maths reasoning** and **coding reasoning**, measured by correctness (accuracy, bug ratio) and constraint adherence (format, length), GDPO **consistently outperforms GRPO**.

## Limitations

There's no dedicated limitations section in the extracted text. Experiments cover three task families.
