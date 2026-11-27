---
title: "Apps in ChatGPT and the Apps SDK, built on the Model Context Protocol"
categories: ["ai"]
tags: ["openai", "chatgpt", "apps-sdk", "mcp", "agents"]
summary: "OpenAI introduces apps you can chat with inside ChatGPT and a preview Apps SDK, released as an open standard built on the Model Context Protocol."
sources: 
  - title: "Introducing apps in ChatGPT and the new Apps SDK"
    url: "https://openai.com/index/introducing-apps-in-chatgpt"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:03.400Z"
highlights: ["Apps appear in conversation with interactive interfaces, either suggested by ChatGPT or called by name.", "The Apps SDK is built on MCP, the open protocol Anthropic released in 2024."]
draft: false
date: "2025-10-06"
---

## What happened

On 6 October 2025 **OpenAI** introduced **apps in ChatGPT**, a new generation of apps you can chat with inside ChatGPT, together with the **Apps SDK** (preview) for developers. The post says the SDK gives developers a way to reach over 800 million ChatGPT users.

## The technical details

From the OpenAI post:

- apps **respond to natural language** and include **interactive interfaces** inside the chat; ChatGPT can suggest one at the right time, or you can call it by name
- the **Apps SDK** is an **open standard built on the Model Context Protocol (MCP)**
- available at launch to logged-in users on Free, Go, Plus and Pro plans **outside the EEA, Switzerland and the UK**
- pilot partners available at launch: **Booking.com, Canva, Coursera, Figma, Expedia, Spotify and Zillow**
- **update, 13 Nov 2025:** apps in preview for ChatGPT Business, Enterprise and Edu customers

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Apps in ChatGPT and the Apps SDK, built on the Model Context Protocol"]):::title
    n1(["OpenAI: Apps in ChatGPT and the Apps SDK, built on the Model Context Protocol"])
    n2["OpenAI introduces apps you can chat with inside ChatGPT and a preview Apps SDK, released as an open standard…"]
    n8{"Fits production use?"}
    n9["Building on MCP rather than a proprietary format means an app's tools can be described once and used across…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · chatgpt · apps-sdk · mcp"]
    subgraph G0["What it adds"]
        n3["apps respond to natural language and include interactive interfaces inside the chat; ChatGPT can suggest one…"]
        n4["the Apps SDK is an open standard built on the Model Context Protocol (MCP)"]
    end
    subgraph G1["Access and limits"]
        n5[/"available at launch to logged-in users on Free, Go, Plus and Pro plans outside the EEA…"/]
        n6[/"pilot partners available at launch: Booking.com, Canva, Coursera, Figma, Expedia, Spotify and Zillow"/]
        n7[/"update, 13 Nov 2025: apps in preview for ChatGPT Business, Enterprise and Edu customers"/]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n3 --> n8
    n4 --> n8
    n8 -- "yes" --> n5
    n8 -- "yes" --> n6
    n8 -- "yes" --> n7
    n5 --> n9
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

Building on MCP rather than a proprietary format means an app's tools can be described once and used across clients, which is the point of the protocol covered in this blog's November 2024 post. For OpenAI it positions ChatGPT as a surface that other services plug into rather than only a chat window.
