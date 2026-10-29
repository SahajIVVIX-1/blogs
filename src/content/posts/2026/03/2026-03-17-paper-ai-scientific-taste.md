---
title: "Paper summary: AI Can Learn Scientific Taste"
categories: ["papers"]
tags: ["llm", "science", "rl"]
summary: "Reinforcement Learning from Community Feedback trains a \"Scientific Judge\" on signals like citations, and a \"Scientific Thinker\" that proposes research ideas; the judge generalises to future years and unseen fields."
sources: 
  - title: "AI Can Learn Scientific Taste (arXiv:2603.14473)"
    url: "https://arxiv.org/abs/2603.14473"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:29.875Z"
  - title: "Hugging Face Daily Papers, 2026-03-17"
    url: "https://huggingface.co/papers?date=2026-03-17"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:01.832Z"
  - title: "AI Can Learn Scientific Taste (arXiv HTML full text)"
    url: "https://arxiv.org/html/2603.14473"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:29.875Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/tongjingqi/AI-Can-Learn-Scientific-Taste"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:51:29.875Z"
highlights: ["Community feedback, such as citations, is used as the reward for learning to judge and propose research ideas.", "The authors acknowledge citations are an imperfect signal; some influential work is cited late."]
papers: 
  - title: "AI Can Learn Scientific Taste"
    authors: ["Jingqi Tong", "Mingzhe Li", "Hangcheng Li", "Yongzhuo Yang", "Yurong Mou", "Weijie Ma", "Hongji Chen", "Xiaoran Liu", "Qinyuan Cheng", "Ming Zhang", "Qiguang Chen", "Weifeng Ge", "Qipeng Guo", "Tianlei Ying", "Tianxiang Sun", "Yining Zheng", "Zhiheng Xi", "Xinchi Chen", "Jun Zhao", "Ning Ding", "Xuanjing Huang", "Yu-Gang Jiang", "Xipeng Qiu"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2603.14473"
    pdf: "https://arxiv.org/pdf/2603.14473v3"
    code: "https://github.com/tongjingqi/AI-Can-Learn-Scientific-Taste"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Learning to judge and propose high-impact research ideas"
  method: "Reinforcement Learning from Community Feedback (RLCF): Scientific Judge (judgement) and Scientific Thinker (ideation)"
  data: "Papers with community signals such as citations"
  result: "Judge beats strong LLM baselines and generalises to future-year papers, other metrics and unseen fields; Thinker proposes higher-impact ideas, per the abstract"
draft: false
date: "2026-03-17"
---

## Problem

**Scientific taste** is the ability to judge and propose ideas with long-term impact. It's concentrated among experienced researchers in narrow fields. Can AI learn it?

## Method

**Reinforcement Learning from Community Feedback (RLCF)**:

- **Scientific Judge** learns from community feedback such as **citations**
- **Scientific Thinker** learns to propose research ideas with high potential impact

## Key results

From the abstract: the Judge beats strong LLM baselines, and its judgement **generalises** to future-year papers, other community metrics and unseen fields. The Thinker proposes ideas with higher potential impact than baselines.

## Limitations

From the paper:

- scientific taste may involve more than judgement and ideation, such as experimental feasibility and diversity of ideas
- **citations are an imperfect signal**: some important papers are cited late, and citation data carries biases that controlled evaluations can't fully remove
- the field categories are coarse
