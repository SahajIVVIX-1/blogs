---
title: "Paper summary: SOLAR 10.7B: Scaling Large Language Models with Simple yet Effective Depth Up-Scaling"
categories: ["papers"]
tags: ["llm", "scaling"]
summary: "SOLAR 10.7B grows a smaller LLM by duplicating its layer stack, trimming the overlap and continuing pre-training (\"depth up-scaling\"), a simpler route than mixture-of-experts."
sources: 
  - title: "SOLAR 10.7B: Scaling Large Language Models with Simple yet Effective Depth Up-Scaling (arXiv:2312.15166)"
    url: "https://arxiv.org/abs/2312.15166"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:23.727Z"
  - title: "Hugging Face Daily Papers, 2023-12-27"
    url: "https://huggingface.co/papers?date=2023-12-27"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:26:23.919Z"
  - title: "SOLAR 10.7B: Scaling Large Language Models with Simple yet Effective Depth Up-Scaling (arXiv HTML full text)"
    url: "https://arxiv.org/html/2312.15166"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:39:23.727Z"
highlights: ["Depth up-scaling copies the base model, removes some layers from the two copies' ends, stacks them, and continues pre-training.", "The instruction-tuned variant is reported to surpass Mixtral-8x7B-Instruct."]
papers: 
  - title: "SOLAR 10.7B: Scaling Large Language Models with Simple yet Effective Depth Up-Scaling"
    authors: ["Dahyun Kim", "Chanjun Park", "Sanghoon Kim", "Wonsung Lee", "Wonho Song", "Yunsu Kim", "Hyeonwoo Kim", "Yungi Kim", "Hyeonju Lee", "Jihoo Kim", "Changbae Ahn", "Seonghoon Yang", "Sukyung Lee", "Hyunbyung Park", "Gyoungjin Gim", "Mikyoung Cha", "Hwalsuk Lee", "Sunghun Kim"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2312.15166"
    pdf: "https://arxiv.org/pdf/2312.15166v3"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2023/paper-2312.15166.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2312.15166\">Kim et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Depth up-scaling for the case with [math] and [math] . Depth up-scaling is achieved through a dual-stage process of depthwise scaling followed by continued pretraining."
images: 
  - src: "images/2023/paper-2312.15166.webp"
    alt: "Figure from the paper \"SOLAR 10.7B: Scaling Large Language Models with Simple yet Effective Depth Up-Scaling\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2312.15166\">Kim et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Depth up-scaling for the case with [math] and [math] . Depth up-scaling is achieved through a dual-stage process of depthwise scaling followed by continued pretraining."
card: 
  task: "Building a stronger LLM from a smaller one"
  method: "Depth up-scaling (DUS): depthwise scaling of a base model followed by continued pre-training"
  data: "Base model plus continued pre-training; instruction and alignment tuning for the Instruct variant"
  result: "10.7B model; SOLAR 10.7B-Instruct reported to surpass Mixtral-8x7B-Instruct; Apache 2.0"
draft: false
date: "2023-12-27"
---

## Problem

Scaling a model up usually means training a bigger one from scratch. Mixture-of-experts up-scaling reuses weights but complicates training and inference. Is there a simpler way?

## Method

**Depth up-scaling (DUS)**, shown in the paper's Figure 1, works in two stages:

1. **Depthwise scaling**: take the base model, make a copy, remove some layers from the end of one copy and the start of the other, and stack them into one deeper network.
2. **Continued pre-training**, to recover and improve the performance that drops right after stacking.

No new architecture components are needed.

## Key results

The authors present **SOLAR 10.7B**, which shows strong performance across NLP tasks, and **SOLAR 10.7B-Instruct**, which they report surpasses **Mixtral-8x7B-Instruct**. Both are released under Apache 2.0.

## Limitations

From the paper:

- the number of removed layers was chosen mainly because of hardware limits, not shown to be optimal
- continued pre-training is costly, so hyperparameters weren't explored thoroughly
- training and inference demands may limit who can use the model
- like other models, it can reflect biases in its training data
