---
title: "TRL 0.8: KTOTrainer, command-line interfaces and FSDP with QLoRA"
categories: ["ai"]
tags: ["hugging-face", "trl", "kto", "qlora", "fsdp"]
summary: "TRL v0.8.0 adds the KTOTrainer, command-line interfaces for SFT, DPO and chat, and SFTTrainer support for FSDP and DeepSpeed ZeRO-3 combined with QLoRA."
sources: 
  - title: "v0.8.0: KTOTrainer, TRL CLIs, QLoRA + FSDP !"
    url: "https://github.com/huggingface/trl/releases/tag/v0.8.0"
    publisher: "GitHub · huggingface/trl"
    fetched_at: "2026-11-27T02:52:43.693Z"
highlights: ["A KTOTrainer runs the KTO algorithm on LLMs.", "`trl sft`, `trl dpo` and `trl chat` run training and chat directly from the terminal."]
draft: false
date: "2024-03-19"
---

## What happened

On 19 March 2024 the **Hugging Face TRL** library released **v0.8.0**, its post-training toolkit for aligning language models, with three headline changes.

## The technical details

From the release notes:

- **KTOTrainer:** a new trainer to run KTO (Kahneman-Tversky Optimization) on LLMs
- **TRL CLIs:** `trl sft` and `trl dpo` for training and `trl chat` for chatting with an aligned model, each taking a model name or path and a dataset
- **FSDP + QLoRA:** `SFTTrainer` now supports **FSDP plus QLoRA** and **DeepSpeed ZeRO-3 plus QLoRA**, so larger quantized models can be fine-tuned across several GPUs
- smaller changes include an `eval_packing` option for `SFTTrainer`, fixes to 8-bit multi-GPU training, seeding in SFT, DPO and reward modeling for reproducibility, and arguments for XPU support

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["TRL 0.8: KTOTrainer, command-line interfaces and FSDP with QLoRA"]):::title
    n1(["huggingface/trl: TRL 0.8: KTOTrainer, command-line interfaces and FSDP with QLoRA"])
    n2["TRL v0.8.0 adds the KTOTrainer, command-line interfaces for SFT, DPO and chat, and SFTTrainer support for FSDP…"]
    n7{"Does upgrading need changes?"}
    n8["The release lowers the bar for preference training: a command line replaces a script, and the QLoRA plus FSDP…"]
    n9(["Upgrade with the checklist above"])
    n10["Topics: hugging-face · trl · kto · qlora"]
    subgraph G0["What changed"]
        n3["KTOTrainer: a new trainer to run KTO (Kahneman-Tversky Optimization) on LLMs"]
        n4["TRL CLIs: trl sft and trl dpo for training and trl chat for chatting with an aligned model, each taking a…"]
        n5["FSDP + QLoRA: SFTTrainer now supports FSDP plus QLoRA and DeepSpeed ZeRO-3 plus QLoRA, so larger quantized…"]
        n6["smaller changes include an eval_packing option for SFTTrainer, fixes to 8-bit multi-GPU training, seeding in…"]
    end
    T ~~~ n1
    n1 --> n2
    n2 --> n3
    n2 --> n4
    n2 --> n5
    n2 --> n6
    n3 --> n7
    n4 --> n7
    n5 --> n7
    n6 --> n7
    n7 -- "no" --> n8
    n8 --> n9
    n10 --> n2
    class n7 dec
    class n1,n9 term
    classDef title fill:transparent,stroke:transparent,font-weight:700;
    classDef term stroke-width:2px;
    classDef store stroke-dasharray:4 3;
    classDef dec stroke-width:2px;
```

## Why it matters

The release lowers the bar for preference training: a command line replaces a script, and the QLoRA plus FSDP combination is what lets large models be tuned on modest hardware. This blog's study notes cover KTO, DPO and QLoRA in the LLM alignment phase.
