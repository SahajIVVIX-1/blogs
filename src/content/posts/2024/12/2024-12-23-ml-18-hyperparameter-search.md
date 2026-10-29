---
title: "Machine Learning · Hyperparameter search"
categories: ["study"]
tags: ["machine-learning", "tuning"]
summary: "Tuning with GridSearchCV and RandomizedSearchCV, nested evaluation on a held-out test set, and why random search often wins."
sources: 
  - title: "scikit-learn: Tuning the hyper-parameters of an estimator"
    url: "https://scikit-learn.org/stable/modules/grid_search.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:27.424Z"
  - title: "Bergstra & Bengio (2012), Random Search for Hyper-Parameter Optimization"
    url: "https://www.jmlr.org/papers/v13/bergstra12a.html"
    publisher: "JMLR"
    fetched_at: "2026-10-29T16:26:28.009Z"
  - title: "sklearn.model_selection.RandomizedSearchCV"
    url: "https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:28.305Z"
highlights: ["Hyperparameters are chosen on validation folds; the test set is still only for the final number.", "Random search explores more values of the parameters that matter for the same budget."]
phase: 7
step: 18
draft: false
date: "2024-12-23"
---

**Parameters** are learned during `fit`. **Hyperparameters** are set before it: tree depth, C, k, the learning rate.

- **GridSearchCV** tries every combination with cross-validation. The cost multiplies with each extra parameter.
- **RandomizedSearchCV** samples combinations from distributions. Bergstra and Bengio (2012) showed it's often more efficient, because usually only a few hyperparameters really matter and random search tries more distinct values of each.
- Search on the **training** data with CV, then report the best model **once** on the untouched test set.

This closes the ML phase.

```python run
from scipy.stats import loguniform, randint
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, GridSearchCV, RandomizedSearchCV
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_breast_cancer(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)

grid = GridSearchCV(make_pipeline(StandardScaler(), SVC()),
                    {"svc__C": [0.1, 1, 10, 100], "svc__gamma": [1e-3, 1e-2, 1e-1]}, cv=5).fit(X_tr, y_tr)
print("grid: tried", len(grid.cv_results_["params"]), "| best", grid.best_params_, "| CV", round(grid.best_score_, 3))

rand = RandomizedSearchCV(RandomForestClassifier(random_state=0),
                          {"n_estimators": randint(50, 400), "max_depth": randint(2, 20), "max_features": loguniform(0.05, 1.0)},
                          n_iter=20, cv=5, random_state=0, n_jobs=-1).fit(X_tr, y_tr)
print("random: tried", len(rand.cv_results_["params"]), "| CV", round(rand.best_score_, 3))

for name, s in [("grid SVC", grid), ("random RF", rand)]:
    print(f"{name}: final test accuracy {s.score(X_te, y_te):.3f}")
```

Output:

```text
grid: tried 12 | best {'svc__C': 100, 'svc__gamma': 0.001} | CV 0.988
random: tried 20 | CV 0.965
grid SVC: final test accuracy 0.958
random RF: final test accuracy 0.944
```

That ends phase 7. Deep learning is next, starting from a single neuron.
