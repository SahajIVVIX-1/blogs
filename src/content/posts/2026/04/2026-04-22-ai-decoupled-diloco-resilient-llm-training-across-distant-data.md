---
title: "Decoupled DiLoCo: resilient LLM training across distant data centers"
categories: ["ai"]
tags: ["google-deepmind", "diloco", "distributed-training", "llm-training", "resilience"]
summary: "Google DeepMind presents Decoupled DiLoCo, a distributed training architecture that splits a run into asynchronous islands of compute, tolerating failures and low bandwidth between data centers."
sources: 
  - title: "Decoupled DiLoCo: A new frontier for resilient, distributed AI training"
    url: "https://deepmind.google/blog/decoupled-diloco/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:18.337Z"
highlights: ["Islands of compute exchange data asynchronously, so local disruptions do not stall the rest of the system.", "It avoids the communication delays that made data-parallel training impractical at global scale."]
draft: false
date: "2026-04-22"
---

## What happened

On 22 April 2026 **Google DeepMind** shared a new paper on **Decoupled DiLoCo** (Distributed Low-Communication), an approach to training large models across distant data centers with lower bandwidth and more hardware resiliency. The post is by Arthur Douillard and the DiLoCo team.

## The technical details

From the Google DeepMind post:

- today's frontier training depends on a **tightly coupled system** where identical chips stay in near-perfect synchronization, which becomes a logistical challenge at larger scale
- Decoupled DiLoCo divides a run into **decoupled “islands” of compute** with **asynchronous data** flowing between them
- **local disruptions are isolated**, so other parts of the system keep learning efficiently
- aims at training across **globally distributed data centers** and varied hardware without the delays that made earlier data-parallel approaches impractical

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Decoupled DiLoCo: resilient LLM training across distant data centers"]):::title
    n1(["Google DeepMind: Decoupled DiLoCo: resilient LLM training across distant data centers"])
    n2["Google DeepMind presents Decoupled DiLoCo, a distributed training architecture that splits a run into…"]
    n7{"Ready beyond the demo?"}
    n8["As clusters grow, hardware failure and cross-site bandwidth become the limits, not only chip count."]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: google-deepmind · diloco · distributed-training · llm-training"]
    subgraph G0["What it adds"]
        n3["today's frontier training depends on a tightly coupled system where identical chips stay in near-perfect…"]
        n4["Decoupled DiLoCo divides a run into decoupled “islands” of compute with asynchronous data flowing between them"]
        n5["local disruptions are isolated, so other parts of the system keep learning efficiently"]
        n6["aims at training across globally distributed data centers and varied hardware without the delays that made…"]
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

As clusters grow, hardware failure and cross-site bandwidth become the limits, not only chip count. Asynchronous islands trade strict synchronization for resilience, and this blog's study notes on distributed training (FSDP, ZeRO, checkpointing) describe the synchronous baseline this approach departs from.
