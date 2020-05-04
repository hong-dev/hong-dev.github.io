---
title: "[Python] 변수명"
date: "2020-01-31T11:12:03.284Z"
template: "post"
draft: false
slug: "python/variables"
category: "python"
tags:
  - "Python"
description: "변수명"
socialImage: ""
---


###변수 이름 시작 글자
* 첫 글자는 알파벳이나 underscore(_)로 시작. 숫자로는 시작 못함

```python
hello   #가능
_hello  #가능
7hello  #불가능
```

###변수에 띄어쓰기가 있으면 안 된다.

* 띄어쓰기 대신에 사용하는 방식이 있는데, 파이썬에서는 snake case를 주로 사용

```python
helloWorld   #camel case. Javascript에서 주로 사용
hello_world  #snake case. Python에서 주로 사용
hello world  #변수에 띄어쓰기가 있으면 안 됨
```

###case sensitive
* 대문자와 소문자가 구분이 된다.

* hello와 hellO는 전혀 다른 변수명이다.