---
title: "Paper summary: Kimi K3: Open Frontier Intelligence"
categories: ["papers"]
tags: ["llm", "open-weights", "agents"]
summary: "Kimi K3 is an open-weight 2.8T-parameter MoE (104B active) with native vision and a 1M-token context, reported as about 2.5× more scaling-efficient than Kimi K2, though still behind the strongest proprietary models."
sources: 
  - title: "Kimi K3: Open Frontier Intelligence (arXiv:2607.24653)"
    url: "https://arxiv.org/abs/2607.24653"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:27.191Z"
  - title: "Hugging Face Daily Papers, 2026-07-28"
    url: "https://huggingface.co/papers?date=2026-07-28"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:36:22.382Z"
  - title: "Kimi K3: Open Frontier Intelligence (arXiv HTML full text)"
    url: "https://arxiv.org/html/2607.24653"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:53:27.191Z"
highlights: ["16 of 896 routed experts are active per token.", "The report states openly that it still trails the most powerful proprietary models it evaluated."]
papers: 
  - title: "Kimi K3: Open Frontier Intelligence"
    authors: ["Kimi Team", "Tongtong Bai", "Yifan Bai", "Yiping Bao", "M. C.", "Jianfeng Cai", "Xinyuan Cai", "Peizhou Cao", "Yuxuan Cao", "Ziwei Chai", "Y. Charles", "H. S. Che", "Guanduo Chen", "Guangyu Chen", "Guanzheng Chen", "Huarong Chen", "Jia Chen", "Jianlong Chen", "Jun Chen", "Kexin Chen", "Peng Chen", "Ruijue Chen", "Wentao Chen", "Xin Chen", "Yang Chen", "Yanru Chen", "Yifei Chen", "Yingjiang Chen", "Yuankun Chen", "Yujie Chen", "Yutian Chen", "Zhirong Chen", "Dazhi Cheng", "Yean Cheng", "Jialei Cui", "Jingbing Cui", "Anqi Dai", "Jiaqi Deng", "Hao Ding", "Rui Ding", "Shaofeng Ding", "Mengfan Dong", "Mengnan Dong", "Yuhao Dong", "Yuxin Dong", "Angang Du", "Chenzhuang Du", "Dikang Du", "Jusen Du", "Yulun Du", "Yu Fan", "Jing Feng", "Qiulin Feng", "Yichen Feng", "Kelin Fu", "Qiang Fu", "Fuxuan Gao", "Hongcheng Gao", "Jingyue Gao", "Tong Gao", "Weijia Gao", "Shangyi Geng", "Jie Gong", "Linhu Gong", "Shengao Gong", "Xiaochen Gong", "Qizheng Gu", "Yicheng Gu", "Shuhao Guan", "Haiqing Guo", "Shiqi Guo", "Xiang Guo", "Zhengyan Guo", "Beixi Hao", "Wenxin Hao", "Xiaoru Hao", "Dailan He", "Haotian He", "Lehan He", "Qi He", "Weiran He", "Xinran He", "Xinyi He", "Yibo He", "Yunjia He", "Chao Hong", "Tiange Hong", "Hao Hu", "Jiaxi Hu", "Ruikun Hu", "Weiming Hu", "Yangyang Hu", "Zhenxing Hu", "Liang Hua", "Jinbin Huang", "Ke Huang", "Ruiyuan Huang", "Siying Huang", "Weixiao Huang", "Yan Huang", "Zhengjie Huang", "Zhiqi Huang", "Yulong Hui", "Chaobo Jia", "Yutong Jiang", "Zhejun Jiang", "Zuoyou Jiang", "Wenyi Jin", "Xinyi Jin", "Yu Jing", "Huanjun Kong", "Guokun Lai", "Aidi Li", "Cheng Li", "Chengyuan Li", "Cong Li", "Fang Li", "Guanyu Li", "Haoyang Li", "Jia Li", "Junxiong Li", "Lei Li", "Letian Li", "Lincan Li", "Weihong Li", "Wentao Li", "Xintong Li", "Yang Li", "Yishen Li", "Yiwei Li", "Yuxiao Li", "Zhaowei Li", "Zhaoxi Li", "Zheming Li", "Zhengxiao Li", "Zhiyuan Li", "Jiawei Lin", "Xiaohan Lin", "Yibo Lin", "Zichao Lin", "Ziyan Lin", "Bill Liu", "Boxiao Liu", "Chuan Liu", "Liang Liu", "Shaowei Liu", "Shudong Liu", "Shuran Liu", "Tianwei Liu", "Weizhou Liu", "Yangyang Liu", "Yanming Liu", "Yibo Liu", "Yipeng Liu", "Zhengying Liu", "Zhiheng Liu", "Enzhe Lu", "Haoyu Lu", "Linqiang Lu", "Tingzhan Lu", "Zhiyuan Lu", "Aotian Luo", "G. Luo", "Junyu Luo", "Yifan Luo", "B. Lyu", "Wenzhou Lyu", "Shaoguang Mao", "Yuan Mei", "Xin Men", "Minqing Ni", "Yixuan Niu", "Siyuan Pan", "Shujun Peng", "Zhangyang Qi", "Ruoyu Qin", "ZeChao Qin", "Zeyu Qin", "Haiquan Qiu", "Jianxin Qiu", "Jiezhong Qiu", "Bowen Qu", "Yuhao Qu", "Zeyu Shang", "Youbo Shao", "Han Shen", "Jincheng Shi", "Juanfeng Shi", "Lidong Shi", "Shengyuan Shi", "Wingchun Siu", "Pengwei Song", "Xiaoxi Song", "Jianlin Su", "Yunfeng Su", "Zhaochen Su", "Lin Sui", "Jingsong Sun", "Junyao Sun", "Shaoning Sun", "Shuzhe Sun", "Tongyu Sun", "Yujun Sun", "Yunpeng Tai", "Chuning Tang", "Heyi Tang", "Sirui Tang", "Zecheng Tang", "Chaoran Tian", "Rongpeng Tian", "Yu Tian", "Wei Tu", "Chensi Wang", "Chuang Wang", "Chunjie Wang", "Dinglu Wang", "Feng Wang", "Hailong Wang", "Haiming Wang", "Hao Wang", "Hao Wang", "Huaqing Wang", "Hui Wang", "Jiayi Wang", "Jinglong Wang", "Jinhong Wang", "Jiuzheng Wang", "Linian Wang", "Shaobo Wang", "Shenzhi Wang", "Shuyi Wang", "Si Wang", "Siyuan Wang", "Tianfu Wang", "Wenjue Wang", "Xingran Wang", "Xinmei Wang", "Xinyuan Wang", "Xusheng Wang", "Yalin Wang", "Yangkun Wang", "Yao Wang", "Yaoyu Wang", "Yejie Wang", "Yiqin Wang", "Yucheng Wang", "Yuzhi Wang", "Zhaoji Wang", "Zhaowei Wang", "Zhengtao Wang", "Zhenhao Wang", "Zhongsheng Wang", "Zifan Wang", "Chu Wei", "Ming Wei", "Shouxin Wei", "Zichen Wen", "Fan Wu", "Haoning Wu", "Rucong Wu", "Wenhao Wu", "Xiaoxue Wu", "Yingcong Wu", "Yongqi Wu", "Yuxin Wu", "Zijian Wu", "Xinglang Xian", "Chenxuan Xiang", "Yuye Xiang", "Bocheng Xiao", "Chenjun Xiao", "Xin Xiao", "Jin Xie", "Xiaotong Xie", "Yifeng Xie", "Zhe Xie", "Bowei Xing", "Yiming Xiong", "Baosheng Xu", "Boyu Xu", "Jiale Xu", "Jianfan Xu", "Jing Xu", "Jinjing Xu", "L. H. Xu", "Qingtao Xu", "Shuyao Xu", "Suting Xu", "Tiantian Xu", "Tianxiang Xu", "Weixin Xu", "Xinran Xu", "Yangchuan Xu", "Ye Xu", "Yueni Xu", "Ziyao Xu", "Haonan Xue", "Junjie Yan", "Yaoyao Yan", "Fan Yang", "Guangyao Yang", "Hao Yang", "Junwei Yang", "Ruoyu Yang", "Wenjie Yang", "Xiaofei Yang", "Xinyu Yang", "Yi Yang", "Yiling Yang", "Ying Yang", "Yuchen Yang", "Zhen Yang", "Zhilin Yang", "Zian Yang", "Zuhao Yang", "Haotian Yao", "Dan Ye", "Haoran Ye", "Wenjie Ye", "Zhanbo Ye", "Bohong Yin", "Haoxiang Yin", "Xietong Yin", "Chengzhen Yu", "Haozhen Yu", "Longhui Yu", "Shengnan Yu", "Shuying Yu", "Tianxiang Yu", "Enming Yuan", "Mengjie Yuan", "Tongtian Yue", "Wei Yue", "Yang Yue", "Dunyuan Zha", "Haobing Zhan", "B. H. Zhang", "Dehao Zhang", "Fei Zhang", "Hao Zhang", "Haoyuan Zhang", "Huanyu Zhang", "Jiapei Zhang", "Jiaxuan Zhang", "Jin Zhang", "Kaiyi Zhang", "Miaozhen Zhang", "Puqi Zhang", "Qinglei Zhang", "Rong Zhang", "Rui Zhang", "Shaoshuai Zhang", "Shiyi Zhang", "Xiaobin Zhang", "Xiaoyun Zhang", "Y. Zhang", "Yangkun Zhang", "Ye Zhang", "Yichi Zhang", "Yikun Zhang", "Yizhi Zhang", "Yongting Zhang", "Yu Zhang", "Yutao Zhang", "Yutong Zhang", "Zheng Zhang", "Zijing Zhang", "Bin Zhao", "Chenguang Zhao", "Feifan Zhao", "Jinglun Zhao", "Jinxiang Zhao", "Shuai Zhao", "Wenshuo Zhao", "Xiangyu Zhao", "Xuanle Zhao", "Yikai Zhao", "Zijia Zhao", "Haozhi Zheng", "Huabin Zheng", "Ruihan Zheng", "Shaojie Zheng", "Tengyang Zheng", "Haofeng Zhong", "Lei Zhong", "Longguang Zhong", "M. Zhou", "Qiankang Zhou", "Runjie Zhou", "Ruozhang Zhou", "Xinyu Zhou", "Yiqiao Zhou", "Zaida Zhou", "Jinguo Zhu", "Liya Zhu", "Xinhao Zhu", "Yangjunfeng Zhu", "Yuxuan Zhu", "Zhen Zhu", "Chen Zhuang", "Weiyu Zhuang", "Xinxing Zu"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2607.24653"
    pdf: "https://arxiv.org/pdf/2607.24653v2"
    license: "http://creativecommons.org/licenses/by-nc-nd/4.0/"
card: 
  task: "Open frontier LLM for long-horizon coding, agentic, reasoning and vision tasks"
  method: "2.8T MoE (104B active) with Kimi Delta Attention, Attention Residuals and Stable LatentMoE (16 of 896 experts); multi-domain RL incl. million-token agentic RL"
  data: "Long-horizon coding, agentic, knowledge, reasoning and vision evaluations"
  result: "~2.5× scaling efficiency over Kimi K2; frontier-level, behind the top proprietary models but ahead of other models in the authors' suite, per the abstract"
draft: false
date: "2026-07-28"
---

## Problem

Pushing open-weight models to the frontier: very large scale, long context, native vision and strong agentic behaviour.

## Method

**Kimi K3** is a **2.8T-parameter** Mixture-of-Experts model with **104B** activated parameters, **native vision** and a **1M-token** context window. Architectural pieces:

- **Kimi Delta Attention** and **Attention Residuals**, to improve information flow across sequence length and depth
- **Stable LatentMoE**, activating **16 of 896** routed experts per token

Post-training uses RL across general, agentic and coding domains at multiple reasoning-effort levels, including **million-token agentic RL** with persistent rollout and sandbox states. Infrastructure work covers kernel co-design, balanced expert-parallel training and deployment.

## Key results

From the abstract:

- about **2.5×** better overall scaling efficiency than **Kimi K2**
- frontier-level performance on long-horizon coding, agentic, knowledge, reasoning and vision tasks
- **still trails** the most powerful proprietary models, which the abstract names as Claude Fable 5 and GPT-5.6 Sol, while consistently outperforming the other open and proprietary models in the authors' suite
- full weights released

## Limitations

The abstract itself states the main one: it isn't at the level of the strongest proprietary models. The licence on the paper text (CC BY-NC-ND) means its figures can't be reused here.
