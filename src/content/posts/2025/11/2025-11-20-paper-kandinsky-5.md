---
title: "Paper summary: Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation"
categories: ["papers"]
tags: ["genai", "video", "text-to-image"]
summary: "Kandinsky 5.0 is an open family of image and 10-second video generation models (6B Image Lite, 2B Video Lite, 19B Video Pro), with the full data-curation and multi-stage training pipeline described."
sources: 
  - title: "Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation (arXiv:2511.14993)"
    url: "https://arxiv.org/abs/2511.14993"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:41.005Z"
  - title: "Hugging Face Daily Papers, 2025-11-20"
    url: "https://huggingface.co/papers?date=2025-11-20"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:50.938Z"
  - title: "Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation (arXiv HTML full text)"
    url: "https://arxiv.org/html/2511.14993"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:41.005Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/kandinskylab/kandinsky-5"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:49:41.005Z"
highlights: ["Three line-ups trade speed for quality: a 2B fast video model up to a 19B high-quality one.", "The authors trace their weaker prompt following to the text encoder's 256-token context limit."]
papers: 
  - title: "Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation"
    authors: ["Vladimir Arkhipkin", "Vladimir Korviakov", "Nikolai Gerasimenko", "Denis Parkhomenko", "Viacheslav Vasilev", "Alexey Letunovskiy", "Nikolai Vaulin", "Maria Kovaleva", "Ivan Kirillov", "Lev Novitskiy", "Denis Koposov", "Nikita Kiselev", "Alexander Varlamov", "Dmitrii Mikhailov", "Vladimir Polovnikov", "Andrey Shutkin", "Julia Agafonova", "Ilya Vasiliev", "Anastasiia Kargapoltseva", "Anna Dmitrienko", "Anastasia Maltseva", "Anna Averchenkova", "Olga Kim", "Tatiana Nikulina", "Denis Dimitrov"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2511.14993"
    pdf: "https://arxiv.org/pdf/2511.14993v3"
    code: "https://github.com/kandinskylab/kandinsky-5"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2511.14993.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2511.14993\">Arkhipkin et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. "
images: 
  - src: "images/2025/paper-2511.14993.webp"
    alt: "Figure from the paper \"Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2511.14993\">Arkhipkin et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. "
card: 
  task: "Open high-resolution image and 10-second video generation"
  method: "Image Lite (6B), Video Lite (2B), Video Pro (19B); curated data lifecycle; pre-training + SFT + RL post-training; architecture and inference optimisations"
  data: "Curated image and video data; human side-by-side evaluation"
  result: "State-of-the-art generation quality and speed by human evaluation, per the abstract"
draft: false
date: "2025-11-20"
---

## Problem

Kandinsky (the 2023 version is summarised on this blog) moves from images to **video**, aiming for high quality, high speed and an open release.

## Method

Three line-ups:

- **Image Lite**: 6B-parameter image models
- **Video Lite**: fast, lightweight **2B** text-to-video and image-to-video models
- **Video Pro**: **19B** models for top video quality

The report covers the whole **data-curation lifecycle** (collection, processing, filtering, clustering) and a multi-stage pipeline of extensive pre-training, then quality-focused fine-tuning and **RL-based post-training**, plus architectural, training and inference optimisations. Code and checkpoints are released.

## Key results

From the abstract: high generation speed and state-of-the-art performance across tasks, as shown by **human evaluation**.

## Limitations

From the paper: in side-by-side comparisons, **text–visual alignment** lags slightly behind some competitors, which the authors attribute mainly to the **256-token** context of the Qwen2.5-VL 7B text encoder. They also list temporal consistency for complex dynamics as an area to improve.
