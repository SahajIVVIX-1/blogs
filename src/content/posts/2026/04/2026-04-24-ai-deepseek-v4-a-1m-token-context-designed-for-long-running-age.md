---
title: "DeepSeek-V4: a 1M-token context designed for long-running agents"
categories: ["ai"]
tags: ["deepseek", "deepseek-v4", "moe", "long-context", "kv-cache"]
summary: "Hugging Face explains DeepSeek-V4, two mixture-of-experts checkpoints with 1M-token context, arguing the real innovation is making long context cheap enough for agentic workloads."
sources: 
  - title: "DeepSeek-V4: a million-token context that agents can actually use"
    url: "https://huggingface.co/blog/deepseekv4"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:42.768Z"
highlights: ["DeepSeek-V4-Pro has 1.6T total and 49B active parameters; V4-Flash has 284B total and 13B active.", "The post says benchmark numbers are competitive but not state of the art, and that the design for efficient long context is what matters."]
draft: false
date: "2026-04-24"
---

## What happened

On 24 April 2026 **Hugging Face** published its analysis of **DeepSeek-V4**, released that day with two MoE checkpoints on the Hub, both with a **1M-token** context window.

## The technical details

From the Hugging Face post:

- **DeepSeek-V4-Pro:** 1.6T total parameters, 49B active; **DeepSeek-V4-Flash:** 284B total, 13B active
- the focus is **long-running agentic workloads**, where open models often break: the model stops, the trace exceeds the context budget, the **KV cache fills the GPU**, or tool-call round trips degrade partway through a task
- the post's argument: **a 1M context window is capacity, not performance**, since each token in a long tool-use trajectory pays attention cost against everything before it
- it covers the **architecture changes that make long-context inference cheap**, the **agent-specific post-training decisions**, and takeaways from the paper

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["DeepSeek-V4: a 1M-token context designed for long-running agents"]):::title
    n1(["Hugging Face: DeepSeek-V4: a 1M-token context designed for long-running agents"])
    n2["Hugging Face explains DeepSeek-V4, two mixture-of-experts checkpoints with 1M-token context, arguing the real…"]
    n7{"Fits production use?"}
    n8["For agents, the practical limit is the cost of every forward pass at depth, mostly KV-cache memory, not the…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: deepseek · deepseek-v4 · moe · long-context"]
    subgraph G0["What it adds"]
        n3["DeepSeek-V4-Pro: 1.6T total parameters, 49B active; DeepSeek-V4-Flash: 284B total, 13B active"]
        n4["the focus is long-running agentic workloads, where open models often break: the model stops, the trace exceeds…"]
        n5["the post's argument: a 1M context window is capacity, not performance, since each token in a long tool-use…"]
        n6["it covers the architecture changes that make long-context inference cheap, the agent-specific post-training…"]
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
    n7 --> n8
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

For agents, the practical limit is the cost of every forward pass at depth, mostly KV-cache memory, not the advertised window. That is why the post looks at efficiency rather than leaderboard scores.
