---
title: "Built this: PyEnv Launcher"
categories: ["projects"]
tags: ["python", "tooling", "desktop"]
summary: "A desktop control centre for Python projects: find and manage venv/Conda environments, packages, Git status and project folders from one window."
sources: 
  - title: "SahajIVVIX-1/PyEnv-Launcher-Project (GitHub)"
    url: "https://github.com/SahajIVVIX-1/PyEnv-Launcher-Project"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:49:42.335Z"
  - title: "First commit 2ac49a0"
    url: "https://github.com/SahajIVVIX-1/PyEnv-Launcher-Project/commit/2ac49a0"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:50:47.495Z"
highlights: ["The README states the aim: stop switching between file explorer, terminal and IDE for routine project tasks.", "Environments are discovered automatically, and outdated packages can be checked and upgraded with one click."]
draft: false
date: "2025-07-23"
---

On 23 July 2025 I made the first commit of **PyEnv Launcher**, a desktop GUI that pulls the everyday Python workflow into one window. The repo has 13 commits and is written in Python.

## What it does

According to the project README:

- **Projects**: set a project folder, reopen recent ones, and create a standard layout (`data`, `notebooks`, `src`, `.gitignore`) in one click.
- **Environments**: automatically finds **venv** and **Conda** environments, shows each one's Python version and creation date, creates or deletes them, and opens a terminal with the selected environment already activated. It can also launch Jupyter inside an environment.
- **Packages**: lists installed packages, checks for outdated ones with `pip`, and upgrades or uninstalls them. It can freeze to `requirements.txt` or export to `packages.json`, and install from either.
- **Git**: shows the current branch and whether the tree is clean or dirty, with Pull and Commit actions.
- **Build tools**: Poetry and PDM buttons appear only when a `pyproject.toml` exists.
- **UI**: dark and light themes, a two-column layout and an activity log of every command's output.

A standalone Windows installer is linked from the README.

## Where it connects

It's the practical side of my October 2023 post on [venv and pip](/2023/10/27/python-22-venv-pip/): the same commands, behind buttons.
