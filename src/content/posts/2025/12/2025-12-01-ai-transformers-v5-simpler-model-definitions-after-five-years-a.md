---
title: "Transformers v5: simpler model definitions after five years and 1.2 billion installs"
categories: ["ai"]
tags: ["hugging-face", "transformers", "v5", "open-source", "model-definitions"]
summary: "Hugging Face launches Transformers v5, five years after v4, citing 3 million daily installs, over 400 model architectures and more than 750,000 compatible checkpoints, with a focus on simplicity, training, inference and production."
sources: 
  - title: "Transformers v5: Simple model definitions powering the AI ecosystem"
    url: "https://huggingface.co/blog/transformers-v5"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:41.577Z"
highlights: ["Installs grew from 20,000 a day in v4 to more than 3 million a day, passing 1.2 billion in total.", "Architectures grew from 40 in v4 to over 400, and compatible Hub checkpoints from about 1,000 to more than 750,000."]
draft: false
date: "2025-12-01"
---

## What happened

On 1 December 2025 **Hugging Face** announced **Transformers v5** (a release candidate, v5.0.0rc-0), five years after the first v4 release candidate on 19 November 2020. The post argues that reinvention is key for longevity in AI.

## The technical details

From the Hugging Face post:

- **scale of use:** over 3 million pip installs per day and over 1.2 billion in total
- **ecosystem growth:** more than 400 model architectures (from 40 in v4) and over 750,000 compatible checkpoints on the Hub (from about 1,000)
- four focus areas: **simplicity, training, inference and production**
- **simplicity:** the team says the code is the product, so model integrations should be clean enough that the ecosystem can depend on and understand them
- works with libraries and apps built on transformers, including **llama.cpp, MLX, onnxruntime, Jan, LM Studio, vLLM, SGLang, Unsloth and LlamaFactory**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Transformers v5: simpler model definitions after five years and 1.2 billion installs"]):::title
    n1(["Hugging Face: Transformers v5: simpler model definitions after five years and 1.2…"])
    n2["Hugging Face launches Transformers v5, five years after v4, citing 3 million daily installs, over 400 model…"]
    n8{"Ready beyond the demo?"}
    n9["Transformers is the reference model-definition layer that other inference and training tools read, so simplifying…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: hugging-face · transformers · v5 · open-source"]
    subgraph G0["What it adds"]
        n3["scale of use: over 3 million pip installs per day and over 1.2 billion in total"]
        n4["ecosystem growth: more than 400 model architectures (from 40 in v4) and over 750,000 compatible checkpoints on…"]
        n5["four focus areas: simplicity, training, inference and production"]
        n6["simplicity: the team says the code is the product, so model integrations should be clean enough that the…"]
        n7["works with libraries and apps built on transformers, including llama.cpp, MLX, onnxruntime, Jan, LM Studio…"]
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

Transformers is the reference model-definition layer that other inference and training tools read, so simplifying it spreads to everything downstream. The release is also the foundation for the 5.x feature releases that followed through 2026.
