---
title: "o3-mini: the first small reasoning model with function calling"
categories: ["ai"]
tags: ["openai", "o3-mini", "reasoning", "api", "stem"]
summary: "OpenAI releases o3-mini, a cost-efficient reasoning model strong in science, math and coding, with function calling, Structured Outputs and three reasoning-effort levels."
sources: 
  - title: "OpenAI o3-mini"
    url: "https://openai.com/index/openai-o3-mini"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:53.445Z"
highlights: ["It is the first small reasoning model to support function calling, Structured Outputs and developer messages.", "Developers choose low, medium or high reasoning effort to trade speed against depth."]
draft: false
date: "2025-01-31"
---

## What happened

On 31 January 2025 **OpenAI** released **o3-mini**, the newest and most cost-efficient model in its reasoning series, in both ChatGPT and the API. It had been previewed in December 2024.

## The technical details

From the OpenAI post:

- strong **STEM** capabilities, particularly science, math and coding, at the low cost and latency of o1-mini
- first small reasoning model with **function calling**, **Structured Outputs** and **developer messages**, plus streaming
- three **reasoning effort** settings, low, medium and high, so the model can think harder or favour latency
- **no vision support**: the post tells developers to keep using o1 for visual reasoning
- API rollout began in Chat Completions, Assistants and Batch to select developers in usage tiers 3 to 5; the page now notes o3-mini is deprecated in the API

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["o3-mini: the first small reasoning model with function calling"]):::title
    n1(["OpenAI: o3-mini: the first small reasoning model with function calling"])
    n2["OpenAI releases o3-mini, a cost-efficient reasoning model strong in science, math and coding, with function…"]
    n7["API rollout began in Chat Completions, Assistants and Batch to select developers in usage tiers 3…"]
    n8{"Ready beyond the demo?"}
    n9["The reasoning-effort dial makes “how long should the model think” an explicit per-request choice, which matters…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · o3-mini · reasoning · api"]
    subgraph G0["What it adds"]
        n3["strong STEM capabilities, particularly science, math and coding, at the low cost and latency of o1-mini"]
        n4["first small reasoning model with function calling, Structured Outputs and developer messages, plus streaming"]
        n5["three reasoning effort settings, low, medium and high, so the model can think harder or favour latency"]
        n6["no vision support: the post tells developers to keep using o1 for visual reasoning"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
    n8 -- "no" --> n7
    n7 --> n9
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

The reasoning-effort dial makes “how long should the model think” an explicit per-request choice, which matters for cost. Shipping the usual developer features with a small reasoning model made it usable in production tool-calling workflows from the first day.
