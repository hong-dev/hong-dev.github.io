---
title: "Item 5: Write Helper Functions Instead of Complex Expressions"
date: "2020-08-24T10:12:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 5: Write Helper Functions Instead of Complex Expressions
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 5: Write Helper Functions Instead of Complex Expressions

- Python 문법에서는 지나치게 복잡하고 읽기 어려운 single-line 표현식이 만들어지기 쉽다.

- 한문장으로 만들겠다고 함수 안의 함수 안의 메소드로 연결하거나, `or` `and` operator를 사용하는 등의 복잡한 표현식을 만들지 말자.
- if/else 문도 한문장에 이어서 쓰는 것보다 여러 줄에 걸쳐서 쓰는 것이 더 clear하다.
- 2번 이상 반복적으로 사용될 표현식이라면 helper function을 만들어 사용한다.

- 표현식이 복잡해지면, 이걸 작에 쪼개고 logic은 helper function에 넣는 것을 고려하자.
- **가독성에서 얻을 수 있는 것은 간결성에서 얻는 것보다 항상 더 크다. (간결성 < 가독성)**  
복잡한 표현에 대한 간결하고 함축적인 표현이 당신을 이런 혼란에 빠뜨리지 않도록 하라.
- Follow the `DRY principle`: Don't repeat yourself.

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  