---
title: "FLUX.2 in Diffusers: a new open image model with a single Mistral text encoder"
categories: ["ai"]
tags: ["black-forest-labs", "flux-2", "diffusers", "image-generation", "mm-dit"]
summary: "Hugging Face welcomes FLUX.2, Black Forest Labs' new open image generation and editing model, an entirely new architecture pre-trained from scratch rather than a FLUX.1 update."
sources: 
  - title: "Diffusers welcomes FLUX-2"
    url: "https://huggingface.co/blog/flux-2"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:40.977Z"
highlights: ["It uses a single text encoder, Mistral Small 3.1, instead of the two used in FLUX.1.", "It accepts multiple reference images and supports image-guided and text-guided generation."]
draft: false
date: "2025-11-25"
---

## What happened

On 25 November 2025 **Hugging Face** published its guide to **FLUX.2**, the new series of image generation models from **Black Forest Labs**. The post stresses that FLUX.2 is not a drop-in replacement for FLUX.1: it is a new model with a new architecture and pre-training done from scratch.

## The technical details

From the Hugging Face post:

- supports **image-guided and text-guided generation and editing**, and can take **multiple reference images**
- **text encoder:** a single **Mistral Small 3.1** replaces the two encoders of FLUX.1, simplifying prompt embedding; max sequence length 512
- prompt embeddings **stack outputs from intermediate layers** instead of a single layer's output
- the same general **MM-DiT plus parallel DiT** architecture as FLUX.1, where image latents and text are processed in separate streams and joined only for attention
- the post also covers inference under various setups and LoRA fine-tuning in Diffusers

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["FLUX.2 in Diffusers: a new open image model with a single Mistral text encoder"]):::title
    n1(["Hugging Face: FLUX.2 in Diffusers: a new open image model with a single Mistral…"])
    n2["Hugging Face welcomes FLUX.2, Black Forest Labs' new open image generation and editing model, an entirely new…"]
    n8{"Ready beyond the demo?"}
    n9["Replacing two text encoders with one decoder-style language model and using intermediate-layer features is a trend…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: black-forest-labs · flux-2 · diffusers · image-generation"]
    subgraph G0["What it adds"]
        n3["supports image-guided and text-guided generation and editing, and can take multiple reference images"]
        n4["text encoder: a single Mistral Small 3.1 replaces the two encoders of FLUX.1, simplifying prompt embedding…"]
        n5["prompt embeddings stack outputs from intermediate layers instead of a single layer's output"]
        n6["the same general MM-DiT plus parallel DiT architecture as FLUX.1, where image latents and text are processed…"]
        n7["the post also covers inference under various setups and LoRA fine-tuning in Diffusers"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n4 --> n5
    n2 --> n6
    n6 --> n7
    n5 --> n8
    n7 --> n8
    n8 --> n9
    n9 --> n10
    n11 --> n2
    class n8 dec
    class n1,n10 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

Replacing two text encoders with one decoder-style language model and using intermediate-layer features is a trend visible across recent open image models, because it makes prompts richer without an extra encoder to manage.
