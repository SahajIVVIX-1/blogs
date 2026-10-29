---
title: "Open-R1: Hugging Face sets out to reproduce DeepSeek-R1 openly"
categories: ["ai"]
tags: ["llm", "reasoning", "open-source"]
summary: "A week after DeepSeek-R1, Hugging Face launched Open-R1 to reconstruct its data and training pipeline in the open, since DeepSeek released weights and a report but no training code or datasets."
sources: 
  - title: "Open-R1: a fully open reproduction of DeepSeek-R1"
    url: "https://huggingface.co/blog/open-r1"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
  - title: "DeepSeek-AI (2025), DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    url: "https://arxiv.org/abs/2501.12948"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["DeepSeek-R1 showed pure RL could teach reasoning, but left open how the data was curated and which hyperparameters worked.", "Open-R1's goal is to rebuild the missing pieces (data, training code, scaling trade-offs) in the open."]
draft: false
date: "2025-01-28"
---

## What happened

Hugging Face launched **Open-R1**, a project to systematically **reconstruct DeepSeek-R1's data and training pipeline**, validate its claims, and push open reasoning models further.

## The technical details

The post explains why it was needed. DeepSeek-R1 (summarised here on 23 Jan 2025) came with weights and a detailed technical report whose most notable step was **pure reinforcement learning** to teach a base model to reason, but it left open:

- **data collection**: how the reasoning datasets were curated
- **model training**: no training code was released, so the best hyperparameters across model families and scales were unknown
- **scaling laws**: the compute and data trade-offs of training reasoning models

## Why it matters

"Open weights" isn't the same as "reproducible". Open-R1 follows the same logic as LLM360 and OLMo (summarised Dec 2023 and Feb 2024): publish the recipe, not just the result.
