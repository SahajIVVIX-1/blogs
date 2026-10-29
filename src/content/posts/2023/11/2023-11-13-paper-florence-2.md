---
title: "Paper summary: Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks"
categories: ["papers"]
tags: ["cv", "vision-language", "foundation-models"]
summary: "Florence-2 is a single sequence-to-sequence vision model that takes a text prompt as the task instruction and answers in text, covering captioning, detection, grounding and segmentation, trained on 5.4B annotations."
sources: 
  - title: "Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks (arXiv:2311.06242)"
    url: "https://arxiv.org/abs/2311.06242"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:46.513Z"
  - title: "Hugging Face Daily Papers, 2023-11-13"
    url: "https://huggingface.co/papers?date=2023-11-13"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:57.091Z"
  - title: "Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks (arXiv HTML full text)"
    url: "https://arxiv.org/html/2311.06242"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:46.513Z"
highlights: ["Every vision task, including boxes and masks, is turned into \"prompt in, text out\".", "The data engine (FLD-5B: 5.4B annotations on 126M images) is as much the contribution as the model."]
papers: 
  - title: "Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks"
    authors: ["Bin Xiao", "Haiping Wu", "Weijian Xu", "Xiyang Dai", "Houdong Hu", "Yumao Lu", "Michael Zeng", "Ce Liu", "Lu Yuan"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2311.06242"
    pdf: "https://arxiv.org/pdf/2311.06242v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2023/paper-2311.06242.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2311.06242\">Xiao et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : We aim to build a vision foundation model to enable extensive perception capabilities including spatial hierarchy and semantic granularity. To achieve this, a single unified model Florence-2 is pre-trained on …"
images: 
  - src: "images/2023/paper-2311.06242.webp"
    alt: "Figure from the paper \"Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2311.06242\">Xiao et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : We aim to build a vision foundation model to enable extensive perception capabilities including spatial hierarchy and semantic granularity. To achieve this, a single unified model Florence-2 is pre-trained on …"
card: 
  task: "One model for many vision and vision-language tasks"
  method: "Prompt-based sequence-to-sequence model; outputs (including coordinates) as text"
  data: "FLD-5B: 5.4B annotations on 126M images, built by iterative automated annotation and model refinement"
  result: "Strong zero-shot and fine-tuning performance across many tasks, per the authors"
draft: false
date: "2023-11-13"
---

## Problem

Big vision models transfer well, but they usually need a separate head or model per task. They can't simply be *told* what to do. Handling everything from image-level captions to pixel-level regions needs both spatial hierarchy and semantic granularity.

## Method

Florence-2 uses a **sequence-to-sequence** design: an image plus a **text prompt** describing the task goes in, and the answer comes out as **text**. For tasks like detection, grounding or segmentation, locations are written as tokens.

Training such a multi-task model needs a lot of consistent annotation. The authors built **FLD-5B**, about **5.4 billion annotations on 126 million images**, with a data engine that alternates automatic annotation and model refinement.

## Key results

The paper reports Florence-2 as a strong vision foundation model, with what the authors call unprecedented zero-shot and fine-tuning ability across numerous tasks.

## Limitations

The extracted text doesn't include a dedicated limitations section. Much of the annotation is generated automatically by the data engine, so dataset quality depends on that pipeline.
