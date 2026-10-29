---
title: "Paper summary: A Survey of Agentic Reasoning for Large Language Models: Towards Recursively Self-Improving and Collective Agents"
categories: ["papers"]
tags: ["agents", "reasoning", "survey"]
summary: "A survey organising agentic reasoning into three layers (foundational single-agent skills, self-evolving agents, collective multi-agent reasoning), each split into in-context and post-training approaches."
sources: 
  - title: "A Survey of Agentic Reasoning for Large Language Models: Towards Recursively Self-Improving and Collective Agents (arXiv:2601.12538)"
    url: "https://arxiv.org/abs/2601.12538"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:50:42.233Z"
  - title: "Hugging Face Daily Papers, 2026-01-22"
    url: "https://huggingface.co/papers?date=2026-01-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:29.077Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/weitianxin/Awesome-Agentic-Reasoning"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:50:42.233Z"
highlights: ["Three layers: plan/use tools/search; improve through feedback and memory; collaborate with other agents.", "Across all layers, it separates in-context orchestration from post-training (RL, SFT)."]
papers: 
  - title: "A Survey of Agentic Reasoning for Large Language Models: Towards Recursively Self-Improving and Collective Agents"
    authors: ["Tianxin Wei", "Ting-Wei Li", "Zhining Liu", "Xuying Ning", "Ze Yang", "Jiaru Zou", "Zhichen Zeng", "Ruizhong Qiu", "Xiao Lin", "Dongqi Fu", "Zihao Li", "Mengting Ai", "Duo Zhou", "Wenxuan Bao", "Yunzhe Li", "Gaotang Li", "Cheng Qian", "Yu Wang", "Xiangru Tang", "Yin Xiao", "Liri Fang", "Hui Liu", "Xianfeng Tang", "Yuji Zhang", "Chi Wang", "Jiaxuan You", "Heng Ji", "Hanghang Tong", "Jingrui He"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2601.12538"
    pdf: "https://arxiv.org/pdf/2601.12538v2"
    code: "https://github.com/weitianxin/Awesome-Agentic-Reasoning"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2601.12538.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2601.12538\">Wei et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: An overview of agentic reasoning."
images: 
  - src: "images/2026/paper-2601.12538.webp"
    alt: "Figure from the paper \"A Survey of Agentic Reasoning for Large Language Models: Towards Recursively Self-Improving and Collective Agents\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2601.12538\">Wei et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: An overview of agentic reasoning."
card: 
  task: "Organising research on agentic reasoning"
  method: "Survey along environment layers (foundational, self-evolving, collective) × reasoning type (in-context vs post-training)"
  data: "Literature review across science, robotics, healthcare, autonomous research and more"
  result: "A unified map of agentic reasoning methods, frameworks and benchmarks"
draft: false
date: "2026-01-22"
---

## Problem

LLMs reason well in closed settings but struggle in open-ended, dynamic environments. **Agentic reasoning** reframes LLMs as agents that plan, act and learn through interaction, and the literature has grown quickly.

## Method

The survey organises the field along three layers (Figure 1):

1. **Foundational agentic reasoning**: planning, tool use and search in stable environments.
2. **Self-evolving agentic reasoning**: improving through feedback, memory and adaptation.
3. **Collective multi-agent reasoning**: coordination, knowledge sharing and shared goals.

Across all three, it separates **in-context reasoning** (structured orchestration at test time) from **post-training reasoning** (RL and SFT).

## Key results

The contribution is the map, plus a review of frameworks and benchmarks across real-world applications such as science, robotics, healthcare and autonomous research. These map closely onto the planning, memory and multi-agent posts in my own agentic AI phase this autumn.

## Limitations

As a survey, it reflects the literature at the start of 2026.
