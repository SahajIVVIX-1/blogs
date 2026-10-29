---
title: "Paper summary: SFT Memorizes, RL Generalizes: A Comparative Study of Foundation Model Post-training"
categories: ["papers"]
tags: ["llm", "post-training", "rl"]
summary: "On a card-arithmetic game and a real-world navigation task, models post-trained with RL generalise to unseen rule and visual variants, while SFT tends to memorise the training data."
sources: 
  - title: "SFT Memorizes, RL Generalizes: A Comparative Study of Foundation Model Post-training (arXiv:2501.17161)"
    url: "https://arxiv.org/abs/2501.17161"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:16.694Z"
  - title: "Hugging Face Daily Papers, 2025-01-29"
    url: "https://huggingface.co/papers?date=2025-01-29"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:26.726Z"
  - title: "SFT Memorizes, RL Generalizes: A Comparative Study of Foundation Model Post-training (arXiv HTML full text)"
    url: "https://arxiv.org/html/2501.17161"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:16.694Z"
highlights: ["With an outcome-based reward, RL generalised to new rules and new visuals; SFT mostly didn't.", "SFT was still useful: it helped stabilise the output format before RL."]
papers: 
  - title: "SFT Memorizes, RL Generalizes: A Comparative Study of Foundation Model Post-training"
    authors: ["Tianzhe Chu", "Yuexiang Zhai", "Jihan Yang", "Shengbang Tong", "Saining Xie", "Dale Schuurmans", "Quoc V. Le", "Sergey Levine", "Yi Ma"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2501.17161"
    pdf: "https://arxiv.org/pdf/2501.17161v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2501.17161.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2501.17161\">Chu et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: A comparative study of RL and SFT on the visual navigation environment V-IRL ( Yang et al., 2024a ) for OOD generalization. OOD curves represent performance on the same task, using a different textual action …"
images: 
  - src: "images/2025/paper-2501.17161.webp"
    alt: "Figure from the paper \"SFT Memorizes, RL Generalizes: A Comparative Study of Foundation Model Post-training\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2501.17161\">Chu et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: A comparative study of RL and SFT on the visual navigation environment V-IRL ( Yang et al., 2024a ) for OOD generalization. OOD curves represent performance on the same task, using a different textual action …"
card: 
  task: "Comparing SFT and RL for generalisation"
  method: "Controlled post-training comparison on textual rule variants and visual variants"
  data: "GeneralPoints (arithmetic card game) and V-IRL (real-world navigation)"
  result: "RL generalises across rule-based and visual variants; SFT memorises, per the abstract"
draft: false
date: "2025-01-29"
---

## Problem

Supervised fine-tuning (SFT) and reinforcement learning (RL) are both standard post-training steps, but it's unclear how each affects **generalisation** versus **memorisation**.

## Method

Two test beds with controlled variations:

- **GeneralPoints**: an arithmetic reasoning card game, with variants in the rules (text) and in how the cards look (visual)
- **V-IRL**: a real-world navigation environment

Models trained with SFT or RL are evaluated on **unseen variants**, out of distribution.

## Key results

From the abstract and Figure 1:

- **RL**, especially with an **outcome-based reward**, generalises across both rule-based textual and visual variants
- **SFT** tends to **memorise** training data and struggles out of distribution
- RL also improves the model's underlying **visual recognition**
- SFT still helps, by stabilising the output format so that later RL can work

## Limitations

From the paper: two challenges were unresolved. One is that SFT failed to reach in-distribution performance comparable to RL on the visual-language GeneralPoints variant, even after extra hyperparameter tuning to rule out variance.
