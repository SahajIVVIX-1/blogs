---
title: "LLMs · Prompting"
categories: ["study"]
tags: ["llm", "prompting"]
summary: "Zero-shot, few-shot and structured prompts with a small instruction-tuned model (Qwen2.5-0.5B-Instruct), chat templates, and why output format instructions matter."
sources: 
  - title: "Hugging Face: Chat templates"
    url: "https://huggingface.co/docs/transformers/chat_templating"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Brown et al. (2020), Language Models are Few-Shot Learners"
    url: "https://arxiv.org/abs/2005.14165"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Qwen/Qwen2.5-0.5B-Instruct model card"
    url: "https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Instruction-tuned models expect a chat template: system and user turns wrapped in special tokens.", "Few-shot examples show the model the exact format you want, which often matters more than clever wording."]
phase: 12
step: 5
draft: false
date: "2026-01-28"
---

**Prompting** is programming the model with text. Techniques I tried:

- **Zero-shot**: just ask.
- **Few-shot** (in-context learning, as in the GPT-3 paper): show a few input → output examples first.
- **Structure**: a clear role (system message), explicit constraints, and a required output format such as JSON.
- **Chat templates**: instruction-tuned models were trained on conversations wrapped in special tokens, and `apply_chat_template` builds that format for you.

I used **Qwen2.5-0.5B-Instruct**, small enough for a CPU, with greedy decoding so the output is reproducible. A model this small is easy to confuse, which makes the effect of prompt structure easier to see.

```python run
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
torch.set_num_threads(4)

name = "Qwen/Qwen2.5-0.5B-Instruct"
tok = AutoTokenizer.from_pretrained(name)
m = AutoModelForCausalLM.from_pretrained(name, torch_dtype=torch.float32).eval()

def ask(messages, n=60):
    ids = tok.apply_chat_template(messages, add_generation_prompt=True, return_tensors="pt", return_dict=True)["input_ids"]
    with torch.no_grad():
        out = m.generate(ids, max_new_tokens=n, do_sample=False)
    return tok.decode(out[0, ids.shape[1]:], skip_special_tokens=True).strip()

print(repr(tok.apply_chat_template([{"role": "user", "content": "Hi"}], tokenize=False, add_generation_prompt=True)))

review = "The lectures were long, but the labs were brilliant."
print("zero-shot:", ask([{"role": "user", "content": f"Sentiment of: {review}"}]))

few = [
    {"role": "system", "content": "Classify sentiment. Reply with exactly one word: positive, negative or mixed."},
    {"role": "user", "content": "The food was cold and the service slow."}, {"role": "assistant", "content": "negative"},
    {"role": "user", "content": "Great camera, terrible battery."}, {"role": "assistant", "content": "mixed"},
    {"role": "user", "content": review},
]
print("few-shot :", ask(few, 5))
print("json     :", ask([{"role": "system", "content": "Extract fields as compact JSON with keys course and year. Output only JSON."},
                         {"role": "user", "content": "I joined the B.Tech ICT programme at PDEU in 2023."}], 40))
```

Output:

````text
'<|im_start|>system\nYou are Qwen, created by Alibaba Cloud. You are a helpful assistant.<|im_end|>\n<|im_start|>user\nHi<|im_end|>\n<|im_start|>assistant\n'
zero-shot: The sentiment expressed in this statement is positive and appreciative. The speaker seems to appreciate both the length of the lectures and the quality of the labs they attended. They use phrases like "brilliant" to describe the labs, indicating that they found them impressive or outstanding. Overall, the tone suggests
few-shot : positive
json     : ```json
{
  "course": "B.Tech ICT",
  "year": "2023"
}
```
````

The structure helped, but the small model still made mistakes. Zero-shot, it misread the review (it took "long lectures" as praise). Few-shot, it followed the one-word format, but answered "positive" where the examples point to "mixed". For the JSON task it extracted the right fields, but wrapped the answer in a Markdown code fence and gave the year as a string, despite "Output only JSON". With a model this size, I'd still validate and parse the output, not trust it.
