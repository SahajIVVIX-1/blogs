---
title: "Mistral Large 4 (\"Le Chonk\"): ~1T-parameter MoE with sparse attention"
categories: ["ai"]
tags: ["llm", "multimodal", "mixture-of-experts", "open-weights"]
summary: "Mistral Large 4 is a multimodal MoE of about 1T total parameters with a 1M-token context, combining expert sparsity with sparse attention and a Pixtral vision encoder, released in FP8 and NVFP4 under an MIT-derived open-weight licence."
sources: 
  - title: "Welcome Le Chonk: Mistral Large 4 on Hugging Face"
    url: "https://huggingface.co/blog/mistral-large4"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Two kinds of sparsity: a router picks experts for each token, and an attention indexer picks which earlier positions to attend to.", "The licence is MIT-derived but restricts model-as-a-service offerings."]
draft: false
date: "2026-10-29"
---

## What happened

**Mistral** released **Mistral Large 4**, nicknamed "Le Chonk", with Hugging Face support in Transformers, vLLM and llama.cpp (GGUFs by Unsloth and the llama.cpp team), TRL fine-tuning, and Inference Endpoints. The post was published on 29 October 2026.

## The technical details

From the Hugging Face post:

- **multimodal** (text and images in, text out), **multilingual**, **Mixture-of-Experts**
- about **1T total parameters**, with about **49B active** according to the post's introduction (the checkpoint names use "A52B")
- **1M-token** context
- **two forms of sparsity**: the language model selects a small group of **experts** per token, and an **attention indexer** selects which earlier positions to attend to
- a **Pixtral** vision encoder
- official **FP8** and **NVFP4** variants
- the **Mistral Ecosystem Open-Weight License**: an MIT derivative with limitations for model-as-a-service offerings
- the post highlights strength in **cybersecurity**, **coding agents** and multimodality

## Why it matters

It's the newest post on this blog, and it pulls together trends from all of 2026: trillion-scale open MoEs, sparse attention (like DeepSeek Sparse Attention in GLM-5) and releases already in 4-bit formats. It's also a reminder that "open weights" covers very different licences, so they're worth reading.
