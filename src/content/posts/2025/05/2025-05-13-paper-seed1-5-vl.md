---
title: "Paper summary: Seed1.5-VL Technical Report"
categories: ["papers"]
tags: ["multimodal", "agents"]
summary: "ByteDance's Seed1.5-VL pairs a 532M vision encoder with a 20B-active MoE LLM and reports state of the art on 38 of 60 public benchmarks, plus strong GUI-control and gameplay agent results."
sources: 
  - title: "Seed1.5-VL Technical Report (arXiv:2505.07062)"
    url: "https://arxiv.org/abs/2505.07062"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:53.340Z"
  - title: "Hugging Face Daily Papers, 2025-05-13"
    url: "https://huggingface.co/papers?date=2025-05-13"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:31:30.028Z"
highlights: ["A compact design (532M vision encoder plus 20B active parameters) reports state of the art on 38 of 60 public benchmarks.", "On agent tasks like GUI control and gameplay, it's reported to beat OpenAI CUA and Claude 3.7."]
papers: 
  - title: "Seed1.5-VL Technical Report"
    authors: ["Dong Guo", "Faming Wu", "Feida Zhu", "Fuxing Leng", "Guang Shi", "Haobin Chen", "Haoqi Fan", "Jian Wang", "Jianyu Jiang", "Jiawei Wang", "Jingji Chen", "Jingjia Huang", "Kang Lei", "Liping Yuan", "Lishu Luo", "Pengfei Liu", "Qinghao Ye", "Rui Qian", "Shen Yan", "Shixiong Zhao", "Shuai Peng", "Shuangye Li", "Sihang Yuan", "Sijin Wu", "Tianheng Cheng", "Weiwei Liu", "Wenqian Wang", "Xianhan Zeng", "Xiao Liu", "Xiaobo Qin", "Xiaohan Ding", "Xiaojun Xiao", "Xiaoying Zhang", "Xuanwei Zhang", "Xuehan Xiong", "Yanghua Peng", "Yangrui Chen", "Yanwei Li", "Yanxu Hu", "Yi Lin", "Yiyuan Hu", "Yiyuan Zhang", "Youbin Wu", "Yu Li", "Yudong Liu", "Yue Ling", "Yujia Qin", "Zanbo Wang", "Zhiwu He", "Aoxue Zhang", "Bairen Yi", "Bencheng Liao", "Can Huang", "Can Zhang", "Chaorui Deng", "Chaoyi Deng", "Cheng Lin", "Cheng Yuan", "Chenggang Li", "Chenhui Gou", "Chenwei Lou", "Chengzhi Wei", "Chundian Liu", "Chunyuan Li", "Deyao Zhu", "Donghong Zhong", "Feng Li", "Feng Zhang", "Gang Wu", "Guodong Li", "Guohong Xiao", "Haibin Lin", "Haihua Yang", "Haoming Wang", "Heng Ji", "Hongxiang Hao", "Hui Shen", "Huixia Li", "Jiahao Li", "Jialong Wu", "Jianhua Zhu", "Jianpeng Jiao", "Jiashi Feng", "Jiaze Chen", "Jianhui Duan", "Jihao Liu", "Jin Zeng", "Jingqun Tang", "Jingyu Sun", "Joya Chen", "Jun Long", "Junda Feng", "Junfeng Zhan", "Junjie Fang", "Junting Lu", "Kai Hua", "Kai Liu", "Kai Shen", "Kaiyuan Zhang", "Ke Shen", "Ke Wang", "Keyu Pan", "Kun Zhang", "Kunchang Li", "Lanxin Li", "Lei Li", "Lei Shi", "Li Han", "Liang Xiang", "Liangqiang Chen", "Lin Chen", "Lin Li", "Lin Yan", "Liying Chi", "Longxiang Liu", "Mengfei Du", "Mingxuan Wang", "Ningxin Pan", "Peibin Chen", "Pengfei Chen", "Pengfei Wu", "Qingqing Yuan", "Qingyao Shuai", "Qiuyan Tao", "Renjie Zheng", "Renrui Zhang", "Ru Zhang", "Rui Wang", "Rui Yang", "Rui Zhao", "Shaoqiang Xu", "Shihao Liang", "Shipeng Yan", "Shu Zhong", "Shuaishuai Cao", "Shuangzhi Wu", "Shufan Liu", "Shuhan Chang", "Songhua Cai", "Tenglong Ao", "Tianhao Yang", "Tingting Zhang", "Wanjun Zhong", "Wei Jia", "Wei Weng", "Weihao Yu", "Wenhao Huang", "Wenjia Zhu", "Wenli Yang", "Wenzhi Wang", "Xiang Long", "XiangRui Yin", "Xiao Li", "Xiaolei Zhu", "Xiaoying Jia", "Xijin Zhang", "Xin Liu", "Xinchen Zhang", "Xinyu Yang", "Xiongcai Luo", "Xiuli Chen", "Xuantong Zhong", "Xuefeng Xiao", "Xujing Li", "Yan Wu", "Yawei Wen", "Yifan Du", "Yihao Zhang", "Yining Ye", "Yonghui Wu", "Yu Liu", "Yu Yue", "Yufeng Zhou", "Yufeng Yuan", "Yuhang Xu", "Yuhong Yang", "Yun Zhang", "Yunhao Fang", "Yuntao Li", "Yurui Ren", "Yuwen Xiong", "Zehua Hong", "Zehua Wang", "Zewei Sun", "Zeyu Wang", "Zhao Cai", "Zhaoyue Zha", "Zhecheng An", "Zhehui Zhao", "Zhengzhuo Xu", "Zhipeng Chen", "Zhiyong Wu", "Zhuofan Zheng", "Zihao Wang", "Zilong Huang", "Ziyu Zhu", "Zuquan Song"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2505.07062"
    pdf: "https://arxiv.org/pdf/2505.07062v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "General multimodal understanding, reasoning and agent tasks"
  method: "532M-parameter vision encoder + MoE LLM with 20B active parameters"
  data: "60 public VLM benchmarks plus internal suites"
  result: "SOTA on 38/60 public benchmarks; outperforms OpenAI CUA and Claude 3.7 on GUI control and gameplay, per the abstract"
draft: false
date: "2025-05-13"
---

## Problem

Building a vision-language model that's strong at perception, reasoning **and** acting as an agent, without making it enormous.

## Method

**Seed1.5-VL** combines a **532M-parameter vision encoder** with a **Mixture-of-Experts LLM** that has **20B active parameters**. Most of the report covers the team's experience in model design, data construction and multi-stage training.

## Key results

From the abstract:

- state of the art on **38 of 60** public benchmarks
- in agent-centric tasks (**GUI control** and **gameplay**), it outperforms **OpenAI CUA** and **Claude 3.7**
- strong multimodal reasoning, such as visual puzzles

It's accessible through ByteDance's Volcano Engine.

## Limitations

There's no dedicated limitations section in the extracted text. The abstract points to access through Volcano Engine, and part of the evaluation uses internal suites that outsiders can't rerun.
