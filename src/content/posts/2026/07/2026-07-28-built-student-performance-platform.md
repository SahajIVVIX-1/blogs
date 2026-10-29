---
title: "Built this: Explainable Student Performance Prediction Platform"
categories: ["projects"]
tags: ["machine-learning", "explainability", "mlops"]
summary: "An end-to-end ML platform that validates student data, benchmarks nine model types from logistic regression to an LSTM, tracks runs in MLflow, explains predictions with SHAP and LIME, and serves them through FastAPI and Streamlit."
sources: 
  - title: "SahajIVVIX-1/student-performance-platform (GitHub)"
    url: "https://github.com/SahajIVVIX-1/student-performance-platform"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "First commit 37f2457"
    url: "https://github.com/SahajIVVIX-1/student-performance-platform/commit/37f2457"
    publisher: "GitHub"
    fetched_at: "2026-10-29T21:32:42.101Z"
  - title: "SHAP documentation"
    url: "https://shap.readthedocs.io/"
    publisher: "SHAP"
    fetched_at: "2026-10-29T21:32:42.101Z"
highlights: ["Nine models go through the same validated pipeline, from logistic regression and trees to XGBoost, CatBoost, LightGBM, PyTorch MLP/LSTM and FLAML AutoML.", "Every prediction can be explained with SHAP and LIME."]
draft: false
date: "2026-07-28"
---

On 28 July 2026 I committed an **explainable student-performance platform**. It reads almost like a summary of my whole ML phase in one repo.

## Pipeline

From the README's architecture diagram:

1. **Data**: UCI student dataset or a synthetic raw CSV → **Pandera** validation and cleaning → feature engineering with a `ColumnTransformer` → stratified train/validation/test splits.
2. **Model benchmark**: logistic regression, decision tree, random forest, **XGBoost**, **CatBoost**, **LightGBM**, a PyTorch **MLP**, a PyTorch **LSTM** for temporal data, and a **FLAML AutoML** baseline.
3. **Tracking**: every run logged to **MLflow**.
4. **Explainability**: **SHAP** and **LIME** explanations.
5. **Serving**: a **FastAPI** REST API (port 8000) and a **Streamlit** dashboard (port 8501).

## Where it connects

It reuses the ideas from my [scikit-learn pipelines](/2024/12/05/ml-16-pipelines/), [cross-validation](/2024/11/27/ml-15-cross-validation/) and [boosting](/2024/10/08/ml-09-boosting-xgboost/) notes, and adds the explainability and serving layers those posts didn't cover.
