---
title: "LangChain 1.0 released"
categories: ["ai"]
tags: ["langchain", "agents", "release"]
summary: "LangChain reached 1.0. The release notes list the final changes before it: new middleware (shell, file search, tool retry), an injectable ToolRuntime, state-schema options for create_agent, and Python 3.14 support."
sources: 
  - title: "langchain==1.0.0 release notes"
    url: "https://github.com/langchain-ai/langchain/releases/tag/langchain%3D%3D1.0.0"
    publisher: "GitHub · langchain-ai/langchain"
    fetched_at: "2026-10-29T22:07:29.937Z"
  - title: "LangChain docs: Agents"
    url: "https://docs.langchain.com/oss/python/langchain/agents"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["The 1.0 release notes centre on the agent API (create_agent) and middleware around tool calls.", "Tool retry, shell and file-search middleware arrived in the run-up to 1.0."]
draft: false
date: "2025-10-17"
---

## What happened

**`langchain==1.0.0`** was released on GitHub, the same day as LangGraph 1.0.

## The technical details

The release notes are a list of changes since 0.3.27. The notable ones:

- **middleware**: `ShellToolMiddleware` and `ClaudeBashToolMiddleware`, **file-search** middleware, **tool retry** middleware, and model/tool call limits
- an injectable **`ToolRuntime`**, so tools can access runtime context and state
- `state_schema` support in **`create_agent`**
- **Python 3.14** support

## Why it matters

When I studied LangChain in April–May 2026, I used version 1.4. The 1.0 API is the base of what I learned: `create_agent` plus middleware around tool calls, with LangGraph underneath. These notes only list changes, so the design explanation is in LangChain's agent docs, linked above.
