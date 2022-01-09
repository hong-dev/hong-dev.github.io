---
title: "[CodeKata] 6"
date: "2020-02-20T11:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_6"
category: "algorithm"
tags:
  - "Python"
  - "CodeKata"
description: "string으로 받은 두 개의 복소수(complex number)를 곱해서 string으로 반환하라."
socialImage: ""
---


```
string으로 받은 복소수(complex number) 2개를 곱해서 string으로 반환하라.
input은 항상 a+bi 형태이며, output도 a+bi 형태로 나와야 한다.
```

## My Solution
* Python에서는 허수를 `i`가 아닌 `j`로 표현한다.\
그래서 i를 j로 바꿔준 뒤, `complex()` 함수로 복소수로 변환한다.
* 복소수끼리 계산을 한 후, string으로 변환해서 i와 괄호를 `replace()`로 변환해서 return 한다.

### _complex( )_
* `complex('1+j')`: string 형태의 복소수를 넣으면 복소수 type으로 변환한다.
* `complex(1, 3)` : 숫자 2개를 넣으면 (1+3j)의 복소수 형태로 변환한다. 

```python
def complexNumberMultiply(a, b):
    a = complex(a.replace('i', 'j').replace('+-', '-'))
    b = complex(b.replace('i', 'j').replace('+-', '-'))

    multiple = str(a * b)
    multiple = multiple.replace('j', 'i').replace('(','').replace(')','')
    if (a*b).real == 0:
        multiple = '0+' + multiple
    
    return multiple
```

## Model Solution 1
* 복소수 안에 있는 숫자들만 분리해서 각각을 계산한 후 다시 i를 붙여주는 방식

```python
def complexNumberMultiply(a, b):
  firstArr = a[:-1].split('+')
  a1 = int(firstArr[0])
  a2 = int(firstArr[1])

  secondArr = b[:-1].split('+')
  b1 = int(secondArr[0])
  b2 = int(secondArr[1])
  
  return f'{a1 * b1 - a2 * b2}+{a1 * b2 + a2 * b1}i'
```

## Model Solution 2
* `map()`을 사용하여 각각의 변수에 unpack 한다.
* return 할 때는 `%d`를 활용하여 대입하는 방식으로 return 한다.

```python
def complexNumberMultiply2(a, b):
  a1, a2 = map(int, a[:-1].split('+'))
  b1, b2 = map(int, b[:-1].split('+'))
  return '%d+%di' % (a1 * b1 - a2 * b2, a1 * b2 + a2 * b1)
```

