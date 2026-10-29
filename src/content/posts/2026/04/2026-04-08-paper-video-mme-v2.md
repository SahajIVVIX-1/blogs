---
title: "Paper summary: Video-MME-v2: Towards the Next Stage in Benchmarks for Comprehensive Video Understanding"
categories: ["papers"]
tags: ["video", "evaluation", "benchmark"]
summary: "Video-MME-v2 is a harder, human-built video understanding benchmark with a three-level hierarchy and group-based scoring that only credits consistent, well-reasoned answers; the best model, Gemini-3-Pro, still trails human experts substantially."
sources: 
  - title: "Video-MME-v2: Towards the Next Stage in Benchmarks for Comprehensive Video Understanding (arXiv:2604.05015)"
    url: "https://arxiv.org/abs/2604.05015"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:47.955Z"
  - title: "Hugging Face Daily Papers, 2026-04-08"
    url: "https://huggingface.co/papers?date=2026-04-08"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:15.133Z"
  - title: "Video-MME-v2: Towards the Next Stage in Benchmarks for Comprehensive Video Understanding (arXiv HTML full text)"
    url: "https://arxiv.org/html/2604.05015"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:47.955Z"
highlights: ["Group-based scoring penalises lucky guesses: related questions must all be answered consistently to earn credit.", "3,300 human-hours and up to five rounds of quality checks went into the data."]
papers: 
  - title: "Video-MME-v2: Towards the Next Stage in Benchmarks for Comprehensive Video Understanding"
    authors: ["Chaoyou Fu", "Haozhi Yuan", "Yuhao Dong", "Yi-Fan Zhang", "Yunhang Shen", "Xiaoxing Hu", "Xueying Li", "Jinsen Su", "Chengwu Long", "Xiaoyao Xie", "Yongkang Xie", "Xiawu Zheng", "Xue Yang", "Haoyu Cao", "Yunsheng Wu", "Ziwei Liu", "Xing Sun", "Caifeng Shan", "Ran He"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2604.05015"
    pdf: "https://arxiv.org/pdf/2604.05015v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Robust, faithful evaluation of video understanding"
  method: "Three-level hierarchy (information aggregation → temporal dynamics → multimodal reasoning); group-based non-linear scoring"
  data: "Human-annotated: 12 annotators, 50 reviewers, 3,300 human-hours, up to 5 QA rounds"
  result: "Large gap between Gemini-3-Pro and human experts, per the abstract"
draft: false
date: "2026-04-08"
---

## Problem

Video benchmarks are **saturating**: leaderboard scores look high while real abilities lag behind.

## Method

**Video-MME-v2** uses:

- a **progressive three-level hierarchy**: multi-point visual information aggregation, then temporal dynamics, then complex multimodal reasoning
- **group-based non-linear evaluation**: credit requires consistency across related questions and coherent multi-step reasoning, so fragmented or guessed correctness is penalised
- a controlled human annotation pipeline: **12 annotators**, **50 reviewers**, **3,300 human-hours**, up to **5** rounds of quality assurance

## Key results

From the abstract: a **substantial gap** between the best current model, **Gemini-3-Pro**, and human experts, with a clear hierarchy in difficulty across the levels.

## Limitations

There's no dedicated limitations section in the extracted text. Human-built benchmarks are expensive to extend.
