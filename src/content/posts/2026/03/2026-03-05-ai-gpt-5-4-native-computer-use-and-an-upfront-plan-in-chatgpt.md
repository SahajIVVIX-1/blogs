---
title: "GPT-5.4: native computer use and an upfront plan in ChatGPT"
categories: ["ai"]
tags: ["openai", "gpt-5-4", "computer-use", "agents", "reasoning"]
summary: "OpenAI releases GPT-5.4 in ChatGPT (as GPT-5.4 Thinking), the API and Codex, with GPT-5.4 Pro for maximum performance, and native computer-use capabilities."
sources: 
  - title: "Introducing GPT-5.4"
    url: "https://openai.com/index/introducing-gpt-5-4"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:07.042Z"
highlights: ["In Codex and the API it is the first general-purpose OpenAI model with native, state-of-the-art computer use.", "GPT-5.4 Thinking can show an upfront plan that you can adjust mid-response."]
draft: false
date: "2026-03-05"
---

## What happened

On 5 March 2026 **OpenAI** released **GPT-5.4**, its most capable and efficient frontier model for professional work, in ChatGPT as **GPT-5.4 Thinking**, in the API and in Codex, plus **GPT-5.4 Pro** for complex tasks.

## The technical details

From the OpenAI post:

- brings together recent advances in **reasoning, coding and agentic workflows**, incorporating the coding capabilities of GPT-5.3-Codex
- better across **spreadsheets, presentations and documents** and across tools and software environments, aiming for less back-and-forth
- in ChatGPT, an **upfront plan of its thinking** you can redirect while it works, and improved **deep web research** for specific queries
- in Codex and the API, the **first general-purpose model with native, state-of-the-art computer use**, so agents can operate computers across applications; the feed description also mentions tool search and a 1M-token context

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-5.4: native computer use and an upfront plan in ChatGPT"]):::title
    n1(["OpenAI: GPT-5.4: native computer use and an upfront plan in ChatGPT"])
    n2["OpenAI releases GPT-5.4 in ChatGPT (as GPT-5.4 Thinking), the API and Codex, with GPT-5.4 Pro for maximum…"]
    n6[/"in ChatGPT, an upfront plan of its thinking you can redirect while it works, and improved deep web…"/]
    n7{"Available to me today?"}
    n8["The upfront plan changes the interaction: instead of waiting for a long answer and then correcting it, you steer…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · gpt-5-4 · computer-use · agents"]
    subgraph G0["What it adds"]
        n3["brings together recent advances in reasoning, coding and agentic workflows, incorporating the coding…"]
        n4["better across spreadsheets, presentations and documents and across tools and software environments, aiming for…"]
        n5["in Codex and the API, the first general-purpose model with native, state-of-the-art computer use, so agents…"]
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

The upfront plan changes the interaction: instead of waiting for a long answer and then correcting it, you steer the work mid-flight. Native computer use folds into a general model what used to need a specialized agent such as Operator.
