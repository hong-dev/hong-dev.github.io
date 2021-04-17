---
title: "Item 28: Avoid More Than Two Control Subexpressions in Comprehensions"
date: "2021-04-17T21:32:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 4] Comprehensions and Generators
Item 28: Avoid More Than Two Control Subexpressions in Comprehensions
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 28: Avoid More Than Two Control Subexpressions in Comprehensions

- Comprehensions에서 control subexpressions를 2개 이상 사용하는 것은 지양하라. (최대 2개까지만 사용하자.)
- [Item 27](https://hong-dev.github.io/effective_python/item_27/)에서 봤던 기본적인 usage 말고도, comprehensions는 여러 단계의 looping이 가능하다.

    예를 들어, list 안의 list를 포함하는 matrix를 하나의 list로 풀어야 할 때, list comprehension의 2개의 for subexpressions를 사용할 수 있다.

    subexpressions는 왼쪽에서 오른쪽으로 순차적으로 실행된다.

    ```python
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    flat = [x for row in matrix for x in row]

    flat
    >>> [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ```

<br>

- Input list가 two-level-deep layout인 경우의 계산에도 multiple loops를 사용할 수 있다.

    예를 들어, list elements에 각각 제곱을 하고 싶을 때 extra `[]` 를 사용하여 구현할 수 있다.  
    추가적인 `[]`가 있어서 조금 지저분해졌지만, 아직 상대적으로 가독성이 좋은 편인다.

    ```python
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    squared = [[x**2 for x in row] for row in matrix]

    squared
    >>> [[1, 4, 9], [16, 25, 36], [49, 64, 81]]
    ```

<br>

- 만약 이 comprehension에 또다른 loop가 추가된다면, 너무 길어져서 여러 줄로 나눠야 될 수도 있다.

    ```python
    multiple_lists = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
    flat = [x for sublist1 in multiple_lists for sublist2 in sublist1 for x in sublist2]

    flat
    >>> [1, 2, 3, 4, 5, 6, 7, 8]
    ```

<br>

- 이런 경우에는, normal loop statements가 더 짧고 가독성이 좋다.  
Indentation을 사용하니 three-level-list comprehension보다 더 명확하다.

    ```python
    multiple_lists = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
    flat = []
    for sublist1 in multiple_lists:
        for sublist2 in sublist1:
            flat.extend(sublist2)

    flat
    >>> [1, 2, 3, 4, 5, 6, 7, 8]
    ```

<br>

- Comprehensions는 여러 `if` conditions를 지원한다.  
동일한 loop level의 여러 if conditions에는 암묵적인 `and` expression이 있다. 즉, 아래 2개의 expressions는 동일하다.

    ```python
    a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    b = [x for x in a if x > 4 if x % 2 == 0]
    c = [x for x in a if x > 4 and x % 2 == 0]
    ```

<br>

- Conditions는 `for` subexpression 이후 각각의 looping level에서 특정될 수 있다.

    예를 들어, elements의 합이 10 이상인 row에 포함되어 있으며 3으로 나누어 떨어지는 element를 필터링 할 때, list comprehension을 사용하면 코드가 그렇게 길지는 않지만 읽기가 매우 어렵다.

    ```python
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    filtered = [[x for x in row if x % 3 == 0] for row in matrix if sum(row) >= 10]

    filtered
    >>> [[6], [9]]
    ```

<br>

- 위와 같은 comprehensions를 사용하지 않기를 권장한다.  
특히, dict comprehensions는 이미 extra parameter (key/value for each item)가 필요하기 때문에 더욱 헷갈린다.

    결론은, **comprehension 안에 2개의 control subexpressions까지만 사용하자.**  
    (ex. 2개의 조건문, 2개의 반복문, 조건문과 반복문 1개씩)  
    **이것보다 더 복잡해지면, `if`나 `for` statements를 사용하고 helper function을 작성해야한다.**

<br>
<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  