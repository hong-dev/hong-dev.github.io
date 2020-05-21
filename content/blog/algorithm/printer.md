---
title: "중요도가 높은 순서대로 인쇄할 때 인쇄 순서 찾기"
date: "2020-05-21T11:21:03.284Z"
template: "post"
draft: false
category: "algorithm"
tags:
  - "Python"
  - "Algorithm"
description: "중요도가 높은 순서대로 인쇄할 때 인쇄 순서 찾기"
socialImage: ""
---


> 각 element들의 중요도 list(priorites)와, 값을 구해야 하는 element의 index(location)가 input으로 주어진다.    
> priorites의 0번째 element의 중요도가 list 중에서 가장 높으면 인쇄하고, 가장 높지 않으면 맨 뒤로 보낸다.    
> 중요도가 높은 순서대로 인쇄할 때, location을 index로 가지는 element는 몇 번째로 인쇄되는지 구하여라.  
> (중요도는 중복되는 값이 존재할 수 있다.)

<br>

### Think
1. 중요도의 중복값이 없다면, 중요도 순서대로 줄세워서 계산하면 되지 않을까?  
그렇게 되면 중복값이 있을 때와 없을 때를 따로 계산해야 해서 비효율적이다.
2. 중요도가 높지 않으면 차례대로 list 맨 뒤로 보내야 하는데, list 순서를 바꾸면 index도 바뀐다.  
location으로 고정된 index를 받게 되니, index가 함께 가려면 순서가 바뀔 때마다 index를 같이 변경시켜준다.  
혹은, 원본 priorites input을 index와 value로 고정시켜서 묶어버리는 방법도 있다.


<br>

### Model Solution 1
* priorities의 순서가 바뀔 때마다 location의 값도 바꿔주는 방식

```python
def solution(priorities, location):
    answer = 0
    max_num = max(priorities)
    while True:
        v = priorities.pop(0)
        if max_num == v:
            answer += 1
            if location == 0:
                break
            else:
                location -= 1
            max_num = max(priorities)
        else:
            priorities.append(v)
            if location == 0:
                location = len(priorities)-1
            else:
                location -= 1
    return answer
```

<br>


### Model Solution 2
* priorites의 값을 index와 value의 tuple로 묶어서 고정하는 방식

```python
def solution(priorities, location):
    queue = [(val, idx) for idx, val in enumerate(priorities)] 
    count = 0
    while True:
        if queue[0][0] == max(queue, key = lambda x:x[0])[0]:
            count += 1
            if queue[0][1] == location:
                return count
            else:
                queue.pop(0)
        else:
            queue.append(queue.pop(0))
```

<br>

> Reference: [프로그래머스 스택/큐 프린터 문제](https://programmers.co.kr/learn/challenges)

<br>
<br>

> \#wecode #위코드