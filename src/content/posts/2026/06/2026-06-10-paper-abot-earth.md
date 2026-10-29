---
title: "Paper summary: ABot-Earth 0.5: Generative 3D Earth Model"
categories: ["papers"]
tags: ["cv", "3d", "gaussian-splatting"]
summary: "ABot-Earth 0.5 generates large, seamless 3D Gaussian Splatting environments from satellite images alone, at under 10 minutes per square kilometre, viewable in web map engines and usable as a simulator for UAV navigation."
sources: 
  - title: "ABot-Earth 0.5: Generative 3D Earth Model (arXiv:2606.09967)"
    url: "https://arxiv.org/abs/2606.09967"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:43.862Z"
  - title: "Hugging Face Daily Papers, 2026-06-10"
    url: "https://huggingface.co/papers?date=2026-06-10"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:35:53.299Z"
  - title: "ABot-Earth 0.5: Generative 3D Earth Model (arXiv HTML full text)"
    url: "https://arxiv.org/html/2606.09967"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:52:43.862Z"
highlights: ["A generative model works directly in the 3D Gaussian Splatting representation, conditioned only on satellite imagery.", "Hierarchical level-of-detail lets the 3D cities stream in real time on web map engines."]
papers: 
  - title: "ABot-Earth 0.5: Generative 3D Earth Model"
    authors: ["Ming Qian", "Tianjian Ouyang", "Mingchao Sun", "Zijian Wang", "Jincheng Xiong", "Jiarong Han", "Yongchang Zhang", "Jiawei Zhang", "Xu Wang", "Yu Liu", "Luyang Tang", "Fei Yu", "Zengye Ge", "Mengmeng Du", "Yuan Liu", "Nianfei Fan", "Song Wang", "Yingliang Peng", "Chunxue Jia", "Yang Liu", "Shiying Zeng", "Haozhe Shi", "Junnan Lai", "Hongyu Pan", "Zheng Wu", "Ning Guo", "Mu Xu", "Hang Zhang"]
    year: 2026
    arxiv: "https://arxiv.org/abs/2606.09967"
    pdf: "https://arxiv.org/pdf/2606.09967v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2026/paper-2606.09967.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2606.09967\">Qian et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : We are unveiling ABot-Earth 0.5 , a generative 3D Earth model. Our official launch showcases an evolving 3DGS world spanning over 300 cities across 190+ countries, with continuous global expansion."
images: 
  - src: "images/2026/paper-2606.09967.webp"
    alt: "Figure from the paper \"ABot-Earth 0.5: Generative 3D Earth Model\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2606.09967\">Qian et al. (2026)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1 : We are unveiling ABot-Earth 0.5 , a generative 3D Earth model. Our official launch showcases an evolving 3DGS world spanning over 300 cities across 190+ countries, with continuous global expansion."
card: 
  task: "Generating large-scale 3D environments from satellite imagery"
  method: "Generative model in 3DGS representation trained on real urban reconstructions; hierarchical LOD for web rendering"
  data: "Real-world urban reconstructions; satellite imagery at inference"
  result: "Under 10 minutes per km²; launch showcase covering 300+ cities in 190+ countries, per the paper"
draft: false
date: "2026-06-10"
---

## Problem

Building realistic 3D models of whole cities usually takes expensive capture and reconstruction. Simulation for embodied AI (drones, robots) needs such environments at scale.

## Method

**ABot-Earth 0.5** is a **generative model formulated directly in 3D Gaussian Splatting** (the 2023 3DGS paper is the first one summarised on this blog). It's trained on many existing real-world **urban reconstructions** to learn realistic geometry and textures. At inference it generates new 3D scenes **conditioned only on satellite imagery**. A hierarchical **level-of-detail** structure allows real-time viewing on web map engines.

## Key results

From the abstract and Figure 1:

- synthesis at **under 10 minutes per square kilometre**, with high realism
- a launch showcase spanning **300+ cities in 190+ countries**
- used as a simulation sandbox that narrows the sim-to-real gap, for example in **closed-loop UAV navigation**

## Limitations

There's no dedicated limitations section in the extracted text. Generated geometry is a plausible reconstruction from overhead imagery, not a survey-grade capture.
