---
title: "Paper summary: A Very Big Video Reasoning Suite"
categories: ["papers"]
tags: ["video", "reasoning", "dataset", "benchmark"]
summary: "VBVR is a video-reasoning dataset of 200 curated tasks and over a million clips, about 1,000× larger than earlier ones, with a rule-based benchmark used for an early study of how video reasoning scales."
sources: 
  - title: "A Very Big Video Reasoning Suite (arXiv:2602.20159)"
    url: "https://arxiv.org/abs/2602.20159"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:10.635Z"
  - title: "Hugging Face Daily Papers, 2026-02-24"
    url: "https://huggingface.co/papers?date=2026-02-24"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:49.340Z"
  - title: "A Very Big Video Reasoning Suite (arXiv HTML full text)"
    url: "https://arxiv.org/html/2602.20159"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:10.635Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/Video-Reason/VBVR-EvalKit"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:51:10.635Z"
highlights: ["Video models have mostly been judged on visual quality; this dataset targets reasoning about continuity, interaction and causality.", "The benchmark uses rule-based, human-aligned scorers instead of model-based judges, for reproducible results."]
papers: 
  - title: "A Very Big Video Reasoning Suite"
    authors: ["Maijunxian Wang", "Ruisi Wang", "Juyi Lin", "Ran Ji", "Thaddäus Wiedemer", "Qingying Gao", "Dezhi Luo", "Yaoyao Qian", "Lianyu Huang", "Zelong Hong", "Jiahui Ge", "Qianli Ma", "Hang He", "Yifan Zhou", "Lingzi Guo", "Lantao Mei", "Jiachen Li", "Hanwen Xing", "Tianqi Zhao", "Fengyuan Yu", "Weihang Xiao", "Yizheng Jiao", "Jianheng Hou", "Danyang Zhang", "Pengcheng Xu", "Boyang Zhong", "Zehong Zhao", "Gaoyun Fang", "John Kitaoka", "Yile Xu", "Hua Xu", "Kenton Blacutt", "Tin Nguyen", "Siyuan Song", "Haoran Sun", "Shaoyue Wen", "Linyang He", "Runming Wang", "Yanzhi Wang", "Mengyue Yang", "Ziqiao Ma", "Raphaël Millière", "Freda Shi", "Nuno Vasconcelos", "Daniel Khashabi", "Alan Yuille", "Yilun Du", "Ziming Liu", "Bo Li", "Dahua Lin", "Ziwei Liu", "Vikash Kumar", "Yijiang Li", "Lei Yang", "Zhongang Cai", "Hokin Deng"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2602.20159"
    pdf: "https://arxiv.org/pdf/2602.20159v4"
    code: "https://github.com/Video-Reason/VBVR-EvalKit"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Training and evaluating reasoning in video models"
  method: "VBVR dataset (200 reasoning tasks, >1M clips) + VBVR-Bench with rule-based scorers; scaling study"
  data: "Over one million video clips across a principled task taxonomy"
  result: "Early signs of emergent generalisation to unseen reasoning tasks, per the abstract"
draft: false
date: "2026-02-24"
---

## Problem

Video-model progress has focused on **visual quality**. Video **reasoning** (continuity, interaction, causality) is under-explored, partly because there's no large-scale training data for it.

## Method

- **VBVR Dataset**: **200** curated reasoning tasks following a taxonomy, with **over one million** clips, about three orders of magnitude larger than existing datasets.
- **VBVR-Bench**: a verifiable evaluation framework with **rule-based, human-aligned scorers**, not model judges, for reproducible, interpretable diagnosis.
- A large-scale **scaling study** of video reasoning.

## Key results

From the abstract: one of the first large-scale scaling studies of video reasoning, with **early signs of emergent generalisation** to unseen reasoning tasks. Data, toolkit and models are released.

## Limitations

There's no dedicated limitations section in the extracted text. The authors describe the generalisation as "early signs", not an established result.
