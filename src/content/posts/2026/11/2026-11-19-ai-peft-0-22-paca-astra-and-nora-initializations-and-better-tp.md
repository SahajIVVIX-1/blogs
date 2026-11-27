---
title: "PEFT 0.22: PaCA, Astra and NoRA initializations, and better TP and FSDP2 support"
categories: ["ai"]
tags: ["hugging-face", "peft", "lora", "paca", "fsdp2"]
summary: "PEFT v0.22.0 adds the PaCA fine-tuning method and Astra and NoRA initializations for LoRA, and improves tensor-parallel and FSDP2 support."
sources: 
  - title: "v0.22.0"
    url: "https://github.com/huggingface/peft/releases/tag/v0.22.0"
    publisher: "GitHub · huggingface/peft"
    fetched_at: "2026-11-27T02:52:53.325Z"
highlights: ["PaCA fine-tunes selected input columns of pretrained weights, reporting 22% less training time and 16% less memory than LoRA in its paper.", "Astra and NoRA give LoRA better starting points: a task-aware subspace, or a normalized A matrix."]
draft: false
date: "2026-11-19"
---

## What happened

On 19 November 2026 **Hugging Face** released **PEFT v0.22.0**, adding new methods and focusing on better distributed training support.

## The technical details

From the release notes:

- **PaCA (Partial Connection Adaptation):** fine-tunes randomly selected input columns of the pretrained weights instead of adding adapter layers, removing sequential adapter computation; per the ICLR 2025 paper it gives **22% less training time, 16% less memory and 23% longer sequences** with comparable accuracy, and it supports only `nn.Linear` layers
- **Astra initialization for LoRA:** uses a small calibration dataset to estimate layer output-activation covariance and initializes LoRA in the **lowest-variance directions** (`init_lora_weights="astra"`)
- **NoRA initialization:** normalizes each column of LoRA's A matrix along the rank axis with B at zero, for faster and better convergence; set `lora_alpha` equal to the rank
- a major focus on **tensor parallelism and FSDP2** support

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PEFT 0.22: PaCA, Astra and NoRA initializations, and better TP and FSDP2 support"]):::title
    n1(["huggingface/peft: PEFT 0.22: PaCA, Astra and NoRA initializations, and better TP and…"])
    n2["PEFT v0.22.0 adds the PaCA fine-tuning method and Astra and NoRA initializations for LoRA, and improves…"]
    n7{"Does upgrading need changes?"}
    n8["Parameter-efficient fine-tuning is moving from a single method to a menu, each optimizing a different bottleneck…"]
    n9(["Upgrade with the checklist above"])
    n10["Topics: hugging-face · peft · lora · paca"]
    subgraph G0["What changed"]
        n3["PaCA (Partial Connection Adaptation): fine-tunes randomly selected input columns of the pretrained weights…"]
        n4["Astra initialization for LoRA: uses a small calibration dataset to estimate layer output-activation covariance…"]
        n5["NoRA initialization: normalizes each column of LoRA's A matrix along the rank axis with B at zero, for faster…"]
        n6["a major focus on tensor parallelism and FSDP2 support"]
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
    n7 -- "no" --> n8
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

Parameter-efficient fine-tuning is moving from a single method to a menu, each optimizing a different bottleneck: memory, speed or convergence. PaCA's own caveat, that it is less effective when only light modules are adapted, is the useful guidance.
