---
title: "Llama 3.2: vision models and small on-device models"
categories: ["ai"]
tags: ["llm", "multimodal", "on-device"]
summary: "Meta's Llama 3.2 added vision models (11B and 90B) and small text-only models (1B and 3B) for on-device use, plus a vision-capable Llama Guard; ten open-weight models in total."
sources: 
  - title: "Llama can now see and run on your device - welcome Llama 3.2"
    url: "https://huggingface.co/blog/llama32"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Llama 3.2 Vision (11B and 90B) adds image understanding; the 1B and 3B text models target phones and edge devices.", "Llama Guard 3 gained vision support for checking multimodal prompts and responses."]
draft: false
date: "2024-09-25"
---

## What happened

**Meta** released **Llama 3.2**: ten open-weight models (5 multimodal and 5 text-only), integrated by Hugging Face in Transformers and TGI with deployment options.

## The technical details

From the Hugging Face post:

- **Llama 3.2 Vision**: **11B** (consumer GPU) and **90B** (large-scale), base and instruction-tuned
- **small text models**: **1B** and **3B**, base and instruct, designed to run **on-device**
- **Llama Guard 3** with **vision** support, plus a small **1B** Llama Guard
- the post also has a section on licence changes for the vision models that affect users in the EU

## Why it matters

Two directions in one release: multimodality for the Llama family, and genuinely small models for phones and laptops. Both trends show up in my paper summaries (SmolVLM in April 2025, Phi-3 in April 2024).
