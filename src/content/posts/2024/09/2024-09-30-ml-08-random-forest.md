---
title: "Machine Learning · Random forest"
categories: ["study"]
tags: ["machine-learning", "ensembles"]
summary: "Bagging many decorrelated trees: bootstrap samples, random feature subsets, out-of-bag score, and feature importances."
sources: 
  - title: "scikit-learn: Forests of randomized trees"
    url: "https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:02.315Z"
  - title: "Breiman (2001), Random Forests"
    url: "https://doi.org/10.1023/A:1010933404324"
    publisher: "Machine Learning (Springer)"
    fetched_at: "2026-10-29T16:26:06.694Z"
  - title: "scikit-learn: Permutation feature importance"
    url: "https://scikit-learn.org/stable/modules/permutation_importance.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:07.193Z"
highlights: ["A random forest averages many deep trees trained on bootstrap samples with random feature subsets, which cuts variance.", "The out-of-bag score is a free validation estimate from the rows each tree never saw."]
phase: 7
step: 8
draft: false
date: "2024-09-30"
---

A single deep tree has high variance. A **random forest** (Breiman, 2001) averages many of them, and makes them *different* from each other in two ways:

1. Each tree trains on a **bootstrap sample** of the rows (sampled with replacement). This is **bagging**.
2. Each split considers only a **random subset of features** (`max_features`).

Averaging decorrelated errors cancels much of the noise. Bonus: each tree never sees about a third of the rows, so the **out-of-bag (OOB) score** is a free validation estimate.

Impurity-based `feature_importances_` can be biased toward high-cardinality features. The scikit-learn docs suggest permutation importance as a check.

```python run
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance

data = load_breast_cancer()
X_tr, X_te, y_tr, y_te = train_test_split(data.data, data.target, random_state=0)

tree = DecisionTreeClassifier(random_state=0).fit(X_tr, y_tr)
rf = RandomForestClassifier(n_estimators=300, oob_score=True, random_state=0, n_jobs=-1).fit(X_tr, y_tr)
print(f"single tree test {tree.score(X_te, y_te):.3f} | forest test {rf.score(X_te, y_te):.3f} | forest OOB {rf.oob_score_:.3f}")

top = np.argsort(rf.feature_importances_)[::-1][:3]
print("top impurity importances:", [str(data.feature_names[i]) for i in top])
perm = permutation_importance(rf, X_te, y_te, n_repeats=10, random_state=0)
top_p = np.argsort(perm.importances_mean)[::-1][:3]
print("top permutation importances:", [str(data.feature_names[i]) for i in top_p])
```

Output:

```text
single tree test 0.881 | forest test 0.972 | forest OOB 0.955
top impurity importances: ['mean concave points', 'worst concave points', 'worst perimeter']
top permutation importances: ['worst area', 'worst radius', 'worst perimeter']
```
