---
title: "Paper summary: QeRL: Beyond Efficiency -- Quantization-enhanced Reinforcement Learning for LLMs"
categories: ["papers"]
tags: ["llm", "rl", "quantisation", "efficiency"]
summary: "QeRL combines NVFP4 quantisation with LoRA for RL training of LLMs; beyond saving memory and speeding up rollouts, quantisation noise raises policy entropy and helps exploration. It enables RL on a 32B model with one H100."
sources: 
  - title: "QeRL: Beyond Efficiency -- Quantization-enhanced Reinforcement Learning for LLMs (arXiv:2510.11696)"
    url: "https://arxiv.org/abs/2510.11696"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:10.145Z"
  - title: "Hugging Face Daily Papers, 2025-10-14"
    url: "https://huggingface.co/papers?date=2025-10-14"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:28.625Z"
  - title: "QeRL: Beyond Efficiency -- Quantization-enhanced Reinforcement Learning for LLMs (arXiv HTML full text)"
    url: "https://arxiv.org/html/2510.11696"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:10.145Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/NVlabs/QeRL"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:49:10.145Z"
highlights: ["The noise that quantisation adds turned out to help RL, by raising entropy and encouraging exploration.", "The paper reports the first RL training of a 32B LLM on a single H100 80GB GPU."]
papers: 
  - title: "QeRL: Beyond Efficiency -- Quantization-enhanced Reinforcement Learning for LLMs"
    authors: ["Wei Huang", "Yi Ge", "Shuai Yang", "Yicheng Xiao", "Huizi Mao", "Yujun Lin", "Hanrong Ye", "Sifei Liu", "Ka Chun Cheung", "Hongxu Yin", "Yao Lu", "Xiaojuan Qi", "Song Han", "Yukang Chen"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2510.11696"
    pdf: "https://arxiv.org/pdf/2510.11696v1"
    code: "https://github.com/NVlabs/QeRL"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2510.11696.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2510.11696\">Huang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Rollout speedup and accuracy of QeRL on Qwen2.5-7B-Instruct. QeRL achieves faster RL rollout and end-to-end training speeds (batch=8), while delivering performance superior to vanilla LoRA and QLoRA, also …"
images: 
  - src: "images/2025/paper-2510.11696.webp"
    alt: "Figure from the paper \"QeRL: Beyond Efficiency -- Quantization-enhanced Reinforcement Learning for LLMs\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2510.11696\">Huang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Rollout speedup and accuracy of QeRL on Qwen2.5-7B-Instruct. QeRL achieves faster RL rollout and end-to-end training speeds (batch=8), while delivering performance superior to vanilla LoRA and QLoRA, also …"
card: 
  task: "Efficient RL training for LLM reasoning"
  method: "NVFP4 quantisation + LoRA; Adaptive Quantization Noise (AQN)"
  data: "GSM8K, MATH 500, AIME 24/25, AMC 23; models 3B–32B"
  result: ">1.5× rollout speed-up; 32B RL on one H100; 7B matches full fine-tuning (GSM8K 90.8%, MATH 500 77.4%), per the abstract"
draft: false
date: "2025-10-14"
---

## Problem

RL is key to LLM reasoning, but it's expensive: lots of GPU memory and long rollout phases.

## Method

**QeRL** pairs **NVFP4** 4-bit quantisation with **LoRA** (my QLoRA study post covers the basic idea of 4-bit base weights plus adapters). The authors' further finding: **quantisation noise increases policy entropy**, which improves **exploration** during RL. **Adaptive Quantization Noise (AQN)** tunes that noise during training.

## Key results

From the abstract and Figure 1:

- over **1.5×** speed-up in the rollout phase
- the first framework to enable RL training of a **32B** LLM on a **single H100 80GB**
- faster reward growth and higher final accuracy than 16-bit LoRA and QLoRA
- for the **7B** model, matches full-parameter fine-tuning on **GSM8K (90.8%)** and **MATH 500 (77.4%)**

## Limitations

From the paper: experiments cover 3B to 32B, so whether it holds above **70B** is open. Because RL runs take tens to hundreds of hours, evaluation was limited to reasoning benchmarks.
