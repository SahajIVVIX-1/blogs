---
title: "Paper summary: Orca: The World is in Your Mind"
categories: ["papers"]
tags: ["world-models", "multimodal", "robotics"]
summary: "Orca learns one latent \"world state\" space from 125K hours of video and 160M event annotations via next-state prediction, and frozen, it supports text, image and robot-action readouts through small decoders."
sources: 
  - title: "Orca: The World is in Your Mind (arXiv:2606.30534)"
    url: "https://arxiv.org/abs/2606.30534"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:02.503Z"
  - title: "Hugging Face Daily Papers, 2026-07-01"
    url: "https://huggingface.co/papers?date=2026-07-01"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:05.985Z"
  - title: "Orca: The World is in Your Mind (arXiv HTML full text)"
    url: "https://arxiv.org/html/2606.30534"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:02.503Z"
highlights: ["The objective is next-state prediction: not next token, next frame or next action, but how the world's state changes.", "\"Unconscious\" learning from dense video transitions is paired with \"conscious\" learning from language-described events."]
papers: 
  - title: "Orca: The World is in Your Mind"
    authors: ["Yihao Wang", "Yuheng Ji", "Mingyu Cao", "Yanqing Shen", "Runze Xiao", "Huaihai Lyu", "Senwei Xie", "Euan Liu", "Klara Tian", "Tianfeng Long", "Yichi Zhang", "Zhengliang Cai", "Ruike Chen", "Jifan Zhao", "Ruochuan Shi", "Zihan Tang", "Jing Lyu", "Wenxing Tan", "Ningbo Zhang", "Yangtao Hu", "Yuming Gao", "Xiansheng Chen", "Junkai Zhao", "Congsheng Xu", "Boan Zhu", "Ziqi Wang", "Yupu Feng", "Qiongqiong Zhang", "Yingli Zhao", "Yulong Ao", "Shaoxuan Xie", "You Liu", "Guocai Yao", "Leiduo Zhang", "Xiaodan Liu", "Yunyan Zhang", "Yance Jiao", "Xinyan Yang", "Jiaxing Wei", "Xu Liu", "Tengfei Pan", "Shaokai Nie", "Chunlei Men", "Sen Cui", "Xiaojie Jin", "Hongyang Li", "Jianlan Luo", "Yao Mu", "Yunchao Wei", "Jun Yan", "Hang Zhao", "Xiaolong Zheng", "Jiaming Li", "Yonghua Lin", "Tiejun Huang", "Zhongyuan Wang", "Pengwei Wang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2606.30534"
    pdf: "https://arxiv.org/pdf/2606.30534v3"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "A general world foundation model"
  method: "Unified world latent via Next-State-Prediction; unconscious (continuous video) + conscious (language events, VQA) learning; frozen backbone with lightweight modality decoders"
  data: "125K hours of video, 160M event annotations"
  result: "Stronger world latent gives stronger readouts; outperforms similar-sized specialised baselines, per the abstract"
draft: false
date: "2026-07-01"
---

## Problem

Models usually learn one kind of prediction: next token, next frame or next action. The authors want one model of **how the world changes**, usable for understanding, prediction and action.

## Method

**Orca** learns a **unified world latent space** through **Next-State-Prediction**, with two kinds of learning:

- **"unconscious" learning**: dense, natural state transitions from continuous **video**
- **"conscious" learning**: sparse, meaningful transitions described by **language events** and VQA

Pre-training data: **125K hours** of video and **160M** event annotations. After pre-training, the backbone is **frozen**, and only small modality-specific decoders are trained for three readouts: **text**, **image prediction** and **embodied action**.

## Key results

From the abstract: the approach scales, a **stronger world latent gives stronger downstream readouts**, and Orca outperforms similar-sized specialised baselines.

## Limitations

There's no dedicated limitations section in the extracted text. The authors call it an "initial instantiation" of a general world model.
