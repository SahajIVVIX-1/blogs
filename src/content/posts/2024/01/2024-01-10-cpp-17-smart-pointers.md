---
title: "C++ · Smart pointers"
categories: ["study"]
tags: ["cpp", "memory"]
summary: "unique_ptr for single ownership, shared_ptr with reference counting, weak_ptr to break cycles, and make_unique/make_shared."
sources: 
  - title: "std::unique_ptr"
    url: "https://en.cppreference.com/w/cpp/memory/unique_ptr"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:47.352Z"
  - title: "std::shared_ptr"
    url: "https://en.cppreference.com/w/cpp/memory/shared_ptr"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:47.963Z"
  - title: "C++ Core Guidelines R.20: use unique_ptr or shared_ptr to represent ownership"
    url: "https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Rr-owner"
    publisher: "Standard C++ Foundation"
    fetched_at: "2026-10-29T15:37:48.124Z"
highlights: ["unique_ptr has exactly one owner and can only be moved, never copied.", "shared_ptr frees the object when the last owner goes away, which is like Python's reference counting."]
phase: 2
step: 17
draft: false
date: "2024-01-10"
---

Smart pointers are RAII for heap memory. Modern C++ code almost never needs a raw `delete`.

- `std::unique_ptr<T>`: **one owner**. It can be *moved* but not copied, and the object is freed when the owner goes away. Create one with `std::make_unique<T>(...)`.
- `std::shared_ptr<T>`: **shared ownership** through a reference count. The object is freed when the count drops to 0. This is close to how CPython manages objects.
- `std::weak_ptr<T>`: observes a `shared_ptr` without owning it, which breaks reference cycles.

My default from now on: `unique_ptr`, switching to `shared_ptr` only when ownership is genuinely shared.

```cpp run
#include <iostream>
#include <memory>
#include <string>
#include <utility>

struct Model {
    std::string name;
    explicit Model(std::string n) : name(std::move(n)) { std::cout << "load " << name << '\n'; }
    ~Model() { std::cout << "free " << name << '\n'; }
};

int main() {
    auto a = std::make_unique<Model>("unique-model");
    auto b = std::move(a);                         // ownership moves
    std::cout << "a empty? " << (a == nullptr) << ", b owns " << b->name << '\n';

    std::weak_ptr<Model> watcher;
    {
        auto s1 = std::make_shared<Model>("shared-model");
        watcher = s1;
        {
            auto s2 = s1;
            std::cout << "use_count " << s1.use_count() << '\n';
        }
        std::cout << "use_count " << s1.use_count() << ", expired? " << watcher.expired() << '\n';
    }
    std::cout << "after scope, expired? " << watcher.expired() << '\n';
}
```

Output:

```text
load unique-model
a empty? 1, b owns unique-model
load shared-model
use_count 2
use_count 1, expired? 0
free shared-model
after scope, expired? 1
free unique-model
```
