---
title: "C++ · Functions and overloading"
categories: ["study"]
tags: ["cpp", "functions"]
summary: "Declaring vs defining functions, default arguments, overloading by parameter types, and lambdas."
sources: 
  - title: "Function declaration"
    url: "https://en.cppreference.com/w/cpp/language/function"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:31.857Z"
  - title: "Overload resolution"
    url: "https://en.cppreference.com/w/cpp/language/overload_resolution"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:32.323Z"
  - title: "Lambda expressions"
    url: "https://en.cppreference.com/w/cpp/language/lambda"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:32.751Z"
highlights: ["Overloading lets several functions share a name as long as their parameter lists differ.", "A lambda is an unnamed function you can define inline, with [captures] deciding what it can see."]
phase: 2
step: 8
draft: false
date: "2023-12-01"
---

- A function must be **declared** before it is called. The declaration (prototype) and the definition can live in different places, which is how header files work.
- **Default arguments** work like Python's, but go in the declaration.
- **Overloading**: several functions can share one name as long as their parameter types differ. The compiler picks the best match at compile time. Python has nothing built in like this.
- **Lambdas**: `[capture](params) { body }`. `[=]` captures by copy and `[&]` by reference.

```cpp run
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

double area(double r);                       // declaration (prototype)

int add(int a, int b)                { return a + b; }
double add(double a, double b)       { return a + b; }
std::string add(const std::string& a, const std::string& b) { return a + b; }

void greet(const std::string& name, const std::string& greeting = "Hello") {
    std::cout << greeting << ", " << name << "!\n";
}

int main() {
    std::cout << add(2, 3) << ' ' << add(2.5, 0.25) << ' ' << add(std::string("C+"), std::string("+")) << '\n';
    greet("Sahaj");
    greet("Sahaj", "Namaste");
    std::cout << area(1.0) << '\n';

    int bonus = 5;
    std::vector<int> marks{70, 85, 92};
    std::for_each(marks.begin(), marks.end(), [bonus](int& m) { m += bonus; });
    for (int m : marks) std::cout << m << ' ';
    std::cout << '\n';
}

double area(double r) { return 3.14159 * r * r; }   // definition later
```

Output:

```text
5 2.75 C++
Hello, Sahaj!
Namaste, Sahaj!
3.14159
75 90 97
```
