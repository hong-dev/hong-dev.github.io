---
title: "Item 24: Default Arguments"
date: "2020-09-21T23:12:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 24: Use None and Docstrings to Specify Dynamic Default Arguments
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 24: Use None and Docstrings to Specify Dynamic Default Arguments

### Case 1

- `datetime.now()`와 같이 변하는 값을 keyword argument의 default 값으로 사용해야 할 수도 있다.
- 그러나 default argument value는 module이 load 될 때(주로 프로그램이 시작할 때) 단 한 번 평가된다.  
즉, 이 코드가 들어있는 모듈이 한번 load가 되었으면, default argument는 절대 다시 평가되지 않는다.

    ```python
    from datetime import datetime

    def time_now(when=datetime.now()):
        print(when)

    # 언제 호출하든 같은 값을 print 한다.
    time_now()
    ```

<br>

- **Solution**

    `None`을 default 값으로 지정하고, docstring을 작성한다.

    ```python
    def time_now(when=None):
        """
        Args:
            when: Defaults to the present time.
        """
        if when is None:
            when = datetime.now()
        print(when)
    ```

<br>

### Case 2

- arguments가 mutable 할 때는 더욱 default argument values로 None을 사용하는 것이 중요하다.
- default 값으로 지정된 dictionary는 get_fruit의 모든 call에서 공유될 것이다. (default argument values는 단 한번 평가되기 때문.)

    따라서 a와 b는 default parameter와 같고, 동일한 dictionary object이다.

    ```python
    fruits = {'banana':1, 'orange':2}

    def get_fruit(fruits, default={}):
        try:
            return fruits['apple']
        except:
            return default

    a = get_fruit(fruits)  #{}
    a['apple'] = 10
    b = get_fruit(fruits)  #{}
    b['lemon'] = 5

    a
    >>> {'apple': 10, 'lemon': 5}
    b
    >>> {'apple': 10, 'lemon': 5}

    assert a is b
    ```

<br>

- **Solution**

    `None`을 default 값으로 지정하고, docstring을 작성한다.

    ```python
    def get_fruit(fruits, default=None):
        """Get number of apple from a fruit dictionary.

        Args:
            fruits: a fruit dictionary.
            default: Value to return if an exception raised.
                Defaults to an empty dictionary.
        """
        try:
            return fruits['apple']
        except:
            if default is None:
                default = {}
            return default

    a = get_fruit(fruits)  # {}
    a['apple'] = 10
    b = get_fruit(fruits)  # {}
    b['lemon'] = 5

    a
    >>> {'apple': 10}
    b
    >>> {'lemon': 5}

    assert a is not b
    ```

<br>

### With type annotations

- type annotations의 자세한 내용은 Item 90 참조
- type annotations을 같이 사용하면, when이라는 argument가 `None` 아니면 `datetime` object 중에 하나만 가능하다.

    ```python
    from typing import Optional

    def time_now(when: Optional[datetime]=None) -> None:
        """
        Args:
            when: Defaults to the present time.
        """
        if when is None:
            when = datetime.now()
        print(when)
    ```

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  