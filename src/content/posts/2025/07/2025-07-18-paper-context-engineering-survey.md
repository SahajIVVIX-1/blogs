---
title: "Paper summary: A Survey of Context Engineering for Large Language Models"
categories: ["papers"]
tags: ["llm", "rag", "agents", "survey"]
summary: "A survey of over 1,400 papers that defines \"context engineering\": retrieving, processing and managing everything put into an LLM's context, and how RAG, memory, tools and multi-agent systems build on it."
sources: 
  - title: "A Survey of Context Engineering for Large Language Models (arXiv:2507.13334)"
    url: "https://arxiv.org/abs/2507.13334"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:49.026Z"
  - title: "Hugging Face Daily Papers, 2025-07-18"
    url: "https://huggingface.co/papers?date=2025-07-18"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:10.187Z"
  - title: "A Survey of Context Engineering for Large Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2507.13334"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:49.026Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/Meirtz/Awesome-Context-Engineering"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:47:49.026Z"
highlights: ["Context engineering covers everything that goes into the context: retrieval, generation, processing and management, not just the prompt wording.", "The survey finds an asymmetry: models understand complex contexts far better than they generate equally sophisticated long outputs."]
papers: 
  - title: "A Survey of Context Engineering for Large Language Models"
    authors: ["Lingrui Mei", "Jiayu Yao", "Yuyao Ge", "Yiwei Wang", "Baolong Bi", "Yujun Cai", "Jiazhi Liu", "Mingyu Li", "Zhong-Zhi Li", "Duzhen Zhang", "Chenlin Zhou", "Jiayi Mao", "Tianze Xia", "Jiafeng Guo", "Shenghua Liu"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2507.13334"
    pdf: "https://arxiv.org/pdf/2507.13334v2"
    code: "https://github.com/Meirtz/Awesome-Context-Engineering"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Systematising how information is supplied to LLMs"
  method: "Taxonomy of foundational components (retrieval/generation, processing, management) and system implementations (RAG, memory, tool-integrated reasoning, multi-agent)"
  data: "Analysis of over 1,400 research papers"
  result: "A roadmap plus an identified gap between context understanding and long-form generation"
draft: false
date: "2025-07-18"
---

## Problem

LLM performance depends heavily on what's in the context at inference time, and "prompt engineering" is too narrow a name for everything that now goes into building that context.

## Method

The survey defines **context engineering** as the systematic optimisation of the information given to LLMs, with a taxonomy:

- **Foundational components**: context retrieval and generation, context processing, context management.
- **System implementations**: **retrieval-augmented generation (RAG)**, **memory systems**, **tool-integrated reasoning** and **multi-agent systems**.

It's based on an analysis of **over 1,400 papers**.

## Key results

Beyond the roadmap, the survey highlights a gap: models with advanced context engineering are very good at **understanding** complex contexts, but much weaker at **generating** equally sophisticated, long-form outputs.

## Limitations

As a survey it maps existing work. A companion reading list is maintained on GitHub, and the field moves quickly.
