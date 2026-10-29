---
title: "Paper summary: Expanding Performance Boundaries of Open-Source Multimodal Models with Model, Data, and Test-Time Scaling"
categories: ["papers"]
tags: ["multimodal", "open-source", "scaling"]
summary: "InternVL 2.5 keeps InternVL 2.0's architecture but improves training, testing and data, and studies scaling of vision encoders, LLMs, data and test-time settings; it's reported to rival GPT-4o and Claude-3.5-Sonnet."
sources: 
  - title: "Expanding Performance Boundaries of Open-Source Multimodal Models with Model, Data, and Test-Time Scaling (arXiv:2412.05271)"
    url: "https://arxiv.org/abs/2412.05271"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:33.363Z"
  - title: "Hugging Face Daily Papers, 2024-12-09"
    url: "https://huggingface.co/papers?date=2024-12-09"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:55.834Z"
  - title: "Expanding Performance Boundaries of Open-Source Multimodal Models with Model, Data, and Test-Time Scaling (arXiv HTML full text)"
    url: "https://arxiv.org/html/2412.05271"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:33.363Z"
highlights: ["Same architecture, better recipe: the gains come from training strategy, test-time configuration and data quality.", "The paper reports it as the first open-source MLLM to pass 70% on the MMMU benchmark."]
papers: 
  - title: "Expanding Performance Boundaries of Open-Source Multimodal Models with Model, Data, and Test-Time Scaling"
    authors: ["Zhe Chen", "Weiyun Wang", "Yue Cao", "Yangzhou Liu", "Zhangwei Gao", "Erfei Cui", "Jinguo Zhu", "Shenglong Ye", "Hao Tian", "Zhaoyang Liu", "Lixin Gu", "Xuehui Wang", "Qingyun Li", "Yiming Ren", "Zixuan Chen", "Jiapeng Luo", "Jiahao Wang", "Tan Jiang", "Bo Wang", "Conghui He", "Botian Shi", "Xingcheng Zhang", "Han Lv", "Yi Wang", "Wenqi Shao", "Pei Chu", "Zhongying Tu", "Tong He", "Zhiyong Wu", "Huipeng Deng", "Jiaye Ge", "Kai Chen", "Kaipeng Zhang", "Limin Wang", "Min Dou", "Lewei Lu", "Xizhou Zhu", "Tong Lu", "Dahua Lin", "Yu Qiao", "Jifeng Dai", "Wenhai Wang"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2412.05271"
    pdf: "https://arxiv.org/pdf/2412.05271v5"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Open multimodal LLMs competitive with commercial ones"
  method: "InternVL 2.0 architecture with improved training/testing strategies and data quality; systematic scaling study"
  data: "Wide benchmark suite: reasoning, documents, multi-image/video, hallucination, grounding, multilingual, text-only"
  result: "Competitive with GPT-4o and Claude-3.5-Sonnet; first open MLLM above 70% on MMMU, per the abstract"
draft: false
date: "2024-12-09"
---

## Problem

Open multimodal models trailed commercial ones. Which levers matter most when scaling: the vision encoder, the language model, the data or test-time settings?

## Method

**InternVL 2.5** keeps the **InternVL 2.0** architecture and improves the **training and testing strategies** and **data quality**. The authors systematically explore performance trends as they scale vision encoders, language models, dataset sizes and test-time configurations.

## Key results

From the abstract: on a wide range of benchmarks (multi-discipline reasoning, document understanding, multi-image and video, real-world comprehension, hallucination detection, visual grounding, multilingual, pure language), InternVL 2.5 is competitive with **GPT-4o** and **Claude-3.5-Sonnet**. It's described as the first open-source MLLM to exceed **70% on MMMU**, with chain-of-thought reasoning adding 3.7 points.

## Limitations

There's no dedicated limitations section in the extracted text. Like other developer-reported benchmark results, the comparisons are the authors' own.
