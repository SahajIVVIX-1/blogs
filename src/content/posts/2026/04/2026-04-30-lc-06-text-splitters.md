---
title: "LangChain · Text splitters"
categories: ["study"]
tags: ["langchain", "chunking", "rag"]
summary: "Why documents are split into chunks for retrieval, how RecursiveCharacterTextSplitter tries paragraph, then sentence, then word boundaries, and what chunk size and overlap do."
sources: 
  - title: "LangChain reference: RecursiveCharacterTextSplitter"
    url: "https://python.langchain.com/api_reference/text_splitters/character/langchain_text_splitters.character.RecursiveCharacterTextSplitter.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain docs: Text splitters"
    url: "https://docs.langchain.com/oss/python/integrations/splitters"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Lewis et al. (2020), Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: "https://arxiv.org/abs/2005.11401"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Chunks need to be small enough to retrieve precisely but large enough to make sense alone.", "The recursive splitter tries the largest natural boundary first (paragraphs) and only falls back to smaller ones when a piece is still too long."]
phase: 13
step: 6
draft: false
date: "2026-04-30"
---

Long documents are split into **chunks** before embedding, because:

- an embedding of a whole book blurs everything together, while a chunk embedding is specific
- retrieved text has to fit in the model's context, next to the question

**`RecursiveCharacterTextSplitter`** tries separators in order (`"\n\n"`, `"\n"`, `" "`, `""`). It splits on paragraphs first, and only splits a piece further if it's still longer than `chunk_size`. **`chunk_overlap`** repeats a bit of text between neighbouring chunks, so a sentence cut at a boundary still appears whole in one of them.

The trade-off: small chunks are precise but lose context, and big chunks keep context but retrieve less precisely. My Multi-Agent-RAG project solves this with small child chunks for search and bigger parent chunks for the answer.

```python run
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

text = (
    "Phase 11 covered Transformers. Self-attention lets every token look at every other token.\n\n"
    "Phase 12 covered LLMs. Pre-training predicts the next token on huge corpora. "
    "Instruction tuning and preference optimisation turn a base model into an assistant.\n\n"
    "Phase 13 covers LangChain. Documents are loaded, split into chunks, embedded and stored for retrieval."
)
for size, overlap in [(200, 0), (80, 0), (80, 20)]:
    splitter = RecursiveCharacterTextSplitter(chunk_size=size, chunk_overlap=overlap)
    chunks = splitter.split_text(text)
    print(f"\nchunk_size={size}, overlap={overlap}: {len(chunks)} chunks, lengths {[len(c) for c in chunks]}")
    for c in chunks[:3]:
        print("   |", c.replace("\n", " ")[:90])

docs = RecursiveCharacterTextSplitter(chunk_size=120, chunk_overlap=0).split_documents(
    [Document(page_content=text, metadata={"source": "notes.md"})])
print("\nmetadata is copied to every chunk:", {d.metadata["source"] for d in docs}, len(docs), "chunks")
```

Output:

```text

chunk_size=200, overlap=0: 3 chunks, lengths [89, 160, 102]
   | Phase 11 covered Transformers. Self-attention lets every token look at every other token.
   | Phase 12 covered LLMs. Pre-training predicts the next token on huge corpora. Instruction t
   | Phase 13 covers LangChain. Documents are loaded, split into chunks, embedded and stored fo

chunk_size=80, overlap=0: 7 chunks, lengths [76, 12, 76, 72, 10, 76, 25]
   | Phase 11 covered Transformers. Self-attention lets every token look at every
   | other token.
   | Phase 12 covered LLMs. Pre-training predicts the next token on huge corpora.

chunk_size=80, overlap=20: 7 chunks, lengths [76, 32, 76, 75, 36, 76, 42]
   | Phase 11 covered Transformers. Self-attention lets every token look at every
   | token look at every other token.
   | Phase 12 covered LLMs. Pre-training predicts the next token on huge corpora.

metadata is copied to every chunk: {'notes.md'} 4 chunks
```
