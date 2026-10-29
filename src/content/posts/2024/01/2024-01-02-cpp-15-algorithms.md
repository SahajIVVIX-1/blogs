---
title: "C++ · STL: algorithms"
categories: ["study"]
tags: ["cpp", "stl"]
summary: "The <algorithm> and <numeric> toolkit: sort with comparators, find_if, count_if, accumulate, transform, and min/max."
sources: 
  - title: "Algorithms library"
    url: "https://en.cppreference.com/w/cpp/algorithm"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:43.784Z"
  - title: "std::accumulate"
    url: "https://en.cppreference.com/w/cpp/algorithm/accumulate"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:44.855Z"
  - title: "std::sort"
    url: "https://en.cppreference.com/w/cpp/algorithm/sort"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:45.286Z"
highlights: ["STL algorithms work on iterator ranges, so the same sort or find works on any container.", "Most hand-written loops have a named algorithm that says what you mean more clearly."]
phase: 2
step: 15
draft: false
date: "2024-01-02"
---

STL algorithms take an **iterator range** `[first, last)`, so one `std::sort` works for vectors, arrays and deques alike. Most loops I'd write by hand already have a name:

| loop that… | algorithm |
|---|---|
| sorts | `std::sort(b, e, cmp)` |
| finds the first match | `std::find_if` |
| counts matches | `std::count_if` |
| sums or folds | `std::accumulate` (`<numeric>`) |
| maps each element | `std::transform` |
| finds the min/max | `std::min_element`, `std::max_element`, `std::minmax_element` |

```cpp run
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

struct Rec { std::string name; int marks; };

int main() {
    std::vector<Rec> rs{{"Asha", 72}, {"Sahaj", 88}, {"Ravi", 35}, {"Meet", 91}};

    std::sort(rs.begin(), rs.end(), [](const Rec& a, const Rec& b) { return a.marks > b.marks; });
    for (auto& r : rs) std::cout << r.name << ':' << r.marks << ' ';
    std::cout << '\n';

    auto failed = std::find_if(rs.begin(), rs.end(), [](const Rec& r) { return r.marks < 40; });
    std::cout << "first fail: " << failed->name << '\n';

    int passed = std::count_if(rs.begin(), rs.end(), [](const Rec& r) { return r.marks >= 40; });
    int total = std::accumulate(rs.begin(), rs.end(), 0, [](int s, const Rec& r) { return s + r.marks; });
    std::cout << "passed " << passed << ", mean " << static_cast<double>(total) / rs.size() << '\n';

    std::vector<int> v{4, 1, 7, 3};
    std::vector<int> sq(v.size());
    std::transform(v.begin(), v.end(), sq.begin(), [](int x) { return x * x; });
    auto [mn, mx] = std::minmax_element(sq.begin(), sq.end());
    std::cout << "squares min " << *mn << " max " << *mx << '\n';
}
```

Output:

```text
Meet:91 Sahaj:88 Asha:72 Ravi:35 
first fail: Ravi
passed 3, mean 71.5
squares min 1 max 49
```
