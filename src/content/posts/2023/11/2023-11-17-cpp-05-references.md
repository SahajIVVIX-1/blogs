---
title: "C++ · References"
categories: ["study"]
tags: ["cpp", "references"]
summary: "References as aliases, pass-by-value vs pass-by-reference, and const references for passing big objects cheaply."
sources: 
  - title: "Reference declaration"
    url: "https://en.cppreference.com/w/cpp/language/reference"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:26.522Z"
  - title: "Pass by lvalue reference"
    url: "https://www.learncpp.com/cpp-tutorial/pass-by-lvalue-reference/"
    publisher: "LearnCpp.com"
    fetched_at: "2026-10-29T15:37:26.997Z"
  - title: "C++ Core Guidelines F.16: pass cheap types by value, others by const reference"
    url: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rf-in"
    publisher: "Standard C++ Foundation"
    fetched_at: "2026-10-29T15:37:28.161Z"
highlights: ["A reference is another name for an existing variable; it can't be null and can't be reseated.", "Pass large objects as const T& so you avoid a copy without allowing changes."]
phase: 2
step: 5
draft: false
date: "2023-11-17"
---

A **reference** (`int& r = x;`) is an *alias*: a second name for an existing variable. Unlike a pointer:

- it must be initialised and can't be null
- it can't be re-pointed to another variable
- there's no `*` to dereference it; you just use it like the variable

How references change function calls:

| signature | the function gets | can change the caller's value? | copies? |
|---|---|---|---|
| `f(std::string s)` | a copy | no | yes |
| `f(std::string& s)` | the original | yes | no |
| `f(const std::string& s)` | the original, read-only | no | no |

The C++ Core Guidelines advise passing cheap types (int, double) by value and bigger ones by `const&`.

```cpp run
#include <iostream>
#include <string>

void byValue(std::string s)        { s += "!"; }
void byRef(std::string& s)         { s += "!"; }
std::size_t length(const std::string& s) { return s.size(); }   // no copy, no change

void swapInts(int& a, int& b) { int t = a; a = b; b = t; }

int main() {
    int x = 1;
    int& r = x;
    r = 99;
    std::cout << "x=" << x << '\n';

    std::string msg = "hello";
    byValue(msg); std::cout << msg << '\n';
    byRef(msg);   std::cout << msg << '\n';
    std::cout << "length " << length(msg) << '\n';

    int a = 3, b = 8;
    swapInts(a, b);
    std::cout << "a=" << a << " b=" << b << '\n';
}
```

Output:

```text
x=99
hello
hello!
length 6
a=8 b=3
```
