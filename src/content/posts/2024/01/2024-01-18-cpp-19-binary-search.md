---
title: "C++ · DSA: binary search"
categories: ["study"]
tags: ["cpp", "dsa"]
summary: "Binary search by hand with the overflow-safe midpoint, then std::lower_bound, upper_bound and binary_search."
sources: 
  - title: "std::lower_bound"
    url: "https://en.cppreference.com/w/cpp/algorithm/lower_bound"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:50.690Z"
  - title: "std::binary_search"
    url: "https://en.cppreference.com/w/cpp/algorithm/binary_search"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:51.318Z"
  - title: "MIT 6.006 Introduction to Algorithms (Spring 2020)"
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T15:37:50.256Z"
highlights: ["Binary search halves the search range each step, so it needs O(log n) comparisons, but only on sorted data.", "lower_bound returns the first position where the value could be inserted without breaking the order."]
phase: 2
step: 19
draft: false
date: "2024-01-18"
---

On **sorted** data, binary search compares against the middle element and throws away half the range each step. That's O(log n): about 20 steps for a million items.

Details I wanted to get right:

- Compute the midpoint as `lo + (hi - lo) / 2`. Writing `(lo + hi) / 2` can overflow an `int`.
- Use a half-open range `[lo, hi)` consistently. Most off-by-one bugs come from mixing conventions.
- The STL already has it:
  - `std::binary_search` gives yes or no.
  - `std::lower_bound` gives the first element `>= x`.
  - `std::upper_bound` gives the first element `> x`.
  - `upper_bound - lower_bound` counts the copies of `x`.

```cpp run
#include <algorithm>
#include <iostream>
#include <vector>

int search(const std::vector<int>& a, int x, int& steps) {
    int lo = 0, hi = static_cast<int>(a.size());       // [lo, hi)
    steps = 0;
    while (lo < hi) {
        ++steps;
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == x) return mid;
        if (a[mid] < x) lo = mid + 1; else hi = mid;
    }
    return -1;
}

int main() {
    std::vector<int> a;
    for (int i = 0; i < 1'000'000; ++i) a.push_back(2 * i);  // sorted even numbers

    int steps;
    std::cout << "index of 777776: " << search(a, 777776, steps) << " in " << steps << " steps\n";
    std::cout << "index of 777777: " << search(a, 777777, steps) << " in " << steps << " steps\n";

    std::vector<int> b{1, 3, 3, 3, 5, 8};
    auto lo = std::lower_bound(b.begin(), b.end(), 3);
    auto hi = std::upper_bound(b.begin(), b.end(), 3);
    std::cout << "3 appears " << (hi - lo) << " times, first at " << (lo - b.begin()) << '\n';
    std::cout << "has 4? " << std::binary_search(b.begin(), b.end(), 4) << '\n';
}
```

Output:

```text
index of 777776: 388888 in 20 steps
index of 777777: -1 in 20 steps
3 appears 3 times, first at 1
has 4? 0
```
