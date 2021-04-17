---
title: "Item 7: Prefer enumerate Over range"
date: "2020-08-24T10:12:05.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 7: Prefer enumerate Over range
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

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