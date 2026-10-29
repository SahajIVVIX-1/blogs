---
title: "C++ · DSA: linked list"
categories: ["study"]
tags: ["cpp", "dsa", "pointers"]
summary: "A singly linked list built with unique_ptr nodes: push_front, traversal, in-place reversal, and how it compares with vector."
sources: 
  - title: "std::forward_list"
    url: "https://en.cppreference.com/w/cpp/container/forward_list"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:52.636Z"
  - title: "std::unique_ptr"
    url: "https://en.cppreference.com/w/cpp/memory/unique_ptr"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:47.352Z"
  - title: "MIT 6.006 Introduction to Algorithms (Spring 2020)"
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T15:37:50.256Z"
highlights: ["A linked list gives O(1) insertion at the front but O(n) access by index.", "Using unique_ptr for next pointers makes the list free itself with no manual delete."]
phase: 2
step: 21
draft: false
date: "2024-01-26"
---

The last C++ topic ties pointers, smart pointers and DSA together. A **singly linked list** is a chain of nodes, where each node holds a value and a pointer to the next one.

| operation | linked list | vector |
|---|---|---|
| insert at front | O(1) | O(n) |
| access by index | O(n) | O(1) |
| cache friendliness | poor (nodes are scattered) | great (contiguous) |

In practice `std::vector` wins most of the time because of cache effects. Building a list still teaches pointer manipulation. Owning the `next` node through a `unique_ptr` means the whole list frees itself when the head is destroyed.

```cpp run
#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> next;
};

class List {
public:
    void pushFront(int v) { head_ = std::make_unique<Node>(Node{v, std::move(head_)}); ++size_; }
    void reverse() {
        std::unique_ptr<Node> prev;
        while (head_) {
            auto nxt = std::move(head_->next);
            head_->next = std::move(prev);
            prev = std::move(head_);
            head_ = std::move(nxt);
        }
        head_ = std::move(prev);
    }
    void print() const {
        for (Node* n = head_.get(); n; n = n->next.get()) std::cout << n->value << " -> ";
        std::cout << "null (size " << size_ << ")\n";
    }
private:
    std::unique_ptr<Node> head_;
    std::size_t size_ = 0;
};

int main() {
    List l;
    for (int v : {1, 2, 3, 4, 5}) l.pushFront(v);
    l.print();
    l.reverse();
    l.print();
}
```

Output:

```text
5 -> 4 -> 3 -> 2 -> 1 -> null (size 5)
1 -> 2 -> 3 -> 4 -> 5 -> null (size 5)
```

That ends the C++ phase. Next is NumPy, back in Python, where the memory-layout ideas from these weeks (contiguous arrays, row-major order) show up again.
