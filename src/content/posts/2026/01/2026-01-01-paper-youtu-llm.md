---
title: "Paper summary: Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models"
categories: ["papers"]
tags: ["llm", "small-models", "agents"]
summary: "Youtu-LLM is a 1.96B model pre-trained from scratch (not distilled) with a commonsense → STEM → agent curriculum over about 11T tokens and agentic mid-training, reported as state of the art below 2B parameters."
sources: 
  - title: "Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models (arXiv:2512.24618)"
    url: "https://arxiv.org/abs/2512.24618"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:22.184Z"
  - title: "Hugging Face Daily Papers, 2026-01-01"
    url: "https://huggingface.co/papers?date=2026-01-01"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:16.352Z"
  - title: "Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2512.24618"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:22.184Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/TencentCloudADP/youtu-tip"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:50:22.184Z"
highlights: ["The data distribution shifts during pre-training from general commonsense to STEM to agentic tasks.", "A dedicated agentic mid-training stage uses synthesised maths, coding and tool-use trajectories."]
papers: 
  - title: "Youtu-LLM: Unlocking the Native Agentic Potential for Lightweight Large Language Models"
    authors: ["Junru Lu", "Jiarui Qin", "Lingfeng Qiao", "Yinghui Li", "Xinyi Dai", "Bo Ke", "Jianfeng He", "Ruizhi Qiao", "Di Yin", "Xing Sun", "Yunsheng Wu", "Yinsong Liu", "Shuangyin Liu", "Mingkong Tang", "Haodong Lin", "Jiayi Kuang", "Fanxu Meng", "Xiaojuan Tang", "Yunjia Xi", "Junjie Huang", "Haotong Yang", "Zhenyi Shen", "Yangning Li", "Qianwen Zhang", "Yifei Yu", "Siyu An", "Junnan Dong", "Qiufeng Wang", "Jie Wang", "Keyu Chen", "Wei Wen", "Taian Guo", "Zhifeng Shen", "Daohai Yu", "Jiahao Li", "Ke Li", "Zongyi Li", "Xiaoyu Tan"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2512.24618"
    pdf: "https://arxiv.org/pdf/2512.24618v2"
    code: "https://github.com/TencentCloudADP/youtu-tip"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Lightweight LLM with native agentic ability"
  method: "1.96B dense MLA architecture, 128k context, STEM-oriented vocabulary; ~11T-token commonsense-STEM-agent curriculum; agentic mid-training"
  data: "~11T tokens plus synthesised agent trajectories"
  result: "New SOTA for sub-2B LLMs; significantly surpasses baselines on agent tasks, per the abstract"
draft: false
date: "2026-01-01"
---

## Problem

Small models usually get their abilities by **distillation** from larger ones. Can a small model learn reasoning and planning **natively** in pre-training?

## Method

**Youtu-LLM (1.96B)** is pre-trained from scratch with:

1. a compact dense **Multi-Latent Attention** architecture with a **STEM-oriented vocabulary** and a **128k** context window
2. a **"Commonsense–STEM–Agent" curriculum** over about **11T tokens**, shifting the data from general commonsense to complex STEM and then agentic tasks
3. **agentic mid-training** on synthesised trajectories across maths, coding and tool use, to build planning and reflection behaviours

## Key results

From the abstract: a **new state of the art for sub-2B LLMs**, competitive with larger models on general benchmarks, and significantly above existing baselines on **agent-specific** tasks.

## Limitations

There's no dedicated limitations section in the extracted text. Comparisons are the developers' own.
