---
title: "LangChain · LangGraph"
categories: ["study"]
tags: ["langgraph", "agents", "workflows"]
summary: "LangGraph models an application as a state machine: typed state, nodes that update it, and conditional edges, used here to build a small corrective-retrieval loop that rewrites the query when retrieval looks weak."
sources: 
  - title: "LangGraph documentation"
    url: "https://docs.langchain.com/oss/python/langgraph/overview"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangGraph: Graph API"
    url: "https://docs.langchain.com/oss/python/langgraph/graph-api"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Yan et al. (2024), Corrective Retrieval Augmented Generation"
    url: "https://arxiv.org/abs/2401.15884"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A LangGraph app is a graph: nodes are functions that update a shared state, and edges (including conditional ones) decide what runs next.", "Loops are allowed, which is what agent-style \"try, check, retry\" workflows need."]
phase: 13
step: 9
draft: false
date: "2026-05-19"
---

LCEL chains are straight pipelines. Real applications often need **loops and branches**: retrieve, check whether it's good enough, rewrite the query, try again. **LangGraph** models that as a graph:

- **State**: a typed dict that every node reads and updates
- **Nodes**: plain functions `state -> partial update`
- **Edges**: fixed (`a → b`) or **conditional** (a function picks the next node)
- `compile()` turns it into a Runnable

My example is a stripped-down version of the **Corrective RAG** idea (Yan et al., 2024) that my Multi-Agent-RAG project uses: retrieve, grade, and if the best score is low, rewrite the query and retrieve again, at most twice. The "rewrite" here is a simple rule, to keep the graph logic in focus.

```python run
from typing import TypedDict
from langchain_core.documents import Document
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langgraph.graph import StateGraph, START, END

store = InMemoryVectorStore.from_documents([
    Document("Dropout zeroes random activations during training to reduce overfitting."),
    Document("Batch normalisation normalises each feature over the mini-batch."),
    Document("LoRA learns a low-rank update while freezing pretrained weights."),
], HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"))

class State(TypedDict):
    query: str
    attempts: int
    best_score: float
    answer: str

def retrieve(state):
    doc, score = store.similarity_search_with_score(state["query"], k=1)[0]
    print(f"  retrieve(attempt {state['attempts'] + 1}): {state['query']!r} -> score {score:.3f}")
    return {"best_score": score, "answer": doc.page_content, "attempts": state["attempts"] + 1}

def grade(state):
    if state["best_score"] >= 0.5: return "good"
    return "rewrite" if state["attempts"] < 2 else "give_up"

SYNONYMS = {"memorising": "overfitting", "stuff": "activations"}
def rewrite(state):
    q = " ".join(SYNONYMS.get(w, w) for w in state["query"].split())
    return {"query": q}

def give_up(state):
    return {"answer": "I could not find a confident match."}

g = StateGraph(State)
g.add_node("retrieve", retrieve); g.add_node("rewrite", rewrite); g.add_node("give_up", give_up)
g.add_edge(START, "retrieve")
g.add_conditional_edges("retrieve", grade, {"good": END, "rewrite": "rewrite", "give_up": "give_up"})
g.add_edge("rewrite", "retrieve"); g.add_edge("give_up", END)
app = g.compile()

for q in ["how does dropout work", "my net keeps memorising stuff", "best pizza in Gandhinagar"]:
    print(f"\nquestion: {q}")
    out = app.invoke({"query": q, "attempts": 0, "best_score": 0.0, "answer": ""})
    print(f"  final ({out['attempts']} attempts): {out['answer']}")
```

Output:

```text

question: how does dropout work
  retrieve(attempt 1): 'how does dropout work' -> score 0.501
  final (1 attempts): Dropout zeroes random activations during training to reduce overfitting.

question: my net keeps memorising stuff
  retrieve(attempt 1): 'my net keeps memorising stuff' -> score 0.215
  retrieve(attempt 2): 'my net keeps overfitting activations' -> score 0.452
  final (2 attempts): I could not find a confident match.

question: best pizza in Gandhinagar
  retrieve(attempt 1): 'best pizza in Gandhinagar' -> score 0.020
  retrieve(attempt 2): 'best pizza in Gandhinagar' -> score 0.020
  final (2 attempts): I could not find a confident match.
```

The graph logic works as designed: one retrieval when the score is good, a rewrite-and-retry when it's weak, and a clear give-up message. The rewrite did help the second question (0.215 → 0.452), but it still fell just under my 0.5 threshold, so the graph gave up instead of returning a borderline answer. Where to set that threshold is a real design decision: too high refuses good answers, too low returns weak ones.
