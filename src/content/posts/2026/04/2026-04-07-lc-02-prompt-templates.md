---
title: "LangChain · Prompt templates"
categories: ["study"]
tags: ["langchain", "prompting"]
summary: "ChatPromptTemplate for reusable prompts with variables, message placeholders for history, and few-shot examples, all producing message lists ready for any chat model."
sources: 
  - title: "LangChain reference: ChatPromptTemplate"
    url: "https://python.langchain.com/api_reference/core/prompts/langchain_core.prompts.chat.ChatPromptTemplate.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain reference: MessagesPlaceholder"
    url: "https://python.langchain.com/api_reference/core/prompts/langchain_core.prompts.chat.MessagesPlaceholder.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain reference: FewShotChatMessagePromptTemplate"
    url: "https://python.langchain.com/api_reference/core/prompts/langchain_core.prompts.few_shot.FewShotChatMessagePromptTemplate.html"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A prompt template is a function from variables to a list of messages.", "MessagesPlaceholder leaves a slot where a whole conversation history can be inserted."]
phase: 13
step: 2
draft: false
date: "2026-04-07"
---

Hard-coding prompts as f-strings gets messy quickly. **`ChatPromptTemplate`** keeps the structure separate from the values:

- each message is a (role, template) pair with `{variables}`
- `.invoke({...})` fills the variables and returns a `ChatPromptValue` (a list of messages)
- **`MessagesPlaceholder`** marks where a list of messages (chat history) goes
- **`FewShotChatMessagePromptTemplate`** expands example pairs into user/assistant turns, the few-shot idea from my prompting post

Templates are **Runnables**, so they compose with models using `|`. That's the next post.

```python run
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder, FewShotChatMessagePromptTemplate
from langchain_core.messages import HumanMessage, AIMessage

tutor = ChatPromptTemplate.from_messages([
    ("system", "You are a patient tutor for {subject}. Answer in at most {n} sentences."),
    MessagesPlaceholder("history"),
    ("human", "{question}"),
])
value = tutor.invoke({
    "subject": "Python", "n": 2,
    "history": [HumanMessage("What is a list?"), AIMessage("An ordered, mutable collection.")],
    "question": "And a tuple?",
})
for m in value.to_messages():
    print(f"{m.type:>6}: {m.content}")
print("variables:", sorted(tutor.input_variables))

examples = [{"q": "2+2", "a": "4"}, {"q": "3*5", "a": "15"}]
few = FewShotChatMessagePromptTemplate(
    examples=examples, example_prompt=ChatPromptTemplate.from_messages([("human", "{q}"), ("ai", "{a}")]))
calc = ChatPromptTemplate.from_messages([("system", "Reply with the number only."), few, ("human", "{q}")])
print([f"{m.type}:{m.content}" for m in calc.invoke({"q": "7-4"}).to_messages()])
```

Output:

```text
system: You are a patient tutor for Python. Answer in at most 2 sentences.
 human: What is a list?
    ai: An ordered, mutable collection.
 human: And a tuple?
variables: ['history', 'n', 'question', 'subject']
['system:Reply with the number only.', 'human:2+2', 'ai:4', 'human:3*5', 'ai:15', 'human:7-4']
```
