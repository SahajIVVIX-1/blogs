---
title: "Paper summary: An Introduction to Vision-Language Modeling"
categories: ["papers"]
tags: ["multimodal", "vision-language", "survey"]
summary: "A tutorial-style introduction to vision-language models from a large group of authors: what VLMs are, the main training families, how to train and evaluate them, and the move to video."
sources: 
  - title: "An Introduction to Vision-Language Modeling (arXiv:2405.17247)"
    url: "https://arxiv.org/abs/2405.17247"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:39.560Z"
  - title: "Hugging Face Daily Papers, 2024-05-28"
    url: "https://huggingface.co/papers?date=2024-05-28"
    publisher: "Hugging Face"
    fetched_at: "2026-10-29T15:27:56.932Z"
  - title: "An Introduction to Vision-Language Modeling (arXiv HTML full text)"
    url: "https://arxiv.org/html/2405.17247"
    publisher: "arXiv"
    fetched_at: "2026-10-29T15:41:39.560Z"
highlights: ["The core difficulty: language is discrete, while vision lives in a much higher-dimensional space where concepts aren't easily discretised.", "The authors present it as an on-ramp for people entering the field."]
papers: 
  - title: "An Introduction to Vision-Language Modeling"
    authors: ["Florian Bordes", "Richard Yuanzhe Pang", "Anurag Ajay", "Alexander C. Li", "Adrien Bardes", "Suzanne Petryk", "Oscar Mañas", "Zhiqiu Lin", "Anas Mahmoud", "Bargav Jayaraman", "Mark Ibrahim", "Melissa Hall", "Yunyang Xiong", "Jonathan Lebensold", "Candace Ross", "Srihari Jayakumar", "Chuan Guo", "Diane Bouchacourt", "Haider Al-Tahan", "Karthik Padthe", "Vasu Sharma", "Hu Xu", "Xiaoqing Ellen Tan", "Megan Richards", "Samuel Lavoie", "Pietro Astolfi", "Reyhane Askari Hemmat", "Jun Chen", "Kushal Tirumala", "Rim Assouel", "Mazda Moayeri", "Arjang Talattof", "Kamalika Chaudhuri", "Zechun Liu", "Xilun Chen", "Quentin Garrido", "Karen Ullrich", "Aishwarya Agrawal", "Kate Saenko", "Asli Celikyilmaz", "Vikas Chandra"]
    year: 2024
    arxiv: "https://arxiv.org/abs/2405.17247"
    pdf: "https://arxiv.org/pdf/2405.17247v1"
    license: "http://arxiv.org/licenses/nonexclusive-distrib/1.0/"
card: 
  task: "Introduction to vision-language models (VLMs)"
  method: "Survey/tutorial covering VLM families, training, evaluation and extension to video"
  data: "Literature review"
  result: "A structured guide rather than a new model"
draft: false
date: "2024-05-28"
---

## Problem

VLMs were spreading fast, from visual assistants to text-to-image generators, but the field is hard to enter. The design space is large and reliability is a recurring problem.

## Method

This is an **introduction**, not a new model. It covers:

1. **What VLMs are and how they work**, including the main families of approaches.
2. **How to train them**: data, design choices, practical advice.
3. **How to evaluate them**.
4. **Extensions from images to video**.

The authors frame the central difficulty as mapping between language, which is discrete, and vision, which lives in a much higher-dimensional space where concepts can't always be discretised easily.

## Key results

The contribution is the organised overview itself, aimed at newcomers.

## Limitations

The authors say the work mainly covers mapping **images** to language, with video discussed as an extension. As a survey written in mid-2024, it reflects the state of the field at that time.
