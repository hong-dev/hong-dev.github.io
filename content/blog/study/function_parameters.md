---
title: "[Python] Function Parameters"
date: "2020-02-01T11:12:03.284Z"
template: "post"
draft: false
slug: "python/function_parameters"
category: "python"
tags:
  - "Python"
description: "positional arguments, keyword arguments, default parameter"
socialImage: ""
---


## [함수 호출 시, parameter 값 전달]

### **1. positional arguments**

함수를 사용할 때, 순서를 맞추어서 parameter 값을 전달
```python
def func_name(name, age):
    print(name, age)

func_name("Hong", 20)
```

### 2. keyword arguments

함수를 사용할 때, 순서 대신에 parameter의 이름에 넣는 방식으로 값을 전달

```python
def func_name(name, age):
    print(name, age)

func_name(name="Hong", age=20)
```

### 3. Mixing positional arguments and keyword arguments

* positional과 keyword 두가지 방법을 혼용해서 사용

```python
def func_name(name, age):
    print(name, age)

func_name("Hong", age=20)
```

- 무조건 positional arguments 다음에 keyword arguments가 와야함

#####! keyword arguments가 positional arguments보다 먼저 나오면 다음과 같은 error가 나옴

```python
#SyntaxError: positional argument follows keyword argument

def func_name(name, age):
    print(name, age)

func_name(name="Hong", 20)
```

####parameter가 많을 경우에는?

keyword argument가 맨 뒤에 위치하더라도 다음과 같은 문제가 발생할 수 있다.

#####! positional arguments보다 앞에 있는 keyword argument가 하나라도 있으면 error 발생

```python
#SyntaxError: positional argument follows keyword argument

def func_name(name, age, a, b, c):
    print(name, age, a, b, c)

func_name("Hong", 20, a=30, 40, c=50)
```

! positional arguments에 따라서 name="Hong", age=20, a=30, b=40이라는 값이 할당되는데, 마지막에 keyword argument로 a=50이라는 값을 또 넣으려고 보니, 기존 a값이랑 겹쳐서 error 발생

```python
#TypeError: func_name() got multiple values for argument 'a'

def func_name(name, age, a, b, c):
    print(name, age, a, b, c)

func_name("Hong", 20, 30, 40, a=50)
```

여러개의 keyword arguments가 뒤쪽으로 위치하면서, positional arguments에 영향을 주지 않는다면 OK

```python
#겹쳐서 입력되는 parameter도 없고, keyword arguments가 positional보다 뒤에 위치한다.

def func_name(name, age, a, b, c):
    print(name, age, a, b, c)

func_name("Hong", 20, b=30, c=40, a=50)
```

## [함수 정의 시, parameter에 default 값 입력]

### Parameter Default Value

* 함수의 parameter에 default 값을 정해줄 수 있다.
* Default 값이 정의된 parameter는 함수를 호출할 때 값을 넘기지 않아도, default 값이 자동으로 넘겨진다.

```python
def func_name(name, age=20):
    print(name, age)

func_name("Hong")

#age 값을 할당해주지 않아도 자동으로 default 값인 20이 입력
```

- 단, default 값을 정의하는 parameter가 뒤쪽에 위치해야한다.

#####! default value가 non-default value보다 앞에 있으면, 함수를 정의하는 단계부터 error 발생

```python
#SyntaxError: non-default argument follows default argument

def func_name(name="Hong", age):
    print(name, age)
```

####parameter가 많을 경우에는?

**! non-default value보다 앞에 위치한 default value가 하나라도 있으면 error 발생**

```python
#SyntaxError: non-default argument follows default argument

def func_name(name, age, a, b=20, c):
    print(name, age, a, b, c)
```

### 왜 non-default value를 default value parameter보다 앞에 정의해야 할까?

* 함수를 호출할 때 default value는 값을 생략해도 된다.\
아래의 경우, 함수의 parameter는 5개인데 함수 호출 시 넘겨주는 값은 4개다.\
positional argument 방식으로 값을 넘겨주면, name="Hong", age=20, a="a값"이 넘겨지고, 하나 남는 "b값일까c값일까"는 b값으로 넘겨야할지 알 수가 없다. (b=20라는 default 값은 필수로 넘겨지는 값이 아니기 때문)

```python
#SyntaxError: non-default argument follows default argument

def func_name(name, age, a, b=20, c):
    print(name, age, a, b, c)

func_name("Hong", 20, "a값", "b값일까c값일까")
```

#####함수 호출 시 넘기는 값을 keyword argument 방식으로 넘기면 괜찮을까?

name="Hong", age=20, a="a값"까지 positional argument 방식으로 넘겨주고, c="b값이네요"는 keyword argument 방식으로 넘겨주고, 값이 할당되지 않은 b는 default 값인 20으로 넘겨받으면 clear 할 것 같다. 그런데 결과는 역시 SyntaxError. 왜?

```python
#SyntaxError: non-default argument follows default argument

def func_name(name, age, a, b=20, c):
    print(name, age, a, b, c)

func_name("Hong", 20, "a값", c="b값이네요")
```

####Python은 애초에 함수의 parameter 순서가 정해져 있다.

함수 parameter를 적을 때 규칙을 무시하고 마음대로 적으면 SyntaxError가 뜬다.\
위의 예시들도 모두 python의 parameter 규칙에 반하기 때문에 error가 생겼다.

![function parameter](https://user-images.githubusercontent.com/53142539/77428148-feb98e80-6e1a-11ea-8fe1-05938da49cbc.jpg)



위의 순서에 따라, non-default value(Regular Positional Arguments)가 default value보다 먼저 와야 한다.

```
Reference:
-https://getkt.com/blog/python-keyword-only-arguments/
```