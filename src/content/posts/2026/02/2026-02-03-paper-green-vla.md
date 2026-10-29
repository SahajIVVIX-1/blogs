---
title: "Paper summary: Green-VLA: Staged Vision-Language-Action Model for Generalist Robots"
categories: ["papers"]
tags: ["robotics", "vision-language-action", "rl"]
summary: "Green-VLA is a five-stage vision-language-action training recipe, from a base VLM to RL policy alignment, with one embodiment-aware action interface that controls humanoids, mobile manipulators and fixed arms."
sources: 
  - title: "Green-VLA: Staged Vision-Language-Action Model for Generalist Robots (arXiv:2602.00919)"
    url: "https://arxiv.org/abs/2602.00919"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:54.339Z"
  - title: "Hugging Face Daily Papers, 2026-02-03"
    url: "https://huggingface.co/papers?date=2026-02-03"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:36.401Z"
  - title: "Green-VLA: Staged Vision-Language-Action Model for Generalist Robots (arXiv HTML full text)"
    url: "https://arxiv.org/html/2602.00919"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:54.339Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/greenvla/GreenVLA"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:50:54.339Z"
highlights: ["One policy drives very different robot bodies through a unified, embodiment-aware action interface.", "The last stage, RL alignment, improves success rate, robustness and long-horizon efficiency."]
papers: 
  - title: "Green-VLA: Staged Vision-Language-Action Model for Generalist Robots"
    authors: ["I. Apanasevich", "M. Artemyev", "R. Babakyan", "P. Fedotova", "D. Grankin", "E. Kupryashin", "A. Misailidi", "D. Nerus", "A. Nutalapati", "G. Sidorov", "I. Efremov", "M. Gerasyov", "D. Pikurov", "Y. Senchenko", "S. Davidenko", "D. Kulikov", "M. Sultankin", "K. Askarbek", "O. Shamanin", "D. Statovoy", "E. Zalyaev", "I. Zorin", "A. Letkin", "E. Rusakov", "A. Silchenko", "V. Vorobyov", "S. Sobolnikov", "A. Postnikov"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2602.00919"
    pdf: "https://arxiv.org/pdf/2602.00919v2"
    code: "https://github.com/greenvla/GreenVLA"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2602.00919.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2602.00919\">Apanasevich et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Green-VLA architecture. A multimodal vision–language model encodes instructions, camera views, and proprioception into tokens that feed a flow-matching action expert. A high-level task planner decomposes user …"
images: 
  - src: "images/2026/paper-2602.00919.webp"
    alt: "Figure from the paper \"Green-VLA: Staged Vision-Language-Action Model for Generalist Robots\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2602.00919\">Apanasevich et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Green-VLA architecture. A multimodal vision–language model encodes instructions, camera views, and proprioception into tokens that feed a flow-matching action expert. A high-level task planner decomposes user …"
card: 
  task: "Generalist robot control from vision and language"
  method: "Five-stage curriculum (L0 VLM → L1 grounding → R0 multi-embodiment pre-training → R1 embodiment adaptation → R2 RL alignment); flow-matching action expert; safety-oriented inference guidance"
  data: "3,000 hours of demonstrations; Simpler BRIDGE WidowX, CALVIN ABC-D, real-robot tests"
  result: "Strong generalisation and RL-driven gains in success rate, robustness and long-horizon efficiency, per the abstract"
draft: false
date: "2026-02-03"
---

## Problem

Vision-language-action (VLA) models should transfer across robot bodies and still work reliably on a specific real robot, here the Green humanoid.

## Method

A **five-stage curriculum**: foundational VLMs (L0), multimodal grounding (L1), multi-embodiment pre-training (R0), embodiment-specific adaptation (R1), and **RL policy alignment** (R2). Supporting pieces:

- a data pipeline over **3,000 hours** of demonstrations, with temporal alignment and quality filtering
- a **unified, embodiment-aware action interface**, so one policy controls humanoids, mobile manipulators and fixed-base arms
- at inference: **episode-progress prediction**, **out-of-distribution detection** and joint-prediction-based guidance, for safety and precise target selection

Figure 1 shows the architecture: a VLM encodes instructions, camera views and proprioception, and feeds a flow-matching action expert.

## Key results

From the abstract: on Simpler BRIDGE WidowX, CALVIN ABC-D and real robots, strong generalisation, plus gains from RL alignment in success rate, robustness and long-horizon efficiency.

## Limitations

There's no dedicated limitations section in the extracted text. The abstract reports gains qualitatively, and the numbers are in the paper's tables.
