---
title: "Operator: an agent that uses its own browser"
categories: ["ai"]
tags: ["openai", "operator", "agents", "computer-use"]
summary: "OpenAI releases Operator as a research preview for Pro users in the U.S.: an agent that looks at web pages and interacts with them by typing, clicking and scrolling."
sources: 
  - title: "Introducing Operator"
    url: "https://openai.com/index/introducing-operator"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:51.659Z"
highlights: ["Operator works through its own browser, using the same interfaces humans use.", "On 17 July 2025 it was folded into ChatGPT as ChatGPT agent, and the standalone site was set to sunset."]
draft: false
date: "2025-01-23"
---

## What happened

On 23 January 2025 **OpenAI** released **Operator**, an agent that can go to the web and perform tasks for you. It was launched as a research preview to ChatGPT Pro users in the U.S., so that OpenAI could learn from real use before widening access.

## The technical details

From the OpenAI post:

- uses its **own browser**: it looks at a page and interacts by **typing, clicking and scrolling**
- aimed at repetitive browser tasks such as **filling out forms, ordering groceries and creating memes**
- described as one of OpenAI's first **agents**: AIs that do work independently once given a task
- **research preview**, so limitations are expected and it was expected to evolve with feedback
- **update, 17 July 2025:** Operator is now integrated into ChatGPT as ChatGPT agent (select agent mode), and operator.chatgpt.com was to sunset in the following weeks

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Operator: an agent that uses its own browser"]):::title
    n1(["OpenAI: Operator: an agent that uses its own browser"])
    n2["OpenAI releases Operator as a research preview for Pro users in the U.S.: an agent that looks at web pages and…"]
    n8{"Available to me today?"}
    n9["The approach is to use the interfaces people already use, rather than wait for every service to offer an API."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · operator · agents · computer-use"]
    subgraph G0["What it adds"]
        n3["uses its own browser: it looks at a page and interacts by typing, clicking and scrolling"]
        n4["aimed at repetitive browser tasks such as filling out forms, ordering groceries and creating memes"]
        n5["described as one of OpenAI's first agents: AIs that do work independently once given a task"]
    end
    subgraph G1["Access and limits"]
        n6[/"research preview, so limitations are expected and it was expected to evolve with feedback"/]
        n7["update, 17 July 2025: Operator is now integrated into ChatGPT as ChatGPT agent (select agent…"]
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
    n8 -- "no" --> n7
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

The approach is to use the interfaces people already use, rather than wait for every service to offer an API. That is also why the rollout started small, to Pro users in one country: an agent that acts on websites has to be tested against the real, messy web before it is widely available.
