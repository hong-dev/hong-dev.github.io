---
title: "Item 22: Reduce Visual Noise with Variable Positional Arguments"
date: "2020-09-20T16:54:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 22: Reduce Visual Noise with Variable Positional Arguments
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 22: Reduce Visual Noise with Variable Positional Arguments

- `*`를 사용하여 positional arguments 개수를 다양하게 받을 수 있는 함수는, 함수 호출을 더 깔끔하게 만든다.
- positional arguments : `varargs`, `star args` 라고도 불린다.
- parameter 앞에 `*`를 붙이면, positional arguments의 개수는 optional하다. 없어도 되고 많아도 되고.

    별표가 없다면, 무조건 하나의 parameter로 입력되어야 하고 값이 없다고 하더라도 빈 list를 넣어줘야 한다.

    ```python
    def log(message, *values):
        if not values:
            print(message)
        else:
            values_str = ' and '.join(str(x) for x in values)
            print(f'{message} are {values_str}')

    log('Fruits', 'apple', 'banana')
    >>> Fruits are apple and banana

    log('No Fruit')
    >>> No Fruit
    ```

<br>

### Problem 1

- optional positional arguments는 함수에 넘겨지기 전에 항상 tuple 형태로 바뀐다.

    함수의 caller가 generator에 `*` operator를 사용한다면, 그것이 소진될 때까지 반복할 것이다. (Item 30 참조)  
    즉, 만들어지는 튜플은 generator의 모든 values를 포함하고, 그것은 많은 메모리를 소모하며 프로그램이 중단을 야기할 수도 있다.

- 따라서, `*args`는 그 input이 상당히 작을 것이라고 알고 있을 때 사용하는 것이 가장 좋다.

    ```python
    def my_generator():
        for i in range(10):
            yield i

    def my_func(*args):
        print(args)

    gen = my_generator()
    my_func(*gen)

    >>> (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

    ```

<br>

### Problem 2

- `*args`를 사용하는 함수에 새로운 positional parameter를 추가한다면, 찾기 힘든 버그를 발생시킬 수 있다.  
(exceptions를 발생시키지 않고도 여전히 작동할 수 있기 때문에 이런 버그들은 추적하기 어렵다.)
- 해당 함수를 호출하던 caller들을 다 바꾸지 않으면, 기존의 caller들이 미묘하게 깨질 수 있다.

    ```python
    def log(message, *values):

    def log(sequence, message, *values):
    ```

<br>

- 버그 생성 가능성을 없애기 위해, `*args`를 가지는 함수의 parameter를 추가하고 싶을 때는 `keyword-only arguments`를 사용해야한다. (Item 25 참조)
- 더 방어적으로는, `type annotations`를 사용하는 것 또한 고려할 수 있다. (Item 90)

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  