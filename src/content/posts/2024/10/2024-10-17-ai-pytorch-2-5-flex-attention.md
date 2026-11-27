---
title: "PyTorch 2.5: cuDNN SDPA backend, FlexAttention, regional compilation"
categories: ["ai"]
tags: ["pytorch", "attention", "release"]
summary: "PyTorch 2.5 added a cuDNN backend for scaled dot-product attention (speedups by default on H100-class GPUs), regional compilation to cut torch.compile cold-start time, and a FlexAttention prototype."
sources: 
  - title: "PyTorch 2.5 release notes"
    url: "https://github.com/pytorch/pytorch/releases/tag/v2.5.0"
    publisher: "GitHub · pytorch/pytorch"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Regional compilation compiles one repeated block (like a Transformer layer) once, instead of the whole model.", "FlexAttention (prototype) lets you write custom attention variants that still compile to fast kernels."]
draft: false
date: "2024-10-17"
---

## What happened

**PyTorch 2.5** was released, with 4,095 commits from 504 contributors since 2.4.

## The technical details

From the release notes:

- **cuDNN backend for SDPA** (beta): speedups by default for SDPA users on **H100s or newer**
- **regional compilation** (beta): compile a **repeated `nn.Module`**, such as a Transformer layer, **without recompilations**, to cut `torch.compile` cold-start time
- **TorchInductor CPU backend** improvements: FP16, CPP wrapper, AOT-Inductor mode, max-autotune
- prototypes: **FlexAttention**, Compiled Autograd, Flight Recorder, max-autotune on CPU, and **TorchInductor on Windows**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PyTorch 2.5: cuDNN SDPA backend, FlexAttention, regional compilation"]):::title
    n1(["pytorch/pytorch: PyTorch 2.5: cuDNN SDPA backend, FlexAttention, regional compilation"])
    n2["PyTorch 2.5 added a cuDNN backend for scaled dot-product attention (speedups by default on H100-class GPUs)…"]
    n7{"Does upgrading need changes?"}
    n8["Attention keeps getting new variants (sliding windows, soft-capping, masks), and each used to need a custom CUDA…"]
    n9(["Upgrade with the checklist above"])
    n10["Topics: pytorch · attention · release"]
    subgraph G0["What changed"]
        n3["TorchInductor CPU backend improvements: FP16, CPP wrapper, AOT-Inductor mode, max-autotune"]
        n4["prototypes: FlexAttention, Compiled Autograd, Flight Recorder, max-autotune on CPU, and TorchInductor on Windows"]
    end
    subgraph G1["Upgrade notes"]
        n5[/"cuDNN backend for SDPA (beta): speedups by default for SDPA users on H100s or newer"/]
        n6[/"regional compilation (beta): compile a repeated nn.Module, such as a Transformer layer, without…"/]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n3 --> n7
    n4 --> n7
    n7 -- "no" --> n8
    n2 --> n5
    n2 --> n6
    n5 --> n8
    n6 --> n8
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

Attention keeps getting new variants (sliding windows, soft-capping, masks), and each used to need a custom CUDA kernel. **FlexAttention** aims to let researchers express a variant in PyTorch and still get a fused, fast kernel. Regional compilation addresses a practical annoyance: `torch.compile` taking a long time to start on big models.
