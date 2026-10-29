---
title: "Built this: Enterprise Agentic RAG Orchestrator (Multi-Agent-RAG)"
categories: ["projects"]
tags: ["rag", "agents", "langgraph", "langchain"]
summary: "A Supervisor → Worker → Validator multi-agent RAG system with LangGraph Corrective RAG, hybrid dense + BM25 retrieval with cross-encoder reranking, a Qdrant semantic cache and a security layer."
sources: 
  - title: "SahajIVVIX-1/Multi-Agent-RAG (GitHub)"
    url: "https://github.com/SahajIVVIX-1/Multi-Agent-RAG"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit ada5924"
    url: "https://github.com/SahajIVVIX-1/Multi-Agent-RAG/commit/ada592427b"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "LangGraph documentation"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
    publisher: "LangChain"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["A supervisor LLM routes each query to a retriever, a read-only SQL agent, a human-in-the-loop email tool agent or a chat agent, and a validator re-grounds the answer.", "The README reports RAGAS scores of 0.81 faithfulness, 1.00 context precision, 0.90 context recall and 0.75 answer relevancy."]
draft: false
date: "2026-04-20"
---

On 20 April 2026, in the middle of my LangChain phase, I started **Multi-Agent-RAG**. The repo now has 46 commits, with a Python backend and a TypeScript frontend.

## Architecture

From the README:

- A **FastAPI gateway** checks an API key, applies IP-based **rate limiting** (Redis), runs a **prompt-injection guard**, and looks up a **semantic cache** (Qdrant ANN, cosine ≥ 0.96) and chat history (Redis, 1-hour TTL).
- A **Supervisor** LLM classifies each message into one of four routes:
  - **Retriever agent**: **Corrective RAG** in LangGraph. An LLM grader checks the relevance of retrieved documents, and the agent rewrites the query and retrieves again, at most two times.
  - **DB agent**: natural language to SQL, read-only, with a forbidden table.
  - **Tool agent**: email actions under a **Draft → Confirm → Execute** human-in-the-loop flow, with a domain allow-list and hourly caps.
  - **Chat agent**: plain conversation.
- Retrieval is **hybrid**: 384-dimensional dense vectors in Qdrant plus **BM25**, reranked by a **CrossEncoder** (`ms-marco-MiniLM-L-6-v2`). Small 200-token child chunks are retrieved and expanded to 800-token parent context.
- A **Validation agent** re-grounds every answer before it's returned.

## Reported quality

The README lists **RAGAS** results of **0.81 faithfulness**, **1.00 context precision**, **0.90 context recall** and **0.75 answer relevancy** on its evaluation datasets.

## Where it connects

It pulls together my [RAG](/2026/05/13/lc-08-rag/) and [LangGraph](/2026/05/19/lc-09-langgraph/) notes, and it's the multi-agent system I come back to in the [multi-agent systems](/2026/09/21/agent-06-multi-agent/) post.
