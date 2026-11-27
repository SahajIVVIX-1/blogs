---
title: "GPT-5.2: a frontier model for professional work and long-running agents"
categories: ["ai"]
tags: ["openai", "gpt-5-2", "agents", "knowledge-work", "benchmarks"]
summary: "OpenAI introduces GPT-5.2, which it calls its most capable model series for professional knowledge work, better at spreadsheets, presentations, coding, long context and multi-step projects."
sources: 
  - title: "Introducing GPT-5.2"
    url: "https://openai.com/index/introducing-gpt-5-2"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:05.099Z"
highlights: ["OpenAI reports it outperforms industry professionals on well-specified knowledge-work tasks spanning 44 occupations (GDPval).", "The post cites ChatGPT Enterprise users saving 40 to 60 minutes a day, and more than 10 hours a week for heavy users."]
draft: false
date: "2025-12-11"
---

## What happened

On 11 December 2025 **OpenAI** introduced **GPT-5.2**, which it describes as the most advanced frontier model for professional work and long-running agents.

## The technical details

From the OpenAI post:

- better at **creating spreadsheets, building presentations, writing code, perceiving images, understanding long contexts, using tools** and handling complex multi-step projects
- new state of the art on **GDPval**, a benchmark of knowledge-work tasks across **44 occupations**, according to OpenAI
- also reported on SWE-Bench Pro, SWE-bench Verified, GPQA Diamond, CharXiv Reasoning, AIME 2025, FrontierMath (Tiers 1 to 3 and Tier 4) and ARC-AGI-1 and 2
- early testers cited include Notion, Box, Shopify, Harvey and Zoom (long-horizon reasoning and tool calling) and Databricks, Hex and Triple Whale

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-5.2: a frontier model for professional work and long-running agents"]):::title
    n1(["OpenAI: GPT-5.2: a frontier model for professional work and long-running…"])
    n2["OpenAI introduces GPT-5.2, which it calls its most capable model series for professional knowledge work…"]
    n6[/"also reported on SWE-Bench Pro, SWE-bench Verified, GPQA Diamond, CharXiv Reasoning, AIME 2025…"/]
    n7{"Available to me today?"}
    n8["The framing has moved from answering questions to doing a day's work product: spreadsheets, decks and multi-step…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · gpt-5-2 · agents · knowledge-work"]
    subgraph G0["What it adds"]
        n3["better at creating spreadsheets, building presentations, writing code, perceiving images, understanding long…"]
        n4["new state of the art on GDPval, a benchmark of knowledge-work tasks across 44 occupations, according to OpenAI"]
        n5["early testers cited include Notion, Box, Shopify, Harvey and Zoom (long-horizon reasoning and tool calling)…"]
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

The framing has moved from answering questions to doing a day's work product: spreadsheets, decks and multi-step projects. The post justifies this with usage data (time saved per day) rather than only benchmark scores.
