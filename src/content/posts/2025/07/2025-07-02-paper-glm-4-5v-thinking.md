---
title: "Paper summary: GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning"
categories: ["papers"]
tags: ["multimodal", "reasoning", "rl"]
summary: "GLM-4.1V-Thinking and GLM-4.5V use a reasoning-centric training framework with Reinforcement Learning with Curriculum Sampling (RLCS); GLM-4.5V is reported to lead open models of its size on nearly all of 42 benchmarks."
sources: 
  - title: "GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning (arXiv:2507.01006)"
    url: "https://arxiv.org/abs/2507.01006"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:38.041Z"
  - title: "Hugging Face Daily Papers, 2025-07-02"
    url: "https://huggingface.co/papers?date=2025-07-02"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:00.528Z"
  - title: "GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning (arXiv HTML full text)"
    url: "https://arxiv.org/html/2507.01006"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:38.041Z"
highlights: ["A strong pre-trained vision foundation \"sets the upper bound\"; RL with curriculum sampling unlocks it.", "The authors note that RL improved task completion but didn't always improve reasoning quality."]
papers: 
  - title: "GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning"
    authors: ["GLM-V Team", ":", "Wenyi Hong", "Wenmeng Yu", "Xiaotao Gu", "Guo Wang", "Guobing Gan", "Haomiao Tang", "Jiale Cheng", "Ji Qi", "Junhui Ji", "Lihang Pan", "Shuaiqi Duan", "Weihan Wang", "Yan Wang", "Yean Cheng", "Zehai He", "Zhe Su", "Zhen Yang", "Ziyang Pan", "Aohan Zeng", "Baoxu Wang", "Bin Chen", "Boyan Shi", "Changyu Pang", "Chenhui Zhang", "Da Yin", "Fan Yang", "Guoqing Chen", "Haochen Li", "Jiale Zhu", "Jiali Chen", "Jiaxing Xu", "Jiazheng Xu", "Jing Chen", "Jinghao Lin", "Jinhao Chen", "Jinjiang Wang", "Junjie Chen", "Leqi Lei", "Letian Gong", "Leyi Pan", "Mingdao Liu", "Mingde Xu", "Mingzhi Zhang", "Qinkai Zheng", "Ruiliang Lyu", "Shangqin Tu", "Sheng Yang", "Shengbiao Meng", "Shi Zhong", "Shiyu Huang", "Shuyuan Zhao", "Siyan Xue", "Tianshu Zhang", "Tianwei Luo", "Tianxiang Hao", "Tianyu Tong", "Wei Jia", "Wenkai Li", "Xiao Liu", "Xiaohan Zhang", "Xin Lyu", "Xinyu Zhang", "Xinyue Fan", "Xuancheng Huang", "Yadong Xue", "Yanfeng Wang", "Yanling Wang", "Yanzi Wang", "Yifan An", "Yifan Du", "Yiheng Huang", "Yilin Niu", "Yiming Shi", "Yu Wang", "Yuan Wang", "Yuanchang Yue", "Yuchen Li", "Yusen Liu", "Yutao Zhang", "Yuting Wang", "Yuxuan Zhang", "Zhao Xue", "Zhengxiao Du", "Zhenyu Hou", "Zihan Wang", "Peng Zhang", "Debing Liu", "Bin Xu", "Juanzi Li", "Minlie Huang", "Yuxiao Dong", "Jie Tang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2507.01006"
    pdf: "https://arxiv.org/pdf/2507.01006v6"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2507.01006.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2507.01006\">Team et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : (A) GLM-4.5V achieves efficient scaling based on its compact predecessor, GLM-4.1V-9B-Thinking, and compares favorably with Gemini-2.5-Flash, according to benchmark assessments. Table 2 presents full …"
images: 
  - src: "images/2025/paper-2507.01006.webp"
    alt: "Figure from the paper \"GLM-4.5V and GLM-4.1V-Thinking: Towards Versatile Multimodal Reasoning with Scalable Reinforcement Learning\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2507.01006\">Team et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : (A) GLM-4.5V achieves efficient scaling based on its compact predecessor, GLM-4.1V-9B-Thinking, and compares favorably with Gemini-2.5-Flash, according to benchmark assessments. Table 2 presents full …"
card: 
  task: "General-purpose multimodal reasoning"
  method: "Large-scale vision foundation pre-training + Reinforcement Learning with Curriculum Sampling (RLCS)"
  data: "42 public benchmarks (STEM, video, grounding, GUI agents, long documents…)"
  result: "GLM-4.5V SOTA among open models of similar size on nearly all tasks; GLM-4.1V-9B-Thinking beats Qwen2.5-VL-72B on 29 benchmarks, per the abstract"
draft: false
date: "2025-07-02"
---

## Problem

How to train VLMs that **reason** across STEM, video, coding, grounding, GUI agents and long documents, not just describe images.

## Method

A **reasoning-centric training framework**:

1. large-scale pre-training of a capable **vision foundation model**, which the authors say "arguably sets the upper bound" for final performance
2. **Reinforcement Learning with Curriculum Sampling (RLCS)**, to unlock that potential across many task types

The models are a 9B dense model (GLM-4.1V-9B-Thinking) and a 106B-total / 12B-active MoE (GLM-4.5V). The report also mentions GLM-4.6V.

## Key results

From the abstract:

- across **42 public benchmarks**, GLM-4.5V is state of the art among open models of similar size on nearly all tasks, and competitive with or better than **Gemini-2.5-Flash** on coding and GUI agents
- the smaller **GLM-4.1V-9B-Thinking** beats the much larger **Qwen2.5-VL-72B** on **29** benchmarks

## Limitations

From the paper: RL raises task completion rates but **does not consistently improve reasoning quality**. In some cases, correct answers come with flawed reasoning.
