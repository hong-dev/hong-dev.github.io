---
title: "[CodeKata] 5"
date: "2020-02-23T11:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_5"
category: "python"
tags:
  - "Python"
  - "CodeKata"
description: "숫자로 이루어진 배열 nums를 받아서, 가장 자주 등장한 숫자를 k 개수만큼 return 하라."
socialImage: ""
---


```
숫자로 이루어진 배열 nums를 받아서, 가장 자주 등장한 숫자를 k 개수만큼 return 하라.


ex)
nums = [1,1,1,2,2,3], k = 2
#return [1,2]
```

## My Solution

```python
def top_k(nums, k):
    set_nums = set(nums)
    count_nums = {}
    result = []
    
    for num in set_nums:
        count_nums[num] = nums.count(num)
        
    count_nums = sorted(count_nums.items(), key=lambda x : x[1], reverse=True)
    
    return [num[0] for num in count_nums if count_nums.index(num) < k]
```

## Model Solution

```python
def top_k(nums, k):
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1
    bucket = [[] for _ in range(len(nums)+1)]
    for n, freq in count.items():
        bucket[freq].append(n)
    ret = []
    for n_list in bucket[::-1]:
        if n_list:
            ret.extend(n_list)
            if len(ret) == k:
                return ret
```
<br>
<br>

    Reference:
    wecode codekata replit day9