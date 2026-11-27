---
title: "vLLM 0.6.0: twice the throughput with multi-step scheduling"
categories: ["ai"]
tags: ["vllm", "inference", "throughput", "multi-step-scheduling", "release"]
summary: "vLLM 0.6.0 delivers about 2x the throughput of 0.5.3 through multi-step scheduling and asynchronous output processing, with new models and OpenAI-compatible tool-calling support."
sources: 
  - title: "v0.6.0"
    url: "https://github.com/vllm-project/vllm/releases/tag/v0.6.0"
    publisher: "GitHub · vllm-project/vllm"
    fetched_at: "2026-11-27T02:52:45.155Z"
highlights: ["Multi-step scheduling is enabled with `--num-scheduler-steps 8`; asynchronous output processing alone adds 12% throughput.", "Chunked prefill and prefix caching can now be used together."]
draft: false
date: "2024-09-04"
---

## What happened

On 4 September 2024 the **vLLM** project released **v0.6.0**, a performance release announced as delivering **2x more throughput** than v0.5.3.

## The technical details

From the release notes:

- **performance:** default settings give a speedup; **multi-step scheduling** (`--num-scheduler-steps 8`) is recommended on top, though it still has limitations; an **asynchronous output processor** overlaps output processing with GPU work for **12%** more throughput; FlashInfer backend for FP8 KV cache; rejection sampling in speculative decoding
- **models:** bitsandbytes 8-bit and FP4 quantized models; Exaone, Granite, Phi-3.5-MoE; multi-image input for LLaVA-Next and Phi-3-vision
- **hardware:** H200 CUDA graph sizes, AMD AWQ via Triton, Intel GPU pipeline parallelism, Neuron and TPU on GKE improvements
- **production:** OpenAI-compatible **tools API with streaming** for Hermes and Mistral models, `json_schema` support, and **chunked prefill with prefix caching together**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["vLLM 0.6.0: twice the throughput with multi-step scheduling"]):::title
    n1(["vllm-project/vllm: vLLM 0.6.0: twice the throughput with multi-step scheduling"])
    n2["vLLM 0.6.0 delivers about 2x the throughput of 0.5.3 through multi-step scheduling and asynchronous output…"]
    n7{"Does upgrading need changes?"}
    n8["Scheduling, not kernels, was the bottleneck being attacked: overlapping CPU-side work with GPU compute and…"]
    n9(["Upgrade with the checklist above"])
    n10["Topics: vllm · inference · throughput · multi-step-scheduling"]
    subgraph G0["What changed"]
        n3["performance: default settings give a speedup; multi-step scheduling (--num-scheduler-steps 8) is recommended…"]
        n4["models: bitsandbytes 8-bit and FP4 quantized models; Exaone, Granite, Phi-3.5-MoE; multi-image input for…"]
        n5["hardware: H200 CUDA graph sizes, AMD AWQ via Triton, Intel GPU pipeline parallelism, Neuron and TPU on GKE…"]
        n6["production: OpenAI-compatible tools API with streaming for Hermes and Mistral models, json_schema support, and…"]
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

Scheduling, not kernels, was the bottleneck being attacked: overlapping CPU-side work with GPU compute and batching several decode steps per scheduling pass. It builds on the prefix caching covered in this blog's vLLM 0.4 post.
