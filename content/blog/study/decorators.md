---
title: "[Python] Decorators"
date: "2020-02-08T11:12:03.284Z"
template: "post"
draft: false
slug: "python/decorators"
category: "python"
tags:
  - "Python"
description: "Decorators"
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
decorator함수의 parameter에 name을 넣어주면, f"Hello, {name}" 과 같이 결과값이 나오도록 decorator 함수 구현하기
</div>

### decorator의 사용방법과 closure의 개념, decorator에 인자가 있을 경우

- decorator 자체에서 함수를 받는 게 아니라 다른 인자를 받을 경우, 함수를 받는 함수를 그 안에 만들어 주어야 한다.

```python
def name_decorator(name):
    def hello(func):
        def third():
            return func() + name
        return third
    return hello


@name_decorator(name='')
def greeting():
    return "Hello, "
```

### 함수를 꼭 또 한번 써야하나?

- decorator 함수 자체가 closer를 이용한 중첩 함수이고 그 틀이 정해져 있다. \
아래의 내용처럼 함수 하나를 안쓰면, decorator의 형태가 아니게 된다.

```python
#TypeError: 'str' object is not callable

def name_decorator(name):
    def hello(func):
        #def third():
                return func() + name
        #return third
    return hello
```