---
title: "Paper summary: Seedance 2.0: Advancing Video Generation for World Complexity"
categories: ["papers"]
tags: ["genai", "video", "audio"]
summary: "Seedance 2.0 is ByteDance's joint audio–video generation model accepting text, image, audio and video references, generating 4–15 second clips at 480p or 720p."
sources: 
  - title: "Seedance 2.0: Advancing Video Generation for World Complexity (arXiv:2604.14148)"
    url: "https://arxiv.org/abs/2604.14148"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:51:54.174Z"
  - title: "Hugging Face Daily Papers, 2026-04-16"
    url: "https://huggingface.co/papers?date=2026-04-16"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:19.978Z"
highlights: ["Audio and video are generated together by one model, not by separate systems stitched together.", "Up to 3 video clips, 9 images and 3 audio clips can be given as references."]
papers: 
  - title: "Seedance 2.0: Advancing Video Generation for World Complexity"
    authors: ["Team Seedance", "De Chen", "Liyang Chen", "Xin Chen", "Ying Chen", "Zhuo Chen", "Zhuowei Chen", "Feng Cheng", "Tianheng Cheng", "Yufeng Cheng", "Mojie Chi", "Xuyan Chi", "Jian Cong", "Qinpeng Cui", "Fei Ding", "Qide Dong", "Yujiao Du", "Haojie Duanmu", "Junliang Fan", "Jiarui Fang", "Jing Fang", "Zetao Fang", "Chengjian Feng", "Yu Gao", "Diandian Gu", "Dong Guo", "Hanzhong Guo", "Qiushan Guo", "Boyang Hao", "Hongxiang Hao", "Haoxun He", "Jiaao He", "Qian He", "Tuyen Hoang", "Heng Hu", "Ruoqing Hu", "Yuxiang Hu", "Jiancheng Huang", "Weilin Huang", "Zhaoyang Huang", "Zhongyi Huang", "Jishuo Jin", "Ming Jing", "Ashley Kim", "Shanshan Lao", "Yichong Leng", "Bingchuan Li", "Gen Li", "Haifeng Li", "Huixia Li", "Jiashi Li", "Ming Li", "Xiaojie Li", "Xingxing Li", "Yameng Li", "Yiying Li", "Yu Li", "Yueyan Li", "Chao Liang", "Han Liang", "Jianzhong Liang", "Ying Liang", "Wang Liao", "J. H. Lien", "Shanchuan Lin", "Xi Lin", "Feng Ling", "Yue Ling", "Fangfang Liu", "Jiawei Liu", "Jihao Liu", "Jingtuo Liu", "Shu Liu", "Sichao Liu", "Wei Liu", "Xue Liu", "Zuxi Liu", "Ruijie Lu", "Lecheng Lyu", "Jingting Ma", "Tianxiang Ma", "Xiaonan Nie", "Jingzhe Ning", "Junjie Pan", "Xitong Pan", "Ronggui Peng", "Xueqiong Qu", "Yuxi Ren", "Yuchen Shen", "Guang Shi", "Lei Shi", "Yinglong Song", "Fan Sun", "Li Sun", "Renfei Sun", "Wenjing Tang", "Boyang Tao", "Zirui Tao", "Dongliang Wang", "Feng Wang", "Hulin Wang", "Ke Wang", "Qingyi Wang", "Rui Wang", "Shuai Wang", "Shulei Wang", "Weichen Wang", "Xuanda Wang", "Yanhui Wang", "Yue Wang", "Yuping Wang", "Yuxuan Wang", "Zijie Wang", "Ziyu Wang", "Guoqiang Wei", "Meng Wei", "Di Wu", "Guohong Wu", "Hanjie Wu", "Huachao Wu", "Jian Wu", "Jie Wu", "Ruolan Wu", "Shaojin Wu", "Xiaohu Wu", "Xinglong Wu", "Yonghui Wu", "Ruiqi Xia", "Xin Xia", "Xuefeng Xiao", "Shuang Xu", "Bangbang Yang", "Jiaqi Yang", "Runkai Yang", "Tao Yang", "Yihang Yang", "Zhixian Yang", "Ziyan Yang", "Fulong Ye", "Bingqian Yi", "Xing Yin", "Yongbin You", "Linxiao Yuan", "Weihong Zeng", "Xuejiao Zeng", "Yan Zeng", "Siyu Zhai", "Zhonghua Zhai", "Bowen Zhang", "Chenlin Zhang", "Heng Zhang", "Jun Zhang", "Manlin Zhang", "Peiyuan Zhang", "Shuo Zhang", "Xiaohe Zhang", "Xiaoying Zhang", "Xinyan Zhang", "Xinyi Zhang", "Yichi Zhang", "Zixiang Zhang", "Haiyu Zhao", "Huating Zhao", "Liming Zhao", "Yian Zhao", "Guangcong Zheng", "Jianbin Zheng", "Xiaozheng Zheng", "Zerong Zheng", "Kuan Zhu", "Feilong Zuo"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2604.14148"
    pdf: "https://arxiv.org/pdf/2604.14148v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Multi-modal audio–video generation and editing"
  method: "Unified large-scale architecture for joint audio-video generation; four input modalities; Fast variant"
  data: "Expert evaluations and public user tests"
  result: "Performance on par with the leading level in the field, per the abstract"
draft: false
date: "2026-04-16"
---

## Problem

Video generation with **synchronised audio**, guided by many kinds of references, has usually needed several separate systems.

## Method

**Seedance 2.0** uses a **unified, large-scale architecture** for **joint audio–video generation**. It accepts **text, image, audio and video** inputs and supports a wide range of reference and editing capabilities. A **Fast** variant targets low latency. According to the abstract, it was released in China in early February 2026.

## Key results

From the abstract:

- generates audio-video clips of **4 to 15 seconds** at **480p or 720p**
- the open platform accepts up to **3 video clips, 9 images and 3 audio clips** as references
- in expert evaluations and public user tests, performance on par with the leading level in the field

## Limitations

There's no dedicated limitations section in the extracted text. The evaluation is described in general terms, without specific benchmark numbers in the abstract.
