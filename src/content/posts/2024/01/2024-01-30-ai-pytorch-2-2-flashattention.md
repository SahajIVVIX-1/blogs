---
title: "PyTorch 2.2: FlashAttention-2 in SDPA, AOTInductor"
categories: ["ai"]
tags: ["pytorch", "attention", "release"]
summary: "PyTorch 2.2 brought FlashAttention-2 into scaled_dot_product_attention for about 2× speedups, and introduced AOTInductor for compiling models ahead of time for non-Python deployment."
sources: 
  - title: "PyTorch 2.2 release notes"
    url: "https://github.com/pytorch/pytorch/releases/tag/v2.2.0"
    publisher: "GitHub · pytorch/pytorch"
    fetched_at: "2026-10-29T22:11:44.912Z"
  - title: "Dao (2023), FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning"
    url: "https://arxiv.org/abs/2307.08691"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:11:46.132Z"
highlights: ["The same F.scaled_dot_product_attention call got about 2× faster by switching to FlashAttention-2 underneath.", "AOTInductor compiles a PyTorch program ahead of time so it can run server-side without Python."]
draft: false
date: "2024-01-30"
---

## What happened

**PyTorch 2.2** was released, with 3,628 commits from 521 contributors since 2.1.

## The technical details

From the release notes:

- **`scaled_dot_product_attention` (SDPA)** now supports **FlashAttention-2**, with about **2× speedups** over previous versions
- **AOTInductor**: an ahead-of-time extension of TorchInductor that compiles and deploys PyTorch programs for **non-Python, server-side** environments
- **`device_mesh`**: a new abstraction in `torch.distributed` for initialising and representing process groups
- **`TORCH_LOGS`**: a standard, configurable logging mechanism
- better `torch.compile` support for **optimizers**, plus Inductor fusion and layout improvements
- PyTorch 2.2.x is the **last release supporting macOS x86**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PyTorch 2.2: FlashAttention-2 in SDPA, AOTInductor"]):::title
    n1(["pytorch/pytorch: PyTorch 2.2: FlashAttention-2 in SDPA, AOTInductor"])
    n2["PyTorch 2.2 brought FlashAttention-2 into scaled_dot_product_attention for about 2× speedups, and introduced…"]
    n9{"Does upgrading need changes?"}
    n10["Attention is the core cost of Transformers."]
    n11(["Upgrade with the checklist above"])
    n12["Topics: pytorch · attention · release"]
    subgraph G0["What changed"]
        n3["scaled_dot_product_attention (SDPA) now supports FlashAttention-2, with about 2× speedups over previous versions"]
        n4["AOTInductor: an ahead-of-time extension of TorchInductor that compiles and deploys PyTorch programs for…"]
        n5["device_mesh: a new abstraction in torch.distributed for initialising and representing process groups"]
        n6["TORCH_LOGS: a standard, configurable logging mechanism"]
        n7["better torch.compile support for optimizers, plus Inductor fusion and layout improvements"]
        n8["PyTorch 2.2.x is the last release supporting macOS x86"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n2 --> n8
    n3 --> n9
    n4 --> n9
    n5 --> n9
    n6 --> n9
    n7 --> n9
    n8 --> n9
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

Attention is the core cost of Transformers. In my self-attention study post I checked my hand-written attention against `F.scaled_dot_product_attention`. That's the same function, and releases like this make it faster without any code change.
