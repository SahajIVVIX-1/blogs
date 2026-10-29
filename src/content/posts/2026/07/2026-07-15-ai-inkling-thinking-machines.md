---
title: "Inkling: a ~1T-parameter open multimodal model with 1M context"
categories: ["ai"]
tags: ["llm", "multimodal", "open-weights", "mixture-of-experts"]
summary: "Thinking Machines released Inkling on Hugging Face, a ~1T-parameter decoder-only multimodal MoE (41B active) that takes image, text and audio, has a 1M context, and was trained on 45T tokens; a smaller Inkling-Small followed."
sources: 
  - title: "Welcome Inkling by Thinking Machines"
    url: "https://huggingface.co/blog/thinkingmachines-inkling"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["Per the Hugging Face post, it's the first large open model of about 1T parameters with a 1M context that natively accepts image, text and audio.", "It ships in BF16 and NVFP4, with speculative multi-token-prediction layers for faster inference."]
draft: false
date: "2026-07-15"
---

## What happened

**Thinking Machines Lab** released **Inkling** on Hugging Face, with day-zero support in Transformers, SGLang, vLLM and llama.cpp. A later update added **Inkling-Small**.

## The technical details

From the Hugging Face post:

- a **decoder-only multimodal Mixture-of-Experts** model with **975B total / 41B active** parameters
- natively takes **image, text and audio** inputs
- **1M-token** context
- trained on **45 trillion tokens** of text, images, audio and video
- intended for reasoning across modalities and for **domain adaptation via fine-tuning**
- released in **BF16** and a calibrated **NVFP4** variant, with **speculative MTP layers**
- **Inkling-Small**: 276B total / 12B active, same architecture, with MXFP8 and NVFP4 weights

## Why it matters

It joins the trend of trillion-parameter open-weight MoEs (Kimi K3 is summarised here in July 2026), released already quantised, because that's the only practical way most people can run them.
