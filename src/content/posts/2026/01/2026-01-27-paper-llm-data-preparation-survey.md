---
title: "Paper summary: Can LLMs Clean Up Your Mess? A Survey of Application-Ready Data Preparation with LLMs"
categories: ["papers"]
tags: ["llm", "data", "survey"]
summary: "A survey of using LLMs to prepare application-ready data: cleaning, integration and enrichment, moving from rule-based pipelines to prompt-driven and agentic workflows."
sources: 
  - title: "Can LLMs Clean Up Your Mess? A Survey of Application-Ready Data Preparation with LLMs (arXiv:2601.17058)"
    url: "https://arxiv.org/abs/2601.17058"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:47.444Z"
  - title: "Hugging Face Daily Papers, 2026-01-27"
    url: "https://huggingface.co/papers?date=2026-01-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:32.177Z"
  - title: "Can LLMs Clean Up Your Mess? A Survey of Application-Ready Data Preparation with LLMs (arXiv HTML full text)"
    url: "https://arxiv.org/html/2601.17058"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:47.444Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/weAIDB/awesome-data-llm"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:50:47.444Z"
highlights: ["Data preparation is shifting from hand-written rules and task-specific models to prompt-driven, context-aware, agentic workflows.", "Three core tasks: cleaning, integration and enrichment."]
papers: 
  - title: "Can LLMs Clean Up Your Mess? A Survey of Application-Ready Data Preparation with LLMs"
    authors: ["Wei Zhou", "Jun Zhou", "Haoyu Wang", "Zhenghao Li", "Qikang He", "Shaokun Han", "Guoliang Li", "Xuanhe Zhou", "Yeye He", "Chunwei Liu", "Zirui Tang", "Bin Wang", "Shen Tang", "Kai Zuo", "Yuyu Luo", "Zhenzhe Zheng", "Conghui He", "Jingren Zhou", "Fan Wu"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2601.17058"
    pdf: "https://arxiv.org/pdf/2601.17058v1"
    code: "https://github.com/weAIDB/awesome-data-llm"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2601.17058.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2601.17058\">Zhou et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Fig. 1: Application-Ready Data Preparation – Three core tasks (i.e., Data Cleaning, Integration, and Enrichment) address key sources of data inefficiency: quality issues, integration barriers, and semantic gaps."
images: 
  - src: "images/2026/paper-2601.17058.webp"
    alt: "Figure from the paper \"Can LLMs Clean Up Your Mess? A Survey of Application-Ready Data Preparation with LLMs\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2601.17058\">Zhou et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Fig. 1: Application-Ready Data Preparation – Three core tasks (i.e., Data Cleaning, Integration, and Enrichment) address key sources of data inefficiency: quality issues, integration barriers, and semantic gaps."
card: 
  task: "Organising LLM-based data preparation"
  method: "Survey with task-centric taxonomy: cleaning (standardisation, error processing, imputation), integration (entity/schema matching), enrichment (annotation, profiling)"
  data: "Hundreds of recent works"
  result: "A taxonomy with strengths and limitations per task"
draft: false
date: "2026-01-27"
---

## Problem

Analytics, visualisation and decision-making need **application-ready data**. Traditional preparation relies on hand-crafted rules and domain-specific models, which take a lot of manual effort and expertise.

## Method

The survey reviews hundreds of works and organises LLM-based preparation into three tasks (Figure 1):

- **data cleaning**: standardisation, error processing, imputation
- **data integration**: entity matching, schema matching
- **data enrichment**: annotation, profiling

It describes the shift from rule-based, model-specific pipelines to **prompt-driven**, **context-aware** and **agentic** workflows.

## Key results

For each task, the survey lists representative techniques with their strengths (e.g. better generalisation, semantic understanding) and their limitations. Its first limitations section explains why traditional methods are costly: heavy manual effort and dependence on expertise.

## Limitations

As a survey, it maps a fast-moving area as of early 2026. A companion reading list is maintained on GitHub.
