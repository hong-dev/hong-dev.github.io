---
title: "[Effective Python: Second Edition] Item 9: Avoid else Blocks After for and while Loops"
date: "2020-08-29T23:12:04.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 9: Avoid else Blocks After for and while Loops
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 9: Avoid else Blocks After for and while Loops

- Python에는 대부분의 다른 프로그램 언어에서는 가능하지 않은 추가 기능이 있다:  
반복문의 block 직후에 `else` block을 사용할 수 있다.
- 반복문(for loop, while loop) 뒤에 오는 `else` block은 반복문 안에서 `break`를 만나지 않는다면 실행된다.  
(반복문 안에서 break가 실행되면, else는 실행되지 않는다.)
- 우리가 보통 사용하는 `else`는, 앞의 block이 실행되지 않을 경우 else block을 실행하라 라는 의미로 이해한다.  
반복문 뒤의 else는 그런 의미가 아니기 때문에, 헷갈릴 수 있고 이게 무슨 역할인지 이름만 봐서는 알기 어려우므로 사용하지 말자.

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  