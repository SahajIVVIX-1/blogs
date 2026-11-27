---
title: "StarCoder2 and The Stack v2: transparently trained open code models"
categories: ["ai"]
tags: ["bigcode", "starcoder2", "the-stack-v2", "code-llm", "open-source"]
summary: "BigCode releases StarCoder2 (3B, 7B and 15B) trained on The Stack v2, publishing the models, datasets, processing and training code."
sources: 
  - title: "StarCoder2 and The Stack v2"
    url: "https://huggingface.co/blog/starcoder2"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:36.097Z"
highlights: ["StarCoder2-15B was trained on over 4 trillion tokens across 600+ programming languages.", "StarCoder2-15B is described as best in its size class and matching 33B+ models on many evaluations."]
draft: false
date: "2024-02-28"
---

## What happened

On 28 February 2024 **BigCode** released **StarCoder2**, the next generation of transparently trained open code LLMs, trained on **The Stack v2**, a new large, high-quality code dataset. All models, datasets, processing and training code were released.

## The technical details

From the Hugging Face post:

- three sizes: **3B** (trained by ServiceNow), **7B** (Hugging Face) and **15B** (NVIDIA, using NeMo on NVIDIA infrastructure)
- **StarCoder2-15B:** 4+ trillion tokens and **600+ languages**; the 3B and 7B models use 17 languages and 3+ and 3.5+ trillion tokens
- architecture: **Grouped Query Attention**, a **16,384-token** context with **4,096-token sliding-window attention**, trained with the **Fill-in-the-Middle** objective
- StarCoder2-15B matches **33B+ models** on many evaluations, and StarCoder2-3B matches the earlier StarCoder1-15B

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["StarCoder2 and The Stack v2: transparently trained open code models"]):::title
    n1(["Hugging Face: StarCoder2 and The Stack v2: transparently trained open code models"])
    n2["BigCode releases StarCoder2 (3B, 7B and 15B) trained on The Stack v2, publishing the models, datasets…"]
    n7{"Available to me today?"}
    n8["The distinguishing word is transparent: data, processing pipeline and training code are all released, which lets…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: bigcode · starcoder2 · the-stack-v2 · code-llm"]
    subgraph G0["What it adds"]
        n3["three sizes: 3B (trained by ServiceNow), 7B (Hugging Face) and 15B (NVIDIA, using NeMo on NVIDIA infrastructure)"]
        n4["StarCoder2-15B: 4+ trillion tokens and 600+ languages; the 3B and 7B models use 17 languages and 3+ and 3.5+…"]
        n5["architecture: Grouped Query Attention, a 16,384-token context with 4,096-token sliding-window attention…"]
        n6["StarCoder2-15B matches 33B+ models on many evaluations, and StarCoder2-3B matches the earlier StarCoder1-15B"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n2 --> n5
    n5 --> n6
    n4 --> n7
    n6 --> n7
    n7 --> n8
    n8 --> n9
    n10 --> n2
    class n7 dec
    class n1,n9 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

The distinguishing word is transparent: data, processing pipeline and training code are all released, which lets others reproduce or audit the model, not just use it. Sliding-window attention inside a 16K context is also a design that later open models adopted.
