---
title: "[Effective Python: Second Edition] Item 8 ~ Item 10"
date: "2020-08-29T23:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 8: Use zip to Process Iterators in Parallel
Item 9: Avoid else Blocks After for and while Loops
Item 10: Prevent Repetition with Assignment Expressions
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 8: Use zip to Process Iterators in Parallel

- 여러 list들을 동시에 iterate 하고 싶을 때 zip 사용
    - zip은 각각의 list들이 iterate로 돌 때 같이 묶이는 element들을 차례로 tuple로 생성한다.  
    이 tuple은 unpacking이 가능하다.

- zip wraps two or more iterators with a lazy generator.
- zip은 lazy generator를 생성하기 때문에, 메모리나 캐싱을 많이 사용하지 않아 무한히 긴 long input도 가능하다.

    > ### List vs Generator
    list 는 list 안에 속한 모든 데이터를 메모리에 올리기 때문에 list의 크기가 클수록 차지하는 메모리 사이즈가 늘어난다.  
    generator는 데이터 값을 한꺼번에 메모리에 올리는 것이 아니라 next() 메소드를 통해 차례로 값에 접근할 때마다 메모리에 올리는 방식이다.

<br>

- 다만, zip에 들어가는 input iterators의 길이가 서로 다를 때는 주의하라.  
길이가 서로 다르다면, 가장 짧은 input iterator의 길이를 기준으로 거기까지만 tuple을 yield 한다.  
아무런 에러없이 조용히 그냥 뒤를 잘라버리기 때문에 조심해야 한다.

    ```python
    names = ['A', 'B', 'C', 'D']
    counts = [1, 2, 3]

    for name, count in zip(names, counts):
        print(f'{name}: {count}')

    >>>
    A: 1
    B: 2
    C: 3
    ```

    :arrow_right: names list에 들어있는 `D`는 print 되지 않는다.

<br>

- 길이를 예측할 수 없는데 모든 정보를 다 yield 하고 싶다면, `zip` 함수 대신에 `itertools.zip_longest` 함수를 사용해보자.
`zip_longest` 함수는 missing value를 `None`으로 대체한다.

    ```python
    import itertools

    names = ['A', 'B', 'C', 'D']
    counts = [1, 2, 3]

    for name, count in itertools.zip_longest(names, counts):
        print(f'{name}: {count}')

    >>>
    A: 1
    B: 2
    C: 3
    D: None
    ```

<br>

## Item 9: Avoid else Blocks After for and while Loops

- Python에는 대부분의 다른 프로그램 언어에서는 가능하지 않은 추가 기능이 있다:  
반복문의 block 직후에 `else` block을 사용할 수 있다.
- 반복문(for loop, while loop) 뒤에 오는 `else` block은 반복문 안에서 `break`를 만나지 않는다면 실행된다.  
(반복문 안에서 break가 실행되면, else는 실행되지 않는다.)
- 우리가 보통 사용하는 `else`는, 앞의 block이 실행되지 않을 경우 else block을 실행하라 라는 의미로 이해한다.  
반복문 뒤의 else는 그런 의미가 아니기 때문에, 헷갈릴 수 있고 이게 무슨 역할인지 이름만 봐서는 알기 어려우므로 사용하지 말자.

<br>

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