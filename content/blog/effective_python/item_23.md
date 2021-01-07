---
title: "[Effective Python: Second Edition] Item 23: Provide Optional Behavior with Keyword Arguments"
date: "2020-09-20T16:54:04.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 23: Provide Optional Behavior with Keyword Arguments
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 23: Provide Optional Behavior with Keyword Arguments

- 대부분의 다른 프로그래밍 언어들과 마찬가지로, 파이썬도 함수를 호출할 때 position으로 arguments를 전달할 수 있다. (positional arguments)
- keyword에 할당하여 함수의 arguments로 넘겨줄 수도 있다. (keyword arguments)

    keyword arguments는 순서에 상관없이 적을 수 있다.

    ```python
    def some_func(alpha, number):
        pass

    some_func('a', 10)
    some_func('a', number=10)
    some_func(alpha='a', number=10)
    some_func(number=10, alpha='a')
    ```

<br>

- Positional arguments는 무조건 keyword arguments 앞에 놓아야 한다.

    ```python
    some_func(alpha='a', 10)
    >>>
    SyntaxError: positional argument follows keyword argument
    ```

<br>

- 각 argument는 한번만 지정되어야 한다.

    ```python
    def some_func(alpha, number):
        pass

    some_func('a', alpha='b')
    >>>
    TypeError: some_func() got multiple values for argument 'alpha'
    ```

<br>

### `**` operator

- dictionary 앞에 `**`을 적으면, 파이썬은 dictionary를 함수의 keyword arguments로 넘겨준다.

    ```python
    def some_func(alpha, number):
        pass

    some_kwargs = {'alpha': 'a', 'number': 10}

    some_func(**some_kwargs)
    ```

<br>

- `**`는 positional arguments나 다른 keyword arguments와 함께 사용할 수 있다.

    ```python
    some_kwargs = {'number': 10}

    some_func(alpha='a', **some_kwargs)
    some_func('a', **some_kwargs)
    ```

<br>

- `**`를 여러번 사용할 수도 있다.

    ```python
    some_kwargs = {'number': 10}
    other_kwargs = {'alpha': 'a'}

    some_func(**some_kwargs, **other_kwargs)
    some_func(**other_kwargs, **some_kwargs)
    ```

<br>

### `**kwargs` catch-all parameter

- 함수를 정의할 때, 모든 arguments를 dictionary로 받을 수 있도록 `**kwargs`를 사용할 수 있다.

    ```python
    def some_func(**kwargs):
        print(kwargs)

    some_func(alpha='a', number=10)
    >>>
    {'alpha': 'a', 'number': 10}
    ```

<br>

### keyword arguments 장점 3가지

1. **함수 호출 코드를 명확하게 한다.**

    `func('a', 10)` 형태로 호출하면, a가 무엇인지 10이 무엇을 의미하는 지 알기 어렵다.  
    parameter들의 type이 동일할 때는 더더욱 헷갈리기 쉽다.  
    keyword arguments는 각각의 parameter들이 어떻게 사용되는지 바로 알 수 있게 한다.

<br>

2. **parameter의 default value를 지정할 수 있다.**
default 값이 지정된 parameter는 함수 호출 시에 적지 않아도 되는 optional 한 값이 된다.
default 값을 지정하면, 중복되는 코드를 제거하고 noise를 줄일 수 있다.

    단순한 default values는 잘 작동하지만, complex default values에 적용하기에는 까다로워진다. (Item 24 참조)

    ```python
    def some_func(alpha, number, param1='default_value'):
        pass

    some_func('a', 10)
    some_func('a', 10, 'hello')
    ```

<br>

3. **이미 존재하는 함수 caller들에 영향을 주지 않고, 함수의 parameters를 늘릴 수 있다.**

    ```python
    def some_func(alpha, number):

    def some_func(alpha, number, param1='default1', param2='default2'):
    ```

<br>

### optional keyword arguments 단점

- 함수에 default 값이 지정된 keyword arguments도 positional arguments처럼 keyword 없이 위치로 지정할 수 있다.

    하지만 이렇게 하는 것은, parameter가 각각 어떤 것인지 명확하게 알 수 없다는 단점이 있다.

- 가장 좋은 방법은 항상 keyword name으로 지정하고, 절대 positional arguments 처럼 넘기지 않는 것이다.
- 또한 모든 함수 caller에게 명시적인 keyword style을 사용하도록 요구할 수 있다. (Item 25 참조)

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  