---
title: "Paper summary: Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models"
categories: ["papers"]
tags: ["llm", "evaluation"]
summary: "Prometheus 2 is an open evaluator LM that does both direct scoring and pairwise ranking against user-defined criteria, built to track human and GPT-4 judgements more closely than earlier open judges."
sources: 
  - title: "Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models (arXiv:2405.01535)"
    url: "https://arxiv.org/abs/2405.01535"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:19.257Z"
  - title: "Hugging Face Daily Papers, 2024-05-03"
    url: "https://huggingface.co/papers?date=2024-05-03"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:41.670Z"
  - title: "Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2405.01535"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:19.257Z"
highlights: ["One open judge model handles both common formats: scoring a single answer and choosing between two.", "The authors stress that model-based evaluation should be used with human evaluation, not instead of it."]
papers: 
  - title: "Prometheus 2: An Open Source Language Model Specialized in Evaluating Other Language Models"
    authors: ["Seungone Kim", "Juyoung Suk", "Shayne Longpre", "Bill Yuchen Lin", "Jamin Shin", "Sean Welleck", "Graham Neubig", "Moontae Lee", "Kyungjae Lee", "Minjoon Seo"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2405.01535"
    pdf: "https://arxiv.org/pdf/2405.01535v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Open-source LLM-as-a-judge"
  method: "Evaluator LM trained for both direct assessment and pairwise ranking under custom criteria (successor to Prometheus)"
  data: "Four direct-assessment and four pairwise-ranking benchmarks"
  result: "Higher agreement with humans and proprietary judges than other open evaluators, per the authors"
draft: false
date: "2024-05-03"
---

## Problem

GPT-4 is often used to grade other models' answers, but closed judges raise transparency, controllability and cost problems. According to the abstract, existing open judges (including the first Prometheus, summarised here in October 2023) gave scores that diverged from humans, supported only one of the two main formats, and mostly judged generic qualities like helpfulness rather than custom criteria.

## Method

**Prometheus 2** is trained to do both **direct assessment** (score one response) and **pairwise ranking** (pick the better of two), in each case against a **user-defined evaluation criterion**.

## Key results

The paper evaluates on four direct-assessment and four pairwise-ranking benchmarks. It reports that Prometheus 2 has the highest correlation and agreement with human judges and proprietary LM judges among the open evaluators tested.

## Limitations

From the paper's own section:

- Agreement with humans or GPT-4 and Claude-3-Opus is an *indirect* measure of evaluation quality, and may not be the best one.
- Model-based evaluation should be used together with human evaluation, not as a replacement.
- Claims about generalisation rest on an overlap analysis between training and evaluation data.
