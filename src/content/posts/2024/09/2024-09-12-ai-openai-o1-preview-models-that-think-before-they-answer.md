---
title: "OpenAI o1-preview: models that think before they answer"
categories: ["ai"]
tags: ["openai", "o1", "reasoning", "chain-of-thought"]
summary: "OpenAI introduces the o1 series, reasoning models trained to spend more time thinking before responding, first released as o1-preview in ChatGPT and the API."
sources: 
  - title: "Introducing OpenAI o1"
    url: "https://openai.com/index/introducing-openai-o1-preview"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:45.725Z"
highlights: ["The models are trained to refine their thinking, try different strategies and recognize mistakes.", "The counter was reset to 1, giving the series the name OpenAI o1."]
draft: false
date: "2024-09-12"
---

## What happened

On 12 September 2024 **OpenAI** released **o1-preview**, the first of a new series of models designed to spend more time thinking before they respond, to solve harder problems in science, coding and math.

## The technical details

From the OpenAI post:

- trained to **reason through problems at length**, refining the thinking process and recognizing mistakes, much like a person would
- released in **ChatGPT and the API** as a preview, with evaluations shown for the next update then in development
- as an early model it lacked features such as **web browsing** and **file or image upload**; GPT-4o remained more capable for many common cases
- a **new safety training approach** uses the model's reasoning to follow safety and alignment guidelines
- rate limits were later set to 50 queries per week for o1-preview and 50 per day for o1-mini; the page now notes both have been retired from the API

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["OpenAI o1-preview: models that think before they answer"]):::title
    n1(["OpenAI: OpenAI o1-preview: models that think before they answer"])
    n2["OpenAI introduces the o1 series, reasoning models trained to spend more time thinking before responding, first…"]
    n8{"Fits production use?"}
    n9["This is the release that made “thinking time” a product feature: instead of a bigger pretrained model alone…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · o1 · reasoning · chain-of-thought"]
    subgraph G0["What it adds"]
        n3["trained to reason through problems at length, refining the thinking process and recognizing mistakes, much…"]
        n4["as an early model it lacked features such as web browsing and file or image upload; GPT-4o remained more…"]
        n5["a new safety training approach uses the model's reasoning to follow safety and alignment guidelines"]
    end
    subgraph G1["Access and limits"]
        n6[/"released in ChatGPT and the API as a preview, with evaluations shown for the next update then in…"/]
        n7["rate limits were later set to 50 queries per week for o1-preview and 50 per day for o1-mini; the…"]
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
    n8 -- "no" --> n7
    n6 --> n9
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

This is the release that made “thinking time” a product feature: instead of a bigger pretrained model alone, quality came from letting the model reason longer at inference. The post is explicit that for everyday tasks GPT-4o was still the better choice, positioning o1 for hard reasoning problems.
