---
title: "[CodeKata] 1"
date: "2020-02-10T17:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_1"
category: "python"
tags:
  - "Python"
  - "CodeKata"
description: "함수에 숫자 리스트와 '특정 수'를 인자로 넘기면, 더해서 '특정 수'가 나오는 index를 배열에 담아 return 하라."
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
함수에 숫자 리스트와 '특정 수'를 인자로 넘기면, 더해서 '특정 수'가 나오는 index를 배열에 담아 return 하라.
</div>

### my solution 1

- 같은 숫자 리스트를 이중 for문으로 돌려서 하나하나 더하면서 더했을 때 특정 수가 나오는 쌍을 찾는다.
- 이렇게 하면 같은 index끼리 값이 중복될 수도 있어서 문제가 생길 수 있다.


```python
def two_sum(nums, target):
	for index1 in range(len(nums)):
		for index2 in range(len(nums)):
			if nums[i] + nums[j] == target:
				return [i, j]
```

### my solution 2

- solution 1의 중복 문제를 해결하기 위한 다른 방법
- 특정 수에서 원본 리스트의 element 값들을 뺀 새로운 값들의 list를 만들고, 새로운 element들이 원본 리스트에 있는지 확인하여 값을 도출한다.

```python
def two_sum(nums, target):
	target_minus = []
	for value in nums:
		target_minus.append(target-value)
	return [index for index in range(len(target_minus)) if target_minus[index] in nums]
```

### model solution
- 숫자 리스트의 길이만큼 for문을 돌리면서, 더해서 특정 수가 나오는 값이 원본 리스트에 있으면 return 하는 방식으로 구현한다.

```python
def two_sum(nums, target):
	index_map = {}
	for i in range(len(nums)):
		num = nums[i]
		pair = target - num
		if pair in index_map:
			return [index_map[pair], i]
		index_map[num] = i
	return None
```

<p>

```
Reference:
wecode codekata replit
```