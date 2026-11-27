---
title: "Open-source DeepResearch in 24 hours"
categories: ["ai"]
tags: ["agents", "research-agents", "open-source"]
summary: "The day after OpenAI's Deep Research launch, Hugging Face set out to reproduce its agentic framework openly in 24 hours, built on smolagents' CodeAgent and evaluated on GAIA."
sources: 
  - title: "Open-source DeepResearch – Freeing our search agents"
    url: "https://huggingface.co/blog/open-deep-research"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
  - title: "Mialon et al. (2023), GAIA: a benchmark for General AI Assistants"
    url: "https://arxiv.org/abs/2311.12983"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["OpenAI shared results but little about the agent framework, so Hugging Face rebuilt one in the open.", "GAIA, the benchmark of tool-heavy questions summarised here in November 2023, was the yardstick."]
draft: false
date: "2025-02-04"
---

## What happened

OpenAI released **Deep Research**, a system that browses the web and answers questions from what it reads. Hugging Face's post the next day describes a **24-hour effort to reproduce it openly**.

## The technical details

From the post:

- OpenAI reported large gains on **GAIA**: near **67%** correct on average (1-shot), and **47.6%** on the hardest "level 3" questions
- Deep Research combines an LLM with an **agentic framework** that guides tool use (like web search) in steps, and OpenAI disclosed little about that framework
- the open version uses a **CodeAgent** (from smolagents, the previous post) plus custom browsing and text-inspection tools
- the post includes results, community reproductions and next steps

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Open-source DeepResearch in 24 hours"]):::title
    n1(["Hugging Face: Open-source DeepResearch in 24 hours"])
    n2["The day after OpenAI's Deep Research launch, Hugging Face set out to reproduce its agentic framework openly in…"]
    n7{"Available to me today?"}
    n8["It shows that much of an agent's power is in the framework around the model (tools, loop, memory), not only the…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: agents · research-agents · open-source"]
    subgraph G0["What it adds"]
        n3["OpenAI reported large gains on GAIA: near 67% correct on average (1-shot), and 47.6% on the hardest #quot;level 3#quot;…"]
        n4["Deep Research combines an LLM with an agentic framework that guides tool use (like web search) in steps, and…"]
        n5["the open version uses a CodeAgent (from smolagents, the previous post) plus custom browsing and…"]
        n6["the post includes results, community reproductions and next steps"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n7
    n4 --> n7
    n5 --> n7
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

It shows that much of an agent's power is in the **framework around the model** (tools, loop, memory), not only the model. Two months later, "Code as Agent Harness" (May 2026 on this blog) builds a whole survey on that idea.
