---
title: "Paper summary: General Agentic Memory Via Deep Research"
categories: ["papers"]
tags: ["agents", "memory", "retrieval"]
summary: "General Agentic Memory keeps a light memory plus the full history in a page-store, then uses a \"researcher\" agent to build the right context at request time, like just-in-time compilation for memory."
sources: 
  - title: "General Agentic Memory Via Deep Research (arXiv:2511.18423)"
    url: "https://arxiv.org/abs/2511.18423"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:47.254Z"
  - title: "Hugging Face Daily Papers, 2025-11-25"
    url: "https://huggingface.co/papers?date=2025-11-25"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:54.067Z"
  - title: "General Agentic Memory Via Deep Research (arXiv HTML full text)"
    url: "https://arxiv.org/html/2511.18423"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:47.254Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/VectorSpaceLab/general-agentic-memory"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:49:47.254Z"
highlights: ["Pre-summarising memory in advance loses information; GAM keeps everything and does the \"deep research\" when a request arrives.", "Two parts: a Memorizer that keeps a light index and the full page-store, and a Researcher that retrieves and integrates at runtime."]
papers: 
  - title: "General Agentic Memory Via Deep Research"
    authors: ["B. Y. Yan", "Chaofan Li", "Hongjin Qian", "Shuqi Lu", "Zheng Liu"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2511.18423"
    pdf: "https://arxiv.org/pdf/2511.18423v1"
    code: "https://github.com/VectorSpaceLab/general-agentic-memory"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2511.18423.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2511.18423\">Yan et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Overview of GAM. The memorizer generates a light memory by for agent history and keeps the complete history in the page-store during the offline stage. The researcher performs deep-research to retrieve and …"
images: 
  - src: "images/2025/paper-2511.18423.webp"
    alt: "Figure from the paper \"General Agentic Memory Via Deep Research\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2511.18423\">Yan et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Overview of GAM. The memorizer generates a light memory by for agent history and keeps the complete history in the page-store during the offline stage. The researcher performs deep-research to retrieve and …"
card: 
  task: "Memory for AI agents without information loss"
  method: "Memorizer (light memory + complete page-store offline) + Researcher (runtime deep research over the page-store, guided by the light memory); trainable end to end with RL"
  data: "Memory-grounded task completion scenarios"
  result: "Substantial improvement over existing memory systems, per the abstract"
draft: false
date: "2025-11-25"
---

## Problem

Most agent memory is **static**: it's summarised ahead of time so it's ready to use. According to the abstract, this inevitably loses information that turns out to matter later.

## Method

**General agentic memory (GAM)** follows a **"just-in-time compilation"** principle: keep simple but useful memory offline, and build an optimised context **at runtime** for each request (Figure 1).

- **Memorizer**: writes a **lightweight memory** that highlights key history, while keeping the **complete history** in a universal **page-store**.
- **Researcher**: when a request comes in, it searches the page-store, guided by the light memory, and integrates what it finds, much like a deep-research agent.

The design benefits from frontier LLMs' agentic abilities and test-time scaling, and can be optimised end to end with RL.

## Key results

The abstract reports substantial improvements over existing memory systems in memory-grounded task completion.

## Limitations

There's no dedicated limitations section in the extracted text. Runtime research costs more per request than looking up a pre-built summary.
