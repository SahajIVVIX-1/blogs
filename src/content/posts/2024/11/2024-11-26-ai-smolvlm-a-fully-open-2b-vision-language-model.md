---
title: "SmolVLM: a fully open 2B vision-language model"
categories: ["ai"]
tags: ["hugging-face", "smolvlm", "vision-language", "small-models", "apache-2"]
summary: "Hugging Face releases SmolVLM, a 2B vision-language model described as state of the art for its memory footprint, with open checkpoints, datasets, training recipes and tools under Apache 2.0."
sources: 
  - title: "SmolVLM - small yet mighty Vision Language Model"
    url: "https://huggingface.co/blog/smolvlm"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:38.693Z"
highlights: ["Three checkpoints: SmolVLM-Base, SmolVLM-Synthetic and SmolVLM Instruct.", "Integrated into transformers, with a demo and a supervised fine-tuning script."]
draft: false
date: "2024-11-26"
---

## What happened

On 26 November 2024 **Hugging Face** introduced **SmolVLM**, a family of 2B vision-language models that can be used commercially and deployed on smaller local setups, with completely open training pipelines.

## The technical details

From the Hugging Face post:

- described as **SOTA for its memory footprint**: small, fast and memory-efficient
- all **checkpoints, VLM datasets, training recipes and tools** are released under **Apache 2.0**
- **SmolVLM-Base** for downstream fine-tuning, **SmolVLM-Synthetic** fine-tuned on synthetic data and **SmolVLM Instruct** for out-of-the-box interactive use
- the post situates it in a trend from scaling compute, to scaling data diversity with synthetic data, to **scaling down** for efficient local deployment

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["SmolVLM: a fully open 2B vision-language model"]):::title
    n1(["Hugging Face: SmolVLM: a fully open 2B vision-language model"])
    n2["Hugging Face releases SmolVLM, a 2B vision-language model described as state of the art for its memory…"]
    n7{"Available to me today?"}
    n8["Small open VLMs allow deployment in a browser or on edge devices, cut inference cost and let users customize."]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: hugging-face · smolvlm · vision-language · small-models"]
    subgraph G0["What it adds"]
        n3["described as SOTA for its memory footprint: small, fast and memory-efficient"]
        n4["all checkpoints, VLM datasets, training recipes and tools are released under Apache 2.0"]
        n5["SmolVLM-Base for downstream fine-tuning, SmolVLM-Synthetic fine-tuned on synthetic data and SmolVLM Instruct…"]
        n6["the post situates it in a trend from scaling compute, to scaling data diversity with synthetic data, to…"]
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

Small open VLMs allow deployment in a browser or on edge devices, cut inference cost and let users customize. The Apache 2.0 license on everything, including data and recipes, is what distinguishes it from models that release weights alone.
