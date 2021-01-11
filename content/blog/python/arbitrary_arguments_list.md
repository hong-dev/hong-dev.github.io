---
title: "Arbitrary Argument List"
date: "2021-01-11T21:42:03.284Z"
template: "post"
draft: false
category: "python"
tags:
  - "Python"
description: "0부터 4까지 정수의 제곱 print 하기"
socialImage: ""
---

> ### 0부터 4까지 정수들의 제곱을 각각 한줄씩 print 하기

## Solution 1: for loop
* 쉽게 떠올릴 수 있는 for문을 사용한 방법

  ```python
  for i in range(5):
      print(i**2)

  >>>
  0
  1
  4
  9
  16
  ```

<br>

## Solution 2: list comprehension
* 간단한 for문이라면 list comprehension을 적용하기 쉽다.

  ```python
  [print(i**2) for i in range(5)]

  >>>
  0
  1
  4
  9
  16
  ```
* 보기에는 다를 것 없어 보이지만, ipython으로 실행해봤을 때 위의 for문과 다른 점이 있었다.  
print만 되고 끝나는 것이 아니라 이것 자체로 output이 있다는 것.  
다른 변수에 assign이 될 수 있는 실체가 있는 list comprehension(그 값은 `[None, None, None, None, None]`)이 만들어졌다는 것.

<br>

## Solution 3: arbitrary arguments list
* 이번 포스팅의 주인공, `*[list]` 형태의 사용

  ```python
  print(*[i**2 for i in range(5)], sep='\n')

  >>>
  0
  1
  4
  9
  16
  ```

<br>

* `*(asterisk)`를 사용하지 않으면? :arrow_right: 예상할 수 있듯이 하나의 list가 print 된다.

  ```python
  print([i**2 for i in range(5)], sep='\n')

  >>>
  [0, 1, 4, 9, 16]
  ```

<br>

* `sep=` 옵션을 사용하지 않는다면? :arrow_right: 띄어쓰기로 하나씩 print 된다.

  ```python
  print(*[i**2 for i in range(5)])

  >>>
  0 1 4 9 16
  ```

<br>
<br>

### _Reference_
> [_HackerRank_](https://www.hackerrank.com)  
> [_python3 docs: arbitrary argument lists_](https://docs.python.org/3/tutorial/controlflow.html#arbitrary-argument-lists)