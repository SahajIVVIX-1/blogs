---
title: "Mixtral 8x7B arrives on Hugging Face"
categories: ["ai"]
tags: ["llm", "mixture-of-experts", "open-weights"]
summary: "Mistral released Mixtral 8x7B, a sparse mixture-of-experts LLM under Apache 2.0; Hugging Face integrated it into Transformers, TGI and Inference Endpoints on launch day."
sources: 
  - title: "Welcome Mixtral - a SOTA Mixture of Experts on Hugging Face"
    url: "https://huggingface.co/blog/mixtral"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T16:07:10.323Z"
  - title: "Transformers v4.36.0 release notes"
    url: "https://github.com/huggingface/transformers/releases/tag/v4.36.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:10:22.151Z"
highlights: ["Two of eight experts process each token, so Mixtral decodes at the speed of a ~12B dense model while holding far more parameters.", "The weights are Apache 2.0, and the announcement reports it beats GPT-3.5 on many benchmarks."]
draft: false
date: "2023-12-11"
---

## What happened

**Mistral** released **Mixtral 8x7B**, and Hugging Face supported it on launch day: models on the Hub (Apache 2.0), Transformers v4.36 integration, Text Generation Inference, Inference Endpoints, and a single-GPU fine-tuning example with TRL.

## The technical details

From the Hugging Face post:

- the architecture is like **Mistral 7B**, but some feed-forward layers are replaced with a **sparse Mixture-of-Experts** layer
- a **router** sends each token to **2 of 8** experts, so the model decodes at roughly the speed of a **12B dense model** despite having about 4× the effective parameters
- the post says it sets a new state of the art for open-access models and **outperforms GPT-3.5** on many benchmarks

## Why it matters

Mixtral made mixture-of-experts mainstream in open models. The paper came out a month later (summarised here on 9 Jan 2024). The catch: **all** experts still have to fit in memory, which is why the post also covers 4-bit and GPTQ quantisation.
