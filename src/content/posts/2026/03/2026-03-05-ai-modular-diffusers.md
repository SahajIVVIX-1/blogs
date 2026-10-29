---
title: "Modular Diffusers: diffusion pipelines from composable blocks"
categories: ["ai"]
tags: ["genai", "diffusion", "hugging-face"]
summary: "Hugging Face Diffusers introduced ModularPipeline, which builds diffusion pipelines from reusable blocks (text encoding, image encoding, denoising, decoding) that can be inspected, swapped and run on their own."
sources: 
  - title: "Introducing Modular Diffusers - Composable Building Blocks for Diffusion Pipelines"
    url: "https://huggingface.co/blog/modular-diffusers"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T22:07:29.937Z"
highlights: ["A pipeline becomes a list of blocks (text encoder, VAE encoder, denoise, decode) you can inspect, reorder or replace.", "Defining the workflow and loading the weights are separate steps."]
draft: false
date: "2026-03-05"
---

## What happened

Hugging Face introduced **Modular Diffusers**, a composable alternative to the classic `DiffusionPipeline`.

## The technical details

From the post:

- `ModularPipeline.from_pretrained(...)` **defines the workflow without loading weights**, and `load_components(...)` loads them, with dtype and quantisation settings
- the pipeline is made of inspectable **blocks**. For FLUX.2 Klein 4B: `text_encoder` → `vae_encoder` → `denoise` → `decode`
- each block has its own inputs and outputs, can **run independently**, and can be **added, removed or swapped**
- custom blocks can be written and composed
- integration with **Mellon**, a node-based visual workflow tool for wiring blocks together

## Why it matters

The blocks map one-to-one onto the Stable Diffusion anatomy from my July 2026 study post: text encoder, VAE, denoiser, decoder. Making them explicit turns "a pipeline" into something you can debug and remix.
