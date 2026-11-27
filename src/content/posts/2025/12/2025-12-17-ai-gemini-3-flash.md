---
title: "Gemini 3 Flash: \"Pro-grade reasoning at Flash speed\""
categories: ["ai"]
tags: ["llm", "google", "release"]
summary: "Google released Gemini 3 Flash, positioned as frontier-level reasoning at Flash speed and lower cost; it became the default model in the Gemini app and in Search's AI Mode."
sources: 
  - title: "Gemini 3 Flash: frontier intelligence built for speed"
    url: "https://deepmind.google/blog/gemini-3-flash-frontier-intelligence-built-for-speed/"
    publisher: "Google DeepMind"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Gemini 3 Flash became the default model in the Gemini app and AI Mode in Search.", "Google says the Gemini 3 API was already processing over 1T tokens per day."]
draft: false
date: "2025-12-17"
---

## What happened

Google released **Gemini 3 Flash**, expanding the Gemini 3 family a month after Gemini 3 Pro and Gemini 3 Deep Think.

## The technical details

From the post:

- described as **frontier intelligence built for speed**, at a fraction of the cost of larger models
- available in the **Gemini app** and **AI Mode in Search**, where it becomes the default model
- for developers: Gemini API in Google AI Studio, Google Antigravity, Gemini CLI, Android Studio, Vertex AI and Gemini Enterprise
- Google says that since Gemini 3's launch, its API had been processing **over 1T tokens per day**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini 3 Flash: #quot;Pro-grade reasoning at Flash speed#quot;"]):::title
    n1(["Google DeepMind: Gemini 3 Flash: #quot;Pro-grade reasoning at Flash speed#quot;"])
    n2["Google released Gemini 3 Flash, positioned as frontier-level reasoning at Flash speed and lower cost; it…"]
    n6[/"available in the Gemini app and AI Mode in Search, where it becomes the default model"/]
    n7{"Ready beyond the demo?"}
    n8["The #quot;Flash#quot; tier is where most real traffic runs, because latency and cost matter more than the last few points of…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: llm · google · release"]
    subgraph G0["What it adds"]
        n3["described as frontier intelligence built for speed, at a fraction of the cost of larger models"]
        n4["for developers: Gemini API in Google AI Studio, Google Antigravity, Gemini CLI, Android Studio, Vertex AI and…"]
        n5["Google says that since Gemini 3's launch, its API had been processing over 1T tokens per day"]
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

The "Flash" tier is where most real traffic runs, because latency and cost matter more than the last few points of quality. Later Flash releases here (3.5 in May, 3.7 in August 2026) continue the pattern.
