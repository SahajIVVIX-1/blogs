---
title: "Stable Diffusion 3 arrives in Diffusers: three text encoders and MMDiT"
categories: ["ai"]
tags: ["stability-ai", "stable-diffusion-3", "diffusers", "mmdit", "diffusion"]
summary: "Stable Diffusion 3 Medium (2B parameters) becomes available on the Hugging Face Hub and in Diffusers, with training scripts and memory and speed optimizations."
sources: 
  - title: "Diffusers welcomes Stable Diffusion 3"
    url: "https://huggingface.co/blog/sd3"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:37.250Z"
highlights: ["SD3 pairs three text encoders (CLIP L/14, OpenCLIP bigG/14 and T5-v1.1-XXL) with a Multimodal Diffusion Transformer.", "Diffusers ships Dreambooth and LoRA training scripts for SD3."]
draft: false
date: "2024-06-12"
---

## What happened

On 12 June 2024 **Hugging Face** announced that **Stable Diffusion 3** (Stability AI's latest Stable Diffusion model) is available on the Hub and usable with **Diffusers**. The model released that day is **Stable Diffusion 3 Medium**, with **2B parameters**.

## The technical details

From the Hugging Face post:

- a **latent diffusion** model with **three text encoders** (CLIP L/14, OpenCLIP bigG/14 and T5-v1.1-XXL), a new **Multimodal Diffusion Transformer (MMDiT)** and a **16-channel autoencoder** similar to SDXL's
- text and pixel latents are processed as a sequence of embeddings; **MMDiT blocks use two separate sets of weights** to embed text and image sequences, then join them for attention
- Diffusers support includes **Dreambooth and LoRA training scripts**, plus **memory optimizations** to run on a range of hardware and **performance optimizations**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Stable Diffusion 3 arrives in Diffusers: three text encoders and MMDiT"]):::title
    n1(["Hugging Face: Stable Diffusion 3 arrives in Diffusers: three text encoders and MMDiT"])
    n2["Stable Diffusion 3 Medium (2B parameters) becomes available on the Hugging Face Hub and in Diffusers, with…"]
    n6{"Available to me today?"}
    n7["Moving from a U-Net to a transformer with separate text and image weights is the architectural shift here, and the…"]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: stability-ai · stable-diffusion-3 · diffusers · mmdit"]
    subgraph G0["What it adds"]
        n3["a latent diffusion model with three text encoders (CLIP L/14, OpenCLIP bigG/14 and T5-v1.1-XXL), a new…"]
        n4["text and pixel latents are processed as a sequence of embeddings; MMDiT blocks use two separate sets of…"]
        n5["Diffusers support includes Dreambooth and LoRA training scripts, plus memory optimizations to run on a range…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n6
    n4 --> n6
    n5 --> n6
    n6 --> n7
    n7 --> n8
    n9 --> n2
    class n6 dec
    class n1,n8 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

Moving from a U-Net to a transformer with separate text and image weights is the architectural shift here, and the memory optimizations matter because three text encoders make the model heavy for consumer GPUs.
