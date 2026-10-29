---
title: "C++ · OOP: inheritance and virtual functions"
categories: ["study"]
tags: ["cpp", "oop"]
summary: "Public inheritance, virtual functions and runtime polymorphism, override, pure virtual (abstract) classes, and virtual destructors."
sources: 
  - title: "Virtual function specifier"
    url: "https://en.cppreference.com/w/cpp/language/virtual"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:35.038Z"
  - title: "Abstract class"
    url: "https://en.cppreference.com/w/cpp/language/abstract_class"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:35.842Z"
  - title: "C++ Core Guidelines C.35: base class destructor"
    url: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rc-dtor-virtual"
    publisher: "Standard C++ Foundation"
    fetched_at: "2026-10-29T15:37:36.232Z"
highlights: ["Only virtual functions are dispatched on the object's real type at runtime.", "A base class used polymorphically needs a virtual destructor."]
phase: 2
step: 10
draft: false
date: "2023-12-11"
---

In Python every method call is resolved at runtime. In C++ you have to *ask* for that with `virtual`:

- A `virtual` method called through a base pointer or reference runs the **derived** class's version. Without `virtual`, the base version runs.
- Mark overrides with `override` so the compiler catches signature typos.
- `= 0` makes a method **pure virtual**, and the class becomes abstract (you can't create one directly).
- A base class used through pointers needs a `virtual` destructor (Core Guideline C.35). Otherwise deleting through a base pointer skips the derived destructor.

```cpp run
#include <iostream>
#include <memory>
#include <vector>

struct Shape {
    virtual ~Shape() = default;
    virtual double area() const = 0;              // pure virtual
    virtual const char* name() const { return "shape"; }
    const char* plainName() const { return "shape (non-virtual)"; }
};

struct Circle : Shape {
    double r;
    explicit Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
    const char* name() const override { return "circle"; }
};

struct Rect : Shape {
    double w, h;
    Rect(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    const char* name() const override { return "rect"; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(1.0));
    shapes.push_back(std::make_unique<Rect>(2.0, 3.0));
    for (const auto& s : shapes)
        std::cout << s->name() << " / " << s->plainName() << " -> " << s->area() << '\n';
}
```

Output:

```text
circle / shape (non-virtual) -> 3.14159
rect / shape (non-virtual) -> 6
```
