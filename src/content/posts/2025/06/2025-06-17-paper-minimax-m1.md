---
title: "Paper summary: MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention"
categories: ["papers"]
tags: ["llm", "reasoning", "rl", "long-context"]
summary: "MiniMax-M1 is an open-weight hybrid-attention reasoning model (456B total, 45.9B active, 1M-token context) trained with large-scale RL and a new algorithm, CISPO, at a reported rental cost of $534,700."
sources: 
  - title: "MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention (arXiv:2506.13585)"
    url: "https://arxiv.org/abs/2506.13585"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:24.182Z"
  - title: "Hugging Face Daily Papers, 2025-06-17"
    url: "https://huggingface.co/papers?date=2025-06-17"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:51.382Z"
  - title: "MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention (arXiv HTML full text)"
    url: "https://arxiv.org/html/2506.13585"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:47:24.182Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/MiniMax-AI/MiniMax-M1"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:47:24.182Z"
highlights: ["Lightning attention keeps long reasoning traces cheap, which matters when a model \"thinks\" for tens of thousands of tokens.", "CISPO clips importance-sampling weights instead of clipping token updates."]
papers: 
  - title: "MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention"
    authors: ["MiniMax", ":", "Aili Chen", "Aonian Li", "Bangwei Gong", "Binyang Jiang", "Bo Fei", "Bo Yang", "Boji Shan", "Changqing Yu", "Chao Wang", "Cheng Zhu", "Chengjun Xiao", "Chengyu Du", "Chi Zhang", "Chu Qiao", "Chunhao Zhang", "Chunhui Du", "Congchao Guo", "Da Chen", "Deming Ding", "Dianjun Sun", "Dong Li", "Enwei Jiao", "Haigang Zhou", "Haimo Zhang", "Han Ding", "Haohai Sun", "Haoyu Feng", "Huaiguang Cai", "Haichao Zhu", "Jian Sun", "Jiaqi Zhuang", "Jiaren Cai", "Jiayuan Song", "Jin Zhu", "Jingyang Li", "Jinhao Tian", "Jinli Liu", "Junhao Xu", "Junjie Yan", "Junteng Liu", "Junxian He", "Kaiyi Feng", "Ke Yang", "Kecheng Xiao", "Le Han", "Leyang Wang", "Lianfei Yu", "Liheng Feng", "Lin Li", "Lin Zheng", "Linge Du", "Lingyu Yang", "Lunbin Zeng", "Minghui Yu", "Mingliang Tao", "Mingyuan Chi", "Mozhi Zhang", "Mujie Lin", "Nan Hu", "Nongyu Di", "Peng Gao", "Pengfei Li", "Pengyu Zhao", "Qibing Ren", "Qidi Xu", "Qile Li", "Qin Wang", "Rong Tian", "Ruitao Leng", "Shaoxiang Chen", "Shaoyu Chen", "Shengmin Shi", "Shitong Weng", "Shuchang Guan", "Shuqi Yu", "Sichen Li", "Songquan Zhu", "Tengfei Li", "Tianchi Cai", "Tianrun Liang", "Weiyu Cheng", "Weize Kong", "Wenkai Li", "Xiancai Chen", "Xiangjun Song", "Xiao Luo", "Xiao Su", "Xiaobo Li", "Xiaodong Han", "Xinzhu Hou", "Xuan Lu", "Xun Zou", "Xuyang Shen", "Yan Gong", "Yan Ma", "Yang Wang", "Yiqi Shi", "Yiran Zhong", "Yonghong Duan", "Yongxiang Fu", "Yongyi Hu", "Yu Gao", "Yuanxiang Fan", "Yufeng Yang", "Yuhao Li", "Yulin Hu", "Yunan Huang", "Yunji Li", "Yunzhi Xu", "Yuxin Mao", "Yuxuan Shi", "Yuze Wenren", "Zehan Li", "Zelin Li", "Zhanxu Tian", "Zhengmao Zhu", "Zhenhua Fan", "Zhenzhen Wu", "Zhichao Xu", "Zhihang Yu", "Zhiheng Lyu", "Zhuo Jiang", "Zibo Gao", "Zijia Wu", "Zijian Song", "Zijun Sun"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2506.13585"
    pdf: "https://arxiv.org/pdf/2506.13585v1"
    code: "https://github.com/MiniMax-AI/MiniMax-M1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Open-weight long-context reasoning model"
  method: "Hybrid MoE + lightning attention (from MiniMax-Text-01); large-scale RL incl. software-engineering sandboxes; CISPO RL algorithm"
  data: "Diverse RL problems; standard reasoning, SWE, tool-use and long-context benchmarks"
  result: "Comparable or superior to DeepSeek-R1 and Qwen3-235B, strongest on SWE, tool use and long context; RL on 512 H800s in 3 weeks for $534,700, per the abstract"
draft: false
date: "2025-06-17"
---

## Problem

Reasoning models generate very long outputs, and standard attention makes long sequences expensive. That's a problem both for inference and for RL training, which generates many long rollouts.

## Method

**MiniMax-M1** builds on **MiniMax-Text-01** (summarised here in January): a hybrid **MoE** with **lightning attention**, **456B** total parameters and **45.9B** active, with a native context of **1 million tokens** (8× DeepSeek-R1, per the abstract). It's trained with **large-scale RL** on diverse problems, including sandboxed real-world software-engineering environments. The authors also propose **CISPO**, an RL algorithm that clips **importance-sampling weights** rather than token updates.

## Key results

From the abstract:

- full RL training on **512 H800 GPUs** in **three weeks**, with a rental cost of **$534,700**
- two released versions, with **40K** and **80K** thinking budgets
- comparable or superior to the original **DeepSeek-R1** and **Qwen3-235B**, especially on complex software engineering, tool use and long-context tasks

## Limitations

There's no dedicated limitations section in the extracted text. Results are the developers' own benchmark comparisons.
