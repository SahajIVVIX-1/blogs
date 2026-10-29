---
title: "Machine Learning · Logistic regression"
categories: ["study"]
tags: ["machine-learning", "classification"]
summary: "Logistic regression for binary classification: the sigmoid, log-loss, decision thresholds, and predicted probabilities."
sources: 
  - title: "scikit-learn: Logistic regression"
    url: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:25:56.391Z"
  - title: "CS229 Lecture Notes (classification and logistic regression)"
    url: "https://cs229.stanford.edu/main_notes.pdf"
    publisher: "Stanford CS229"
    fetched_at: "2026-10-29T16:25:53.825Z"
  - title: "Google ML Crash Course: Logistic regression"
    url: "https://developers.google.com/machine-learning/crash-course/logistic-regression"
    publisher: "Google for Developers"
    fetched_at: "2026-10-29T16:25:57.593Z"
highlights: ["Logistic regression is linear regression passed through a sigmoid, so the output is a probability.", "Changing the 0.5 threshold trades precision against recall."]
phase: 7
step: 4
draft: false
date: "2024-08-27"
---

For a yes/no target, take the linear score $z = \mathbf{w}^\top\mathbf{x}+b$ and squash it with the **sigmoid** $\sigma(z) = 1/(1+e^{-z})$ to get a probability between 0 and 1.

- The loss is **log-loss** (cross-entropy). Confident wrong answers are punished heavily.
- `predict_proba` gives probabilities. `predict` applies a **0.5 threshold** by default.
- Moving the threshold trades precision against recall, which matters when one kind of error costs more.
- Despite its name, this is a *classification* model.

```python run
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import log_loss, precision_score, recall_score

sigmoid = lambda z: 1 / (1 + np.exp(-z))
print("sigmoid(-4,0,4):", sigmoid(np.array([-4, 0, 4])).round(3))

X, y = load_breast_cancer(return_X_y=True)          # 1 = benign in this dataset
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=1)
clf = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(X_tr, y_tr)

p = clf.predict_proba(X_te)[:, 1]
print("log-loss:", round(log_loss(y_te, p), 4))
for t in [0.3, 0.5, 0.9]:
    pred = (p >= t).astype(int)
    print(f"threshold {t}: precision {precision_score(y_te, pred):.3f}, recall {recall_score(y_te, pred):.3f}")
```

Output:

```text
sigmoid(-4,0,4): [0.018 0.5   0.982]
log-loss: 0.0763
threshold 0.3: precision 0.947, recall 1.000
threshold 0.5: precision 0.967, recall 0.978
threshold 0.9: precision 0.988, recall 0.933
```
