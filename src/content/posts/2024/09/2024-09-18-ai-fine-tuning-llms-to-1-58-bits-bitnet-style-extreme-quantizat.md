---
title: "Fine-tuning LLMs to 1.58 bits: BitNet-style extreme quantization made easy"
categories: ["ai"]
tags: ["hugging-face", "bitnet", "quantization", "1-58-bit", "fine-tuning"]
summary: "Hugging Face shows how to fine-tune an existing model to BitNet's 1.58-bit format, where each weight is only -1, 0 or 1, without pre-training from scratch."
sources: 
  - title: "Fine-tuning LLMs to 1.58bit: extreme quantization made easy"
    url: "https://huggingface.co/blog/1_58_llm_extreme_quantization"
    publisher: "Hugging Face"
    fetched_at: "2026-11-27T02:58:12.280Z"
highlights: ["BitNet represents each parameter with three values, about 1.58 bits (log2 of 3).", "Matrix multiplication uses INT8 additions instead of FP16 multiply-adds, which is theoretically more energy efficient."]
draft: false
date: "2024-09-18"
---

## What happened

On 18 September 2024 **Hugging Face** published a guide to extreme quantization: fine-tuning existing models to the **1.58-bit** format introduced by Microsoft Research's **BitNet**, rather than pre-training a new model.

## The technical details

From the Hugging Face post:

- ordinary quantization reduces weights from FP16 or FP32 to 8 or 4 bits, but pushing precision too low can degrade accuracy
- **BitNet** represents each parameter with only **-1, 0 and 1**, giving **log2(3) ≈ 1.58 bits per parameter**
- it uses **INT8 addition** for matrix multiplication, in contrast to the FP16 addition and multiplication of LLaMA-style models, so theoretical energy use falls
- the catch: BitNet normally **requires training from scratch**, which few can afford; the post explores **tricks for fine-tuning an existing model** to 1.58 bits

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Fine-tuning LLMs to 1.58 bits: BitNet-style extreme quantization made easy"]):::title
    n1(["Hugging Face: Fine-tuning LLMs to 1.58 bits: BitNet-style extreme quantization…"])
    n2["Hugging Face shows how to fine-tune an existing model to BitNet's 1.58-bit format, where each weight is only…"]
    n6["the catch: BitNet normally requires training from scratch, which few can afford; the post explores…"]
    n7{"Ready beyond the demo?"}
    n8["If a model can be converted rather than retrained, extreme quantization becomes available to people without a…"]
    n9(["Track the rollout and follow-up releases"])
    n10["Topics: hugging-face · bitnet · quantization · 1-58-bit"]
    subgraph G0["What it adds"]
        n3["ordinary quantization reduces weights from FP16 or FP32 to 8 or 4 bits, but pushing precision too low can…"]
        n4["BitNet represents each parameter with only -1, 0 and 1, giving log2(3) ≈ 1.58 bits per parameter"]
        n5["it uses INT8 addition for matrix multiplication, in contrast to the FP16 addition and multiplication of…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n7 -- "no" --> n6
    n6 --> n8
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

If a model can be converted rather than retrained, extreme quantization becomes available to people without a pre-training budget. The post is candid that the format is a different computation paradigm, not just a smaller number format.
