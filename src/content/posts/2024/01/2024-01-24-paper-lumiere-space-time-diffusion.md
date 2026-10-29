---
title: "Paper summary: Lumiere: A Space-Time Diffusion Model for Video Generation"
categories: ["papers"]
tags: ["genai", "video", "diffusion"]
summary: "Lumiere generates the full duration of a video in one pass with a Space-Time U-Net that downsamples in both space and time, instead of generating keyframes and then filling in between."
sources: 
  - title: "Lumiere: A Space-Time Diffusion Model for Video Generation (arXiv:2401.12945)"
    url: "https://arxiv.org/abs/2401.12945"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:48.649Z"
  - title: "Hugging Face Daily Papers, 2024-01-24"
    url: "https://huggingface.co/papers?date=2024-01-24"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:40.817Z"
  - title: "Lumiere: A Space-Time Diffusion Model for Video Generation (arXiv HTML full text)"
    url: "https://arxiv.org/html/2401.12945"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:48.649Z"
highlights: ["Generating all frames at once, rather than keyframes plus temporal super-resolution, helps global motion stay coherent.", "The model reuses a pretrained text-to-image diffusion model and adds temporal down- and up-sampling."]
papers: 
  - title: "Lumiere: A Space-Time Diffusion Model for Video Generation"
    authors: ["Omer Bar-Tal", "Hila Chefer", "Omer Tov", "Charles Herrmann", "Roni Paiss", "Shiran Zada", "Ariel Ephrat", "Junhwa Hur", "Guanghui Liu", "Amit Raj", "Yuanzhen Li", "Michael Rubinstein", "Tomer Michaeli", "Oliver Wang", "Deqing Sun", "Tali Dekel", "Inbar Mosseri"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2401.12945"
    pdf: "https://arxiv.org/pdf/2401.12945v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Text-to-video generation with realistic, coherent motion"
  method: "Space-Time U-Net that processes the whole clip at multiple space-time scales; built on a pretrained text-to-image diffusion model"
  data: "Text-to-video and editing tasks (image-to-video, inpainting, stylisation)"
  result: "State-of-the-art text-to-video results, per the authors"
draft: false
date: "2024-01-24"
---

## Problem

Most video diffusion systems first generate **distant keyframes** and then fill in the frames between them with a cascade of **temporal super-resolution** models. The authors argue this makes **globally coherent motion** inherently hard, because no single model ever sees the whole clip.

## Method

Lumiere's **Space-Time U-Net** generates the **entire temporal duration** of a low-resolution, full-frame-rate video in **one pass**. It **downsamples and upsamples in time as well as space**, so the network processes the clip at several space-time scales. It builds on a **pretrained text-to-image diffusion model**, adding the temporal parts.

## Key results

The paper reports state-of-the-art text-to-video results. The same design also supports image-to-video, video inpainting and stylised generation.

## Limitations

There's no dedicated limitations section in the extracted text. The base model directly generates a *low-resolution* video, and the paper uses a spatial super-resolution stage on top of it to reach the final resolution.
