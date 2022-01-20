---
title: "[Array] #217 Contains Duplicate"
date: "2022-01-20T10:48:03.284Z"
template: "post"
draft: false
category: "leetcode"
tags:
  - "Python"
  - "Algorithm"
  - "List"
  - "Array"
  - "LeetCode"
  - "HashTable"
  - "Sorting"
description: ""
socialImage: ""
---


> ## Problem
> Given an integer array `nums`,  
> return _true_ if any value appears **at least twice** in the array,  
> and return _false_ if every element is distinct.



<br>

## My Solution
* Runtime: 953 ms
* Memory: 26 MB

    ```python
    class Solution:
        def containsDuplicate(self, nums: List[int]) -> bool:
            if len(set(nums)) != len(nums):
                return True
            return False
    ```

<br>

## Best Solution
* Runtime: 588 ms
* Memory: 25.9 MB

    ```python
    class Solution:
        def containsDuplicate(self, nums: List[int]) -> bool:
            return len(set(nums)) != len(nums)
    ```

<br>

## Time Complexity
* **Converting list to set:** Iterating list O(n) + Putting element into set O(1) = **O(n)**
* **`len()`: O(1)** (including both set and list length)

<br>
<br>

## Reference
> [_LeetCode 217. Contains Duplicate_](https://leetcode.com/problems/contains-duplicate/)