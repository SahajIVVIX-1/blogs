---
title: "Paper summary: DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
categories: ["papers"]
tags: ["llm", "reasoning", "rl"]
summary: "DeepSeek-R1 shows that large-scale reinforcement learning, without human-labelled reasoning traces, can bring out advanced reasoning such as self-reflection and verification in a pretrained LLM."
sources: 
  - title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (arXiv:2501.12948)"
    url: "https://arxiv.org/abs/2501.12948"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:10.233Z"
  - title: "Hugging Face Daily Papers, 2025-01-23"
    url: "https://huggingface.co/papers?date=2025-01-23"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:23.162Z"
  - title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (arXiv HTML full text)"
    url: "https://arxiv.org/html/2501.12948"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:45:10.233Z"
  - title: "Code repository (linked in the paper)"
    url: "https://github.com/deepseek-ai/deepseek-r1"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:45:10.233Z"
highlights: ["Reasoning skills like self-verification and reflection emerged during RL rather than being taught by example.", "The authors' recipe: hard questions, a reliable verifier and enough RL compute."]
papers: 
  - title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    authors: ["DeepSeek-AI", "Daya Guo", "Dejian Yang", "Haowei Zhang", "Junxiao Song", "Peiyi Wang", "Qihao Zhu", "Runxin Xu", "Ruoyu Zhang", "Shirong Ma", "Xiao Bi", "Xiaokang Zhang", "Xingkai Yu", "Yu Wu", "Z. F. Wu", "Zhibin Gou", "Zhihong Shao", "Zhuoshu Li", "Ziyi Gao", "Aixin Liu", "Bing Xue", "Bingxuan Wang", "Bochao Wu", "Bei Feng", "Chengda Lu", "Chenggang Zhao", "Chengqi Deng", "Chenyu Zhang", "Chong Ruan", "Damai Dai", "Deli Chen", "Dongjie Ji", "Erhang Li", "Fangyun Lin", "Fucong Dai", "Fuli Luo", "Guangbo Hao", "Guanting Chen", "Guowei Li", "H. Zhang", "Han Bao", "Hanwei Xu", "Haocheng Wang", "Honghui Ding", "Huajian Xin", "Huazuo Gao", "Hui Qu", "Hui Li", "Jianzhong Guo", "Jiashi Li", "Jiawei Wang", "Jingchang Chen", "Jingyang Yuan", "Junjie Qiu", "Junlong Li", "J. L. Cai", "Jiaqi Ni", "Jian Liang", "Jin Chen", "Kai Dong", "Kai Hu", "Kaige Gao", "Kang Guan", "Kexin Huang", "Kuai Yu", "Lean Wang", "Lecong Zhang", "Liang Zhao", "Litong Wang", "Liyue Zhang", "Lei Xu", "Leyi Xia", "Mingchuan Zhang", "Minghua Zhang", "Minghui Tang", "Meng Li", "Miaojun Wang", "Mingming Li", "Ning Tian", "Panpan Huang", "Peng Zhang", "Qiancheng Wang", "Qinyu Chen", "Qiushi Du", "Ruiqi Ge", "Ruisong Zhang", "Ruizhe Pan", "Runji Wang", "R. J. Chen", "R. L. Jin", "Ruyi Chen", "Shanghao Lu", "Shangyan Zhou", "Shanhuang Chen", "Shengfeng Ye", "Shiyu Wang", "Shuiping Yu", "Shunfeng Zhou", "Shuting Pan", "S. S. Li", "Shuang Zhou", "Shaoqing Wu", "Shengfeng Ye", "Tao Yun", "Tian Pei", "Tianyu Sun", "T. Wang", "Wangding Zeng", "Wanjia Zhao", "Wen Liu", "Wenfeng Liang", "Wenjun Gao", "Wenqin Yu", "Wentao Zhang", "W. L. Xiao", "Wei An", "Xiaodong Liu", "Xiaohan Wang", "Xiaokang Chen", "Xiaotao Nie", "Xin Cheng", "Xin Liu", "Xin Xie", "Xingchao Liu", "Xinyu Yang", "Xinyuan Li", "Xuecheng Su", "Xuheng Lin", "X. Q. Li", "Xiangyue Jin", "Xiaojin Shen", "Xiaosha Chen", "Xiaowen Sun", "Xiaoxiang Wang", "Xinnan Song", "Xinyi Zhou", "Xianzu Wang", "Xinxia Shan", "Y. K. Li", "Y. Q. Wang", "Y. X. Wei", "Yang Zhang", "Yanhong Xu", "Yao Li", "Yao Zhao", "Yaofeng Sun", "Yaohui Wang", "Yi Yu", "Yichao Zhang", "Yifan Shi", "Yiliang Xiong", "Ying He", "Yishi Piao", "Yisong Wang", "Yixuan Tan", "Yiyang Ma", "Yiyuan Liu", "Yongqiang Guo", "Yuan Ou", "Yuduan Wang", "Yue Gong", "Yuheng Zou", "Yujia He", "Yunfan Xiong", "Yuxiang Luo", "Yuxiang You", "Yuxuan Liu", "Yuyang Zhou", "Y. X. Zhu", "Yanhong Xu", "Yanping Huang", "Yaohui Li", "Yi Zheng", "Yuchen Zhu", "Yunxian Ma", "Ying Tang", "Yukun Zha", "Yuting Yan", "Z. Z. Ren", "Zehui Ren", "Zhangli Sha", "Zhe Fu", "Zhean Xu", "Zhenda Xie", "Zhengyan Zhang", "Zhewen Hao", "Zhicheng Ma", "Zhigang Yan", "Zhiyu Wu", "Zihui Gu", "Zijia Zhu", "Zijun Liu", "Zilin Li", "Ziwei Xie", "Ziyang Song", "Zizheng Pan", "Zhen Huang", "Zhipeng Xu", "Zhongyu Zhang", "Zhen Zhang"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2501.12948"
    pdf: "https://arxiv.org/pdf/2501.12948v2"
    code: "https://github.com/deepseek-ai/deepseek-r1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Reasoning in LLMs (maths, coding competitions, STEM)"
  method: "Large-scale RL (DeepSeek-R1-Zero: pure RL; DeepSeek-R1: further stages) rewarding verifiable outcomes"
  data: "Hard reasoning questions with verifiable answers"
  result: "Superior performance on verifiable tasks compared with counterparts trained on human demonstrations, per the abstract"
draft: false
date: "2025-01-23"
---

## Problem

Earlier reasoning gains relied heavily on **human-annotated demonstrations** of reasoning, and models still fell short on complex problems.

## Method

The paper uses **pure reinforcement learning** to bring out reasoning, without human-labelled reasoning trajectories:

- **DeepSeek-R1-Zero** is trained with large-scale RL directly from a pretrained checkpoint.
- **DeepSeek-R1** is trained through a multi-stage pipeline built on that, to also improve broader areas such as writing and open-domain question answering.

Rewards come from **verifiable** outcomes (correct maths answers, passing code), so no human judges each step.

## Key results

The authors report that advanced patterns, **self-reflection**, **verification** and **dynamic strategy adaptation**, emerged during RL. The resulting model does better on verifiable tasks (maths, coding competitions, STEM) than counterparts trained conventionally on human demonstrations. They conclude that pretrained checkpoints already hold substantial reasoning potential, unlocked by hard questions, a reliable verifier and enough RL compute.

## Limitations

The paper lists capability limitations, starting with **structured output and tool use**, where DeepSeek-R1 is weaker than existing models. The extracted section continues with further limitations that are outlined in the paper.
