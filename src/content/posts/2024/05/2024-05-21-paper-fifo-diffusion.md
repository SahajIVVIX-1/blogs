---
title: "Paper summary: FIFO-Diffusion: Generating Infinite Videos from Text without Training"
categories: ["papers"]
tags: ["genai", "video", "diffusion"]
summary: "FIFO-Diffusion generates arbitrarily long videos from a pretrained text-to-video diffusion model, with no extra training, by denoising a queue of frames at increasing noise levels."
sources: 
  - title: "FIFO-Diffusion: Generating Infinite Videos from Text without Training (arXiv:2405.11473)"
    url: "https://arxiv.org/abs/2405.11473"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:34.250Z"
  - title: "Hugging Face Daily Papers, 2024-05-21"
    url: "https://huggingface.co/papers?date=2024-05-21"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:52.660Z"
  - title: "FIFO-Diffusion: Generating Infinite Videos from Text without Training (arXiv HTML full text)"
    url: "https://arxiv.org/html/2405.11473"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:34.250Z"
highlights: ["Frames sit in a queue with increasing noise from head to tail; each step a clean frame leaves the head and a fresh noise frame joins the tail.", "Memory stays constant however long the video gets."]
papers: 
  - title: "FIFO-Diffusion: Generating Infinite Videos from Text without Training"
    authors: ["Jihwan Kim", "Junoh Kang", "Jinyoung Choi", "Bohyung Han"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2405.11473"
    pdf: "https://arxiv.org/pdf/2405.11473v4"
    license: "http://creativecommons.org/licenses/by-nc-sa/4.0/"
card: 
  task: "Long text-to-video generation without retraining"
  method: "Diagonal denoising over a frame queue, plus latent partitioning and lookahead denoising"
  data: "Pretrained text-to-video diffusion models"
  result: "Conceptually infinite videos with constant memory, parallelisable across GPUs, per the abstract"
draft: false
date: "2024-05-21"
---

## Problem

Text-to-video diffusion models are trained to produce short clips of fixed length. Making long videos usually needs extra training or stitching tricks.

## Method

**FIFO-Diffusion** is purely an inference technique:

- **Diagonal denoising**: keep a **queue** of consecutive frames at *increasing* noise levels. Each step denoises all of them a little, **dequeues** the fully clean frame at the head, and **enqueues** a new pure-noise frame at the tail. The video can go on indefinitely.
- That creates a mismatch with training, where all frames share one noise level. **Latent partitioning** narrows this gap, and **lookahead denoising** lets noisier frames benefit from cleaner frames ahead of them.

## Key results

According to the abstract, the method generates conceptually infinite videos **without additional training**, uses a **constant amount of memory** regardless of length, and is well suited to **parallel inference** on multiple GPUs.

## Limitations

The extracted text has no dedicated limitations section. The approach depends on the quality of the underlying pretrained video model, and the authors themselves describe diagonal denoising as a double-edged sword because of the training–inference discrepancy.
