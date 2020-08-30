---
title: "[Effective Python: Second Edition] Item 11 ~ Item 12: Slice, Stride"
date: "2020-08-30T23:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 11: Know How to Slice Sequences
Item 12: Avoid Striding and Slicing in a Single Expression
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

# Part 2. Lists and Dictionaries


## Item 11: Know How to Slice Sequences

- slicing은 subset의 element에 접근하기 쉽게 해준다.
- slicing은 list, str, bytes 외에도 `__getitem__` 과 `__setitem__`을 실행시키는 python class에 적용될 수 있다.

<br>

- 기본적인 slicing 문법은 `somelist[startindex:endindex]` (start부터 포함되고, end는 포함되지 않는다.)

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    nums[3:5]
    >>> [4, 5]
    ```

<br>

- 맨 처음부터 시작하거나 맨 뒤까지 slicing 하는 경우, index를 생략가능하다.

    ```python
    assert nums[:5] == nums[0:5]

    assert nums[3:] == nums[3:len(nums)]
    ```

<br>

- slicing index로 negative number를 사용할 수 있다.

    ```python
    a[-20:]
    a[:-3]
    a[2:-1]
    a[-3:-1]
    ...
    ```

<br>

- slicing은 index의 범위가 list의 길이를 벗어나도 사용가능하다.  
그래서 list의 length를 신경쓰지않고도 앞에서부터 20개, 뒤에서부터 20개와 같은 slicing을 쉽게 할 수 있다.
    * list 길이 밖의 index 하나에 직접 접근하는 것은 index error 발생

    ```python
    a = [1, 2, 3, 4, 5, 6]

    first_twenty_items = a[:20]
    >>> [1, 2, 3, 4, 5, 6]

    last_twenty_items = a[-20:]
    >>> [1, 2, 3, 4, 5, 6]

    a[20]
    >>> IndexError: list index out of range
    ```

<br>

- slicing list의 결과는 완전 새로운 list이다.  
original list items의 references들은 그대로 유지된다.  
slicing의 결과를 수정한다고 해도 original list에는 영향을 주지 않는다.

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    new_nums = nums[3:6]
    new_nums[1] = 99

    nums
    >>> [1, 2, 3, 4, 5, 6, 7]

    new_nums
    >>> [4, 99, 6]
    ```

<br>

- **Unpacking assignment vs Slicing assignment**
    - unpacking assignments는 할당 받을 변수와 할당할 slices의 개수가 같아야 한다.  
    길이가 다르면 error 발생
    - slice assignments는 양쪽의 길이가 같지 않아도 된다.  
    slicing한 것보다 할당이 더 많으면 list의 길이가 길어지고, slicing한 것보다 input 값이 더 적으면 list의 길이가 짧아진다.

    ```python
    nums = [1, 2, 3, 4, 5, 6, 7]

    # unpacking assignment
    a, b = nums[:2]

    a, b, c = nums[:2]
    >>> ValueError: not enough values to unpack (expected 3, got 2)

    a, b = nums[:3]
    >>> ValueError: too many values to unpack (expected 2)

    # slicing assignment
    nums[2:5] = [99]

    nums
    >>> [1, 2, 99, 6, 7]
    ```

<br>

- **`b = a[:]` vs `b = a`**
    - `b = a[:]` 처럼 start index와 end index를 생략해서 list 전체를 slicing 한 것을 변수에 할당하면:  
    **original list를 copy한 새로운 list가 된다.  
    즉, b와 a는 내용이 같지만 서로 엄연히 다른 객체로 존재하는 것.**

        ```python
        b = a[:]

        assert b == a
        assert b is not a
        ```

    - `b = a` 와 같은 형태로 assign 하면:  
    **original list가 참조하는 것을 copy한다. (new list를 할당하는 것이 아님)  
    즉, b와 a는 같은 것을 참조한다는 것. (하나의 실체에 바로가기가 여러 개 있는 느낌)**

        ⇒ a와 b 중 하나를 수정해도 둘 다 수정된다.

        ```python
        a = [1, 2, 3]
        b = a
        a[:] = [99, 999]

        assert a is b

        a == b == [99, 999]
        >>> True
        ```

<br>

---

## Item 12: Avoid Striding and Slicing in a Single Expression

- 기본적인 striding의 문법은: `somelist[start:end:stride]`  
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