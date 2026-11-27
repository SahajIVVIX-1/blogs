---
title: "ChatGPT agent: one system that browses, researches and acts"
categories: ["ai"]
tags: ["openai", "chatgpt-agent", "agents", "operator", "deep-research"]
summary: "OpenAI introduces ChatGPT agent, a unified agentic system combining Operator's web interaction and deep research's synthesis, working on its own virtual computer."
sources: 
  - title: "Introducing ChatGPT agent"
    url: "https://openai.com/index/introducing-chatgpt-agent"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:00.311Z"
highlights: ["Brings together Operator, deep research and ChatGPT's conversational ability in one system.", "ChatGPT asks permission before consequential actions, and the user can interrupt or take over the browser."]
draft: false
date: "2025-07-17"
---

## What happened

On 17 July 2025 **OpenAI** introduced **ChatGPT agent**: ChatGPT can now do work for you using its own computer, handling complex tasks from start to finish. Pro, Plus and Team users could activate it from the tools dropdown by selecting “agent mode”.

## The technical details

From the OpenAI post:

- a **unified agentic system** combining Operator's ability to interact with websites, deep research's skill at synthesizing information, and ChatGPT's conversational fluency
- uses its **own virtual computer**, shifting between reasoning and action
- can navigate websites, filter results, prompt for secure login, **run code**, run analyses and deliver **editable slideshows and spreadsheets**
- example requests: brief me on client meetings using recent news; plan and buy ingredients for a Japanese breakfast for four; analyze three competitors and create a slide deck
- **control:** it requests permission before actions of consequence, and you can interrupt, take over the browser or stop at any point

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["ChatGPT agent: one system that browses, researches and acts"]):::title
    n1(["OpenAI: ChatGPT agent: one system that browses, researches and acts"])
    n2["OpenAI introduces ChatGPT agent, a unified agentic system combining Operator's web interaction and deep…"]
    n7[/"example requests: brief me on client meetings using recent news; plan and buy ingredients for a…"/]
    n8{"Available to me today?"}
    n9["Operator could act but not research deeply, and deep research could read but not act; this merges them."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · chatgpt-agent · agents · operator"]
    subgraph G0["What it adds"]
        n3["a unified agentic system combining Operator's ability to interact with websites, deep research's skill at…"]
        n4["uses its own virtual computer, shifting between reasoning and action"]
        n5["can navigate websites, filter results, prompt for secure login, run code, run analyses and deliver editable…"]
        n6["control: it requests permission before actions of consequence, and you can interrupt, take over the browser or…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n2 --> n5
    n5 --> n6
    n4 --> n8
    n6 --> n8
    n8 -- "yes" --> n7
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

Operator could act but not research deeply, and deep research could read but not act; this merges them. The human-in-the-loop controls in the post (permission requests, takeover) are central to how such an agent is meant to be trusted.
