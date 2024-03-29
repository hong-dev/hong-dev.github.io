---
title: "Item 6: Prefer Multiple Assignment Unpacking Over Indexing"
date: "2020-08-24T10:12:04.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 6: Prefer Multiple Assignment Unpacking Over Indexing
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 6: Prefer Multiple Assignment Unpacking Over Indexing

### Tuple

- immutable and ordered sequences of values (값을 바꿀 수 없고 순서가 있음)
- 가장 simple한 case는, dictionary의 key-value 처럼 two values의 pair
- index로 접근 가능
- tuple 값이 한번 정해지면, assign 해서 값을 바꾸려하면 `TypeError` 발생  
(TypeError: 'tuple' object does not support item assignment)

<br>

### Unpacking

- 여러 개의 값을 assign 하는 문법
- assign해서 tuple 값을 바꾸는 것처럼 보이지만 실제로 바꾸는 것은 아니다.
- unpacking은 python에서 일반화 되어있고, 다양한 반복 표현 안에서 적용 가능하다.
- **tuple의 index로 접근하는 것보다 unpacking 하는 것이 훨씬 깔끔하고 때로는 코드 줄 수가 더 적다.**  
굳이 index로 접근해야 하는 경우는 잘 없다.

    ```python
    item = ('A', 'B')
    first, second = item

    print(first, 'and', second)
    >>> A and B
    ```

- unpacking에 관한 다른 chapters:  
**Item 13** (for list construction): Prefer Catch-All Unpacking Over Slicing  
**Item 22** (for function arguments): Reduce Visual Noise with Variable Positional Arguments  
**Item 23** (for keyword arguments): Provide Optional Behavior with Keyword Arguments  
**Item 19** (for multiple return values): Never Unpack More Than Three Variables When Functions Return Multiple Values

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  