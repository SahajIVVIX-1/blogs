---
title: "Paper summary: Raven: The Harness of Harnesses for Composable Agentic Intelligence"
categories: ["papers"]
tags: ["agents", "multi-agent", "harness"]
summary: "Raven is an open-source multi-agent ecosystem that automatically builds and evolves specialised model–harness pairs and orchestrates them across domains through a Host Agent, with stored experience turned into reusable skills."
sources: 
  - title: "Raven: The Harness of Harnesses for Composable Agentic Intelligence (arXiv:2609.33439)"
    url: "https://arxiv.org/abs/2609.33439"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:23.291Z"
  - title: "Hugging Face Daily Papers, 2026-09-30"
    url: "https://huggingface.co/papers?date=2026-09-30"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:37:01.196Z"
  - title: "Raven: The Harness of Harnesses for Composable Agentic Intelligence (arXiv HTML full text)"
    url: "https://arxiv.org/html/2609.33439"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:54:23.291Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/EverMind-AI/Raven"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:54:23.291Z"
highlights: ["Each model plus harness is treated as a composable unit of intelligence.", "A Host Agent decomposes goals, matches subtasks to specialised agents and integrates results."]
papers: 
  - title: "Raven: The Harness of Harnesses for Composable Agentic Intelligence"
    authors: ["EverMind AI"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2609.33439"
    pdf: "https://arxiv.org/pdf/2609.33439v1"
    code: "https://github.com/EverMind-AI/Raven"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Composable, cross-domain agentic systems"
  method: "Automatic construction and evolution of model–harness pairs; Host Agent orchestration; host archive, EverOS and Skill Forge for experience reuse; theoretical coverage conditions"
  data: "Complex and long-horizon tasks"
  result: "Significantly outperforms state-of-the-art agent systems, per the abstract"
draft: false
date: "2026-09-30"
---

## Problem

As agents tackle long, **cross-domain** workflows, harnesses get too complex to design by hand, and a harness tuned for one domain doesn't generalise. The question shifts from "build a better harness" to "**build, improve and orchestrate many specialised harnesses automatically**".

## Method

**Raven** ("The Harness of Harnesses") is an open-source multi-agent ecosystem that:

- automatically constructs and evolves **modular harnesses** for specific models and domains, treating each executable **model–harness pair** as a composable unit
- uses a **Host Agent** to decompose goals, match subtasks to specialised agents, coordinate dependencies and integrate results
- preserves experience across tasks (host archive, EverOS) and turns it into reusable procedures (**Skill Forge**)

The authors give sufficient conditions under which such composition expands reliable task coverage beyond any individual agent, under a shared budget.

## Key results

From the abstract: on complex, long-horizon tasks, Raven significantly outperforms state-of-the-art agent systems.

## Limitations

There's no dedicated limitations section in the extracted text, and the abstract doesn't give specific numbers.
