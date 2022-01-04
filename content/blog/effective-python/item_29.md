---
title: "Item 29: Avoid Repeated Work in Comprehensions by Using Assignment Expressions"
date: "2021-04-21T04:05:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 4] Comprehensions and Generators
Item 29: Avoid Repeated Work in Comprehensions by Using Assignment Expressions
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 29: Avoid Repeated Work in Comprehensions by Using Assignment Expressions

- Dictionary의 특정 key 값에 대한 value를 가져오고 싶을 때

    ```python
    stock = {"apple": 10, "banana": 5, "orange": 1}

    order = ["orange", "banana", "melon"]

    result = {}
    for name in order:
        count = stock.get(name, 0)
        if count > 2:
            result[name] = count

    result
    >>> {'banana': 5}
    ```

<br>

- Comprehension의 일반적인 패턴은, 여러 군데에서 같은 계산을 참조해야 한다. (중복의 발생)  
중복이 있으면 가독성도 떨어지고, 나중에 코드를 수정할 때에도 중복 코드를 동일하게 수정해야 하므로 실수하기도 쉽다.

    ```python
    result = {name: stock.get(name, 0) for name in order if stock.get(name, 0) > 2}

    result
    >>> {'banana': 5}
    ```

<br>

## Walrus Operator ( := )

- Assignment expression
- Python 3.8부터 도입 ([Item 10 참조](https://hong-dev.github.io/effective_python/item_10/))
- `:=`로 변수 할당을 하면 두 번 호출해야할 것을 한번만 호출하여, 불필요한 call과 list의 각 item에 대한 계산을 없애서 performance를 향상시킬 수 있다.

    ```python
    result = {name: num for name in order if (num := stock.get(name, 0)) > 2}

    result
    >>> {'banana': 5}
    ```

<br>

- Assignment expression을 value expression에서 정의하는 것도 가능하다.

    그러나 comprehension의 다른 부분에 정의되어 있는 변수를 참조한다면 에러가 날 것이다.

    ```python
    result = {name: (num := stock.get(name, 0)) for name in stock if num > 0}

    >>>
    NameError: name 'num' is not defined
    ```

<br>

## Leaking

- Comprehension에서 value part에 조건문 없이 walrus operator를 사용하면 loop variable이 containing scope ([Item 21 참조](https://hong-dev.github.io/effective_python/item_21/))로 새는 현상이 발생할 것이다.

    ```python
    stock = {"apple": 10, "banana": 5, "orange": 1}

    half = [(last := count // 2) for count in stock.values()]

    half
    >>> [5, 2, 0]

    last
    >>> 0
    ```

<br>

- 이러한 leak 현상은 기본적인 for loop에서도 발생한다.

    ```python
    stock = {"apple": 10, "banana": 5, "orange": 1}

    for count in stock.values():
        pass

    count
    >>> 1
    ```

<br>

- `:=`를 사용하지 않은 comprehensions에서는 leakage가 발생하지 않는다.  

    ```python
    stock = {"apple": 10, "banana": 5, "orange": 1}
    half = [count // 2 for count in stock.values()]

    half
    >>> [5, 2, 0]

    count
    >>> NameError: name 'count' is not defined
    ```

<br>

- Assignment expression은 generator expressions 안에서도 똑같이 동작한다. (Item 32 참조)

<br>

- 따라서 `:=`는 comprehension의 if문 내에서만 사용하는 것을 권장한다.

    Assignment expression을 comprehension이나 generator 표현식의 조건문 밖에서 사용할 수 있어도, 사용하지 않는 것을 권한다.



<br>
<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  