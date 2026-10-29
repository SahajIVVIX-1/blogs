---
title: "Paper summary: Qwen-AgentWorld: Language World Models for General Agents"
categories: ["papers"]
tags: ["agents", "world-models", "llm"]
summary: "Qwen-AgentWorld models are language world models that predict how agent environments respond across 7 domains, trained on 10M+ real interaction trajectories, and are reported to outperform frontier models at simulation on a new benchmark."
sources: 
  - title: "Qwen-AgentWorld: Language World Models for General Agents (arXiv:2606.24597)"
    url: "https://arxiv.org/abs/2606.24597"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:56.245Z"
  - title: "Hugging Face Daily Papers, 2026-06-24"
    url: "https://huggingface.co/papers?date=2026-06-24"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:01.757Z"
  - title: "Qwen-AgentWorld: Language World Models for General Agents (arXiv HTML full text)"
    url: "https://arxiv.org/html/2606.24597"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:56.245Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/QwenLM/Qwen-AgentWorld"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:52:56.245Z"
highlights: ["A language world model predicts the next state of an environment (tool output, page change) given an action, so agents can be trained or plan against a simulator.", "Training runs in three stages: continued pre-training, SFT for next-state reasoning, then RL with rubric and rule rewards."]
papers: 
  - title: "Qwen-AgentWorld: Language World Models for General Agents"
    authors: ["Yuxin Zuo", "Zikai Xiao", "Li Sheng", "Fei Huang", "Jianhong Tu", "Yuxuan Liu", "Tianyi Tang", "Xiaomeng Hu", "Yang Su", "Qingfeng Lan", "Yantao Liu", "Qin Zhu", "Yinger Zhang", "Bowen Yu", "Haiquan Zhao", "Haiyang Xu", "Jianxin Yang", "Jiayang Cheng", "Junyang Wang", "Lianghao Deng", "Mingfeng Xue", "Tianyi Bai", "Yang Fan", "Yubo Ma", "Yucheng Li", "Zeyu Cui", "Zhihai Wang", "Zhihui Xie", "Zhuorui Ye", "An Yang", "Dayiheng Liu", "Jingren Zhou", "Ning Ding"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2606.24597"
    pdf: "https://arxiv.org/pdf/2606.24597v1"
    code: "https://github.com/QwenLM/Qwen-AgentWorld"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Simulating agentic environments with language models"
  method: "Qwen-AgentWorld-35B-A3B and 397B-A17B; CPT → SFT → RL with hybrid rubric-and-rule rewards; long chain-of-thought simulation"
  data: "10M+ real interaction trajectories in 7 domains; AgentWorldBench (from 5 frontier models on 9 benchmarks)"
  result: "Significantly outperforms existing frontier models on AgentWorldBench, per the abstract"
draft: false
date: "2026-06-24"
---

## Problem

A **world model** predicts how an environment responds to actions. That's central to planning, and useful for training agents without the cost and risk of real environments. Can language models be good world models for **agent environments** (tools, web, software)?

## Method

**Qwen-AgentWorld-35B-A3B** and **397B-A17B** simulate agent environments across **7 domains** using long chain-of-thought reasoning. Training on **10M+ real interaction trajectories**:

1. **continued pre-training** on state-transition dynamics plus professional corpora
2. **SFT** to activate next-state-prediction reasoning
3. **RL** with hybrid rubric-and-rule rewards for simulation fidelity

**AgentWorldBench** evaluates simulators using real interactions of 5 frontier models on 9 established benchmarks.

## Key results

From the abstract: Qwen-AgentWorld **significantly outperforms existing frontier models** on simulation. The paper also studies two ways world models help agents, for example as a decoupled environment simulator.

## Limitations

There's no dedicated limitations section in the extracted text. A simulator is only as good as its fidelity, which is why the benchmark compares against real interactions.
