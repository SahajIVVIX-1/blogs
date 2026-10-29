---
title: "Built this: vMix Manager"
categories: ["projects"]
tags: ["python", "pyqt", "automation", "xml"]
summary: "A PyQt tool that edits vMix production files directly as XML: batch folder imports with title dividers, category swaps, relinking moved media and cleanup."
sources: 
  - title: "SahajIVVIX-1/vMix-Manager (GitHub)"
    url: "https://github.com/SahajIVVIX-1/vMix-Manager"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit 3936328"
    url: "https://github.com/SahajIVVIX-1/vMix-Manager/commit/3936328"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["It edits the .vmix XML offline instead of controlling vMix through its API, so vMix doesn't even need to be open.", "Every cloned or imported input gets a fresh UUID to avoid key collisions when vMix loads the file."]
draft: false
date: "2026-03-29"
---

On 29 March 2026 I started **vMix Manager**, a Python and PyQt utility for people who run large vMix (live video production) sessions. The repo has 24 commits.

## What it does

From the README:

- **Direct XML engine**: parses and rewrites the `.vmix` file itself. Inputs keep their volume, mute, loop and position settings, and each imported or cloned input gets a new **UUID**.
- **Batch import**: queue many folders. For each one, a **GT Title divider** is inserted automatically, with an injected XML payload that sets a large bold font so dividers are readable on multiviewers.
- **Category swap**: move content between vMix category slots (1–6 and custom 50–65) by rewriting each input's `Category` attribute while keeping its order.
- **Cloning and relinking**: import structures from other `.vmix` files or folder trees, mark missing files, and **relink** all paths when a project moves to another drive.
- **Housekeeping**: export a category's files to a folder, three levels of wipe, drag-and-drop reordering and a timestamped activity log.

Requirements listed: Windows 10/11, Python 3.10+, and vMix 24+ for GT Title compatibility.
