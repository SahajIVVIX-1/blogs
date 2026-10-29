---
title: "Paper summary: Qwen2.5-Coder Technical Report"
categories: ["papers"]
tags: ["llm", "code"]
summary: "Qwen2.5-Coder is a family of six code models (0.5B to 32B) continued-pretrained on over 5.5 trillion tokens, reported to set state-of-the-art results on more than 10 code benchmarks for their sizes."
sources: 
  - title: "Qwen2.5-Coder Technical Report (arXiv:2409.12186)"
    url: "https://arxiv.org/abs/2409.12186"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:19.753Z"
  - title: "Hugging Face Daily Papers, 2024-09-19"
    url: "https://huggingface.co/papers?date=2024-09-19"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:06.516Z"
  - title: "Qwen2.5-Coder Technical Report (arXiv HTML full text)"
    url: "https://arxiv.org/html/2409.12186"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:19.753Z"
highlights: ["Data work is central: careful cleaning, scalable synthetic data and balanced mixing of code, maths and general text.", "The models aim to stay good at general and maths tasks while specialising in code."]
papers: 
  - title: "Qwen2.5-Coder Technical Report"
    authors: ["Binyuan Hui", "Jian Yang", "Zeyu Cui", "Jiaxi Yang", "Dayiheng Liu", "Lei Zhang", "Tianyu Liu", "Jiajun Zhang", "Bowen Yu", "Keming Lu", "Kai Dang", "Yang Fan", "Yichang Zhang", "An Yang", "Rui Men", "Fei Huang", "Bo Zheng", "Yibo Miao", "Shanghaoran Quan", "Yunlong Feng", "Xingzhang Ren", "Xuancheng Ren", "Jingren Zhou", "Junyang Lin"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2409.12186"
    pdf: "https://arxiv.org/pdf/2409.12186v3"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Open code LLMs"
  method: "Qwen2.5 architecture continued-pretrained on 5.5T+ tokens with data cleaning, synthetic data and balanced mixing; six sizes"
  data: "Code generation, completion, reasoning and repair benchmarks"
  result: "SOTA across more than 10 benchmarks, outperforming larger models, per the abstract"
draft: false
date: "2024-09-19"
---

## Problem

Code models need strong programming ability, but specialising often erodes general and maths skills. This report upgrades the earlier CodeQwen1.5.

## Method

**Qwen2.5-Coder** comes in **six sizes** (0.5B, 1.5B, 3B, 7B, 14B, 32B), built on the **Qwen2.5** architecture and **continued-pretrained on over 5.5 trillion tokens**. The emphasis is on the data pipeline:

- careful data cleaning
- scalable synthetic data generation
- balanced mixing of code, maths and general text, to keep non-code skills

## Key results

From the abstract: state-of-the-art performance across **more than 10 benchmarks** covering code generation, completion, reasoning and repair, consistently outperforming larger models. The models are released under a permissive licence.

## Limitations

There's no dedicated limitations section in the extracted text. As with other technical reports, the benchmark results are reported by the model's developers.
