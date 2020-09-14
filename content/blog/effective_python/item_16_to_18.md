---
title: "[Effective Python: Second Edition] Item 16 ~ Item 18: Dictionary Missing Keys"
date: "2020-09-14T23:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 16: Prefer `get` Over `in` and `KeyError` to Handle Missing Dictionary Keys
Item 17: Prefer `defaultdict` Over `setdefault` to Handle Missing Items in Internal State
Item 18: Know How to Construct Key-Dependent Default Values with __missing__
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 16: Prefer `get` Over `in` and `KeyError` to Handle Missing Dictionary Keys

- dictionary의 키가 있는지 없는지 체크할 때, `in` expression 이나 `KeyError` 보다는 `get` method를 사용하라.
- 어떤 경우에는 `get`보다 `setdefault`가 가장 짧은 option처럼 보이는데, 이런 경우에도 `setdefault`보다는 `defaultdict`(Item 17 참조)가 better option이 되는 경우가 많다.

<br>

### 1. `If` statement with an `in` expression

- key가 dictionary에 있는지 확인하고, 없으면 새로운 변수 count에 0이라는 default 값을 할당하고 (있으면 새로운 변수에 현재 value 값을 할당하고), 증가시킨 count의 값을 key에 해당하는 value 값으로 할당한다.
- 이 방법은 키값이 있을 때는 two accesses to key, one assignment이고, 키값이 없으면 one access, one assignment 이다.

    ```python
    fruits = {'apple': 2, 'banana': 1}
    fruit = 'orange'

    # Case 1
    if fruit in fruits:
        count = fruits[fruit]
    else:
        count = 0

    fruits[fruit] = count + 1
    ```

<br>

- 코드를 더 줄일 수 있는 방법도 있지만, assignments에 대해 중복이 생긴다.

    ```python
    # Case 2
    if fruit not in fruits:
        fruits[fruit] = 0
    fruits[fruit] += 1
    ```

<br>

### 2. `KeyError` using try-except

- key 값이 없으면 KeyError exception을 사용해서 처리한다.
- 이 방법은 one access, one assignment 이기 때문에 if ... in 보다 더 효율적이다.

    ```python
    fruits = {'apple': 2, 'banana': 1}
    fruit = 'orange'

    # Case 1
    try:
        count = fruits[fruit]
    except KeyError:
        count = 0

    fruits[fruit] = count + 1
    ```

<br>

- 역시 코드를 더 줄일 수 있는 방법이 있지만, 할당하는 코드의 중복이 생긴다.

    ```python
    # Case 2
    try:
        fruits[fruit] += 1
    except KeyError:
        fruits[fruit] = 1
    ```

<br>

### 3. dict `get` method

- get method는 첫번째 parameter(key)의 value 값을 return하는데, parameter로 넣은 key 값이 dict에 없다면 두번째 parameter를 default value로 return 한다.
- 이 방법 역시 one access, one assignment이고, 다른 방법들보다 짧게 코드를 쓸 수 있다.

    ```python
    fruits = {'apple': 2, 'banana': 1}
    fruit = 'orange'

    count = fruits.get(fruit, 0)
    fruits[fruit] = count + 1
    ```

<br>

### 💡 collections.Counter

- 위의 예시들처럼 dictionary에 counters를 저장할 때, `collections.Counter`를 사용해보자. 대부분의 필요한 기능들을 제공한다.

    ```python
    from collections import Counter

    fruits = Counter({'apple': 2, 'banana': 1})
    fruits['apple'] += 1

    fruits
    >>> Counter({'apple': 3, 'banana': 1})

    fruits['apple']
    >>> 3
    ```

<br>

### if `values` for keys are `list` :

