---
title: "Machine Learning · scikit-learn pipelines"
categories: ["study"]
tags: ["machine-learning", "scikit-learn"]
summary: "Combining preprocessing and model with Pipeline and ColumnTransformer for mixed numeric and categorical data, so one object is fitted, tuned and saved."
sources: 
  - title: "scikit-learn: Pipelines and composite estimators"
    url: "https://scikit-learn.org/stable/modules/compose.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:17.913Z"
  - title: "sklearn.compose.ColumnTransformer"
    url: "https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:18.497Z"
  - title: "scikit-learn: Model persistence"
    url: "https://scikit-learn.org/stable/model_persistence.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:19.100Z"
highlights: ["A Pipeline makes preprocessing part of the model, so it is fitted only on training folds.", "ColumnTransformer applies different preprocessing to numeric and categorical columns in one step."]
phase: 7
step: 16
draft: false
date: "2024-12-05"
---

Real tables mix numeric and categorical columns, each needing different preprocessing. A **Pipeline** chains the steps, and a **ColumnTransformer** routes columns to the right step:

- numeric: impute the median, then scale
- categorical: impute the most frequent value, then one-hot encode (`handle_unknown="ignore"` for categories never seen in training)

The whole thing is **one estimator**: `fit`, `predict`, cross-validation, grid search and saving with `joblib` all just work, and the leakage from last week can't happen.

The data is a small DataFrame I generated in the snippet: synthetic student records with some values missing.

```python run
import numpy as np, pandas as pd, joblib, tempfile, os
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(0)
n = 500
df = pd.DataFrame({
    "attendance": rng.uniform(40, 100, n),
    "study_hours": rng.gamma(2, 3, n),
    "branch": rng.choice(["ICT", "CSE", "ME", "EE"], n),
    "hostel": rng.choice(["yes", "no"], n),
})
df["passed"] = ((df.attendance / 100 + df.study_hours / 15 + rng.normal(0, 0.25, n)) > 1.1).astype(int)
df.loc[rng.choice(n, 40), "attendance"] = np.nan
df.loc[rng.choice(n, 25), "branch"] = np.nan

num, cat = ["attendance", "study_hours"], ["branch", "hostel"]
pre = ColumnTransformer([
    ("num", Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())]), num),
    ("cat", Pipeline([("impute", SimpleImputer(strategy="most_frequent")), ("onehot", OneHotEncoder(handle_unknown="ignore"))]), cat),
])
model = Pipeline([("pre", pre), ("rf", RandomForestClassifier(200, random_state=0))])

X, y = df.drop(columns="passed"), df["passed"]
print("CV accuracy:", cross_val_score(model, X, y, cv=5).mean().round(3))
model.fit(X, y)
print("features after preprocessing:", list(model[:-1].get_feature_names_out()))

path = os.path.join(tempfile.mkdtemp(), "model.joblib")
joblib.dump(model, path)
print("reloaded predicts:", joblib.load(path).predict(X.head(3)).tolist())
```

Output:

```text
CV accuracy: 0.768
features after preprocessing: ['num__attendance', 'num__study_hours', 'cat__branch_CSE', 'cat__branch_EE', 'cat__branch_ICT', 'cat__branch_ME', 'cat__hostel_no', 'cat__hostel_yes']
reloaded predicts: [1, 0, 1]
```
