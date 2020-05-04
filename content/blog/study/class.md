---
title: "[Python] Class"
date: "2020-02-09T11:12:03.284Z"
template: "post"
draft: false
slug: "python/class"
category: "python"
tags:
  - "Python"
description: "Class"
socialImage: ""
---



- class 없이도 코드 구현은 가능하지만, 코드의 구조를 더 효과적으로 구현하기 위해 사용
- **object oriented programming(객체 지향 프로그래밍);** 코드를 클래스 위주로 작성

- class 이름은 첫글자로 대문자를 사용한다.
- 한 단어 이상으로 만들고 싶다면, underscore 사용(snake case)이 아닌 camel case방식으로 naming 한다.

- class 안에서 정의해주는 함수는 function이라고 하지 않고 method라고 한다.

- 앞뒤로 밑줄 2개가 있는 method는 special method라고 한다.


###\__init__
* class가 실체화 될 때 자동으로 호출된다.

* 항상 정의되어야 하며, 맨 처음 parameter로 정의되어야 한다. (python이 자동으로 넘길 수 있도록)

* self는 class가 아니라 class의 실체(instance)인 객체(object)를 가르킨다.

* class가 실체화 될 때 해당 객체(self)를 자동으로 \__init__ 함수에 넘겨준다.

**attribute(속성); 명사\
method; 동사**

```python
class Car:
    def __init__(self, model, color):  #attribute
        self.model = model
        self.color = color
    def honk(self):  #method
        return "빵빵"

car1 = Car("model_name", "yellow")
car1.honk()
```