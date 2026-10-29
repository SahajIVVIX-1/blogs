---
title: "Paper summary: Gamma-World: Generative Multi-Agent World Modeling Beyond Two Players"
categories: ["papers"]
tags: ["world-models", "video", "multi-agent"]
summary: "Gamma-World is a generative world model for interactive video with many simultaneously controlled agents, using a parameter-free simplex rotary agent encoding and hub-token attention, distilled for real-time 24 FPS generation."
sources: 
  - title: "Gamma-World: Generative Multi-Agent World Modeling Beyond Two Players (arXiv:2605.28816)"
    url: "https://arxiv.org/abs/2605.28816"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:31.462Z"
  - title: "Hugging Face Daily Papers, 2026-05-28"
    url: "https://huggingface.co/papers?date=2026-05-28"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:45.456Z"
  - title: "Gamma-World: Generative Multi-Agent World Modeling Beyond Two Players (arXiv HTML full text)"
    url: "https://arxiv.org/html/2605.28816"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:31.462Z"
highlights: ["Each agent gets a distinct rotary phase as a vertex of a regular simplex, so identities are distinct but interchangeable, with no learned per-slot IDs.", "Hub tokens mediate interaction between agents, making cross-agent attention linear rather than quadratic in the number of agents."]
papers: 
  - title: "Gamma-World: Generative Multi-Agent World Modeling Beyond Two Players"
    authors: ["Fangfu Liu", "Kai He", "Tianchang Shen", "Tianshi Cao", "Sanja Fidler", "Yueqi Duan", "Jun Gao", "Igor Gilitschenski", "Zian Wang", "Xuanchi Ren"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2605.28816"
    pdf: "https://arxiv.org/pdf/2605.28816v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2605.28816.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2605.28816\">Liu et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : We propose [math] -World, a novel generative multi-agent world model from virtual games to real-world environments. More results and video demos are available on our project page ."
images: 
  - src: "images/2026/paper-2605.28816.webp"
    alt: "Figure from the paper \"Gamma-World: Generative Multi-Agent World Modeling Beyond Two Players\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2605.28816\">Liu et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : We propose [math] -World, a novel generative multi-agent world model from virtual games to real-world environments. More results and video demos are available on our project page ."
card: 
  task: "Interactive video world models with multiple agents"
  method: "Simplex Rotary Agent Encoding (extension of 3D RoPE); Sparse Hub Attention; distillation of a full-context diffusion teacher into a causal student"
  data: "Multiplayer virtual environments and real-world settings"
  result: "Action-responsive generation at 24 FPS, per the abstract"
draft: false
date: "2026-05-28"
---

## Problem

Interactive "world models" that generate video in response to controls have mostly handled **one agent**. Many settings (multiplayer games, robot teams) need several agents acting at once in a shared space, each independently controllable, with no fixed order among them.

## Method

- **Simplex Rotary Agent Encoding**: a parameter-free extension of 3D RoPE (positional encodings are covered in my Oct 2025 study post) that places agents at the vertices of a **regular simplex** in rotary-angle space. Every agent gets a distinct phase, but all are **permutation-equivalent**.
- **Sparse Hub Attention**: learnable hub tokens mediate interaction across agents, reducing cross-agent attention from quadratic to **linear** in the number of agents.
- **Real-time rollout**: distil a full-context diffusion teacher into a **causal student** that generates time blocks sequentially with KV caching, at **24 FPS**.

## Key results

The abstract reports experiments in multiplayer virtual environments and real-world settings, with action-responsive real-time generation.

## Limitations

There's no dedicated limitations section in the extracted text. More results are on the project page referenced in Figure 1.
