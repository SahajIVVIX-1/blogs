---
title: "Tiny Agents: an MCP-powered agent in 50 lines of code"
categories: ["ai"]
tags: ["hugging-face", "mcp", "agents", "tiny-agents", "javascript"]
summary: "Hugging Face shows that once an inference client can act as an MCP client, an agent is just a while loop on top of it, building a working agent in about 50 lines of TypeScript."
sources: 
  - title: "Tiny Agents: an MCP-powered agent in 50 lines of code"
    url: "https://huggingface.co/blog/tiny-agents"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:51:39.151Z"
highlights: ["MCP is described as a standard API for exposing sets of tools that can be hooked into LLMs.", "A Python companion post, Tiny Agents in Python, followed on 23 May 2025."]
draft: false
date: "2025-04-25"
---

## What happened

On 25 April 2025 a **Hugging Face** engineer published **Tiny Agents**, a walkthrough of building an agent powered by the **Model Context Protocol (MCP)** in about 50 lines of TypeScript.

## The technical details

From the Hugging Face post:

- MCP is a **standard API to expose sets of tools** that can be connected to LLMs
- Hugging Face's two official client SDKs (`@huggingface/inference` for JS and `huggingface_hub` for Python) can be extended to act as **MCP clients** and feed MCP server tools into LLM inference
- **an agent is literally just a while loop** on top of an MCP-enabled client
- try it with `npx @huggingface/mcp-client`: the demo agent connects to two local MCP servers, loads their tools and prompts you for a conversation

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Tiny Agents: an MCP-powered agent in 50 lines of code"]):::title
    n1(["Hugging Face: Tiny Agents: an MCP-powered agent in 50 lines of code"])
    n2["Hugging Face shows that once an inference client can act as an MCP client, an agent is just a while loop on…"]
    n7{"Available to me today?"}
    n8["The point is how little code an agent needs once tool access is standardized, which makes MCP's value concrete."]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: hugging-face · mcp · agents · tiny-agents"]
    subgraph G0["What it adds"]
        n3["MCP is a standard API to expose sets of tools that can be connected to LLMs"]
        n4["Hugging Face's two official client SDKs (@huggingface/inference for JS and huggingface_hub for Python) can be…"]
        n5["an agent is literally just a while loop on top of an MCP-enabled client"]
        n6["try it with npx @huggingface/mcp-client: the demo agent connects to two local MCP servers, loads their tools…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n2 --> n5
    n5 --> n6
    n4 --> n7
    n6 --> n7
    n7 --> n8
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

The point is how little code an agent needs once tool access is standardized, which makes MCP's value concrete. It is a good companion to this blog's post on Anthropic open-sourcing the protocol.
