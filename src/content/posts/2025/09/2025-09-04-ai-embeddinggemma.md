---
title: "EmbeddingGemma: a 308M multilingual embedding model for devices"
categories: ["ai"]
tags: ["embeddings", "retrieval", "on-device", "google"]
summary: "Google released EmbeddingGemma, a 308M-parameter embedding model with a 2K context supporting 100+ languages; at release it was the top text-only multilingual model under 500M on MTEB."
sources: 
  - title: "Welcome EmbeddingGemma, Google's new efficient embedding model"
    url: "https://huggingface.co/blog/embeddinggemma"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Small enough for phones, so retrieval for RAG can happen on-device.", "At release it ranked highest among text-only multilingual embedding models under 500M parameters on MTEB."]
draft: false
date: "2025-09-04"
---

## What happened

**Google** released **EmbeddingGemma**, with integrations including Sentence Transformers, LangChain, LlamaIndex, Haystack, txtai, transformers.js, Text Embeddings Inference and ONNX Runtime, plus a fine-tuning example.

## The technical details

From the post:

- **308M** parameters and a **2K-token** context
- trained for **100+ languages**
- at the time of writing, the highest-ranking **text-only multilingual embedding model under 500M** on the **Massive Text Embedding Benchmark (MTEB)**
- aimed at **on-device** use: mobile RAG pipelines and agents

## Why it matters

Embeddings are the retrieval half of RAG (my March and May 2026 study posts used the 22M all-MiniLM-L6-v2). A stronger multilingual embedder that still runs on a phone makes private, on-device search more practical.
