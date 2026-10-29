---
title: "Pandas · Time series"
categories: ["study"]
tags: ["pandas", "time-series"]
summary: "DatetimeIndex, date_range, the .dt accessor, resampling to weekly or monthly, rolling windows and shift."
sources: 
  - title: "Time series / date functionality"
    url: "https://pandas.pydata.org/docs/user_guide/timeseries.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:12.278Z"
  - title: "pandas.DataFrame.resample"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.resample.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:12.849Z"
  - title: "Windowing operations"
    url: "https://pandas.pydata.org/docs/user_guide/window.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:13.455Z"
highlights: ["resample is groupby for time: it buckets rows into periods like weeks or months.", "rolling(7).mean() smooths noise; shift(1) lines today up with yesterday."]
phase: 4
step: 9
draft: false
date: "2024-03-27"
---

I ended the Pandas phase with dates.

- `pd.to_datetime` parses dates. `pd.date_range(start, periods, freq)` generates them.
- Setting the dates as the index (a **DatetimeIndex**) unlocks slicing like `df.loc["2024-03"]`.
- The `.dt` accessor gives the parts of a date: `.dt.day_name()`, `.dt.month`.
- `resample("W")` / `resample("MS")` buckets rows by week or month start. Think of it as groupby for time.
- `rolling(7).mean()` gives a moving average, and `shift(1)` gives the previous value (for day-over-day change).

```python run
import numpy as np
import pandas as pd

rng = np.random.default_rng(0)
idx = pd.date_range("2024-01-01", periods=60, freq="D")
df = pd.DataFrame({"steps": rng.integers(3000, 12000, size=60)}, index=idx)

print(df.loc["2024-02-01":"2024-02-03"])
print(df.resample("MS")["steps"].agg(["mean", "max"]).round(0))
df["ma7"] = df["steps"].rolling(7).mean().round(0)
df["change"] = df["steps"] - df["steps"].shift(1)
print(df.iloc[5:9])
print(df.index[:3].day_name().tolist())
print(df.groupby(df.index.day_of_week >= 5)["steps"].mean().round(0).rename({False: "weekday", True: "weekend"}))
```

Output:

```text
            steps
2024-02-01   4580
2024-02-02   3803
2024-02-03  10768
              mean    max
2024-01-01  7845.0  11736
2024-02-01  7133.0  11974
            steps     ma7  change
2024-01-06   3368     NaN -2402.0
2024-01-07   3677  6461.0   309.0
2024-01-08   3148  5389.0  -529.0
2024-01-09   4577  4795.0  1429.0
['Monday', 'Tuesday', 'Wednesday']
weekday    7699.0
weekend    6956.0
Name: steps, dtype: float64
```
