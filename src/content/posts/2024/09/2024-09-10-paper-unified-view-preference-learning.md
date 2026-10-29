---
title: "Paper summary: Towards a Unified View of Preference Learning for Large Language Models: A Survey"
categories: ["papers"]
tags: ["llm", "alignment", "survey"]
summary: "A survey that breaks every LLM preference-alignment method into four components, model, data, feedback and algorithm, to show how RLHF, DPO and their relatives connect."
sources: 
  - title: "Towards a Unified View of Preference Learning for Large Language Models: A Survey (arXiv:2409.02795)"
    url: "https://arxiv.org/abs/2409.02795"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:12.226Z"
  - title: "Hugging Face Daily Papers, 2024-09-10"
    url: "https://huggingface.co/papers?date=2024-09-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:29:01.017Z"
  - title: "Towards a Unified View of Preference Learning for Large Language Models: A Survey (arXiv HTML full text)"
    url: "https://arxiv.org/html/2409.02795"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:43:12.226Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/kbsdjames/awesome-llm-preference-learning"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:43:12.226Z"
highlights: ["Model, data, feedback, algorithm: four components that every preference-learning method combines differently.", "Seeing methods as combinations makes it easier to spot unexplored ones."]
papers: 
  - title: "Towards a Unified View of Preference Learning for Large Language Models: A Survey"
    authors: ["Bofei Gao", "Feifan Song", "Yibo Miao", "Zefan Cai", "Zhe Yang", "Liang Chen", "Helan Hu", "Runxin Xu", "Qingxiu Dong", "Ce Zheng", "Shanghaoran Quan", "Wen Xiao", "Ge Zhang", "Daoguang Zan", "Keming Lu", "Bowen Yu", "Dayiheng Liu", "Zeyu Cui", "Jian Yang", "Lei Sha", "Houfeng Wang", "Zhifang Sui", "Peiyi Wang", "Tianyu Liu", "Baobao Chang"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2409.02795"
    pdf: "https://arxiv.org/pdf/2409.02795v5"
    code: "https://github.com/kbsdjames/awesome-llm-preference-learning"
    license: "http://creativecommons.org/publicdomain/zero/1.0/"
cover: "images/2024/paper-2409.02795.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2409.02795\">Gao et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/publicdomain/zero/1.0/\">CC0 1.0</a>. Figure 1 : A unified view and an illustrative example of preference learning for LLMs."
images: 
  - src: "images/2024/paper-2409.02795.webp"
    alt: "Figure from the paper \"Towards a Unified View of Preference Learning for Large Language Models: A Survey\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2409.02795\">Gao et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/publicdomain/zero/1.0/\">CC0 1.0</a>. Figure 1 : A unified view and an illustrative example of preference learning for LLMs."
card: 
  task: "Organising the preference-learning (alignment) literature"
  method: "Unified framework decomposing strategies into model, data, feedback and algorithm"
  data: "Survey of existing alignment methods"
  result: "A unified view connecting alignment strategies"
draft: false
date: "2024-09-10"
---

## Problem

Aligning LLM outputs with human preferences is key to their usefulness, and research on it spans many areas. The relationships between methods (RLHF, DPO and many variants) are under-explored, which makes the field hard to navigate.

## Method

The survey decomposes every preference-learning strategy into **four components**:

1. **Model**: the policy being trained
2. **Data**: the preference data and how it's collected (the survey distinguishes on-policy and off-policy collection)
3. **Feedback**: how preference signals or rewards are obtained
4. **Algorithm**: how the model is updated from that feedback

The paper's Figure 1 shows this unified view with an example.

## Key results

The contribution is the framework, which links existing algorithms and points to new combinations. A companion reading list is maintained on GitHub.

## Limitations

As a survey, it reflects the literature up to its writing in late 2024. The four-component split is a lens for comparing methods, not a performance result.
