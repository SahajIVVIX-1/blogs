---
title: "Built this: SIH-AI-Gyani microplastic detector"
categories: ["projects"]
tags: ["computer-vision", "yolo", "detection"]
summary: "A YOLO11 object detector trained to find and classify six types of microplastic polymers in images, built in a single notebook with Ultralytics."
sources: 
  - title: "SahajIVVIX-1/SIH-AI-Gyani (GitHub)"
    url: "https://github.com/SahajIVVIX-1/SIH-AI-Gyani"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:51:41.501Z"
  - title: "Commit 0dcc355 \"Models Uploaded\""
    url: "https://github.com/SahajIVVIX-1/SIH-AI-Gyani/commit/0dcc35558e35e4b86f0c1a54f350e7e5c2c3fdbe"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:53:00.932Z"
  - title: "Ultralytics YOLO documentation"
    url: "https://docs.ultralytics.com/"
    publisher: "Ultralytics"
    fetched_at: "2026-10-29T21:53:21.245Z"
highlights: ["Six classes: ABS, Nylon, PE, PET, PS and PVC.", "The notebook covers the full loop: train, validate, test, predict and plot the loss curves."]
draft: false
date: "2025-09-23"
---

Two weeks after my [object detection and YOLO](/2025/09/08/cv-06-detection-yolo/) notes, I pushed **SIH-AI-Gyani** on 23 September 2025: a detector for **microplastics**.

## What's in the repo

The repo has 5 commits and no README yet, so this description comes from its files:

- `data_info_train.yaml` defines a dataset with train, validation and test splits and **6 classes**: **ABS, Nylon, PE, PET, PS and PVC**, which are common plastic polymers.
- `Main.ipynb` uses **Ultralytics YOLO**: it loads the `yolo11m.pt` checkpoint, trains on that dataset, validates on the validation and test splits, runs predictions on test images with a 0.25 confidence threshold, and plots training and validation box loss from `results.csv`.
- `custom_hyp.yaml` holds custom training hyperparameters, and `requirements.txt` / `packages.json` list the dependencies.

## Where it connects

This applied everything from the CV phase: detection as boxes plus classes, IoU-based validation metrics (precision, recall, mAP50 and mAP50-95 come from `model.val()`), and fine-tuning a pretrained model on a new dataset.
