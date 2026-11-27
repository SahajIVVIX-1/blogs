---
title: "GPT-5.1: warmer Instant, more persistent Thinking, and tone controls"
categories: ["ai"]
tags: ["openai", "gpt-5-1", "chatgpt", "reasoning", "personalization"]
summary: "OpenAI upgrades the GPT-5 series with GPT-5.1 Instant and GPT-5.1 Thinking and adds more intuitive controls for shaping ChatGPT's tone."
sources: 
  - title: "GPT-5.1: A smarter, more conversational ChatGPT"
    url: "https://openai.com/index/gpt-5-1"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:04.475Z"
highlights: ["GPT-5.1 Instant, ChatGPT's most used model, becomes warmer, more intelligent and better at following instructions.", "GPT-5.1 Thinking is easier to understand, faster on simple tasks and more persistent on complex ones."]
draft: false
date: "2025-11-12"
---

## What happened

On 12 November 2025 **OpenAI** released **GPT-5.1** in ChatGPT, rolling out to everyone beginning with paid users. The post says users wanted AI that is not only smart but enjoyable to talk to, and that 5.1 improves on both intelligence and communication style.

## The technical details

From the OpenAI post:

- **GPT-5.1 Instant:** the most-used model, now warmer by default and more conversational, often playful while staying clear
- **GPT-5.1 Thinking:** the advanced reasoning model, easier to understand, faster on simple tasks and more persistent on complex ones
- new **tone controls**, because preferences on chat style vary between people and even between conversations

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-5.1: warmer Instant, more persistent Thinking, and tone controls"]):::title
    n1(["OpenAI: GPT-5.1: warmer Instant, more persistent Thinking, and tone controls"])
    n2["OpenAI upgrades the GPT-5 series with GPT-5.1 Instant and GPT-5.1 Thinking and adds more intuitive controls…"]
    n6{"Fits production use?"}
    n7["This release is about the feel of the product as much as raw capability: instruction following and tone are what…"]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: openai · gpt-5-1 · chatgpt · reasoning"]
    subgraph G0["What it adds"]
        n3["GPT-5.1 Instant: the most-used model, now warmer by default and more conversational, often playful while…"]
        n4["GPT-5.1 Thinking: the advanced reasoning model, easier to understand, faster on simple tasks and more…"]
        n5["new tone controls, because preferences on chat style vary between people and even between conversations"]
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

This release is about the feel of the product as much as raw capability: instruction following and tone are what users notice day to day. A separate developer release for GPT-5.1 followed the next day, as the feed shows.
