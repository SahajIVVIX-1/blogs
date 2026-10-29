---
title: "Paper summary: OpenHands: An Open Platform for AI Software Developers as Generalist Agents"
categories: ["papers"]
tags: ["agents", "software-engineering"]
summary: "OpenHands (formerly OpenDevin) is an open platform for agents that work like software developers, writing code, using a shell and browsing, with sandboxed execution and built-in benchmarks."
sources: 
  - title: "OpenHands: An Open Platform for AI Software Developers as Generalist Agents (arXiv:2407.16741)"
    url: "https://arxiv.org/abs/2407.16741"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:28.595Z"
  - title: "Hugging Face Daily Papers, 2024-07-25"
    url: "https://huggingface.co/papers?date=2024-07-25"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:32.381Z"
  - title: "OpenHands: An Open Platform for AI Software Developers as Generalist Agents (arXiv HTML full text)"
    url: "https://arxiv.org/html/2407.16741"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:28.595Z"
highlights: ["Agents act through the same tools a developer uses: code, a command line and a web browser.", "Execution happens in a sandbox, and evaluation benchmarks such as SWE-bench and WebArena are built in."]
papers: 
  - title: "OpenHands: An Open Platform for AI Software Developers as Generalist Agents"
    authors: ["Xingyao Wang", "Boxuan Li", "Yufan Song", "Frank F. Xu", "Xiangru Tang", "Mingchen Zhuge", "Jiayi Pan", "Yueqi Song", "Bowen Li", "Jaskirat Singh", "Hoang H. Tran", "Fuqiang Li", "Ren Ma", "Mingzhang Zheng", "Bill Qian", "Yanjun Shao", "Niklas Muennighoff", "Yizhe Zhang", "Binyuan Hui", "Junyang Lin", "Robert Brennan", "Hao Peng", "Heng Ji", "Graham Neubig"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2407.16741"
    pdf: "https://arxiv.org/pdf/2407.16741v3"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2024/paper-2407.16741.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2407.16741\">Wang et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: OpenHands User Interface (UI, § D ) allows users to view files, check executed bash commands/Python code, observe the agent’s browser activity, and directly interact with the agent."
images: 
  - src: "images/2024/paper-2407.16741.webp"
    alt: "Figure from the paper \"OpenHands: An Open Platform for AI Software Developers as Generalist Agents\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2407.16741\">Wang et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: OpenHands User Interface (UI, § D ) allows users to view files, check executed bash commands/Python code, observe the agent’s browser activity, and directly interact with the agent."
card: 
  task: "Building and evaluating generalist software-developer agents"
  method: "Open platform with agent abstractions, sandboxed code execution, multi-agent coordination and integrated benchmarks"
  data: "15 challenging tasks incl. SWE-bench and WebArena"
  result: "Platform and evaluation of agents across the 15 tasks; released under the MIT licence, per the paper"
draft: false
date: "2024-07-25"
---

## Problem

LLM agents that can act, writing code, running commands and browsing the web, were developing quickly, but mostly in separate codebases that were hard to compare or build on.

## Method

**OpenHands** (formerly **OpenDevin**) is an open platform where agents interact with the world the way a human developer does: **writing code**, using a **command line** and **browsing the web**. It provides:

- a way to implement new agents
- **sandboxed** environments for safe code execution
- coordination between multiple agents
- built-in evaluation benchmarks

The paper's Figure 1 shows the user interface, where you can watch files, commands and the agent's browser.

## Key results

The authors evaluate agents on **15 challenging tasks**, including software engineering (**SWE-bench**) and web browsing (**WebArena**). The project is a community effort released under a permissive licence.

## Limitations

The paper's future-work section names current weaknesses:

- multimodal support (images, video, spreadsheets) isn't yet principled
- agents still struggle with complex tasks
- agents perform badly when **editing long files**
