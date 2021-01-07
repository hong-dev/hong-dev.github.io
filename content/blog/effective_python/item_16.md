---
title: "[Effective Python: Second Edition] Item 16: Prefer 'get' Over 'in' and 'KeyError' to Handle Missing Dictionary Keys"
date: "2020-09-14T23:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 16: Prefer `get` Over `in` and `KeyError` to Handle Missing Dictionary Keys
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 16: Prefer `get` Over `in` and `KeyError` to Handle Missing Dictionary Keys

- dictionary의 키가 있는지 없는지 체크할 때, `in` expression 이나 `KeyError` 보다는 `get` method를 사용하라.
- 어떤 경우에는 `get`보다 `setdefault`가 가장 짧은 option처럼 보이는데, 이런 경우에도 `setdefault`보다는 `defaultdict`(Item 17 참조)가 better option이 되는 경우가 많다.

<br>

### 1. `If` statement with an `in` expression

- key가 dictionary에 있는지 확인하고, 없으면 새로운 변수 count에 0이라는 default 값을 할당하고 (있으면 새로운 변수에 현재 value 값을 할당하고), 증가시킨 count의 값을 key에 해당하는 value 값으로 할당한다.
- 이 방법은 키값이 있을 때는 two accesses to key, one assignment이고, 키값이 없으면 one access, one assignment 이다.

    ```python
    fruits = {'apple': 2, 'banana': 1}
    fruit = 'orange'

    # Case 1
    if fruit in fruits:
        count = fruits[fruit]
    else:
        count = 0

    fruits[fruit] = count + 1
    ```

<br>

- 코드를 더 줄일 수 있는 방법도 있지만, assignments에 대해 중복이 생긴다.

    ```python
    # Case 2
    if fruit not in fruits:
        fruits[fruit] = 0
    fruits[fruit] += 1
    ```

<br>

### 2. `KeyError` using try-except

- key 값이 없으면 KeyError exception을 사용해서 처리한다.
- 이 방법은 one access, one assignment 이기 때문에 if ... in 보다 더 효율적이다.

    ```python
    fruits = {'apple': 2, 'banana': 1}
    fruit = 'orange'

    # Case 1
    try:
        count = fruits[fruit]
    except KeyError:
        count = 0

    fruits[fruit] = count + 1
    ```

<br>

- 역시 코드를 더 줄일 수 있는 방법이 있지만, 할당하는 코드의 중복이 생긴다.

    ```python
    # Case 2
    try:
        fruits[fruit] += 1
    except KeyError:
        fruits[fruit] = 1
    ```

<br>

### 3. dict `get` method

- get method는 첫번째 parameter(key)의 value 값을 return하는데, parameter로 넣은 key 값이 dict에 없다면 두번째 parameter를 default value로 return 한다.
- 이 방법 역시 one access, one assignment이고, 다른 방법들보다 짧게 코드를 쓸 수 있다.

    ```python
    fruits = {'apple': 2, 'banana': 1}
    fruit = 'orange'

    count = fruits.get(fruit, 0)
    fruits[fruit] = count + 1
    ```

<br>

### 💡 collections.Counter

- 위의 예시들처럼 dictionary에 counters를 저장할 때, `collections.Counter`를 사용해보자. 대부분의 필요한 기능들을 제공한다.

    ```python
    from collections import Counter

    fruits = Counter({'apple': 2, 'banana': 1})
    fruits['apple'] += 1

    fruits
    >>> Counter({'apple': 3, 'banana': 1})

    fruits['apple']
    >>> 3
    ```

<br>

### if `values` for keys are `list` :

- 만약, dictionary에서 key에 해당하는 value 값이 list라면 위의 방법들이 어떻게 적용될까?
- **Case 1: in expression**

    ```python
    fruits = {'apple': ['a1', 'a2'], 'banana': ['b1', 'b2']}
    fruit = 'orange'
    name = 'o1'

    if fruit in fruits:
        names = fruits[fruit]
    else:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 2: KeyError exception**

    ```python
    try:
        names = fruits[fruit]
    except KeyError:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 3: get method**

    ```python
    names = fruits.get(fruit)
    if names is None:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 4: get method + assignment expression(walrus operation)**

    코드가 더 짧고 가독성도 높일 수 있다. (Item 10: Prevent Repetition with Assignment Expressions 참조)

    ```python
    # python 3.8
    if (names := fruits.get(fruit)) is None:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 5: setdefault method**

    setdefault method는 key의 value 값을 가지고 오며, key가 없으면 두번째 parameter를 value 값으로 할당해준다.

    ```python
    names = fruits.setdefault(fruit, [])
    names.append(name)
    ```

<br>

### Setdefault method

- 장점: get method보다 코드를 더 짧게 줄일 수 있다.
- 단점 1: `setdefault` 라는 이름이 딱 봤을 때 그 목적이 뭔지 알기 어렵다.
value를 set만 하는 게 아니라 get하는 method이기도 한데, 왜 `get_or_set` 이라고 하지 않을까?
- 단점 2: setdefault는 dict를 copy하는 대신에 직접적으로 접근해서 assign 한다.
즉, setdefault로 접근한 key에 항상 새로운 default value 값을 구성해야 한다. setdefault를 호출할 때마다 list instance를 할당해야 하니, performance 문제가 생길 수 있다.
- 그리고 이 default value를 다른 곳에서 재사용한다면, 또다른 버그들이 생길지 모른다.

<br>

:bulb: `get`은 value 값을 copy 해오고, `setdefault`는 value 값을 dict에 직접 접근해서 새로 할당한 것을 가져온다.

- missing dictionary keys를 처리할 때, setdefault를 쓰는 게 더 나은 경우는 별로 없다.

    예를 들면, setdefault가 할당해야하는 default values가 생성하기에 무겁지 않고, mutable(변경 가능)하며, exception이 생길 가능성이 없을 때.

    하지만 이런 경우에 `setdefault` 대신에 `defaultdict`를 사용해야 한다.
    (Item 17: Prefer defaultdict Over setdefault to Handle Missing Items in Internal State 참조)

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  