---
title: "Würstchen: diffusion in a 42× compressed latent space"
categories: ["ai"]
tags: ["genai", "diffusion", "efficiency"]
summary: "Würstchen is a text-to-image diffusion model whose text-conditional stage works in a latent space compressed 42× spatially, making training and inference much cheaper than Stable Diffusion."
sources: 
  - title: "Introducing Würstchen: Fast Diffusion for Image Generation"
    url: "https://huggingface.co/blog/wuerstchen"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:32.092Z"
  - title: "Pernias et al. (2023), Würstchen: An Efficient Architecture for Large-Scale Text-to-Image Diffusion Models"
    url: "https://arxiv.org/abs/2306.00637"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:07:34.525Z"
highlights: ["Common latent diffusion compresses images 4–8× spatially; Würstchen reaches 42× with a two-stage decoder.", "The announcement reports 9,000 GPU hours for v1, against 150,000 for Stable Diffusion 1.4."]
draft: false
date: "2023-09-13"
---

## What happened

**Würstchen**, a diffusion model for text-to-image generation, was integrated into Hugging Face Diffusers, with a blog post explaining its design.

## The technical details

The idea is extreme compression:

- typical latent diffusion uses about **4–8×** spatial compression. According to the post, common methods fail to reconstruct detailed images beyond 16×.
- Würstchen reaches **42×** with a two-stage **decoder**: **Stage A** (a VQGAN) and **Stage B** (a diffusion autoencoder)
- the text-conditional **Stage C** ("the Prior") is trained in that tiny latent space

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Würstchen: diffusion in a 42× compressed latent space"]):::title
    n1(["Hugging Face: Würstchen: diffusion in a 42× compressed latent space"])
    n2["Würstchen is a text-to-image diffusion model whose text-conditional stage works in a latent space compressed…"]
    n6{"Ready beyond the demo?"}
    n7["Working in a smaller latent space cuts cost."]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: genai · diffusion · efficiency"]
    subgraph G0["What it adds"]
        n3["typical latent diffusion uses about 4–8× spatial compression. According to the post, common methods fail to…"]
        n4["Würstchen reaches 42× with a two-stage decoder: Stage A (a VQGAN) and Stage B (a diffusion autoencoder)"]
        n5["the text-conditional Stage C (#quot;the Prior#quot;) is trained in that tiny latent space"]
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

Working in a smaller latent space cuts cost. The post reports:

- **v1** (512×512) trained in about **9,000 GPU hours**, versus **150,000** for Stable Diffusion 1.4, a 16× reduction
- **v2** used **24,602 GPU hours** for resolutions up to 1536, still about 6× cheaper than SD 1.4
- faster generation with less memory than SDXL

This is the same latent-diffusion idea as Stable Diffusion (my July 2026 study post traces SD's 48× smaller latent), pushed much further.
