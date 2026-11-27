---
title: "PyTorch 2.8: quantized LLM inference on Intel CPUs, control flow ops and SafeTensors checkpoints"
categories: ["ai"]
tags: ["pytorch", "release", "intel", "safetensors", "inductor"]
summary: "PyTorch 2.8 brings high-performance quantized LLM inference on Intel CPUs, a Control Flow Operator Library, an Inductor CUTLASS backend and SafeTensors support in distributed checkpointing."
sources: 
  - title: "PyTorch 2.8.0 Release"
    url: "https://github.com/pytorch/pytorch/releases/tag/v2.8.0"
    publisher: "GitHub · pytorch/pytorch"
    fetched_at: "2026-11-27T02:52:46.947Z"
highlights: ["Hierarchical compilation, Inductor graph partition for CUDA graphs and an XCCL backend for Intel GPUs are among the highlights.", "Support for Maxwell and Pascal GPUs is dropped from CUDA 12.8 and 12.9 builds due to binary size limits."]
draft: false
date: "2025-08-06"
---

## What happened

On 6 August 2025 the **PyTorch** team released **2.8.0**. The release notes list the highlights below, with details in a separate release blog post.

## The technical details

From the release notes:

- **high-performance quantized LLM inference on Intel CPUs** with native PyTorch
- **Control Flow Operator Library** and **hierarchical compilation** with `torch.compile`
- **Inductor CUTLASS backend** and **Inductor graph partition for CUDAGraph**
- **HuggingFace SafeTensors support** in PyTorch Distributed Checkpointing
- **Intel GPU** distributed backend (XCCL), SYCL support in the C++ extension API and A16W4 on XPU
- experimental: **wheel variant support** and an unstable `torch::stable::Tensor`
- backward-incompatible: **Maxwell and Pascal (sm50 to sm60)** dropped for CUDA 12.8 and 12.9 builds; use CUDA 12.6 for those GPUs

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PyTorch 2.8: quantized LLM inference on Intel CPUs, control flow ops and SafeTensors checkpoints"]):::title
    n1(["pytorch/pytorch: PyTorch 2.8: quantized LLM inference on Intel CPUs, control flow ops…"])
    n2["PyTorch 2.8 brings high-performance quantized LLM inference on Intel CPUs, a Control Flow Operator Library, an…"]
    n10{"Does upgrading need changes?"}
    n11["SafeTensors in distributed checkpointing connects PyTorch's training state to the format the Hugging Face…"]
    n12(["Upgrade with the checklist above"])
    n13["Topics: pytorch · release · intel · safetensors"]
    subgraph G0["What changed"]
        n3["high-performance quantized LLM inference on Intel CPUs with native PyTorch"]
        n4["Control Flow Operator Library and hierarchical compilation with torch.compile"]
        n5["Inductor CUTLASS backend and Inductor graph partition for CUDAGraph"]
        n6["HuggingFace SafeTensors support in PyTorch Distributed Checkpointing"]
        n7["Intel GPU distributed backend (XCCL), SYCL support in the C++ extension API and A16W4 on XPU"]
    end
    subgraph G1["Upgrade notes"]
        n8["experimental: wheel variant support and an unstable torch::stable::Tensor"]
        n9["backward-incompatible: Maxwell and Pascal (sm50 to sm60) dropped for CUDA 12.8 and 12.9 builds…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n10
    n4 --> n10
    n5 --> n10
    n6 --> n10
    n7 --> n10
    n10 -- "yes" --> n8
    n10 -- "yes" --> n9
    n8 --> n11
    n9 --> n11
    n10 -- "no" --> n11
    n11 --> n12
    n13 --> n2
    class n10 dec
    class n1,n12 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

SafeTensors in distributed checkpointing connects PyTorch's training state to the format the Hugging Face ecosystem already uses for sharing models. The Intel work shows quantized LLM inference being treated as a first-class CPU workload.
