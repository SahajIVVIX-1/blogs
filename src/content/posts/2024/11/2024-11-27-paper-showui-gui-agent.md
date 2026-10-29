---
title: "Paper summary: ShowUI: One Vision-Language-Action Model for GUI Visual Agent"
categories: ["papers"]
tags: ["agents", "gui", "multimodal"]
summary: "ShowUI is a vision-language-action model for GUI agents that sees screenshots like a person, trims redundant screen tokens with a UI graph, and interleaves vision, language and actions."
sources: 
  - title: "ShowUI: One Vision-Language-Action Model for GUI Visual Agent (arXiv:2411.17465)"
    url: "https://arxiv.org/abs/2411.17465"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:20.513Z"
  - title: "Hugging Face Daily Papers, 2024-11-27"
    url: "https://huggingface.co/papers?date=2024-11-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:48.469Z"
  - title: "ShowUI: One Vision-Language-Action Model for GUI Visual Agent (arXiv HTML full text)"
    url: "https://arxiv.org/html/2411.17465"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:20.513Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/showlab/ShowUI"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:44:20.513Z"
highlights: ["Instead of reading HTML or accessibility trees, ShowUI works from screenshots, as people do.", "Screenshots have lots of empty, repetitive regions; UI-guided token selection skips them to save compute."]
papers: 
  - title: "ShowUI: One Vision-Language-Action Model for GUI Visual Agent"
    authors: ["Kevin Qinghong Lin", "Linjie Li", "Difei Gao", "Zhengyuan Yang", "Shiwei Wu", "Zechen Bai", "Weixian Lei", "Lijuan Wang", "Mike Zheng Shou"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2411.17465"
    pdf: "https://arxiv.org/pdf/2411.17465v1"
    code: "https://github.com/showlab/ShowUI"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Visual GUI agents (web, mobile, desktop)"
  method: "UI-guided visual token selection via a UI connected graph; interleaved vision-language-action streaming; curated GUI instruction data"
  data: "GUI navigation and grounding datasets"
  result: "2B model, 75.1% zero-shot screenshot grounding; 33% fewer visual tokens and 1.4× faster training, per the abstract"
draft: false
date: "2024-11-27"
---

## Problem

Most GUI agents are language-based. They rely on closed-source APIs and **text meta-information** like HTML or accessibility trees, so they don't perceive the interface visually the way humans do.

## Method

**ShowUI** is a **vision-language-action** model for the digital world, with:

1. **UI-guided visual token selection**: treat the screenshot as a **UI connected graph**, find redundant regions (large uniform areas), and drop those tokens in self-attention, which cuts compute.
2. **Interleaved vision-language-action streaming**: one format that handles visual–action history in navigation and multi-turn queries.
3. A curated, balanced **GUI instruction-following dataset**.

## Key results

From the abstract: ShowUI, a lightweight **2B** model trained on **256K** samples, reaches **75.1%** accuracy in zero-shot screenshot grounding. UI-guided token selection removes **33%** of redundant visual tokens during training and speeds it up **1.4×**. Navigation experiments on Mind2Web (web), AITW (mobile) and MiniWob (online) support the approach.

## Limitations

There's no dedicated limitations section in the extracted text. Working from screenshots alone means the model must infer structure that HTML would state explicitly.
