---
title: "PyTorch 2.15: a rewritten NCCL backend, one-sided transports and faster NVFP4 decoding"
categories: ["ai"]
tags: ["pytorch", "release", "distributed", "nccl", "blackwell"]
summary: "PyTorch 2.15 makes a rewritten NCCL backend the default with a flight recorder for hangs, adds one-sided transports for torch.distributed, and speeds NVFP4 decoding on Blackwell and MoE decoding on Apple Silicon."
sources: 
  - title: "PyTorch 2.15.0 Release"
    url: "https://github.com/pytorch/pytorch/releases/tag/v2.15.0"
    publisher: "GitHub · pytorch/pytorch"
    fetched_at: "2026-11-27T02:52:51.786Z"
highlights: ["The new NCCL backend dumps a flight recording on hangs and can be rolled back with `TORCH_DIST_USE_NCCL2=0` or `nccl-legacy`.", "Apple Silicon gains FP8 and a grouped_mm with a decode fast path that gives 1.32 to 1.34x tokens per second on MoE decode."]
draft: false
date: "2026-10-28"
---

## What happened

On 28 October 2026 the **PyTorch** team released **2.15.0**, a release focused on distributed training and low-precision inference.

## The technical details

From the release notes:

- **rewritten NCCL backend** is now the default, with a **flight recorder** that dumps state on hangs
- **one-sided transports** for `torch.distributed`, including a **NIXL** backend and CUDA-graph-capturable transfers
- **FSDP2 and pipelining** gain finer memory and communication control: fp32 for precision-sensitive parameters, CUDA-graph-captured gradient accumulation and gradient reduction overlapped with compute
- **NVFP4 LLM decoding on NVIDIA Blackwell** is faster through fewer, better-overlapped kernel launches in NVGEMM
- **platforms:** CUDA 13.2 default wheel, `torch.compile` on Python 3.15, FlyDSL kernels on AMD gfx950, and improved Intel GPU profiling
- breaking: `import torch` can no longer be re-executed in the same process, including via `importlib.reload`

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["PyTorch 2.15: a rewritten NCCL backend, one-sided transports and faster NVFP4 decoding"]):::title
    n1(["pytorch/pytorch: PyTorch 2.15: a rewritten NCCL backend, one-sided transports and…"])
    n2["PyTorch 2.15 makes a rewritten NCCL backend the default with a flight recorder for hangs, adds one-sided…"]
    n8["breaking: import torch can no longer be re-executed in the same process, including via…"]
    n9{"Does upgrading need changes?"}
    n10["The debugging feature is the one distributed users will notice: hung collectives are hard to diagnose, and a…"]
    n11(["Upgrade with the checklist above"])
    n12["Topics: pytorch · release · distributed · nccl"]
    subgraph G0["What changed"]
        n3["rewritten NCCL backend is now the default, with a flight recorder that dumps state on hangs"]
        n4["one-sided transports for torch.distributed, including a NIXL backend and CUDA-graph-capturable transfers"]
        n5["FSDP2 and pipelining gain finer memory and communication control: fp32 for precision-sensitive parameters…"]
        n6["NVFP4 LLM decoding on NVIDIA Blackwell is faster through fewer, better-overlapped kernel launches in NVGEMM"]
        n7["platforms: CUDA 13.2 default wheel, torch.compile on Python 3.15, FlyDSL kernels on AMD gfx950, and improved…"]
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

The debugging feature is the one distributed users will notice: hung collectives are hard to diagnose, and a built-in flight recorder shows what each rank was doing. The 4-bit and FP8 work reflects where LLM inference was heading by late 2026.
