---
title: "Paper summary: Large Language Models as Optimizers"
categories: ["papers"]
tags: ["llm", "prompting", "optimisation"]
summary: "OPRO describes an optimisation task in natural language and lets an LLM propose new solutions from a history of past solutions and scores, used mainly to optimise prompts."
sources: 
  - title: "Large Language Models as Optimizers (arXiv:2309.03409)"
    url: "https://arxiv.org/abs/2309.03409"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:43.920Z"
  - title: "Hugging Face Daily Papers, 2023-09-08"
    url: "https://huggingface.co/papers?date=2023-09-08"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:16.997Z"
  - title: "Large Language Models as Optimizers (arXiv HTML full text)"
    url: "https://arxiv.org/html/2309.03409"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:43.920Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/google-deepmind/opro"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:37:43.920Z"
highlights: ["The \"optimizer\" is a prompt containing earlier solutions and their scores; the LLM proposes the next candidates.", "Prompts found this way beat human-written prompts by up to 8% on GSM8K and up to 50% on Big-Bench Hard, as reported."]
papers: 
  - title: "Large Language Models as Optimizers"
    authors: ["Chengrun Yang", "Xuezhi Wang", "Yifeng Lu", "Hanxiao Liu", "Quoc V. Le", "Denny Zhou", "Xinyun Chen"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2309.03409"
    pdf: "https://arxiv.org/pdf/2309.03409v3"
    code: "https://github.com/google-deepmind/opro"
    license: "http://creativecommons.org/publicdomain/zero/1.0/"
card: 
  task: "Derivative-free optimisation, mainly prompt optimisation"
  method: "Optimization by PROmpting: a meta-prompt holds past solutions with their scores; the LLM generates new solutions each step"
  data: "Linear regression and travelling salesman toy problems; GSM8K and Big-Bench Hard for prompt optimisation"
  result: "Optimised prompts beat human-designed prompts by up to 8% (GSM8K) and up to 50% (BBH), per the abstract"
draft: false
date: "2023-09-08"
---

## Problem

Many optimisation problems have no gradients. Prompt engineering is one of them: the "parameters" are words, and the objective is task accuracy.

## Method

**Optimization by PROmpting (OPRO)** writes the optimisation problem in plain language. Each step:

1. A **meta-prompt** describes the task and lists previously generated solutions *with their scores*, sorted.
2. The LLM proposes new candidate solutions.
3. The candidates are evaluated and added to the meta-prompt for the next step.

The authors first try it on linear regression and small travelling-salesman problems, then focus on **prompt optimisation**: searching for an instruction (e.g. a phrase prepended to a maths question) that maximises accuracy.

## Key results

Across several LLMs, the paper reports that OPRO-optimised prompts outperform human-designed prompts by **up to 8% on GSM8K** and **up to 50% on Big-Bench Hard** tasks. On small travelling-salesman instances, the conclusion notes OPRO performs on par with some hand-crafted heuristics.

## Limitations

The paper is explicit that OPRO isn't meant to beat gradient-based optimisers or dedicated solvers. The length of the LLM's context window makes large problems (high-dimensional regression, travelling salesman with many nodes) hard to fit in the prompt. On larger TSP instances, a classic farthest-insertion heuristic overtakes the LLMs. The paper also includes a section analysing overfitting in prompt optimisation.
