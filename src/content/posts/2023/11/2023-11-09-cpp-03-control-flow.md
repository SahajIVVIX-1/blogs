---
title: "C++ · Control flow"
categories: ["study"]
tags: ["cpp", "control-flow"]
summary: "if/else, switch, the three kinds of for loop, while and do-while, written next to their Python equivalents."
sources: 
  - title: "if statement"
    url: "https://en.cppreference.com/w/cpp/language/if"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:22.492Z"
  - title: "Range-based for loop"
    url: "https://en.cppreference.com/w/cpp/language/range-for"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:22.929Z"
  - title: "switch statement"
    url: "https://en.cppreference.com/w/cpp/language/switch"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:24.215Z"
highlights: ["The range-based for loop (for (auto x : v)) is the closest thing to Python's for.", "In a switch, a missing break falls through to the next case."]
phase: 2
step: 3
draft: false
date: "2023-11-09"
---

The ideas are the same as in Python. The syntax uses braces and needs parentheses around conditions.

- `if (cond) { } else if (...) { } else { }`
- `switch` on an integer or char. Without `break`, execution **falls through** into the next case.
- Classic `for (init; cond; step)`.
- **Range-based** `for (auto x : container)` is the closest thing to Python's `for x in list`.
- `while (cond)` checks first. `do { } while (cond);` always runs at least once.

```cpp run
#include <iostream>
#include <vector>

int main() {
    for (int n : {7, 12, 0}) {
        if (n == 0) std::cout << n << " zero\n";
        else if (n % 2 == 0) std::cout << n << " even\n";
        else std::cout << n << " odd\n";
    }

    char grade = 'B';
    switch (grade) {
        case 'A': std::cout << "excellent\n"; break;
        case 'B': std::cout << "good\n";      break;
        default:  std::cout << "keep going\n";
    }

    std::vector<int> marks{88, 79, 95};
    int sum = 0;
    for (std::size_t i = 0; i < marks.size(); ++i) sum += marks[i];
    std::cout << "sum " << sum << '\n';

    int n = 1;
    do { n *= 3; } while (n < 100);
    std::cout << "first power of 3 >= 100: " << n << '\n';
}
```

Output:

```text
7 odd
12 even
0 zero
good
sum 262
first power of 3 >= 100: 243
```
