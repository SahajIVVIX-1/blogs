---
title: "Paper summary: LlamaFactory: Unified Efficient Fine-Tuning of 100+ Language Models"
categories: ["papers"]
tags: ["llm", "fine-tuning", "tools"]
summary: "LlamaFactory is an open framework that brings many efficient fine-tuning methods together for 100+ LLMs, including a no-code web UI called LlamaBoard."
sources: 
  - title: "LlamaFactory: Unified Efficient Fine-Tuning of 100+ Language Models (arXiv:2403.13372)"
    url: "https://arxiv.org/abs/2403.13372"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:39.561Z"
  - title: "Hugging Face Daily Papers, 2024-03-21"
    url: "https://huggingface.co/papers?date=2024-03-21"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:15.489Z"
  - title: "LlamaFactory: Unified Efficient Fine-Tuning of 100+ Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2403.13372"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:39.561Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/hiyouga/LLaMA-Factory"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:40:39.561Z"
highlights: ["One framework, many models and many efficient fine-tuning methods (LoRA, QLoRA and others) behind a common interface.", "The paper reports over 25,000 GitHub stars at the time of writing."]
papers: 
  - title: "LlamaFactory: Unified Efficient Fine-Tuning of 100+ Language Models"
    authors: ["Yaowei Zheng", "Richong Zhang", "Junhao Zhang", "Yanhan Ye", "Zheyan Luo", "Zhangchi Feng", "Yongqiang Ma"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2403.13372"
    pdf: "https://arxiv.org/pdf/2403.13372v4"
    code: "https://github.com/hiyouga/LLaMA-Factory"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Making efficient LLM fine-tuning easy across many models"
  method: "Unified framework of efficient training methods with a web UI (LlamaBoard)"
  data: "Validated on language modelling and text generation tasks"
  result: "Supports 100+ LLMs; released on GitHub with 25,000+ stars and 3,000+ forks at writing, per the abstract"
draft: false
date: "2024-03-21"
---

## Problem

Efficient fine-tuning methods (LoRA, QLoRA, freezing, quantisation) are each implemented differently, and adapting them to each new model takes real engineering effort.

## Method

**LlamaFactory** is a **unified framework** that puts these methods behind one interface for **100+ LLMs**. Its built-in web UI, **LlamaBoard**, lets users configure and run fine-tuning without code. The paper describes the modular design that lets models, datasets and training methods be combined freely.

## Key results

The authors validate efficiency and effectiveness on language-modelling and text-generation tasks. The abstract reports the project had over **25,000 stars** and **3,000 forks** on GitHub at the time.

## Limitations

This is a systems/tooling paper. Its experiments show the framework works but don't aim to establish new state-of-the-art methods. Supported models and methods change quickly with new releases.
