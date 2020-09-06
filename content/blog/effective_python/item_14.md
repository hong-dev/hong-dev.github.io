---
title: "[Effective Python: Second Edition] Item 14: list.sort(key=...)"
date: "2020-09-06T11:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 14: Sort by Complex Criteria Using the key Parameter
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 14: Sort by Complex Criteria Using the key Parameter

- list의 `.sort()` method는 list 안에 들어있는 elements를 순서대로 재배열한다.  
`sort` method는 오름차순(ascending order)을 기본으로 한다.
- strings, integers, tuples 등 natural ordering을 가지고 있는 built-in types에 적용 가능하다.

<br>

- sort method는 (특별한 method로 natural ordering를 정의하지 않은 이상) class와 같은 object에는 사용할 수 없다.  
sort는 비교 method를 찾으려고 하는데 비교 method가 class에 정의되어 있지 않다면 비교해서 재배열 할 수 없다.

    ```python
    class Fruit:
        def __init__(self, name, num):
            self.name = name
            self.num = num

        def __repr__(self):
            return f'Fruit({self.name}, {self.num})'

    fruits = [
        Fruit('apple', 10),
        Fruit('banana', 5),
        Fruit('cherry', 20),
        Fruit('blueberry', 3)
    ]

    fruits.sort()
    >>> TypeError: '<' not supported between instances of 'Fruit' and 'Fruit'
    ```

- 만약, 만든 class가 natural ordering을 가지고 있어야 한다면, `sort` 가 parameter를 가지지 않아도 동작할 수 있도록 특별한 method를 정의할 수 있다. (Item 73: Know How to Use heapq for Priority Queues 참조)
- 그런 경우가 아니라면, sort method의 parameter를 사용한다.

<br>

### Key Parameter

- key parameter는 정렬 기준을 위해 입력된 값을 return 하는 helper function을 제공한다.
- `sort` method는 **parameter로 `key`를 입력**할 수 있는데, key는 어떤 것을 기준으로 sorting 할 것인지를 정해줄 수 있다.
- 대부분 class에는 sorting의 기준으로 하고자 하는 attribute(속성)이 있다. 이 attribute를 이용해서 key값을 입력할 수 있다.

<br>

- `lambda` keyword를 활용해서 클래스의 속성을 알파벳 순으로 정렬할 수 있다.

    ```python
    class Fruit:
        def __init__(self, name, num):
            self.name = name
            self.num = num

        def __repr__(self):
            return f'Fruit({self.name}, {self.num})'

    fruits = [
        Fruit('apple', 10),
        Fruit('banana', 5),
        Fruit('cherry', 20),
        Fruit('blueberry', 3)
    ]

    # 이름을 기준으로 알파벳순으로 정렬
    fruits.sort(key=lambda x: x.name)

    fruits
    >>> [Fruit(apple, 10), Fruit(banana, 5), Fruit(blueberry, 3), Fruit(cherry, 20)]
    ```

<br>

### Key function returning a tuple

- 여러 개의 속성을 기준으로 정렬하고 싶을 때는, tuple을 활용한다.

- tuple은 ordering 할 때 첫번째 element끼리 비교한 후 같으면 두번째 element끼리 비교.. 같으면 그 다음 element.. 를 비교하는 방식으로, 대소비교가 가능한 element가 나오면 거기서 ordering이 된다.

    ```python
    a = ('c', 1)
    b = ('a', 1)
    c = ('a', 2)

    order = [a, b, c]

    order
    >>> [('c', 1), ('a', 1), ('a', 2)]

    order.sort()

    order
    >>> [('a', 1), ('a', 2), ('c', 1)]
    ```

<br>

- 이러한 tuple의 ordering 방식을 활용해서, key 값에 tuple을 넣으면 여러 개의 속성을 기준으로 sort 할 수 있다.

    ```python
    fruits.sort(key=lambda x: (x.name, x.num))
    ```

<br>

- 다만, tuple을 사용하면 오름차순이든 내림차순이든 다 같은 방향으로 정렬된다.

    ```python
    fruits.sort(key=lambda x: (x.name, x.num), reverse=True)
    ```

<br>

- 숫자 형태의 값인 경우에는 `-` 를 붙여서 sorting 되는 방향을 바꿀 수 있다.

    ```python
    fruits.sort(key=lambda x: (x.name, -x.num))
    ```

<br>

- 같은 list에 sort() method를 여러번 호출해서 각각 다른 기준으로 sorting이 가능하다.

    다만, 이렇게 여러번 입력할 때는, 가장 우선순위로 sorting 하고 싶은 value를 가장 마지막에 호출해야 한다.

    이런 방법보다는 한줄로 사용하거나, `-` 를 붙여서 sort order 방향을 다르게 하는 게 더 읽기 좋고 코드도 적다.  
    따라서 이 방법은 꼭 필요할 때만 사용할 것을 권장한다.

    ```python
    # 이 경우 name 속성이 가장 우선순위로 정렬된다.
    fruits.sort(key=lambda x: x.num, reverse=True)
    fruits.sort(key=lambda x: x.name)
    ```

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  