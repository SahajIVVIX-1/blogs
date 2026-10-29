---
title: "Paper summary: InternVL3: Exploring Advanced Training and Test-Time Recipes for Open-Source Multimodal Models"
categories: ["papers"]
tags: ["multimodal", "open-source"]
summary: "InternVL3 trains multimodal and language abilities together in one pre-training stage, rather than adapting a text-only LLM afterwards, and reports 72.2 on MMMU for its 78B model."
sources: 
  - title: "InternVL3: Exploring Advanced Training and Test-Time Recipes for Open-Source Multimodal Models (arXiv:2504.10479)"
    url: "https://arxiv.org/abs/2504.10479"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:28.234Z"
  - title: "Hugging Face Daily Papers, 2025-04-15"
    url: "https://huggingface.co/papers?date=2025-04-15"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:12.898Z"
  - title: "InternVL3: Exploring Advanced Training and Test-Time Recipes for Open-Source Multimodal Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2504.10479"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:28.234Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/OpenGVLab/InternVL"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:46:28.234Z"
highlights: ["Native multimodal pre-training learns vision and language jointly from the start, instead of bolting vision onto a finished LLM.", "InternVL3-78B scores 72.2 on MMMU, a new open-source state of the art at the time."]
papers: 
  - title: "InternVL3: Exploring Advanced Training and Test-Time Recipes for Open-Source Multimodal Models"
    authors: ["Jinguo Zhu", "Weiyun Wang", "Zhe Chen", "Zhaoyang Liu", "Shenglong Ye", "Lixin Gu", "Hao Tian", "Yuchen Duan", "Weijie Su", "Jie Shao", "Zhangwei Gao", "Erfei Cui", "Xuehui Wang", "Yue Cao", "Yangzhou Liu", "Xingguang Wei", "Hongjie Zhang", "Haomin Wang", "Weiye Xu", "Hao Li", "Jiahao Wang", "Nianchen Deng", "Songze Li", "Yinan He", "Tan Jiang", "Jiapeng Luo", "Yi Wang", "Conghui He", "Botian Shi", "Xingcheng Zhang", "Wenqi Shao", "Junjun He", "Yingtong Xiong", "Wenwen Qu", "Peng Sun", "Penglong Jiao", "Han Lv", "Lijun Wu", "Kaipeng Zhang", "Huipeng Deng", "Jiaye Ge", "Kai Chen", "Limin Wang", "Min Dou", "Lewei Lu", "Xizhou Zhu", "Tong Lu", "Dahua Lin", "Yu Qiao", "Jifeng Dai", "Wenhai Wang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2504.10479"
    pdf: "https://arxiv.org/pdf/2504.10479v3"
    code: "https://github.com/OpenGVLab/InternVL"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Open multimodal LLMs"
  method: "Native multimodal pre-training; variable visual position encoding (V2PE); SFT + mixed preference optimisation; test-time scaling"
  data: "Diverse multimodal data and pure-text corpora"
  result: "InternVL3-78B: 72.2 on MMMU, SOTA among open MLLMs; competitive with ChatGPT-4o, Claude 3.5 Sonnet, Gemini 2.5 Pro, per the abstract"
draft: false
date: "2025-04-15"
---

## Problem

Most MLLMs start from a finished text-only LLM and adapt it to images afterwards, which brings alignment difficulties.

## Method

**InternVL3** uses **native multimodal pre-training**: multimodal and language abilities are learned **together in a single pre-training stage**, from multimodal data plus pure text. It adds:

- **variable visual position encoding (V2PE)**, for longer multimodal contexts
- post-training with **SFT** and **mixed preference optimisation (MPO)**, the method from the Nov 2024 paper on this blog
- **test-time scaling** strategies and optimised training infrastructure

## Key results

From the abstract: **InternVL3-78B** scores **72.2 on MMMU**, a new state of the art among open-source MLLMs, and remains competitive with ChatGPT-4o, Claude 3.5 Sonnet and Gemini 2.5 Pro while keeping strong language ability. Training data and weights are to be released.

## Limitations

There's no dedicated limitations section in the extracted text. Comparisons are the developers' own.
