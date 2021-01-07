---
title: "[Effective Python: Second Edition] Item 25: Enforce Clarity with Keyword-Only and Positional-Only Arguments"
date: "2021-01-08T06:41:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 25: Enforce Clarity with Keyword-Only and Positional-Only Arguments
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 25: Enforce Clarity with Keyword-Only and Positional-Only Arguments

- keyword arguments를 사용하면, 코드의 다양한 use cases를 명확하게 이해할 수 있게 해준다.

    ```python
    def division(number, divisor, ignore_zero_division=False):
        try:
            return number / divisor
        except ZeroDivisionError:
            if ignore_zero_division:
                return float('inf')
            else:
                raise

    division(10, 0, True)
    >>> inf

    division(10, 0, ignore_zero_division=True)
    >>> inf
    ```

<br>

### Keyword-only arguments

- parameter가 여러 개인 함수를 호출할 때는 keyword를 적어주지 않으면 실수할 가능성이 높아진다.
그렇기 때문에 parameter의 keyword를 분명하게 적어주는 것이 필요하고, 그렇게 하도록 caller에게 요구할 필요가 있다.
- `*`를 함수 parameter list의 중간에 넣으면, positional arguments가 끝나고 keyword-only arguments가 시작되었다는 것을 의미한다.
- keyword-only arguments로 함수를 정의하면, caller가 keyword로 호출하지 않을 경우 에러가 난다.

    ```python
    def division(number, divisor, *, ignore_zero_division=False):
        #number, divisor는 positional args. ignore_zero_division은 keyword-only args.
        try:
            return number / divisor
        except ZeroDivisionError:
            if ignore_zero_division:
                return float('inf')
            else:
                raise

    division(10, 0, True)
    >>> TypeError: division() takes 2 positional arguments but 3 were given

    division(10, 0, ignore_zero_division=True)
    >>> inf
    ```

<br>

### Positional-only arguments

- Python 3.8부터 도입된 positional-only arguments는 함수의 parameter로 positional argument로만 사용하도록 요구한다.
- 함수의 parameter 이름이 별 의미가 없거나 나중에 바뀔 가능성이 있어서 caller가 keyword를 지정하지 않았으면 할 때 사용할 수 있다.  
만약 나중에 parameter 이름이 바뀐다면, keyword로 호출했던 기존의 caller들은 error가 날 것이기 때문이다.
- `/`를 함수 parameter list의 중간에 넣으면, positional-only arguments가 끝난 것을 의미한다.
- positional arguments는 기본적으로 keyword를 사용해도 되고 위치로 지정해도 되는데, positional-only arguments로 설정되면 위치로만 parameter를 넘겨줄 수 있다.

    ```python
    def division(number, divisor, /, *, ignore_zero_division=False):
        #number, divisor는 positional-only args. ignore_zero_division은 keyword-only args.
        try:
            return number / divisor
        except ZeroDivisionError:
            if ignore_zero_division:
                return float('inf')
            else:
                raise

    division(10, 0, ignore_zero_division=True)
    >>> inf

    division(number=10, divisor=0, ignore_zero_division=True)
    >>> TypeError: division() got some positional-only arguments passed as keyword arguments: 'number, divisor'
    ```

<br>

### Parameter between `/` and `*`

- `/`와 `*` 사이의 parameters는 position과 keyword 둘다 사용할 수 있다. (Python parameters의 default 기능)

    ```python
    def division(number, divisor, /, digits=2, *, ignore_zero_division=False):
        #number, divisor는 positional-only args. digits는 둘 다 가능. ignore_zero_division은 keyword-only args.
        try:
            result = number / divisor
            return round(result, digits)  #결과값의 소수점 자리수 결정
        except ZeroDivisionError:
            if ignore_zero_division:
                return float('inf')
            else:
                raise

    division(22, 7)
    >>> 3.14

    division(22, 7, 5)
    >>> 3.14286

    division(22, 7, digits=5)
    >>> 3.14286
    ```

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  