---
title: "Item 19: Never Unpack More Than Three Variables When Functions Return Multiple Values"
date: "2020-09-15T09:12:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 19: Never Unpack More Than Three Variables When Functions Return Multiple Values
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

# [Part 3] Functions

## Item 19: Never Unpack More Than Three Variables When Functions Return Multiple Values

- Unpacking syntax (Item 6)는 함수가 한 개 이상의 return 값을 가질 수 있도록 한다.

    Multiple values가 tuple에 담겨서 같이 return 되고, 그 tuple을 여러 개의 변수로 unpacking 하기 때문이다.

    ```python
    def get_min_max(nums):
        minimum = min(nums)
        maximum = max(nums)
        return minimum, maximum

    nums = [10, 30, 1, 3]

    minimum, maximum = get_min_max(nums)

    minimum, maximum
    >>> (1, 30)
    ```

<br>

- return 값이 하나인 경우에도, 별표 expressions(Item 13)를 활용해서 unpacking 할 수 있다.

    ```python
    def sorted_list(nums):
        nums.sort()
        return nums

    nums = [10, 30, 1, 3]

    minimum, *middle, maximum = sorted_list(nums)

    minimum, middle, maximum
    >>> (1, [3, 10], 30)
    ```

<br>

### Multiple return values를 unpacking할 때 문제점

1. 여러 개의 변수를 나열해서 unpacking 하게 되는데, 이 때 할당하는 변수 순서가 실수로 뒤바뀌면 발견하기 힘든 bug가 생기기 쉽다.
2. 함수를 call 하고 unpack 하는 코드가 너무 길어서 여러 문장으로 나눠야 할 것이고, 그렇게 되면 가독성이 떨어진다.

<br>

:arrow_right: unpacking 할 때 catch-all starred expression을 포함한 최대 3개까지만 unpacking 하라.

:arrow_right: 4개 이상 unpacking 해야 할 때는 lightweight class(small class)를 return하거나, namedtuple(Item 37) instance를 return할 수 있도록 하라.

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  