---
title: "Open-R1: Hugging Face sets out to reproduce DeepSeek-R1 openly"
categories: ["ai"]
tags: ["llm", "reasoning", "open-source"]
summary: "A week after DeepSeek-R1, Hugging Face launched Open-R1 to reconstruct its data and training pipeline in the open, since DeepSeek released weights and a report but no training code or datasets."
sources: 
  - title: "Open-R1: a fully open reproduction of DeepSeek-R1"
    url: "https://huggingface.co/blog/open-r1"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
  - title: "DeepSeek-AI (2025), DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    url: "https://arxiv.org/abs/2501.12948"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["DeepSeek-R1 showed pure RL could teach reasoning, but left open how the data was curated and which hyperparameters worked.", "Open-R1's goal is to rebuild the missing pieces (data, training code, scaling trade-offs) in the open."]
draft: false
date: "2025-01-28"
---

## What happened

Hugging Face launched **Open-R1**, a project to systematically **reconstruct DeepSeek-R1's data and training pipeline**, validate its claims, and push open reasoning models further.

## The technical details

The post explains why it was needed. DeepSeek-R1 (summarised here on 23 Jan 2025) came with weights and a detailed technical report whose most notable step was **pure reinforcement learning** to teach a base model to reason, but it left open:

- **data collection**: how the reasoning datasets were curated
- **model training**: no training code was released, so the best hyperparameters across model families and scales were unknown
- **scaling laws**: the compute and data trade-offs of training reasoning models

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Open-R1: Hugging Face sets out to reproduce DeepSeek-R1 openly"]):::title
    n1(["Hugging Face: Open-R1: Hugging Face sets out to reproduce DeepSeek-R1 openly"])
    n2["A week after DeepSeek-R1, Hugging Face launched Open-R1 to reconstruct its data and training pipeline in the…"]
    n6{"Ready beyond the demo?"}
    n7["#quot;Open weights#quot; isn't the same as #quot;reproducible#quot;."]
    n8(["Track the rollout and follow-up releases"])
    n9["Topics: llm · reasoning · open-source"]
    subgraph G0["What it adds"]
        n3["data collection: how the reasoning datasets were curated"]
        n4["model training: no training code was released, so the best hyperparameters across model families and scales…"]
        n5["scaling laws: the compute and data trade-offs of training reasoning models"]
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

"Open weights" isn't the same as "reproducible". Open-R1 follows the same logic as LLM360 and OLMo (summarised Dec 2023 and Feb 2024): publish the recipe, not just the result.
