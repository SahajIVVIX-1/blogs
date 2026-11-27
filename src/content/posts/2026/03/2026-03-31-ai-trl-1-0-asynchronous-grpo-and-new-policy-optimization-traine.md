---
title: "TRL 1.0: asynchronous GRPO and new policy-optimization trainers"
categories: ["ai"]
tags: ["hugging-face", "trl", "grpo", "reinforcement-learning", "post-training"]
summary: "TRL v1.0.0 introduces asynchronous GRPO that offloads rollouts to an external vLLM server, plus VESPO, DPPO and SDPO methods for more stable policy optimization."
sources: 
  - title: "v1.0.0"
    url: "https://github.com/huggingface/trl/releases/tag/v1.0.0"
    publisher: "GitHub · huggingface/trl"
    fetched_at: "2026-11-27T02:52:49.746Z"
highlights: ["Async GRPO generates in parallel with training, removing idle GPU time.", "VESPO replaces heuristic token-level clipping with a variational reshaping kernel to tame off-policy instability."]
draft: false
date: "2026-03-31"
---

## What happened

On 31 March 2026 **Hugging Face** released **TRL v1.0.0**, the first major version of its post-training library, with a companion blog post titled “TRL v1: Post-Training Library Built to Move with the Field”.

## The technical details

From the release notes:

- **Asynchronous GRPO:** decouples generation from the gradient-update loop by **offloading rollouts to an external vLLM server**, so generation and training run in parallel and hardware is used better
- **VESPO** (Variational Sequence-Level Soft Policy Optimization): targets instability from **policy staleness, asynchronous updates and train-inference mismatch** with a smooth asymmetric Gamma weighting of extreme sequence-level importance weights, enabled with `loss_type="vespo"` in `GRPOConfig`
- **DPPO** (Divergence Proximal Policy Optimization): an experimental trainer replacing PPO clipping with divergence constraints for trust-region updates
- **SDPO** (Self-Distillation Policy Optimization): an experimental trainer that distills a model's feedback-informed predictions on its own high-reward trajectories back into the policy

## How it fits together

The flowchart below maps this announcement's main points and what depends on them.

```mermaid
flowchart TD
    T(["TRL 1.0: asynchronous GRPO and new policy-optimization trainers"]):::title
    n1(["huggingface/trl: TRL 1.0: asynchronous GRPO and new policy-optimization trainers"])
    n2["TRL v1.0.0 introduces asynchronous GRPO that offloads rollouts to an external vLLM server, plus VESPO, DPPO…"]
    n7{"Does upgrading need changes?"}
    n8["RL for reasoning models spends most of its time generating rollouts, so overlapping generation with learning…"]
    n9(["Upgrade with the checklist above"])
    n10["Topics: hugging-face · trl · grpo · reinforcement-learning"]
    subgraph G0["What changed"]
        n3["Asynchronous GRPO: decouples generation from the gradient-update loop by offloading rollouts to an external…"]
        n4["VESPO (Variational Sequence-Level Soft Policy Optimization): targets instability from policy staleness…"]
        n5["DPPO (Divergence Proximal Policy Optimization): an experimental trainer replacing PPO clipping with divergence…"]
        n6["SDPO (Self-Distillation Policy Optimization): an experimental trainer that distills a model's…"]
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

RL for reasoning models spends most of its time generating rollouts, so overlapping generation with learning attacks the main cost. The new trainers address the other practical issue, which is stability when the sampling policy lags the training policy.
