---
title: "Transformers 4.51: Llama 4, Phi-4 multimodal, DeepSeek-V3 and Qwen3"
categories: ["ai"]
tags: ["hugging-face", "transformers", "llama-4", "qwen3", "deepseek-v3"]
summary: "Transformers v4.51.0 adds Llama 4 (Scout and Maverick), Phi-4 multimodal, DeepSeek-V3 and Qwen3 support."
sources: 
  - title: "v4.51.0: Llama 4, Phi4-Multimodal, DeepSeek-v3, Qwen3"
    url: "https://github.com/huggingface/transformers/releases/tag/v4.51.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-11-27T02:52:46.382Z"
highlights: ["Llama 4 Maverick has 17B active of about 400B parameters (128 experts); Scout has 17B active of about 109B (16 experts).", "Both Llama 4 models use early fusion for native multimodality and were trained on up to 40 trillion tokens covering 200 languages."]
draft: false
date: "2025-04-05"
---

## What happened

On 5 April 2025 **Hugging Face** released **Transformers v4.51.0**, led by support for Meta's **Llama 4** and also adding **Phi-4 multimodal**, **DeepSeek-V3** and **Qwen3**.

## The technical details

From the release notes:

- **Llama 4 Maverick:** 17B active parameters out of about 400B total, with 128 experts
- **Llama 4 Scout:** 17B active out of about 109B total, with 16 experts
- **early fusion** for native text and image input; trained on up to **40 trillion tokens** across **200 languages**, with fine-tuning support for 12 languages including Arabic, Spanish, German and Hindi
- **deployment:** Scout fits on a single server-grade GPU with on-the-fly 4-bit or 8-bit quantization; Maverick is available in BF16 and FP8
- released under the custom **Llama 4 Community License Agreement**

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["Transformers 4.51: Llama 4, Phi-4 multimodal, DeepSeek-V3 and Qwen3"]):::title
    n1(["huggingface/transformers: Transformers 4.51: Llama 4, Phi-4 multimodal, DeepSeek-V3 and Qwen3"])
    n2["Transformers v4.51.0 adds Llama 4 (Scout and Maverick), Phi-4 multimodal, DeepSeek-V3 and Qwen3 support."]
    n8{"Does upgrading need changes?"}
    n9["A library release is where a new architecture becomes usable by everyone: the model definitions here are what…"]
    n10(["Upgrade with the checklist above"])
    n11["Topics: hugging-face · transformers · llama-4 · qwen3"]
    subgraph G0["What changed"]
        n3["Llama 4 Maverick: 17B active parameters out of about 400B total, with 128 experts"]
        n4["Llama 4 Scout: 17B active out of about 109B total, with 16 experts"]
        n5["early fusion for native text and image input; trained on up to 40 trillion tokens across 200 languages, with…"]
    end
    subgraph G1["Upgrade notes"]
        n6[/"deployment: Scout fits on a single server-grade GPU with on-the-fly 4-bit or 8-bit quantization…"/]
        n7[/"released under the custom Llama 4 Community License Agreement"/]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n3 --> n8
    n4 --> n8
    n5 --> n8
    n8 -- "no" --> n9
    n2 --> n6
    n2 --> n7
    n6 --> n9
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

A library release is where a new architecture becomes usable by everyone: the model definitions here are what vLLM, llama.cpp and fine-tuning tools build on. This blog's separate post covers Llama 4 itself.
