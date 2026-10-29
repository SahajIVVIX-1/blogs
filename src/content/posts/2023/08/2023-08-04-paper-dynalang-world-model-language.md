---
title: "Paper summary: Learning to Model the World with Language"
categories: ["papers"]
tags: ["agents", "multimodal", "world-models"]
summary: "Dynalang treats language as a signal for predicting the future: an agent learns a multimodal world model and acts from imagined rollouts."
sources: 
  - title: "Learning to Model the World with Language (arXiv:2308.01399)"
    url: "https://arxiv.org/abs/2308.01399"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:21.016Z"
  - title: "Hugging Face Daily Papers, 2023-08-04"
    url: "https://huggingface.co/papers?date=2023-08-04"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:24:56.032Z"
  - title: "Learning to Model the World with Language (arXiv HTML full text)"
    url: "https://arxiv.org/html/2308.01399"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:37:21.016Z"
highlights: ["Instead of mapping instructions straight to actions, Dynalang uses all kinds of language to predict what it will see next.", "The same world model can be pretrained on text-only data."]
papers: 
  - title: "Learning to Model the World with Language"
    authors: ["Jessy Lin", "Yuqing Du", "Olivia Watkins", "Danijar Hafner", "Pieter Abbeel", "Dan Klein", "Anca Dragan"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2308.01399"
    pdf: "https://arxiv.org/pdf/2308.01399v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Language-conditioned agents that use diverse language (hints, rules, descriptions)"
  method: "Multimodal world model predicting future text and image representations; policy learned from imagined rollouts"
  data: "Four interactive environments, including game-playing and navigation in photorealistic home scans"
  result: "Learns to use descriptions, game rules and instructions where model-free language-conditioned baselines degrade"
draft: false
date: "2023-08-04"
---

## Problem

Most instruction-following agents learn a direct mapping from an instruction ("pick up the blue ball") to actions. Real language is much broader than commands: "this button turns on the TV", "I put the bowls away", feedback, game rules. Agents trained the direct way get *worse* as the language becomes more varied.

## Method

The paper's key idea is to treat language as one more signal for **predicting the future**. Dynalang learns a **multimodal world model** that, at each step, takes in an image and a text token and learns to predict future representations of both, plus rewards. The policy is trained on **imagined rollouts** inside that learned model, rather than only on real interaction. Because the world model is generative, it can also be **pretrained on text-only data** and can generate language grounded in the environment.

## Key results

According to the authors, Dynalang learns to use environment descriptions, game rules and instructions across four environments, from simple games to navigation in photorealistic home scans. It outperforms model-free baselines, which struggle as language becomes more diverse.

## Limitations

The paper doesn't have a dedicated limitations section in its HTML version. Its conclusion frames the work as one step toward multimodal agents. The environments are simulated, and the results are on the benchmarks the authors built or chose.
