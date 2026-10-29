---
title: "Paper summary: Chain-of-Thought Reasoning Without Prompting"
categories: ["papers"]
tags: ["llm", "reasoning", "decoding"]
summary: "Chain-of-thought reasoning can appear without any prompting: branching on the top-k first tokens during decoding often reveals reasoning paths, and those paths come with higher answer confidence."
sources: 
  - title: "Chain-of-Thought Reasoning Without Prompting (arXiv:2402.10200)"
    url: "https://arxiv.org/abs/2402.10200"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:40:07.044Z"
  - title: "Hugging Face Daily Papers, 2024-02-16"
    url: "https://huggingface.co/papers?date=2024-02-16"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:54.829Z"
highlights: ["Greedy decoding hides reasoning that's already there; exploring alternative first tokens uncovers it.", "Confidence in the final answer is higher on paths that contain a chain of thought, which gives a way to pick them."]
papers: 
  - title: "Chain-of-Thought Reasoning Without Prompting"
    authors: ["Xuezhi Wang", "Denny Zhou"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2402.10200"
    pdf: "https://arxiv.org/pdf/2402.10200v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Eliciting reasoning from pretrained LLMs without prompt engineering"
  method: "CoT-decoding: branch on top-k alternatives at the first decoding step, then rank paths by answer confidence"
  data: "Various reasoning benchmarks"
  result: "Reasoning paths found by decoding alone; CoT-decoding improves reasoning over greedy decoding, per the authors"
draft: false
date: "2024-02-16"
---

## Problem

Getting LLMs to reason step by step usually relies on prompting: few-shot examples or "let's think step by step". This adds manual effort and makes it hard to tell what the model can do **intrinsically**, versus what the prompt induced.

## Method

The authors change only the **decoding**. Greedy decoding takes the single most likely token at each step. CoT-decoding instead looks at the **top-k alternative tokens at the first step**, continues each branch, and inspects the resulting paths. Chain-of-thought paths often appear in these alternatives. The model's **confidence** in its final answer is noticeably higher on paths that contain reasoning, so it can be used to select them.

## Key results

According to the paper, CoT paths are frequently present in pre-trained models without any prompting, and selecting them by confidence improves reasoning results over greedy decoding across several benchmarks.

## Limitations

There's no dedicated limitations section in the extracted text. The method explores several decoding paths per question, so it costs more compute than one greedy pass.
