---
title: "GPT-4o mini: cost-efficient small model at 15 cents per million tokens"
categories: ["ai"]
tags: ["openai", "gpt-4o-mini", "small-models", "pricing"]
summary: "OpenAI releases GPT-4o mini, a small multimodal model scoring 82% on MMLU and priced at $0.15 per million input tokens and $0.60 per million output tokens."
sources: 
  - title: "GPT-4o mini: advancing cost-efficient intelligence"
    url: "https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:43.580Z"
highlights: ["More than 60% cheaper than GPT-3.5 Turbo, per the announcement.", "128K-token context window, up to 16K output tokens per request."]
draft: false
date: "2024-07-18"
---

## What happened

On 18 July 2024 **OpenAI** announced **GPT-4o mini**, its most cost-efficient small model, aimed at widening the range of applications that are affordable to build.

## The technical details

From the OpenAI post:

- **82% on MMLU**, and it outperformed GPT-4 on chat preferences on the LMSYS leaderboard at the time of the post
- priced at **15 cents per million input tokens and 60 cents per million output tokens**, an order of magnitude cheaper than earlier frontier models and over 60% cheaper than GPT-3.5 Turbo
- **text and vision** in the API at launch; text, image, video and audio inputs and outputs planned
- **128K-token** context, up to **16K output tokens** per request, knowledge up to October 2023
- the tokenizer shared with GPT-4o makes non-English text cheaper to process
- aimed at chaining or parallelizing many model calls, passing large context (a whole codebase or conversation history), and fast real-time customer responses

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-4o mini: cost-efficient small model at 15 cents per million tokens"]):::title
    n1(["OpenAI: GPT-4o mini: cost-efficient small model at 15 cents per million tokens"])
    n2["OpenAI releases GPT-4o mini, a small multimodal model scoring 82% on MMLU and priced at $0.15 per million…"]
    n8[/"priced at 15 cents per million input tokens and 60 cents per million output tokens, an order of…"/]
    n9{"Fits production use?"}
    n10["Price per token is what decides whether an agent that makes dozens of calls is practical."]
    n11(["Track the rollout and follow-up releases"])
    n12["Topics: openai · gpt-4o-mini · small-models · pricing"]
    subgraph G0["What it adds"]
        n3["82% on MMLU, and it outperformed GPT-4 on chat preferences on the LMSYS leaderboard at the time of the post"]
        n4["text and vision in the API at launch; text, image, video and audio inputs and outputs planned"]
        n5["128K-token context, up to 16K output tokens per request, knowledge up to October 2023"]
        n6["the tokenizer shared with GPT-4o makes non-English text cheaper to process"]
        n7["aimed at chaining or parallelizing many model calls, passing large context (a whole codebase or conversation…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n4 --> n5
    n2 --> n6
    n6 --> n7
    n5 --> n9
    n7 --> n9
    n9 -- "yes" --> n8
    n8 --> n10
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

Price per token is what decides whether an agent that makes dozens of calls is practical. By pricing a capable model far below earlier ones, this release targets exactly those high-volume, multi-call applications.
