---
title: "Deep research in ChatGPT: multi-step research in tens of minutes"
categories: ["ai"]
tags: ["openai", "deep-research", "agents", "chatgpt", "web-search"]
summary: "OpenAI launches deep research, an agentic ChatGPT capability that conducts multi-step research on the internet and does in tens of minutes what would take a human many hours."
sources: 
  - title: "Introducing deep research"
    url: "https://openai.com/index/introducing-deep-research"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:54.060Z"
highlights: ["The page lists a year of updates, from Pro-only access to all Plus users, higher limits, agent mode and MCP connections.", "A lightweight version powered by o4-mini lets usage limits rise while preserving quality."]
draft: false
date: "2025-02-02"
---

## What happened

On 2 February 2025 **OpenAI** launched **deep research** in ChatGPT, a new agentic capability for complex tasks that conducts multi-step research on the internet, finishing in tens of minutes work that would take a person many hours.

## The technical details

From the OpenAI post:

- **5 Feb 2025:** available to Pro users in the UK, Switzerland and the European Economic Area
- **25 Feb 2025:** all Plus users can use it
- **24 Apr 2025:** limits raised to 25 queries a month for Plus, Team, Enterprise and Edu, 250 for Pro and 5 for Free, using a **lightweight version powered by o4-mini**; queries switch to it automatically once the full-version limit is reached
- **17 Jul 2025:** deeper and broader research using a visual browser as part of ChatGPT agent
- **10 Feb 2026:** connect deep research to any **MCP** server or app, restrict web searches to trusted sites, track progress in real time and interrupt with follow-ups

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Deep research in ChatGPT: multi-step research in tens of minutes"]):::title
    n1(["OpenAI: Deep research in ChatGPT: multi-step research in tens of minutes"])
    n2["OpenAI launches deep research, an agentic ChatGPT capability that conducts multi-step research on the internet…"]
    n8{"Fits production use?"}
    n9["This is research as a long-running task rather than a chat reply, and the update log shows where it went next…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · deep-research · agents · chatgpt"]
    subgraph G0["What it adds"]
        n3["24 Apr 2025: limits raised to 25 queries a month for Plus, Team, Enterprise and Edu, 250 for Pro and 5 for…"]
        n4["17 Jul 2025: deeper and broader research using a visual browser as part of ChatGPT agent"]
        n5["10 Feb 2026: connect deep research to any MCP server or app, restrict web searches to trusted sites, track…"]
    end
    subgraph G1["Access and limits"]
        n6[/"5 Feb 2025: available to Pro users in the UK, Switzerland and the European Economic Area"/]
        n7[/"25 Feb 2025: all Plus users can use it"/]
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
    n8 -- "yes" --> n7
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

This is research as a long-running task rather than a chat reply, and the update log shows where it went next: cheaper variants to raise limits, then control over sources and live steering. The 2026 additions (trusted sites, MCP connections) address the main criticism of such tools, which is knowing what they relied on.
