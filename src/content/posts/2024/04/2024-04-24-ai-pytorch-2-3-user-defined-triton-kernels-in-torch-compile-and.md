---
title: "PyTorch 2.3: user-defined Triton kernels in torch.compile and tensor parallelism"
categories: ["ai"]
tags: ["pytorch", "torch-compile", "triton", "tensor-parallelism", "release"]
summary: "PyTorch 2.3 lets user-defined Triton kernels run inside torch.compile without graph breaks and adds native tensor parallelism validated on training runs for 100B-parameter models."
sources: 
  - title: "PyTorch 2.3: User-Defined Triton Kernels in torch.compile, Tensor Parallelism in Distributed"
    url: "https://github.com/pytorch/pytorch/releases/tag/v2.3.0"
    publisher: "GitHub · pytorch/pytorch"
    fetched_at: "2026-11-27T02:52:44.351Z"
highlights: ["The release has 3,393 commits from 426 contributors since PyTorch 2.2.", "torch.compile on macOS is flagged as unstable for 2.3, with known cases of hanging."]
draft: false
date: "2024-04-24"
---

## What happened

On 24 April 2024 the **PyTorch** team released **2.3**. Its two headline features are support for user-defined **Triton kernels** in `torch.compile` and **tensor parallelism** in PyTorch Distributed.

## The technical details

From the release notes:

- **user-defined Triton kernels in torch.compile** (beta): migrate your own Triton kernels from eager mode without performance complications or graph breaks
- **tensor parallelism** within PyTorch Distributed (beta), improving LLM training with native functions and validated on training runs for **100B-parameter models**
- **semi-structured sparsity** support (beta)
- prototype features: a `torch.export` API to specify `dynamic_shapes`, **asynchronous checkpoint generation**, and **weight-only quantization** in the Inductor CPU backend
- tracked regression: `torch.compile` on macOS is considered unstable, with known hangs

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PyTorch 2.3: user-defined Triton kernels in torch.compile and tensor parallelism"]):::title
    n1(["pytorch/pytorch: PyTorch 2.3: user-defined Triton kernels in torch.compile and tensor…"])
    n2["PyTorch 2.3 lets user-defined Triton kernels run inside torch.compile without graph breaks and adds native…"]
    n11{"Does upgrading need changes?"}
    n12["Being able to call custom Triton kernels from compiled code matters for LLM work, where attention and fused ops…"]
    n13(["Upgrade with the checklist above"])
    n14["Topics: pytorch · torch-compile · triton · tensor-parallelism"]
    subgraph G0["What changed"]
        n3["user-defined Triton kernels in torch.compile (beta): migrate your own Triton kernels from eager mode without…"]
        n4["tensor parallelism within PyTorch Distributed (beta), improving LLM training with native functions and…"]
        n5["semi-structured sparsity support (beta)"]
        n6["prototype features: a torch.export API to specify dynamic_shapes, asynchronous checkpoint generation, and…"]
    end
    subgraph G1["Upgrade notes"]
        n7[/"user-defined Triton kernels in torch.compile (beta): migrate your own Triton kernels from eager…"/]
        n8[/"tensor parallelism within PyTorch Distributed (beta), improving LLM training with native functions…"/]
        n9[/"semi-structured sparsity support (beta)"/]
        n10["tracked regression: torch.compile on macOS is considered unstable, with known hangs"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n11
    n4 --> n11
    n5 --> n11
    n6 --> n11
    n11 -- "yes" --> n10
    n10 --> n12
    n11 -- "no" --> n12
    n2 --> n7
    n2 --> n8
    n2 --> n9
    n7 --> n12
    n8 --> n12
    n9 --> n12
    n12 --> n13
    n14 --> n2
    class n11 dec
    class n1,n13 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

Being able to call custom Triton kernels from compiled code matters for LLM work, where attention and fused ops are often hand-written. It connects to this blog's earlier PyTorch 2.2 and 2.5 posts on SDPA and FlexAttention.
