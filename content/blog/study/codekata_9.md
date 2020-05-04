---
title: "[CodeKata] 9"
date: "2020-02-26T11:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_9"
category: "python"
tags:
  - "Python"
  - "CodeKata"
description: "높이 값을 받아서 물을 담는다고 생각하고, 물을 담을 수 있는 가장 넓은 면적의 값을 반환하라."
socialImage: ""
---


```
숫자의 배열인 height는 y축의 값(높이 값)으로 받는다.
그래프에 물을 담는다고 생각하고, 물을 담을 수 있는 가장 넓은 면적의 값을 반환하라.
```

## My Solution
* for문을 2번 돌려서, x좌표를 2개씩 찍고 곱하여 면적을 구한다.\
가로길이는 2개의 x좌표(index)의 거리 차이로 구한다.
높이는 물을 담아야 하기 때문에 2개의 높이 중 낮은 높이로 적용한다.

```python
def get_max_area(height):
    largest_area = 0

    for index_x1 in range(len(height)-1, -1, -1):
	    for index_x2 in range(index_x1):
	        if height[index_x1] < height[index_x2]:
	            area = (index_x1 - index_x2) * height[index_x1]
	        else:
	            area = (index_x1 - index_x2) * height[index_x2]
	       
	        largest_area = max(largest_area, area)

    return largest_area
```

## Model Solution
* while문 사용.\
점을 두개를 찍어야 하거나, index를 두 개를 동시에 돌릴 때 (`이중 for문을 돌려야 할 때`) while문을 고려해야겠다.

```python
def get_max_area(height):
	l = 0
	r = len(height) -1
	area = 0
	while l < r: 
		area = max(area, min(height[l],height[r]) * (r - l))
		if height[l] < height[r]: 
			l += 1
		else:
		    r -= 1
	return area 
```



<br>
<br>

    Reference:
    wecode codekata replit