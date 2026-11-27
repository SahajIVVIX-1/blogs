---
title: "Genie 4: a world model with native audio and real-time interaction"
categories: ["ai"]
tags: ["google-deepmind", "genie-4", "world-models", "simulation", "multimodal"]
summary: "Google DeepMind announces Genie 4, a world model with enhanced photorealism, fluid movement and native audio, building on Gemini Omni and other Gemini models for coherence."
sources: 
  - title: "Genie 4: A new generation of world simulation"
    url: "https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:29.218Z"
highlights: ["It is natively multimodal: music, ambient noises and interactive dialogue are generated together with the world.", "Gemini Omni anchors simulations in real-world appearance, while other Gemini models help maintain coherence and continuity."]
draft: false
date: "2026-10-27"
---

## What happened

On 27 October 2026 **Google DeepMind** announced **Genie 4**, a new world model that unlocks greater realism and improves real-time interactive simulation. The post is by Raia Hadsell, Diego Rivas and Hang Qi.

## The technical details

From the Google DeepMind post:

- **native audio**: all sounds shown in the post are produced directly by Genie 4
- **builds on Gemini**: Gemini Omni grounds the simulation in real-world appearance and behavior, and other Gemini models provide the reasoning to keep it coherent
- you set an event in motion and Genie 4 simulates what happens next: **how the world responds, sounds, and how people move, react and speak**
- enhanced **photorealism and fluid movement**, navigated in real time with standard keyboard controls
- proposed uses include **training environments for robots and agents** and new interactive experiences

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Genie 4: a world model with native audio and real-time interaction"]):::title
    n1(["Google DeepMind: Genie 4: a world model with native audio and real-time interaction"])
    n2["Google DeepMind announces Genie 4, a world model with enhanced photorealism, fluid movement and native audio…"]
    n8{"Available to me today?"}
    n9["Simulated environments are the missing supply for training embodied agents, since real-world trials are slow and…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: google-deepmind · genie-4 · world-models · simulation"]
    subgraph G0["What it adds"]
        n3["native audio: all sounds shown in the post are produced directly by Genie 4"]
        n4["builds on Gemini: Gemini Omni grounds the simulation in real-world appearance and behavior, and other Gemini…"]
        n5["you set an event in motion and Genie 4 simulates what happens next: how the world responds, sounds, and how…"]
        n6["enhanced photorealism and fluid movement, navigated in real time with standard keyboard controls"]
        n7["proposed uses include training environments for robots and agents and new interactive experiences"]
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

Simulated environments are the missing supply for training embodied agents, since real-world trials are slow and unsafe. Adding sound and dialogue moves Genie from a visual simulator toward a full environment.
