---
title: "Codex: a cloud software engineering agent powered by codex-1"
categories: ["ai"]
tags: ["openai", "codex", "coding-agents", "codex-1", "swe"]
summary: "OpenAI launches a research preview of Codex, a cloud-based software engineering agent that runs many tasks in parallel, each in its own sandbox preloaded with the repository."
sources: 
  - title: "Introducing Codex"
    url: "https://openai.com/index/introducing-codex"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:50:59.649Z"
highlights: ["Powered by codex-1, a version of OpenAI o3 optimized for software engineering and trained with reinforcement learning on real coding tasks.", "Each task runs in an isolated cloud sandbox; Codex can iteratively run tests until they pass."]
draft: false
date: "2025-05-16"
---

## What happened

On 16 May 2025 **OpenAI** launched a research preview of **Codex**, available first to ChatGPT Pro, Business and Enterprise users, with Plus and Edu to follow. It can write features, answer questions about a codebase, fix bugs and propose pull requests for review.

## The technical details

From the OpenAI post:

- each task runs in its **own cloud sandbox environment**, preloaded with your repository, and many tasks can run **in parallel**
- powered by **codex-1**, a version of **OpenAI o3** optimized for software engineering, trained with **reinforcement learning on real-world coding tasks**
- aims to generate code that mirrors human style and PR preferences, follows instructions precisely and **iteratively runs tests until it gets a passing result**
- used from the ChatGPT sidebar: “Code” assigns a task, “Ask” asks a question about the codebase
- **update, 3 Jun 2025:** available to Plus users, and users can give Codex internet access during a task; the page now marks the launch post as outdated

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Codex: a cloud software engineering agent powered by codex-1"]):::title
    n1(["OpenAI: Codex: a cloud software engineering agent powered by codex-1"])
    n2["OpenAI launches a research preview of Codex, a cloud-based software engineering agent that runs many tasks in…"]
    n7[/"update, 3 Jun 2025: available to Plus users, and users can give Codex internet access during a…"/]
    n8{"Available to me today?"}
    n9["The design choice that stands out is isolation plus tests: running each task in a disposable sandbox and verifying…"]
    n10(["Track the rollout and follow-up releases"])
    n11["Topics: openai · codex · coding-agents · codex-1"]
    subgraph G0["What it adds"]
        n3["each task runs in its own cloud sandbox environment, preloaded with your repository, and many tasks can run in…"]
        n4["powered by codex-1, a version of OpenAI o3 optimized for software engineering, trained with reinforcement…"]
        n5["aims to generate code that mirrors human style and PR preferences, follows instructions precisely and…"]
        n6["used from the ChatGPT sidebar: “Code” assigns a task, “Ask” asks a question about the codebase"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n2 --> n5
    n5 --> n6
    n4 --> n8
    n6 --> n8
    n8 -- "yes" --> n7
    n7 --> n9
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

The design choice that stands out is isolation plus tests: running each task in a disposable sandbox and verifying with the repository's own tests turns code generation into something a reviewer can check. This is the origin of the Codex product that dominates the feed through 2026.
