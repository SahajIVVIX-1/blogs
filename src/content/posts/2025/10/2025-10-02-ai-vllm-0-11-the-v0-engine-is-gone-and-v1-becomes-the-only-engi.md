---
title: "vLLM 0.11: the V0 engine is gone and V1 becomes the only engine"
categories: ["ai"]
tags: ["vllm", "v1-engine", "inference", "release", "cuda-graphs"]
summary: "vLLM 0.11.0 completes the removal of the V0 engine, making V1 the only engine, and defaults CUDA graphs to FULL_AND_PIECEWISE for better out-of-the-box performance."
sources: 
  - title: "v0.11.0"
    url: "https://github.com/vllm-project/vllm/releases/tag/v0.11.0"
    publisher: "GitHub · vllm-project/vllm"
    fetched_at: "2026-11-27T02:52:47.758Z"
highlights: ["The release has 538 commits from 207 contributors, 65 of them new.", "A known issue: `--async-scheduling` can produce gibberish in some cases in 0.11.0 and 0.10.2 (correct in 0.10.1)."]
draft: false
date: "2025-10-02"
---

## What happened

On 2 October 2025 the **vLLM** project released **v0.11.0**, a release that finishes a long migration: the V0 engine code (AsyncLLMEngine, LLMEngine, MQLLMEngine and all attention backends) is removed.

## The technical details

From the release notes:

- **V1 is the only engine** in the codebase
- **FULL_AND_PIECEWISE** is the default CUDA graph mode, giving better out-of-the-box performance for most models, especially fine-grained MoEs, while staying compatible with models that support only PIECEWISE
- new architectures: **DeepSeek-V3.2-Exp, Qwen3-VL, Qwen3-Next, OLMo3, LongCat-Flash** and others
- **KV cache offloading** to CPU with LRU management, plus prompt embeddings and sharded state loading in V1
- speculative decoding: EAGLE3 for MiniCPM3 and GPT-OSS

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["vLLM 0.11: the V0 engine is gone and V1 becomes the only engine"]):::title
    n1(["vllm-project/vllm: vLLM 0.11: the V0 engine is gone and V1 becomes the only engine"])
    n2["vLLM 0.11.0 completes the removal of the V0 engine, making V1 the only engine, and defaults CUDA graphs to…"]
    n8{"Does upgrading need changes?"}
    n9["Deleting the old engine ends the cost of maintaining two code paths and lets new features target one design."]
    n10(["Upgrade with the checklist above"])
    n11["Topics: vllm · v1-engine · inference · release"]
    subgraph G0["What changed"]
        n3["V1 is the only engine in the codebase"]
        n4["FULL_AND_PIECEWISE is the default CUDA graph mode, giving better out-of-the-box performance for most models…"]
        n5["new architectures: DeepSeek-V3.2-Exp, Qwen3-VL, Qwen3-Next, OLMo3, LongCat-Flash and others"]
        n6["KV cache offloading to CPU with LRU management, plus prompt embeddings and sharded state loading in V1"]
        n7["speculative decoding: EAGLE3 for MiniCPM3 and GPT-OSS"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
    n7 --> n8
    n8 -- "no" --> n9
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

Deleting the old engine ends the cost of maintaining two code paths and lets new features target one design. The honest note about async scheduling shows that even a headline release can carry a known regression.
