---
title: "Item 32: Consider Generator Expressions for Large List Comprehensions"
date: "2021-05-01T22:58:03.284Z"
template: "post"
draft: true
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 4] Comprehensions and Generators
Item 32: Consider Generator Expressions for Large List Comprehensions
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 32: Consider Generator Expressions for Large List Comprehensions

- 큰 List comprehensions에는 Generator를 사용하는 것을 고려하라.
- List comprehensions(Item 27 참조)의 문제는 input sequences에서 각각의 value를 포함한 새로운 list를 만들 수 있다는 것이다.
작은 inputs은 괜찮지만, 큰 inputs일 경우, 이런 실행은 메모리를 상당히 소모하며 프로그램을 다운시킬 수 있다.
- 예를 들어, 파일을 읽어와서 각 줄의 글자 수를 구하려고 한다.
이 때, list comprehension을 사용한다면 메모리에 모든 줄의 길이를 저장해야 할 것이다.
만약 파일이 크거나 끝이 없는 network socket이라면, list comprehension을 사용하는 것은 문제가 될 것이다.

    ```python
    value = [len(x) for x in open('file.txt')]

    value
    >>> [100, 56, 15, 2, 85]
    ```

### Generator Expressions

- 이러한 문제를 해결하기 위해, 파이썬은 list comprehension과 generator의 일반화인 generator expressions을 제공한다.
- Generator expressions는 실행될 때, output sequence 전체를 구체화하지 않는다.
대신에, 한 번에 하나의 항목을 산출하는 iterator로 평가한다.
- List-comprehension-like syntax를 `()` 사이에 적어서 generator expression을 생성할 수 있다.

    ```python
    value = (len(x) for x in open('file.txt'))

    value
    >>> <generator object <genexpr> at 0x108993dd0>
    ```

- Return된 iterator는 `next` built-in function을 사용하여, 한번에 하나씩 다음 output을 내보낼 수 있다.
Memory 사용량에 영향을 주지 않고, 원하는 만큼 generator expression를 사용할 수 있다.

    ```python
    next(value)
    next(value)

    >>>
    100
    56
    ```

- Generator expressions의 또다른 강점은 그것들이 함께 구성될 수 있다는 것이다.
위에서 생성한 generator expression을 또다른 generator expression의 input으로 사용할 수 있다.

    이 iterator를 실행시킬 때마다, 내부의 iterator 또한 실행된다.
    가능한 한 메모리 효율이 높은 상태에서 looping, evaluating conditional expressions, and passing around inputs and outputs의 Domino 효과를 만든다.
    creating a domino effect of **looping, evaluating conditional expressions, and passing around inputs and outputs,** all while being as memory efficient as possible:

    ```python
    value = (len(x) for x in open('file.txt'))
    roots = ((x, x**0.5) for x in value)

    next(roots)
    >>>
    (15, 3.872983346207417)
    ```

- 이런 식으로 generator를 같이 묶는 것은 python에서 매우 빨리 실행된다.
- Large input을 작동시키는 기능을 구성하는 방법을 찾는다면, generator expressions는 좋은 선택이다.

    유일한 단점은, generator expressions로 return된 iterator는 stateful 하므로 한 번 이상 사용하지 않도록 주의해야한다. (Item 31 참조)

<br>
<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  