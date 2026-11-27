---
title: "Sora 2: video and audio generation with physical realism"
categories: ["ai"]
tags: ["openai", "sora-2", "video-generation", "world-models"]
summary: "OpenAI releases Sora 2, a flagship video and audio generation model with more accurate physics, better control and synchronized dialogue and sound effects; the page now states the Sora product ended on 26 April 2026."
sources: 
  - title: "Sora 2 is here"
    url: "https://openai.com/index/sora-2"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:03.042Z"
highlights: ["The post calls Sora 2 the possible GPT-3.5 moment for video, after the original Sora as the GPT-1 moment.", "A banner states that, as of 26 April 2026, the Sora product is no longer available."]
draft: false
date: "2025-09-30"
---

## What happened

On 30 September 2025 **OpenAI** released **Sora 2**, described as more physically accurate, realistic and controllable than earlier systems, with **synchronized dialogue and sound effects**, available in a new Sora app.

## The technical details

From the OpenAI post:

- the original Sora of February 2024 is described as the **GPT-1 moment for video**, when behaviours like object permanence first emerged from scaling; Sora 2 is framed as a jump to the **GPT-3.5 moment**
- handles things prior video models struggled with: **Olympic gymnastics routines**, **paddleboard backflips that model buoyancy and rigidity**, and triple axels
- prior models tend to be over-optimistic, **morphing objects and deforming reality** to satisfy a prompt
- the team's stated aim is world simulation systems that help AI models understand the physical world
- **update on the source page:** as of 26 April 2026, the Sora product is no longer available

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Sora 2: video and audio generation with physical realism"]):::title
    n1(["OpenAI: Sora 2: video and audio generation with physical realism"])
    n2["OpenAI releases Sora 2, a flagship video and audio generation model with more accurate physics, better control…"]
    n7["update on the source page: as of 26 April 2026, the Sora product is no longer available"]
    n8{"Ready beyond the demo?"}
    n9["The interesting claim is about physics: a model that lets a failed shot fail, rather than bending the world to…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · sora-2 · video-generation · world-models"]
    subgraph G0["What it adds"]
        n3["the original Sora of February 2024 is described as the GPT-1 moment for video, when behaviours like object…"]
        n4["handles things prior video models struggled with: Olympic gymnastics routines, paddleboard backflips that…"]
        n5["prior models tend to be over-optimistic, morphing objects and deforming reality to satisfy a prompt"]
        n6["the team's stated aim is world simulation systems that help AI models understand the physical world"]
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

The interesting claim is about physics: a model that lets a failed shot fail, rather than bending the world to match the prompt, is closer to a simulator than a generator. That framing connects video models to the world-model research that Google DeepMind's Genie line also pursues.
