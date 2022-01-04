---
title: "Item 17: Prefer 'defaultdict' Over 'setdefault' to Handle Missing Items in Internal State"
date: "2020-09-14T23:12:04.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 17: Prefer `defaultdict` Over `setdefault` to Handle Missing Items in Internal State
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 17: Prefer `defaultdict` Over `setdefault` to Handle Missing Items in Internal State

### Case 1

- 만약 dictionary가 key의 value 값으로 `set` type을 가지며, 다른 사람이 만든 dictionary에 access 해야 하는 경우

<br>

1. **get method + assignment expression**

    ```python
    fruits = {'Red': {'apple', 'cherry'}, 'Yellow': {'banana'}}

    # Python 3.8
    if (yellow := fruits.get('Yellow')) is None:
        fruits['Yellow'] = yellow = set()

    yellow.add('lemon')

    fruits
    >>> {'Red': {'cherry', 'apple'}, 'Yellow': {'lemon', 'banana'}}
    ```

<br>

2. **setdefault method**

    get을 사용하는 것보다 훨씬 짧은 코드를 쓸 수 있다.

    ```python
    fruits.setdefault('Yellow', set()).add('lemon')
    ```

<br>

### Case 2

- 만약 dictionary가 key의 value 값으로 `set` type을 가지며, dictionary를 생성하는 걸 직접 control 하는 경우

<br>

1. **setdefault + class**

    Item 16에서 언급했듯이, setdefault는 그 이름이 헷갈리게 지어졌고, key값이 있든 없든 새로운 set instance를 생성하기 때문에 비효율적이다.

    ```python
    class Fruits:
        def __init__(self):
            self.data = {}
        def add(self, color, fruit):
            fruit_set = self.data.setdefault(color, set())
            fruit_set.add(fruit)

    fruits = Fruits()
    fruits.add('Yellow', 'lemon')

    fruits.data
    >>> {'Yellow': {'lemon'}}
    ```

<br>

2. **collections.defaultdict**
    - `defaultdict`는 key가 없으면 자동으로 default value를 저장한다.

        따라서, default value를 따로 저장해서 add할 필요없이한번에 가능하게 해준다.

    - `defaultdict(set)`이라고 사용하므로, data dictionary에 있는 key값에 접근하면 항상 set instance가 결과로 나올 것이라는 것을 알 수 있다.
    - setdefault처럼 add method가 호출될 때마다 필요없는 set instance를 생성하지 않아도 된다.

    ```python
    from collections import defaultdict

    class Fruits:
        def __init__(self):
            self.data = defaultdict(set)
        def add(self, color, fruit):
            self.data[color].add(fruit)

    fruits = Fruits()
    fruits.add('Yellow', 'lemon')

    fruits.data
    >>> defaultdict(<class 'set'>, {'Yellow': {'lemon'}})
    ```

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  