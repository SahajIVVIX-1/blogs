---
title: "smolagents: agents that write their actions as code"
categories: ["ai"]
tags: ["agents", "hugging-face", "open-source"]
summary: "Hugging Face launched smolagents, a minimal agent library whose main agent type writes its actions as Python code, plus a clear way to think about \"agency\" as a spectrum."
sources: 
  - title: "Introducing smolagents: simple agents that write actions in code"
    url: "https://huggingface.co/blog/smolagents"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
  - title: "smolagents (GitHub)"
    url: "https://github.com/huggingface/smolagents"
    publisher: "GitHub"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["The post defines agents as \"programs where LLM outputs control the workflow\".", "Agency is a spectrum: from a simple processor, to a router, to tool calls, to multi-step loops."]
draft: false
date: "2024-12-31"
---

## What happened

Hugging Face launched **smolagents**, a very small library for building agents. The headline agent is a **`CodeAgent`**, which writes its actions as **Python code**.

## The technical details

The post's framing is the part I found most useful. **AI agents are "programs where LLM outputs control the workflow"**, and agency is a **spectrum**, not yes/no:

| level | LLM output… | name |
|---|---|---|
| ☆☆☆ | has no effect on program flow | simple processor |
| ★☆☆ | picks a branch | router |
| ★★☆ | picks a function and its arguments | tool call |
| ★★★ | controls iteration and when to stop | multi-step agent |

The post also discusses how well open models do on agentic workflows.

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["smolagents: agents that write their actions as code"]):::title
    n1(["Hugging Face: smolagents: agents that write their actions as code"])
    n2["Hugging Face launched smolagents, a minimal agent library whose main agent type writes its actions as Python…"]
    n9{"Ready beyond the demo?"}
    n10["It's a clear vocabulary for the agent loop I wrote by hand in August 2026: decide, act, observe, until done."]
    n11(["Track the rollout and follow-up releases"])
    n12["Topics: agents · hugging-face · open-source"]
    subgraph G0["What it adds"]
        n3["☆☆☆: has no effect on program flow · simple processor"]
        n4["★☆☆: picks a branch · router"]
        n5["★★☆: picks a function and its arguments · tool call"]
        n6["★★★: controls iteration and when to stop · multi-step agent"]
        n7["The post's framing is the part I found most useful."]
        n8["AI agents are #quot;programs where LLM outputs control the workflow#quot;, and agency is a spectrum, not yes/no: The…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n2 --> n8
    n3 --> n9
    n4 --> n9
    n5 --> n9
    n6 --> n9
    n7 --> n9
    n8 --> n9
    n9 --> n10
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

It's a clear vocabulary for the agent loop I wrote by hand in August 2026: decide, act, observe, until done. Writing actions as code, rather than as one JSON tool call at a time, lets a single step combine several tools with loops and variables.
