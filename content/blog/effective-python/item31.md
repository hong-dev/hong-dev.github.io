---
title: "Item 31: Be Defensive When Iterating Over Arguments"
date: "2021-04-30T20:15:03.284Z"
template: "post"
draft: true
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 4] Comprehensions and Generators
Item 31: Be Defensive When Iterating Over Arguments
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 31: Be Defensive When Iterating Over Arguments

- Input arguments를 여러번 반복하는 함수와 메소드를 주의하라.  
만약 arguments가 iterator라면, 이상한 결과나 missing values가 생길 수 있다.

- 전체 숫자 리스트의 합에서 각각의 숫자가 차지하는 비중을 계산하려고 한다.

    ```python
    def get_percent(nums):
        total = sum(nums)
        result = []
        for num in nums:
            percent = 100 * num / total
            result.append(percent)
        return result

    numbers = [10, 35, 80]

    get_percent(numbers)
    >>> [8.0, 28.0, 64.0]
    ```
<br>

- Parameter로 들어갈 숫자를 generate 하는 함수를 만들어서 위의 함수에 적용해보면, 제대로 된 결과가 나오지 않는다.

    ```python
    import random

    nums = [10, 15, 20, 25, 30, 35, 40, 45, 50]

    def get_nums():
        for num in random.choices(nums, k=3):
            yield num

    numbers = get_nums()

    get_percent(numbers)
    >>> []
    ```

<br>

- 그 이유는, iterator가 그 결과값을 한번만 보여주기 때문이다.  
Iterator를 반복하거나 `StopIteration` exception이 발생한 generator를 반복하면 두 번째로 호출할 때 아무런 결과값도 얻지 못한다.

    헷갈리게도, 이러한 exhausted iterator를 반복했을 때는 error도 발생하지 않는다.  
    즉, iterator가 output이 원래 없는 것인지, 아니면 output이 있었지만 호출이 되어서 소진된 상태인 것인지 알 수가 없다.

    ```python
    nums = get_nums()

    list(nums)
    >>> [15, 30, 15]

    list(nums)
    >>> []
    ```
<br>

- 이러한 문제를 해결하기 위해, input iterator를 명시적으로 exhaust 시키고, list에 있는 전체 contents의 복사본을 저장해놓을 수 있다.

    그러면 data의 list version을 원하는 만큼 반복할 수 있다.

    ```python
    def get_percent(nums):
        nums_copy = list(nums)  #copy the iterator
        total = sum(nums_copy)
        result = []
        for num in nums_copy:
            percent = 100 * num / total
            result.append(percent)
        return result

    numbers = get_nums()

    result = get_percent(numbers)
    >>> [43.75, 18.75, 37.5]

    assert sum(result) == 100.0
    ```

<br>

- 이 방법의 문제점은, input iterator의 복사본이 매우 클 수 있다는 것이다.  
Iterator를 copy 하는 것은 메모리의 부족이나 프로그램 다운을 발생시킬 수 있다.  
이러한 잠재적인 확장성 문제는 generator로 작성할 이유를 약화시킨다.

    이를 위한 한가지 방법은, 호출될 때마다 새로운 iterator를 반환하는 함수를 parameter로 받는 것이다.  
    `lambda`를 이용해서 generator를 호출하고 새로운 iterator를 매번 생성하게 할 수 있다.

    ```python
    _path = 'my_numbers.txt'
    with open(path, 'w') as f:
        for i in (15, 35, 80):
            f.write('%d\n' % i)

    def read_visits(data_path):
        with open(data_path) as f:
            for line in f:
                yield int(line)

    ----
    nums = [10, 15, 20, 25, 30, 35, 40, 45, 50]

    def get_nums(seed): 
        random.seed(seed)
        for i in range(3): 
            for num in random.choices(nums): 
                yield num

    def get_nums():
        for num in random.choices(nums, k=3):
            yield num

    seed 42
    ----

    def get_percent(get_iter):
        seed = random.randint(1, 500)
        total = sum(get_iter(seed))  #New iterator
        result = []
        for num in get_iter(seed):  #New iterator
            percent = 100 * num / total
            result.append(percent)
        return result

    result = get_percent(lambda: read_visits(path))

    result = get_percent(lambda seed: get_nums(seed))
    map(nums, lambda x: x+1)

    def function():
        read_visits(path)

    def function(seed):
        get_nums(seed)

    def function(a,b):
        a*b
    lambda a,b: return a*b

    ##get_nums()로 넘겼을 때와 read_visits()로 넘겼을 때의 값이 다르다..? read_visits는 무조건 값이 정해져있어서 그런거 아닌가..?
    ##그러면 저렇게 계속 매번 호출하게 하면 안되는거 아닌가ㅠㅠ?

    result.....?
    >>> [11.538461538461538, 26.923076923076923, 61.53846153846154]

    assert sum(result) == 100.0.....?
    ```

