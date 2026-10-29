---
title: "Paper summary: Lumine: An Open Recipe for Building Generalist Agents in 3D Open Worlds"
categories: ["papers"]
tags: ["agents", "games", "vision-language"]
summary: "Lumine is an open recipe for a generalist game-playing agent built on a vision-language model: pixels in at 5 Hz, keyboard and mouse out at 30 Hz, completing a five-hour storyline and transferring zero-shot to other games."
sources: 
  - title: "Lumine: An Open Recipe for Building Generalist Agents in 3D Open Worlds (arXiv:2511.08892)"
    url: "https://arxiv.org/abs/2511.08892"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:34.917Z"
  - title: "Hugging Face Daily Papers, 2025-11-13"
    url: "https://huggingface.co/papers?date=2025-11-13"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:33:46.718Z"
  - title: "Lumine: An Open Recipe for Building Generalist Agents in 3D Open Worlds (arXiv HTML full text)"
    url: "https://arxiv.org/html/2511.08892"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:49:34.917Z"
highlights: ["The agent plays like a person: it sees raw pixels and presses keys, and only stops to reason when needed.", "Without fine-tuning, it completed long missions in two other games it had never been trained on."]
papers: 
  - title: "Lumine: An Open Recipe for Building Generalist Agents in 3D Open Worlds"
    authors: ["Weihao Tan", "Xiangyang Li", "Yunhao Fang", "Heyuan Yao", "Shi Yan", "Hao Luo", "Tenglong Ao", "Huihui Li", "Hongbin Ren", "Bairen Yi", "Yujia Qin", "Bo An", "Libin Liu", "Guang Shi"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2511.08892"
    pdf: "https://arxiv.org/pdf/2511.08892v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
card: 
  task: "Generalist agents for hours-long missions in 3D open worlds"
  method: "End-to-end VLM-powered agent; 5 Hz pixel perception, 30 Hz keyboard-mouse actions; adaptive reasoning"
  data: "Trained in Genshin Impact; tested zero-shot in Wuthering Waves and Honkai: Star Rail"
  result: "Completes the five-hour Mondstadt main storyline at human-level efficiency; zero-shot 100-minute and five-hour missions in other games, per the abstract"
draft: false
date: "2025-11-13"
---

## Problem

Agents that act in rich 3D worlds for hours, in real time, following natural-language instructions, are far beyond most benchmark agents, which work in short, simplified tasks.

## Method

**Lumine** is presented as the first **open recipe** for such agents. It uses a **human-like interaction loop** powered by a vision-language model:

- perceives **raw pixels at 5 Hz**
- outputs precise **keyboard and mouse actions at 30 Hz**
- invokes **reasoning only when needed**, to stay real-time

It's trained in **Genshin Impact**.

## Key results

From the abstract:

- completes the **entire five-hour Mondstadt main storyline** with human-level efficiency
- follows instructions across exploration, 2D GUI manipulation, collection, combat, puzzle-solving and NPC interaction
- **zero-shot** to other games: 100-minute missions in **Wuthering Waves** and the full five-hour first chapter of **Honkai: Star Rail**

## Limitations

There's no dedicated limitations section in the extracted text. The demonstrations are in a family of commercial games with similar interaction styles.
