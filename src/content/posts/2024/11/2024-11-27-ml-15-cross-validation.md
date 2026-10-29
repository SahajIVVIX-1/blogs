---
title: "Machine Learning · Cross-validation"
categories: ["study"]
tags: ["machine-learning", "evaluation"]
summary: "k-fold, stratified and grouped cross-validation, why one train/test split is noisy, and avoiding leakage by preprocessing inside the folds."
sources: 
  - title: "scikit-learn: Cross-validation"
    url: "https://scikit-learn.org/stable/modules/cross_validation.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:16.794Z"
  - title: "scikit-learn: Common pitfalls (data leakage)"
    url: "https://scikit-learn.org/stable/common_pitfalls.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:17.426Z"
  - title: "An Introduction to Statistical Learning (ch. 5)"
    url: "https://www.statlearning.com/"
    publisher: "James, Witten, Hastie, Tibshirani"
    fetched_at: "2026-10-29T16:25:59.308Z"
highlights: ["k-fold CV trains k models, each tested on a different fold, so the estimate uses every row once as test data.", "Fitting a scaler on the full data before CV leaks test information; put it in the pipeline instead."]
phase: 7
step: 15
draft: false
date: "2024-11-27"
---

One random train/test split gives a **noisy** estimate: another split could give a quite different number. **k-fold CV** splits the data into k folds, trains on k − 1 of them, tests on the remaining one, and rotates. You get k scores, so you can report a mean ± spread.

- **StratifiedKFold** keeps class proportions the same in each fold (it's the default for classifiers).
- **GroupKFold** keeps all rows from one group (a patient, a user) inside a single fold. Without it you get leakage through near-duplicates.
- **Leakage**: any preprocessing fitted on all the data (scaling, feature selection) sees the test folds. The fix is to put it inside a `Pipeline`, so it's refitted inside each fold.

The demo shows feature selection leakage. The data is pure noise, so honest accuracy should be about 50%.

```python run
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

rng = np.random.default_rng(0)
X = rng.normal(size=(100, 5000))          # pure noise
y = rng.integers(0, 2, 100)

scores = [LogisticRegression(max_iter=1000).fit(*train_test_split(X, y, random_state=s)[0::2]).score(*train_test_split(X, y, random_state=s)[1::2]) for s in range(5)]
print("single splits vary:", np.round(scores, 2))

cv = StratifiedKFold(5, shuffle=True, random_state=0)
X_leaky = SelectKBest(f_classif, k=20).fit_transform(X, y)      # selection saw all labels!
leaky = cross_val_score(LogisticRegression(max_iter=1000), X_leaky, y, cv=cv)
honest = cross_val_score(make_pipeline(SelectKBest(f_classif, k=20), LogisticRegression(max_iter=1000)), X, y, cv=cv)
print(f"leaky CV accuracy : {leaky.mean():.2f} ± {leaky.std():.2f}")
print(f"honest CV accuracy: {honest.mean():.2f} ± {honest.std():.2f}")
```

Output:

```text
single splits vary: [0.4  0.48 0.28 0.36 0.52]
leaky CV accuracy : 0.87 ± 0.05
honest CV accuracy: 0.50 ± 0.09
```
