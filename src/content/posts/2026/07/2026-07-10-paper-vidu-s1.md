---
title: "Paper summary: Vidu S1: A Real-Time Interactive Video Generation Model"
categories: ["papers"]
tags: ["genai", "video", "real-time"]
summary: "Vidu S1 generates infinite-length interactive video of digital characters in real time, controlled by voice at any moment, at 540p and up to 42 FPS on consumer GPUs."
sources: 
  - title: "Vidu S1: A Real-Time Interactive Video Generation Model (arXiv:2607.03118)"
    url: "https://arxiv.org/abs/2607.03118"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:08.835Z"
  - title: "Hugging Face Daily Papers, 2026-07-10"
    url: "https://huggingface.co/papers?date=2026-07-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:11.406Z"
  - title: "Vidu S1: A Real-Time Interactive Video Generation Model (arXiv HTML full text)"
    url: "https://arxiv.org/html/2607.03118"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:08.835Z"
highlights: ["Users steer the video while it's being generated, by speaking.", "The authors report no blurring, drift or distortion even for infinite-length generation."]
papers: 
  - title: "Vidu S1: A Real-Time Interactive Video Generation Model"
    authors: ["Jintao Zhang", "Kai Jiang", "Jintao Chen", "Xu Wang", "Yang Luo", "Yuji Wang", "Dechuang Chen", "Jungang Li", "Chengyang Ye", "Marco Chen", "Hongzhou Zhu", "Min Zhao", "Yuxuan Jiang", "Zhengkun Huang", "Chendong Xiang", "Kaiwen Zheng", "Haoxu Wang", "Xiaohang Wang", "Qi Jia", "Xin Chen", "Yimin Chen", "Youhe Jiang", "Fangcheng Fu", "Zhijie Deng", "Fan Bao", "Jianfei Chen", "Jun Zhu"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2607.03118"
    pdf: "https://arxiv.org/pdf/2607.03118v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2607.03118.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2607.03118\">Zhang et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Overview of Vidu S1 . Vidu S1 supports speech-guided future control, efficient infinite-duration inference, and diverse customized characters for real-time interactive video generation."
images: 
  - src: "images/2026/paper-2607.03118.webp"
    alt: "Figure from the paper \"Vidu S1: A Real-Time Interactive Video Generation Model\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2607.03118\">Zhang et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Overview of Vidu S1 . Vidu S1 supports speech-guided future control, efficient infinite-duration inference, and diverse customized characters for real-time interactive video generation."
card: 
  task: "Real-time, voice-controlled interactive video generation"
  method: "TurboDiffusion + TurboServe; speech-guided control; custom characters from uploaded images"
  data: "Real people, anime and pet characters"
  result: "540p at up to 42 FPS on consumer GPUs; best on all test metrics in the authors' experiments, per the abstract"
draft: false
date: "2026-07-10"
---

## Problem

Most video generation is offline: write a prompt, wait for a clip. Interactive characters need **continuous, real-time** generation that responds to control instantly, without drifting over time.

## Method

**Vidu S1** (Figure 1):

- **voice instructions** can change the video content at any moment
- **infinite-length** generation, designed to avoid blurring, drift or distortion
- built with **TurboDiffusion** and **TurboServe** for speed
- users can upload custom images (real people, anime, pets) and choose voice tones

## Key results

From the abstract: **540p** real-time video at up to **42 FPS** on regular consumer GPUs, and the best performance across all test metrics in the authors' experiments. A public demo is available.

## Limitations

There's no dedicated limitations section in the extracted text. Generating real people's likeness from uploaded photos raises obvious consent and misuse questions, which the abstract doesn't discuss.
