---
title: "Pandas · Cleaning data"
categories: ["study"]
tags: ["pandas", "cleaning"]
summary: "Fixing messy columns: stripping and normalising strings, converting types with to_numeric, renaming, dropping duplicates and mapping categories."
sources: 
  - title: "Working with text data"
    url: "https://pandas.pydata.org/docs/user_guide/text.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:03.329Z"
  - title: "pandas.to_numeric"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.to_numeric.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:04.081Z"
  - title: "pandas.DataFrame.drop_duplicates"
    url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html"
    publisher: "pandas"
    fetched_at: "2026-10-29T15:44:04.695Z"
highlights: ["The .str accessor applies string methods to a whole column at once.", "pd.to_numeric(errors=\"coerce\") turns unparseable values into NaN instead of crashing."]
phase: 4
step: 4
draft: false
date: "2024-03-12"
---

Real data is messy. My cleaning checklist:

1. **Column names**: lower-case and strip them, replace spaces with `_`.
2. **Strings**: the `.str` accessor applies string methods to a whole column (`.str.strip().str.title()`).
3. **Types**: `pd.to_numeric(col, errors="coerce")` turns bad values into `NaN` instead of raising.
4. **Categories**: `.map({...})` or `.replace` to unify spellings.
5. **Duplicates**: `drop_duplicates(subset=...)`.

```python run
import pandas as pd

df = pd.DataFrame({
    " Student Name ": ["  asha ", "RAVI", "Sahaj", "Sahaj", "meet"],
    "Branch": ["cse", "I.C.T", "ict", "ict", "Mech"],
    "Marks": ["88", "79", "95", "95", "absent"],
})
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
df["student_name"] = df["student_name"].str.strip().str.title()
df["branch"] = df["branch"].str.lower().str.replace(".", "", regex=False).map(
    {"cse": "CSE", "ict": "ICT", "mech": "ME"})
df["marks"] = pd.to_numeric(df["marks"], errors="coerce")
print(df)
df = df.drop_duplicates()
print(df.dtypes.to_dict())
print(df)
```

Output:

```text
  student_name branch  marks
0         Asha    CSE   88.0
1         Ravi    ICT   79.0
2        Sahaj    ICT   95.0
3        Sahaj    ICT   95.0
4         Meet     ME    NaN
{'student_name': <StringDtype(storage='python', na_value=nan)>, 'branch': <StringDtype(storage='python', na_value=nan)>, 'marks': dtype('float64')}
  student_name branch  marks
0         Asha    CSE   88.0
1         Ravi    ICT   79.0
2        Sahaj    ICT   95.0
4         Meet     ME    NaN
```
