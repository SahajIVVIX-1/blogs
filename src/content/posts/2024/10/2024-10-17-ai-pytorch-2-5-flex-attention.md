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

## Why it matters

Attention keeps getting new variants (sliding windows, soft-capping, masks), and each used to need a custom CUDA kernel. **FlexAttention** aims to let researchers express a variant in PyTorch and still get a fused, fast kernel. Regional compilation addresses a practical annoyance: `torch.compile` taking a long time to start on big models.
