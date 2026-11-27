---
title: "Inkling 2 Mini: a looped transformer that reuses its middle layers three times"
categories: ["ai"]
tags: ["thinking-machines-lab", "inkling", "looped-transformer", "moe", "local-ai"]
summary: "Hugging Face welcomes Inkling 2 Mini, a looped-transformer multimodal mixture-of-experts (about 26B total, 3B active) that runs 24 physical layers as 48 logical ones and supports a 1M-token context."
sources: 
  - title: "Welcome Inkling 2 Mini, Cutting-edge Performance for your Local Setup"
    url: "https://huggingface.co/blog/inkling2mini"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:44.020Z"
highlights: ["The 12 middle layers run three times in a loop, so 24 physical layers act like 48 (6 + 3x12 + 6).", "Support ships in transformers, llama.cpp and MLX, with day-zero SGLang inference."]
draft: false
date: "2026-11-20"
---

## What happened

On 20 November 2026 **Hugging Face** published its guide to **Inkling 2 Mini** from **Thinking Machines Lab**, a small model designed for local AI setups. In Hugging Face's vibe tests it was at least comparable with Qwen 3.8 27B, though the post says more validation is needed.

## The technical details

From the Hugging Face post:

- **multimodal MoE:** about **26B total and 3B active parameters per token**, accepting images and text, with a **1M-token context**
- **looped design:** 24 decoder layers where the **12 middle layers repeat three times**, so each token makes 48 layer visits with half the physical layers; hidden size is 2,304 versus 4,608 in Inkling 2 Small
- **mixed-precision release** with **NVFP4 and MXFP8 expert weights**, plus a **DSpark drafter** for speed-up at a small memory cost
- support: **transformers, llama.cpp and MLX**, and **SGLang** day-zero inference for datacenter deployment

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Inkling 2 Mini: a looped transformer that reuses its middle layers three times"]):::title
    n1(["Hugging Face: Inkling 2 Mini: a looped transformer that reuses its middle layers…"])
    n2["Hugging Face welcomes Inkling 2 Mini, a looped-transformer multimodal mixture-of-experts (about 26B total, 3B…"]
    n7{"Ready beyond the demo?"}
    n8["Looping layers increases effective depth without increasing stored weights, which suits memory-limited local…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: thinking-machines-lab · inkling · looped-transformer · moe"]
    subgraph G0["What it adds"]
        n3["multimodal MoE: about 26B total and 3B active parameters per token, accepting images and text, with a 1M-token…"]
        n4["looped design: 24 decoder layers where the 12 middle layers repeat three times, so each token makes 48 layer…"]
        n5["mixed-precision release with NVFP4 and MXFP8 expert weights, plus a DSpark drafter for speed-up at a small…"]
        n6["support: transformers, llama.cpp and MLX, and SGLang day-zero inference for datacenter deployment"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n7
    n4 --> n7
    n5 --> n7
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

Looping layers increases effective depth without increasing stored weights, which suits memory-limited local hardware. It is a different route to capacity than adding experts, and the 48-visit count is what to compare against ordinary models.
