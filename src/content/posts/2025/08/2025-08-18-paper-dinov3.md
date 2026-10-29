---
title: "Paper summary: DINOv3"
categories: ["papers"]
tags: ["cv", "self-supervised", "foundation-models"]
summary: "DINOv3 scales self-supervised vision training and introduces Gram anchoring to stop dense feature maps from degrading during long training, producing a frozen backbone that beats specialised models across many tasks."
sources: 
  - title: "DINOv3 (arXiv:2508.10104)"
    url: "https://arxiv.org/abs/2508.10104"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:20.237Z"
  - title: "Hugging Face Daily Papers, 2025-08-18"
    url: "https://huggingface.co/papers?date=2025-08-18"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:53.989Z"
  - title: "DINOv3 (arXiv HTML full text)"
    url: "https://arxiv.org/html/2508.10104"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:20.237Z"
highlights: ["Long self-supervised training used to make dense (per-patch) features worse; Gram anchoring fixes that.", "The features work well frozen, with no fine-tuning, across a broad range of vision tasks."]
papers: 
  - title: "DINOv3"
    authors: ["Oriane Siméoni", "Huy V. Vo", "Maximilian Seitzer", "Federico Baldassarre", "Maxime Oquab", "Cijo Jose", "Vasil Khalidov", "Marc Szafraniec", "Seungeun Yi", "Michaël Ramamonjisoa", "Francisco Massa", "Daniel Haziza", "Luca Wehrstedt", "Jianyuan Wang", "Timothée Darcet", "Théo Moutakanni", "Leonel Sentana", "Claire Roberts", "Andrea Vedaldi", "Jamie Tolan", "John Brandt", "Camille Couprie", "Julien Mairal", "Hervé Jégou", "Patrick Labatut", "Piotr Bojanowski"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2508.10104"
    pdf: "https://arxiv.org/pdf/2508.10104v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "General-purpose self-supervised vision foundation model"
  method: "Scaled data and model; Gram anchoring regulariser; post-hoc adaptations for resolution, model size and text alignment"
  data: "Large curated image data; natural to aerial images"
  result: "Outperforms specialised state of the art across a broad range of settings without fine-tuning, per the abstract"
draft: false
date: "2025-08-18"
---

## Problem

Self-supervised learning promises vision models trained without labels, on any kind of image (natural or aerial), with one algorithm. But a known issue is that **dense feature maps degrade** during long training schedules. That's what hurts tasks like segmentation and depth that need per-patch features. (The "registers" paper from Sept 2023 on this blog tackled a related artifact.)

## Method

Three strategies:

1. **Scale** both dataset and model size, with careful data preparation, design and optimisation.
2. **Gram anchoring**, a new method that keeps the patch-to-patch similarity structure (the Gram matrix) of dense features from degrading during long training.
3. **Post-hoc** strategies for flexibility in resolution, model size and alignment with text.

## Key results

From the abstract: a versatile vision foundation model that **outperforms specialised state of the art** across a broad range of settings **without fine-tuning**, with high-quality dense features that significantly surpass earlier self- and weakly-supervised foundation models. A suite of models for different resource budgets is released.

## Limitations

There's no dedicated limitations section in the extracted text. The headline claims are about frozen features; results with task-specific fine-tuning are a separate question.
