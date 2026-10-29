---
title: "Paper summary: Prometheus: Inducing Fine-grained Evaluation Capability in Language Models"
categories: ["papers"]
tags: ["llm", "evaluation"]
summary: "Prometheus is an open 13B evaluator LLM trained on GPT-4-generated feedback that scores long-form answers against a user-provided rubric, approaching GPT-4's agreement with human raters."
sources: 
  - title: "Prometheus: Inducing Fine-grained Evaluation Capability in Language Models (arXiv:2310.08491)"
    url: "https://arxiv.org/abs/2310.08491"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:15.235Z"
  - title: "Hugging Face Daily Papers, 2023-10-12"
    url: "https://huggingface.co/papers?date=2023-10-12"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:37.530Z"
  - title: "Code repository"
    url: "https://github.com/kaistAI/Prometheus"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:38:15.235Z"
highlights: ["Given a reference answer and a scoring rubric, a 13B open model can grade answers about as well as GPT-4, according to the paper.", "Fine-grained, user-defined rubrics are the key input, not a generic \"rate this 1–10\"."]
papers: 
  - title: "Prometheus: Inducing Fine-grained Evaluation Capability in Language Models"
    authors: ["Seungone Kim", "Jamin Shin", "Yejin Cho", "Joel Jang", "Shayne Longpre", "Hwaran Lee", "Sangdoo Yun", "Seongjin Shin", "Sungdong Kim", "James Thorne", "Minjoon Seo"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2310.08491"
    pdf: "https://arxiv.org/pdf/2310.08491v2"
    code: "https://github.com/kaistAI/Prometheus"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2023/paper-2310.08491.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2310.08491\">Kim et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Compared to conventional, coarse-grained LLM evaluation, we propose a fine-grained approach that takes user-defined score rubrics as input."
images: 
  - src: "images/2023/paper-2310.08491.webp"
    alt: "Figure from the paper \"Prometheus: Inducing Fine-grained Evaluation Capability in Language Models\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2310.08491\">Kim et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Compared to conventional, coarse-grained LLM evaluation, we propose a fine-grained approach that takes user-defined score rubrics as input."
card: 
  task: "Open-source fine-grained evaluation of long-form LLM outputs"
  method: "Train a 13B LLM on the Feedback Collection (1K rubrics, 20K instructions, 100K GPT-4 responses + feedback)"
  data: "Feedback Collection; MT Bench, Vicuna Bench, Feedback Bench, Flask Eval"
  result: "Pearson 0.897 with human evaluators on 45 rubrics vs GPT-4 0.882 and ChatGPT 0.392, per the abstract"
draft: false
date: "2023-10-12"
---

## Problem

Using GPT-4 as a judge of long-form answers had become standard. For practitioners, though, a closed model is a problem: versions change silently, costs add up at scale, and custom criteria ("is this readable for a child?") are hard to control.

## Method

The authors built the **Feedback Collection** with GPT-4: about **1K fine-grained score rubrics**, **20K instructions** and **100K responses with written feedback**. They trained **Prometheus**, a 13B open model, to take an instruction, a response, a **reference answer** and a **rubric**, and output written feedback plus a score.

## Key results

As reported in the abstract:

- On 45 custom rubrics, Prometheus's scores correlate with human evaluators at **Pearson 0.897**, on par with GPT-4 (0.882) and far above ChatGPT (0.392).
- Across 1,222 rubrics on four benchmarks, its correlation with GPT-4 follows similar trends.

## Limitations

The evaluator is trained on GPT-4-generated feedback, so it inherits that teacher's biases. It also relies on having a good reference answer and rubric, which the abstract makes a condition ("when the appropriate reference materials … are accompanied").
