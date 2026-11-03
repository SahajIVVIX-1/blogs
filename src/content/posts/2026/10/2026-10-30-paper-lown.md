---
title: "Paper summary: Look Only When Needed: Certificate-Guided Visual Routing for Efficient Diffusion VLMs"
categories: ["papers"]
tags: ["diffusion", "multimodal", "vlms", "efficiency"]
summary: "Cho et al. propose LOWN, a training-free decoding strategy for diffusion vision-language models that adaptively determines when to process visual tokens, preserving 99.6% performance while slashing decoding FLOPs to 35.3%."
sources: 
  - title: "Look Only When Needed: Certificate-Guided Visual Routing for Efficient Diffusion VLMs"
    url: "https://arxiv.org/abs/2610.36671"
    publisher: "arXiv"
    fetched_at: "2026-11-03T03:12:43.409Z"
  - title: "Hugging Face Daily Papers, 2026-10-30"
    url: "https://huggingface.co/papers?date=2026-10-30"
    publisher: "Hugging Face"
    fetched_at: "2026-11-03T03:12:43.409Z"
papers: 
  - title: "Look Only When Needed: Certificate-Guided Visual Routing for Efficient Diffusion VLMs"
    authors: ["Donghyeon Cho", "Joowon Kim", "Seungho Shin", "Eunho Yang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2610.36671"
    pdf: "https://arxiv.org/pdf/2610.36671v1"
    code: "https://github.com/hyeon9698/LOWN"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card:
  task: "Efficient visual token routing for diffusion vision-language models"
  method: "Adaptive certificate-guided decoding comparing image-conditioned and image-free predictions"
  data: "10 standard VLM benchmarks including MathVista, ScienceQA, and ChartQA"
  result: "Retains 99.6% benchmark score with only 35.3% decoding FLOPs"
highlights:
  - "Visual tokens account for 89% to 97% of total sequence length in diffusion VLMs, causing massive repeated computation at each denoising step."
  - "LOWN adaptively certifies and reuses visual representations without training or hyperparameter threshold tuning."
  - "Orthogonally composes with spatial token pruning and KV caching for compound latency improvements."
draft: false
date: "2026-10-30"
---

## Problem

Diffusion vision-language models (DVLMs), such as LLaDA-V, generate responses through an iterative unmasking/denoising procedure across multiple discrete diffusion steps. In typical multimodal evaluation tasks, visual tokens constitute **89% to 97%** of the total sequence length. Consequently, virtually all decoding compute is squandered repeatedly processing invariant visual patch tokens at every single generation timestep.

Existing pruning solutions statically drop visual tokens based on attention scores, which irreversibly discards fine-grained image details and still requires running the remaining tokens through transformer layers at every step. Cho et al. measure how frequently the visual input actually alters the model's token prediction: remarkably, removing the image shifts the unmasked token at **only 22.8% of decoding steps on average**, and as few as **7.9%** on text-heavy reasoning tasks.

## Method

The authors propose **LOWN** (*Look Only When Needed*), an adaptive decoding mechanism that requires zero fine-tuning:

1. **Prediction Without Vision**: At decoding step $t$, the DVLM first predicts masked tokens using only the accumulated text context, bypassing visual attention blocks entirely.
2. **Disagreement Triggering**: The unconditioned prediction is compared against the most recent image-conditioned prediction. If predictions agree, the prior visual representation is certified for reuse, saving forward pass compute.
3. **Adaptive Token Unmasking**: The number of mutually agreed tokens determines the step's unmasking budget, dynamically accelerating decoding during predictable output segments.

```text
  [Step t: Masked Sequence]
             │
             ▼
    [Text-Only Fast Pass]
             │
             ├──────────────────────────┐
             ▼                          ▼
      [Agreement Check]          [Disagreement Detected]
      Prior Certified?           Route Visual Tokens
             │                          │
             ▼                          ▼
      Skip Image Layers          Full Multi-Modal Pass
      (64.7% FLOP Savings)       Update Certified State
```

## Key Results

- **Compute Efficiency**: LOWN slashes decoding compute down to **35.3% of baseline FLOPs** on average across ten vision-language benchmarks.
- **Accuracy Retention**: On benchmarks including ScienceQA, MathVista, and ChartQA, LOWN maintains **99.6%** of the full unpruned LLaDA-V baseline accuracy.
- **Orthogonal Composition**: When paired with spatial token pruning and KV caching, throughput increases further without degradation.

## Limitations

The certificate check requires storing the previous step's hidden logits in GPU memory, introducing a modest memory overhead. In domains demanding extreme spatial precision (e.g. fine-grained visual coordinate grounding), agreement rates drop, reducing FLOP savings.

