---
title: "[Array] #1 Two Sum"
date: "2022-01-09T15:51:03.284Z"
template: "post"
draft: false
category: "leetcode"
tags:
  - "Python"
  - "Algorithm"
  - "List"
  - "Array"
  - "LeetCode"
  - "Dynamic Programming"
description: "Algorithm Problem: Array #1 Two Sum"
socialImage: ""
---


> ## Problem
> Given an array of integers `nums` and an integer `target`,  
> return `indices` of the two numbers such that they add up to `target`.

<br>

## My Solution 1
* Time Limit Exceeded

    ```python
    class Solution:
        def twoSum(self, nums: List[int], target: int) -> List[int]:
            for idx, num in enumerate(nums):
                for idx2, num2 in enumerate(nums):
                    if idx == idx2:
                        continue
                    if num + num2 == target:
                        return [idx, idx2]  
    ```

<br>

## My Solution 2
* Runtime: 1441 ms
* Memory: 15 MB

    ```python
    class Solution:
        def twoSum(self, nums: List[int], target: int) -> List[int]:
            for num in nums:
                partner_num = target - num
                if partner_num == num and nums.count(num) == 2:
                    return [i for i, d in enumerate(nums) if d == num]
                elif partner_num == num:
                    continue
                elif partner_num in nums:
                    return [nums.index(num), nums.index(partner_num)]
    ```

<br>

## My Solution 3
* Runtime: 1381 ms
* Memory: 14.8 MB

    ```python
    class Solution:
        def twoSum(self, nums: List[int], target: int) -> List[int]:
            for idx, num in enumerate(nums):
                partner_num = target - num
                if partner_num == num:
                    if nums.count(num) == 2:
                        nums.pop(idx)
                        return [idx, nums.index(num) + 1]
                elif partner_num in nums:
                    return [idx, nums.index(partner_num)]
    ```

<br>

## Best Solution
* Runtime: 56 ms
* Memory: 15.3 MB

    ```python
    class Solution:
        def twoSum(self, nums: List[int], target: int) -> List[int]:
            seen = {}
            for idx, num in enumerate(nums):
                remaining = target - num
                
                if remaining in seen:
                    return [idx, seen[remaining]]
                
                seen[num] = idx
    ```

<br>
<br>

## Reference
> [_LeetCode 1. Two Sum_](https://leetcode.com/problems/two-sum/)