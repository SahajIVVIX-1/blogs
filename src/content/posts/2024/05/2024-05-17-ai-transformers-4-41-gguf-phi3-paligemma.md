---
title: "Transformers 4.41: GGUF support, Phi-3, PaliGemma"
categories: ["ai"]
tags: ["hugging-face", "transformers", "release"]
summary: "Transformers v4.41 added Phi-3 (with 128K-context variants), the JetMoE mixture-of-experts model, Google's PaliGemma vision-language model and GGUF loading support."
sources: 
  - title: "Transformers v4.41.0 release notes"
    url: "https://github.com/huggingface/transformers/releases/tag/v4.41.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:16:13.053Z"
  - title: "Abdin et al. (2024), Phi-3 Technical Report"
    url: "https://arxiv.org/abs/2404.14219"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:16:14.565Z"
highlights: ["Phi-3-mini comes in 4K and 128K context versions; the release notes call it the first in its class to reach 128K with little quality loss.", "JetMoE uses mixtures of both attention heads and MLP experts."]
draft: false
date: "2024-05-17"
---

## What happened

**Transformers v4.41.0** added several models and GGUF support.

## The technical details

From the release notes:

- **Phi-3** (Microsoft), with new RoPE scaling methods. Phi-3-mini comes in **4K and 128K** context variants, described as the first in its class to support 128K tokens with little impact on quality. The technical report is summarised here on 23 April 2024.
- **JetMoE-8B**: an MoE model where each block has **two MoE layers**, a mixture of attention heads and a mixture of MLP experts. The notes report training throughput around 100B tokens per day on 96 H100s.
- **PaliGemma**: a lightweight open VLM inspired by PaLI-3, built from open components such as the **SigLIP** vision model.
- **GGUF** loading support, plus VideoLlava, Falcon2 and FalconVLM.

## Why it matters

GGUF is the file format of the llama.cpp ecosystem for quantised local models. Loading it in Transformers connects the two worlds. PaliGemma grew into PaliGemma 2 (summarised here in Dec 2024).
