---
title: "Paper summary: FrameForge: Harnessing Priors of Video Foundation Models for Unified Image Generation"
categories: ["papers"]
tags: ["diffusion", "video-models", "generative-ai", "image-generation"]
summary: "Lin et al. introduce FrameForge, a framework leveraging pretrained video foundation models for unified conditional image generation via input-adaptive virtual temporal relations and latent intermediate reasoning."
sources: 
  - title: "FrameForge: Harnessing Priors of Video Foundation Models for Unified Image Generation"
    url: "https://arxiv.org/abs/2610.36545"
    publisher: "arXiv"
    fetched_at: "2026-11-03T03:12:49.391Z"
  - title: "Hugging Face Daily Papers, 2026-11-02"
    url: "https://huggingface.co/papers?date=2026-11-02"
    publisher: "Hugging Face"
    fetched_at: "2026-11-03T03:12:49.391Z"
papers: 
  - title: "FrameForge: Harnessing Priors of Video Foundation Models for Unified Image Generation"
    authors: ["Yijing Lin", "Zhendong Mao", "Mengqi Huang", "Yuxin Wang", "Yongdong Zhang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2610.36545"
    pdf: "https://arxiv.org/pdf/2610.36545v1"
    code: "https://github.com/Lyne1/FrameForge"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card:
  task: "Unified conditional image generation and editing using video foundation models"
  method: "Mixture of Temporal Experts (MoTE) and Chain of Temporal Reasoning (CoTR)"
  data: "DreamBench, COCO2017, and GEdit-Bench"
  result: "State-of-the-art subject-driven generation, Canny-to-image synthesis, and instruction editing"
highlights:
  - "Repurposes video foundation model temporal priors by conceptualizing conditioning as virtual time transitions."
  - "Mixture of Temporal Experts (MoTE) dynamically calibrates temporal rotary position embeddings (RoPE) based on condition-target divergence."
  - "Chain of Temporal Reasoning (CoTR) enforces structured latent transformations via bottlenecked self-attention."
draft: false
date: "2026-11-02"
---

## Problem

Unified conditional image generation requires a single foundation model to support diverse vision synthesis tasks—ranging from subject-driven personalization and structural Canny-edge conditioning to natural language instruction editing. While pretrained video foundation models inherently understand temporal transformations, existing video-to-image adaptation methods rigidly bind condition and target images to fixed frame indices (e.g. frame 0 and frame 1).

However, different conditional tasks require vastly different degrees of transformation: replacing an object demands a long semantic leap, whereas edge-guided rendering requires strict spatial preservation. Fixed temporal indexing fails to accommodate these differing scales of visual divergence.

## Method

Lin et al. present **FrameForge**, modeling conditional image generation through input-adaptive *virtual temporal relationships*:

1. **Mixture of Temporal Experts (MoTE)**: Rather than assigning fixed frame delta $\Delta t = 1$, MoTE dynamically routes the condition-target pair across a bank of temporal Rotary Position Embedding (RoPE) experts with varying virtual intervals.
2. **Chain of Temporal Reasoning (CoTR)**: Introduces a latent intermediate transition state between the input condition and the generated output, enforcing attention bottleneck masks that compel the diffusion backbone to propagate information along a structured visual reasoning pathway.

```text
  [Condition Image x_cond]
             │
             ▼
  ┌───────────────────────────────────────────────┐
  │ Mixture of Temporal Experts (MoTE Router)     │
  │ -> Selects Virtual Temporal Interval (Δt)     │
  └───────────────────────────────────────────────┘
             │
             ▼
  ┌───────────────────────────────────────────────┐
  │ Chain of Temporal Reasoning (CoTR Bottleneck) │
  │ x_cond ──> [Latent State z_mid] ──> x_target  │
  └───────────────────────────────────────────────┘
             │
             ▼
  [Generated Output Image x_target]
```

## Key Results

- **Benchmark Superiority**: Evaluated across DreamBench (subject identity preservation), COCO2017 (structure-guided synthesis), and GEdit-Bench (instruction-based editing), FrameForge consistently outperforms OmniGen and IP-Adapter.
- **Identity Fidelity**: Achieves higher DINO and CLIP-I alignment scores while maintaining prompt adherence.
- **Cross-Task Generalization**: A single unified checkpoint handles image editing, style transfer, and sketch-to-image synthesis without task-specific LoRA adapters.

## Limitations

Introducing the intermediate latent reasoning token increases peak GPU VRAM allocation during the diffusion reverse process by approximately 18% compared to standard single-frame diffusion passes.

