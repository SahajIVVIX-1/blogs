---
title: "Paper summary: MolmoAct2: Action Reasoning Models for Real-world Deployment"
categories: ["papers"]
tags: ["robotics", "vision-language-action", "open-source"]
summary: "MolmoAct2 is a fully open action-reasoning model for practical robot deployment, with a new embodied-reasoning VLM backbone, open datasets including 720 hours of bimanual teleoperation, an open action tokenizer, and a lower-latency reasoning variant."
sources: 
  - title: "MolmoAct2: Action Reasoning Models for Real-world Deployment (arXiv:2605.02881)"
    url: "https://arxiv.org/abs/2605.02881"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:12.627Z"
  - title: "Hugging Face Daily Papers, 2026-05-05"
    url: "https://huggingface.co/papers?date=2026-05-05"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:31.546Z"
  - title: "MolmoAct2: Action Reasoning Models for Real-world Deployment (arXiv HTML full text)"
    url: "https://arxiv.org/html/2605.02881"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:12.627Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/allenai/molmoact2"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:52:12.627Z"
highlights: ["It's open across the stack: backbone, datasets, action tokenizer and model.", "MolmoThink re-predicts depth tokens only for scene regions that change, which keeps geometric grounding at much lower latency."]
papers: 
  - title: "MolmoAct2: Action Reasoning Models for Real-world Deployment"
    authors: ["Haoquan Fang", "Jiafei Duan", "Donovan Clay", "Sam Wang", "Shuo Liu", "Weikai Huang", "Xiang Fan", "Wei-Chuan Tsai", "Shirui Chen", "Yi Ru Wang", "Shanli Xing", "Jaemin Cho", "Jae Sung Park", "Ainaz Eftekhar", "Peter Sushko", "Karen Farley", "Angad Wadhwa", "Cole Harrison", "Winson Han", "Ying-Chun Lee", "Eli VanderBilt", "Rose Hendrix", "Suveen Ellawela", "Lucas Ngoo", "Joyce Chai", "Zhongzheng Ren", "Ali Farhadi", "Dieter Fox", "Ranjay Krishna"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2605.02881"
    pdf: "https://arxiv.org/pdf/2605.02881v2"
    code: "https://github.com/allenai/molmoact2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Deployable, open vision-language-action robot control"
  method: "MolmoER backbone (3.3M samples, specialise-then-rehearse); flow-matching action expert grafted via per-layer KV-cache conditioning; OpenFAST tokenizer; MolmoThink adaptive-depth reasoning"
  data: "MolmoAct2-BimanualYAM (720 h), filtered DROID and SO100/101 subsets"
  result: "Advances over its predecessor along five axes for practical deployment, per the abstract"
draft: false
date: "2026-05-05"
---

## Problem

According to the abstract, VLA models fall short for real deployment: frontier models are closed, open ones need expensive hardware, reasoning-augmented policies are too slow, and fine-tuned success rates aren't dependable.

## Method

Five advances over the first MolmoAct, from the Allen Institute (whose Molmo VLM is summarised here in Sept 2024):

1. **MolmoER**: a VLM backbone specialised for spatial and embodied reasoning, trained on **3.3M** samples with a specialise-then-rehearse recipe.
2. **Three new datasets** for low-to-medium-cost robots, including **MolmoAct2-BimanualYAM** (**720 hours** of bimanual teleoperation, described as the largest open bimanual dataset) and filtered DROID and SO100/101 subsets.
3. **OpenFAST**: an open action tokenizer trained on millions of trajectories across five embodiments.
4. A **flow-matching continuous-action expert** grafted onto a discrete-token VLM through per-layer KV-cache conditioning.
5. **MolmoThink**: adaptive-depth reasoning that re-predicts depth tokens only where the scene changes.

## Key results

The abstract describes the most extensive empirical evaluation in the series. The detailed numbers are in the paper.

## Limitations

From the paper: actions are predicted in **fixed-horizon chunks** (e.g. 30 steps at 30 Hz) and executed open-loop. Smoothness across chunk boundaries isn't enforced, so velocity or acceleration jumps can appear at the seams.
