---
title: "Paper summary: PaliGemma 2: A Family of Versatile VLMs for Transfer"
categories: ["papers"]
tags: ["multimodal", "vision-language", "transfer"]
summary: "PaliGemma 2 pairs the SigLIP-So400m vision encoder with Gemma 2 language models from 2B to 27B at three resolutions, and studies what drives transfer across a broad set of fine-tuning tasks."
sources: 
  - title: "PaliGemma 2: A Family of Versatile VLMs for Transfer (arXiv:2412.03555)"
    url: "https://arxiv.org/abs/2412.03555"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:26.846Z"
  - title: "Hugging Face Daily Papers, 2024-12-05"
    url: "https://huggingface.co/papers?date=2024-12-05"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:53.372Z"
  - title: "PaliGemma 2: A Family of Versatile VLMs for Transfer (arXiv HTML full text)"
    url: "https://arxiv.org/html/2412.03555"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:26.846Z"
highlights: ["The family spans model size (2B–27B) and resolution (224, 448, 896 px), so their effects on transfer can be studied separately.", "Transfer tasks extend to OCR-style problems such as table, molecule and music-score recognition."]
papers: 
  - title: "PaliGemma 2: A Family of Versatile VLMs for Transfer"
    authors: ["Andreas Steiner", "André Susano Pinto", "Michael Tschannen", "Daniel Keysers", "Xiao Wang", "Yonatan Bitton", "Alexey Gritsenko", "Matthias Minderer", "Anthony Sherbondy", "Shangbang Long", "Siyang Qin", "Reeve Ingle", "Emanuele Bugliarello", "Sahar Kazemzadeh", "Thomas Mesnard", "Ibrahim Alabdulmohsin", "Lucas Beyer", "Xiaohua Zhai"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2412.03555"
    pdf: "https://arxiv.org/pdf/2412.03555v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Open VLMs designed for fine-tuning transfer"
  method: "SigLIP-So400m + Gemma 2 (2B–27B), multi-stage training at 224/448/896 px"
  data: "Broad set of transfer tasks incl. table structure, molecular structure, music score recognition"
  result: "A family of base models enabling analysis of task, size and resolution interplay, per the abstract"
draft: false
date: "2024-12-05"
---

## Problem

PaliGemma was designed as a VLM meant to be **fine-tuned** for specific tasks. The questions here: how do model size and image resolution affect transfer, and how far can transfer reach?

## Method

**PaliGemma 2** combines the **SigLIP-So400m** vision encoder (as in PaliGemma) with the full **Gemma 2** range, from **2B to 27B**. Models are trained in multiple stages at **three resolutions: 224, 448 and 896 px**. This grid of base models lets the authors study transfer factors such as learning rate, and how task type, model size and resolution interact.

## Key results

The paper widens the set of transfer tasks beyond PaliGemma, including **table structure recognition**, **molecular structure recognition**, **music score recognition** and long, fine-grained captioning. The abstract describes these as state-of-the-art results on a wide range of tasks.

## Limitations

There's no dedicated limitations section in the extracted text. The models are base models intended to be fine-tuned, not general chat assistants out of the box.
