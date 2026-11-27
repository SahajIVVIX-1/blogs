---
title: "Gemini 3.5 Flash: agents and coding at Flash speed"
categories: ["ai"]
tags: ["llm", "agents", "coding", "google"]
summary: "Google DeepMind introduced Gemini 3.5 with 3.5 Flash first, reporting it beats Gemini 3.1 Pro on agentic and coding benchmarks (Terminal-Bench 2.1 76.2%, MCP Atlas 83.6%) at about 4× the output speed of other frontier models."
sources: 
  - title: "Gemini 3.5: frontier intelligence with action"
    url: "https://deepmind.google/blog/gemini-3-5-frontier-intelligence-with-action/"
    publisher: "Google DeepMind"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["A Flash model reported to beat the previous Pro on coding and agent benchmarks.", "MCP Atlas, an agent benchmark built around the Model Context Protocol, is among the reported results."]
draft: false
date: "2026-05-19"
---

## What happened

Google DeepMind introduced **Gemini 3.5**, starting with **3.5 Flash**, available in the Gemini app, AI Mode in Search, Google Antigravity, the Gemini API and enterprise products. **3.5 Pro** was said to be in internal use and due the next month. The page is dated 19 May 2026.

## The technical details

From the post:

- described as Google's **strongest agentic and coding model yet**
- reported to beat **Gemini 3.1 Pro** on:
  - **Terminal-Bench 2.1**: 76.2%
  - **GDPval-AA**: 1656 Elo
  - **MCP Atlas**: 83.6%
- **CharXiv Reasoning** (multimodal understanding): 84.2%
- about **4× faster** in output tokens per second than other frontier models

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini 3.5 Flash: agents and coding at Flash speed"]):::title
    n1(["Google DeepMind: Gemini 3.5 Flash: agents and coding at Flash speed"])
    n2["Google DeepMind introduced Gemini 3.5 with 3.5 Flash first, reporting it beats Gemini 3.1 Pro on agentic and…"]
    n7{"Fits production use?"}
    n8["The framing has moved from #quot;chat#quot; to #quot;action#quot;: long-horizon agent tasks."]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: llm · agents · coding · google"]
    subgraph G0["What it adds"]
        n3["described as Google's strongest agentic and coding model yet"]
        n4["reported to beat Gemini 3.1 Pro on:"]
        n5["CharXiv Reasoning (multimodal understanding): 84.2%"]
        n6["about 4× faster in output tokens per second than other frontier models"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n2 --> n5
    n5 --> n6
    n4 --> n7
    n6 --> n7
    n7 --> n8
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

The framing has moved from "chat" to "action": long-horizon agent tasks. An MCP-based benchmark in a launch post shows how quickly MCP (my September 2026 study post) became standard plumbing.
