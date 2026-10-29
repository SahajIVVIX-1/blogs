---
title: "Paper summary: Code as Agent Harness"
categories: ["papers"]
tags: ["agents", "code", "survey"]
summary: "A survey that treats code as the infrastructure of agents, not just their output: the interface agents act through, the mechanism for planning, memory and verification, and the shared artefact that coordinates multiple agents."
sources: 
  - title: "Code as Agent Harness (arXiv:2605.18747)"
    url: "https://arxiv.org/abs/2605.18747"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:25.058Z"
  - title: "Hugging Face Daily Papers, 2026-05-19"
    url: "https://huggingface.co/papers?date=2026-05-19"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:40.178Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/YennNing/Awesome-Code-as-Agent-Harness-Papers"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:52:25.058Z"
highlights: ["In agent systems, code has become the medium for reasoning, acting, modelling the environment and verifying by execution.", "The survey is organised in three layers: harness interface, harness mechanisms, and scaling to multi-agent settings."]
papers: 
  - title: "Code as Agent Harness"
    authors: ["Xuying Ning", "Katherine Tieu", "Dongqi Fu", "Tianxin Wei", "Zihao Li", "Yuanchen Bei", "Jiaru Zou", "Mengting Ai", "Zhining Liu", "Ting-Wei Li", "Lingjie Chen", "Yanjun Zhao", "Ke Yang", "Bingxuan Li", "Cheng Qian", "Gaotang Li", "Xiao Lin", "Zhichen Zeng", "Ruizhong Qiu", "Sirui Chen", "Yifan Sun", "Xiyuan Yang", "Ruida Wang", "Rui Pan", "Chenyuan Yang", "Dylan Zhang", "Liri Fang", "Zikun Cui", "Yang Cao", "Pan Chen", "Dorothy Sun", "Ren Chen", "Mahesh Srinivasan", "Nipun Mathur", "Yinglong Xia", "Hong Li", "Hong Yan", "Pan Lu", "Lingming Zhang", "Tong Zhang", "Hanghang Tong", "Jingrui He"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2605.18747"
    pdf: "https://arxiv.org/pdf/2605.18747v1"
    code: "https://github.com/YennNing/Awesome-Code-as-Agent-Harness-Papers"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2605.18747.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2605.18747\">Ning et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Taxonomy of code as agent harness."
images: 
  - src: "images/2026/paper-2605.18747.webp"
    alt: "Figure from the paper \"Code as Agent Harness\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2605.18747\">Ning et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Taxonomy of code as agent harness."
card: 
  task: "Organising research on code-centred agent infrastructure"
  method: "Survey: harness interface → harness mechanisms (planning, memory, tools, feedback) → multi-agent scaling"
  data: "Literature across coding assistants, GUI/OS automation, embodied agents, science, DevOps and enterprise"
  result: "A taxonomy (Figure 1) and open challenges for harness engineering"
draft: false
date: "2026-05-19"
---

## Problem

LLMs got good at writing code. In agent systems, code now does more: it's how agents **reason, act, model their environment and verify** results by running them. The authors call this setup an **agent harness**.

## Method

The survey proposes **"code as agent harness"** and organises work in three layers (Figure 1):

1. **Harness interface**: code connecting agents to reasoning, actions and environment models.
2. **Harness mechanisms**: planning, memory and tool use for long tasks, plus feedback-driven control that makes the harness reliable.
3. **Scaling**: from one agent to many, where shared code artefacts support coordination, review and verification.

## Key results

The survey covers applications from coding assistants and GUI/OS automation to embodied agents, science, personalisation, DevOps and enterprise workflows, and outlines open challenges, including evaluation that goes beyond final-answer checks.

## Limitations

As a survey, it reflects the field in spring 2026.
