---
title: "Paper summary: Qwen2.5-VL Technical Report"
categories: ["papers"]
tags: ["multimodal", "vision-language", "agents"]
summary: "Qwen2.5-VL adds precise object localisation, robust document parsing and hour-long video understanding through a natively dynamic-resolution ViT and absolute time encoding; the 72B model is reported to match GPT-4o and Claude 3.5 Sonnet."
sources: 
  - title: "Qwen2.5-VL Technical Report (arXiv:2502.13923)"
    url: "https://arxiv.org/abs/2502.13923"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:35.297Z"
  - title: "Hugging Face Daily Papers, 2025-02-20"
    url: "https://huggingface.co/papers?date=2025-02-20"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:40.145Z"
  - title: "Qwen2.5-VL Technical Report (arXiv HTML full text)"
    url: "https://arxiv.org/html/2502.13923"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:35.297Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/QwenLM/Qwen2.5-VL"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:45:35.297Z"
highlights: ["Images and videos are processed at their native resolution and timing, instead of being resized and normalised.", "The model can act as a visual agent that operates computers and phones."]
papers: 
  - title: "Qwen2.5-VL Technical Report"
    authors: ["Shuai Bai", "Keqin Chen", "Xuejing Liu", "Jialin Wang", "Wenbin Ge", "Sibo Song", "Kai Dang", "Peng Wang", "Shijie Wang", "Jun Tang", "Humen Zhong", "Yuanzhi Zhu", "Mingkun Yang", "Zhaohai Li", "Jianqiang Wan", "Pengfei Wang", "Wei Ding", "Zheren Fu", "Yiheng Xu", "Jiabo Ye", "Xi Zhang", "Tianbao Xie", "Zesen Cheng", "Hang Zhang", "Zhibo Yang", "Haiyang Xu", "Junyang Lin"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2502.13923"
    pdf: "https://arxiv.org/pdf/2502.13923v1"
    code: "https://github.com/QwenLM/Qwen2.5-VL"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "General vision-language understanding, localisation, documents, long video, visual agents"
  method: "Native dynamic-resolution ViT trained from scratch with window attention; absolute time encoding; three model sizes"
  data: "Images, documents, charts and long videos"
  result: "72B flagship matches GPT-4o and Claude 3.5 Sonnet, especially on documents and diagrams, per the abstract"
draft: false
date: "2025-02-20"
---

## Problem

Vision-language models have to handle images of very different sizes, dense documents, precise localisation and long videos. Resizing everything to a fixed shape loses information.

## Method

- **Dynamic resolution**: a **native dynamic-resolution ViT**, trained from scratch with **window attention** to keep compute down, processes images at their native size.
- **Absolute time encoding** for video, enabling second-level event localisation in videos up to **hours** long.
- Training for **object localisation** with bounding boxes or points, and **structured extraction** from invoices, forms, tables and charts.
- Three model sizes, from edge devices to high-end servers.

## Key results

From the abstract: the flagship **Qwen2.5-VL-72B** matches state-of-the-art models such as **GPT-4o** and **Claude 3.5 Sonnet**, excelling in **document and diagram understanding**. It can act as an interactive **visual agent** (operating computers and mobile devices) and keeps the language ability of Qwen2.5.

## Limitations

There's no dedicated limitations section in the extracted text. Comparisons are the developers' own.
