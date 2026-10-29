---
title: "LLMs · Decoding: greedy, beam, sampling"
categories: ["study"]
tags: ["llm", "decoding", "generation"]
summary: "How a model's next-token probabilities become text: greedy, beam search, temperature, top-k and top-p sampling, compared on GPT-2."
sources: 
  - title: "Hugging Face: Generation strategies"
    url: "https://huggingface.co/docs/transformers/generation_strategies"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Holtzman et al. (2019), The Curious Case of Neural Text Degeneration"
    url: "https://arxiv.org/abs/1904.09751"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Hugging Face blog: How to generate text"
    url: "https://huggingface.co/blog/how-to-generate"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["The model only gives probabilities; the decoding strategy decides what text you actually get.", "Temperature reshapes the distribution: below 1 sharpens it, above 1 flattens it."]
phase: 12
step: 4
draft: false
date: "2026-01-21"
---

At each step the model outputs a probability for every token in the vocabulary. **Decoding** turns that into text:

| strategy | idea | tends to give |
|---|---|---|
| greedy | take the argmax every step | safe but often repetitive |
| beam search | keep the k best partial sequences | higher likelihood, still bland |
| temperature | divide the logits by T before the softmax | T < 1 sharper, T > 1 more random |
| top-k | sample only from the k most likely tokens | cuts the long tail |
| top-p (nucleus) | sample from the smallest set with probability ≥ p | adapts the cut-off to the model's confidence |

Holtzman et al. (2019) showed that maximising likelihood (greedy or beam) leads to repetitive, "degenerate" text. That motivated nucleus sampling.

```python run
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

tok = AutoTokenizer.from_pretrained("gpt2")
m = AutoModelForCausalLM.from_pretrained("gpt2").eval()
ids = tok("The best way to learn programming is", return_tensors="pt").input_ids

def gen(**kw):
    torch.manual_seed(0)
    out = m.generate(ids, max_new_tokens=25, pad_token_id=tok.eos_token_id, **kw)
    return tok.decode(out[0, ids.shape[1]:]).replace("\n", " ")

print("greedy :", gen(do_sample=False))
print("beam=4 :", gen(do_sample=False, num_beams=4))
print("T=0.7  :", gen(do_sample=True, temperature=0.7, top_k=0))
print("top-k  :", gen(do_sample=True, top_k=40))
print("top-p  :", gen(do_sample=True, top_p=0.9, top_k=0))

with torch.no_grad():
    logits = m(ids).logits[0, -1]
for T in (0.5, 1.0, 2.0):
    p = (logits / T).softmax(-1)
    print(f"T={T}: top token prob {p.max():.3f}, tokens needed for 90% mass: {(p.sort(descending=True).values.cumsum(0) < 0.9).sum().item() + 1}")
```

Output:

```text
greedy :  to learn how to use the language.  The best way to learn programming is to learn how to use the language.
beam=4 :  to learn how to code.  The best way to learn programming is to learn how to code. The best way to
T=0.7  :  to study it. You need to know how the system works, how to write it and how to use it. But that
top-k  :  to study it. You need to know how the system works, how to write, and how to use it to build something
top-p  :  to study it. You need to know "why" and the reason that the program does something important. It does something important
T=0.5: top token prob 0.942, tokens needed for 90% mass: 1
T=1.0: top token prob 0.575, tokens needed for 90% mass: 28
T=2.0: top token prob 0.028, tokens needed for 90% mass: 20207
```
