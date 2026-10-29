---
title: "Paper summary: InternVL3.5: Advancing Open-Source Multimodal Models in Versatility, Reasoning, and Efficiency"
categories: ["papers"]
tags: ["multimodal", "reasoning", "efficiency"]
summary: "InternVL3.5 adds Cascade RL (offline then online RL), a Visual Resolution Router and decoupled vision/language deployment, reporting up to +16% reasoning and 4.05× faster inference than InternVL3."
sources: 
  - title: "InternVL3.5: Advancing Open-Source Multimodal Models in Versatility, Reasoning, and Efficiency (arXiv:2508.18265)"
    url: "https://arxiv.org/abs/2508.18265"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:27.982Z"
  - title: "Hugging Face Daily Papers, 2025-08-26"
    url: "https://huggingface.co/papers?date=2025-08-26"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:32:58.866Z"
  - title: "InternVL3.5: Advancing Open-Source Multimodal Models in Versatility, Reasoning, and Efficiency (arXiv HTML full text)"
    url: "https://arxiv.org/html/2508.18265"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:48:27.982Z"
highlights: ["Cascade RL runs offline RL first for stable convergence, then online RL for refinement.", "The Visual Resolution Router lowers the resolution of visual tokens where it doesn't hurt, for faster inference."]
papers: 
  - title: "InternVL3.5: Advancing Open-Source Multimodal Models in Versatility, Reasoning, and Efficiency"
    authors: ["Weiyun Wang", "Zhangwei Gao", "Lixin Gu", "Hengjun Pu", "Long Cui", "Xingguang Wei", "Zhaoyang Liu", "Linglin Jing", "Shenglong Ye", "Jie Shao", "Zhaokai Wang", "Zhe Chen", "Hongjie Zhang", "Ganlin Yang", "Haomin Wang", "Qi Wei", "Jinhui Yin", "Wenhao Li", "Erfei Cui", "Guanzhou Chen", "Zichen Ding", "Changyao Tian", "Zhenyu Wu", "Jingjing Xie", "Zehao Li", "Bowen Yang", "Yuchen Duan", "Xuehui Wang", "Zhi Hou", "Haoran Hao", "Tianyi Zhang", "Songze Li", "Xiangyu Zhao", "Haodong Duan", "Nianchen Deng", "Bin Fu", "Yinan He", "Yi Wang", "Conghui He", "Botian Shi", "Junjun He", "Yingtong Xiong", "Han Lv", "Lijun Wu", "Wenqi Shao", "Kaipeng Zhang", "Huipeng Deng", "Biqing Qi", "Jiaye Ge", "Qipeng Guo", "Wenwei Zhang", "Songyang Zhang", "Maosong Cao", "Junyao Lin", "Kexian Tang", "Jianfei Gao", "Haian Huang", "Yuzhe Gu", "Chengqi Lyu", "Huanze Tang", "Rui Wang", "Haijun Lv", "Wanli Ouyang", "Limin Wang", "Min Dou", "Xizhou Zhu", "Tong Lu", "Dahua Lin", "Jifeng Dai", "Weijie Su", "Bowen Zhou", "Kai Chen", "Yu Qiao", "Wenhai Wang", "Gen Luo"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2508.18265"
    pdf: "https://arxiv.org/pdf/2508.18265v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2508.18265.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2508.18265\">Wang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Comparison between InternVL3.5 and leading MLLMs in general capabilities. Hatched bars represent closed-source commercial models. We report average scores on a set of multimodal general, reasoning, text, and …"
images: 
  - src: "images/2025/paper-2508.18265.webp"
    alt: "Figure from the paper \"InternVL3.5: Advancing Open-Source Multimodal Models in Versatility, Reasoning, and Efficiency\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2508.18265\">Wang et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Comparison between InternVL3.5 and leading MLLMs in general capabilities. Hatched bars represent closed-source commercial models. We report average scores on a set of multimodal general, reasoning, text, and …"
card: 
  task: "Open multimodal models: versatility, reasoning and efficiency"
  method: "Cascade RL (offline → online); Visual Resolution Router (ViR); Decoupled Vision-Language Deployment (DvD)"
  data: "General multimodal, reasoning, text and agentic benchmarks"
  result: "Up to +16.0% reasoning and 4.05× inference speed-up vs InternVL3; SOTA among open MLLMs for the 241B-A28B model, per the abstract"
draft: false
date: "2025-08-26"
---

## Problem

The InternVL series (InternVL 2.5 and 3 were summarised here in Dec 2024 and Apr 2025) keeps pushing open multimodal models. This version targets **reasoning** and **inference efficiency**.

## Method

- **Cascade RL**: a two-stage, coarse-to-fine process. **Offline RL** first, for stable convergence, then **online RL** for refined alignment.
- **Visual Resolution Router (ViR)**: dynamically adjusts the resolution of visual tokens without hurting performance.
- **Decoupled Vision-Language Deployment (DvD)**: put the vision encoder and the language model on different GPUs to balance the load.

## Key results

From the abstract:

- up to **+16.0%** overall reasoning performance and **4.05×** inference speed-up compared with InternVL3
- new abilities such as **GUI interaction** and **embodied agency**
- the largest model, **InternVL3.5-241B-A28B**, is state of the art among open MLLMs on general multimodal, reasoning, text and agentic tasks, narrowing the gap to commercial models like GPT-5 (Figure 1)

## Limitations

There's no dedicated limitations section in the extracted text. Comparisons with commercial models are the authors' own.
