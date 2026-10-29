---
title: "Paper summary: LCM-LoRA: A Universal Stable-Diffusion Acceleration Module"
categories: ["papers"]
tags: ["genai", "diffusion", "efficiency"]
summary: "LCM-LoRA packages latent-consistency distillation as a LoRA that plugs into Stable Diffusion models and their fine-tunes to generate images in very few steps without extra training."
sources: 
  - title: "LCM-LoRA: A Universal Stable-Diffusion Acceleration Module (arXiv:2311.05556)"
    url: "https://arxiv.org/abs/2311.05556"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:40.470Z"
  - title: "Hugging Face Daily Papers, 2023-11-10"
    url: "https://huggingface.co/papers?date=2023-11-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:55.196Z"
  - title: "LCM-LoRA: A Universal Stable-Diffusion Acceleration Module (arXiv HTML full text)"
    url: "https://arxiv.org/html/2311.05556"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:40.470Z"
  - title: "Code repository"
    url: "https://github.com/luosiallen/latent-consistency-model"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:38:40.470Z"
highlights: ["The LoRA weights learned during consistency distillation work as a reusable \"accelerator\" for other SD fine-tunes.", "The authors frame it as a plug-in neural solver for the diffusion probability-flow ODE."]
papers: 
  - title: "LCM-LoRA: A Universal Stable-Diffusion Acceleration Module"
    authors: ["Simian Luo", "Yiqin Tan", "Suraj Patil", "Daniel Gu", "Patrick von Platen", "Apolinário Passos", "Longbo Huang", "Jian Li", "Hang Zhao"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2311.05556"
    pdf: "https://arxiv.org/pdf/2311.05556v1"
    code: "https://github.com/luosiallen/latent-consistency-model"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Fast text-to-image generation with Stable Diffusion"
  method: "Latent consistency distillation done through LoRA; the resulting LoRA reused across SD-V1.5, SSD-1B, SDXL and their fine-tunes"
  data: "Stable Diffusion family models"
  result: "Few-step generation that plugs into fine-tuned SD models and LoRAs without training, per the authors"
draft: false
date: "2023-11-10"
---

## Problem

Diffusion models need many denoising steps per image. **Latent Consistency Models (LCMs)** cut this to a handful by distilling a pretrained latent diffusion model, and the report notes the distillation needs only about **32 A100 GPU hours**. But each LCM was tied to the model it was distilled from.

## Method

Two extensions:

1. Do the LCM distillation with **LoRA** (low-rank adapters) instead of full fine-tuning. This brings it to larger models (SD-V1.5, SSD-1B, SDXL) with much less memory.
2. Observe that the resulting LoRA parameters are a **universal acceleration module**, **LCM-LoRA**. It can be added to *other* fine-tuned Stable Diffusion models or combined with style LoRAs, without retraining.

The authors compare it to numerical solvers like DDIM and DPM-Solver. LCM-LoRA acts as a *learned* solver for the probability-flow ODE.

## Key results

The report shows few-step, high-quality generation across SD variants. It claims strong generalisation when plugging LCM-LoRA into fine-tuned models and LoRAs that weren't seen during distillation.

## Limitations

It's a short technical report without a dedicated limitations section, so the strength of the "universal" claim rests on the variants and examples shown in the report.
