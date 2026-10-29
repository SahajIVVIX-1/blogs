---
title: "Built this: LabX"
categories: ["projects"]
tags: ["docker", "tooling", "python"]
summary: "A Docker image that runs JupyterLab and a browser-based VS Code (code-server) side by side on one shared Python environment and workspace."
sources: 
  - title: "SahajIVVIX-1/LabX (GitHub)"
    url: "https://github.com/SahajIVVIX-1/LabX"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit 8fef865"
    url: "https://github.com/SahajIVVIX-1/LabX/commit/8fef865"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["Two tools, one environment: JupyterLab on port 5959 and LabX-Server (code-server) on 5960 share the same Python and /workspace.", "It ships with a data-science and ML stack plus 17 VS Code extensions installed offline."]
draft: false
date: "2026-08-10"
---

On 10 August 2026 I made the first commit of **LabX**, a self-contained Python lab environment in Docker.

## What you get

From the README:

- **JupyterLab 4.6.2** at `localhost:5959`
- **LabX-Server**, a branded **code-server 4.132.0** (VS Code in the browser), at `localhost:5960`
- **Python 3.11.9** on Debian Bookworm slim
- a preinstalled stack: NumPy, Pandas, scikit-learn, Keras, Transformers, Accelerate, OpenCV, NLTK, spaCy, MLflow, W&B, Stable-Baselines3, Gymnasium and more
- **17 VS Code extensions** bundled as `.vsix` files and installed offline
- password protection for both services, configurable by environment variable
- multi-architecture builds (`linux/amd64`, `linux/arm64`) and a mounted, persistent `/workspace`

## Where it connects

It's the container version of the environment I set up by hand at the start of this blog: a venv, Jupyter and an editor, packaged so it can be rebuilt anywhere.
