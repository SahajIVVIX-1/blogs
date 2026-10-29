---
title: "LangChain · Vector stores"
categories: ["study"]
tags: ["langchain", "embeddings", "vector-search"]
summary: "Embedding chunks with a local sentence-transformer, storing them in LangChain's InMemoryVectorStore, similarity search with scores, metadata filters, and turning the store into a retriever."
sources: 
  - title: "LangChain reference: InMemoryVectorStore"
    url: "https://python.langchain.com/api_reference/core/vectorstores/langchain_core.vectorstores.in_memory.InMemoryVectorStore.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain docs: Vector stores"
    url: "https://docs.langchain.com/oss/python/integrations/vectorstores"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "langchain-huggingface: HuggingFaceEmbeddings"
    url: "https://python.langchain.com/api_reference/huggingface/embeddings/langchain_huggingface.embeddings.huggingface.HuggingFaceEmbeddings.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A vector store keeps (embedding, document) pairs and returns the documents whose embeddings are nearest to the query's.", "as_retriever() turns the store into a Runnable that plugs straight into a chain."]
phase: 13
step: 7
draft: false
date: "2026-05-06"
---

The embeddings post from March, in LangChain form:

- **Embeddings** object: `embed_documents(texts)` and `embed_query(text)`. I use `HuggingFaceEmbeddings` with **all-MiniLM-L6-v2**, running locally.
- **Vector store**: stores each chunk's vector plus its Document, and answers nearest-neighbour queries. `InMemoryVectorStore` is perfect for learning. Real apps use Qdrant, Chroma, FAISS, pgvector and so on (my Multi-Agent-RAG project uses Qdrant).
- `similarity_search_with_score` returns documents with their cosine scores.
- **Metadata filters** narrow the search, e.g. to one phase.
- `as_retriever()` wraps it as a Runnable for chains.

```python run
from langchain_core.documents import Document
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

emb = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
docs = [
    Document("Gradient descent steps opposite the gradient to reduce the loss.", metadata={"phase": 7}),
    Document("Dropout zeroes random activations to reduce overfitting.", metadata={"phase": 8}),
    Document("Word2vec learns word vectors by predicting context words.", metadata={"phase": 9}),
    Document("U-Net uses skip connections to keep fine detail in segmentation.", metadata={"phase": 10}),
    Document("Multi-head attention runs several attention heads in parallel.", metadata={"phase": 11}),
    Document("LoRA trains a small low-rank update while freezing the base weights.", metadata={"phase": 12}),
]
store = InMemoryVectorStore.from_documents(docs, emb)
print("vector size:", len(emb.embed_query("test")))

for doc, score in store.similarity_search_with_score("how to stop a network memorising training data", k=2):
    print(f"{score:.3f}  phase {doc.metadata['phase']}: {doc.page_content}")

only_12 = store.similarity_search("cheap fine-tuning", k=1, filter=lambda d: d.metadata["phase"] == 12)
print("filtered:", only_12[0].page_content)

retriever = store.as_retriever(search_kwargs={"k": 1})
print("retriever:", type(retriever).__name__, "->", retriever.invoke("pixel-level masks")[0].page_content)
```

Output:

```text
vector size: 384
0.360  phase 10: U-Net uses skip connections to keep fine detail in segmentation.
0.293  phase 8: Dropout zeroes random activations to reduce overfitting.
filtered: LoRA trains a small low-rank update while freezing the base weights.
retriever: VectorStoreRetriever -> Dropout zeroes random activations to reduce overfitting.
```

This run is a good reminder that embedding similarity isn't understanding. For the overfitting question, the U-Net sentence scored highest (0.360) and Dropout came second (0.293). "pixel-level masks" retrieved the Dropout sentence instead of U-Net. With only six short sentences and a small embedding model, scores are close and noisy. Real systems retrieve more candidates and then **rerank** them, for example with a cross-encoder, as my Multi-Agent-RAG project does.
