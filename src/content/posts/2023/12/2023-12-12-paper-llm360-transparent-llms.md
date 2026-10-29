---
title: "Paper summary: LLM360: Towards Fully Transparent Open-Source LLMs"
categories: ["papers"]
tags: ["llm", "open-source", "reproducibility"]
summary: "LLM360 argues for releasing everything behind an LLM (data, code, intermediate checkpoints, analyses) and starts with two fully open 7B models, Amber and CrystalCoder."
sources: 
  - title: "LLM360: Towards Fully Transparent Open-Source LLMs (arXiv:2312.06550)"
    url: "https://arxiv.org/abs/2312.06550"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:11.173Z"
  - title: "Hugging Face Daily Papers, 2023-12-12"
    url: "https://huggingface.co/papers?date=2023-12-12"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:14.687Z"
  - title: "LLM360: Towards Fully Transparent Open-Source LLMs (arXiv HTML full text)"
    url: "https://arxiv.org/html/2312.06550"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:11.173Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/llm360/analysis360"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:39:11.173Z"
highlights: ["\"Open weights\" isn't the same as open training: LLM360 releases the data, the code and the intermediate checkpoints.", "Intermediate checkpoints let others study how capabilities appear during training."]
papers: 
  - title: "LLM360: Towards Fully Transparent Open-Source LLMs"
    authors: ["Zhengzhong Liu", "Aurick Qiao", "Willie Neiswanger", "Hongyi Wang", "Bowen Tan", "Tianhua Tao", "Junbo Li", "Yuqi Wang", "Suqi Sun", "Omkar Pangarkar", "Richard Fan", "Yi Gu", "Victor Miller", "Yonghao Zhuang", "Guowei He", "Haonan Li", "Fajri Koto", "Liping Tang", "Nikhil Ranjan", "Zhiqiang Shen", "Xuguang Ren", "Roberto Iriondo", "Cun Mu", "Zhiting Hu", "Mark Schulze", "Preslav Nakov", "Tim Baldwin", "Eric P. Xing"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2312.06550"
    pdf: "https://arxiv.org/pdf/2312.06550v1"
    code: "https://github.com/llm360/analysis360"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Transparent, reproducible LLM training"
  method: "Release training code, data and data sequence, configs, intermediate checkpoints, optimizer states and analyses"
  data: "Two 7B models pre-trained from scratch: Amber (general English) and CrystalCoder (code)"
  result: "Fully open release of both models and their training artifacts"
draft: false
date: "2023-12-12"
---

## Problem

Many "open" LLMs release only final weights and inference code, and technical reports increasingly stay at a high level. Others then have to rediscover training details, and the field loses insight into *how* models learn.

## Method

**LLM360** is an initiative to release the **entire training process**: pre-training code, configurations and hyperparameters, **intermediate checkpoints**, optimizer states, the exact **data sequence** and the data-processing code, plus analyses.

## Key results

As a first step, the authors release two 7B models pre-trained from scratch:

- **Amber**: a general-purpose English LLM
- **CrystalCoder**: pre-trained specifically for code generation

Everything is published through the LLM360 site, with larger models announced as in progress.

## Limitations

The paper is an announcement and a framework rather than a benchmark win. The two first models are 7B, and their quality isn't the main claim. The value is in the openness of the artifacts.
