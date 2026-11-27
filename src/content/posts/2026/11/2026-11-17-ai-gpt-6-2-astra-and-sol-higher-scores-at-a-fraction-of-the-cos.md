---
title: "GPT-6.2 Astra and Sol: higher scores at a fraction of the cost"
categories: ["ai"]
tags: ["openai", "gpt-6-2", "astra", "sol", "cost-efficiency"]
summary: "OpenAI introduces GPT-6.2 Astra for the hardest projects and GPT-6.2 Sol for everyday work, reporting better results on demanding tasks with fewer output tokens."
sources: 
  - title: "Introducing GPT-6.2 Astra and Sol"
    url: "https://openai.com/index/introducing-gpt-6-2-astra-sol"
    publisher: "OpenAI"
    fetched_at: "2026-11-27T02:51:11.079Z"
highlights: ["On Agents' Last Exam, Astra scores 5.2 points above GPT-6 Astra at less than a third of the cost.", "OpenAI also reports +9 points over GPT-6 Astra on Terminal-Bench-Science 0.1 at under a third of the cost."]
draft: false
date: "2026-11-17"
---

## What happened

On 17 November 2026 **OpenAI** introduced **GPT-6.2 Astra**, its frontier model for the hardest projects, and **GPT-6.2 Sol**, an efficient, versatile model for everyday work. Both are pitched as delivering better results on demanding tasks with fewer output tokens.

## The technical details

From the OpenAI post:

- **Agents' Last Exam** (long-horizon professional workflows): Astra is **5.2 points above GPT-6 Astra at less than one third of the cost**, and, per OpenAI, 5.5 points ahead of Claude Fable 5.2 at 5% of the cost; OpenAI notes Fable 5.2's leaderboard result excludes nine tasks that used a fallback model
- **Terminal-Bench-Science 0.1:** 9 points above GPT-6 Astra at under one third of the cost; also a new high on the Vals Science Index
- slides, spreadsheets and documents that follow provided templates and field conventions more closely; cleaner code and better-looking frontends, especially for websites, games and 3D design
- OpenAI calls GPT-6.2 Astra the best model in the world for scientists (an OpenAI claim)

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["GPT-6.2 Astra and Sol: higher scores at a fraction of the cost"]):::title
    n1(["OpenAI: GPT-6.2 Astra and Sol: higher scores at a fraction of the cost"])
    n2["OpenAI introduces GPT-6.2 Astra for the hardest projects and GPT-6.2 Sol for everyday work, reporting better…"]
    n7{"Available to me today?"}
    n8["The consistent theme from GPT-5.5 to GPT-6.2 is cost per unit of work: each release reports better scores with…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: openai · gpt-6-2 · astra · sol"]
    subgraph G0["What it adds"]
        n3["Agents' Last Exam (long-horizon professional workflows): Astra is 5.2 points above GPT-6 Astra at less than…"]
        n4["Terminal-Bench-Science 0.1: 9 points above GPT-6 Astra at under one third of the cost; also a new high on the…"]
        n5["slides, spreadsheets and documents that follow provided templates and field conventions more closely; cleaner…"]
        n6["OpenAI calls GPT-6.2 Astra the best model in the world for scientists (an OpenAI claim)"]
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

The consistent theme from GPT-5.5 to GPT-6.2 is cost per unit of work: each release reports better scores with fewer tokens. Competitor comparisons here are OpenAI's own, and the footnote about excluded tasks is a good example of why leaderboard methodology should be read.
