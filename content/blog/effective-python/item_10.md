---
title: "Item 10: Prevent Repetition with Assignment Expressions"
date: "2020-08-29T23:12:05.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 10: Prevent Repetition with Assignment Expressions
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 10: Prevent Repetition with Assignment Expressions

- **Assignment expressions (walrus operator) 을 사용하여 반복을 없애자.**
- `a = b`는 'a equals b' 라고 읽는데, `a := b` 라고 쓰고 'a walrus b' 라고 읽는다.

<br>

- if statement와 같이 assignment statement가 사용될 수 없는 곳에서 assign(변수 할당)이 가능하도록 해준다.

    ```python
    # assignment expresstion을 사용하지 않았을 때

    fruit = {
        'apple': 5,
    		'banana': 10,
    		'lemon': 2
    }

    count = fruit.get('lemon', 0)
    if count:
    		print(count)
    else:
    		print('out of stock')
    ```

    ```python
    # assignment expresstion을 사용했을 때

    fruit = {
        'apple': 5,
    		'banana': 10,
    		'lemon': 2
    }

    if count := fruit.get('lemon', 0):
    		print(count)
    else:
    		print('out of stock')
    ```

<br>

- two-step behavior : 변수를 assign 하고 ⇒ statement 안에서 값을 evaluate 한다.

<br>

- 만약, assignment expression이 더 큰 표현식의 subexpression이라면, 괄호를 꼭 붙여줘야한다.

    ```python
    if (count := fruit.get('lemon', 0)) >= 4:
    		print(count)
    else:
    		print('need more fruits')
    ```

<br>

- `while문` 에서 while이 돌 때마다 새로 변수를 정의해줘야 하는 경우:
    ### Case 1
    ```python
    alp = ['A', 'B', 'C', 'D', 'E']

    def pick_alp():
        if alp:
            return alp.pop(0)
        else:
            return []

    picked_alp = pick_alp()
    while picked_alp:
        print(picked_alp)
        picked_alp = pick_alp()
    ```

    :arrow_right: `picked_alp = pick_alp()`가 while문 밖에서 처음 정의되었는데, while문이 돌 때마다 새로 정의를 해줘야하기 때문에 while의 마지막 줄에도 또 적어줬다. 중복의 발생.

    <br>

    ### Case 2
    ```python
    alp = ['A', 'B', 'C', 'D', 'E']

    def pick_alp():
        if alp:
            return alp.pop(0)
        else:
            return []

    while True:
        picked_alp = pick_alp()
        if not picked_alp:
            break
        print(picked_alp)
    ```

    :arrow_right: 중복된 문장은 없지만, while문을 무한 루프로 만들면서 while loop의 기능을 저해한다.

    <br>

    ### Case 3 (using assignment expression)
    ```python
    alp = ['A', 'B', 'C', 'D', 'E']

    def pick_alp():
        if alp:
            return alp.pop(0)
        else:
            return []

    while picked_alp := pick_alp():
        print(picked_alp)
    ```

    :arrow_right: `:=` 가 매번 다시 할당을 시켜주면서 while문도 계산해서 실행시켜준다.

    :arrow_right: Assignment expression을 사용하면, 반복을 없앨 수 있다.


<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  