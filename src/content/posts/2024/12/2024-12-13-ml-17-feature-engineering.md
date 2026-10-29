---
title: "Machine Learning · Feature engineering"
categories: ["study"]
tags: ["machine-learning", "features"]
summary: "Creating better inputs: ratios, date parts, binning, interactions, log transforms for skewed values, and target-free encodings."
sources: 
  - title: "scikit-learn: Preprocessing data"
    url: "https://scikit-learn.org/stable/modules/preprocessing.html"
    publisher: "scikit-learn"
    fetched_at: "2026-10-29T16:26:19.723Z"
  - title: "Google ML Crash Course: Working with numerical data"
    url: "https://developers.google.com/machine-learning/crash-course/numerical-data"
    publisher: "Google for Developers"
    fetched_at: "2026-10-29T16:26:20.687Z"
  - title: "Feature Engineering and Selection (Kuhn & Johnson)"
    url: "https://bookdown.org/max/FES/"
    publisher: "Max Kuhn and Kjell Johnson"
    fetched_at: "2026-10-29T16:26:21.916Z"
highlights: ["A good feature makes the pattern easy for the model to see.", "Log-transforming a heavily skewed feature often helps linear models."]
phase: 7
step: 17
draft: false
date: "2024-12-13"
---

Models can only learn from what they're given, so a well-chosen feature can beat a fancier model. The tools I practised:

- **Ratios and differences**: price per square metre, marks per hour.
- **Dates**: day of week, month, "is weekend", time since some event.
- **Log transform** for heavily right-skewed values (incomes, counts). It helps linear models a lot.
- **Binning** a continuous value into ranges (`KBinsDiscretizer`).
- **Interactions** (`PolynomialFeatures(interaction_only=True)`).
- **Scaling** for distance-based and gradient-based models (trees don't need it).

The test: a target that depends on a *ratio* and on *log(income)*. I compared a linear model on the raw columns against one on engineered features.

```python run
import numpy as np, pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score

rng = np.random.default_rng(1)
n = 1000
df = pd.DataFrame({
    "income": rng.lognormal(10, 1, n),
    "loan": rng.uniform(1e4, 5e5, n),
    "date": pd.Timestamp("2024-01-01") + pd.to_timedelta(rng.integers(0, 365, n), unit="D"),
})
ratio = df.loan / df.income
df["risk"] = 2 * np.log(ratio) - 0.5 * np.log(df.income) + 0.8 * (df.date.dt.day_of_week >= 5) + rng.normal(0, 0.3, n)
print("income skewness raw:", round(df.income.skew(), 2), "| log:", round(np.log(df.income).skew(), 2))

raw = df[["income", "loan"]].assign(doy=df.date.dt.day_of_year)
eng = pd.DataFrame({
    "log_ratio": np.log(ratio),
    "log_income": np.log(df.income),
    "is_weekend": (df.date.dt.day_of_week >= 5).astype(int),
})
for name, X in [("raw columns", raw), ("engineered", eng)]:
    print(f"{name:>12}: CV R2 = {cross_val_score(LinearRegression(), X, df.risk, cv=5).mean():.3f}")
```

Output:

```text
income skewness raw: 8.29 | log: 0.0
 raw columns: CV R2 = 0.531
  engineered: CV R2 = 0.990
```
