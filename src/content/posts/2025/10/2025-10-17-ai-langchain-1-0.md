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

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["LangChain 1.0 released"]):::title
    n1(["langchain-ai/langchain: LangChain 1.0 released"])
    n2["LangChain reached 1.0. The release notes list the final changes before it: new middleware (shell, file search…"]
    n6[/"an injectable ToolRuntime, so tools can access runtime context and state"/]
    n7{"Does upgrading need changes?"}
    n8["When I studied LangChain in April–May 2026, I used version 1.4."]
    n9(["Upgrade with the checklist above"])
    n10["Topics: langchain · agents · release"]
    subgraph G0["What changed"]
        n3["middleware: ShellToolMiddleware and ClaudeBashToolMiddleware, file-search middleware, tool retry middleware…"]
        n4["state_schema support in create_agent"]
        n5["Python 3.14 support"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n7 -- "no" --> n8
    n2 --> n6
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

When I studied LangChain in April–May 2026, I used version 1.4. The 1.0 API is the base of what I learned: `create_agent` plus middleware around tool calls, with LangGraph underneath. These notes only list changes, so the design explanation is in LangChain's agent docs, linked above.
