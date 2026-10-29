---
title: "Paper summary: 2.5 Years in Class: A Multimodal Textbook for Vision-Language Pretraining"
categories: ["papers"]
tags: ["multimodal", "data", "pre-training"]
summary: "The authors turn 22,000 class hours of instructional videos into an interleaved image–text \"textbook\" corpus for vision-language pre-training, with denser knowledge than web-crawled interleaved data."
sources: 
  - title: "2.5 Years in Class: A Multimodal Textbook for Vision-Language Pretraining (arXiv:2501.00958)"
    url: "https://arxiv.org/abs/2501.00958"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:51.746Z"
  - title: "Hugging Face Daily Papers, 2025-01-03"
    url: "https://huggingface.co/papers?date=2025-01-03"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:11.017Z"
  - title: "2.5 Years in Class: A Multimodal Textbook for Vision-Language Pretraining (arXiv HTML full text)"
    url: "https://arxiv.org/html/2501.00958"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:44:51.746Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/damo-nlp-sg/multimodal_textbook"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:44:51.746Z"
highlights: ["Web-crawled image–text data often has loosely related images and text; lecture videos keep them tightly linked.", "Keyframes, speech transcripts (ASR) and OCR text are extracted and refined into interleaved samples."]
papers: 
  - title: "2.5 Years in Class: A Multimodal Textbook for Vision-Language Pretraining"
    authors: ["Wenqi Zhang", "Hang Zhang", "Xin Li", "Jiashuo Sun", "Yongliang Shen", "Weiming Lu", "Deli Zhao", "Yueting Zhuang", "Lidong Bing"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2501.00958"
    pdf: "https://arxiv.org/pdf/2501.00958v4"
    code: "https://github.com/damo-nlp-sg/multimodal_textbook"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Better interleaved pre-training data for VLMs"
  method: "Collect instructional videos with an LLM-proposed taxonomy; extract keyframes, ASR and OCR text; organise into an interleaved textbook corpus"
  data: "2.5 years of instructional video, 22,000 class hours"
  result: "A knowledge-rich corpus for VLM pre-training, per the authors"
draft: false
date: "2025-01-03"
---

## Problem

**Interleaved** image–text corpora help VLMs learn more naturally than image–caption pairs. But web-crawled ones suffer from low knowledge density, loose image–text relations and poor coherence between images. Meanwhile, huge numbers of **instructional videos** (e.g. online geometry courses) are barely used for training.

## Method

The authors build a **multimodal textbook**:

1. Use an **LLM-proposed taxonomy** to gather instructional videos systematically: over **2.5 years** of video, **22,000 class hours**.
2. Progressively extract and refine **visual** (keyframes), **audio** (ASR transcripts) and **text** (OCR) knowledge.
3. Arrange these in time order into an **interleaved** image–text corpus.

## Key results

From the abstract: compared with alternatives, the corpus offers more coherent context, richer knowledge and better image–text alignment. Pre-training on it gives strong results especially on knowledge- and reasoning-heavy tasks such as **ScienceQA** and **MathVista**, and better use of interleaved few-shot context.

## Limitations

From the paper: despite multi-level filtering, the corpus may still include redundant keyframes and low-quality text. It targets understanding and text generation, since loss isn't computed on image tokens, so generation models aren't covered yet.
