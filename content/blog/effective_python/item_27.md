---
title: "[Effective Python: Second Edition] Item 27: Use Comprehensions Instead of 'map' and 'filter'"
date: "2021-01-12T21:01:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 4] Comprehensions and Generators
Item 27: Use Comprehensions Instead of `map` and `filter`
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

# Part 4. Comprehensions and Generators

- Python은 간단한 반복과 파생적인 data 구조를 생성시키기 위한 comprehensions 문법을 제공한다.
- 이러한 processing 스타일은, 값들이 함수에 점진적으로 return되도록 하는 generators 함수로 확장된다.

## Item 27: Use Comprehensions Instead of `map` and `filter`

### 1. **For loops**

- 기본적인 반복문

    ```python
    a = [1, 2, 3, 4]

    squares = []
    for x in a:
        squares.append(x**2)

    squares
    >>> [1, 4, 9, 16]
    ```

<br>

### 2. **List comprehensions**

- 다른 시퀀스 또는 반복 가능한 목록에서 새로운 list를 도출하기 위한 compact한 문법

    ```python
    a = [1, 2, 3, 4]

    squares = [x**2 for x in a]

    squares
    >>> [1, 4, 9, 16]
    ```

<br>

### 3. Map

- built-in function
- 위의 경우를 map으로 구현하려면, 계산을 위한 `lambda` function이 필요하기 때문에 list comprehension보다 깔끔하지 않다.

    ```python
    a = [1, 2, 3, 4]

    squares = map(lambda x: x**2, a)

    squares
    >>> <map object at 0x7fb226c0b850>
    ```

<br>

### `Map + Filter` vs `List Comprehensions`

- `List comprehensions`는 input list에서 쉽게 items를 필터링하고, 결과값에서 해당하는 output을 제거한다.

    예를 들어, 숫자의 제곱 중에 2로 나눌 수 있는 것을 계산하고 싶을 때, list comprehension에서는 loop 다음에 conditional expression(조건문)을 추가한다.

    ```python
    a = [1, 2, 3, 4]

    even_squares = [x**2 for x in a if x % 2 == 0]

    even_squares
    >>> [4, 16]
    ```

<br>

- `filter` built-in function은 `map`과 같이 쓰일 수 있는데, 위의 방법보다 가독성이 훨씬 좋지 않다.

    ```python
    a = [1, 2, 3, 4]

    alt = map(lambda x: x**2, filter(lambda x: x % 2 == 0, a))

    assert even_squares == list(alt)
    ```

<br>

### Dictionary comprehensions / Set comprehensions

- Dictionary와 Sets도 List comprehensions와 같은 기능을 하는 각각의 comprehension 문법이 있다.

    ```python
    a = [1, 2, 3, 4]

    even_squares_dict = {x: x**2 for x in a if x % 2 == 0}
    even_squares_set = {x**2 for x in a if x % 2 == 0}

    even_squares_dict
    >>> {2: 4, 4: 16}

    even_squares_set
    >>> {16, 4}
    ```

<br>

- 위의 기능을 map과 filter로도 구현할 수 있지만, 너무 길어서 여러 줄로 나눠야 하고 가독성이 안 좋아진다.

    ```python
    a = [1, 2, 3, 4]

    even_squares_dict = dict(map(lambda x: (x, x**2), filter(lambda x: x % 2 == 0, a)))
    even_squares_set = set(map(lambda x: x**2, filter(lambda x: x % 2 == 0, a)))

    even_squares_dict
    >>> {2: 4, 4: 16}

    even_squares_set
    >>> {16, 4}
    ```


<br>
<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  