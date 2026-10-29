---
title: "Paper summary: MiniMax-01: Scaling Foundation Models with Lightning Attention"
categories: ["papers"]
tags: ["llm", "long-context", "mixture-of-experts"]
summary: "MiniMax-01 combines lightning attention, a linear-attention variant, with a 32-expert MoE (456B total, 45.9B active) to train on 1M-token contexts and extrapolate to 4M at inference."
sources: 
  - title: "MiniMax-01: Scaling Foundation Models with Lightning Attention (arXiv:2501.08313)"
    url: "https://arxiv.org/abs/2501.08313"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:04.349Z"
  - title: "Hugging Face Daily Papers, 2025-01-15"
    url: "https://huggingface.co/papers?date=2025-01-15"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:18.255Z"
  - title: "MiniMax-01: Scaling Foundation Models with Lightning Attention (arXiv HTML full text)"
    url: "https://arxiv.org/html/2501.08313"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:04.349Z"
highlights: ["Linear-style lightning attention makes million-token contexts affordable.", "456B parameters in total, but only 45.9B active per token."]
papers: 
  - title: "MiniMax-01: Scaling Foundation Models with Lightning Attention"
    authors: ["MiniMax", "Aonian Li", "Bangwei Gong", "Bo Yang", "Boji Shan", "Chang Liu", "Cheng Zhu", "Chunhao Zhang", "Congchao Guo", "Da Chen", "Dong Li", "Enwei Jiao", "Gengxin Li", "Guojun Zhang", "Haohai Sun", "Houze Dong", "Jiadai Zhu", "Jiaqi Zhuang", "Jiayuan Song", "Jin Zhu", "Jingtao Han", "Jingyang Li", "Junbin Xie", "Junhao Xu", "Junjie Yan", "Kaishun Zhang", "Kecheng Xiao", "Kexi Kang", "Le Han", "Leyang Wang", "Lianfei Yu", "Liheng Feng", "Lin Zheng", "Linbo Chai", "Long Xing", "Meizhi Ju", "Mingyuan Chi", "Mozhi Zhang", "Peikai Huang", "Pengcheng Niu", "Pengfei Li", "Pengyu Zhao", "Qi Yang", "Qidi Xu", "Qiexiang Wang", "Qin Wang", "Qiuhui Li", "Ruitao Leng", "Shengmin Shi", "Shuqi Yu", "Sichen Li", "Songquan Zhu", "Tao Huang", "Tianrun Liang", "Weigao Sun", "Weixuan Sun", "Weiyu Cheng", "Wenkai Li", "Xiangjun Song", "Xiao Su", "Xiaodong Han", "Xinjie Zhang", "Xinzhu Hou", "Xu Min", "Xun Zou", "Xuyang Shen", "Yan Gong", "Yingjie Zhu", "Yipeng Zhou", "Yiran Zhong", "Yongyi Hu", "Yuanxiang Fan", "Yue Yu", "Yufeng Yang", "Yuhao Li", "Yunan Huang", "Yunji Li", "Yunpeng Huang", "Yunzhi Xu", "Yuxin Mao", "Zehan Li", "Zekang Li", "Zewei Tao", "Zewen Ying", "Zhaoyang Cong", "Zhen Qin", "Zhenhua Fan", "Zhihang Yu", "Zhuo Jiang", "Zijia Wu"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2501.08313"
    pdf: "https://arxiv.org/pdf/2501.08313v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Top-tier LLM and VLM with very long context"
  method: "Lightning attention + MoE (32 experts, 456B total / 45.9B active); optimised parallelism and compute-communication overlap"
  data: "Text and vision-language training"
  result: "Comparable to top-tier models; 1M-token training context, extrapolating to 4M at inference, per the abstract"
draft: false
date: "2025-01-15"
---

## Problem

Standard softmax attention makes very long contexts expensive. The authors want top-tier quality and **million-token** contexts at affordable cost.

## Method

- **Lightning attention**, an efficient linear-attention approach, is the core, scaled efficiently.
- It's combined with **Mixture of Experts**: **32 experts**, **456B** total parameters, **45.9B** active per token.
- They develop an optimised parallel strategy and computation–communication overlap for MoE and lightning attention, to train and serve at this scale.

The series includes **MiniMax-Text-01** and **MiniMax-VL-01**.

## Key results

From the abstract: performance comparable to top-tier models, with a context window of up to **1 million tokens** in training that **extrapolates to 4 million** at inference.

## Limitations

There's no dedicated limitations section in the extracted text. Very long context support doesn't guarantee equally good use of all that context.
