---
title: "vLLM 0.4: automatic prefix caching"
categories: ["ai"]
tags: ["inference", "serving", "vllm"]
summary: "vLLM 0.4.0 added automatic prefix caching (reusing the KV cache for shared prompt prefixes such as long system prompts), JSON mode in its OpenAI-compatible server, and new models including DBRX and Command R+."
sources: 
  - title: "vLLM v0.4.0 release notes"
    url: "https://github.com/vllm-project/vllm/releases/tag/v0.4.0"
    publisher: "GitHub · vllm-project/vllm"
    fetched_at: "2026-10-29T22:14:13.441Z"
  - title: "Kwon et al. (2023), Efficient Memory Management for Large Language Model Serving with PagedAttention"
    url: "https://arxiv.org/abs/2309.06180"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:14:14.428Z"
highlights: ["Automatic prefix caching reuses the computed KV cache when many requests start with the same text, like a long system prompt.", "The release also moved forward on chunked prefill and speculative decoding."]
draft: false
date: "2024-03-30"
---

## What happened

**vLLM v0.4.0**, an open-source LLM serving engine, was released.

## The technical details

From the release notes:

- **Automatic prefix caching**: long shared prefixes, such as a system prompt, are cached across requests. Enable it with `--enable-prefix-caching`.
- OpenAI-compatible server: `json_object` output, a `--use-delay` flag to improve time-to-first-token under load, and `min_tokens`.
- progress on a **chunked prefill** scheduler and **speculative decoding**
- new models: Command R+, Qwen2 MoE, DBRX, XVerse, Jais, and the vision-language model **LLaVA**
- better AWS Inferentia (Neuron) support and a CMake-based build

## Why it matters

Most chat and RAG apps send the same long instructions with every request. Without caching, the model recomputes attention keys and values for that text every time. Prefix caching skips that repeated work, which directly cuts latency and cost.
