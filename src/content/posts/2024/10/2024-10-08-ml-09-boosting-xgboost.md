---
title: "Machine Learning · Boosting and XGBoost"
categories: ["study"]
tags: ["machine-learning", "ensembles", "xgboost"]
summary: "Boosting builds shallow trees one after another, each fixing the previous errors; gradient boosting, learning rate, early stopping, and XGBoost."
sources: 
  - title: "XGBoost: Introduction to Boosted Trees"
    url: "https://xgboost.readthedocs.io/en/stable/tutorials/model.html"
    publisher: "XGBoost"
    fetched_at: "2026-10-29T16:26:07.848Z"
  - title: "Chen & Guestrin (2016), XGBoost: A Scalable Tree Boosting System"
    url: "https://arxiv.org/abs/1603.02754"
    publisher: "arXiv"
    fetched_at: "2026-10-29T16:26:08.535Z"
  - title: "scikit-learn: Gradient boosting"
    url: "https://scikit-learn.org/stable/modules/ensemble.html#gradient-boosting"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:08.717Z"
highlights: ["Bagging averages independent trees; boosting adds trees sequentially, each fitting what is still wrong.", "A small learning rate with early stopping is the standard way to keep boosting from overfitting."]
phase: 7
step: 9
draft: false
date: "2024-10-08"
---

Random forests build trees **in parallel** and average them. **Boosting** builds them **one after another**: each new shallow tree fits the *residual errors* (more precisely, the negative gradient of the loss) of the ensemble so far.

$$F_m(x) = F_{m-1}(x) + \eta\, h_m(x)$$

- **η (learning rate)**: smaller steps need more trees but usually generalise better.
- **Early stopping**: watch a validation set and stop adding trees when it stops improving.
- **XGBoost** (Chen and Guestrin, 2016) adds regularisation on the trees, second-order gradient information and a lot of systems engineering. It's a long-time favourite for tabular data.

```python run
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
import xgboost as xgb

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
X_tr2, X_val, y_tr2, y_val = train_test_split(X_tr, y_tr, test_size=0.2, random_state=0)

gb = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1, max_depth=2, random_state=0).fit(X_tr, y_tr)
print("sklearn GradientBoosting test acc:", round(gb.score(X_te, y_te), 3))

model = xgb.XGBClassifier(n_estimators=1000, learning_rate=0.05, max_depth=3,
                          early_stopping_rounds=30, eval_metric="logloss", random_state=0)
model.fit(X_tr2, y_tr2, eval_set=[(X_val, y_val)], verbose=False)
print("xgboost best iteration:", model.best_iteration, "of 1000")
print("xgboost test acc:", round((model.predict(X_te) == y_te).mean(), 3))
print("xgboost version:", xgb.__version__)
```

Output:

```text
sklearn GradientBoosting test acc: 0.979
xgboost best iteration: 103 of 1000
xgboost test acc: 0.979
xgboost version: 3.4.1
```
