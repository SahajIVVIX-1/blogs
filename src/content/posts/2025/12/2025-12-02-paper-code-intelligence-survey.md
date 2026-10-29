---
title: "Paper summary: From Code Foundation Models to Agents and Applications: A Comprehensive Survey and Practical Guide to Code Intelligence"
categories: ["papers"]
tags: ["llm", "code", "agents", "survey"]
summary: "A large survey and practical guide to code LLMs, from data curation and pre-training through SFT, RL and coding agents, comparing general and code-specialised models and the gap between benchmarks and real development."
sources: 
  - title: "From Code Foundation Models to Agents and Applications: A Comprehensive Survey and Practical Guide to Code Intelligence (arXiv:2511.18538)"
    url: "https://arxiv.org/abs/2511.18538"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:54.947Z"
  - title: "Hugging Face Daily Papers, 2025-12-02"
    url: "https://huggingface.co/papers?date=2025-12-02"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:58.297Z"
  - title: "From Code Foundation Models to Agents and Applications: A Comprehensive Survey and Practical Guide to Code Intelligence (arXiv HTML full text)"
    url: "https://arxiv.org/html/2511.18538"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:54.947Z"
highlights: ["The guide follows the whole life cycle of a code model, from data to agents, with its own probing experiments.", "It highlights the gap between academic benchmarks and real-world needs: correctness, security, large-codebase context and tool integration."]
papers: 
  - title: "From Code Foundation Models to Agents and Applications: A Comprehensive Survey and Practical Guide to Code Intelligence"
    authors: ["Jian Yang", "Xianglong Liu", "Weifeng Lv", "Ken Deng", "Shawn Guo", "Lin Jing", "Yizhi Li", "Shark Liu", "Xianzhen Luo", "Yuyu Luo", "Changzai Pan", "Ensheng Shi", "Yingshui Tan", "Renshuai Tao", "Jiajun Wu", "Xianjie Wu", "Zhenhe Wu", "Daoguang Zan", "Chenchen Zhang", "Wei Zhang", "He Zhu", "Terry Yue Zhuo", "Kerui Cao", "Xianfu Cheng", "Jun Dong", "Shengjie Fang", "Zhiwei Fei", "Xiangyuan Guan", "Qipeng Guo", "Zhiguang Han", "Joseph James", "Tianqi Luo", "Renyuan Li", "Yuhang Li", "Yiming Liang", "Congnan Liu", "Jiaheng Liu", "Qian Liu", "Ruitong Liu", "Tyler Loakman", "Xiangxin Meng", "Chuang Peng", "Tianhao Peng", "Jiajun Shi", "Mingjie Tang", "Boyang Wang", "Haowen Wang", "Yunli Wang", "Fanglin Xu", "Zihan Xu", "Fei Yuan", "Ge Zhang", "Jiayi Zhang", "Xinhao Zhang", "Wangchunshu Zhou", "Hualei Zhu", "King Zhu", "Bryan Dai", "Aishan Liu", "Zhoujun Li", "Chenghua Lin", "Tianyu Liu", "Chao Peng", "Kai Shen", "Libo Qin", "Shuangyong Song", "Zizheng Zhan", "Jiajun Zhang", "Jie Zhang", "Zhaoxiang Zhang", "Bo Zheng"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2511.18538"
    pdf: "https://arxiv.org/pdf/2511.18538v5"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Synthesising the code-LLM field"
  method: "Survey plus analytic and probing experiments across the model life cycle"
  data: "General LLMs (GPT-4, Claude, LLaMA) and code LLMs (StarCoder, Code LLaMA, DeepSeek-Coder, QwenCoder)"
  result: "A practical guide and an analysis of the research–practice gap"
draft: false
date: "2025-12-02"
---

## Problem

Code LLMs moved from rule-based systems to Transformers, and from single-digit to over 95% success on benchmarks like HumanEval, powering tools like GitHub Copilot, Cursor and Claude Code. But the field is scattered, and benchmark success doesn't equal real-world usefulness.

## Method

A comprehensive synthesis and **practical guide**, with the authors' own analytic and probing experiments, covering the full life cycle:

- data curation and code pre-training
- supervised fine-tuning and reinforcement learning
- prompting paradigms
- autonomous coding agents

It compares **general** LLMs (GPT-4, Claude, LLaMA) with **code-specialised** ones (StarCoder, Code LLaMA, DeepSeek-Coder, QwenCoder).

## Key results

Beyond the synthesis, the survey articulates a **research–practice gap**: academic benchmarks versus real development needs, such as correctness, **security** (see A.S.E from September), awareness of large codebases, and integration with developer workflows.

## Limitations

As a survey, it reflects the state of the field at the time of writing.
