---
title: "Paper summary: Enhancing the Reasoning Ability of Multimodal Large Language Models via Mixed Preference Optimization"
categories: ["papers"]
tags: ["multimodal", "reasoning", "alignment"]
summary: "Mixed Preference Optimization and the automatically built MMPR dataset improve chain-of-thought reasoning in multimodal LLMs (InternVL2-8B and 76B) beyond what supervised fine-tuning alone gives."
sources: 
  - title: "Enhancing the Reasoning Ability of Multimodal Large Language Models via Mixed Preference Optimization (arXiv:2411.10442)"
    url: "https://arxiv.org/abs/2411.10442"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:14.488Z"
  - title: "Hugging Face Daily Papers, 2024-11-22"
    url: "https://huggingface.co/papers?date=2024-11-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:45.418Z"
  - title: "Enhancing the Reasoning Ability of Multimodal Large Language Models via Mixed Preference Optimization (arXiv HTML full text)"
    url: "https://arxiv.org/html/2411.10442"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:14.488Z"
highlights: ["Pre-training plus SFT leaves a distribution shift that especially hurts multimodal chain-of-thought.", "Preference optimisation on automatically built reasoning preferences helps close that gap."]
papers: 
  - title: "Enhancing the Reasoning Ability of Multimodal Large Language Models via Mixed Preference Optimization"
    authors: ["Weiyun Wang", "Zhe Chen", "Wenhai Wang", "Yue Cao", "Yangzhou Liu", "Zhangwei Gao", "Jinguo Zhu", "Xizhou Zhu", "Lewei Lu", "Yu Qiao", "Jifeng Dai"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2411.10442"
    pdf: "https://arxiv.org/pdf/2411.10442v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Multimodal chain-of-thought reasoning"
  method: "Automated pipeline creating MMPR (multimodal reasoning preference data) + Mixed Preference Optimization (MPO)"
  data: "MMPR; InternVL2-8B and InternVL2-76B"
  result: "Improved multimodal reasoning for both models, per the abstract"
draft: false
date: "2024-11-22"
---

## Problem

Open multimodal LLMs are usually trained with pre-training plus supervised fine-tuning. The authors argue this leaves a **distribution shift** between training and inference that particularly limits **chain-of-thought** reasoning.

## Method

Two parts:

- **Data**: an automated pipeline builds **MMPR**, a large, high-quality **multimodal reasoning preference** dataset (preferred vs rejected reasoning).
- **Model**: **Mixed Preference Optimization (MPO)**, a simple method that integrates preference optimisation into MLLM training.

## Key results

The approach improves the multimodal reasoning of both **InternVL2-8B** and **InternVL2-76B**. From the abstract: **InternVL2-8B-MPO** scores **67.0 on MathVista**, 8.7 points above InternVL2-8B and comparable to the 10× larger InternVL2-76B. Code, data and model are released.

## Limitations

There's no dedicated limitations section in the extracted text. The preference data is built automatically, so its quality depends on that pipeline.
