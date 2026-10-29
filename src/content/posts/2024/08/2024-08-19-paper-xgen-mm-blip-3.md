---
title: "Paper summary: xGen-MM (BLIP-3): A Family of Open Large Multimodal Models"
categories: ["papers"]
tags: ["multimodal", "open-source"]
summary: "BLIP-3 (xGen-MM) is Salesforce's open framework for large multimodal models (datasets, recipe, architecture and models), releasing 4B and 14B base and instruction-tuned models that handle interleaved image–text input."
sources: 
  - title: "xGen-MM (BLIP-3): A Family of Open Large Multimodal Models (arXiv:2408.08872)"
    url: "https://arxiv.org/abs/2408.08872"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:53.604Z"
  - title: "Hugging Face Daily Papers, 2024-08-19"
    url: "https://huggingface.co/papers?date=2024-08-19"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:28:47.592Z"
  - title: "xGen-MM (BLIP-3): A Family of Open Large Multimodal Models (arXiv HTML full text)"
    url: "https://arxiv.org/html/2408.08872"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:42:53.604Z"
highlights: ["The release is the whole recipe: curated datasets, training method and models, not just weights.", "The models can take interleaved images and text, including multi-image inputs."]
papers: 
  - title: "xGen-MM (BLIP-3): A Family of Open Large Multimodal Models"
    authors: ["Le Xue", "Manli Shu", "Anas Awadalla", "Jun Wang", "An Yan", "Senthil Purushwalkam", "Honglu Zhou", "Viraj Prabhu", "Yutong Dai", "Michael S Ryoo", "Shrikant Kendre", "Jieyu Zhang", "Shaoyen Tseng", "Gustavo A Lujan-Moreno", "Matthew L Olson", "Musashi Hinck", "David Cobbley", "Vasudev Lal", "Can Qin", "Shu Zhang", "Chia-Chih Chen", "Ning Yu", "Juntao Tan", "Tulika Manoj Awalgaonkar", "Shelby Heinecke", "Huan Wang", "Yejin Choi", "Ludwig Schmidt", "Zeyuan Chen", "Silvio Savarese", "Juan Carlos Niebles", "Caiming Xiong", "Ran Xu"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2408.08872"
    pdf: "https://arxiv.org/pdf/2408.08872v4"
    license: "http://creativecommons.org/licenses/by-sa/4.0/"
cover: "images/2024/paper-2408.08872.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2408.08872\">Xue et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by-sa/4.0/\">CC BY-SA 4.0</a>. Figure 1 : We introduce BLIP-3, a framework (b) for developing Large Multimodal Models (LMMs). Our framework improves upon BLIP-2 (a) [ 42 ] by (1) increasing the richness, scale, and diversity of training data, (2) …"
images: 
  - src: "images/2024/paper-2408.08872.webp"
    alt: "Figure from the paper \"xGen-MM (BLIP-3): A Family of Open Large Multimodal Models\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2408.08872\">Xue et al. (2024)</a>, licensed <a href=\"http://creativecommons.org/licenses/by-sa/4.0/\">CC BY-SA 4.0</a>. Figure 1 : We introduce BLIP-3, a framework (b) for developing Large Multimodal Models (LMMs). Our framework improves upon BLIP-2 (a) [ 42 ] by (1) increasing the richness, scale, and diversity of training data, (2) …"
card: 
  task: "Open framework for large multimodal models"
  method: "Curated datasets, training recipe and architecture improving on BLIP-2; 4B and 14B models"
  data: "Three new large-scale datasets plus preprocessed existing ones"
  result: "Competitive with open LMMs of similar size on single- and multi-image benchmarks, per the abstract"
draft: false
date: "2024-08-19"
---

## Problem

Open multimodal models often come without the data and recipes needed to rebuild or improve them.

## Method

**BLIP-3**, also called **xGen-MM**, is presented as an **open framework**: curated datasets, a training recipe, model architectures and a suite of models. Figure 1 compares it with BLIP-2: richer, larger and more diverse training data, plus other design changes. The authors release **4B and 14B** models, both pre-trained base and instruction-tuned.

## Key results

From the abstract: competitive performance among open-source LMMs of similar size, evaluated on single- and multi-image benchmarks, with the ability to understand **interleaved image–text** input. Training code, models and all datasets, including three new large-scale ones, are to be open-sourced.

## Limitations

There's no dedicated limitations section in the extracted text. The claim is competitiveness at a given size, not state of the art overall.
