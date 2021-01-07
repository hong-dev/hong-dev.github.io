---
title: "[Effective Python: Second Edition] Item 12: Avoid Striding and Slicing in a Single Expression"
date: "2020-08-30T23:12:04.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 12: Avoid Striding and Slicing in a Single Expression
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 12: Avoid Striding and Slicing in a Single Expression

- 기본적인 striding의 문법은: `somelist[start: end: stride]`  
slicing과 비슷하게 start index와 end index를 입력하고, 얼마 간격으로 건너뛰기를 할 것인지 stride를 입력한다.
- striding(건너뛰기)은 nth번째마다 뽑아서 가져올 수 있다.  
slicing 할 때, striding을 사용하면 홀수번째와 짝수번째 index를 grouping 하기 쉽다.

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    odds = nums[::2]
    >>> [1, 3, 5, 7]

    evens = nums[1::2]
    >>> [2, 4, 6]
    ```

<br>

- negative number도 가능하다. stride가 negative이면 뒤에서부터 거꾸로 건너뛴다.

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    nums[::2]
    >>> [1, 3, 5, 7]

    nums[::-2]
    >>> [7, 5, 3, 1]
    ```

<br>

- 다만, stride syntax는 가끔 예측하지 못하는 bug를 낸다.
python에서 글자를 reverse하는 방법중에 `a[::-1]` 이 있다.
이 방법은 Unicode string에서도 적용되는데, unicode data가 encode된 후에 적용할 경우에는 error가 발생한다.

    ```python
    a = '안녕하세요'

    a[::-1]
    >>> 요세하녕안
    ```

    ```python
    a = '안녕하세요'
    b = a.encode('utf-8')
    c = b[::-1]

    c.decode('utf-8')
    >>> UnicodeDecodeError: 'utf-8' codec can't decode byte 0x94 in position 0: invalid start byte
    ```

<br>

- bracket (`[]`) 안에 3개의 숫자가 들어있으면 읽기가 힘들다.
slicing syntax에 stride part까지 추가되면 매우 복잡해진다.

    ```python
    x[2::2]
    x[-2::-2]
    x[-2:2:-2]
    x[2:2:-2]
    ```

<br>

### Advice for usage

- stride를 쓸 때는 start index와 end index 사용을 피하라.
- 꼭 둘 다 써야겠다면, striding 한문장, slicing 한문장 나눠서 쓰는 걸 고려하라.

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    stride_nums = nums[::2]  #[1, 3, 5, 7]
    slice_nums = stride_nums[1:-1]

    slice_nums
    >>> [3, 5]
    ```


<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  