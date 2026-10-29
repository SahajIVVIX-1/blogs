---
title: "Paper summary: SmolVLM: Redefining small and efficient multimodal models"
categories: ["papers"]
tags: ["multimodal", "small-models", "efficiency"]
summary: "SmolVLM is a family of compact vision-language models designed for on-device inference; the 256M model uses under 1GB of GPU memory and is reported to beat the 300× larger Idefics-80B."
sources: 
  - title: "SmolVLM: Redefining small and efficient multimodal models (arXiv:2504.05299)"
    url: "https://arxiv.org/abs/2504.05299"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:22.253Z"
  - title: "Hugging Face Daily Papers, 2025-04-08"
    url: "https://huggingface.co/papers?date=2025-04-08"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:08.662Z"
  - title: "SmolVLM: Redefining small and efficient multimodal models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2504.05299"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:22.253Z"
highlights: ["Small VLMs shouldn't just copy big ones: SmolVLM rethinks tokenisation and architecture for low memory.", "The 256M model runs in under 1GB of GPU memory."]
papers: 
  - title: "SmolVLM: Redefining small and efficient multimodal models"
    authors: ["Andrés Marafioti", "Orr Zohar", "Miquel Farré", "Merve Noyan", "Elie Bakouch", "Pedro Cuenca", "Cyril Zakka", "Loubna Ben Allal", "Anton Lozhkov", "Nouamane Tazi", "Vaibhav Srivastav", "Joshua Lochner", "Hugo Larcher", "Mathieu Morlon", "Lewis Tunstall", "Leandro von Werra", "Thomas Wolf"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2504.05299"
    pdf: "https://arxiv.org/pdf/2504.05299v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2504.05299.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2504.05299\">Marafioti et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Smol yet Mighty: comparison of SmolVLM with other state-of-the-art small VLM models. Image results are sourced from the OpenCompass OpenVLM leaderboard ( Duan et al., 2024 ) ."
images: 
  - src: "images/2025/paper-2504.05299.webp"
    alt: "Figure from the paper \"SmolVLM: Redefining small and efficient multimodal models\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2504.05299\">Marafioti et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Smol yet Mighty: comparison of SmolVLM with other state-of-the-art small VLM models. Image results are sourced from the OpenCompass OpenVLM leaderboard ( Duan et al., 2024 ) ."
card: 
  task: "Resource-efficient vision-language models for edge devices"
  method: "Systematic exploration of architecture, aggressive but efficient image tokenisation, curated training data"
  data: "Image and video benchmarks (OpenCompass leaderboard results in Figure 1)"
  result: "256M model <1GB memory, beats Idefics-80B; 2.2B rivals SOTA VLMs using twice the memory, per the abstract"
draft: false
date: "2025-04-08"
---

## Problem

Big VLMs need a lot of compute. Small VLMs often copy big models' design choices, especially **extensive image tokenisation**, which wastes memory and makes them impractical on devices.

## Method

The authors systematically explore **architecture configurations**, **tokenisation strategies** and **data curation** designed for low compute, and identify the design choices that give the biggest gains for image and video tasks at small sizes. Figure 1 compares SmolVLM with other small VLMs using OpenCompass leaderboard results.

## Key results

From the abstract:

- **SmolVLM-256M** uses **under 1GB** of GPU memory at inference and outperforms the **300× larger Idefics-80B**, released 18 months earlier
- the largest model, **2.2B**, rivals state-of-the-art VLMs that use twice the GPU memory
- the models also show robust **video** understanding

## Limitations

There's no dedicated limitations section in the extracted text. Figure 1's comparison uses OpenCompass leaderboard results, as the paper notes.
