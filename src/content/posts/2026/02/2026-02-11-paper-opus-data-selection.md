---
title: "Paper summary: OPUS: Towards Efficient and Principled Data Selection in Large Language Model Pre-training in Every Iteration"
categories: ["papers"]
tags: ["llm", "pre-training", "data"]
summary: "OPUS picks pre-training data at every iteration by projecting each candidate's optimizer-shaped update onto a target direction, at 4.7% extra compute; GPT-2 runs on 30B selected tokens beat full 200B-token training."
sources: 
  - title: "OPUS: Towards Efficient and Principled Data Selection in Large Language Model Pre-training in Every Iteration (arXiv:2602.05400)"
    url: "https://arxiv.org/abs/2602.05400"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:00.683Z"
  - title: "Hugging Face Daily Papers, 2026-02-11"
    url: "https://huggingface.co/papers?date=2026-02-11"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:34:41.213Z"
  - title: "OPUS: Towards Efficient and Principled Data Selection in Large Language Model Pre-training in Every Iteration (arXiv HTML full text)"
    url: "https://arxiv.org/html/2602.05400"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:00.683Z"
highlights: ["With high-quality text running out (the \"data wall\"), the goal shifts from more tokens to better tokens.", "Utility is measured in the optimizer's update space (e.g. Adam-shaped), not on raw gradients."]
papers: 
  - title: "OPUS: Towards Efficient and Principled Data Selection in Large Language Model Pre-training in Every Iteration"
    authors: ["Shaobo Wang", "Xuan Ouyang", "Tianyi Xu", "Yuzheng Hu", "Jialin Liu", "Guo Chen", "Tianyu Zhang", "Junhao Zheng", "Kexin Yang", "Xingzhang Ren", "Dayiheng Liu", "Linfeng Zhang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2602.05400"
    pdf: "https://arxiv.org/pdf/2602.05400v2"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2602.05400.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2602.05400\">Wang et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: OPUS outperforms random selection by an average of 2.2% accuracy across 10 benchmarks and achieves 8 [math] reduction in computation on GPT-XL using FineWeb dataset."
images: 
  - src: "images/2026/paper-2602.05400.webp"
    alt: "Figure from the paper \"OPUS: Towards Efficient and Principled Data Selection in Large Language Model Pre-training in Every Iteration\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2602.05400\">Wang et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: OPUS outperforms random selection by an average of 2.2% accuracy across 10 benchmarks and achieves 8 [math] reduction in computation on GPT-XL using FineWeb dataset."
card: 
  task: "Dynamic data selection during LLM pre-training"
  method: "Optimizer-induced Projected Utility Selection; Ghost technique + CountSketch; Boltzmann sampling for diversity"
  data: "GPT-2 Large/XL on FineWeb and FineWeb-Edu; Qwen3-8B-Base on SciencePedia"
  result: "30B selected tokens beat full 200B-token training; 0.5B tokens beat 3B in continued pre-training; +2.2% average vs random on 10 benchmarks, per the paper"
draft: false
date: "2026-02-11"
---

## Problem

The authors call it the **Data Wall**: high-quality public text is running out, so pre-training must use **better** tokens rather than more. Existing selection methods are static heuristic filters (ignoring training dynamics) or dynamic but **optimizer-agnostic** gradient criteria.

## Method

**OPUS** scores each candidate by projecting its **effective update**, as shaped by a modern optimizer, onto a **target direction** from a stable, in-distribution proxy. For scale, it uses a **Ghost** technique with **CountSketch**, and **Boltzmann sampling** for diversity. The overhead is only **4.7%** extra compute.

## Key results

From the abstract and Figure 1:

- **GPT-2 Large/XL** on FineWeb and FineWeb-Edu with **30B** selected tokens outperforms industrial baselines and even **full 200B-token** training
- combined with static filters, it improves efficiency further, even with lower-quality data
- continued pre-training of **Qwen3-8B-Base** on SciencePedia: **0.5B** tokens beat full training on **3B**
- on GPT-XL/FineWeb, an average of **2.2%** higher accuracy than random selection across 10 benchmarks

## Limitations

There's no dedicated limitations section in the extracted text. The pre-training experiments are at GPT-2 scale.
