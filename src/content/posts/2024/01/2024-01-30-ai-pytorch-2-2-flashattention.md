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

## Why it matters

Attention is the core cost of Transformers. In my self-attention study post I checked my hand-written attention against `F.scaled_dot_product_attention`. That's the same function, and releases like this make it faster without any code change.
