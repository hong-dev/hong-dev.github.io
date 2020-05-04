---
title: "[Python] print() 문자열 출력"
date: "2020-02-02T11:12:03.284Z"
template: "post"
draft: false
slug: "python/strings"
category: "python"
tags:
  - "Python"
description: "print() 문자열 출력, f-string"
socialImage: ""
---


## string concatenation(문자열 더하기)

아래의 3가지는 모두 Hello, world라고 출력된다.

```python
print("Hello, world")
print("Hello,", "world")
print("Hello, " + "world")
```

## literal string interpolation

- 따옴표 앞에 f를 붙이면 f다음에 오는 string 값을 literal string interpolation라고 인지하고 string 안에 있는 변수들을 실제 값으로 치환한다.
- 치환하고 싶은 변수(혹은 함수)는 중괄호{}를 사용해서 표시
- 문자열text가 길고 복잡한 경우에는 위의 + 방식으로 사용하는 것보다 이 방법이 훨씬 편리

```python
print(f"Hello, {name}")

print(f"""Hello, {name}""")   #여러줄 일때
```