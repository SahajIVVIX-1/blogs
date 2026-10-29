---
title: "LangChain · LangSmith"
categories: ["study"]
tags: ["langchain", "observability", "evaluation"]
summary: "What LangSmith records (traces of every run, with inputs, outputs, latency and errors) and how it's enabled; locally I captured the same run tree with a callback handler, without sending anything to a hosted service."
sources: 
  - title: "LangSmith documentation"
    url: "https://docs.langchain.com/langsmith/home"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangSmith: Observability quickstart"
    url: "https://docs.langchain.com/langsmith/observability-quickstart"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain reference: BaseCallbackHandler"
    url: "https://python.langchain.com/api_reference/core/callbacks/langchain_core.callbacks.base.BaseCallbackHandler.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A trace is a tree of runs: the chain, and inside it the prompt, the model call and the parser, each with inputs, outputs and timing.", "LangSmith is turned on with environment variables; no code changes are needed for LangChain apps."]
phase: 13
step: 10
draft: false
date: "2026-05-25"
---

**LangSmith** is LangChain's hosted platform for **tracing**, **debugging** and **evaluating** LLM apps. Every call becomes a **trace**: a tree of runs (chain → prompt → model → parser), each with inputs, outputs, latency, token counts and errors. On top of traces it supports datasets and evaluations, so a prompt change can be checked against saved examples.

According to the docs, tracing for LangChain apps is switched on with environment variables:

```text
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=<your key>
LANGSMITH_PROJECT=<project name>   # optional
```

I didn't send anything to a hosted service for this post. Instead, I captured the **same run tree** locally with a callback handler. That's the hook LangChain uses to report runs, and it shows what a trace contains.

```python run
import time
from langchain_core.callbacks import BaseCallbackHandler
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.language_models.fake_chat_models import FakeListChatModel

class Tracer(BaseCallbackHandler):
    def __init__(self): self.events, self.t0 = [], {}
    def on_chain_start(self, serialized, inputs, *, run_id, parent_run_id=None, **kw):
        self.t0[run_id] = time.perf_counter(); self.events.append(("chain start", kw.get("name"), str(inputs)[:50], parent_run_id is not None))
    def on_chain_end(self, outputs, *, run_id, **kw):
        self.events.append(("chain end", None, str(outputs)[:50], f"{(time.perf_counter() - self.t0[run_id]) * 1000:.1f} ms"))
    def on_chat_model_start(self, serialized, messages, *, run_id, **kw):
        self.events.append(("model start", serialized.get("name"), messages[0][-1].content[:50], None))
    def on_llm_end(self, response, *, run_id, **kw):
        self.events.append(("model end", None, response.generations[0][0].text[:50], None))

chain = (ChatPromptTemplate.from_template("One line on {topic}.")
         | FakeListChatModel(responses=["LangSmith records a tree of runs for every call."])
         | StrOutputParser())
tracer = Tracer()
result = chain.invoke({"topic": "tracing"}, config={"callbacks": [tracer], "run_name": "explain-chain", "tags": ["blog"]})
for kind, name, payload, extra in tracer.events:
    print(f"{kind:<11} {str(name or ''):<22} {payload!r:<55} {extra if extra is not None else ''}")
print("\nresult:", result)
```

Output:

```text
chain start explain-chain          "{'topic': 'tracing'}"                                  False
chain start ChatPromptTemplate     "{'topic': 'tracing'}"                                  True
chain end                          "messages=[HumanMessage(content='One line on tracin"    0.4 ms
model start FakeListChatModel      'One line on tracing.'                                  
model end                          'LangSmith records a tree of runs for every call.'      
chain start StrOutputParser        "content='LangSmith records a tree of runs for ever"    True
chain end                          'LangSmith records a tree of runs for every call.'      0.5 ms
chain end                          'LangSmith records a tree of runs for every call.'      3.0 ms

result: LangSmith records a tree of runs for every call.
```

That ends the LangChain phase. Generative AI comes next. My Modern-DCGAN reproduction repo from March fits right into it.
