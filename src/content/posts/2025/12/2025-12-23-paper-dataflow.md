---
title: "Paper summary: DataFlow: An LLM-Driven Framework for Unified Data Preparation and Workflow Automation in the Era of Data-Centric AI"
categories: ["papers"]
tags: ["llm", "data", "tools"]
summary: "DataFlow is an LLM-driven framework for building data-preparation pipelines from about 200 reusable operators with a PyTorch-style API, plus an agent that turns plain-language specs into pipelines."
sources: 
  - title: "DataFlow: An LLM-Driven Framework for Unified Data Preparation and Workflow Automation in the Era of Data-Centric AI (arXiv:2512.16676)"
    url: "https://arxiv.org/abs/2512.16676"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:15.133Z"
  - title: "Hugging Face Daily Papers, 2025-12-23"
    url: "https://huggingface.co/papers?date=2025-12-23"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:10.952Z"
  - title: "DataFlow: An LLM-Driven Framework for Unified Data Preparation and Workflow Automation in the Era of Data-Centric AI (arXiv HTML full text)"
    url: "https://arxiv.org/html/2512.16676"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:15.133Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/OpenDCAI/DataFlow"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:50:15.133Z"
highlights: ["Data preparation gets the same modular, composable treatment that PyTorch gave model building.", "A 10K-sample dataset made with DataFlow let base models beat counterparts trained on 1M Infinity-Instruct samples, per the authors."]
papers: 
  - title: "DataFlow: An LLM-Driven Framework for Unified Data Preparation and Workflow Automation in the Era of Data-Centric AI"
    authors: ["Hao Liang", "Xiaochen Ma", "Zhou Liu", "Zhen Hao Wong", "Zhengyang Zhao", "Zimo Meng", "Runming He", "Chengyu Shen", "Qifeng Cai", "Zhaoyang Han", "Meiyi Qiang", "Yalin Feng", "Tianyi Bai", "Zewei Pan", "Ziyi Guo", "Yizhen Jiang", "Jingwen Deng", "Qijie You", "Peichao Lai", "Tianyu Guo", "Chi Hsu Tsai", "Hengyi Feng", "Rui Hu", "Wenkai Yu", "Junbo Niu", "Bohan Zeng", "Ruichuan An", "Lu Ma", "Jihao Huang", "Yaowei Zheng", "Conghui He", "Linpeng Tang", "Bin Cui", "Weinan E", "Wentao Zhang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2512.16676"
    pdf: "https://arxiv.org/pdf/2512.16676v1"
    code: "https://github.com/OpenDCAI/DataFlow"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2512.16676.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2512.16676\">Liang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : High-level architecture of DataFlow . The system consists of a core execution engine (storage, operators, templates, and LLM serving), reusable pipelines, user-facing control layers (CLI and agent), and an …"
images: 
  - src: "images/2025/paper-2512.16676.webp"
    alt: "Figure from the paper \"DataFlow: An LLM-Driven Framework for Unified Data Preparation and Workflow Automation in the Era of Data-Centric AI\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2512.16676\">Liang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : High-level architecture of DataFlow . The system consists of a core execution engine (storage, operators, templates, and LLM serving), reusable pipelines, user-facing control layers (CLI and agent), and an …"
card: 
  task: "Reproducible, scalable data preparation for LLMs"
  method: "~200 reusable operators, six domain pipelines, PyTorch-style pipeline API; DataFlow-Agent turns NL specs into pipelines"
  data: "Text, maths, code, Text-to-SQL, agentic RAG, knowledge extraction"
  result: "Up to +3% Text-to-SQL execution accuracy, +7% average on code, 1–3 points on MATH/GSM8K/AIME, per the abstract"
draft: false
date: "2025-12-23"
---

## Problem

LLM data preparation is mostly **ad-hoc scripts** and loosely specified workflows, hard to reproduce and with little support for model-in-the-loop generation.

## Method

**DataFlow** provides (Figure 1):

- system-level abstractions for **modular, reusable, composable** data transformations
- a **PyTorch-style API** for building debuggable, optimisable pipelines
- nearly **200 operators** and **six** general pipelines: text, maths reasoning, code, Text-to-SQL, agentic RAG and large-scale knowledge extraction
- **DataFlow-Agent**, which translates natural-language specs into executable pipelines through operator synthesis, planning and iterative verification

## Key results

From the abstract, across six use cases:

- up to **+3%** execution accuracy in Text-to-SQL over SynSQL
- **+7%** average on code benchmarks
- **1–3 point** gains on MATH, GSM8K and AIME
- a unified **10K-sample** dataset lets base models surpass counterparts trained on **1M** Infinity-Instruct samples

## Limitations

There's no dedicated limitations section in the extracted text. Gains are measured on the authors' six use cases.
