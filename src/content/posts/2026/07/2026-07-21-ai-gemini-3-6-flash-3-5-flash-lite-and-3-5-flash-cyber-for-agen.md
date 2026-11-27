---
title: "Gemini 3.6 Flash, 3.5 Flash-Lite and 3.5 Flash Cyber for agents at scale"
categories: ["ai"]
tags: ["google-deepmind", "gemini", "flash", "agents", "cybersecurity"]
summary: "Google DeepMind introduces Gemini 3.6 Flash, 3.5 Flash-Lite and 3.5 Flash Cyber, aimed at the token efficiency, latency and reliability needed to run production AI agents."
sources: 
  - title: "Introducing Gemini 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber"
    url: "https://deepmind.google/blog/introducing-gemini-3-6-flash-3-5-flash-lite-and-3-5-flash-cyber/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:23.495Z"
highlights: ["3.6 Flash cuts output token usage by 17% versus 3.5 Flash on the Artificial Analysis Index, and by up to 65% on DeepSWE.", "3.5 Flash-Lite reaches 350 output tokens per second on the Artificial Analysis Index."]
draft: false
date: "2026-07-21"
---

## What happened

On 21 July 2026 **Google DeepMind** introduced three Gemini models built on Gemini 3.5 Flash, for developers and customers building production agents that need higher token efficiency, lower latency and more reliable performance.

## The technical details

From the Google DeepMind post:

- **3.6 Flash:** the workhorse, with better coding, knowledge work and multimodal performance; **17% fewer output tokens** than 3.5 Flash (Artificial Analysis Index) and up to **65%** on **DeepSWE by Datacurve**, at a lower cost per output token
- **3.5 Flash-Lite:** the fastest, most cost-effective 3.5-class model, **350 output tokens per second**, with large gains over earlier Flash-Lite generations in agentic workflows
- **3.5 Flash Cyber in CodeMender:** a specialized, efficient cyber-focused model paired with the **CodeMender** code security agent, positioned as competitive at the frontier

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Gemini 3.6 Flash, 3.5 Flash-Lite and 3.5 Flash Cyber for agents at scale"]):::title
    n1(["Google DeepMind: Gemini 3.6 Flash, 3.5 Flash-Lite and 3.5 Flash Cyber for agents at…"])
    n2["Google DeepMind introduces Gemini 3.6 Flash, 3.5 Flash-Lite and 3.5 Flash Cyber, aimed at the token…"]
    n6{"Available to me today?"}
    n7["For agents, output tokens are the bill and the delay, so a model that finishes the same job in fewer tokens is…"]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: google-deepmind · gemini · flash · agents"]
    subgraph G0["What it adds"]
        n3["3.6 Flash: the workhorse, with better coding, knowledge work and multimodal performance; 17% fewer output…"]
        n4["3.5 Flash-Lite: the fastest, most cost-effective 3.5-class model, 350 output tokens per second, with large…"]
        n5["3.5 Flash Cyber in CodeMender: a specialized, efficient cyber-focused model paired with the CodeMender code…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n6
    n4 --> n6
    n5 --> n6
    n6 --> n7
    n7 --> n8
    n9 --> n2
    class n6 dec
    class n1,n8 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

For agents, output tokens are the bill and the delay, so a model that finishes the same job in fewer tokens is cheaper and faster at once. The pairing of a cyber model with an agent, rather than a model alone, reflects that security work depends on the orchestration around the model.
