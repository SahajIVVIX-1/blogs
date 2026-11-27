---
title: "AlphaProof Code: AI agents formally verify the Signal protocol's code"
categories: ["ai"]
tags: ["google-deepmind", "alphaproof", "formal-verification", "cryptography", "signal"]
summary: "Google DeepMind presents AlphaProof Code, a multi-LLM agentic framework that guided AI agents to mathematically prove key security properties of the actual code underlying the Signal protocol."
sources: 
  - title: "Introducing AlphaProof Code: a breakthrough in verifying complex software at depth"
    url: "https://deepmind.google/blog/introducing-alphaproof-code/"
    publisher: "Google DeepMind"
    fetched_at: "2026-11-27T02:51:33.188Z"
highlights: ["The post calls it the first time AI has formally verified a widely deployed cryptographic protocol at this depth, and the first verification of such an implementation by any method.", "Humans decide what to prove while a group of AI agents does the proof work."]
draft: false
date: "2026-11-10"
---

## What happened

On 10 November 2026 **Google DeepMind** (Pushmeet Kohli and Swarat Chaudhuri) shared **AlphaProof Code**, a new agentic framework for formal verification. Researchers used it to prove key security properties of the real code behind the **Signal protocol**, which protects conversations in apps such as Signal and Google Messages.

## The technical details

From the Google DeepMind post:

- **formal verification** means mathematically proving that code runs correctly without flaws; it is the highest standard of security assurance but is difficult and labor-intensive
- AlphaProof Code is a **multi-LLM agentic framework** that splits the work the way a research team would: **human experts work with AI to decide what to prove**, and **a group of AI agents does the proving**
- DeepMind says this is the **first time AI has formally verified a widely deployed cryptographic protocol at this depth**, and the first time the implementation of such a protocol has been verified by any method
- the work targets the **actual code** underlying the protocol, not an abstract model of it

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["AlphaProof Code: AI agents formally verify the Signal protocol's code"]):::title
    n1(["Google DeepMind: AlphaProof Code: AI agents formally verify the Signal protocol's code"])
    n2["Google DeepMind presents AlphaProof Code, a multi-LLM agentic framework that guided AI agents to…"]
    n7{"Fits production use?"}
    n8["Proof assistants check every step, so an AI-produced proof can be trusted without trusting the AI, which is why…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: google-deepmind · alphaproof · formal-verification · cryptography"]
    subgraph G0["What it adds"]
        n3["formal verification means mathematically proving that code runs correctly without flaws; it is the highest…"]
        n4["AlphaProof Code is a multi-LLM agentic framework that splits the work the way a research team would: human…"]
        n5["DeepMind says this is the first time AI has formally verified a widely deployed cryptographic protocol at this…"]
        n6["the work targets the actual code underlying the protocol, not an abstract model of it"]
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

Proof assistants check every step, so an AI-produced proof can be trusted without trusting the AI, which is why formal verification is a natural fit for agents. The caveat the post itself makes is that humans still choose what is worth proving.
