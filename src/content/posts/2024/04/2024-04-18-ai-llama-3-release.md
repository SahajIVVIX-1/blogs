---
title: "Meta releases Llama 3 (8B and 70B)"
categories: ["ai"]
tags: ["llm", "open-weights", "meta"]
summary: "Meta released Llama 3 in 8B and 70B sizes, base and instruct, plus Llama Guard 2 for safety classification, with an 8K context and day-one Hugging Face support."
sources: 
  - title: "Welcome Llama 3 - Meta's new open LLM"
    url: "https://huggingface.co/blog/llama3"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:14:15.084Z"
  - title: "Transformers v4.40.0 release notes"
    url: "https://github.com/huggingface/transformers/releases/tag/v4.40.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:15:08.976Z"
highlights: ["Two sizes: 8B for consumer GPUs and 70B for large-scale applications.", "Llama Guard 2, a safety classifier fine-tuned from Llama 3 8B, came alongside."]
draft: false
date: "2024-04-18"
---

## What happened

**Meta** released **Llama 3**, and Hugging Face integrated it: models on the Hub, Transformers support, HuggingChat for the 70B instruct model, deployment on Inference Endpoints, Google Cloud and SageMaker, and a single-GPU fine-tuning example.

## The technical details

From the Hugging Face post:

- four models based on the **Llama 2 architecture**: **8B** and **70B**, each **base** and **instruct**
- **8K-token** context
- **Llama Guard 2**: a safety model fine-tuned from Llama 3 8B, to classify inputs and outputs
- all variants run on various kinds of consumer hardware

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Meta releases Llama 3 (8B and 70B)"]):::title
    n1(["Hugging Face: Meta releases Llama 3 (8B and 70B)"])
    n2["Meta released Llama 3 in 8B and 70B sizes, base and instruct, plus Llama Guard 2 for safety classification…"]
    n7{"Fits production use?"}
    n8["Llama 3 became a common base for open fine-tunes."]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: llm · open-weights · meta"]
    subgraph G0["What it adds"]
        n3["four models based on the Llama 2 architecture: 8B and 70B, each base and instruct"]
        n4["8K-token context"]
        n5["Llama Guard 2: a safety model fine-tuned from Llama 3 8B, to classify inputs and outputs"]
        n6["all variants run on various kinds of consumer hardware"]
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

Llama 3 became a common base for open fine-tunes. Several papers summarised on this blog build on it, for example the trust-region alignment work (April 2024) and Instruction Pre-Training (June 2024).
