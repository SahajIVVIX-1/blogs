---
title: "Agentic AI · Multi-agent systems"
categories: ["study"]
tags: ["agents", "multi-agent", "rag"]
summary: "Multi-agent patterns (supervisor/router, sequential crew, validator) with a small supervisor that routes questions to specialist agents, and how my Multi-Agent-RAG and AgentForge projects use them."
sources: 
  - title: "Wu et al. (2023), AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"
    url: "https://arxiv.org/abs/2308.08155"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangGraph: Multi-agent systems"
    url: "https://docs.langchain.com/oss/python/langchain/multi-agent"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "My repo: Multi-Agent-RAG"
    url: "https://github.com/SahajIVVIX-1/Multi-Agent-RAG"
    publisher: "GitHub"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "My repo: AgentForge"
    url: "https://github.com/SahajIVVIX-1/AgentForge"
    publisher: "GitHub"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A supervisor (router) sends each request to the specialist best suited for it; a validator checks the answer before it goes out.", "Splitting work across agents adds structure, but every hand-off is one more place for errors and cost."]
phase: 15
step: 6
draft: false
date: "2026-09-21"
---

**Multi-agent systems** split work across several LLM-driven roles. AutoGen (Wu et al., 2023) framed this as agents having conversations with each other. Common patterns:

| pattern | idea | my project |
|---|---|---|
| **supervisor / router** | one agent classifies the request and delegates | [Multi-Agent-RAG](/2026/04/20/built-multi-agent-rag/): supervisor → retriever / SQL / tool / chat agents |
| **validator** | a separate agent checks or re-grounds the answer | Multi-Agent-RAG's validation agent |
| **sequential crew** | fixed roles hand work down a line | [AgentForge](/2026/10/07/built-agentforge/): Researcher → Analyst → Reviewer |

Why bother? Each agent gets a narrow prompt and a small tool set, which is easier to get right and test. The cost: more LLM calls, more latency, and errors that can compound across hand-offs.

Here's the supervisor/validator skeleton in plain Python. The router is a keyword classifier, so the routing logic is visible. In my Multi-Agent-RAG project, an LLM makes that decision.

```python run
import re

def retriever_agent(q):
    kb = {"dropout": "Dropout zeroes random activations during training [notes: 2025-03-06].",
          "lora": "LoRA trains a low-rank update with frozen weights [notes: 2026-02-25]."}
    hits = [v for k, v in kb.items() if k in q.lower()]
    return hits[0] if hits else "No relevant notes found."

def sql_agent(q):
    if re.search(r"\b(drop|delete|update|insert)\b", q, re.I):
        return "Refused: read-only agent."
    return "SELECT COUNT(*) FROM posts WHERE category='papers';  -- (query only, not executed here)"

def chat_agent(q):
    return "Happy to chat! Ask me about my notes."

ROUTES = [(r"\b(how many|count|table|sql)\b", sql_agent), (r"\b(what|explain|how does)\b", retriever_agent)]
def supervisor(q):
    for pattern, agent in ROUTES:
        if re.search(pattern, q, re.I):
            return agent
    return chat_agent

def validator(q, answer, agent):
    if agent is retriever_agent and "[notes:" not in answer:
        return "I couldn't find this in my notes, so I won't guess."
    return answer

for q in ["Explain how dropout works", "How many paper posts are in the table?",
          "Please DROP the posts table", "What is quantum gravity?", "hello!"]:
    agent = supervisor(q)
    print(f"{q!r:<45} -> {agent.__name__:<15} -> {validator(q, agent(q), agent)}")
```

Output:

```text
'Explain how dropout works'                   -> retriever_agent -> Dropout zeroes random activations during training [notes: 2025-03-06].
'How many paper posts are in the table?'      -> sql_agent       -> SELECT COUNT(*) FROM posts WHERE category='papers';  -- (query only, not executed here)
'Please DROP the posts table'                 -> sql_agent       -> Refused: read-only agent.
'What is quantum gravity?'                    -> retriever_agent -> I couldn't find this in my notes, so I won't guess.
'hello!'                                      -> chat_agent      -> Happy to chat! Ask me about my notes.
```
