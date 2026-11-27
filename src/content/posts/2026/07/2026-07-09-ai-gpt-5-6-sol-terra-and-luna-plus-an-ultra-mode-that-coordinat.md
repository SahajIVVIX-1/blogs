---
title: "GPT-5.6: Sol, Terra and Luna, plus an ultra mode that coordinates agents"
categories: ["ai"]
tags: ["openai", "gpt-5-6", "model-family", "pricing", "agents"]
summary: "OpenAI launches the GPT-5.6 family: flagship Sol, balanced Terra and cost-efficient Luna, with an ultra setting that coordinates multiple agents across parallel workstreams."
sources: 
  - title: "GPT-5.6: Frontier intelligence that scales with your ambition"
    url: "https://openai.com/index/gpt-5-6"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:10.274Z"
highlights: ["Three tiers: Sol (flagship), Terra (everyday) and Luna (most cost-efficient).", "Ultra coordinates multiple agents across parallel workstreams to finish complex tasks faster."]
draft: false
date: "2026-07-09"
---

## What happened

On 9 July 2026 **OpenAI** launched the **GPT-5.6** family for general availability after a limited preview: **Sol**, the new flagship, **Terra**, a balanced model for everyday work, and **Luna**, the most cost-efficient.

## The technical details

From the OpenAI post:

- Sol is described as state of the art across **coding, knowledge work, cybersecurity and science**, with **fewer tokens and lower estimated cost**, so more successful work per dollar
- a new **ultra** setting, its highest-capability mode, **coordinates multiple agents across parallel workstreams**
- stronger **computer use and design judgment**, so results come out ready to use
- **price updates on the page:** 30 July 2026, Luna cut by 80% and Terra by 20%; 21 August 2026, Sol cut by over 20% for three months

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-5.6: Sol, Terra and Luna, plus an ultra mode that coordinates agents"]):::title
    n1(["OpenAI: GPT-5.6: Sol, Terra and Luna, plus an ultra mode that coordinates…"])
    n2["OpenAI launches the GPT-5.6 family: flagship Sol, balanced Terra and cost-efficient Luna, with an ultra…"]
    n6[/"price updates on the page: 30 July 2026, Luna cut by 80% and Terra by 20%; 21 August 2026, Sol cut…"/]
    n7{"Available to me today?"}
    n8["Splitting one release into three named tiers makes the cost-quality trade-off explicit, and the repeated price…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · gpt-5-6 · model-family · pricing"]
    subgraph G0["What it adds"]
        n3["Sol is described as state of the art across coding, knowledge work, cybersecurity and science, with fewer…"]
        n4["a new ultra setting, its highest-capability mode, coordinates multiple agents across parallel workstreams"]
        n5["stronger computer use and design judgment, so results come out ready to use"]
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

Splitting one release into three named tiers makes the cost-quality trade-off explicit, and the repeated price cuts show how fast per-token pricing was moving in 2026. The emphasis on performance per dollar, not only peak score, is the theme of this family.
