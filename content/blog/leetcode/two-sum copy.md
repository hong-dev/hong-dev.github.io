---
title: "[Array] #121 Best Time to Buy and Sell Stock"
date: "2022-01-13T10:48:03.284Z"
template: "post"
draft: false
category: "leetcode"
tags:
  - "Python"
  - "Algorithm"
  - "List"
  - "Array"
  - "LeetCode"
description: "Algorithm Problem: Array #121 Best Time to Buy and Sell Stock"
socialImage: ""
---


> ## Problem
> Given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day,  
> return **the maximum profit**. If you cannot achieve any profit, return 0.  
> Make sure you should _buy first and sell next_.




<br>

## My Solution 1
* Time Limit Exceeded

    ```python
    class Solution:
        def maxProfit(self, prices: List[int]) -> int:
            max_profit = 0
            for i in range(len(prices) - 1):
                for j in range(i+1, len(prices)):
                    profit = prices[j] - prices[i]
                    if profit > max_profit:
                        max_profit = profit
                        
            return max_profit
    ```

<br>

## My Solution 2
* Time Limit Exceeded

    ```python
    class Solution:
        def maxProfit(self, prices: List[int]) -> int:
            max_profit = 0
            for i in range(len(prices) - 1):
                max_sell = max(prices[i+1:])
                profit = max_sell - prices[i]
                if profit > max_profit:
                    max_profit = profit
                    
            return max_profit
    ```

<br>

## Best Solution
* Runtime: 1846 ms
* Memory: 25.2 MB

    ```python
    class Solution:
        def maxProfit(self, prices: List[int]) -> int:
            max_profit, min_price = 0, float("inf")
            for price in prices:
                min_price = min(min_price, price)
                max_profit = max(max_profit, price - min_price)
                
            return max_profit
    ```

<br>
<br>

## Reference
> [_LeetCode 121. Best Time to Buy and Sell Stock_](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)