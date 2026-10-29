---
title: "Paper summary: CLEAR: Character Unlearning in Textual and Visual Modalities"
categories: ["papers"]
tags: ["multimodal", "unlearning", "privacy", "benchmark"]
summary: "CLEAR is an open benchmark for removing information about specific people from multimodal models, with 200 fictitious individuals, 3,700 images and linked Q&A, used to compare 11 unlearning methods."
sources: 
  - title: "CLEAR: Character Unlearning in Textual and Visual Modalities (arXiv:2410.18057)"
    url: "https://arxiv.org/abs/2410.18057"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:56.278Z"
  - title: "Hugging Face Daily Papers, 2024-10-30"
    url: "https://huggingface.co/papers?date=2024-10-30"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:31.510Z"
  - title: "CLEAR: Character Unlearning in Textual and Visual Modalities (arXiv HTML full text)"
    url: "https://arxiv.org/html/2410.18057"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:56.278Z"
highlights: ["The people are fictitious, so \"forgetting\" can be measured cleanly without real personal data.", "Unlearning both modalities together beat unlearning text or images alone."]
papers: 
  - title: "CLEAR: Character Unlearning in Textual and Visual Modalities"
    authors: ["Alexey Dontsov", "Dmitrii Korzh", "Alexey Zhavoronkin", "Boris Mikheev", "Denis Bobkov", "Aibek Alanov", "Oleg Y. Rogov", "Ivan Oseledets", "Elena Tutubalina"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2410.18057"
    pdf: "https://arxiv.org/pdf/2410.18057v4"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2024/paper-2410.18057.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2410.18057\">Dontsov et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Our dataset CLEAR includes 3,770 visual image-caption pairs and 4,000 textual question-answer pairs related to fictional characters. We apply multimodal unlearning to remove specific information, subsequently …"
images: 
  - src: "images/2024/paper-2410.18057.webp"
    alt: "Figure from the paper \"CLEAR: Character Unlearning in Textual and Visual Modalities\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2410.18057\">Dontsov et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Our dataset CLEAR includes 3,770 visual image-caption pairs and 4,000 textual question-answer pairs related to fictional characters. We apply multimodal unlearning to remove specific information, subsequently …"
card: 
  task: "Benchmarking multimodal machine unlearning"
  method: "Benchmark of fictitious individuals with images and Q&A; evaluation of 11 unlearning methods across four evaluation sets"
  data: "CLEAR: 200 fictitious individuals, 3,700 images, linked question–answer pairs (on Hugging Face)"
  result: "Joint unlearning of both modalities outperforms single-modality approaches, per the abstract"
draft: false
date: "2024-10-30"
---

## Problem

**Machine unlearning** removes private or hazardous information from trained models. It has been studied for text-only and image-only models, but **multimodal unlearning** lacked open benchmarks for measuring whether information is removed across modalities.

## Method

**CLEAR** contains **200 fictitious individuals** with **3,700 images**, linked to question–answer pairs. Figure 1 counts 3,770 image–caption pairs and 4,000 text Q&A pairs. Because the people are fictitious, the exact "forget" and "retain" sets are known. The authors evaluate **11 unlearning methods**, including SCRUB, gradient ascent and DPO, across **four evaluation sets**.

## Key results

From the abstract: **jointly unlearning both modalities** works better than unlearning a single modality. The dataset is published on Hugging Face.

## Limitations

From the paper:

- the benchmark is **synthetic** and may not capture real-world complexity
- it targets privacy-style unlearning (removing personal data), not other needs like removing harmful content
- it mainly evaluates fine-tuning-based methods
- these methods may not scale efficiently to larger models and datasets
