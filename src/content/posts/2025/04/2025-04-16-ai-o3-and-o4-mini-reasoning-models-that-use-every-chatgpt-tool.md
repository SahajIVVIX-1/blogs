---
title: "o3 and o4-mini: reasoning models that use every ChatGPT tool"
categories: ["ai"]
tags: ["openai", "o3", "o4-mini", "reasoning", "tool-use"]
summary: "OpenAI releases o3 and o4-mini, reasoning models that for the first time can agentically combine all of ChatGPT's tools, including web search, Python, vision and image generation."
sources: 
  - title: "Introducing OpenAI o3 and o4-mini"
    url: "https://openai.com/index/introducing-o3-and-o4-mini"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:59.441Z"
highlights: ["The models are trained to decide when and how to use tools, typically answering in under a minute.", "o3-pro followed on 10 June 2025 for Pro users and the API."]
draft: false
date: "2025-04-16"
---

## What happened

On 16 April 2025 **OpenAI** released **o3** and **o4-mini**, the latest in its o-series of models trained to think for longer before responding, describing them as its smartest models to date.

## The technical details

From the OpenAI post:

- for the first time, reasoning models can **agentically use and combine every tool in ChatGPT**: web search, analyzing uploaded files and data with Python, reasoning about visual inputs, and generating images
- trained to reason about **when and how to use tools** to produce answers in the right format, typically in under a minute
- **update, 10 Jun 2025:** **o3-pro**, a version of o3 designed to think longer for the most reliable answers, is available to Pro users and in the API
- the page now notes that o3 and o4-mini are no longer available in ChatGPT and are deprecated in the API

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["o3 and o4-mini: reasoning models that use every ChatGPT tool"]):::title
    n1(["OpenAI: o3 and o4-mini: reasoning models that use every ChatGPT tool"])
    n2["OpenAI releases o3 and o4-mini, reasoning models that for the first time can agentically combine all of…"]
    n7{"Available to me today?"}
    n8["Combining reasoning with tool use is the core of agentic behaviour: the model plans, calls tools, reads results…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · o3 · o4-mini · reasoning"]
    subgraph G0["What it adds"]
        n3["for the first time, reasoning models can agentically use and combine every tool in ChatGPT: web search…"]
        n4["trained to reason about when and how to use tools to produce answers in the right format, typically in under a…"]
    end
    subgraph G1["Access and limits"]
        n5[/"update, 10 Jun 2025: o3-pro, a version of o3 designed to think longer for the most reliable…"/]
        n6["the page now notes that o3 and o4-mini are no longer available in ChatGPT and are deprecated in…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n3 --> n7
    n4 --> n7
    n7 -- "yes" --> n5
    n7 -- "no" --> n6
    n5 --> n8
    n6 --> n8
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

Combining reasoning with tool use is the core of agentic behaviour: the model plans, calls tools, reads results and continues. The post presents this as a step toward a ChatGPT that can independently execute tasks.
