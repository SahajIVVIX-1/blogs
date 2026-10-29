---
title: "C++ · Pointers"
categories: ["study"]
tags: ["cpp", "pointers", "memory"]
summary: "What a pointer is, & and * operators, nullptr, pointer arithmetic over an array, and why dangling pointers are dangerous."
sources: 
  - title: "Pointer declaration"
    url: "https://en.cppreference.com/w/cpp/language/pointer"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:24.841Z"
  - title: "Introduction to pointers"
    url: "https://www.learncpp.com/cpp-tutorial/introduction-to-pointers/"
    publisher: "LearnCpp.com"
    fetched_at: "2026-10-29T15:37:25.331Z"
  - title: "nullptr"
    url: "https://en.cppreference.com/w/cpp/language/nullptr"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:25.839Z"
highlights: ["A pointer is a variable that holds a memory address.", "Dereferencing a null or dangling pointer is undefined behaviour, so always know what a pointer points to."]
phase: 2
step: 4
draft: false
date: "2023-11-14"
---

This is the topic Python hid from me. A **pointer** is a variable whose value is a **memory address**.

- `&x` gives the address of `x`.
- `int* p = &x;` declares a pointer to an int.
- `*p` **dereferences** the pointer: it reads or writes the value at that address.
- `nullptr` means "points to nothing". Dereferencing it is undefined behaviour.
- Pointer arithmetic: `p + 1` moves forward by one *element*, not one byte.

Python names behave like references to objects. C++ lets me work with the addresses directly, which is powerful but easy to get wrong.

```cpp run
#include <iostream>

void bump(int* p) { if (p) *p += 10; }   // modify caller's variable

int main() {
    int x = 5;
    int* p = &x;
    std::cout << "x=" << x << " *p=" << *p << " (p holds an address: " << (p != nullptr) << ")\n";
    *p = 42;
    std::cout << "after *p = 42, x=" << x << '\n';

    bump(&x);
    std::cout << "after bump, x=" << x << '\n';

    int arr[4] = {10, 20, 30, 40};
    int* q = arr;                          // array decays to pointer to first element
    for (int i = 0; i < 4; ++i) std::cout << *(q + i) << ' ';
    std::cout << "\ndistance arr[3]-arr[0]: " << (&arr[3] - &arr[0]) << " elements\n";

    int* none = nullptr;
    bump(none);                            // safe: checked inside
    std::cout << "null handled\n";
}
```

Output:

```text
x=5 *p=5 (p holds an address: 1)
after *p = 42, x=42
after bump, x=52
10 20 30 40 
distance arr[3]-arr[0]: 3 elements
null handled
```
