---
title: "LLMs · Evaluation"
categories: ["study"]
tags: ["llm", "evaluation", "benchmarks"]
summary: "How LLMs are evaluated: perplexity, multiple-choice benchmarks scored by log-likelihood, exact match, LLM-as-a-judge, and the contamination problem, with a tiny log-likelihood multiple-choice eval on GPT-2."
sources: 
  - title: "Hendrycks et al. (2020), Measuring Massive Multitask Language Understanding (MMLU)"
    url: "https://arxiv.org/abs/2009.03300"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "EleutherAI lm-evaluation-harness"
    url: "https://github.com/EleutherAI/lm-evaluation-harness"
    publisher: "GitHub"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Zheng et al. (2023), Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
    url: "https://arxiv.org/abs/2306.05685"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
  - title: "Liang et al. (2022), Holistic Evaluation of Language Models (HELM)"
    url: "https://arxiv.org/abs/2211.09110"
    publisher: "arXiv"
    fetched_at: "2026-10-29T22:02:17.540Z"
highlights: ["Many multiple-choice benchmarks are scored by which answer option the model assigns the highest likelihood, not by free-form generation.", "A benchmark leaked into training data stops measuring generalisation."]
phase: 12
step: 12
draft: false
date: "2026-03-18"
---

Reading the paper summaries on this blog, every model report quotes benchmark numbers. How are they measured?

| method | what it measures | example |
|---|---|---|
| perplexity | how well the model predicts held-out text | language-modelling evals |
| log-likelihood multiple choice | which option gets the highest (length-normalised) likelihood | MMLU-style tasks in lm-evaluation-harness |
| exact match / pass@k | is the generated answer or code correct | GSM8K, HumanEval |
| LLM-as-a-judge | a strong model rates or compares answers | MT-Bench (Zheng et al., 2023) |
| human preference | people compare outputs | Chatbot Arena |

Pitfalls: **contamination** (test questions in the training data), sensitivity to prompt format, and judges that favour longer answers. HELM (Liang et al., 2022) argues for evaluating many metrics across many scenarios, not one score.

I wrote a tiny **log-likelihood multiple-choice** eval with five hand-written questions on GPT-2 small, comparing summed and length-normalised log-probabilities.

```python run
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

tok = AutoTokenizer.from_pretrained("gpt2")
m = AutoModelForCausalLM.from_pretrained("gpt2").eval()

questions = [
    ("The capital of France is", [" Paris", " Berlin", " a large river in Asia"], 0),
    ("Water freezes at a temperature of zero degrees", [" Celsius", " Kelvin", " per second"], 0),
    ("The opposite of hot is", [" cold", " hotter", " the colour of the evening sky"], 0),
    ("A week has seven", [" days", " legs", " planets in a row"], 0),
    ("Python is a popular programming", [" language", " snake", " restaurant in the city"], 0),
]

def option_logprob(prompt, option):
    p = tok(prompt).input_ids; o = tok(option).input_ids
    ids = torch.tensor([p + o])
    with torch.no_grad():
        logp = m(ids).logits[0, :-1].log_softmax(-1)
    tgt = ids[0, 1:]
    lp = logp[torch.arange(len(tgt)), tgt][len(p) - 1:]
    return lp.sum().item(), lp.mean().item()

for mode, k in [("sum", 0), ("length-normalised", 1)]:
    correct = sum(max(range(len(opts)), key=lambda j: option_logprob(q, opts[j])[k]) == ans for q, opts, ans in questions)
    print(f"{mode:>18}: {correct}/{len(questions)} correct")
```

Output:

```text
               sum: 5/5 correct
 length-normalised: 5/5 correct
```

Five questions is a toy, of course. Real harnesses run thousands of items, fix the prompt format, and report it, because small format changes can move scores.
