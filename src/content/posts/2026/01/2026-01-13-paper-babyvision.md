---
title: "Paper summary: BabyVision: Visual Reasoning Beyond Language"
categories: ["papers"]
tags: ["multimodal", "evaluation", "cv"]
summary: "BabyVision tests core visual abilities that don't depend on language, which young children handle easily; the best model tested (Gemini3-Pro-Preview) scores 49.7, behind 6-year-olds and far behind adults' 94.1."
sources: 
  - title: "BabyVision: Visual Reasoning Beyond Language (arXiv:2601.06521)"
    url: "https://arxiv.org/abs/2601.06521"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:33.203Z"
  - title: "Hugging Face Daily Papers, 2026-01-13"
    url: "https://huggingface.co/papers?date=2026-01-13"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:23.643Z"
  - title: "BabyVision: Visual Reasoning Beyond Language (arXiv HTML full text)"
    url: "https://arxiv.org/html/2601.06521"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:33.203Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/UniPat-AI/BabyVision"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:50:33.203Z"
highlights: ["Multimodal LLMs lean on language knowledge to cover for weak basic vision.", "Leading models fall below 6-year-old children on these tasks."]
papers: 
  - title: "BabyVision: Visual Reasoning Beyond Language"
    authors: ["Liang Chen", "Weichu Xie", "Yiyan Liang", "Hongfeng He", "Hans Zhao", "Zhibo Yang", "Zhiqi Huang", "Haoning Wu", "Haoyu Lu", "Y. charles", "Yiping Bao", "Yuantao Fan", "Guopeng Li", "Haiyang Shen", "Xuanzhong Chen", "Wendong Xu", "Shuzheng Si", "Zefan Cai", "Wenhao Chai", "Ziqi Huang", "Fangfu Liu", "Tianyu Liu", "Baobao Chang", "Ming Wu", "Xiaobo Hu", "Kaiyuan Chen", "Yixin Ren", "Yang Liu", "Yuan Gong", "Kuan Li"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2601.06521"
    pdf: "https://arxiv.org/pdf/2601.06521v2"
    code: "https://github.com/UniPat-AI/BabyVision"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Measuring core visual perception independent of language"
  method: "BabyVision: 388 items, 22 subclasses, four categories; human baselines; BabyVision-Gen for generation models"
  data: "BabyVision benchmark (released)"
  result: "Gemini3-Pro-Preview 49.7 vs adult average 94.1, per the abstract"
draft: false
date: "2026-01-13"
---

## Problem

Humans develop core visual skills long before language. MLLMs, the authors argue, lean on **linguistic priors** to make up for fragile visual understanding, and fail basic visual tasks even 3-year-olds solve. (BlindTest, summarised here in July 2024, found a related weakness.)

## Method

**BabyVision** assesses core visual abilities **independent of linguistic knowledge**: **388 items** in **22 subclasses** across **four** categories, with human evaluation for baselines. The authors also explore solving visual reasoning with generation models through **BabyVision-Gen** and an automatic evaluation toolkit.

## Key results

From the abstract: leading MLLMs score well below human baselines. **Gemini3-Pro-Preview scores 49.7**, behind **6-year-old** humans and far behind the average adult score of **94.1**. Code and data are released.

## Limitations

There's no dedicated limitations section in the extracted text. With 388 items, the benchmark is small, and it's built to isolate one kind of weakness.
