---
title: "Paper summary: Merlin:Empowering Multimodal LLMs with Foresight Minds"
categories: ["papers"]
tags: ["cv", "multimodal", "llm"]
summary: "Merlin trains a multimodal LLM to predict object trajectories and then reason about future events, using two stages called Foresight Pre-Training and Foresight Instruction-Tuning."
sources: 
  - title: "Merlin:Empowering Multimodal LLMs with Foresight Minds (arXiv:2312.00589)"
    url: "https://arxiv.org/abs/2312.00589"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:58.629Z"
  - title: "Hugging Face Daily Papers, 2023-12-03"
    url: "https://huggingface.co/papers?date=2023-12-03"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:09.213Z"
  - title: "Merlin:Empowering Multimodal LLMs with Foresight Minds (arXiv HTML full text)"
    url: "https://arxiv.org/html/2312.00589"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:58.629Z"
highlights: ["Trajectories of objects across frames give a structured target for teaching an MLLM \"what happens next\".", "The model first predicts trajectories, then reasons about future events from them."]
papers: 
  - title: "Merlin:Empowering Multimodal LLMs with Foresight Minds"
    authors: ["En Yu", "Liang Zhao", "Yana Wei", "Jinrong Yang", "Dongming Wu", "Lingyu Kong", "Haoran Wei", "Tiancai Wang", "Zheng Ge", "Xiangyu Zhang", "Wenbing Tao"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2312.00589"
    pdf: "https://arxiv.org/pdf/2312.00589v2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Future reasoning ('foresight') in multimodal LLMs"
  method: "Foresight Pre-Training (trajectory-centred tasks) + Foresight Instruction-Tuning (predict trajectories, then reason about future events)"
  data: "Trajectory-annotated frame sequences and vision-language tasks"
  result: "Strong future-reasoning ability while staying competitive on standard vision-language tasks, per the authors"
draft: false
date: "2023-12-03"
---

## Problem

People can anticipate what's likely to happen next from what they see. The authors call this "foresight minds". Multimodal LLMs mostly describe the present, which limits how well they understand how things work and what the subjects in a scene intend.

## Method

The key choice is the **subject trajectory**, a structured representation of where objects move across consecutive frames, used as a learning target. Two training stages are modelled on how LLMs are trained:

1. **Foresight Pre-Training (FPT)**: jointly train on trajectory-centred tasks, so the model learns to attend to and predict whole trajectories from an initial observation.
2. **Foresight Instruction-Tuning (FIT)**: the model first predicts the trajectories of relevant objects, then reasons about possible future events based on them.

The result is a unified MLLM called **Merlin** that can output spatial coordinates or tracklets from single images or multiple frames.

## Key results

According to the paper, Merlin does well on traditional vision-language tasks and shows strong future-reasoning ability.

## Limitations

The extracted limitations section mainly restates the contribution. Its point is that trajectory is a useful learning objective for dynamic information. The approach depends on trajectory annotations.
