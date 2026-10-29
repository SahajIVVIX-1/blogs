---
title: "C++ · DSA: stack and queue"
categories: ["study"]
tags: ["cpp", "dsa"]
summary: "LIFO stacks and FIFO queues with std::stack and std::queue, plus two classic uses: bracket matching and BFS."
sources: 
  - title: "std::stack"
    url: "https://en.cppreference.com/w/cpp/container/stack"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:48.585Z"
  - title: "std::queue"
    url: "https://en.cppreference.com/w/cpp/container/queue"
    publisher: "cppreference.com"
    fetched_at: "2026-10-29T15:37:49.151Z"
  - title: "MIT 6.006 Introduction to Algorithms (Spring 2020)"
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
    publisher: "MIT OpenCourseWare"
    fetched_at: "2026-10-29T15:37:50.256Z"
highlights: ["A stack is last-in-first-out; a queue is first-in-first-out.", "Breadth-first search is just a queue of nodes to visit next."]
phase: 2
step: 18
draft: false
date: "2024-01-15"
---

I started the DSA block of the C++ phase.

- **Stack** (LIFO): push to the top and pop from the top. Uses: undo, call stacks, checking balanced brackets.
- **Queue** (FIFO): push at the back and pop from the front. Uses: scheduling, breadth-first search.

`std::stack` and `std::queue` are *adapters* around a `std::deque`. Note that `pop()` returns nothing, so you read `top()` or `front()` first.

```cpp run
#include <iostream>
#include <queue>
#include <stack>
#include <string>
#include <vector>

bool balanced(const std::string& s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (st.empty()) return false;
            char o = st.top(); st.pop();
            if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) return false;
        }
    }
    return st.empty();
}

int main() {
    for (std::string s : {"{a[b(c)]}", "(]", "((x)"})
        std::cout << s << " -> " << (balanced(s) ? "balanced" : "not balanced") << '\n';

    // BFS on a small graph: 0-1, 0-2, 1-3, 2-3, 3-4
    std::vector<std::vector<int>> g{{1, 2}, {0, 3}, {0, 3}, {1, 2, 4}, {3}};
    std::vector<int> dist(g.size(), -1);
    std::queue<int> q;
    q.push(0); dist[0] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : g[u]) if (dist[v] == -1) { dist[v] = dist[u] + 1; q.push(v); }
    }
    for (std::size_t i = 0; i < dist.size(); ++i) std::cout << "dist(0," << i << ")=" << dist[i] << ' ';
    std::cout << '\n';
}
```

Output:

```text
{a[b(c)]} -> balanced
(] -> not balanced
((x) -> not balanced
dist(0,0)=0 dist(0,1)=1 dist(0,2)=1 dist(0,3)=2 dist(0,4)=3
```
