---
title: "Google releases Gemma, open models based on Gemini"
categories: ["ai"]
tags: ["llm", "open-weights", "google"]
summary: "Google released Gemma, open LLMs in 2B and 7B sizes (base and instruction-tuned) with an 8K context, built from Gemini research, with day-one Hugging Face support."
sources: 
  - title: "Welcome Gemma - Google's new open LLM"
    url: "https://huggingface.co/blog/gemma"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:11:47.073Z"
  - title: "Transformers v4.38.0 release notes"
    url: "https://github.com/huggingface/transformers/releases/tag/v4.38.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Two sizes: 7B for consumer GPUs and TPUs, and 2B for CPU and on-device use.", "All four variants run on consumer hardware without quantisation, per the announcement."]
draft: false
date: "2024-02-21"
---

## What happened

**Google** released **Gemma**, a family of open LLMs. Hugging Face announced the integration: models on the Hub, Transformers v4.38, Google Cloud and Inference Endpoints, and a single-GPU fine-tuning example with TRL.

## The technical details

From the Hugging Face post:

- **two sizes**: **7B** (efficient on consumer GPUs and TPUs) and **2B** (CPU and on-device)
- each with **base** and **instruction-tuned** versions: four models in total
- **8K-token** context
- based on technology from **Gemini**
- all variants can run on consumer hardware **without quantisation**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Google releases Gemma, open models based on Gemini"]):::title
    n1(["Hugging Face: Google releases Gemma, open models based on Gemini"])
    n2["Google released Gemma, open LLMs in 2B and 7B sizes (base and instruction-tuned) with an 8K context, built…"]
    n8{"Available to me today?"}
    n9["A major lab releasing open weights in small sizes was a big deal for local and on-device use."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: llm · open-weights · google"]
    subgraph G0["What it adds"]
        n3["two sizes: 7B (efficient on consumer GPUs and TPUs) and 2B (CPU and on-device)"]
        n4["each with base and instruction-tuned versions: four models in total"]
        n5["8K-token context"]
        n6["based on technology from Gemini"]
        n7["all variants can run on consumer hardware without quantisation"]
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

A major lab releasing open weights in small sizes was a big deal for local and on-device use. Gemma later grew into several generations (Gemma 2, 3, 3n and 4 appear in later posts here).
