---
title: "Paper summary: SmolDocling: An ultra-compact vision-language model for end-to-end multi-modal document conversion"
categories: ["papers"]
tags: ["multimodal", "documents", "small-models"]
summary: "SmolDocling is a 256M-parameter vision-language model that converts whole document pages end to end into DocTags, a markup capturing content, structure and location of every element."
sources: 
  - title: "SmolDocling: An ultra-compact vision-language model for end-to-end multi-modal document conversion (arXiv:2503.11576)"
    url: "https://arxiv.org/abs/2503.11576"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:06.186Z"
  - title: "Hugging Face Daily Papers, 2025-03-17"
    url: "https://huggingface.co/papers?date=2025-03-17"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:30:55.397Z"
  - title: "SmolDocling: An ultra-compact vision-language model for end-to-end multi-modal document conversion (arXiv HTML full text)"
    url: "https://arxiv.org/html/2503.11576"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:46:06.186Z"
highlights: ["One tiny model replaces a pipeline of specialised models: layout, tables, code, equations and charts all come out as DocTags.", "It's reported to compete with VLMs up to 27 times larger."]
papers: 
  - title: "SmolDocling: An ultra-compact vision-language model for end-to-end multi-modal document conversion"
    authors: ["Ahmed Nassar", "Andres Marafioti", "Matteo Omenetti", "Maksym Lysak", "Nikolaos Livathinos", "Christoph Auer", "Lucas Morin", "Rafael Teixeira de Lima", "Yusik Kim", "A. Said Gurbuz", "Michele Dolfi", "Miquel Farré", "Peter W. J. Staar"]
    year: 2025
    arxiv: "https://arxiv.org/abs/2503.11576"
    pdf: "https://arxiv.org/pdf/2503.11576v1"
    license: "http://creativecommons.org/licenses/by/4.0/"
cover: "images/2025/paper-2503.11576.webp"
cover_credit: "Figure from <a href=\"https://arxiv.org/abs/2503.11576\">Nassar et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: SmolDocling/SmolVLM architecture. SmolDocling converts images of document pages to DocTags sequences. First, input images are encoded using a vision encoder and reshaped via projection and pooling. Then, the …"
images: 
  - src: "images/2025/paper-2503.11576.webp"
    alt: "Figure from the paper \"SmolDocling: An ultra-compact vision-language model for end-to-end multi-modal document conversion\""
    credit: "Figure from <a href=\"https://arxiv.org/abs/2503.11576\">Nassar et al. (2025)</a>, licensed <a href=\"http://creativecommons.org/licenses/by/4.0/\">CC BY 4.0</a>. Figure 1: SmolDocling/SmolVLM architecture. SmolDocling converts images of document pages to DocTags sequences. First, input images are encoded using a vision encoder and reshaped via projection and pooling. Then, the …"
card: 
  task: "End-to-end document conversion (pages to structured markup)"
  method: "256M-parameter VLM (SmolVLM-based) generating DocTags markup with element locations"
  data: "Diverse documents (business, academic, technical, patents, forms); new datasets for charts, tables, equations, code"
  result: "Competes with VLMs up to 27× larger with much lower compute, per the abstract"
draft: false
date: "2025-03-17"
---

## Problem

Converting documents (PDF pages, scans) into structured text usually relies on either huge foundation models or **pipelines of specialised models** (layout detection, OCR, table recognition…), each with its own failure modes.

## Method

**SmolDocling** is a **256M-parameter** vision-language model built on SmolVLM (Figure 1 shows the architecture). It reads a page image and generates **DocTags**, a new markup format that records every page element (text, tables, code, equations, charts, lists) along with its **location** and context. The authors also contribute new public datasets for charts, tables, equations and code recognition.

## Key results

From the abstract: robust reproduction of code listings, tables, equations, charts and lists across business documents, academic papers, technical reports, patents and forms. It competes with VLMs **up to 27× larger**, with much lower compute.

## Limitations

There's no dedicated limitations section in the extracted text. At the time of the abstract, the datasets were announced as "available soon".
