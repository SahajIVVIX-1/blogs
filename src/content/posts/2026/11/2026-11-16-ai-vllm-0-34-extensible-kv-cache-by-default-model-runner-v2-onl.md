---
title: "vLLM 0.34: extensible KV cache by default, Model Runner V2 only, and ten new models"
categories: ["ai"]
tags: ["vllm", "kv-cache", "inference", "release", "blackwell"]
summary: "vLLM 0.34.0 turns on an extensible KV cache by default, removes Model Runner V1, adds ten models including Mistral Large 4, and reports speedups of up to 1.95x decode on Blackwell and MI355X."
sources: 
  - title: "v0.34.0"
    url: "https://github.com/vllm-project/vllm/releases/tag/v0.34.0"
    publisher: "GitHub · vllm-project/vllm"
    fetched_at: "2026-11-27T02:52:52.570Z"
highlights: ["The KV cache is sized from memory actually free after warmup, so most models get a bigger cache and more throughput; remove `gpu_memory_utilization` from configs.", "The release has 1,061 commits from 412 contributors, 120 of them new."]
draft: false
date: "2026-11-16"
---

## What happened

On 16 November 2026 the **vLLM** project released **v0.34.0**.

## The technical details

From the release notes:

- **10 new models:** including Mistral Large 4, MiniMax-M3.1-Flash and Nemotron-3.5-Transcribe
- **extensible KV cache on by default:** `gpu_memory_utilization` defaults to 1.0 and in most cases should no longer be set; use it only to share a GPU or when the extensible cache is disabled
- **Model Runner V1 removed**; Model Runner V2 is the only GPU runner
- **speedups** on Blackwell and MI355X: up to **1.95x decode** (Step5 on GB200), **1.6x throughput** (GLM-5.3-Flash) and **1.24 to 1.40x faster long-prompt time to first token** (GLM-5.3)
- **upgrade checks:** default block size is now **64** (was 16), ROCm 7.2 images are gone, and `huggingface_hub >= 2.0.0` is required

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["vLLM 0.34: extensible KV cache by default, Model Runner V2 only, and ten new models"]):::title
    n1(["vllm-project/vllm: vLLM 0.34: extensible KV cache by default, Model Runner V2 only, and…"])
    n2["vLLM 0.34.0 turns on an extensible KV cache by default, removes Model Runner V1, adds ten models including…"]
    n8{"Does upgrading need changes?"}
    n9["Sizing the KV cache from the memory that is really free removes a tuning step that caused many out-of-memory…"]
    n10(["Upgrade with the checklist above"])
    n11["Topics: vllm · kv-cache · inference · release"]
    subgraph G0["What changed"]
        n3["10 new models: including Mistral Large 4, MiniMax-M3.1-Flash and Nemotron-3.5-Transcribe"]
        n4["speedups on Blackwell and MI355X: up to 1.95x decode (Step5 on GB200), 1.6x throughput (GLM-5.3-Flash) and…"]
        n5["upgrade checks: default block size is now 64 (was 16), ROCm 7.2 images are gone, and huggingface_hub #gt;= 2.0.0…"]
    end
    subgraph G1["Upgrade notes"]
        n6["extensible KV cache on by default: gpu_memory_utilization defaults to 1.0 and in most cases should…"]
        n7["Model Runner V1 removed; Model Runner V2 is the only GPU runner"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n8 -- "yes" --> n6
    n8 -- "yes" --> n7
    n6 --> n9
    n7 --> n9
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

Sizing the KV cache from the memory that is really free removes a tuning step that caused many out-of-memory errors or wasted memory. The list of breaking changes at the top of the notes is a model of how to make upgrades safe.
