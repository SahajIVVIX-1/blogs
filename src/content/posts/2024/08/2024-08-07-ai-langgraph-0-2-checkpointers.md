---
title: "LangGraph 0.2: pluggable checkpointers for durable agents"
categories: ["ai"]
tags: ["langgraph", "agents", "release"]
summary: "LangGraph v0.2 split state persistence into dedicated checkpointer libraries (in-memory, SQLite and an open-sourced Postgres version) for session memory, error recovery and human-in-the-loop."
sources: 
  - title: "LangGraph v0.2.0 release notes"
    url: "https://github.com/langchain-ai/langgraph/releases/tag/0.2.0"
    publisher: "GitHub · langchain-ai/langgraph"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["A checkpointer saves graph state after each step, which enables memory across sessions, recovery from errors and pausing for a human.", "The Postgres checkpointer used in LangGraph Cloud was open-sourced."]
draft: false
date: "2024-08-07"
---

## What happened

**LangGraph v0.2** was released, focused on **checkpointers**, the component that saves a graph's state.

## The technical details

From the release notes, there are new dedicated libraries:

- **`langgraph_checkpoint`**: the base interface (`BaseCheckpointSaver`), a serialisation protocol, and an in-memory `MemorySaver` for experiments
- **`langgraph_checkpoint_sqlite`**: SQLite-backed, for local workflows
- **`langgraph_checkpoint_postgres`**: the optimised Postgres checkpointer from LangGraph Cloud, **open-sourced**, for production

Imports stay the same (`from langgraph.checkpoint.memory import MemorySaver`, etc.), and SQLite and Postgres are separate pip installs. The release also includes breaking changes, such as renamed `thread_ts` and `parent_ts`.

## Why it matters

Persisting state after every step is what lets an agent resume after a crash, keep **session memory**, or **pause for human approval** and continue later. The graph in my LangGraph study post had no checkpointer, so its state disappears after each run. A real app with a human-in-the-loop step needs one.
