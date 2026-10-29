---
title: "Paper summary: MinT: Managed Infrastructure for Training and Serving Millions of LLMs"
categories: ["papers"]
tags: ["llm", "lora", "infrastructure"]
summary: "MinT is infrastructure for training and serving many LoRA policies on a few shared base-model deployments, moving only adapters through rollout, update, evaluation and serving, scaled past 1T-parameter bases and toward million-adapter catalogues."
sources: 
  - title: "MinT: Managed Infrastructure for Training and Serving Millions of LLMs (arXiv:2605.13779)"
    url: "https://arxiv.org/abs/2605.13779"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:19.221Z"
  - title: "Hugging Face Daily Papers, 2026-05-14"
    url: "https://huggingface.co/papers?date=2026-05-14"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:37.004Z"
  - title: "MinT: Managed Infrastructure for Training and Serving Millions of LLMs (arXiv HTML full text)"
    url: "https://arxiv.org/html/2605.13779"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:19.221Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/MindLab-Research/mindlab-toolkit"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:52:19.221Z"
highlights: ["Instead of saving a merged full checkpoint per policy, the base model stays loaded and only small LoRA adapters move around.", "Rank-1 adapters can be under 1% of the base model's size."]
papers: 
  - title: "MinT: Managed Infrastructure for Training and Serving Millions of LLMs"
    authors: ["Mind Lab", ":", "Song Cao", "Vic Cao", "Andrew Chen", "Kaijie Chen", "Cleon Cheng", "Steven Chiang", "Kaixuan Fan", "Hera Feng", "Huan Feng", "Arthur Fu", "Jun Gao", "Hongquan Gu", "Aaron Guan", "Nolan Ho", "Mutian Hong", "Hailee Hou", "Peixuan Hua", "Charles Huang", "Miles Jiang", "Nora Jiang", "Yuyi Jiang", "Qiuyu Jin", "Fancy Kong", "Andrew Lei", "Kyrie Lei", "Alexy Li", "Lucian Li", "Ray Li", "Theo Li", "Zhihui Li", "Jiayi Lin", "Kairus Liu", "Kieran Liu", "Logan Liu", "Xiang Liu", "Irvine Lu", "Maeve Luo", "Runze Lv", "Pony Ma", "Verity Niu", "Anson Qiu", "Vincent Wang", "Rio Yang", "Maxwell Yao", "Carrie Ye", "Regis Ye", "Wenlin Ye", "Josh Ying", "Danney Zeng", "Yuhan Zhan", "Anya Zhang", "Di Zhang", "Ruijia Zhang", "Sueky Zhang", "Ya Zhang", "Wei Zhao", "Ada Zhou", "Changhai Zhou", "Yuhua Zhou", "Xinyue Zhu", "Murphy Zhuang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2605.13779"
    pdf: "https://arxiv.org/pdf/2605.13779v2"
    code: "https://github.com/MindLab-Research/mindlab-toolkit"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Managing very many LoRA-trained policies over shared base models"
  method: "Service that keeps the base resident and moves LoRA adapter revisions through rollout, update, export, evaluation, serving and rollback; Scale Up / Down / Out"
  data: "Dense and MoE models incl. MLA and DSA attention, beyond 1T parameters"
  result: "Adapter-only handoff speeds steps 18.3× (4B dense) and 2.85× (30B MoE); 10^6-scale addressable catalogues, per the abstract"
draft: false
date: "2026-05-14"
---

## Problem

A common pattern: many trained policies (personalised or task-specific models) on top of a few **expensive base-model deployments**. Storing and serving a full merged checkpoint per policy doesn't scale.

## Method

**MinT** (MindLab Toolkit) keeps the **base model resident** and moves **exported LoRA adapter revisions** through rollout, update, export, evaluation, serving and rollback, hiding the distributed systems work behind a service interface. It scales along three axes:

- **Scale Up**: LoRA RL on frontier-scale dense and MoE models (including MLA and DSA attention), validated beyond **1T** total parameters
- **Scale Down**: move only adapters, under **1%** of base size at rank 1
- **Scale Out**: separate which policies are addressable from which are loaded on GPUs, for very large catalogues

## Key results

From the abstract:

- adapter-only handoff cuts the measured step by **18.3×** (4B dense) and **2.85×** (30B MoE)
- concurrent multi-policy GRPO cuts wall time by **1.77×** and **1.45×** without raising peak memory
- **10^6-scale** addressable catalogues (single-engine sweeps measured to 100K) and thousand-adapter active waves
- packed MoE LoRA tensors speed live loading by **8.5–8.7×**

## Limitations

There's no dedicated limitations section in the extracted text. It's a systems paper, and quality depends on what LoRA can express for each policy.
