---
title: "[Effective Python: Second Edition] Item 8: Use zip to Process Iterators in Parallel"
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

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  