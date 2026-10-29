---
title: "Google releases Gemma, open models based on Gemini"
categories: ["ai"]
tags: ["llm", "open-weights", "google"]
summary: "Google released Gemma, open LLMs in 2B and 7B sizes (base and instruction-tuned) with an 8K context, built from Gemini research, with day-one Hugging Face support."
sources: 
  - title: "Welcome Gemma - Google's new open LLM"
    url: "https://huggingface.co/blog/gemma"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:11:47.073Z"
  - title: "Transformers v4.38.0 release notes"
    url: "https://github.com/huggingface/transformers/releases/tag/v4.38.0"
    publisher: "GitHub · huggingface/transformers"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Two sizes: 7B for consumer GPUs and TPUs, and 2B for CPU and on-device use.", "All four variants run on consumer hardware without quantisation, per the announcement."]
draft: false
date: "2024-02-21"
---

## What happened

**Google** released **Gemma**, a family of open LLMs. Hugging Face announced the integration: models on the Hub, Transformers v4.38, Google Cloud and Inference Endpoints, and a single-GPU fine-tuning example with TRL.

## The technical details

From the Hugging Face post:

- **two sizes**: **7B** (efficient on consumer GPUs and TPUs) and **2B** (CPU and on-device)
- each with **base** and **instruction-tuned** versions: four models in total
- **8K-token** context
- based on technology from **Gemini**
- all variants can run on consumer hardware **without quantisation**

## Why it matters

A major lab releasing open weights in small sizes was a big deal for local and on-device use. Gemma later grew into several generations (Gemma 2, 3, 3n and 4 appear in later posts here).
