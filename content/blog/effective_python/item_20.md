---
title: "Item 20: Prefer Raising Exceptions to Returning None"
date: "2020-09-15T09:12:04.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 20: Prefer Raising Exceptions to Returning None
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

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