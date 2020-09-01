---
title: "f-string `=` (python 3.8)"
date: "2020-09-01T23:12:03.284Z"
template: "post"
draft: false
category: "python"
tags:
  - "Python"
description: "Python 3.8에서 새로 추가된 기능인 f-string의 `=`"
socialImage: ""
---


지난번 python 3.8의 새 기능인 [walrus operator](https://hong-dev.github.io/python/walrus_operator/)에 대해 적었는데,
이번에는 f-string 관련한 새로운 기능이다.


## f'{expr=}'

* 반쪽만 쓴 것 같지만 새로운 기능이라는 것!

* python 3.8 이전 버전에서는 f-string을 사용할 때 할당 받을 변수와 input 변수를 다 적어줘야 한다.

  ```python
  name = 'Hong'
  age = 20

  f'name={name}, age={age}'
  >>> 'name=Hong, age=20'
  ```

  :arrow_right: name과 age가 두번씩 입력이 된다.


<br>
<br>

* `{}` 안에 name과 age가 들어가고 `=`도 같이 붙이면, 중복을 없앨 수 있다.

  ```python
  name = 'Hong'
  age = 20

  f'{name=}, {age=}'
  >>> "name='Hong', age=20"
  ```

  :arrow_right: 결과값이 조금 다르게 나오는 이유는 뭘까.. :thinking:


<br>
<br>

* f-string에서 result 값을 수정하기 위해 사용하는 `:`도 역시 사용 가능하다.

  ```python
  num = 12345.678

  f'num={num:,.2f}'
  >>> 'num=12,345.68'

  f'{num=:,.2f}'
  >>> 'num=12,345.68'
  ```

<br>
<br>

* 수식을 쓰면 계산된 값과 함께 계산식 전체가 보여진다.

  ```python
  f'{3+5=}'
  >>> '3+5=8'
  ```

<br>

### _Reference_
> [_f-strings support = for self-documenting expressions and debugging_](https://docs.python.org/ko/3.8/whatsnew/3.8.html#f-strings-support-for-self-documenting-expressions-and-debugging)