- 만약, dictionary에서 key에 해당하는 value 값이 list라면 위의 방법들이 어떻게 적용될까?
- **Case 1: in expression**

    ```python
    fruits = {'apple': ['a1', 'a2'], 'banana': ['b1', 'b2']}
    fruit = 'orange'
    name = 'o1'

    if fruit in fruits:
        names = fruits[fruit]
    else:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 2: KeyError exception**

    ```python
    try:
        names = fruits[fruit]
    except KeyError:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 3: get method**

    ```python
    names = fruits.get(fruit)
    if names is None:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 4: get method + assignment expression(walrus operation)**

    코드가 더 짧고 가독성도 높일 수 있다. (Item 10: Prevent Repetition with Assignment Expressions 참조)

    ```python
    # python 3.8
    if (names := fruits.get(fruit)) is None:
        fruits[fruit] = names = []

    names.append(name)
    ```

<br>

- **Case 5: setdefault method**

    setdefault method는 key의 value 값을 가지고 오며, key가 없으면 두번째 parameter를 value 값으로 할당해준다.

    ```python
    names = fruits.setdefault(fruit, [])
    names.append(name)
    ```

<br>

### Setdefault method

- 장점: get method보다 코드를 더 짧게 줄일 수 있다.
- 단점 1: `setdefault` 라는 이름이 딱 봤을 때 그 목적이 뭔지 알기 어렵다.
value를 set만 하는 게 아니라 get하는 method이기도 한데, 왜 `get_or_set` 이라고 하지 않을까?
- 단점 2: setdefault는 dict를 copy하는 대신에 직접적으로 접근해서 assign 한다.
즉, setdefault로 접근한 key에 항상 새로운 default value 값을 구성해야 한다. setdefault를 호출할 때마다 list instance를 할당해야 하니, performance 문제가 생길 수 있다.
- 그리고 이 default value를 다른 곳에서 재사용한다면, 또다른 버그들이 생길지 모른다.

<br>

:bulb: `get`은 value 값을 copy 해오고, `setdefault`는 value 값을 dict에 직접 접근해서 새로 할당한 것을 가져온다.

- missing dictionary keys를 처리할 때, setdefault를 쓰는 게 더 나은 경우는 별로 없다.

    예를 들면, setdefault가 할당해야하는 default values가 생성하기에 무겁지 않고, mutable(변경 가능)하며, exception이 생길 가능성이 없을 때.

    하지만 이런 경우에 `setdefault` 대신에 `defaultdict`를 사용해야 한다.
    (Item 17: Prefer defaultdict Over setdefault to Handle Missing Items in Internal State 참조)

<br>

## Item 17: Prefer `defaultdict` Over `setdefault` to Handle Missing Items in Internal State

### Case 1

- 만약 dictionary가 key의 value 값으로 `set` type을 가지며, 다른 사람이 만든 dictionary에 access 해야 하는 경우

<br>

1. **get method + assignment expression**

    ```python
    fruits = {'Red': {'apple', 'cherry'}, 'Yellow': {'banana'}}

    # Python 3.8
    if (yellow := fruits.get('Yellow')) is None:
        fruits['Yellow'] = yellow = set()

    yellow.add('lemon')

    fruits
    >>> {'Red': {'cherry', 'apple'}, 'Yellow': {'lemon', 'banana'}}
    ```

<br>

2. **setdefault method**

    get을 사용하는 것보다 훨씬 짧은 코드를 쓸 수 있다.

    ```python
    fruits.setdefault('Yellow', set()).add('lemon')
    ```

<br>

### Case 2

- 만약 dictionary가 key의 value 값으로 `set` type을 가지며, dictionary를 생성하는 걸 직접 control 하는 경우

<br>

1. **setdefault + class**

    Item 16에서 언급했듯이, setdefault는 그 이름이 헷갈리게 지어졌고, key값이 있든 없든 새로운 set instance를 생성하기 때문에 비효율적이다.

    ```python
    class Fruits:
        def __init__(self):
            self.data = {}
        def add(self, color, fruit):
            fruit_set = self.data.setdefault(color, set())
            fruit_set.add(fruit)

    fruits = Fruits()
    fruits.add('Yellow', 'lemon')

    fruits.data
    >>> {'Yellow': {'lemon'}}
    ```

<br>

2. **collections.defaultdict**
    - `defaultdict`는 key가 없으면 자동으로 default value를 저장한다.

        따라서, default value를 따로 저장해서 add할 필요없이한번에 가능하게 해준다.

    - `defaultdict(set)`이라고 사용하므로, data dictionary에 있는 key값에 접근하면 항상 set instance가 결과로 나올 것이라는 것을 알 수 있다.
    - setdefault처럼 add method가 호출될 때마다 필요없는 set instance를 생성하지 않아도 된다.

    ```python
    from collections import defaultdict

    class Fruits:
        def __init__(self):
            self.data = defaultdict(set)
        def add(self, color, fruit):
            self.data[color].add(fruit)

    fruits = Fruits()
    fruits.add('Yellow', 'lemon')

    fruits.data
    >>> defaultdict(<class 'set'>, {'Yellow': {'lemon'}})
    ```

<br>

## Item 18: Know How to Construct Key-Dependent Default Values with \__missing__

- `setdefault`가 missing key들을 처리할 때 더 짧은 코드로 사용할 수 있다. (Item 16 참조)  
많은 경우에, collections의 `defaultdict` 가 더 나은 옵션이다.(Item 17 참조)

    하지만, `setdefault`도 `defaultdict`도 맞지 않는 경우가 있다.
    그럴 경우에는 `__missing__`을 사용하라.

<br>

### Case 1. get method + assignment expression

- Assignment expression은 Python 3.8부터 도입되었다. ([Item 10](https://hong-dev.github.io/effective_python/item_8_to_10/) 참조)
- 이 방식으로 사용할 수는 있지만, dictionary에 access 하는 횟수가 많고 구조가 더 복잡하다.

    ```python
    files = {}
    name = 'a.txt'

    if (handle := files.get(name)) is None:
        try:
            handle = open(name, 'a+b')
        except OSError:
            print(f"Can't open file {name}")
            raise
        else:   #handle이 없는 경우
            files[name] = handle

    handle.seek(0)
    file_data = handle.read()
    ```

    >**Python File Handling (open options)**  
    `a` : append 모드 (파일이 존재하지 않으면 생성)  
    `+` : updating 모드 (파일을 읽고 쓰기용으로 열기)  
    `b` : binary 모드

    <br>

    >**OSError**  
    This exception is raised when a system function returns a system-related error, including I/O failures such as “file not found” or “disk full” (not for illegal argument types or other incidental errors).  
    [Ref. Python docs](https://docs.python.org/3/library/exceptions.html#OSError)

    <br>

    >**file.seek(0)**  
    파일의 0(맨처음) 찾기  
    이렇게 하고 read하면 파일을 처음부터 다시 읽기

<br>

### Case 2. setdefault method

- 이 방법은 문제가 아주 많다.
- setdefault의 특성상, name이 dictionary에 이미 존재하더라도 매번 `open` function을 호출한다.  
그러면 같은 program에서 이미 존재하는 open handles와 추가로 생성되는 handle이 충돌을 일으킬 수 있다.
- Exceptions이 open 함수를 호출하면서 생긴 것인지 setdefault의 호출로 인해 생긴 것인지 구별할 수 없을 수도 있다.

    ```python
    files = {}
    name = 'a.txt'

    try:
        handle = files.setdefault(name, open(name, 'a+b'))
    except OSError:
        print(f"Can't open file {name}")
        raise
    else:
        handle.seek(0)
        file_data = handle.read()
    ```

<br>

### Case 3. defaultdict

- 이 방법은 error가 발생한다.
- defaultdict로 pass 되는 function은 arguments가 필요 없어야 한다.

    💡 `dafaultdict(function(params))` 형태로 정의하면, `TypeError: first argument must be callable or None` 발생  
    그래서 이대로 실행하면, open_file는 parameter를 받지못하고 error가 발생한다.

    ```python
    from collections import defaultdict

    def open_file(name):
        try:
            return open(name, 'a+b')
        except OSError:
            print(f"Can't open file {name}")
            raise

    files = defaultdict(open_file)
    name = 'a.txt'
    handle = files[name]

    handle.seek(0)
    file_data = handle.read()

    >>> TypeError: open_file() missing 1 required positional argument: 'name'
    ```

<br>

### Case 4. __missing__

- 다행히 이런 경우는 아주 흔해서 Python에는 또다른 built-in solution이 있다.
- dict type의 subclass를 만들고, missing keys를 처리할 수 있는 `__missing__` method를 구현한다.

    files[name] 으로 dictionary에 access할 때, name key가 없다면, \__missing__ method가 호출된다.  
    이미 key값이 있다면 missing method는 호출되지 않는다. (이것은 `__getattr__`의 작동과 비슷하다. Item 47 참조)

    ```python
    def open_file(name):
        try:
            return open(name, 'a+b')
        except OSError:
            print(f"Can't open file {name}")
            raise

    class Files(dict):
        def __missing__(self, key):
            value = open_file(key)
            self[key] = value
            return value

    files = Files()
    name = 'a.txt'
    handle = files[name]

    handle.seek(0)
    file_data = handle.read()
    ```

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  