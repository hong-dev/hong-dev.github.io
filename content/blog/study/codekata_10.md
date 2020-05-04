---
title: "[CodeKata] 10"
date: "2020-03-11T11:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_10"
category: "python"
tags:
  - "Python"
  - "CodeKata"
description: "주어진 숫자 list에서, 0을 list의 마지막쪽으로 이동시키기. 원래 있던 숫자의 순서는 바꾸지 않기."
socialImage: ""
---


```
주어진 숫자 list에서, 0을 list의 마지막쪽으로 이동시켜라.
원래 있던 숫자의 순서는 바꾸지 말고, 새로운 list도 만들면 안 된다.
```

## My Solution
* nums list의 값을 하나씩 체크하면서 0이 나오면 그 값을 없애고 맨 뒤에 0을 붙인다.
* list에서 중간에 값을 더하거나 뺄 때 주의해야 할 점이 있다.\
list 중간의 값이 제거되면 그 뒤의 element들은 모두 붙어서 index가 당겨오게 된다.\
그래서 for문이 돌면서 list를 수정하면 그 뒤의 for문에서 영향을 받는다.\
아래의 solution도 분명히 문제가 있을 것 같아서 예시를 많이 넣어봤는데 return은 모두 제대로 된다. 예외사항을 아직 찾지 못했다.\
그러나 print(i)를 해보니 역시나 값을 건너뛰면서 실행하고 있다.

```python
def moveZeroes(nums):
  for i in nums:
      if i == 0:
        nums.remove(i)
        nums.append(i)
         
  return nums
```

## Model Solution
* for문으로 값을 돌면서 0이 아닌 것을 만나면 0과 순서를 바꾸는 방법.\
두개의 순서를 바꿀 때, 뒤집어서 할당하는 방식을 사용할 수 있다.

```python
def moveZeroes(nums):
  last0 = 0
  
  for i in range(0, len(nums)):
    if nums[i] != 0:
      nums[i], nums[last0] = nums[last0], nums[i]
      last0 += 1
      
  return nums
```



<br>
<br>

    Reference:
    wecode codekata replit