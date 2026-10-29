---
title: "Agentic AI · Agent evaluation"
categories: ["study"]
tags: ["agents", "evaluation"]
summary: "Evaluating agents means checking the final answer and the trajectory: task success, tool-call correctness, wasted steps and cost, scored here over a few recorded agent runs."
sources: 
  - title: "Mialon et al. (2023), GAIA: a benchmark for General AI Assistants"
    url: "https://arxiv.org/abs/2311.12983"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Jimenez et al. (2023), SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
    url: "https://arxiv.org/abs/2310.06770"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Liu et al. (2023), AgentBench: Evaluating LLMs as Agents"
    url: "https://arxiv.org/abs/2308.03688"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Agents can reach a right answer by a wrong route, or a wrong answer by a sensible one, so both the outcome and the trajectory need checking.", "Benchmarks like GAIA and SWE-bench score task success; production evals also track steps, cost and failures."]
phase: 15
step: 8
draft: false
date: "2026-10-09"
---

Evaluating a chatbot means grading one answer. An agent has a whole **trajectory**: the tool calls, their arguments, retries and the final result. What I'd measure:

| metric | question |
|---|---|
| task success | is the final answer or end state correct? |
| tool-call accuracy | right tool, valid arguments? |
| efficiency | steps, tokens or cost, time |
| safety | did it attempt anything outside policy? |
| failure honesty | when it fails, does it say so? |

Public benchmarks focus on **task success** in realistic settings: **GAIA** (Mialon et al., 2023, summarised on this blog in Nov 2023) with questions needing browsing and tools, **SWE-bench** (Jimenez et al., 2023) with real GitHub issues, and **AgentBench** (Liu et al., 2023) across several environments.

I scored four recorded runs of the same task against a reference trajectory. The runs are hand-written examples, not real model logs.

```python run
REFERENCE_TOOLS = ["search_notes", "subtract"]
EXPECTED = "1"
runs = {
    "clean":       {"calls": [("search_notes", {"q": "BERT"}), ("subtract", {"expr": "2019-2018"})], "answer": "1"},
    "wasteful":    {"calls": [("search_notes", {"q": "BERT"}), ("search_notes", {"q": "BERT"}),
                              ("search_notes", {"q": "GPT-2"}), ("subtract", {"expr": "2019-2018"})], "answer": "1"},
    "lucky_guess": {"calls": [], "answer": "1"},
    "bad_args":    {"calls": [("search_notes", {"q": "BERT"}), ("subtract", {"expr": "2019 minus 2018"})], "answer": "error"},
}
ALLOWED = {"search_notes", "subtract"}

def valid_args(tool, args):
    return tool != "subtract" or all(c in "0123456789- " for c in args.get("expr", ""))

print(f"{'run':<12} {'success':>7} {'tools ok':>8} {'args ok':>7} {'steps':>5} {'extra':>5} {'policy':>6}")
for name, r in runs.items():
    tools = [t for t, _ in r["calls"]]
    success = r["answer"] == EXPECTED
    tools_ok = all(t in tools for t in REFERENCE_TOOLS)
    args_ok = all(valid_args(t, a) for t, a in r["calls"])
    extra = max(0, len(tools) - len(REFERENCE_TOOLS))
    policy = all(t in ALLOWED for t in tools)
    print(f"{name:<12} {str(success):>7} {str(tools_ok):>8} {str(args_ok):>7} {len(tools):>5} {extra:>5} {str(policy):>6}")
```

Output:

```text
run          success tools ok args ok steps extra policy
clean           True     True    True     2     0   True
wasteful        True     True    True     4     2   True
lucky_guess     True    False    True     0     0   True
bad_args       False     True   False     2     0   True
```

"lucky_guess" passes on final-answer accuracy alone, but it never used a tool, so nothing grounds the answer. That's the case for trajectory-level checks.
