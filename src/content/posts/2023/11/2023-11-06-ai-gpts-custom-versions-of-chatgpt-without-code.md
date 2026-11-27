---
title: "GPTs: custom versions of ChatGPT without code"
categories: ["ai"]
tags: ["openai", "chatgpt", "gpts", "customization"]
summary: "OpenAI introduces GPTs, custom versions of ChatGPT that combine instructions, extra knowledge and any combination of skills, buildable by conversation."
sources: 
  - title: "Introducing GPTs"
    url: "https://openai.com/index/introducing-gpts"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:40.446Z"
highlights: ["No coding is needed: a GPT is created by chatting, giving instructions and knowledge, and choosing capabilities.", "GPTs can be private, shared inside a company, or public."]
draft: false
date: "2023-11-06"
---

## What happened

On 6 November 2023 **OpenAI** introduced **GPTs**, a way for anyone to create a tailored version of ChatGPT for a specific task and share it. Example GPTs from Canva and Zapier AI Actions were available the same day to ChatGPT Plus and Enterprise users, with more users to follow.

## The technical details

From the OpenAI post:

- a GPT combines **instructions**, **extra knowledge** and a set of **skills** such as searching the web, making images or analyzing data
- built at chatgpt.com/create by starting a conversation; **no coding** required
- can be made for yourself, for internal company use, or for everyone
- follows **Custom Instructions**, launched in July 2023, which let users set preferences but not much more

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPTs: custom versions of ChatGPT without code"]):::title
    n1(["OpenAI: GPTs: custom versions of ChatGPT without code"])
    n2["OpenAI introduces GPTs, custom versions of ChatGPT that combine instructions, extra knowledge and any…"]
    n6[/"follows Custom Instructions, launched in July 2023, which let users set preferences but not much…"/]
    n7{"Available to me today?"}
    n8["Many power users kept lists of carefully crafted prompts and pasted them into ChatGPT by hand; GPTs package that…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · chatgpt · gpts · customization"]
    subgraph G0["What it adds"]
        n3["a GPT combines instructions, extra knowledge and a set of skills such as searching the web, making images or…"]
        n4["built at chatgpt.com/create by starting a conversation; no coding required"]
        n5["can be made for yourself, for internal company use, or for everyone"]
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

Many power users kept lists of carefully crafted prompts and pasted them into ChatGPT by hand; GPTs package that work into something reusable and shareable. The announcement was made alongside OpenAI's DevDay releases of new models and developer products.
