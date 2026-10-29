---
title: "Paper summary: DataFlex: A Unified Framework for Data-Centric Dynamic Training of Large Language Models"
categories: ["papers"]
tags: ["llm", "training", "data"]
summary: "DataFlex unifies dynamic data selection, domain-mixture adjustment and sample reweighting in one framework built on LLaMA-Factory, so data-centric methods can be compared fairly and dropped into normal training."
sources: 
  - title: "DataFlex: A Unified Framework for Data-Centric Dynamic Training of Large Language Models (arXiv:2603.26164)"
    url: "https://arxiv.org/abs/2603.26164"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:42.036Z"
  - title: "Hugging Face Daily Papers, 2026-04-03"
    url: "https://huggingface.co/papers?date=2026-04-03"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:12.168Z"
highlights: ["Data-centric methods often live in separate codebases with different interfaces; DataFlex puts them behind one trainer.", "Dynamic data selection consistently beat static full-data training on MMLU for Mistral-7B and Llama-3.2-3B."]
papers: 
  - title: "DataFlex: A Unified Framework for Data-Centric Dynamic Training of Large Language Models"
    authors: ["Hao Liang", "Zhengyang Zhao", "Mingrui Chen", "Meiyi Qiang", "Lu Ma", "Rongyi Yu", "Hengyi Feng", "Shixuan Sun", "Zimo Meng", "Xiaochen Ma", "Xuanlin Yang", "Qifeng Cai", "Ruichuan An", "Bohan Zeng", "Zhen Hao Wong", "Chengyu Shen", "Runming He", "Zhaoyang Han", "Yaowei Zheng", "Fangcheng Fu", "Conghui He", "Bin Cui", "Zhiyu Li", "Weinan E", "Wentao Zhang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2603.26164"
    pdf: "https://arxiv.org/pdf/2603.26164v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Unified, reproducible data-centric LLM training"
  method: "Framework on LLaMA-Factory with trainer abstractions for sample selection, domain mixture and reweighting; DeepSpeed ZeRO-3 support"
  data: "Mistral-7B and Llama-3.2-3B (MMLU); Qwen2.5-1.5B on SlimPajama at 6B and 30B tokens"
  result: "Dynamic selection beats static full-data training on MMLU; DoReMi and ODM improve MMLU and perplexity over default mixtures, per the abstract"
draft: false
date: "2026-04-03"
---

## Problem

Data selection, mixture optimisation and reweighting methods are developed in isolated codebases with inconsistent interfaces, which hinders reproducibility and fair comparison.

## Method

**DataFlex**, from the same group as DataFlow (Dec 2025 on this blog), is built on **LLaMA-Factory** (Mar 2024). It supports three paradigms:

- **sample selection**
- **domain mixture adjustment**
- **sample reweighting**

It stays compatible with the normal training workflow as a drop-in replacement, and unifies shared operations (embeddings, inference, gradients), with support for DeepSpeed ZeRO-3.

## Key results

From the abstract:

- dynamic data selection consistently beats static full-data training on **MMLU** for **Mistral-7B** and **Llama-3.2-3B**
- for mixtures, **DoReMi** and **ODM** improve MMLU accuracy and perplexity over default proportions when pre-training **Qwen2.5-1.5B** on SlimPajama at 6B and 30B tokens

## Limitations

There's no dedicated limitations section in the extracted text. It's a framework, so its value grows with the number of methods it integrates.
