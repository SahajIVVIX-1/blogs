---
title: "Paper summary: Qwen2 Technical Report"
categories: ["papers"]
tags: ["llm", "open-weights"]
summary: "The Qwen2 report covers open dense models from 0.5B to 72B plus an MoE, with Qwen2-72B reaching 84.2 on MMLU as a base model and support for about 30 languages."
sources: 
  - title: "Qwen2 Technical Report (arXiv:2407.10671)"
    url: "https://arxiv.org/abs/2407.10671"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:22.571Z"
  - title: "Hugging Face Daily Papers, 2024-07-16"
    url: "https://huggingface.co/papers?date=2024-07-16"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:26.885Z"
  - title: "Qwen2 Technical Report (arXiv HTML full text)"
    url: "https://arxiv.org/html/2407.10671"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:22.571Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/qwenlm/qwen2"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:42:22.571Z"
highlights: ["A full family released together: dense models from 0.5B to 72B, plus a mixture-of-experts model.", "The flagship base model reports 84.2 MMLU, 64.6 HumanEval and 89.5 GSM8K."]
papers: 
  - title: "Qwen2 Technical Report"
    authors: ["An Yang", "Baosong Yang", "Binyuan Hui", "Bo Zheng", "Bowen Yu", "Chang Zhou", "Chengpeng Li", "Chengyuan Li", "Dayiheng Liu", "Fei Huang", "Guanting Dong", "Haoran Wei", "Huan Lin", "Jialong Tang", "Jialin Wang", "Jian Yang", "Jianhong Tu", "Jianwei Zhang", "Jianxin Ma", "Jianxin Yang", "Jin Xu", "Jingren Zhou", "Jinze Bai", "Jinzheng He", "Junyang Lin", "Kai Dang", "Keming Lu", "Keqin Chen", "Kexin Yang", "Mei Li", "Mingfeng Xue", "Na Ni", "Pei Zhang", "Peng Wang", "Ru Peng", "Rui Men", "Ruize Gao", "Runji Lin", "Shijie Wang", "Shuai Bai", "Sinan Tan", "Tianhang Zhu", "Tianhao Li", "Tianyu Liu", "Wenbin Ge", "Xiaodong Deng", "Xiaohuan Zhou", "Xingzhang Ren", "Xinyu Zhang", "Xipin Wei", "Xuancheng Ren", "Xuejing Liu", "Yang Fan", "Yang Yao", "Yichang Zhang", "Yu Wan", "Yunfei Chu", "Yuqiong Liu", "Zeyu Cui", "Zhenru Zhang", "Zhifang Guo", "Zhihao Fan"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2407.10671"
    pdf: "https://arxiv.org/pdf/2407.10671v4"
    code: "https://github.com/qwenlm/qwen2"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Open-weight foundation and instruction-tuned LLMs"
  method: "Dense Transformers (0.5B–72B) and an MoE model, base and instruction-tuned"
  data: "Benchmarks for understanding, generation, multilingual, code, maths and reasoning"
  result: "Qwen2-72B: MMLU 84.2, GPQA 37.9, HumanEval 64.6, GSM8K 89.5, BBH 82.4; Instruct: MT-Bench 9.1, Arena-Hard 48.1, per the abstract"
draft: false
date: "2024-07-16"
---

## Problem

Open-weight models had been catching up with proprietary ones. This report documents Alibaba's next generation, Qwen2, across a wide range of sizes.

## Method

The Qwen2 series includes foundation and instruction-tuned models from **0.5B to 72B** parameters, with **dense** models and a **mixture-of-experts** model. The report covers architecture, pre-training and post-training.

## Key results

As reported in the abstract:

- **Qwen2-72B (base)**: 84.2 MMLU, 37.9 GPQA, 64.6 HumanEval, 89.5 GSM8K, 82.4 BBH
- **Qwen2-72B-Instruct**: 9.1 MT-Bench, 48.1 Arena-Hard, 35.7 LiveCodeBench
- surpasses most prior open-weight models, including Qwen1.5, and is competitive with proprietary models
- multilingual ability in about **30 languages**

## Limitations

There's no dedicated limitations section in the extracted text. Benchmarks are reported by the model's own developers, which is standard for technical reports but worth keeping in mind.
