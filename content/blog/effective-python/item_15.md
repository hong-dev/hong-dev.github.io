---
title: "Item 15: Dictionary Insertion Ordering"
date: "2020-09-13T11:12:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 15: Be Cautious When Relying on dict Insertion Ordering
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 15: Be Cautious When Relying on dict Insertion Ordering

- Python 3.5 까지는 dictionary의 key 값에 순서가 없었다.  
그래서 입력한 dict element의 순서와 상관없이 임의로 print 되기 때문에, test case를 짜거나 debugging 할 때 어려움이 있었다.

    그 이유는 Python interpreter가 시작할 때 할당된 random seed가 hash built-in function과 결합되는 방식으로 dictionary가 구현되어 있었기 때문이다. (`hash table algorithm`)

<br>

- Python 3.7 부터는 dictionary가 입력된 순서를 보존해서, 프로그래머가 처음 생성했던 dictionary와 항상 똑같이 print 할 것이다.

    ```python
    # Python 3.5
    alp = {'a':1, 'b':2, 'c':3, 'd':4}

    alp
    >>> {'a': 1, 'c': 3, 'b': 2, 'd': 4}
    ```

    ```python
    # Python 3.7
    alp = {'a':1, 'b':2, 'c':3, 'd':4}

    alp
    >>> {'a':1, 'b':2, 'c':3, 'd':4}
    ```

<br>

- `keys`, `values`, `items`, `popitem`과 같이 iteration order에 의존하는 dict의 method들은, python 3.5에서는 그 순서가 랜덤이었다면, 이제는 일관된 순서로 보여준다.

    `dict.popitem()`의 경우에는 항상 가장 마지막에 입력된 item을 pop 한다.

<br>

- `Keyword arguments` 인 `**kwargs` catch-all parameter의 경우에도, 함수 호출하는 parameter를 넣었을 때 그 parameter가 입력한 순서대로 나오지 않는 것처럼 보여서 function call에 대해 debug 하기가 어려웠다.

    ```python
    # Python 3.5
    def alp(**kwargs):
        for key, value in kwargs.items():
            print('%s = %s' % (key, value)) # f-strings는 python 3.6에서 추가된 기능

    alp(a=1, b=2, c=3)
    >>>
    a = 1
    c = 3
    b = 2
    ```

    ```python
    # Python 3.7
    def alp(**kwargs):
        for key, value in kwargs.items():
            print(f'{key} = {value}')

    alp(a=1, b=2, c=3)
    >>>
    a = 1
    b = 2
    c = 3
    ```

<br>

- class도 instance의 dictionaries를 dict type으로 사용한다.  
그래서 예전에는 object fields도 랜덤하게 추출되도록 동작했다.

    이제 이러한 instance fields에 대한 할당 순서가 `__dict__` 에 반영되어 순서가 달라지지 않는다고 추정할 수 있다.

    ```python
    # Python 3.5
    class Alpha:
        def __init__(self):
            self.a = 1
            self.b = 2
            self.c = 3

    alp = Alpha()

    for key, value in alp.__dict__.items():
        print(key, value)

    >>>
    ('a', 1)
    ('c', 3)
    ('b', 2)
    ```

<br>

### collections.OrderedDict

- `collections` built-in module에는 dictionary의 insertion ordering을 유지하는 `OrderedDict` class가 있다.
- 이것은 현재의 standard `dict` type과 비슷하게 동작하지만, performance의 특성은 조금 다르다.
- key 값을 많이 입력한 후 popitem method를 호출해야 한다면, `OrderedDcit`가 standard Python `dict` type보다 나을 수 있다.  
(Item 70: Profile Before Optimizing 참고)

<br>

### Caution

- Python은 dict instance가 아님에도 dictionary처럼 동작하는 object를 쉽게 만들 수 있게 한다.  
이러한 object의 경우, insertion order가 유지될 것이라고 가정해서는 안 된다.
- Python은 type이 딱 정해지지 않아서, 대부분의 코드가 `duck typing`에 의존한다. (object의 행동이 사실상의 type이다.)

<br>

> **dictionary-like classes 에 관해 조심할 수 있는 3가지 방법**  
- 만약에 `collections.abc.MutableMapping` 등을 이용해서 class를 생성했을 때, input 순서와는 다르게 iterates 되도록 만들어질 가능성이 있다. 이 경우에, dict 형태(dictionary-like)의 class일 뿐 dict는 아니기 때문에 조심해야 한다.
- **첫번째: insertion ordering에 의존하지 않게 코드를 짜라.**

    -the most conservative and robust solution

    ⇒ input이 어떻게 되었든지 순서에 상관없이 함수 안에서 원하는 결과를 얻을 수 있도록 짠다.

- **두번째: dict type 인지 명시적으로 체크하라.**

    -better runtime performance than the more conservative approach

    ⇒ 함수의 맨 윗부분에서 input type을 체크해서 맞지 않으면 raise exception 한다.

- **세번째: type annotation이나 static analysis를 사용해서 dict value를 요구하라.**

    -best mix of static type safety and runtime performance

    ⇒ typing module을 활용해서 parameter에 어떤 것이 입력되어야 하는지 detect 한다.

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  