---
title: "Agentic AI · What is an agent"
categories: ["study"]
tags: ["agents", "llm"]
summary: "An LLM agent is a loop: the model decides an action, a tool runs it, the result goes back to the model, until it decides it's done; the loop written in plain Python with a scripted policy."
sources: 
  - title: "Anthropic: Building effective agents"
    url: "https://www.anthropic.com/research/building-effective-agents"
    publisher: "Anthropic"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Lilian Weng (2023), LLM Powered Autonomous Agents"
    url: "https://lilianweng.github.io/posts/2023-06-23-agent/"
    publisher: "Lil'Log"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain docs: Agents"
    url: "https://docs.langchain.com/oss/python/langchain/agents"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A chatbot answers once; an agent loops: decide, act, observe, repeat, until a stop condition.", "The loop needs a step limit, because a model that never says \"done\" would otherwise run forever."]
phase: 15
step: 1
draft: false
date: "2026-08-03"
---

The last phase is agentic AI. The definitions vary, but the common core is a **loop**:

1. the model looks at the goal and everything so far
2. it chooses an **action**: call a tool, or give the final answer
3. the tool runs and its **observation** is added to the context
4. repeat until the model answers, or a **step limit** is hit

Anthropic's "Building effective agents" post separates **workflows** (LLM calls along fixed, predefined code paths) from **agents** (the model directs its own process and tool use). It recommends starting with the simplest option that works. Lilian Weng's overview breaks an agent into planning, memory and tool use, which are the next posts.

Before any real model, I wrote the loop itself in plain Python with a **scripted policy** standing in for the LLM. That keeps the control flow, the stop condition and the step limit visible.

```python run
import json

TOOLS = {
    "search_notes": lambda q: {"python": "Phase 1, Aug-Oct 2023", "c++": "Phase 2, Nov 2023-Jan 2024"}.get(q.lower(), "no result"),
    "add_days": lambda d: f"{int(d) + 5} days",
}

def scripted_policy(goal, history):
    """Stands in for an LLM: returns either a tool call or a final answer."""
    if not history:
        return {"tool": "search_notes", "input": "C++"}
    if len(history) == 1:
        return {"final": f"C++ was {history[-1]['observation']}."}

def run_agent(goal, policy, max_steps=5):
    history = []
    for step in range(1, max_steps + 1):
        decision = policy(goal, history)
        if decision is None:
            return "stopped: policy returned nothing", history
        if "final" in decision:
            print(f"step {step}: FINAL -> {decision['final']}")
            return decision["final"], history
        obs = TOOLS[decision["tool"]](decision["input"])
        print(f"step {step}: {decision['tool']}({decision['input']!r}) -> {obs!r}")
        history.append({**decision, "observation": obs})
    return "stopped: step limit reached", history

answer, trace = run_agent("When did I study C++?", scripted_policy)
print("trace:", json.dumps(trace))

looping = lambda goal, history: {"tool": "add_days", "input": "1"}      # never finishes
print(run_agent("loop forever", looping, max_steps=3)[0])
```

Output:

```text
step 1: search_notes('C++') -> 'Phase 2, Nov 2023-Jan 2024'
step 2: FINAL -> C++ was Phase 2, Nov 2023-Jan 2024.
trace: [{"tool": "search_notes", "input": "C++", "observation": "Phase 2, Nov 2023-Jan 2024"}]
step 1: add_days('1') -> '6 days'
step 2: add_days('1') -> '6 days'
step 3: add_days('1') -> '6 days'
stopped: step limit reached
```
