---
title: "Sora is here: video generation leaves research preview"
categories: ["ai"]
tags: ["openai", "sora", "video-generation", "generative-ai"]
summary: "OpenAI releases Sora Turbo at sora.com to ChatGPT Plus and Pro users, with 1080p video up to 20 seconds, a storyboard tool and community feeds; the page later notes the product was discontinued on 26 April 2026."
sources: 
  - title: "Sora is here"
    url: "https://openai.com/index/sora-is-here"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:48.945Z"
highlights: ["Videos up to 1080p and 20 seconds, in widescreen, vertical or square aspect ratios.", "A banner on the page states that, as of 26 April 2026, the Sora product is no longer available."]
draft: false
date: "2024-12-09"
---

## What happened

On 9 December 2024 **OpenAI** moved its video generation model out of research preview, releasing **Sora Turbo**, described as significantly faster than the model previewed in February, as a standalone product at sora.com for ChatGPT Plus and Pro users.

## The technical details

From the OpenAI post:

- generate videos up to **1080p and 20 seconds**, in widescreen, vertical or square
- bring your own assets to **extend, remix and blend**, or generate from text
- a **storyboard** tool for specifying inputs for each frame, plus **Featured and Recent** community feeds
- included in Plus at no extra cost: up to **50 videos at 480p** (or fewer at 720p) per month; **Pro** has 10x more usage, higher resolutions and longer durations
- **update on the source page:** as of 26 April 2026 the Sora product is no longer available

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Sora is here: video generation leaves research preview"]):::title
    n1(["OpenAI: Sora is here: video generation leaves research preview"])
    n2["OpenAI releases Sora Turbo at sora.com to ChatGPT Plus and Pro users, with 1080p video up to 20 seconds, a…"]
    n7["update on the source page: as of 26 April 2026 the Sora product is no longer available"]
    n8{"Available to me today?"}
    n9["Sora was introduced as a step toward models that simulate the physical world, and this release was its first…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · sora · video-generation · generative-ai"]
    subgraph G0["What it adds"]
        n3["generate videos up to 1080p and 20 seconds, in widescreen, vertical or square"]
        n4["bring your own assets to extend, remix and blend, or generate from text"]
        n5["a storyboard tool for specifying inputs for each frame, plus Featured and Recent community feeds"]
        n6["included in Plus at no extra cost: up to 50 videos at 480p (or fewer at 720p) per month; Pro has 10x more…"]
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

Sora was introduced as a step toward models that simulate the physical world, and this release was its first consumer form. The banner added in 2026 is a reminder that even prominent launches can be retired, so the date matters when citing a product.
