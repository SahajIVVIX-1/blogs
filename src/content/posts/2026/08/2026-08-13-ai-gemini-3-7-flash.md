---
title: "Gemini 3.7 Flash: three weeks after 3.6"
categories: ["ai"]
tags: ["llm", "coding", "agents", "google"]
summary: "Google released Gemini 3.7 Flash three weeks after 3.6 Flash, reporting large gains on coding (DeepSWE v1.1 65.3% vs 49.0%), web development and document-heavy knowledge work, at half 3.6 Flash's introductory price."
sources: 
  - title: "Introducing Gemini 3.7 Flash"
    url: "https://deepmind.google/blog/introducing-gemini-3-7-flash/"
    publisher: "Google DeepMind"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Releases now come weeks apart: 3.7 Flash followed 3.6 Flash after three weeks.", "Reported jumps include DeepSWE v1.1 (65.3% vs 49.0%) and AutomationBench (30.4% vs 17.0%)."]
draft: false
date: "2026-08-13"
---

## What happened

Google released **Gemini 3.7 Flash**, described as its most intelligent "workhorse" model for coding and agents, just **three weeks** after Gemini 3.6 Flash.

## The technical details

From the post, comparing 3.7 Flash with 3.6 Flash:

- **FrontierCode 1.1 Main**: 43.6% vs 34.4%
- **DeepSWE v1.1**: 65.3% vs 49.0%
- **WebDev Arena** (Arena.ai): Elo 1588 vs 1538
- **GDP.pdf** (complex document processing): 34.0% vs 22.0%
- **AutomationBench** (business workflows): 30.4% vs 17.0%
- introductory price: **half** of 3.6 Flash's per-million-token cost

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini 3.7 Flash: three weeks after 3.6"]):::title
    n1(["Google DeepMind: Gemini 3.7 Flash: three weeks after 3.6"])
    n2["Google released Gemini 3.7 Flash three weeks after 3.6 Flash, reporting large gains on coding (DeepSWE v1.1…"]
    n8[/"introductory price: half of 3.6 Flash's per-million-token cost"/]
    n9{"Fits production use?"}
    n10["The release rhythm is the story: frontier #quot;workhorse#quot; models now iterate in weeks, and benchmarks have moved from…"]
    n11(["Track the rollout and follow-up releases"])
    n12["Topics: llm · coding · agents · google"]
    subgraph G0["What it adds"]
        n3["FrontierCode 1.1 Main: 43.6% vs 34.4%"]
        n4["DeepSWE v1.1: 65.3% vs 49.0%"]
        n5["WebDev Arena (Arena.ai): Elo 1588 vs 1538"]
        n6["GDP.pdf (complex document processing): 34.0% vs 22.0%"]
        n7["AutomationBench (business workflows): 30.4% vs 17.0%"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n9
    n4 --> n9
    n5 --> n9
    n6 --> n9
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

The release rhythm is the story: frontier "workhorse" models now iterate in weeks, and benchmarks have moved from short coding puzzles to issue resolution, web apps and real document workflows.
