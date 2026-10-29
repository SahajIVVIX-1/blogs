---
title: "Paper summary: Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone"
categories: ["papers"]
tags: ["llm", "small-models"]
summary: "phi-3-mini is a 3.8B model trained on 3.3T tokens of heavily filtered web and synthetic data, reported to reach 69% on MMLU while being small enough to run on a phone."
sources: 
  - title: "Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (arXiv:2404.14219)"
    url: "https://arxiv.org/abs/2404.14219"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:09.559Z"
  - title: "Hugging Face Daily Papers, 2024-04-23"
    url: "https://huggingface.co/papers?date=2024-04-23"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:35.616Z"
highlights: ["The phi recipe again bets on data quality: heavily filtered public web data plus synthetic data.", "The report also introduces 7B and 14B variants and a phi-3.5 series, including an MoE and a vision model."]
papers: 
  - title: "Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone"
    authors: ["Marah Abdin", "Jyoti Aneja", "Hany Awadalla", "Ahmed Awadallah", "Ammar Ahmad Awan", "Nguyen Bach", "Amit Bahree", "Arash Bakhtiari", "Jianmin Bao", "Harkirat Behl", "Alon Benhaim", "Misha Bilenko", "Johan Bjorck", "Sébastien Bubeck", "Martin Cai", "Qin Cai", "Vishrav Chaudhary", "Dong Chen", "Dongdong Chen", "Weizhu Chen", "Yen-Chun Chen", "Yi-Ling Chen", "Hao Cheng", "Parul Chopra", "Xiyang Dai", "Matthew Dixon", "Ronen Eldan", "Victor Fragoso", "Jianfeng Gao", "Mei Gao", "Min Gao", "Amit Garg", "Allie Del Giorno", "Abhishek Goswami", "Suriya Gunasekar", "Emman Haider", "Junheng Hao", "Russell J. Hewett", "Wenxiang Hu", "Jamie Huynh", "Dan Iter", "Sam Ade Jacobs", "Mojan Javaheripi", "Xin Jin", "Nikos Karampatziakis", "Piero Kauffmann", "Mahoud Khademi", "Dongwoo Kim", "Young Jin Kim", "Lev Kurilenko", "James R. Lee", "Yin Tat Lee", "Yuanzhi Li", "Yunsheng Li", "Chen Liang", "Lars Liden", "Xihui Lin", "Zeqi Lin", "Ce Liu", "Liyuan Liu", "Mengchen Liu", "Weishung Liu", "Xiaodong Liu", "Chong Luo", "Piyush Madan", "Ali Mahmoudzadeh", "David Majercak", "Matt Mazzola", "Caio César Teodoro Mendes", "Arindam Mitra", "Hardik Modi", "Anh Nguyen", "Brandon Norick", "Barun Patra", "Daniel Perez-Becker", "Thomas Portet", "Reid Pryzant", "Heyang Qin", "Marko Radmilac", "Liliang Ren", "Gustavo de Rosa", "Corby Rosset", "Sambudha Roy", "Olatunji Ruwase", "Olli Saarikivi", "Amin Saied", "Adil Salim", "Michael Santacroce", "Shital Shah", "Ning Shang", "Hiteshi Sharma", "Yelong Shen", "Swadheen Shukla", "Xia Song", "Masahiro Tanaka", "Andrea Tupini", "Praneetha Vaddamanu", "Chunyu Wang", "Guanhua Wang", "Lijuan Wang", "Shuohang Wang", "Xin Wang", "Yu Wang", "Rachel Ward", "Wen Wen", "Philipp Witte", "Haiping Wu", "Xiaoxia Wu", "Michael Wyatt", "Bin Xiao", "Can Xu", "Jiahang Xu", "Weijian Xu", "Jilong Xue", "Sonali Yadav", "Fan Yang", "Jianwei Yang", "Yifan Yang", "Ziyi Yang", "Donghan Yu", "Lu Yuan", "Chenruidong Zhang", "Cyril Zhang", "Jianwen Zhang", "Li Lyna Zhang", "Yi Zhang", "Yue Zhang", "Yunan Zhang", "Xiren Zhou"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2404.14219"
    pdf: "https://arxiv.org/pdf/2404.14219v4"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2024/paper-2404.14219.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2404.14219\">Abdin et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Toy illustration of the blocksparse attention in phi-3-small with 2 local blocks and vertical stride of 3. The table shows the Keys/values a query token in block 8 attended to. Blue =local blocks, orange …"
images: 
  - src: "images/2024/paper-2404.14219.webp"
    alt: "Figure from the paper \"Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2404.14219\">Abdin et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : Toy illustration of the blocksparse attention in phi-3-small with 2 local blocks and vertical stride of 3. The table shows the Keys/values a query token in block 8 attended to. Blue =local blocks, orange …"
card: 
  task: "Capable small language models for on-device use"
  method: "3.8B Transformer trained on 3.3T tokens of filtered web + synthetic data; aligned for safety and chat; larger 7B/14B and phi-3.5 variants"
  data: "Scaled-up phi-2 data recipe; academic benchmarks and internal tests"
  result: "phi-3-mini: 69% MMLU, 8.38 MT-bench; phi-3-small/medium: 75%/78% MMLU, per the abstract"
draft: false
date: "2024-04-23"
---

## Problem

Following phi-1.5 (summarised in September 2023), the question is how capable a model small enough for a **phone** can be.

## Method

**phi-3-mini** has **3.8 billion parameters** and is trained on **3.3 trillion tokens**. The data scales up the phi-2 recipe: **heavily filtered public web data** plus **synthetic data**. The model is then aligned for robustness, safety and chat format. The report adds:

- **phi-3-small** (7B) and **phi-3-medium** (14B), trained on 4.8T tokens
- a **phi-3.5** series: phi-3.5-mini, **phi-3.5-MoE** (16 × 3.8B experts, 6.6B active) and **phi-3.5-Vision**

## Key results

As reported in the abstract:

- phi-3-mini: **69% on MMLU** and **8.38 on MT-bench**, which the authors compare with Mixtral 8x7B and GPT-3.5
- phi-3-small / phi-3-medium: **75% / 78%** MMLU and **8.7 / 8.9** MT-bench

## Limitations

The extracted text has no dedicated limitations section. Benchmark comparisons rely partly on "internal testing", as the abstract says. The report itself notes that phi-3-mini is fundamentally limited by its size for some tasks: it doesn't have the capacity to store much factual knowledge (visible in its lower TriviaQA score), which the authors suggest can be offset by pairing it with a search engine.
