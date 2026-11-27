---
title: "PyTorch 2.12: up to 100x faster batched eigh, a unified graph API and MX export"
categories: ["ai"]
tags: ["pytorch", "release", "cuda-graphs", "mx-quantization", "rocm"]
summary: "PyTorch 2.12 speeds batched linalg.eigh on CUDA up to 100x, adds a torch.accelerator.Graph API, supports microscaling (MX) formats in torch.export.save and fused Adagrad."
sources: 
  - title: "PyTorch 2.12.0 Release"
    url: "https://github.com/pytorch/pytorch/releases/tag/v2.12.0"
    publisher: "GitHub · pytorch/pytorch"
    fetched_at: "2026-11-27T02:52:50.324Z"
highlights: ["`torch.accelerator.Graph` unifies graph capture and replay across CUDA, XPU and out-of-tree backends.", "`torch.cond` control flow can be captured and replayed inside CUDA Graphs."]
draft: false
date: "2026-05-13"
---

## What happened

On 13 May 2026 the **PyTorch** team released **2.12.0**.

## The technical details

From the release notes:

- batched **`linalg.eigh` on CUDA up to 100x faster** thanks to updated cuSolver backend selection
- a new **`torch.accelerator.Graph`** API for graph capture and replay on CUDA, XPU and out-of-tree backends
- **`torch.export.save`** supports **Microscaling (MX)** quantization formats, enabling export of aggressively compressed models
- **Adagrad** gains `fused=True`, joining Adam, AdamW and SGD as a single-kernel optimizer
- **ROCm:** expandable memory segments, rocSHMEM symmetric-memory collectives and FlexAttention pipelining
- breaking for source builds: CUDA 12.6 minimum, C++20 minimum, stricter SVE checks

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PyTorch 2.12: up to 100x faster batched eigh, a unified graph API and MX export"]):::title
    n1(["pytorch/pytorch: PyTorch 2.12: up to 100x faster batched eigh, a unified graph API…"])
    n2["PyTorch 2.12 speeds batched linalg.eigh on CUDA up to 100x, adds a torch.accelerator.Graph API, supports…"]
    n8["breaking for source builds: CUDA 12.6 minimum, C++20 minimum, stricter SVE checks"]
    n9{"Does upgrading need changes?"}
    n10["Most of these are quiet infrastructure items: cross-backend graphs, export of low-precision models and fused…"]
    n11(["Upgrade with the checklist above"])
    n12["Topics: pytorch · release · cuda-graphs · mx-quantization"]
    subgraph G0["What changed"]
        n3["batched linalg.eigh on CUDA up to 100x faster thanks to updated cuSolver backend selection"]
        n4["a new torch.accelerator.Graph API for graph capture and replay on CUDA, XPU and out-of-tree backends"]
        n5["torch.export.save supports Microscaling (MX) quantization formats, enabling export of aggressively compressed…"]
        n6["Adagrad gains fused=True, joining Adam, AdamW and SGD as a single-kernel optimizer"]
        n7["ROCm: expandable memory segments, rocSHMEM symmetric-memory collectives and FlexAttention pipelining"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n9
    n4 --> n9
    n5 --> n9
    n6 --> n9
    n7 --> n9
    n9 -- "yes" --> n8
    n8 --> n10
    n9 -- "no" --> n10
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

Most of these are quiet infrastructure items: cross-backend graphs, export of low-precision models and fused optimizers. Together they show PyTorch treating non-NVIDIA backends and low-precision formats as part of the core.
