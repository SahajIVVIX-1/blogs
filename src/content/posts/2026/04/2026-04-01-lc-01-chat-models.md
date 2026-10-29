---
title: "LangChain · Chat models"
categories: ["study"]
tags: ["langchain", "llm"]
summary: "LangChain's chat-model interface: messages in, an AIMessage out, the same invoke/stream/batch methods for every provider, shown with a local Hugging Face model and a fake model for tests."
sources: 
  - title: "LangChain docs: Models"
    url: "https://docs.langchain.com/oss/python/langchain/models"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain docs: Messages"
    url: "https://docs.langchain.com/oss/python/langchain/messages"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "langchain-huggingface integration"
    url: "https://docs.langchain.com/oss/python/integrations/providers/huggingface"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Every chat model in LangChain speaks the same interface: a list of messages in, an AIMessage out.", "Swapping providers changes one line; the rest of the app stays the same."]
phase: 13
step: 1
draft: false
date: "2026-04-01"
---

Phase 13 is LangChain. It's a framework that puts a common interface over models, prompts, retrievers and tools, so they can be composed into applications.

The base unit is a **chat model**:

- input: a list of **messages** (`SystemMessage`, `HumanMessage`, `AIMessage`, `ToolMessage`)
- output: an **`AIMessage`** (content plus metadata such as token usage)
- methods every model shares: `invoke`, `stream`, `batch` (and async versions)

Normally you'd plug in a hosted provider with an API key. I don't use one on this blog, so I wrapped a **local** Hugging Face model (Qwen2.5-0.5B-Instruct) with `langchain-huggingface`. For tests I used `GenericFakeChatModel`, which returns pre-set answers, so code paths can be checked without any model at all.

```python run
import torch
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.language_models.fake_chat_models import GenericFakeChatModel
from langchain_huggingface import HuggingFacePipeline, ChatHuggingFace
torch.set_num_threads(4)

llm = HuggingFacePipeline.from_model_id(
    model_id="Qwen/Qwen2.5-0.5B-Instruct", task="text-generation",
    pipeline_kwargs={"max_new_tokens": 40, "do_sample": False, "return_full_text": False})
chat = ChatHuggingFace(llm=llm)

messages = [SystemMessage("Answer in one short sentence."), HumanMessage("What does a Python list store?")]
reply = chat.invoke(messages)
print(type(reply).__name__, "->", reply.content.strip())

fake = GenericFakeChatModel(messages=iter(["A list stores an ordered collection of items."]))
print("fake model:", fake.invoke(messages).content)
print("streamed chunks:", [c.content for c in GenericFakeChatModel(messages=iter(["one two three"])).stream("hi")])
```

Output:

```text
AIMessage -> A Python list stores multiple items of the same type, which can be accessed and modified using indexing.
fake model: A list stores an ordered collection of items.
streamed chunks: ['one', ' ', 'two', ' ', 'three']
```

The plumbing works, but read the real model's answer carefully. It says a list stores items "of the same type", which is wrong for Python: lists can mix types, as my [August 2023 lists note](/2023/08/24/python-06-lists/) shows. A 0.5B model is fine for testing the interface, but its answers need checking. That's also why the RAG post grounds answers in retrieved text.
