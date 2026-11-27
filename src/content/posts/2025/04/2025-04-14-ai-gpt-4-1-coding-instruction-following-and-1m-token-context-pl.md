---
title: "GPT-4.1: coding, instruction following and 1M-token context, plus a nano model"
categories: ["ai"]
tags: ["openai", "gpt-4-1", "api", "long-context", "coding"]
summary: "OpenAI launches GPT-4.1, GPT-4.1 mini and GPT-4.1 nano in the API with large gains in coding and instruction following and context windows up to 1 million tokens."
sources: 
  - title: "Introducing GPT-4.1 in the API"
    url: "https://openai.com/index/gpt-4-1"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:56.851Z"
highlights: ["54.6% on SWE-bench Verified, 21.4 points above GPT-4o.", "The family includes OpenAI's first-ever nano model and a June 2024 knowledge cutoff."]
draft: false
date: "2025-04-14"
---

## What happened

On 14 April 2025 **OpenAI** launched three models in the API: **GPT-4.1**, **GPT-4.1 mini** and **GPT-4.1 nano**. They outperform GPT-4o and GPT-4o mini across the board, with major gains in coding and instruction following.

## The technical details

From the OpenAI post:

- context windows up to **1 million tokens**, with better long-context comprehension; knowledge cutoff **June 2024**
- **coding:** 54.6% on **SWE-bench Verified**, up 21.4 points over GPT-4o and 26.6 over GPT-4.5
- **instruction following:** 38.3% on Scale's **MultiChallenge**, up 10.5 points over GPT-4o
- **long context:** 72.0% on **Video-MME** (long, no subtitles), a new state of the art and up 6.7 points over GPT-4o
- GPT-4.1 **nano** is OpenAI's first nano model; the family is positioned as better performance at every point on the latency and cost curve

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-4.1: coding, instruction following and 1M-token context, plus a nano model"]):::title
    n1(["OpenAI: GPT-4.1: coding, instruction following and 1M-token context, plus a…"])
    n2["OpenAI launches GPT-4.1, GPT-4.1 mini and GPT-4.1 nano in the API with large gains in coding and instruction…"]
    n8{"Available to me today?"}
    n9["Developer feedback shaped this release: the stated focus is real-world utility (coding, following instructions…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · gpt-4-1 · api · long-context"]
    subgraph G0["What it adds"]
        n3["context windows up to 1 million tokens, with better long-context comprehension; knowledge cutoff June 2024"]
        n4["coding: 54.6% on SWE-bench Verified, up 21.4 points over GPT-4o and 26.6 over GPT-4.5"]
        n5["instruction following: 38.3% on Scale's MultiChallenge, up 10.5 points over GPT-4o"]
        n6["long context: 72.0% on Video-MME (long, no subtitles), a new state of the art and up 6.7 points over GPT-4o"]
        n7["GPT-4.1 nano is OpenAI's first nano model; the family is positioned as better performance at every point on…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n4 --> n5
    n2 --> n6
    n6 --> n7
    n5 --> n8
    n7 --> n8
    n8 --> n9
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

Developer feedback shaped this release: the stated focus is real-world utility (coding, following instructions, using long context) rather than chat polish. A 1M-token window with improved retrieval is what makes whole-repository tasks practical.
