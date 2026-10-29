---
title: "Agentic AI · Tool and function calling"
categories: ["study"]
tags: ["agents", "tools", "function-calling"]
summary: "Structured tool calling with a real local model: Python functions become JSON schemas, Qwen2.5-0.5B-Instruct emits tool calls through its chat template, and the app parses and executes them, including one wrong call."
sources: 
  - title: "Hugging Face: Tool use / function calling with chat templates"
    url: "https://huggingface.co/docs/transformers/chat_extras"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Qwen documentation: Function calling"
    url: "https://qwen.readthedocs.io/en/latest/framework/function_call.html"
    publisher: "Qwen"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "LangChain docs: Tools"
    url: "https://docs.langchain.com/oss/python/langchain/tools"
    publisher: "LangChain"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["The model never runs code: it emits a structured request (tool name plus JSON arguments) that the application validates and executes.", "A small model picked the right tool for maths and weather, but also called the weather tool for a question that needed no tool."]
phase: 15
step: 3
draft: false
date: "2026-08-21"
---

ReAct parses free text. Modern models support **structured tool calling** instead:

1. Each tool is described by a **JSON schema**: name, description, typed parameters. Hugging Face can build it from a Python function's signature and docstring.
2. The schemas go into the prompt through the model's **chat template**.
3. The model replies with a **tool call**: the tool name plus JSON arguments. Qwen wraps it in `<tool_call>` tags.
4. The app **parses**, **validates** and **executes** it, and sends the result back as a `tool` message.

I ran **Qwen2.5-0.5B-Instruct** locally with two tools. The third question needs no tool, which is a good test of judgement.

```python run
import json, re, torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers.utils import get_json_schema
torch.set_num_threads(4)

def get_weather(city: str) -> str:
    """Get the current weather for a city.

    Args:
        city: Name of the city.
    """
    return f"(weather service not connected) asked for {city}"

def multiply(a: float, b: float) -> float:
    """Multiply two numbers.

    Args:
        a: First number.
        b: Second number.
    """
    return a * b

TOOLS = {"get_weather": get_weather, "multiply": multiply}
print(json.dumps(get_json_schema(multiply)["function"]["parameters"]))

name = "Qwen/Qwen2.5-0.5B-Instruct"
tok = AutoTokenizer.from_pretrained(name); m = AutoModelForCausalLM.from_pretrained(name).eval()
for q in ["What is 23.5 times 4?", "What's the weather in Gandhinagar?", "Tell me a fun fact about owls."]:
    ids = tok.apply_chat_template([{"role": "user", "content": q}], tools=list(TOOLS.values()),
                                  add_generation_prompt=True, return_tensors="pt", return_dict=True)["input_ids"]
    with torch.no_grad():
        out = m.generate(ids, max_new_tokens=60, do_sample=False)
    text = tok.decode(out[0, ids.shape[1]:], skip_special_tokens=True)
    print(f"\nQ: {q}\nmodel: {text.strip()!r}")
    for call in re.findall(r"<tool_call>\s*(\{.*?\})\s*</tool_call>", text, re.S):
        c = json.loads(call)
        if c["name"] in TOOLS:
            print(f"  -> app executes {c['name']}({c['arguments']}) = {TOOLS[c['name']](**c['arguments'])!r}")
```

Output:

```text
{"type": "object", "properties": {"a": {"type": "number", "description": "First number."}, "b": {"type": "number", "description": "Second number."}}, "required": ["a", "b"]}

Q: What is 23.5 times 4?
model: '<tool_call>\n{"name": "multiply", "arguments": {"a": 23.5, "b": 4}}\n</tool_call>'
  -> app executes multiply({'a': 23.5, 'b': 4}) = 94.0

Q: What's the weather in Gandhinagar?
model: '<tool_call>\n{"name": "get_weather", "arguments": {"city": "Gandhinagar"}}\n</tool_call>'
  -> app executes get_weather({'city': 'Gandhinagar'}) = '(weather service not connected) asked for Gandhinagar'

Q: Tell me a fun fact about owls.
model: '<tool_call>\n{"name": "get_weather", "arguments": {"city": "New York"}}\n</tool_call>'
  -> app executes get_weather({'city': 'New York'}) = '(weather service not connected) asked for New York'
```

Two of three are right. The owl question shows why a real app needs guards: a policy for when tools are allowed, argument validation, and confirmation for side effects. A 0.5B model is also far weaker at this than the large models agents normally use.
