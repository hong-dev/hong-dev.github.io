---
title: "Item 21: Closure and Scope"
date: "2020-09-19T16:54:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 3] Functions
Item 21: Know How Closures Interact with Variable Scope
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 21: Know How Closures Interact with Variable Scope

### **그룹별로 묶어서 sorting 할 때**

```python
numbers = [1, 2, 3, 4, 5, 6]
group = {1, 3, 5}

def sort_group(values, group):
    def helper(x):
        if x in group:
            return (0, x)
        return (1, x)
    values.sort(key=helper)

sort_group(numbers, group)

numbers
>>> [1, 3, 5, 2, 4, 6]
```

- **closures :** 변수를 정의한 범위 내에서 변수를 나타내는 함수
- python에서 함수들은, 변수에 할당할 수도 있고 다른 함수의 argument가 될 수도 있고 if문이나 표현식에서 서로 비교할 수도 있다.  
따라서, sort method의 key argument로 closure function을 넘길 수 있는 것
- python은 tuple과 같은 sequences를 비교할 수 있다.  
튜플의 zero index끼리 먼저 sorting하고, zero index가 같으면 그 다음 index끼리 비교하는 식으로 tuple을 sort할 수 있다.

<br>

### **group으로 설정되어 있는 item들 중에 하나라도 입력이 되었는지 확인**

```python
numbers = [1, 2, 3, 4, 5, 6]
group = {1, 3, 5}

def sort_group(values, group):
    group_check = False
    def helper(x):
        if x in group:
            group_check = True
            return (0, x)
        return (1, x)
    values.sort(key=helper)
    return group_check

sort_group(numbers, group)
>>> False

numbers
>>> [1, 3, 5, 2, 4, 6]
```

⇒ group_check가 True가 될 것으로 예상했지만, False가 나왔다. 어떻게 된 것일까?

<br>

### 파이썬 interpreter가 변수를 찾을 때, scope 순서

1. current 함수 scope
2. 둘러싼 함수 scope
3. code가 들어있는 module scope (global scope)
4. built-in scope (len, str 등의 함수 포함)
5. 위의 그 어떤 것도 변수를 정의하지 않았으면, NameError 발생

<br>

### 변수에 값을 할당할 때

- current scope에 해당 변수가 이미 정의되어 있으면, 새로운 값으로 씌워진다.
- current scope에 해당 변수가 없으면, 새로운 변수를 정의한 것으로 인식한다.

<br>

### Scoping Bug

- 아래의 코드를 다시 보면, sort\_group에서 정의된 group\_check는 False로 남아있고, helper 함수 내에서의 group\_check는 새로운 변수를 새로 할당한 것으로 취급한다.

    ```python
    def sort_group(values, group):
        group_check = False  # scope: 'sort_group'
        def helper(x):
            if x in group:
                group_check = True  #새로운 변수 할당(scope: 'helper')
                return (0, x)
            return (1, x)
        values.sort(key=helper)
        return group_check
    ```

<br>

### nonlocal statement

- closure 밖의 data를 가져올 수 있는 문법
- nonlocal은 module-level scope까지는 가지 않는다. (global 변수는 건드리지 않기 위해)

    module scope까지 바로 가는 global statement와 상호보완이 가능하다.

    ```python
    numbers = [1, 2, 3, 4, 5, 6]
    group = {1, 3, 5}

    def sort_group(values, group):
        group_check = False
        def helper(x):
            nonlocal group_check   #추가
            if x in group:
                group_check = True
                return (0, x)
            return (1, x)
        values.sort(key=helper)
        return group_check

    sort_group(numbers, group)
    >>> True

    numbers
    >>> [1, 3, 5, 2, 4, 6]
    ```

<br>

### Cautions

- 간단한 함수 외에는 `nonlocal`을 사용할 때 주의하라.
- nonlocal의 side effect는 추적하기 쉽지않고, nonlocal statements와 연결된 변수 정의가 멀리 떨어져 있는 긴 함수 안에서라면 더욱 그렇다.
- nonlocal의 사용이 복잡해지면, helper class로 상태를 넣어두는 것이 낫다.

    (`__call__` method에 대해서는 Item 38 참조)

    ```python
    numbers = [1, 2, 3, 4, 5, 6]
    group = {1, 3, 5}

    class Sorter:
        def __init__(self, group):
            self.group = group
            self.group_check = False
        def __call__(self, x):
            if x in self.group:
                self.group_check = True
                return (0, x)
            return (1, x)

    sorter = Sorter(group)
    numbers.sort(key=sorter)

    assert sorter.group_check is True

    numbers
    >>> [1, 3, 5, 2, 4, 6]
    ```

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  