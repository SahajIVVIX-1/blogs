---
title: "Falcon-H1: hybrid attention and Mamba-2 heads in six open models"
categories: ["ai"]
tags: ["tii", "falcon-h1", "mamba", "hybrid-architecture", "open-models"]
summary: "TII releases Falcon-H1, six open models from 0.5B to 34B parameters that run attention and Mamba-2 state-space heads in parallel inside each block, under an Apache 2.0-based license."
sources: 
  - title: "Falcon-H1: A Family of Hybrid-Head Language Models Redefining Efficiency and Performance"
    url: "https://huggingface.co/blog/tiiuae/falcon-h1"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:58:11.908Z"
highlights: ["The number of attention and Mamba heads can be adjusted independently to find the best attention-to-SSM ratio.", "The hybrid design is credited with faster inference, lower memory use and strong generalization."]
draft: false
date: "2025-05-21"
---

## What happened

On 21 May 2025 the Technology Innovation Institute introduced the **Falcon-H1** series through **Hugging Face**: six open-weight models in 0.5B, 1.5B, 1.5B-Deep, 3B, 7B and 34B sizes, each with base and instruction-tuned variants.

## The technical details

From the Hugging Face post:

- **hybrid mixer block:** classical **Transformer attention** combined with **Mamba-2** state-space heads **in parallel**, with the number of each adjustable independently
- claimed benefits: **faster inference, lower memory usage** and strong generalization across tasks
- performance is said to rival top Transformer-based models in each size tier
- **multilingual by design**: 18 languages supported natively
- released under a permissive license based on **Apache 2.0**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Falcon-H1: hybrid attention and Mamba-2 heads in six open models"]):::title
    n1(["Hugging Face: Falcon-H1: hybrid attention and Mamba-2 heads in six open models"])
    n2["TII releases Falcon-H1, six open models from 0.5B to 34B parameters that run attention and Mamba-2 state-space…"]
    n8{"Available to me today?"}
    n9["State-space models promise long-context efficiency but have trailed attention on quality; running both in parallel…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: tii · falcon-h1 · mamba · hybrid-architecture"]
    subgraph G0["What it adds"]
        n3["hybrid mixer block: classical Transformer attention combined with Mamba-2 state-space heads in parallel, with…"]
        n4["claimed benefits: faster inference, lower memory usage and strong generalization across tasks"]
        n5["multilingual by design: 18 languages supported natively"]
    end
    subgraph G1["Access and limits"]
        n6[/"performance is said to rival top Transformer-based models in each size tier"/]
        n7[/"released under a permissive license based on Apache 2.0"/]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n8 -- "yes" --> n6
    n8 -- "yes" --> n7
    n6 --> n9
    n7 --> n9
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

State-space models promise long-context efficiency but have trailed attention on quality; running both in parallel and tuning the ratio is a practical way to get both. Falcon-H1 is an example of hybrid models moving from research into open releases.
