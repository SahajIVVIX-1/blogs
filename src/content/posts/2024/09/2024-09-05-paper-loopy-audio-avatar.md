---
title: "Paper summary: Loopy: Taming Audio-Driven Portrait Avatar with Long-Term Motion Dependency"
categories: ["papers"]
tags: ["genai", "video", "audio"]
summary: "Loopy is a video diffusion model that animates a portrait from audio alone, using long-term motion modules instead of the spatial motion templates other methods add to keep movement stable."
sources: 
  - title: "Loopy: Taming Audio-Driven Portrait Avatar with Long-Term Motion Dependency (arXiv:2409.02634)"
    url: "https://arxiv.org/abs/2409.02634"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:06.585Z"
  - title: "Hugging Face Daily Papers, 2024-09-05"
    url: "https://huggingface.co/papers?date=2024-09-05"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:58.006Z"
  - title: "Loopy: Taming Audio-Driven Portrait Avatar with Long-Term Motion Dependency (arXiv HTML full text)"
    url: "https://arxiv.org/html/2409.02634"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:06.585Z"
highlights: ["Other audio-driven avatar methods add spatial control signals for stability, which can make motion stiff.", "Loopy uses temporal modules that look across clips to learn natural long-term motion from the data."]
papers: 
  - title: "Loopy: Taming Audio-Driven Portrait Avatar with Long-Term Motion Dependency"
    authors: ["Jianwen Jiang", "Chao Liang", "Jiaqi Yang", "Gaojie Lin", "Tianyun Zhong", "Yanbo Zheng"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2409.02634"
    pdf: "https://arxiv.org/pdf/2409.02634v3"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Audio-driven portrait video generation"
  method: "End-to-end audio-only conditioned video diffusion with inter-/intra-clip temporal modules and an audio-to-latents module"
  data: "Portrait video datasets"
  result: "Outperforms recent audio-driven portrait diffusion models with more lifelike, high-quality results, per the authors"
draft: false
date: "2024-09-05"
---

## Problem

Diffusion models made audio-driven talking-portrait videos much more natural. But audio is only a weak control signal for body and head motion, so many methods add **spatial signals** (motion templates, constraints) to stabilise the movement. According to the authors, this can compromise how natural and free the motion is.

## Method

**Loopy** is conditioned on **audio only**. Two components help it learn natural motion from data:

- an **inter- and intra-clip temporal module**, which lets the model use **long-term motion** information across clips
- an **audio-to-latents module**, which improves the correlation between audio and portrait movement

This removes the need for manually specified spatial motion templates at inference.

## Key results

The abstract reports that Loopy outperforms recent audio-driven portrait diffusion methods, with more lifelike, high-quality results across scenarios.

## Limitations

There's no dedicated limitations section in the extracted text. Results are shown on portrait videos, and realistic avatar generation raises obvious misuse concerns (deepfakes).
