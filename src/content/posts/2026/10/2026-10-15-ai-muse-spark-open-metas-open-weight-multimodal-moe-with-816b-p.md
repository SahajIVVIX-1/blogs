---
title: "Muse Spark Open: Meta's open-weight multimodal MoE with 816B parameters"
categories: ["ai"]
tags: ["meta", "muse-spark-open", "moe", "multimodal", "open-weights"]
summary: "Hugging Face welcomes Muse Spark Open, Meta's open-weight mixture-of-experts model with about 816 billion parameters (42 billion active), 1M-token context and text, image, audio and video input."
sources: 
  - title: "Welcome Muse Spark Open: open-weight frontier multimodal mixture-of-experts model from Meta"
    url: "https://huggingface.co/blog/meta-muse-spark-open"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:43.681Z"
highlights: ["It takes text, images, audio and video as input and generates text, trained for agentic coding.", "The post calls it the most capable US open-weights model to date."]
draft: false
date: "2026-10-15"
---

## What happened

On 15 October 2026 **Hugging Face** published its guide to **Muse Spark Open**, an open-weight model from **Meta**, following the smaller dense Muse Glimmer released in August.

## The technical details

From the Hugging Face post:

- **mixture of experts**, about **816B parameters in total and around 42B active per token**, with a context window of up to **1 million tokens**
- inputs: **text, images, audio and video**; output: text, giving developers a common interface for asking about different kinds of input
- Meta describes it as **coding-optimized**, trained on real developer workflows such as multi-file refactors and long debugging sessions, and **agentic**: it plans, acts, observes and self-corrects over long tasks, including browsing the web with images
- checkpoints: `Muse-Spark-Open-816B-A42B` and an `-NVFP4` variant
- the post covers how to run it, fine-tune it and what Hugging Face built with it

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Muse Spark Open: Meta's open-weight multimodal MoE with 816B parameters"]):::title
    n1(["Hugging Face: Muse Spark Open: Meta's open-weight multimodal MoE with 816B…"])
    n2["Hugging Face welcomes Muse Spark Open, Meta's open-weight mixture-of-experts model with about 816 billion…"]
    n8{"Fits production use?"}
    n9["This is Meta moving its open-weight line from a small dense model (Glimmer) to a large mixture of experts."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: meta · muse-spark-open · moe · multimodal"]
    subgraph G0["What it adds"]
        n3["mixture of experts, about 816B parameters in total and around 42B active per token, with a context window of…"]
        n4["inputs: text, images, audio and video; output: text, giving developers a common interface for asking about…"]
        n5["Meta describes it as coding-optimized, trained on real developer workflows such as multi-file refactors and…"]
        n6["checkpoints: Muse-Spark-Open-816B-A42B and an -NVFP4 variant"]
        n7["the post covers how to run it, fine-tune it and what Hugging Face built with it"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
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

This is Meta moving its open-weight line from a small dense model (Glimmer) to a large mixture of experts. The claim of being the most capable US open-weights model is Hugging Face's wording and depends on which models are compared.
