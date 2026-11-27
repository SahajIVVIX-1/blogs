---
title: "GPT-5.5: a new class of intelligence for real work"
categories: ["ai"]
tags: ["openai", "gpt-5-5", "agents", "computer-use", "efficiency"]
summary: "OpenAI releases GPT-5.5, which matches GPT-5.4's per-token latency while performing at a higher level and using significantly fewer tokens on Codex tasks, with its strongest safeguards to date."
sources: 
  - title: "Introducing GPT-5.5"
    url: "https://openai.com/index/introducing-gpt-5-5"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:07.687Z"
highlights: ["It matches GPT-5.4 per-token latency in real-world serving while being more capable.", "It uses significantly fewer tokens to complete the same Codex tasks."]
draft: false
date: "2026-04-23"
---

## What happened

On 23 April 2026 **OpenAI** released **GPT-5.5**, calling it its smartest and most intuitive model yet and the next step toward a new way of getting work done on a computer. On 24 April it became available in the API, as did GPT-5.5 Pro.

## The technical details

From the OpenAI post:

- handles a messy, multi-part task: it can **plan, use tools, check its work, navigate ambiguity and keep going**
- strongest gains in **agentic coding, computer use, knowledge work and early scientific research**
- **efficiency:** larger models are often slower to serve, but GPT-5.5 matches GPT-5.4 **per-token latency** and uses **significantly fewer tokens** on the same Codex tasks
- released with OpenAI's **strongest set of safeguards to date**; the system card was updated for the API release to describe additional safeguards

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-5.5: a new class of intelligence for real work"]):::title
    n1(["OpenAI: GPT-5.5: a new class of intelligence for real work"])
    n2["OpenAI releases GPT-5.5, which matches GPT-5.4's per-token latency while performing at a higher level and…"]
    n6[/"handles a messy, multi-part task: it can plan, use tools, check its work, navigate ambiguity and…"/]
    n7{"Fits production use?"}
    n8["The notable claim is about efficiency rather than size: a model that finishes the same work with fewer tokens at…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · gpt-5-5 · agents · computer-use"]
    subgraph G0["What it adds"]
        n3["strongest gains in agentic coding, computer use, knowledge work and early scientific research"]
        n4["efficiency: larger models are often slower to serve, but GPT-5.5 matches GPT-5.4 per-token latency and uses…"]
        n5["released with OpenAI's strongest set of safeguards to date; the system card was updated for the API release to…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n7 -- "yes" --> n6
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

The notable claim is about efficiency rather than size: a model that finishes the same work with fewer tokens at the same speed lowers cost and latency together, which is what makes agent loops affordable.
