---
title: "GPT-5 for developers: 74.9% on SWE-bench Verified"
categories: ["ai"]
tags: ["openai", "gpt-5", "api", "coding", "agents"]
summary: "OpenAI releases GPT-5 in the API as its best model for coding and agentic tasks, with state-of-the-art results on SWE-bench Verified, Aider polyglot and tau-squared bench."
sources: 
  - title: "Introducing GPT-5 for developers"
    url: "https://openai.com/index/introducing-gpt-5-for-developers"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:00.917Z"
highlights: ["74.9% on SWE-bench Verified and 88% on Aider polyglot.", "96.7% on tau-squared bench telecom, a tool-calling benchmark released two months earlier."]
draft: false
date: "2025-08-07"
---

## What happened

On 7 August 2025 **OpenAI** released **GPT-5** in its API platform, describing it as its best model yet for coding and agentic tasks and trained to be a true coding collaborator.

## The technical details

From the OpenAI post:

- **74.9% on SWE-bench Verified** and **88% on Aider polyglot**
- beats OpenAI o3 at **front-end web development 70% of the time** in internal testing
- handles bug fixing, code editing and questions about complex codebases; follows detailed instructions and gives **upfront explanations** before and between tool calls
- **96.7% on tau-squared bench (telecom)**; reliably chains **dozens of tool calls**, in sequence and in parallel, without losing its way
- early testers quoted in the post include Cursor, Windsurf (half the tool-calling error rate of other frontier models) and Vercel

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-5 for developers: 74.9% on SWE-bench Verified"]):::title
    n1(["OpenAI: GPT-5 for developers: 74.9% on SWE-bench Verified"])
    n2["OpenAI releases GPT-5 in the API as its best model for coding and agentic tasks, with state-of-the-art results…"]
    n8{"Fits production use?"}
    n9["The emphasis has shifted from single answers to long tool-using runs: the headline numbers are agentic benchmarks…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · gpt-5 · api · coding"]
    subgraph G0["What it adds"]
        n3["74.9% on SWE-bench Verified and 88% on Aider polyglot"]
        n4["beats OpenAI o3 at front-end web development 70% of the time in internal testing"]
        n5["handles bug fixing, code editing and questions about complex codebases; follows detailed instructions and…"]
        n6["96.7% on tau-squared bench (telecom); reliably chains dozens of tool calls, in sequence and in parallel…"]
        n7["early testers quoted in the post include Cursor, Windsurf (half the tool-calling error rate of other frontier…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n2 --> n7
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n6 --> n8
    n7 --> n8
    n8 --> n9
    n9 --> n10
    n11 --> n2
    class n8 dec
    class n1,n10 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

The emphasis has shifted from single answers to long tool-using runs: the headline numbers are agentic benchmarks and the post stresses not losing the thread over many calls, which is the failure mode that limits coding agents.
