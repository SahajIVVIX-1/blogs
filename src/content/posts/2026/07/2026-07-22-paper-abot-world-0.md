---
title: "Paper summary: ABot-World-0: Infinite Interactive World Rollout on a Single Desktop GPU"
categories: ["papers"]
tags: ["world-models", "video", "real-time"]
summary: "ABot-World-0 is an action-conditioned video world model for long, closed-loop interaction that streams 720p at up to 16 FPS on a single RTX 5090, with LongForcing to limit drift over long rollouts."
sources: 
  - title: "ABot-World-0: Infinite Interactive World Rollout on a Single Desktop GPU (arXiv:2607.19191)"
    url: "https://arxiv.org/abs/2607.19191"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:21.173Z"
  - title: "Hugging Face Daily Papers, 2026-07-22"
    url: "https://huggingface.co/papers?date=2026-07-22"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:18.718Z"
  - title: "ABot-World-0: Infinite Interactive World Rollout on a Single Desktop GPU (arXiv HTML full text)"
    url: "https://arxiv.org/html/2607.19191"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:21.173Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/amap-cvlab/ABot-World"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:53:21.173Z"
highlights: ["Raw keyboard actions are the control interface, for both roaming a scene and controlling a third-person character.", "LongForcing aligns the student's long self-rollouts with an extended-horizon teacher, reducing accumulated drift."]
papers: 
  - title: "ABot-World-0: Infinite Interactive World Rollout on a Single Desktop GPU"
    authors: ["Fan Jiang", "Zhaoxu Sun", "Mengchao Wang", "Ziyu Zhu", "Chiyu Wang", "Yunpeng Zhang", "Wenlin Liu", "Yun Wang", "Xue Zheng", "Rui Sun", "Junfeng Ni", "Hongyu Pan", "Zhongxu Sun", "Fei Yu", "Zengye Ge", "Mengmeng Du", "Nianfei Fan", "Mingchao Sun", "Yu Liu", "Yongchang", "Yanqing Zhu", "Jiahang Wang", "Ning Ying", "Yuze Xuan", "Di Yang", "Zhicheng Liu", "Zhe Gao", "Tingbing Xu", "Jiacheng Sui", "Wenjin Yang", "Junnan Lai", "Shufeng Liu", "Yuan Liu", "Zheng Zhou", "Yingliang Peng", "Dawei Cao", "Kaifeng Sheng", "Yuxiang Cai", "Fei Lu", "Mu Xu", "Ning Guo"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2607.19191"
    pdf: "https://arxiv.org/pdf/2607.19191v1"
    code: "https://github.com/amap-cvlab/ABot-World"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Real-time, long-horizon interactive world simulation"
  method: "Multi-source data (AAA games, simulators, internet video); teacher→causal-student distillation (teacher forcing, ODE distillation); LongForcing; reference-character memory; low-bit streaming inference"
  data: "WorldRoamBench and extended interactive rollouts"
  result: "720p at up to 16 FPS on one RTX 5090; 1.2 s action-to-first-frame; ~19 GiB peak VRAM, per the abstract"
draft: false
date: "2026-07-22"
---

## Problem

Interactive world models must respond to actions in real time over long sessions. Autoregressive video drifts as errors pile up, and most such models need big GPU clusters.

## Method

- **Data**: AAA games, simulation engines and internet videos. An agent ("WorldExplorer") collects data guided by training feedback, and a pipeline applies **14 deterministic quality checks**, VLM assessment, and synchronised action and text annotation.
- **Distillation**: a bidirectional action-conditioned teacher is progressively distilled into a **causal student** (teacher forcing, ODE distillation).
- **LongForcing** aligns long student self-rollouts with an extended-horizon teacher, reducing autoregressive drift.
- **Controls**: raw keyboard actions, plus **reference-character memory** for consistent identity.
- **Deployment**: lightweight VAE decoder, efficient attention, memory-aware scheduling, **low-bit DiT** inference.

## Key results

From the abstract: on a single **RTX 5090**, it streams **720p** at up to **16 FPS**, with **1.2 s** action-to-first-frame latency and about **19 GiB** peak VRAM, and shows competitive controllability on WorldRoamBench and extended rollouts.

## Limitations

There's no dedicated limitations section in the extracted text. The numbers are for optimised low-bit configurations.
