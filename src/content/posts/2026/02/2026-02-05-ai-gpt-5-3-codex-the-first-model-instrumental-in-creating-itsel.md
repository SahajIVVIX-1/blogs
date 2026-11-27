---
title: "GPT-5.3-Codex: the first model instrumental in creating itself"
categories: ["ai"]
tags: ["openai", "codex", "gpt-5-3-codex", "coding-agents", "agentic"]
summary: "OpenAI introduces GPT-5.3-Codex, combining GPT-5.2-Codex's coding with GPT-5.2's reasoning in one model that is 25% faster and can be steered while it works."
sources: 
  - title: "Introducing GPT-5.3-Codex"
    url: "https://openai.com/index/introducing-gpt-5-3-codex"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:06.829Z"
highlights: ["OpenAI says early versions helped debug its own training, manage its own deployment and diagnose test results.", "It sets a new high on SWE-Bench Pro and Terminal-Bench and is positioned for work across a whole computer, not only code."]
draft: false
date: "2026-02-05"
---

## What happened

On 5 February 2026 **OpenAI** introduced **GPT-5.3-Codex**, described as its most capable agentic coding model, expanding Codex across the full spectrum of professional work on a computer.

## The technical details

From the OpenAI post:

- merges the **frontier coding** of GPT-5.2-Codex with the **reasoning and professional knowledge** of GPT-5.2 in a single model, **25% faster**
- built for **long-running tasks** involving research, tool use and complex execution, and you can **steer it while it works** without losing context
- **first model that was instrumental in creating itself:** the Codex team used early versions to debug its own training, manage its own deployment and diagnose test and evaluation results
- new highs on **SWE-Bench Pro** (four languages and more contamination-resistant than SWE-bench Verified, which tests only Python) and **Terminal-Bench**, with strong results on **OSWorld** and **GDPval**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-5.3-Codex: the first model instrumental in creating itself"]):::title
    n1(["OpenAI: GPT-5.3-Codex: the first model instrumental in creating itself"])
    n2["OpenAI introduces GPT-5.3-Codex, combining GPT-5.2-Codex's coding with GPT-5.2's reasoning in one model that…"]
    n7{"Fits production use?"}
    n8["Using a model to accelerate its own development is the claim to note, and it is stated carefully: debugging…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · codex · gpt-5-3-codex · coding-agents"]
    subgraph G0["What it adds"]
        n3["merges the frontier coding of GPT-5.2-Codex with the reasoning and professional knowledge of GPT-5.2 in a…"]
        n4["built for long-running tasks involving research, tool use and complex execution, and you can steer it while it…"]
        n5["first model that was instrumental in creating itself: the Codex team used early versions to debug its own…"]
        n6["new highs on SWE-Bench Pro (four languages and more contamination-resistant than SWE-bench Verified, which…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n6 --> n7
    n7 --> n8
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

Using a model to accelerate its own development is the claim to note, and it is stated carefully: debugging training, managing deployment and reading evals, not designing itself. The benchmark choice also matters: SWE-Bench Pro is multi-language, addressing the criticism that Verified measures only Python.
