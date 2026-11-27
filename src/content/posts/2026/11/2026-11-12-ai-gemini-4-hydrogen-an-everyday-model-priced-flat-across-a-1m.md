---
title: "Gemini 4 Hydrogen: an everyday model priced flat across a 1M-token window"
categories: ["ai"]
tags: ["google-deepmind", "gemini-4", "hydrogen", "antigravity", "pricing"]
summary: "Google DeepMind introduces Gemini 4 Hydrogen, a fast, efficient model for everyday coding and agentic work, priced flat at $1.50 per million input tokens and $7.50 per million output tokens across its 1M-token context."
sources: 
  - title: "Introducing Gemini 4 Hydrogen"
    url: "https://deepmind.google/blog/introducing-gemini-4-hydrogen/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:34.170Z"
highlights: ["It edges Gemini 4 Argon on the Artificial Analysis Intelligence Index at default thinking (51 vs 50), reaching 54 at its xhigh setting.", "Orchestrator in Google Antigravity switches between models such as Carbon and Hydrogen automatically."]
draft: false
date: "2026-11-12"
---

## What happened

On 12 November 2026 **Google DeepMind** introduced **Gemini 4 Hydrogen**, bringing frontier-class intelligence to everyday coding and agentic workflows with speed and efficiency. The page was last updated on 16 November.

## The technical details

From the Google DeepMind post:

- **Artificial Analysis Intelligence Index:** 51 at default high thinking versus 50 for Argon, and 54 at the **xhigh** thinking setting
- **pricing:** flat across the whole **1 million-token** context at **$1.50 per million input tokens and $7.50 per million output tokens**
- built to work alone or as the **high-efficiency execution engine** in multi-model workflows, with Carbon and Argon handling deep architectural judgment
- **Orchestrator in Google Antigravity** dynamically switches between models so the multi-model collaboration is automatic

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini 4 Hydrogen: an everyday model priced flat across a 1M-token window"]):::title
    n1(["Google DeepMind: Gemini 4 Hydrogen: an everyday model priced flat across a 1M-token…"])
    n2["Google DeepMind introduces Gemini 4 Hydrogen, a fast, efficient model for everyday coding and agentic work…"]
    n6[/"pricing: flat across the whole 1 million-token context at $1.50 per million input tokens and $7.50…"/]
    n7{"Ready beyond the demo?"}
    n8["Flat pricing over the full window removes the usual surcharge for long context, which matters for agents that…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: google-deepmind · gemini-4 · hydrogen · antigravity"]
    subgraph G0["What it adds"]
        n3["Artificial Analysis Intelligence Index: 51 at default high thinking versus 50 for Argon, and 54 at the xhigh…"]
        n4["built to work alone or as the high-efficiency execution engine in multi-model workflows, with Carbon and Argon…"]
        n5["Orchestrator in Google Antigravity dynamically switches between models so the multi-model collaboration is…"]
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

Flat pricing over the full window removes the usual surcharge for long context, which matters for agents that carry large histories. The multi-model framing (a strong model plans, a fast one executes) is becoming a standard way to control cost.
