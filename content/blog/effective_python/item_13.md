---
title: "Item 13: asterisk(*) for unpacking"
date: "2020-09-05T23:12:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 13: Prefer Catch-All Unpacking Over Slicing
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 13: Prefer Catch-All Unpacking Over Slicing

- Unpacking 할 때 slicing 보다는 별표(*)를 활용하자.

<br>

- Unpacking 할 때는 unpacking 되어야 하는 것의 길이를 미리 알아야 한다는 단점이 있다.  
unpacking 할 것들의 길이와 unpacking 해서 할당할 변수의 개수가 같아야 함. 다르면 `ValueError` 발생.  
([Item 11](https://hong-dev.github.io/effective_python/item_11_to_12/)에서 unpacking assignment와 slicing assignment 비교 참조)

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    first, second = nums
    >>> ValueError: too many values to unpack (expected 2)
    ```

<br>

- 그래서 이런 경우에, python을 처음 사용하는 사람들은 indexing과 slicing에 많이 의존한다.

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    first = nums[0]
    second = nums[1]
    others = nums[2:]

    print(first, second, others)
    >>> 1 2 [3, 4, 5, 6, 7]
    ```

    ⇒ 이 방법은 가능하지만 보기에 지저분하다.  
    그리고 개별로 할당을 하기 때문에, 저 중 하나가 바뀐다고 했을 때 다른 변수들도 다시 고려해야 하고, 에러가 발생하기 쉽다.

<br>

### **starred expression (*)**

- 이런 경우에, Python은 `*`를 사용한 catch-all unpacking 기능을 제공한다.  
unpacking과 같은 문법이지만, `*`이 붙은 변수에는 다른 변수들이 unpacking 하고 남은 element들을 list로 담아 할당한다.

    ```python
    first, second, *others = [1, 2, 3, 4]

    print(first, second, others)
    >>> 1 2 [3, 4]
    ```

<br>

- list로 할당받기 때문에 할당할 element가 없더라도 빈 list가 된다.

    ```python
    first, second, *others = [1, 2]

    print(first, second, others)
    >>> 1 2 []
    ```

<br>

- starred expression은 어느 위치에서든 사용할 수 있다.

    ```python
    first, *others, last = [1, 2, 3, 4]

    print(first, others, last)
    >>> 1 [2, 3] 4
    ```

    ```python
    *others, second_to_last, last = [1, 2, 3, 4]

    print(others, second_to_last, last)
    >>> [1, 2] 3 4
    ```

<br>

- **주의사항 1 : `*`는 단독으로 쓰일 수 없다.**

    적어도 하나 이상의 다른 변수와 사용되어야 한다.
    단독으로 쓰면 `SyntaxError` 발생

    ```python
    *others = [1, 2, 3, 4]
    >>> SyntaxError: starred assignment target must be in a list or tuple
    ```

<br>

- **주의사항 2 : 하나의 single-level unpacking pattern에서 여러 개의 `*`를 사용할 수 없다.**

    ```python
    first, *middle, *second_middle, last = [1, 2, 3, 4]
    >>> SyntaxError: two starred expressions in assignment
    ```

    - 다만, multilevel structure일 때는 각기 다른 part들의 catch-alls 라면 여러 개의 `*`를 사용할 수 있다.

        ```python
        city = {
            'Korea': ('Seoul', 'Busan', 'Jeju'),
            'US': ('New York', 'Chicago', 'Los Angeles', 'Boston')
        }

        ((country1, (first1, *rest1)),
        (country2, (first2, *rest2))) = city.items()

        print(country1, first1, rest1)
        >>> Korea Seoul ['Busan', 'Jeju']

        print(country2, first2, rest2)
        >>> US New York ['Chicago', 'Los Angeles', 'Boston']
        ```

<br>

- 별표 expression (`*`)은 항상 list가 되기 때문에, 그 data가 많을 경우 컴퓨터의 메모리를 다 써버릴 수 있다는 위험성이 있다.  
그래서 result data가 memory 안에 다 들어갈 것이라고 믿을 만한 충분한 이유가 있을 때만, iterator에서 catch-all unpacking을 사용해야 한다.


<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  