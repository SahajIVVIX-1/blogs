---
title: "Paper summary: Emu3: Next-Token Prediction is All You Need"
categories: ["papers"]
tags: ["multimodal", "genai", "llm"]
summary: "Emu3 tokenises images, text and video into one discrete space and trains a single Transformer from scratch with only next-token prediction, reported to beat SDXL at generation and LLaVA-1.6 at perception."
sources: 
  - title: "Emu3: Next-Token Prediction is All You Need (arXiv:2409.18869)"
    url: "https://arxiv.org/abs/2409.18869"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:32.589Z"
  - title: "Hugging Face Daily Papers, 2024-09-30"
    url: "https://huggingface.co/papers?date=2024-09-30"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:13.172Z"
  - title: "Emu3: Next-Token Prediction is All You Need (arXiv HTML full text)"
    url: "https://arxiv.org/html/2409.18869"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:32.589Z"
highlights: ["One recipe for everything: tokens in, next token out, with no diffusion model and no CLIP-plus-LLM composition.", "It also generates video by predicting the next token in a video sequence."]
papers: 
  - title: "Emu3: Next-Token Prediction is All You Need"
    authors: ["Xinlong Wang", "Xiaosong Zhang", "Zhengxiong Luo", "Quan Sun", "Yufeng Cui", "Jinsheng Wang", "Fan Zhang", "Yueze Wang", "Zhen Li", "Qiying Yu", "Yingli Zhao", "Yulong Ao", "Xuebin Min", "Tao Li", "Boya Wu", "Bo Zhao", "Bowen Zhang", "Liangdong Wang", "Guang Liu", "Zheqi He", "Xi Yang", "Jingjing Liu", "Yonghua Lin", "Tiejun Huang", "Zhongyuan Wang"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2409.18869"
    pdf: "https://arxiv.org/pdf/2409.18869v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Multimodal generation and perception with a single model"
  method: "Tokenise images, text and video into discrete tokens; train one Transformer from scratch with next-token prediction"
  data: "Mixture of multimodal sequences"
  result: "Surpasses SDXL and LLaVA-1.6 among other task-specific models; generates video, per the abstract"
draft: false
date: "2024-09-30"
---

## Problem

Next-token prediction drives LLMs, but multimodal tasks were dominated by other designs: **diffusion** for generation (Stable Diffusion) and **compositional** systems for perception (CLIP plus an LLM).

## Method

**Emu3** tokenises **images, text and videos** into one **discrete token space**, and trains a **single Transformer from scratch** on mixed multimodal sequences with only **next-token prediction**. No diffusion and no separate vision encoder. A video is generated token by token, like text.

## Key results

From the abstract: Emu3 outperforms several well-established task-specific models in both generation and perception, surpassing **SDXL** and **LLaVA-1.6**. It also generates high-fidelity video. The authors argue that focusing purely on tokens simplifies multimodal model design.

## Limitations

There's no dedicated limitations section in the extracted text. Generating images and video token by token means long sequences, so inference cost is a practical concern for this approach.
