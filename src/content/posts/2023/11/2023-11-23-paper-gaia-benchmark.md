---
title: "Paper summary: GAIA: a benchmark for General AI Assistants"
categories: ["papers"]
tags: ["agents", "evaluation", "benchmark"]
summary: "GAIA is a benchmark of 466 real-world questions that are easy for people but need reasoning, browsing, multimodality and tool use; humans scored 92% against 15% for GPT-4 with plugins."
sources: 
  - title: "GAIA: a benchmark for General AI Assistants (arXiv:2311.12983)"
    url: "https://arxiv.org/abs/2311.12983"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:52.383Z"
  - title: "Hugging Face Daily Papers, 2023-11-23"
    url: "https://huggingface.co/papers?date=2023-11-23"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:03.122Z"
  - title: "GAIA: a benchmark for General AI Assistants (arXiv HTML full text)"
    url: "https://arxiv.org/html/2311.12983"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:52.383Z"
highlights: ["GAIA deliberately targets tasks that are simple for humans but hard for AI, the opposite of \"harder exams\".", "Answers are short and unique, so grading is automatic, but the reasoning trace isn't evaluated."]
papers: 
  - title: "GAIA: a benchmark for General AI Assistants"
    authors: ["Grégoire Mialon", "Clémentine Fourrier", "Craig Swift", "Thomas Wolf", "Yann LeCun", "Thomas Scialom"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2311.12983"
    pdf: "https://arxiv.org/pdf/2311.12983v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Evaluating general AI assistants (tool use, browsing, multimodality, reasoning)"
  method: "466 human-written real-world questions with unique short answers; 300 answers held out for a leaderboard"
  data: "GAIA question set; leaderboard on Hugging Face"
  result: "Humans 92% vs GPT-4 with plugins 15%, per the abstract"
draft: false
date: "2023-11-23"
---

## Problem

LLMs were beating humans on professional-exam style benchmarks (law, chemistry), yet still failed at everyday multi-step tasks. Benchmarks that chase ever-harder questions for humans miss that gap.

## Method

GAIA flips the philosophy. Its questions are **conceptually simple for humans** but require a mix of abilities: reasoning, handling multiple modalities (files, images), **web browsing** and **tool use**. Each question has a short, unambiguous answer, so scoring is easy and automatic. The authors wrote **466 questions** and keep the answers to **300** of them private, to power a leaderboard hosted on Hugging Face.

## Key results

The headline gap: human respondents scored **92%**, while **GPT-4 with plugins scored 15%**. The authors argue that reaching human-like robustness on such questions is a meaningful milestone toward more general AI.

## Limitations

From the paper's limitations section: GAIA checks only the final answer, **not the reasoning trace**. Different valid paths can reach the answer and there's no simple way to grade them, so the authors chose ease of use. They also note that only the strongest available models were evaluated, and they leave human or model-based grading of plans to future work.