<br>

## Iterator protocol

- 위의 방법은 잘 작동하지만, lambda function을 넘겨줘야 하는 것이 번거롭다.
더 괜찮은 방법으로 `iterator protocol`을 실행하는 새로운 class를 만들 수 있다.
- The iterator protocol is how Python for loops and related expressions traverse the contents of a container type.
what is.. container.. and container type...

    Python이 `for x in foo`를 읽으면, 실제로는 `iter(foo)`를 호출한다.
    `iter` built-in function은 `foo.__iter__` 라는 method를 호출한다.
    `__iter__` method는 `__next__` method를 실행하는 iterator object를 반드시 return 해야 한다.
    그래서 for loop는 소진될 때까지(`StopIteration` exception이 raise 될 때까지) 반복적으로 iterator의 `next` built-in function을 호출한다.

- 이 방법은 복잡해 보이지만, 실제로는 class에서 generator의 역할을 하는 `__iter__` method를 실행하기만 하면 된다.

    이렇게 하면, `get_percent` 함수를 바꾸지 않아도 처음 작성했던 함수에 그대로 사용할 수 있다.

    ```python
    class GetNums:
        def __init__(self, path):
            self.path = path

        def __iter__(self):
            with open(self.path) as f:
                for line in f:
                    yield int(line)

    ----
    nums = [10, 15, 20, 25, 30, 35, 40, 45, 50]

    class GetNums:
        def __init__(self, path):
            self.path = path

        def __iter__(self):
            for num in random.choices(nums, k=3):
                yield num
    ----

    def get_percent(nums):
        total = sum(nums) #numpy sum. global interpreter lock....
        result = []
        for num in nums: #새롭게 또 호출
            percent = 100 * num / total
            result.append(percent)
        return result

    path = 'my_numbers.txt'
    numbers = GetNums(path)
    result = get_percent(numbers)

    result
    >>> [11.538461538461538, 26.923076923076923, 61.53846153846154]

    assert sum(result) == 100.0
    ```

- 위의 방법이 가능한 이유는, `get_percent` 함수의 `sum` method가 새로운 iterator object를 할당하기 위해 `GetNums.__iter__`를 호출하기 때문이다. 숫자의 normalize를 위한 for loop 또한 두번째 iterator object를 할당하기 위해 `__iter__`를 호출한다.
- 각각의 iterators는 독립적으로 호출되고 소진될 것인데, 그것은 각각의 고유한 반복이 모든 input data 값을 볼 수 있도록 보장한다.
이 방법의 유일한 단점은 input data를 여러번 읽는다는 것이다.

- GetNums와 같은 container가 어떻게 동작하는지를 알면, parameters가 단순히 iterators가 아니라는 것을 보장하도록 함수와 메소드를 작성할 수 있다.
- Iterator가 `iter` built-in function으로 넘겨질 때, `iter`는 그 iterator 자체를 return 한다.
반대로, container type이 `iter`로 넘겨질 때는 매번 새로운 iterator object가 return 된다.

    따라서 반복해서 되풀이 할 수 없는 arguments를 걸러내기 위해, input value를 확인하고 TypeError를 raise할 수도 있다.

    ```python
    def get_percent(nums):
        if iter(nums) is nums:  #An iterator -- bad!
            raise TypeError('Must supply a container')  #when..?
        total = sum(nums)
        result = []
        for num in nums:
            percent = 100 * num / total
            result.append(percent)
        return result
    ```

- 또는, `isinstance` + `collections.abc` built-in module의 `Iterator` class를 사용하여 체크할 수도 있다. (Item 43 참조)

    ```python
    from collections.abc import Iterator

    def get_percent(nums):
        if isinstance(nums, Iterator):
            raise TypeError('Must supply a container')
        total = sum(nums)
        result = []
        for num in nums:
            percent = 100 * num / total
            result.append(percent)
        return result
    ```

- Input iterator 전체를 copy하고 싶지 않을 때 container를 사용한 접근은 매우 이상적이지만, input data를 여러번 iterate 해야한다.

    위의 함수는 `list`와 `GetNums` inputs는 반복가능한 containers이기 때문에 예상하는 대로 작동한다.

- Input이 container가 아닌 iterator일 때 exception이 발생한다.

    ```python
    nums = [15, 35, 60]
    numbers = iter(nums)

    get_percent(numbers)
    >>> TypeError: Must supply a container
    ```

- 비동기 반복(asynchronous iterators)에도 같은 접근법을 사용할 수 있다. (Item 61 참조)


<br>
<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  