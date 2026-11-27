---
title: "Gemini 3.1 Pro: upgraded core reasoning"
categories: ["ai"]
tags: ["llm", "reasoning", "google"]
summary: "Google released Gemini 3.1 Pro in preview, the core model behind the previous week's Gemini 3 Deep Think update, rolling out across the Gemini API, Antigravity, Vertex AI, the Gemini app and NotebookLM."
sources: 
  - title: "Gemini 3.1 Pro: A smarter model for your most complex tasks"
    url: "https://deepmind.google/blog/gemini-3-1-pro-a-smarter-model-for-your-most-complex-tasks/"
    publisher: "Google DeepMind"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["3.1 Pro is described as the upgraded core intelligence behind the Gemini 3 Deep Think update.", "It's released in preview, to validate updates and push agentic workflows further."]
draft: false
date: "2026-02-19"
---

## What happened

Google released **Gemini 3.1 Pro**, a week after a major **Gemini 3 Deep Think** update for science, research and engineering.

## The technical details

From the post:

- described as the **upgraded core intelligence** behind those Deep Think results
- a **step forward in core reasoning**, built on the Gemini 3 series
- rolling out **in preview** for developers (Gemini API in AI Studio, Gemini CLI, Google Antigravity, Android Studio), enterprises (Vertex AI, Gemini Enterprise) and consumers (Gemini app, NotebookLM)

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini 3.1 Pro: upgraded core reasoning"]):::title
    n1(["Google DeepMind: Gemini 3.1 Pro: upgraded core reasoning"])
    n2["Google released Gemini 3.1 Pro in preview, the core model behind the previous week's Gemini 3 Deep Think…"]
    n5[/"rolling out in preview for developers (Gemini API in AI Studio, Gemini CLI, Google Antigravity…"/]
    n6{"Ready beyond the demo?"}
    n7["It shows the pattern of a #quot;deep think#quot; mode built on a base model: improvements to the base flow into both…"]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: llm · reasoning · google"]
    subgraph G0["What it adds"]
        n3["described as the upgraded core intelligence behind those Deep Think results"]
        n4["a step forward in core reasoning, built on the Gemini 3 series"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n3 --> n6
    n4 --> n6
    n6 -- "yes" --> n5
    n5 --> n7
    n7 --> n8
    n9 --> n2
    class n6 dec
    class n1,n8 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

It shows the pattern of a "deep think" mode built on a base model: improvements to the base flow into both everyday use and the slower reasoning mode. The post's specific benchmark tables aren't reproduced here.
