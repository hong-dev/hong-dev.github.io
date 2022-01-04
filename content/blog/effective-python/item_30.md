---
title: "Item 30: Consider Generators Instead of Returning Lists"
date: "2021-04-24T22:52:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 4] Comprehensions and Generators
Item 30: Consider Generators Instead of Returning Lists
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 30: Consider Generators Instead of Returning Lists

### Return `list`

- 함수가 결과값들을 나열하기 위해 사용할 수 있는 가장 간단한 방법은 `list`를 return 하는 것이다.

    ```python
    def count_words(word_list):
        result = []
        for word in word_list:
            result.append(len(word))
        return result

    count_words(['hello', 'hi'])
    >>> [5, 2]
    ```

<br>

- **Problem 1**  
    새로운 result 값이 나올 때마다 `append` method가 매번 호출된다.


- **Problem 2**  
    Return 되기 전에 모든 결과값들이 list에 저장되어 있어야 한다.
    Input이 매우 크다면, 메모리 저장공간이 부족해지거나 프로그램이 다운되는 문제를 발생시킬 수 있다.

<br>
<br>

### Generator

- Generator를 사용하면, List를 return 할 때 발생하는 위의 두 가지 문제를 해결할 수 있다.
- `generator`는 `yield` expressions를 사용하는 함수에 의해 만들어진다.

    이렇게 작성하면, 결과 list에 대한 상호작용이 사라지기 때문에 가독성이 훨씬 좋다. 대신에 결과는 yield expressions로 넘겨진다.

    ```python
    def count_words(word_list):
        for word in word_list:
            yield len(word)

    count_words(['hello', 'hi'])
    >>> <generator object count_words at 0x7f6987602990>
    ```

<br>

- generator는 호출될 때 실제로 실행되는 것이 아니고 iterator를 return한다.  
`next` built-in function과 함께 호출될 때, iterator는 generator의 다음 yield expression으로 넘어가게 한다. (Solution for problem 1)

    ```python
    func = count_words(['hello', 'hi'])

    next(func)
    >>> 5
    next(func)
    >>> 2
    ```

<br>

- 필요하다면 generator가 return하는 iterator를 `list` built-in function으로 넘겨서 `list`로 간단하게 바꿀 수 있다. (Item 32 참조)

    ```python
    func = list(count_words(['hello', 'hi']))

    func
    >>> [5, 2]
    ```

<br>

- Generator는 임의의 길이를 가진 input에도 쉽게 적용시킬 수 있다.

    사용하고 있는 메모리에 input과 output 전체를 저장하지 않기 때문이다. (Solution for problem 2)

<br>

- Generator를 사용할 때 조심해야 할 것은, return된 iterator는 다시 사용할 수 없다는 것을 caller가 알아야한다. (Item 31 참조)


<br>
<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  