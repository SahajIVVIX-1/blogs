---
title: "DiffusionGemma: an open text-diffusion model with up to 4x faster generation"
categories: ["ai"]
tags: ["google-deepmind", "gemma", "diffusion", "text-generation", "open-models"]
summary: "Google DeepMind releases DiffusionGemma, an experimental open 26B mixture-of-experts model under Apache 2.0 that generates blocks of text in parallel for up to 4x faster inference on GPUs."
sources: 
  - title: "DiffusionGemma: 4x faster text generation"
    url: "https://deepmind.google/blog/diffusiongemma-4x-faster-text-generation/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:22.400Z"
highlights: ["It generates entire blocks of text at once instead of token by token.", "Autoregressive Gemma 4 models remain the standard for high-quality production output."]
draft: false
date: "2026-06-10"
---

## What happened

On 10 June 2026 **Google DeepMind** introduced **DiffusionGemma**, an experimental open model that explores text diffusion, released under an Apache 2.0 license. It is a **26B Mixture of Experts** model built on the Gemma 4 family and Gemini Diffusion research.

## The technical details

From the Google DeepMind post:

- **block-wise generation:** produces entire blocks of text simultaneously rather than sequential token-by-token decoding
- up to **4x faster text generation** on dedicated GPUs, using a novel **diffusion head**
- **shifts the decode bottleneck from memory bandwidth to compute**
- aimed at researchers and developers exploring speed-critical, interactive local workflows such as **in-line editing, rapid iteration and generating non-linear text structures**
- the post notes trade-offs: autoregressive Gemma 4 models remain the choice for high-quality production outputs

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["DiffusionGemma: an open text-diffusion model with up to 4x faster generation"]):::title
    n1(["Google DeepMind: DiffusionGemma: an open text-diffusion model with up to 4x faster…"])
    n2["Google DeepMind releases DiffusionGemma, an experimental open 26B mixture-of-experts model under Apache 2.0…"]
    n8{"Ready beyond the demo?"}
    n9["Autoregressive decoding is limited by memory bandwidth because each token needs a pass over the weights."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: google-deepmind · gemma · diffusion · text-generation"]
    subgraph G0["What it adds"]
        n3["block-wise generation: produces entire blocks of text simultaneously rather than sequential token-by-token…"]
        n4["up to 4x faster text generation on dedicated GPUs, using a novel diffusion head"]
        n5["shifts the decode bottleneck from memory bandwidth to compute"]
        n6["aimed at researchers and developers exploring speed-critical, interactive local workflows such as in-line…"]
        n7["the post notes trade-offs: autoregressive Gemma 4 models remain the choice for high-quality production outputs"]
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

Autoregressive decoding is limited by memory bandwidth because each token needs a pass over the weights. Diffusing blocks in parallel turns that into a compute-bound job, which is why it helps local interactive uses where latency dominates.
