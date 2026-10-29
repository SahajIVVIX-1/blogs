---
title: "Agentic AI · Planning"
categories: ["study"]
tags: ["agents", "planning"]
summary: "Plan-and-execute: write a plan of steps with dependencies first, then run them in order, re-planning when a step fails, implemented as a small task graph executor."
sources: 
  - title: "Wang et al. (2023), Plan-and-Solve Prompting"
    url: "https://arxiv.org/abs/2305.04091"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Yao et al. (2023), Tree of Thoughts: Deliberate Problem Solving with Large Language Models"
    url: "https://arxiv.org/abs/2305.10601"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangGraph documentation"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Planning separates \"what needs to happen, in what order\" from \"doing each step\", which makes long tasks easier to follow and debug.", "When a step fails, the agent re-plans from the current state instead of blindly continuing."]
phase: 15
step: 4
draft: false
date: "2026-09-01"
---

A plain ReAct loop decides one step at a time. For longer tasks, it helps to **plan first**:

- **Plan-and-Solve prompting** (Wang et al., 2023): ask the model to devise a plan, then carry it out step by step.
- **Plan-and-execute agents**: a planner writes steps with **dependencies**, an executor runs them, and a **re-planner** fixes the plan when something fails.
- **Tree of Thoughts** (Yao et al., 2023) explores several reasoning branches and evaluates them, instead of committing to the first one.

In my own projects, the build-a-blog task you're reading right now is a planning problem: fetch sources → write posts → run code → check links → build → deploy, with dependencies. Here's a small executor: a topological order over the plan, plus one re-plan when a step fails.

```python run
from graphlib import TopologicalSorter

plan = {
    "fetch_sources": [],
    "write_posts": ["fetch_sources"],
    "run_snippets": ["write_posts"],
    "check_links": ["write_posts"],
    "build_site": ["run_snippets", "check_links"],
    "deploy": ["build_site"],
}
attempts = {}
def execute(step):
    attempts[step] = attempts.get(step, 0) + 1
    if step == "check_links" and attempts[step] == 1:
        raise RuntimeError("3 links returned 403")
    return "ok"

def replan(plan, failed, error):
    print(f"   re-plan: '{failed}' failed ({error}) -> insert 'swap_blocked_links' before retrying")
    new = dict(plan)
    new["swap_blocked_links"] = list(plan[failed])
    new[failed] = ["swap_blocked_links"]
    return new

done, retries = set(), 0
while True:
    order = [s for s in TopologicalSorter(plan).static_order() if s not in done]
    if not order: break
    try:
        for step in order:
            execute(step); done.add(step)
            print(f"done: {step}")
    except RuntimeError as e:
        retries += 1
        if retries > 2: print("giving up"); break
        plan = replan(plan, step, e)
print("final order:", list(TopologicalSorter(plan).static_order()))
```

Output:

```text
done: fetch_sources
done: write_posts
done: run_snippets
   re-plan: 'check_links' failed (3 links returned 403) -> insert 'swap_blocked_links' before retrying
done: swap_blocked_links
done: check_links
done: build_site
done: deploy
final order: ['fetch_sources', 'write_posts', 'run_snippets', 'swap_blocked_links', 'check_links', 'build_site', 'deploy']
```
