---
title: "The GPT Store opens with over 3 million custom GPTs"
categories: ["ai"]
tags: ["openai", "chatgpt", "gpts", "gpt-store"]
summary: "OpenAI begins rolling out the GPT Store to ChatGPT Plus, Team and Enterprise users, two months after announcing GPTs."
sources: 
  - title: "Introducing the GPT Store"
    url: "https://openai.com/index/introducing-the-gpt-store"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:41.104Z"
highlights: ["Users had created over 3 million custom versions of ChatGPT in two months.", "Sharing in the store requires a verified Builder Profile and a GPT saved for Everyone."]
draft: false
date: "2024-01-10"
---

## What happened

On 10 January 2024 **OpenAI** announced the **GPT Store**, a place to find useful and popular custom versions of ChatGPT. It started rolling out to ChatGPT Plus, Team and Enterprise users, two months after GPTs were introduced.

## The technical details

From the OpenAI post:

- a **community leaderboard** of popular and trending GPTs with categories including DALL·E, writing, research, programming, education and lifestyle
- **new featured GPTs every week**, first examples being AllTrails (trail recommendations), Consensus (search across 200M academic papers), Khan Academy's Code Tutor, Canva, Books and the CK-12 Flexi AI tutor
- to list a GPT: save it for **Everyone** (Anyone-with-a-link GPTs are not shown) and verify a **Builder Profile**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["The GPT Store opens with over 3 million custom GPTs"]):::title
    n1(["OpenAI: The GPT Store opens with over 3 million custom GPTs"])
    n2["OpenAI begins rolling out the GPT Store to ChatGPT Plus, Team and Enterprise users, two months after…"]
    n6{"Fits production use?"}
    n7["The store turns a personal customization feature into a distribution channel, which is why the post leads with a…"]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: openai · chatgpt · gpts · gpt-store"]
    subgraph G0["What it adds"]
        n3["a community leaderboard of popular and trending GPTs with categories including DALL·E, writing, research…"]
        n4["new featured GPTs every week, first examples being AllTrails (trail recommendations), Consensus (search across…"]
        n5["to list a GPT: save it for Everyone (Anyone-with-a-link GPTs are not shown) and verify a Builder Profile"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n6
    n4 --> n6
    n5 --> n6
    n6 --> n7
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

The store turns a personal customization feature into a distribution channel, which is why the post leads with a number: more than 3 million GPTs had been built in just two months, many of them shared.
