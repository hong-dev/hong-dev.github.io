---
title: "Item 1: Know Which Version of Python You’re Using"
date: "2020-08-19T10:12:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 1: Know Which Version of Python You’re Using
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_


# Part 1. Pythonic Thinking

- **The Pythonic style isn’t regimented or enforced by the compiler.**  
  (pythonic style은 compiler에 의해 엄격하게 관리되거나 실행되지 않는다.)

  > ### compile vs interpreter
  compile : 소스 코드를 기계어로 컴파일해서 실행파일을 만들고 실행  
  interpreter : 코드를 한 줄씩 읽으면서 실행
  
  > python은 interpreter 방식의 언어    
  **장점:** 수정이 용이 (컴파일 방식에서는, 수정 사항이 있을 때 소스 코드를 다시 컴파일 해야한다.)  
  **단점:** 실행 속도가 느림 (인터프리터 방식은 실행 시마다 코드를 한 줄씩 기계어로 번역해야 하기 때문)

<br>

- **The Zen of Python**  
`import this`를 하면 easter egg로 `the zen of python`이 나온다.  
:arrow_right: 자세한 내용은 [The Zen of Python](https://hong-dev.github.io/python/the_zen_of_python/)
  ```bash
  # python interpreter를 열어서!
  import this
  ```

<br>

## Item 1: Know Which Version of Python You’re Using (파이썬 버전)

- python 3가 가장 최신 버전이고 python 2는 2020.1.1 이후로 남아있지 않을 것이므로, python 3을 사용하자.
- python version 정보를 확인할 수 있는 방법

  ```bash
  # terminal 창에서
  python --version
  python3 --version

  >> Python 3.7.4
  ```

  ```python
  # python interpreter 창에서
  import sys

  print(sys.version_info)
  sys.version_info(major=3, minor=7, micro=4, releaselevel='final', serial=0)

  print(sys.version)
  3.7.4 (default, Aug 13 2019, 20:35:49)
  ```

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  
  [_컴파일 언어와 비교한 인터프리터 언어_](https://cjh5414.github.io/about-python-and-how-python-works/)