---
title: "Paper summary: Kandinsky: an Improved Text-to-Image Synthesis with Image Prior and Latent Diffusion"
categories: ["papers"]
tags: ["genai", "diffusion", "text-to-image"]
summary: "Kandinsky combines a separately trained image prior, which maps CLIP text embeddings to CLIP image embeddings, with latent diffusion and a modified MoVQ autoencoder: 3.3B parameters, open weights."
sources: 
  - title: "Kandinsky: an Improved Text-to-Image Synthesis with Image Prior and Latent Diffusion (arXiv:2310.03502)"
    url: "https://arxiv.org/abs/2310.03502"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:09.036Z"
  - title: "Hugging Face Daily Papers, 2023-10-06"
    url: "https://huggingface.co/papers?date=2023-10-06"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:25:33.947Z"
  - title: "Kandinsky: an Improved Text-to-Image Synthesis with Image Prior and Latent Diffusion (arXiv HTML full text)"
    url: "https://arxiv.org/html/2310.03502"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:38:09.036Z"
  - title: "Code repository"
    url: "https://github.com/ai-forever/Kandinsky-2"
    publisher: "GitHub"
    fetched_at: "2026-10-29T15:38:09.036Z"
highlights: ["A separate image prior turns a CLIP text embedding into a CLIP image embedding, which then conditions latent diffusion.", "The authors report FID 8.03 on COCO-30K, the best among open-source models at the time."]
papers: 
  - title: "Kandinsky: an Improved Text-to-Image Synthesis with Image Prior and Latent Diffusion"
    authors: ["Anton Razzhigaev", "Arseniy Shakhmatov", "Anastasia Maltseva", "Vladimir Arkhipkin", "Igor Pavlov", "Ilya Ryabov", "Angelina Kuts", "Alexander Panchenko", "Andrey Kuznetsov", "Denis Dimitrov"]
    year: 2023
    arxiv: "https://arxiv.org/abs/2310.03502"
    pdf: "https://arxiv.org/pdf/2310.03502v1"
    code: "https://github.com/ai-forever/Kandinsky-2"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2023/paper-2310.03502.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2310.03502\">Razzhigaev et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Image prior scheme and inference regimes of the Kandinsky model."
images: 
  - src: "images/2023/paper-2310.03502.webp"
    alt: "Figure from the paper \"Kandinsky: an Improved Text-to-Image Synthesis with Image Prior and Latent Diffusion\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2310.03502\">Razzhigaev et al. (2023)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: Image prior scheme and inference regimes of the Kandinsky model."
card: 
  task: "Text-to-image generation (plus fusion, variations, inpainting/outpainting)"
  method: "Image prior (text→CLIP image embedding) + latent diffusion + modified MoVQ image autoencoder; 3.3B parameters"
  data: "Evaluated on COCO-30K"
  result: "FID 8.03 on COCO-30K, reported as top open-source result"
draft: false
date: "2023-10-06"
---

## Problem

Diffusion models generate images either directly in pixel space or in a compressed latent space. The question here is how to combine the strengths of an "image prior" design (as in DALL·E 2) with efficient latent diffusion, and release it openly.

## Method

The Kandinsky model described in the paper has three parts:

1. An **image prior**, trained separately, that maps a CLIP *text* embedding to a CLIP *image* embedding.
2. A **latent diffusion** model that generates image latents conditioned on that embedding.
3. A modified **MoVQ** autoencoder that decodes latents to pixels.

The whole system has **3.3B parameters**. A demo supports text-to-image, image fusion, variations, and text-guided inpainting and outpainting. Code and checkpoints are released.

## Key results

The paper reports an **FID of 8.03 on COCO-30K**, which the authors describe as the top measured result among open-source models at that time.

## Limitations

From the authors' own section: the images look natural, but semantic coherence between text and image can be improved, as can absolute FID and human-judged image quality.
