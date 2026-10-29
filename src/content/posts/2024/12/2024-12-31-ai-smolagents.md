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

## Why it matters

It's a clear vocabulary for the agent loop I wrote by hand in August 2026: decide, act, observe, until done. Writing actions as code, rather than as one JSON tool call at a time, lets a single step combine several tools with loops and variables.
