---
title: "[Python] list, tuple, set"
date: "2020-02-07T11:12:03.284Z"
template: "post"
draft: false
slug: "python/list_tuple_set"
category: "python"
tags:
  - "Python"
description: "List, Tuple, Set"
socialImage: ""
---



## 1. LIST

- **list(); [element, element, ...]**
- mutable; 원본 list를 변경, 수정, 추가가 가능하다.
- list는 수정이 가능하고 여러 수의 요소들을 저장할 수 있도록 되어 있어서, 차지하는 메모리 용량이 tuple보다 크다. (더 많은 flexibility를 제공하기 때문)

## 2. TUPLE

- **tuple(); (element, element, ...)**
- immutable
- 일반적으로 2개에서 5개 사이의 요소들을 저장할때 사용
- 괄호로 묶지 않고 값을 나열해도 tuple이 됨
- 읽기 전용 list
- 차지하는 메모리 용량이 list > tuple (기능이 제한적이기 때문)\
수정이 필요없고 간단한 형태의 데이터를 표현할 때는 tuple을 사용하는 게 훨씬 더 효과적이다.

## 3. SET

- **set(); {element, element, ...}**
- elements의 순서가 없다. ordering이 없다(unordered). indexing도 없다.
- 중복된 값을 저장할 수 없다.\
새로 추가하는 요소와 동일한 값의 요소가 존재한다면, 새로운 요소가 이 전 요소를 replace한다.

## 4. DICTIONARY

- **dict(); {"key": value, "key": value, ...}**: key-value pair
- mutable
- key에는 list와 dictionary** 사용불가. 숫자는 가능
- key값은 중복될 수 없다. 이미 존재하는 key 값이 추가되면 기존의 key 값의 요소를 replace한다.

```python
딕셔너리 = dict(키1=값1, 키2=값2)    #여기는 키와 값이 string이어도 ""를 안한다.
딕셔너리 = dict(zip([키1, 키2], [값1, 값2]))
딕셔너리 = dict([(키1, 값1), (키2, 값2)])   #이건 list를 넣은 것인데 tuple을 그냥 넣는 건 안되나?
딕셔너리 = dict({키1: 값1, 키2: 값2})
```

### dictionary 사용하기

1) dictionary에서 `not in`, `in`은 key값에만 작동한다.

2) value값이 dict에 있는지 확인하려면, `.values()`를 사용

3) key-value pair가 있는지 확인하려면, `.items()`를 사용 가능\
단, items()는 (key, value) 형식의 tuple로 return하기 때문에 주의

```python
key1 in dict1  #1) dict1의 key값에 key1이 있는지 체크

value1 in dict1.values()  #2) dict1의 value값에 value1이 있는지 체크

(key, value) in dict1.items()  #3) dict1에 key-value pair가 있는지 체크
```