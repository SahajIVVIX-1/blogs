---
title: "Built this: NLP Document Search Engine"
categories: ["projects"]
tags: ["nlp", "information-retrieval", "tf-idf"]
summary: "A Gradio app for classical document search: NLTK preprocessing, a TF-IDF vector space model with cosine ranking, term-level explanations and a lexical-matching comparison mode."
sources: 
  - title: "SahajIVVIX-1/NLP-Based-Search (GitHub)"
    url: "https://github.com/SahajIVVIX-1/NLP-Based-Search"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit c69c8a2"
    url: "https://github.com/SahajIVVIX-1/NLP-Based-Search/commit/c69c8a2"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["Results are explainable down to the term: the app shows which words contributed how much to each document's score.", "A comparison mode puts TF-IDF cosine ranking next to plain keyword matching."]
draft: false
date: "2026-10-11"
---

On 11 October 2026 I committed an **NLP document search engine** for a college NLP course showcase, built with Gradio (and set up for Hugging Face Spaces).

## Features

From the README:

- upload `.txt` and `.pdf` documents (parsed with **PyMuPDF**), or use the 8 preloaded sample documents
- an NLTK pipeline (tokenisation, normalisation, stop-word removal, Porter stemming) with a step-by-step inspector
- a **TF-IDF vector space model** with smoothed IDF and L2 normalisation, ranked by **cosine similarity**, top-K configurable
- **term-level explainability**: which terms drove each ranking
- a comparison mode between **TF-IDF** and plain **lexical matching**
- corpus analytics, SHA-256 de-duplication, a query history log, and error handling for empty queries, scanned PDFs and out-of-vocabulary terms

The README also discusses the theoretical limits of lexical search, and dense embeddings and hybrid search as future work.

## Where it connects

It's my [bag of words and TF-IDF](/2025/05/20/nlp-03-bow-tfidf/) notes turned into a real search tool, and the "future work" section points toward the [embeddings](/2026/03/25/llm-13-embeddings/) and [RAG](/2026/05/13/lc-08-rag/) material from 2026.
