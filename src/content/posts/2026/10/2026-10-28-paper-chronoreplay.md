---
title: "Paper summary: ChronoReplay: One Answer Interface Is Not Enough for Streaming Spatial Intelligence"
categories: ["papers"]
tags: ["multimodal", "spatial-reasoning", "video"]
summary: "Training a spatial VLM on one kind of answer (e.g. left/right) doesn't teach related ones (e.g. distance), which the authors call \"interface lock-in\"; ChronoReplay replays mixed spatial supervision as time-ordered episodes and improves three streaming benchmarks together."
sources: 
  - title: "ChronoReplay: One Answer Interface Is Not Enough for Streaming Spatial Intelligence (arXiv:2610.34283)"
    url: "https://arxiv.org/abs/2610.34283"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:48.015Z"
  - title: "Hugging Face Daily Papers, 2026-10-28"
    url: "https://huggingface.co/papers?date=2026-10-28"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:37:18.160Z"
  - title: "ChronoReplay: One Answer Interface Is Not Enough for Streaming Spatial Intelligence (arXiv HTML full text)"
    url: "https://arxiv.org/html/2610.34283"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:48.015Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/yihaohu0118/ChronoReplay"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:54:48.015Z"
highlights: ["Supervision for \"which side?\" doesn't force a model to keep the metric distance behind the answer, and vice versa.", "Replaying heterogeneous supervision in chronological order, balanced across answer types, improved three benchmarks at once."]
papers: 
  - title: "ChronoReplay: One Answer Interface Is Not Enough for Streaming Spatial Intelligence"
    authors: ["Yihao Hu", "Yitong Lin", "Pan Wang", "Zhihao Wen", "Hang Wang", "Yiwen Zhao", "Deyuan Liu", "Yutong Li", "Mingda Wan", "Yuchen Mao", "Tao Lin"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2610.34283"
    pdf: "https://arxiv.org/pdf/2610.34283v1"
    code: "https://github.com/yihaohu0118/ChronoReplay"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Streaming spatial intelligence in VLMs"
  method: "ChronoReplay: chronologically ordered episodes of heterogeneous spatial supervision, source-native targets, family-balanced learning; adaptive frame selection at inference"
  data: "OVO-S-Bench, OST-Bench, UCS-Bench"
  result: "One checkpoint improves all three, incl. +13.41 points on OST-Bench, and the highest three-benchmark mean among compared settings, per the abstract"
draft: false
date: "2026-10-28"
---

## Problem

The authors observe **interface lock-in**. Training a spatial VLM to answer *which side* an object is on doesn't require keeping the *metric displacement* behind that answer, and distance supervision may leave categorical relations unconstrained. Gains concentrate on the trained answer format and transfer poorly to others.

## Method

**ChronoReplay** replays heterogeneous spatial supervision as **chronologically ordered episodes**, keeps each source's native targets, and **balances supervision across answer families**. At inference, **adaptive frame selection** changes which frames the model sees, without retraining.

## Key results

From the abstract:

- one checkpoint improves **OVO-S-Bench, OST-Bench and UCS-Bench** together, including **+13.41 points** on OST-Bench
- same-data controls separate the ingredients: family-balanced learning beats ordinary joint SFT, and chronological replay beats a shifted-order control by about **2.41** OST points across two paired seeds
- adaptive frame selection adds further gains at lower visual cost

## Limitations

There's no dedicated limitations section in the extracted text. Some ablations use only two paired seeds.
