---
title: "Item 18: Know How to Construct Key-Dependent Default Values with __missing__"
date: "2020-09-14T23:12:05.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 2] Lists and Dictionaries
Item 18: Know How to Construct Key-Dependent Default Values with __missing__
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

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