---
title: "[Effective Python: Second Edition] Item 5 ~ Item 7"
date: "2020-08-24T10:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 5: Write Helper Functions Instead of Complex Expressions
Item 6: Prefer Multiple Assignment Unpacking Over Indexing
Item 7: Prefer enumerate Over range
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 5: Write Helper Functions Instead of Complex Expressions

- Python 문법에서는 지나치게 복잡하고 읽기 어려운 single-line 표현식이 만들어지기 쉽다.

- 한문장으로 만들겠다고 함수 안의 함수 안의 메소드로 연결하거나, `or` `and` operator를 사용하는 등의 복잡한 표현식을 만들지 말자.
- if/else 문도 한문장에 이어서 쓰는 것보다 여러 줄에 걸쳐서 쓰는 것이 더 clear하다.
- 2번 이상 반복적으로 사용될 표현식이라면 helper function을 만들어 사용한다.

- 표현식이 복잡해지면, 이걸 작에 쪼개고 logic은 helper function에 넣는 것을 고려하자.
- **가독성에서 얻을 수 있는 것은 간결성에서 얻는 것보다 항상 더 크다. (간결성 < 가독성)**  
복잡한 표현에 대한 간결하고 함축적인 표현이 당신을 이런 혼란에 빠뜨리지 않도록 하라.
- Follow the `DRY principle`: Don't repeat yourself.

<br>

## Item 6: Prefer Multiple Assignment Unpacking Over Indexing

### Tuple

- immutable and ordered sequences of values (값을 바꿀 수 없고 순서가 있음)
- 가장 simple한 case는, dictionary의 key-value 처럼 two values의 pair
- index로 접근 가능
- tuple 값이 한번 정해지면, assign 해서 값을 바꾸려하면 `TypeError` 발생  
(TypeError: 'tuple' object does not support item assignment)

<br>

### Unpacking

- 여러 개의 값을 assign 하는 문법
- assign해서 tuple 값을 바꾸는 것처럼 보이지만 실제로 바꾸는 것은 아니다.
- unpacking은 python에서 일반화 되어있고, 다양한 반복 표현 안에서 적용 가능하다.
- **tuple의 index로 접근하는 것보다 unpacking 하는 것이 훨씬 깔끔하고 때로는 코드 줄 수가 더 적다.**  
굳이 index로 접근해야 하는 경우는 잘 없다.

    ```python
    item = ('A', 'B')
    first, second = item

    print(first, 'and', second)
    >>> A and B
    ```

- unpacking에 관한 다른 chapters:  
**Item 13** (for list construction): Prefer Catch-All Unpacking Over Slicing  
**Item 22** (for function arguments): Reduce Visual Noise with Variable Positional Arguments  
**Item 23** (for keyword arguments): Provide Optional Behavior with Keyword Arguments  
**Item 19** (for multiple return values): Never Unpack More Than Three Variables When Functions Return Multiple Values

<br>

## Item 7: Prefer enumerate Over range

### Range

- `range` 는 int의 집합을 반복하는 for loop을 돌릴 때 유용하다.
- str이 들어있는 list와 같이 data structure를 반복하고 싶다면, 그 list를 그대로 넣어서 반복문을 돌릴 수 있다.

- index와 string 모두 알고 싶을 때는 `range(len(a))` 형태로 사용할 수 있는데, 해당 list의 length를 찾는 등 여러 단계가 있으면 코드를 읽기가 힘들어진다.

    ```python
    names = ['A', 'B', 'C']

    for i in range(len(names)):
    	name = names[i]
    	print(name)
    ```

<br>

### Enumerate

- enumerate wraps any iterator with a lazy generator
- enumerate의 두 번째 parameter에 숫자를 넣으면, 그 숫자부터 index가 count 된다. (default는 0)

    ```python
    snacks = [('bacon', 350), ('donut', 240), ('muffin', 190)]

    for rank, (name, calories) in enumerate(snacks, 1):
    	print(f'#{rank}: {name} has {calories} calories')

    >>>
    #1: bacon has 350 calories
    #2: donut has 240 calories
    #3: muffin has 190 calories
    ```


<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  