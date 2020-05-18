---
title: "[CodeKata] 7"
date: "2020-02-22T10:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_7"
category: "algorithm"
tags:
  - "Python"
  - "CodeKata"
description: "숫자들의 배열인 nums를 인자로 전달받아, 숫자중에서 과반수(majority)가 넘은 숫자를 반환하라."
socialImage: ""
---


```
숫자 배열을 인자로 전달받아, 숫자중에서 과반수가 넘은 숫자를 반환하라.
ex) nums = [2,2,1,1,1,2,2]
```

## My Solution

- 배열의 길이를 2로 나눠서 과반수인지 구분할 기준을 만든다.
- nums 배열을 set로 바꾼다. set의 element들을 원본 배열에서 count하여 과반수가 넘는 element를 반환한다.

```python
def more_than_half(nums):
    majority = len(nums) / 2
    
    for num in set(nums):
        if nums.count(num) > majority:
            return num
```

### *set()*

- 중복값을 없애주지만, 순서가 없고 index도 없다.

## Model Solution 1

- for문을 돌려서 하나씩 +1으로 count 해서 과반수가 넘는 것을 return한다.

```python
def more_than_half(nums):
    majority_count = len(nums)//2
    for num in nums:
        count = sum(1 for elem in nums if elem == num)
        if count > majority_count:
            return num
```

## Model Solution 2

- Count 함수로 element와 개수를 dictionary로 담은 후, max 값을 반환한다.

```python
from collections import Counter

def more_than_half(nums):
    counts = Counter(nums)
    return max(counts.keys(), key=counts.get)
```

### *count()*

- list에 있는 element들의 개수를 세어 key-value 형태의 dictionary로 만들어준다.

### *dictionary.get('key')*

- dictionary key 값에 해당하는 value 값을 반환한다.
- `dictionary.get('key', 'default')` 형태로 사용하면, key가 없을 때 default 값을 반환한다.

## Model Solution 3

- sort를 사용하여 오름차순으로 정렬하면, 같은 값들끼리 모이게 된다.\
    그리고 과반수에 해당하는 index 값을 찾아서 반환한다.

```python
def more_than_half(nums):
    nums.sort()
    return nums[len(nums)//2]
```

### *list.sort()*

- `list.sort(reverse=True|False, key=myFunc)` 형태의 option들을 사용할 수 있다.
- **list.sort()** 라고 하면 기본이 오름차순이고, **list.sort(reverse=True)** 로 하면 내림차순이다.
- key는 어떤 것을 기준으로 정렬할지를 말해준다.


<p>

```
Reference:
wecode codekata day7 replit
```