---
title: "Inkling: a ~1T-parameter open multimodal model with 1M context"
categories: ["ai"]
tags: ["llm", "multimodal", "open-weights", "mixture-of-experts"]
summary: "Thinking Machines released Inkling on Hugging Face, a ~1T-parameter decoder-only multimodal MoE (41B active) that takes image, text and audio, has a 1M context, and was trained on 45T tokens; a smaller Inkling-Small followed."
sources: 
  - title: "Welcome Inkling by Thinking Machines"
    url: "https://huggingface.co/blog/thinkingmachines-inkling"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Per the Hugging Face post, it's the first large open model of about 1T parameters with a 1M context that natively accepts image, text and audio.", "It ships in BF16 and NVFP4, with speculative multi-token-prediction layers for faster inference."]
draft: false
date: "2026-07-15"
---

## What happened

**Thinking Machines Lab** released **Inkling** on Hugging Face, with day-zero support in Transformers, SGLang, vLLM and llama.cpp. A later update added **Inkling-Small**.

## The technical details

From the Hugging Face post:

- a **decoder-only multimodal Mixture-of-Experts** model with **975B total / 41B active** parameters
- natively takes **image, text and audio** inputs
- **1M-token** context
- trained on **45 trillion tokens** of text, images, audio and video
- intended for reasoning across modalities and for **domain adaptation via fine-tuning**
- released in **BF16** and a calibrated **NVFP4** variant, with **speculative MTP layers**
- **Inkling-Small**: 276B total / 12B active, same architecture, with MXFP8 and NVFP4 weights

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Inkling: a ~1T-parameter open multimodal model with 1M context"]):::title
    n1(["Hugging Face: Inkling: a ~1T-parameter open multimodal model with 1M context"])
    n2["Thinking Machines released Inkling on Hugging Face, a ~1T-parameter decoder-only multimodal MoE (41B active)…"]
    n9{"Ready beyond the demo?"}
    n10["It joins the trend of trillion-parameter open-weight MoEs (Kimi K3 is summarised here in July 2026), released…"]
    n11(["Track the rollout and follow-up releases"])
    n12["Topics: llm · multimodal · open-weights · mixture-of-experts"]
    subgraph G0["What it adds"]
        n3["a decoder-only multimodal Mixture-of-Experts model with 975B total / 41B active parameters"]
        n4["natively takes image, text and audio inputs"]
        n5["1M-token context"]
        n6["trained on 45 trillion tokens of text, images, audio and video"]
        n7["intended for reasoning across modalities and for domain adaptation via fine-tuning"]
        n8["released in BF16 and a calibrated NVFP4 variant, with speculative MTP layers"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n4 --> n5
    n2 --> n6
    n6 --> n7
    n7 --> n8
    n5 --> n9
    n8 --> n9
    n9 --> n10
    n10 --> n11
    n12 --> n2
    class n9 dec
    class n1,n11 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

It joins the trend of trillion-parameter open-weight MoEs (Kimi K3 is summarised here in July 2026), released already quantised, because that's the only practical way most people can run them.
