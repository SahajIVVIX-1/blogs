---
title: "Paper summary: Scaling Latent Reasoning via Looped Language Models"
categories: ["papers"]
tags: ["llm", "reasoning", "pre-training"]
summary: "Ouro builds latent reasoning into pre-training with looped language models (iterating in latent space with a learned depth), and its 1.4B and 2.6B models are reported to match up to 12B models."
sources: 
  - title: "Scaling Latent Reasoning via Looped Language Models (arXiv:2510.25741)"
    url: "https://arxiv.org/abs/2510.25741"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:22.426Z"
  - title: "Hugging Face Daily Papers, 2025-10-30"
    url: "https://huggingface.co/papers?date=2025-10-30"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:38.326Z"
highlights: ["Instead of reasoning only through generated chain-of-thought text, the model loops its layers in latent space, and this is trained from pre-training onward.", "The authors attribute the gains to better knowledge manipulation, not more stored knowledge."]
papers: 
  - title: "Scaling Latent Reasoning via Looped Language Models"
    authors: ["Rui-Jie Zhu", "Zixuan Wang", "Kai Hua", "Tianyu Zhang", "Ziniu Li", "Haoran Que", "Boyi Wei", "Zixin Wen", "Fan Yin", "He Xing", "Lu Li", "Jiajun Shi", "Kaijing Ma", "Shanda Li", "Taylor Kergan", "Andrew Smith", "Xingwei Qu", "Mude Hui", "Bohong Wu", "Qiyang Min", "Hongzhi Huang", "Xun Zhou", "Wei Ye", "Jiaheng Liu", "Jian Yang", "Yunfeng Shi", "Chenghua Lin", "Enduo Zhao", "Tianle Cai", "Ge Zhang", "Wenhao Huang", "Yoshua Bengio", "Jason Eshraghian"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2510.25741"
    pdf: "https://arxiv.org/pdf/2510.25741v6"
    license: "http://creativecommons.org/licenses/by-sa/4.0/"
card: 
  task: "Building reasoning into pre-training"
  method: "Looped LMs: iterative latent computation, entropy-regularised learned depth allocation, 7.7T tokens"
  data: "Wide range of benchmarks"
  result: "Ouro 1.4B and 2.6B match up to 12B SOTA LLMs, per the abstract"
draft: false
date: "2025-10-30"
---

## Problem

Modern LLMs "think" mainly by generating chain-of-thought text, which pushes reasoning into post-training and, the authors argue, under-uses pre-training data.

## Method

**Ouro** (named after the Ouroboros) is a family of **Looped Language Models (LoopLM)**, a close relative of the recurrent-depth idea summarised here in February:

1. **iterative computation in latent space**: the same layers are applied repeatedly
2. an **entropy-regularised objective** that learns how much depth to use
3. scaling pre-training to **7.7T tokens**

## Key results

From the abstract:

- **Ouro 1.4B and 2.6B** match the results of up to **12B** state-of-the-art LLMs across many benchmarks
- controlled experiments suggest the advantage comes from better **knowledge manipulation**, not greater knowledge capacity
- the looped reasoning traces are **more aligned with final outputs** than explicit chain-of-thought

## Limitations

There's no dedicated limitations section in the extracted text. Looping adds compute per token at inference, which the paper trades for fewer parameters.
