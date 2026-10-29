---
title: "LLMs · Instruction tuning"
categories: ["study"]
tags: ["llm", "instruction-tuning", "sft"]
summary: "Supervised fine-tuning on instruction–response pairs turns a base model into an assistant; comparing SmolLM2-135M base and instruct on the same question, and masking the loss to the response."
sources: 
  - title: "Ouyang et al. (2022), Training language models to follow instructions with human feedback"
    url: "https://arxiv.org/abs/2203.02155"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Wei et al. (2021), Finetuned Language Models Are Zero-Shot Learners (FLAN)"
    url: "https://arxiv.org/abs/2109.01652"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Hugging Face TRL: SFT Trainer"
    url: "https://huggingface.co/docs/trl/sft_trainer"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["A base model continues text; an instruction-tuned model answers it.", "During SFT the loss is usually computed only on the response tokens, not on the prompt."]
phase: 12
step: 6
draft: false
date: "2026-02-04"
---

A pre-trained **base** model is a document continuer. Ask it a question, and it might write more questions. **Instruction tuning** (supervised fine-tuning, SFT) trains it further on (instruction, response) pairs, so it learns to answer. FLAN (Wei et al., 2021) showed that tuning on many tasks phrased as instructions improves zero-shot performance on unseen tasks. InstructGPT (Ouyang et al., 2022) used SFT as the first step before RLHF.

A key detail: the **loss mask**. The prompt tokens are given, so only the **response** tokens are trained on. In code, the prompt positions get the label −100, which PyTorch's cross-entropy ignores.

I compared **SmolLM2-135M** (base) with **SmolLM2-135M-Instruct** from Hugging Face on the same question, then built a masked SFT example by hand.

```python run
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
torch.set_num_threads(4)

q = "What is a Python list?"
for name in ["HuggingFaceTB/SmolLM2-135M", "HuggingFaceTB/SmolLM2-135M-Instruct"]:
    tok = AutoTokenizer.from_pretrained(name)
    m = AutoModelForCausalLM.from_pretrained(name).eval()
    if "Instruct" in name:
        ids = tok.apply_chat_template([{"role": "user", "content": q}], add_generation_prompt=True, return_tensors="pt", return_dict=True)["input_ids"]
    else:
        ids = tok(q, return_tensors="pt").input_ids
    with torch.no_grad():
        out = m.generate(ids, max_new_tokens=40, do_sample=False, pad_token_id=tok.eos_token_id)
    print(f"{name.split('/')[1]:>22}: {tok.decode(out[0, ids.shape[1]:], skip_special_tokens=True).strip()[:160]!r}")

# a masked SFT example: labels are -100 on the prompt so only the answer is learned
prompt = tok.apply_chat_template([{"role": "user", "content": q}], add_generation_prompt=True, tokenize=False)
answer = "A list is an ordered, mutable collection of items.<|im_end|>"
p_ids, a_ids = tok(prompt).input_ids, tok(answer).input_ids
input_ids = torch.tensor([p_ids + a_ids]); labels = torch.tensor([[-100] * len(p_ids) + a_ids])
loss = m(input_ids=input_ids, labels=labels).loss
print(f"prompt tokens {len(p_ids)}, answer tokens {len(a_ids)}, trained positions {(labels != -100).sum().item()}, loss {loss.item():.3f}")
```

Output:

```text
          SmolLM2-135M: 'A Python list is a collection of items that are stored in a single variable. It is similar to a list in other programming languages, but it is more flexible and'
 SmolLM2-135M-Instruct: 'A Python list is a collection of items that can be of any data type, including strings, integers, floats, and other lists. It is a dynamic data structure that c'
prompt tokens 36, answer tokens 13, trained positions 13, loss 2.526
```

This example didn't show the contrast I expected. On a simple definition question, the 135M base model also produced an answer-like continuation, probably because similar Q&A text appears in its pre-training data. The difference between base and instruct is clearer on multi-turn chats and on instructions about format, which is what the chat template and SFT data target.
