---
title: "Paper summary: FlowRL: Matching Reward Distributions for LLM Reasoning"
categories: ["papers"]
tags: ["llm", "rl", "reasoning"]
summary: "FlowRL replaces reward maximisation with matching the whole reward distribution (via a learnable partition function and reverse KL), to keep diverse reasoning paths alive; it reports +10.0% over GRPO on maths."
sources: 
  - title: "FlowRL: Matching Reward Distributions for LLM Reasoning (arXiv:2509.15207)"
    url: "https://arxiv.org/abs/2509.15207"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:46.797Z"
  - title: "Hugging Face Daily Papers, 2025-09-19"
    url: "https://huggingface.co/papers?date=2025-09-19"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:13.417Z"
  - title: "FlowRL: Matching Reward Distributions for LLM Reasoning (arXiv HTML full text)"
    url: "https://arxiv.org/html/2509.15207"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:46.797Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/Xuekai-Zhu/FlowRL"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:48:46.797Z"
highlights: ["Reward-maximising RL tends to collapse onto the most common successful path; matching the reward distribution keeps rarer valid paths.", "The scalar reward is turned into a target distribution, and the policy is pulled toward it."]
papers: 
  - title: "FlowRL: Matching Reward Distributions for LLM Reasoning"
    authors: ["Xuekai Zhu", "Daixuan Cheng", "Dinghuai Zhang", "Hengli Li", "Kaiyan Zhang", "Che Jiang", "Youbang Sun", "Ermo Hua", "Yuxin Zuo", "Xingtai Lv", "Qizheng Zhang", "Lin Chen", "Fanghao Shao", "Bo Xue", "Yunchong Song", "Zhenjie Yang", "Ganqu Cui", "Ning Ding", "Jianfeng Gao", "Xiaodong Liu", "Bowen Zhou", "Hongyuan Mei", "Zhouhan Lin"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2509.15207"
    pdf: "https://arxiv.org/pdf/2509.15207v3"
    code: "https://github.com/Xuekai-Zhu/FlowRL"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "More diverse, generalisable reasoning from RL"
  method: "Normalise rewards into a target distribution with a learnable partition function; minimise reverse KL (flow-balanced optimisation)"
  data: "Maths and code reasoning tasks"
  result: "+10.0% average over GRPO and +5.1% over PPO on maths; consistently better on code, per the abstract"
draft: false
date: "2025-09-19"
---

## Problem

PPO and GRPO **maximise reward**. According to the abstract, this tends to **over-optimise dominant reward signals** and neglect less frequent but valid reasoning paths, which reduces diversity.

## Method

**FlowRL** matches the **full reward distribution** instead:

1. turn scalar rewards into a **normalised target distribution** using a learnable **partition function**
2. minimise the **reverse KL divergence** between the policy and that target

Implemented as **flow-balanced optimisation**, this encourages diverse exploration.

## Key results

From the abstract: on maths benchmarks, an average improvement of **10.0% over GRPO** and **5.1% over PPO**, and consistently better results on code reasoning.

## Limitations

There's no dedicated limitations section in the extracted text. Results cover maths and code, where rewards are verifiable.
