---
title: "Llama 4 Scout and Maverick: Meta moves to mixture-of-experts"
categories: ["ai"]
tags: ["llm", "mixture-of-experts", "multimodal", "meta"]
summary: "Meta's Llama 4 introduces two natively multimodal MoE models with 17B active parameters each: Scout (~109B total, 16 experts) and Maverick (~400B total, 128 experts), trained on up to 40T tokens."
sources: 
  - title: "Welcome Llama 4 Maverick & Scout on Hugging Face"
    url: "https://huggingface.co/blog/llama4-release"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Both models activate 17B parameters per token; Scout uses 16 experts and Maverick 128.", "Early fusion makes them natively multimodal for text and images."]
draft: false
date: "2025-04-05"
---

## What happened

**Meta** released **Llama 4 Scout** and **Llama 4 Maverick**, with day-one support in Transformers and TGI.

## The technical details

From the Hugging Face post:

- a new **auto-regressive Mixture-of-Experts** architecture
- **Maverick**: 17B active out of about **400B** total, with **128 experts**
- **Scout**: 17B active out of about **109B** total, with **16 experts**
- **early fusion** for native multimodality (text and images)
- trained on up to **40 trillion tokens** across **200 languages**, with specific fine-tuning support for 12 languages including Hindi
- **Scout** fits on a **single server-grade GPU** with on-the-fly 4- or 8-bit quantisation, and **Maverick** ships in BF16 and FP8
- released under the custom **Llama 4 Community License**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Llama 4 Scout and Maverick: Meta moves to mixture-of-experts"]):::title
    n1(["Hugging Face: Llama 4 Scout and Maverick: Meta moves to mixture-of-experts"])
    n2["Meta's Llama 4 introduces two natively multimodal MoE models with 17B active parameters each: Scout (~109B…"]
    n9[/"released under the custom Llama 4 Community License"/]
    n10{"Ready beyond the demo?"}
    n11["The Llama family switched from dense models to mixture-of-experts, following the path Mixtral opened in December…"]
    n12(["Track the rollout and follow-up releases"])
    n13["Topics: llm · mixture-of-experts · multimodal · meta"]
    subgraph G0["What it adds"]
        n3["a new auto-regressive Mixture-of-Experts architecture"]
        n4["Maverick: 17B active out of about 400B total, with 128 experts"]
        n5["Scout: 17B active out of about 109B total, with 16 experts"]
        n6["early fusion for native multimodality (text and images)"]
        n7["trained on up to 40 trillion tokens across 200 languages, with specific fine-tuning support for 12 languages…"]
        n8["Scout fits on a single server-grade GPU with on-the-fly 4- or 8-bit quantisation, and Maverick ships in BF16…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n3 --> n4
    n4 --> n5
    n2 --> n6
    n6 --> n7
    n7 --> n8
    n5 --> n10
    n8 --> n10
    n10 -- "yes" --> n9
    n9 --> n11
    n11 --> n12
    n13 --> n2
    class n10 dec
    class n1,n12 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

The Llama family switched from dense models to mixture-of-experts, following the path Mixtral opened in December 2023. "Early fusion" is the same design idea as the Chameleon paper (summarised here in May 2024).
