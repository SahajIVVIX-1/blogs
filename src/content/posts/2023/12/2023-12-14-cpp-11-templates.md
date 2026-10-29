---
title: "C++ · Templates"
categories: ["study"]
tags: ["cpp", "templates"]
summary: "Function and class templates, how the compiler stamps out one version per type, and how this differs from Python's duck typing."
sources: 
  - title: "Templates"
    url: "https://en.cppreference.com/w/cpp/language/templates"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:36.660Z"
  - title: "Function templates"
    url: "https://en.cppreference.com/w/cpp/language/function_template"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:37.460Z"
  - title: "Class templates"
    url: "https://en.cppreference.com/w/cpp/language/class_template"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:38.080Z"
highlights: ["A template is a blueprint; the compiler generates real code for each type you use it with.", "Type errors in templates show up at compile time, not at runtime as in Python."]
phase: 2
step: 11
draft: false
date: "2023-12-14"
---

Templates are how C++ writes generic code. `template <typename T>` before a function or class turns it into a **blueprint**. When you call `maxOf(3, 7)`, the compiler generates a real `maxOf<int>`. Calling it with `double` generates another version.

This is the compile-time cousin of Python's duck typing. If `T` doesn't support an operation the template uses, it's a **compile error**, not a runtime one. The whole STL (`vector<T>`, `map<K, V>`) is built from templates.

```cpp run
#include <iostream>
#include <string>

template <typename T>
T maxOf(T a, T b) { return (a > b) ? a : b; }

template <typename T>
class Box {
public:
    explicit Box(T v) : value_(v) {}
    T get() const { return value_; }
    template <typename F>
    auto map(F f) const { return Box<decltype(f(value_))>(f(value_)); }
private:
    T value_;
};

int main() {
    std::cout << maxOf(3, 7) << ' ' << maxOf(2.5, 1.5) << ' '
              << maxOf(std::string("numpy"), std::string("pandas")) << '\n';

    Box<int> b(21);
    auto doubled = b.map([](int x) { return x * 2; });
    auto text = doubled.map([](int x) { return "value=" + std::to_string(x); });
    std::cout << doubled.get() << ' ' << text.get() << '\n';
}
```

Output:

```text
7 2.5 pandas
42 value=42
```
