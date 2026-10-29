---
title: "Paper summary: On the Scaling of PEFT: Towards Million Personal Models of Trillion Parameters"
categories: ["papers"]
tags: ["llm", "lora", "personalisation"]
summary: "This position-style study argues that small adapters on top of shared foundation models can serve as persistent personal state (preferences, skills, tool habits, memory-like updates), organised along Scale Up, Scale Down and Scale Out axes."
sources: 
  - title: "On the Scaling of PEFT: Towards Million Personal Models of Trillion Parameters (arXiv:2606.02437)"
    url: "https://arxiv.org/abs/2606.02437"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:37.607Z"
  - title: "Hugging Face Daily Papers, 2026-06-02"
    url: "https://huggingface.co/papers?date=2026-06-02"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:48.513Z"
  - title: "On the Scaling of PEFT: Towards Million Personal Models of Trillion Parameters (arXiv HTML full text)"
    url: "https://arxiv.org/html/2606.02437"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:37.607Z"
highlights: ["The base model gives shared competence; each adapter carries one instance's personal behaviour.", "PEFT is reframed from a budget substitute for full fine-tuning to a substrate for persistent personal models."]
papers: 
  - title: "On the Scaling of PEFT: Towards Million Personal Models of Trillion Parameters"
    authors: ["Mind Lab", ":", "Vin Bo", "Song Cao", "Vic Cao", "Andrew Chen", "Kaijie Chen", "Cleon Cheng", "Steven Chiang", "Kaixuan Fan", "Hera Feng", "Huan Feng", "Arthur Fu", "Jun Gao", "Hongquan Gu", "Aaron Guan", "Nolan Ho", "Mutian Hong", "Hailee Hou", "Peixuan Hua", "Charles Huang", "Miles Jiang", "Nora Jiang", "Yuyi Jiang", "Qiuyu Jin", "Fancy Kong", "Andrew Lei", "Kyrie Lei", "Alexy Li", "Lucian Li", "Ray Li", "Theo Li", "Wenhao Li", "Zhihui Li", "Allen Lin", "Jiayi Lin", "Kairus Liu", "Kieran Liu", "Logan Liu", "Xiang Liu", "Irvine Lu", "Maeve Luo", "Runze Lv", "Pony Ma", "Verity Niu", "Anson Qiu", "Vincent Wang", "Rio Yang", "Maxwell Yao", "Carrie Ye", "Regis Ye", "Wenlin Ye", "Josh Ying", "Danney Zeng", "Yuhan Zhan", "Anya Zhang", "Di Zhang", "Ruijia Zhang", "Shiyang Zhang", "Sueky Zhang", "Ya Zhang", "Wei Zhao", "Ada Zhou", "Adrian Zhou", "Yuhua Zhou", "Xinyue Zhu", "Murphy Zhuang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2606.02437"
    pdf: "https://arxiv.org/pdf/2606.02437v2"
    license: "http://creativecommons.org/licenses/by-nc-sa/4.0/"
card: 
  task: "Persistent personal models via parameter-efficient fine-tuning"
  method: "Framing PEFT adapters as local state; three scaling axes; MinT as infrastructure example"
  data: "Studies along Scale Up, Scale Down and Scale Out"
  result: "Results suggest PEFT can be a compact substrate for persistent personal models, per the abstract"
draft: false
date: "2026-06-02"
---

## Problem

PEFT methods like LoRA are usually seen as a **cheaper alternative** to full fine-tuning. Is there a bigger role for them?

## Method

The paper, from the same group as MinT (May 2026 on this blog), treats **small trainable adapters as persistent local state** on top of strong shared foundation models. The base supplies shared competence, and adapters carry instance-specific **preferences, skills, tool habits and memory-like updates**. Three scaling axes:

- **Scale Up**: stronger shared priors make small local updates more useful
- **Scale Down**: how small adapters can be while staying reliable
- **Scale Out**: many persistent adapted instances coexisting

MinT is presented as one way to manage adapter identity, revisions, provenance, evaluation and serving.

## Key results

From the abstract: together, the results suggest PEFT can be a compact substrate for **persistent personal models**, not just a budget substitute.

## Limitations

There's no dedicated limitations section in the extracted text. The paper is a framing with supporting studies rather than one benchmark result.
