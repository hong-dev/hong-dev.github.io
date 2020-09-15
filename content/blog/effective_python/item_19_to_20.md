---
title: "[Effective Python: Second Edition] Functions : Item 19 ~ Item 20"
date: "2020-09-15T09:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 19: Never Unpack More Than Three Variables When Functions Return Multiple Values
Item 20: Prefer Raising Exceptions to Returning None
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

# [Part 3] Functions

## Item 19: Never Unpack More Than Three Variables When Functions Return Multiple Values

- Unpacking syntax (Item 6)는 함수가 한 개 이상의 return 값을 가질 수 있도록 한다.

    Multiple values가 tuple에 담겨서 같이 return 되고, 그 tuple을 여러 개의 변수로 unpacking 하기 때문이다.

    ```python
    def get_min_max(nums):
        minimum = min(nums)
        maximum = max(nums)
        return minimum, maximum

    nums = [10, 30, 1, 3]

    minimum, maximum = get_min_max(nums)

    minimum, maximum
    >>> (1, 30)
    ```

<br>

- return 값이 하나인 경우에도, 별표 expressions(Item 13)를 활용해서 unpacking 할 수 있다.

    ```python
    def sorted_list(nums):
        nums.sort()
        return nums

    nums = [10, 30, 1, 3]

    minimum, *middle, maximum = sorted_list(nums)

    minimum, middle, maximum
    >>> (1, [3, 10], 30)
    ```

<br>

### Multiple return values를 unpacking할 때 문제점

1. 여러 개의 변수를 나열해서 unpacking 하게 되는데, 이 때 할당하는 변수 순서가 실수로 뒤바뀌면 발견하기 힘든 bug가 생기기 쉽다.
2. 함수를 call 하고 unpack 하는 코드가 너무 길어서 여러 문장으로 나눠야 할 것이고, 그렇게 되면 가독성이 떨어진다.

<br>

:arrow_right: unpacking 할 때 catch-all starred expression을 포함한 최대 3개까지만 unpacking 하라.

:arrow_right: 4개 이상 unpacking 해야 할 때는 lightweight class(small class)를 return하거나, namedtuple(Item 37) instance를 return할 수 있도록 하라.

<br>

## Item 20: Prefer Raising Exceptions to Returning `None`

- `return None` 하는 대신에 `raise Exception` 하라.

- function에 `return None`이 있을 때, 결과값이 0인 경우와 None 경우가 생길 수 있다.

    이 경우, 조건문에서 False-equivalent value로 0과 None이 동일하게 False로 처리되는 문제가 발생할 수 있다. (ex. `if not result:`)

    ```python
    def divide(a, b):
        try:
            return a / b
        except ZeroDivisionError:
            return None
    ```

<br>

### Solution 1

- return 값을 2개로 해서, 첫번째는 operation이 성공했는지 여부를 적고 두번째는 actual result를 적는다.
- 이렇게 되면 return values를 unpacking 해야하고, result만 보는 게 아니라 성공 여부까지 고려해야 한다.
- 문제는, 함수를 호출할 때 첫번째 return value가 쉽게 생략될 수 있다는 것이다.
이렇게 되면, None을 return하는 위의 코드와 마찬가지로 에러가 발생하기 쉽다.

    >💡 underscore variable name(`_`)을 적으면, 사용하지 않는 변수라는 python convention이다.

    ```python
    def divide(a, b):
        try:
            return True, a / b
        except ZeroDivisionError:
            return False, None

    _, result = divide(a, b)
    ```

<br>

### Solution 2

- special cases가 있을 때 절대 None을 return 하지 않는다.
- 대신, Exception을 raise 하고, function caller가 이 문제를 처리하도록 한다.

    ```python
    def divide(a, b):
        try:
            return a / b
        except ZeroDivisionError as e:
        raise ValueError('Invalid inputs')
    ```

<br>

- Type annotations를 사용하면 return 값의 type을 알 수 있어서, None이 return되지 않는다는 것을 명확하게 할 수 있다. (Item 90 참조)

    ```python
    def divide(a: float, b: float) -> float:
        try:
            return a / b
        except ZeroDivisionError as e:
        raise ValueError('Invalid inputs')
    ```

<br>

- Python은 exceptions가 function's interface에 포함된 경우(checked exceptions), 그것을 나타낼 수 있는 방법을 제공하지 않는다.

    대신에, exception-raising에 대한 정보를 document로 남겨야 한다. (Item 84 참조)  
    그러면 function caller가 어떤 exceptions들을 처리해야 하는지 알 수 있다.

    ```python
    def divide(a: float, b: float) -> float:
        """Divides a by b.

        Raises:
            ZeroDivisionError: When the inputs cannot be divided
        """
        try:
            return a / b
        except ZeroDivisionError as e:
        raise ValueError('Invalid inputs')
    ```

    ⇒ 이렇게 하면 inputs, outputs, exceptional behavior 모두 명확하고, caller가 실수할 가능성도 매우 적어진다.

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  