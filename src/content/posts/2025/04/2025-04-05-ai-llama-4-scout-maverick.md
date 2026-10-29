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

## Why it matters

The Llama family switched from dense models to mixture-of-experts, following the path Mixtral opened in December 2023. "Early fusion" is the same design idea as the Chameleon paper (summarised here in May 2024).
