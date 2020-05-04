---
title: "[Python] list에서 홀수인 요소들만 삭제"
date: "2020-02-06T11:12:03.284Z"
template: "post"
draft: false
slug: "python/list_element_delete"
category: "python"
tags:
  - "Python"
description: "주어진 list에서 홀수는 전부 지우고 짝수만 남는 list를 return하라."
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
주어진 list에서 홀수는 전부 지우고 짝수만 남는 list를 return하라.
</div>

### Try 1
* list의 모든 요소들을 for문으로 돌려서 각각의 요소들이 홀수인지 판단하고 지우면?

```python
def remove_odd_numbers(numbers):
  for i in numbers:
    if i % 2 == 1:
      numbers.remove(i)
  return numbers
```

#### ⇒ Fail;

**remove를 쓰는 순간, elements의 index가 하나씩 앞으로 당겨지게 된다.**\
(list elements의 index는 고정된 것이 아니라, 사라지거나 추가되면 다시 순서대로 정렬된다.)\
for문은 차례대로 돌고, index는 remove 될 때마다 당겨지면, for문에 걸리지 않고 넘어가는 요소들이 생긴다.

### Try 2
* list를 새로 만들어서 홀수 요소들만 넣어두고, 원본 list에서 홀수 list를 빼면?

```python
def remove_odd_numbers(numbers):
  odd_list = []
  for i in numbers:
    if i % 2 == 1:
      odd_list.append(i)
  return list(set(numbers) - set(odd_list))
```

#### ⇒ Fail;

원본 list에서 홀수 list를 뺄 때, 세트로 변환하여 차집합(difference)을 구하는 게 간단할 것 같아서 실행했다.\
문제는, **세트는 요소의 순서가 정해져 있지 않다.(unordered)**\
그래서 set를 적용하면 원래의 순서에서 홀수만 쏙쏙 뺀 게 아니라 요소 전체가 뒤죽박죽이 된다.

### My Solution
* 홀수 요소들만 넣은 list를 새로 만들고, 원본 list 요소들 중 홀수 list에 포함되지 않은 것들만 새로 list를 만들면?

```python
def remove_odd_numbers(numbers):
  odd_list = []
  result_list = []
  for i in numbers:
    if i % 2 == 1:
      odd_list.append(i)
  for j in numbers:
    if j not in odd_list:
      result_list.append(j)
  return result_list
```

#### ⇒ Pass;

그러나 과연 이게 최선일까 하는 생각. 최대한 for문과 if문을 적게 쓰고 싶다.

### Model Solution

* 원본 list에서 홀수를 제거하는 게 아니라, 짝수인 것만 뽑는 건?

```python
def remove_odd_numbers(numbers):
  numbers = [i for i in numbers if i % 2 == 0]
  return numbers
```

#### ⇒ Pass;

홀수인 요소들을 삭제하는 거라고 인식하다보니, 계속 '삭제'나 '빼기'만 생각했다.\
원본 list에서 짝수인 요소들만 빼내는 게 훨씬 간단한 방법이었는데..\
**답을 구하는 방법을 다양하게 생각해보고, 선입견을 가지지 말고 반대로도 생각해보자.**

**그리고 list를 구하고 싶다면, List Comprehensions(리스트 표현식)을 항상 생각하자.**

#### list comprehension의 기본 형식; _[item for item in iterable]_
<p>