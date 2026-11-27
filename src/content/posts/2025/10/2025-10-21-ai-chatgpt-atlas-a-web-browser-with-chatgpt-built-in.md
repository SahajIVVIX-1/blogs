---
title: "ChatGPT Atlas: a web browser with ChatGPT built in"
categories: ["ai"]
tags: ["openai", "chatgpt-atlas", "browser", "agents", "memory"]
summary: "OpenAI introduces ChatGPT Atlas, a web browser with ChatGPT at its core that understands the page you are on, completes tasks for you and uses built-in memory; the page now states Atlas has been deprecated."
sources: 
  - title: "Introducing ChatGPT Atlas, the browser with ChatGPT built in"
    url: "https://openai.com/index/introducing-chatgpt-atlas"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:03.830Z"
highlights: ["ChatGPT works in the window you are in, without copying and pasting or leaving the page.", "Browser memories let ChatGPT remember context from sites you visit; the source page now notes Atlas has since been deprecated."]
draft: false
date: "2025-10-21"
---

## What happened

On 21 October 2025 **OpenAI** introduced **ChatGPT Atlas**, a new web browser built with ChatGPT at its core. The post builds on ChatGPT search, which it calls one of its most-used features, and argues the browser is where work, tools and context come together.

## The technical details

From the OpenAI post:

- ChatGPT can **come with you across the web**, understand what you are trying to do and **complete tasks for you** in the page you are on
- your **ChatGPT memory is built in**, so conversations draw on past chats
- **browser memories** let ChatGPT remember context from the sites you visit and bring it back later
- an early tester describes asking questions about lecture slides without switching windows or taking screenshots
- **update on the source page:** Atlas has since been deprecated

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["ChatGPT Atlas: a web browser with ChatGPT built in"]):::title
    n1(["OpenAI: ChatGPT Atlas: a web browser with ChatGPT built in"])
    n2["OpenAI introduces ChatGPT Atlas, a web browser with ChatGPT at its core that understands the page you are on…"]
    n7["update on the source page: Atlas has since been deprecated"]
    n8{"Ready beyond the demo?"}
    n9["The idea was to give an assistant the one thing a chat tab lacks: the context of what you are looking at."]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · chatgpt-atlas · browser · agents"]
    subgraph G0["What it adds"]
        n3["ChatGPT can come with you across the web, understand what you are trying to do and complete tasks for you in…"]
        n4["your ChatGPT memory is built in, so conversations draw on past chats"]
        n5["browser memories let ChatGPT remember context from the sites you visit and bring it back later"]
        n6["an early tester describes asking questions about lecture slides without switching windows or taking screenshots"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
    n8 -- "no" --> n7
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

The idea was to give an assistant the one thing a chat tab lacks: the context of what you are looking at. The deprecation note is a useful reminder that product pages age quickly, which is why this post records both the launch and the later status.
