---
title: "Paper summary: YuLan-Mini: An Open Data-efficient Language Model"
categories: ["papers"]
tags: ["llm", "small-models", "pre-training"]
summary: "YuLan-Mini is a 2.42B-parameter base model trained on 1.08T tokens that the authors report matches models trained on much more data, with full details of the data and training released."
sources: 
  - title: "YuLan-Mini: An Open Data-efficient Language Model (arXiv:2412.17743)"
    url: "https://arxiv.org/abs/2412.17743"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:45.716Z"
  - title: "Hugging Face Daily Papers, 2024-12-27"
    url: "https://huggingface.co/papers?date=2024-12-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:06.700Z"
  - title: "YuLan-Mini: An Open Data-efficient Language Model (arXiv HTML full text)"
    url: "https://arxiv.org/html/2412.17743"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:45.716Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/ruc-gsai/yulan-mini"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:44:45.716Z"
highlights: ["Three levers: a data pipeline with cleaning and scheduling, an optimisation recipe against instability, and annealing with targeted data and long-context training.", "1.08T training tokens is far fewer than many comparable models use."]
papers: 
  - title: "YuLan-Mini: An Open Data-efficient Language Model"
    authors: ["Yiwen Hu", "Huatong Song", "Jia Deng", "Jiapeng Wang", "Jie Chen", "Kun Zhou", "Yutao Zhu", "Jinhao Jiang", "Zican Dong", "Wayne Xin Zhao", "Ji-Rong Wen"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2412.17743"
    pdf: "https://arxiv.org/pdf/2412.17743v2"
    code: "https://github.com/ruc-gsai/yulan-mini"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Data-efficient pre-training of a small LLM"
  method: "Data cleaning + data scheduling; robust optimisation against training instability; annealing with targeted data selection and long-context training"
  data: "1.08T tokens, composition released"
  result: "Top-tier among similar-size models, comparable to models trained on far more data, per the abstract"
draft: false
date: "2024-12-27"
---

## Problem

Pre-training LLMs is expensive and the full process is complex, which limits who can do it, especially academic groups.

## Method

**YuLan-Mini** (**2.42B** parameters) focuses on **training efficacy**, with three contributions:

1. an elaborate **data pipeline** that combines cleaning with **data-schedule** strategies
2. a robust **optimisation** method to reduce **training instability**
3. an **annealing** phase with targeted data selection and **long-context** training

## Key results

From the abstract: top-tier performance among models of similar size, and, trained on **1.08T tokens**, performance comparable to industry models that use significantly more data. Full details of the data composition for each training phase are released to support reproduction.

## Limitations

There's no dedicated limitations section in the extracted text. It's a base model of modest size, so it isn't comparable with large frontier models.
