---
title: "[Effective Python: Second Edition] Item 2: Follow the PEP 8 Style Guide"
date: "2020-08-19T10:12:04.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 2: Follow the PEP 8 Style Guide
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 2: Follow the PEP 8 Style Guide

- Python Enhancement Proposal #8 (PEP 8)은 python code의 format에 대한 가이드를 준다.
- python code 작성에 대한 style guide를 잘 지키면, 다른 사람들과의 협업에 도움이 되고, 작성한 코드를 나중에 수정하기도 쉽다.
- 가이드 전체 내용을 보려면 [PEP 8 online site](https://www.python.org/dev/peps/pep-0008/)로 이동
- [Pylint tool](https://www.pylint.org/)은 PEP 8 style guide를 기본으로 다른 에러들도 자동으로 잡아내준다.  
IDE나 editor들도 linting tool이나 비슷한 plug-in들을 제공한다.

<br>

### Whitespace (공백)

* Tab 대신에 Four Spaces (스페이스 4번) 사용
2. 각 줄은 79자 이하로 작성
3. 다음 줄로 넘어가게 될 때에는 그들의 기본 들여쓰기에서 4개의 space를 더 들여쓰기
4. File 안에서, function과 class 사이는 2줄씩 띄어쓰기
5. Class 안에서, 각 method 사이는 한 줄씩 띄어쓰기
6. Dictionary의 띄어쓰기는, `key: value` 형식 (key와 colon은 붙이고, value 앞은 한 칸 띄어쓰기)
7. Variable assignment 할 때,  `= operator` 앞뒤로는 한칸씩 띄어쓴다. (`a = 2`)
8. Type annotation(타입에 관해 주석을 달 때에는), `name: type` 형식

<br>

### Naming

*  Function(함수), Variable(변수), Attribute(속성) : `lowercase_underscore` (모두 소문자로 작성하고, 단어 사이는 underscore)
2. **Protected** instance attributes : `_leading_underscore` (맨 앞에 underscore 1개 붙이기)
3. **Private** instance attributes: `__double_leading_underscore` (맨 앞에 underscore 2개 붙이기)
4. Class (exceptions도 해당) : `CapitalizedWord`
5. Module-level constants (모듈 수준의 상수) : `ALL_CAPS`
6. Class의 Instance method는 first parameter로 `self` 를 사용 (self는 해당 instance object를 뜻한다)
7. Class method는 first parameter로 `cls` 를 사용 (cls는 해당 class를 뜻한다)

  > ### Protected vs Private  
  protected(`_name`): 부모 class와 상속받은 자식 class에서만 사용 가능하고, class 외부에서는 접근하지 못하는 attributes  
  private(`__name`): 해당하는 class 내부에서만 사용 가능. 자식 class 및 외부 접근 불가

<br>

### Expressions and Statements

* 긍정의 부정(`if not a is b`) 보다는, Inline negation (`if a is not b`)을 사용한다.    
`~a == b` 말고 `a != b`
2. `[]` 나 `''` 와 같은 빈 값을 체크할 때, 길이를 비교(`if len(somelist) == 0`) 하지 말고, `if not somelist` 와 같이 사용한다.  
(빈 값은 `False` 로 처리하기 때문. 빈 값이 아닌 list는 `if somelist` 를 했을 때, `True`로 처리된다.)
3. `if` statements, `for` and `while` loops, `except` compound statements 를 한줄에 쓰지말고, 여러줄로 명확하게 적는다.
4. 한 줄에 다 못 쓰겠으면, parentheses(괄호)를 사용해서 줄을 나누고, indentation도 적용한다.
5. `\` 를 사용해서 줄을 연결하는 것보다, `parentheses(괄호)` 를 사용해서 여러줄로 표현하는 것을 선호한다.

<br>

### Imports

* `import` 는 항상 파일의 맨 위에 적는다.
2. 현재의 module에 대한 상대적인 import가 아니라, module의 절대적인 경로와 name을 적는다.  
`from bar import foo` (O)  
`import foo` (X)
3. 상대적인 import를 꼭 해야한다면, `from . import foo` 와 같이 명확하게 적는다.
4. import를 할 때는 다음과 같은 순서대로 section을 구분해 import 한다. 각 section은 알파벳 순서대로 import 한다.
    - standard library modules
    - third-party modules (내가 만든 것도, python을 만든 사람이 만든 것도 아닌 module)
    - your own modules

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  