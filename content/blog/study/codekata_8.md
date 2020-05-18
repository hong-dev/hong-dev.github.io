---
title: "[CodeKata] 8"
date: "2020-02-25T11:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_8"
category: "algorithm"
tags:
  - "Python"
  - "CodeKata"
description: "문자로 구성된 배열을 input으로 전달하면, 문자를 뒤집어서 return 하라."
socialImage: ""
---


```
문자로 구성된 배열을 input으로 전달하면, 문자를 뒤집어서 return 하라.

Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

## My Solution
* python에서 가장 좋아하는 index method.\
list든 string이든 이 방법으로 얼마든지 잘라올 수 있다.

### _list[시작index : 끝index : 다음element와의 index차이]_

```python
def reverseString(s):
    return s[::-1]
```

## Model Solution
* while문 사용\
맨 앞의 element와 맨 뒤의 element 값을 서로 바꿔주고, 한칸씩 안쪽으로 들어오면서 같은 작업을 반복한다.

```python
def reverseString(s) :
    a, b = 0, len(s) - 1

    while a <= b:
        s[a], s[b] = s[b], s[a]
        a += 1
        b -= 1
        
    return s
```



<br>
<br>

    Reference:
    wecode codekata replit day12