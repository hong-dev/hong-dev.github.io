---
title: "[Effective Python: Second Edition] Item 26: Define Function Decorators with 'functools.wraps'"
date: "2021-01-09T14:56:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 26: Define Function Decorators with `functools.wraps`
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 26: Define Function Decorators with `functools.wraps`

- python은 함수에 적용할 수 있는 decorators 가 있다.  
decorator는 감싸고 있는 함수의 호출 전과 후에 추가적인 코드를 실행할 수 있다.  
즉, decorators는 input arguments에 접근하고 수정할 수 있으며, 값을 return하거나 exception을 발생시킬 수 있다.

    ```python
    def trace(func):
        def wrapper(*args, **kwargs):
            result = func(*args, **kwargs)
            print(args, kwargs, result)
            return result
        return wrapper
    ```

    ```python
    @trace
    def subtract(n):
        """
        Return subtracted number
        """
        return n-2
    ```

<br>

- args는 tuple, kwargs는 dict

    ```python
    def trace(func):
        def wrapper(n):
            result = func(n)
            print(n, result)
            return result
        return wrapper
    ```

<br>

- decorator는 `@`를 사용하여 함수에 적용할 수 있는데, `@` 를 사용하면 function의 decorator를 호출하고 동일한 범위의 original name에 return 값을 할당하는 것과 같다.

    ```python
    a = trace(subtract)

    >>> a(6)   # trace(subtract)(6)
    (6,) {} 4
    6 4
    4

    >>> subtract(6)
    (6,) {} 4
    4
    ```

- The decorated function runs the `wrapper` code before and after main function runs.

<br>

### Problems

- 위의 코드들은 잘 작동하지만, 의도되지 않은 side effect가 있다. Decorator의 return 값을 `subtract`라고 생각하지 않는다는 것.

    ```python
    print(subtract)
    >>> <function trace.<locals>.wrapper at 0x7ff83afc9730>
    ```

    - 이 문제의 원인은 찾기 힘들다.  
    `trace` function은 `wrapper`를 return한다.  
    `wrapper` function은 `decorator` 때문에 포함된 모듈 안의 `subtract` 이름에 할당된 것이다. (The wrapper function is what’s assigned to the main function name in the containing module because of the decorator.)

<br>

- 이런 경우 debugging이 어려워진다.  
예를 들어 help built-in function를 사용할 수가 없다.  

    help function은 main 함수의 docstring을 print 해야하는데 다른 결과가 나온다. (subtract 대신 wrapper의 정보)

    ```python
    help(subtract)

    >>>
    Help on function wrapper in module __main__:

    wrapper(n)
    ```

<br>

- 또한 pickle과 같은 object serializers에서는 decorated된 original function이 어디에 위치하는지 알 수 없기 때문에 동작하지 않는다.

    ```python
    import pickle

    pickle.dumps(subtract)

    >>>
    AttributeError: Can't pickle local object 'trace.<locals>.wrapper'
    ```

<br>

### `functools.wraps` built-in module

- Decorator를 구현하도록 도와주는 decorator
- `wrapper` function에 적용하면, inner function부터 outer function까지의 모든 중요한 metadata를 복사한다.

    ```python
    from functools import wraps

    def trace(func):
        @wraps(func)
        def wrapper(n):
            result = func(n)
            print(n, result)
            return result
        return wrapper

    @trace
    def subtract(n):
        """
        Return subtracted number
        """
        return n-2
    ```

<br>

- `help` function을 적용하면, 예상했던 결과가 잘 나온다.

    ```python
    help(subtract)

    >>>
    Help on function subtract in module __main__:

    subtract(n)
        Return subtracted number
    ```

<br>

- Pickle도 잘 동작한다.

    ```python
    pickle.dumps(subtract)                                                                          
    >>> b'\x80\x03c__main__\nsubtract\nq\x00.'
    ```

<br>

- Python functions는 많은 다른 standard attributes가 있다. (`__name__`, `__module__`, `__annotations__`)  
이러한 속성들은 function의 interface를 유지하기 위해서 보존되어야 한다.

    `wraps`를 사용하면 항상 정확한 방식으로 동작하게 할 수 있다. 

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  