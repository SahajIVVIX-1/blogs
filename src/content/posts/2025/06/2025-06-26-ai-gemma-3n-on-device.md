---
title: "Gemma 3n: on-device multimodal models with \"effective\" sizes"
categories: ["ai"]
tags: ["llm", "on-device", "multimodal", "google"]
summary: "Gemma 3n arrived across open-source tools; its E2B and E4B models have 5B and 8B real parameters but need only 2B- and 4B-class memory, and accept image, audio, video and text."
sources: 
  - title: "Gemma 3n fully available in the open-source ecosystem!"
    url: "https://huggingface.co/blog/gemma3n"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["\"E2B\" means effective 2B: 5B real parameters, but a 2B-class memory footprint, running in about 2GB of GPU RAM.", "It takes image, text, audio and video, with a MobileNet-V5 vision encoder and an audio encoder."]
draft: false
date: "2025-06-26"
---

## What happened

**Gemma 3n**, previewed at Google I/O, became available across the main open-source tools: Transformers, timm, MLX, llama.cpp (text), transformers.js, Ollama and Google AI Edge.

## The technical details

From the post:

- two sizes, **`gemma-3n-E2B`** and **`gemma-3n-E4B`** (base and instruct). **E** stands for **effective**:
  - real parameter counts are **5B** and **8B**
  - thanks to memory-efficiency techniques, they need only about **2B / 4B** of VRAM, and run in about **2GB** and **3GB** of GPU RAM
- natively multimodal: **image, text, audio and video** inputs
- besides the language decoder, an **audio encoder** and a **MobileNet-V5** vision encoder

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemma 3n: on-device multimodal models with #quot;effective#quot; sizes"]):::title
    n1(["Hugging Face: Gemma 3n: on-device multimodal models with #quot;effective#quot; sizes"])
    n2["Gemma 3n arrived across open-source tools; its E2B and E4B models have 5B and 8B real parameters but need only…"]
    n6{"Fits production use?"}
    n7["Parameter count and memory use are no longer the same thing."]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: llm · on-device · multimodal · google"]
    subgraph G0["What it adds"]
        n3["two sizes, gemma-3n-E2B and gemma-3n-E4B (base and instruct). E stands for effective:"]
        n4["natively multimodal: image, text, audio and video inputs"]
        n5["besides the language decoder, an audio encoder and a MobileNet-V5 vision encoder"]
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

Parameter count and memory use are no longer the same thing. Models can now be designed specifically for phones and laptops, and the Gemma 4 posts later this year continue that line.
