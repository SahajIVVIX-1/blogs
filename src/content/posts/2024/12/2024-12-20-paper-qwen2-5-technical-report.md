---
title: "Paper summary: Qwen2.5 Technical Report"
categories: ["papers"]
tags: ["llm", "open-weights"]
summary: "Qwen2.5 scales pre-training data from 7 to 18 trillion tokens and uses over a million SFT samples plus multistage RL, across a wide range of open-weight sizes."
sources: 
  - title: "Qwen2.5 Technical Report (arXiv:2412.15115)"
    url: "https://arxiv.org/abs/2412.15115"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:39.150Z"
  - title: "Hugging Face Daily Papers, 2024-12-20"
    url: "https://huggingface.co/papers?date=2024-12-20"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:02.475Z"
  - title: "Qwen2.5 Technical Report (arXiv HTML full text)"
    url: "https://arxiv.org/html/2412.15115"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:39.150Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/QwenLM/Qwen2.5"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:44:39.150Z"
highlights: ["Pre-training data grew from 7T to 18T tokens.", "Post-training combines more than 1 million SFT samples with multistage reinforcement learning."]
papers: 
  - title: "Qwen2.5 Technical Report"
    authors: ["Qwen", ":", "An Yang", "Baosong Yang", "Beichen Zhang", "Binyuan Hui", "Bo Zheng", "Bowen Yu", "Chengyuan Li", "Dayiheng Liu", "Fei Huang", "Haoran Wei", "Huan Lin", "Jian Yang", "Jianhong Tu", "Jianwei Zhang", "Jianxin Yang", "Jiaxi Yang", "Jingren Zhou", "Junyang Lin", "Kai Dang", "Keming Lu", "Keqin Bao", "Kexin Yang", "Le Yu", "Mei Li", "Mingfeng Xue", "Pei Zhang", "Qin Zhu", "Rui Men", "Runji Lin", "Tianhao Li", "Tianyi Tang", "Tingyu Xia", "Xingzhang Ren", "Xuancheng Ren", "Yang Fan", "Yang Su", "Yichang Zhang", "Yu Wan", "Yuqiong Liu", "Zeyu Cui", "Zhenru Zhang", "Zihan Qiu"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2412.15115"
    pdf: "https://arxiv.org/pdf/2412.15115v2"
    code: "https://github.com/QwenLM/Qwen2.5"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "General-purpose open-weight LLM series"
  method: "Pre-training on 18T tokens; SFT with 1M+ samples; multistage RL"
  data: "High-quality pre-training data (18T tokens)"
  result: "Improved knowledge, reasoning, long text generation, structured data and instruction following, per the abstract"
draft: false
date: "2024-12-20"
---

## Problem

Qwen2 (summarised here in July 2024) was strong among open models. Qwen2.5 aims to improve both pre-training and post-training.

## Method

- **Pre-training**: high-quality pre-training data scaled from **7 trillion to 18 trillion tokens**, for common sense, expert knowledge and reasoning.
- **Post-training**: supervised fine-tuning with **over 1 million samples**, plus **multistage reinforcement learning**. This improves human preference alignment, long text generation, structured-data analysis and instruction following.
- A range of sizes, with open-weight base and instruction-tuned models, plus quantised versions.

## Key results

From the abstract: top-tier performance across benchmarks for language understanding, reasoning, maths, coding and preference alignment. The open-weight flagship **Qwen2.5-72B-Instruct** is competitive with **Llama-3-405B-Instruct**, which is about 5× larger. Two hosted MoE variants (Qwen2.5-Turbo and Qwen2.5-Plus) are proprietary.

## Limitations

There's no dedicated limitations section in the extracted text. Results are reported by the developers.
