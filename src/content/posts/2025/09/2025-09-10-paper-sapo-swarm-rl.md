---
title: "Paper summary: Sharing is Caring: Efficient LM Post-Training with Collective RL Experience Sharing"
categories: ["papers"]
tags: ["llm", "rl", "distributed-training"]
summary: "SAPO is a fully decentralised, asynchronous RL post-training method in which many heterogeneous nodes train their own models but share rollouts, reporting up to 94% higher cumulative reward in controlled tests."
sources: 
  - title: "Sharing is Caring: Efficient LM Post-Training with Collective RL Experience Sharing (arXiv:2509.08721)"
    url: "https://arxiv.org/abs/2509.08721"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:39.086Z"
  - title: "Hugging Face Daily Papers, 2025-09-10"
    url: "https://huggingface.co/papers?date=2025-09-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:07.924Z"
  - title: "Sharing is Caring: Efficient LM Post-Training with Collective RL Experience Sharing (arXiv HTML full text)"
    url: "https://arxiv.org/html/2509.08721"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:39.086Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/gensyn-ai/rl-swarm"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:48:39.086Z"
highlights: ["Nodes don't share weights or gradients, only rollouts, so \"aha moments\" found by one node can spread to others.", "No assumptions about latency, identical models or identical hardware are needed."]
papers: 
  - title: "Sharing is Caring: Efficient LM Post-Training with Collective RL Experience Sharing"
    authors: ["Jeffrey Amico", "Gabriel Passamani Andrade", "John Donaghy", "Ben Fielding", "Tristin Forbus", "Harry Grieve", "Semih Kara", "Jari Kolehmainen", "Yihua Lou", "Christopher Nies", "Edward Phillip Flores Nuño", "Diogo Ortega", "Shikhar Rastogi", "Austin Virts", "Matthew J. Wright"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2509.08721"
    pdf: "https://arxiv.org/pdf/2509.08721v1"
    code: "https://github.com/gensyn-ai/rl-swarm"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Scaling RL post-training without centralised infrastructure"
  method: "Swarm sAmpling Policy Optimization: decentralised nodes each train their own policy and share rollouts"
  data: "Controlled experiments plus an open demo with thousands of community nodes"
  result: "Cumulative reward gains up to 94% in controlled experiments, per the abstract"
draft: false
date: "2025-09-10"
---

## Problem

RL post-training (as in DeepSeek-R1-Zero) needs heavy parallel inference, which brings latency, memory and reliability problems, and growing cost.

## Method

**SAPO** is **fully decentralised and asynchronous**. Each node in a network of heterogeneous computers manages its own policy model(s) and **shares rollouts** with others. Nodes can also run alone. There are no explicit assumptions about latency, model homogeneity or hardware. By sampling rollouts shared across the network, insights ("aha moments") can **propagate** between nodes and bootstrap learning.

## Key results

From the abstract: cumulative reward gains of **up to 94%** in controlled experiments. The authors also report insights from an open-source demo run on **thousands of community nodes** with diverse hardware and models.

## Limitations

There's no dedicated limitations section in the extracted text. The large-scale run was a community demo, so it's less controlled than the main experiments.
