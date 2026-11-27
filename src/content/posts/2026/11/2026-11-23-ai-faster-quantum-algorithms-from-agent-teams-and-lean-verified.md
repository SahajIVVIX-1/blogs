---
title: "Faster quantum algorithms from agent teams and Lean-verified proofs"
categories: ["ai"]
tags: ["google-deepmind", "quantum-computing", "lean", "agents", "formal-verification"]
summary: "Google DeepMind uses teams of Gemini 4 agents to improve well-known quantum algorithms and proves each result in the Lean theorem prover, open-sourcing the library and verified solutions."
sources: 
  - title: "Finding faster quantum algorithms with agents and formal verification"
    url: "https://deepmind.google/blog/finding-faster-quantum-algorithms-with-agents-and-formal-verification/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:35.154Z"
highlights: ["Independent agent teams propose algorithmic improvements, which are verified in Lean before entering a shared notebook.", "The Lean library, problem specifications and verified solutions are published on GitHub."]
draft: false
date: "2026-11-23"
---

## What happened

On 23 November 2026 **Google DeepMind** (Sergey Shirobokov, Ben Jaderberg and Ryan Babbush) described a paper in which teams of **Gemini 4 agents** improved well-known quantum algorithms, producing highly efficient quantum circuits that could one day support simulations from fusion energy to drug design and enzymes.

## The technical details

From the Google DeepMind post:

- the problem: even the best quantum algorithms need more resources than early hardware can offer for some important applications
- circuits too large to test on classical computers or today's small quantum processors must be **proved to work mathematically**, so every result was proved in **Lean**, a formal theorem prover
- for each problem, **separate independent agent teams** searched for improvements; ideas were **verified in Lean** before entering a **shared notebook**
- the group is **open-sourcing its Lean library, problem specifications and verified solutions** on GitHub

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Faster quantum algorithms from agent teams and Lean-verified proofs"]):::title
    n1(["Google DeepMind: Faster quantum algorithms from agent teams and Lean-verified proofs"])
    n2["Google DeepMind uses teams of Gemini 4 agents to improve well-known quantum algorithms and proves each result…"]
    n7{"Fits production use?"}
    n8["The design pairs creative search (agents) with a checker that cannot be fooled (Lean), so improvements are…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: google-deepmind · quantum-computing · lean · agents"]
    subgraph G0["What it adds"]
        n3["the problem: even the best quantum algorithms need more resources than early hardware can offer for some…"]
        n4["circuits too large to test on classical computers or today's small quantum processors must be proved to work…"]
        n5["for each problem, separate independent agent teams searched for improvements; ideas were verified in Lean…"]
        n6["the group is open-sourcing its Lean library, problem specifications and verified solutions on GitHub"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n2 --> n5
    n5 --> n6
    n4 --> n7
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

The design pairs creative search (agents) with a checker that cannot be fooled (Lean), so improvements are trustworthy even for circuits nobody can run yet. It is the same pattern as AlphaProof Code, applied to quantum resources.
