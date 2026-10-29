---
title: "LangChain · Chains and LCEL"
categories: ["study"]
tags: ["langchain", "lcel"]
summary: "The LangChain Expression Language: composing Runnables with |, parallel branches, passthroughs, output parsers, and the invoke/batch/stream methods every chain inherits."
sources: 
  - title: "LangChain reference: Runnable interface"
    url: "https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.Runnable.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain reference: RunnableParallel"
    url: "https://python.langchain.com/api_reference/core/runnables/langchain_core.runnables.base.RunnableParallel.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain reference: StrOutputParser"
    url: "https://python.langchain.com/api_reference/core/output_parsers/langchain_core.output_parsers.string.StrOutputParser.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["With LCEL, prompt", "model", "parser is itself a Runnable, so it gets invoke, batch and stream for free.", "RunnableParallel runs several branches on the same input and returns a dict."]
phase: 13
step: 3
draft: false
date: "2026-04-13"
---

Everything in LangChain (prompts, models, parsers, retrievers) is a **Runnable** with the same methods: `invoke`, `batch`, `stream`. **LCEL** composes them:

- `a | b` makes a **RunnableSequence**: the output of a becomes the input of b
- a dict, or `RunnableParallel`, runs several branches on the same input
- `RunnablePassthrough` passes the input through unchanged, handy for adding keys
- `RunnableLambda` wraps any Python function
- **output parsers** turn an `AIMessage` into a string, JSON and so on

I used a fake chat model so the output is fixed and the plumbing is easy to see. A real model drops in without changing the chain.

```python run
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.language_models.fake_chat_models import FakeListChatModel

prompt = ChatPromptTemplate.from_template("Explain {topic} in one line.")
model = FakeListChatModel(responses=["Attention lets each token look at every other token.",
                                     "Dropout zeroes random activations during training."])
chain = prompt | model | StrOutputParser()
print(type(chain).__name__, "->", chain.invoke({"topic": "attention"}))
print("batch:", chain.batch([{"topic": "dropout"}]))

word_count = RunnableLambda(lambda s: len(s.split()))
both = RunnableParallel(text=chain, topic=RunnablePassthrough() | RunnableLambda(lambda d: d["topic"].upper()))
model.i = 0
out = both.invoke({"topic": "attention"})
print(out, "| words:", word_count.invoke(out["text"]))

json_model = FakeListChatModel(responses=['{"phase": 13, "name": "LangChain"}'])
print((json_model | JsonOutputParser()).invoke("give json"))
print("chain steps:", [type(s).__name__ for s in chain.steps])
```

Output:

```text
RunnableSequence -> Attention lets each token look at every other token.
batch: ['Dropout zeroes random activations during training.']
{'text': 'Attention lets each token look at every other token.', 'topic': 'ATTENTION'} | words: 9
{'phase': 13, 'name': 'LangChain'}
chain steps: ['ChatPromptTemplate', 'FakeListChatModel', 'StrOutputParser']
```
