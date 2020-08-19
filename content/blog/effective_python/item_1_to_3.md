---
title: "[Effective Python] Item 1 ~ Item 3"
date: "2020-08-19T10:12:03.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "Effective Python"
socialImage: ""
---


# 1. Pythonic Thinking

- The Pythonic style isn’t regimented or enforced by the compiler.

    (pythonic style은 compiler에 의해 엄격하게 관리되거나 실행되지 않는다.)


- The Zen of Python

## Item 1: Know Which Version of Python You’re Using (파이썬 버전)

- python 3가 가장 최신 버전이고 python 2는 2020.1.1 이후로 남아있지 않을 것이므로, python 3을 사용하자.
- python version 정보를 확인할 수 있는 방법

```bash
python --version
python3 --version

>> Python 3.7.4
```

```python
import sys

print(sys.version_info)
sys.version_info(major=3, minor=7, micro=4, releaselevel='final', serial=0)

print(sys.version)
3.7.4 (default, Aug 13 2019, 20:35:49)
```

## Item 2: Follow the PEP 8 Style Guide

- Python Enhancement Proposal #8 (PEP 8)은 python code의 format에 대한 가이드를 준다.
- python code 작성에 대한 style guide를 잘 지키면, 다른 사람들과의 협업에 도움이 되고, 작성한 코드를 나중에 수정하기도 쉽다.
- 가이드 전체 내용을 보려면 online site로 이동 ([https://www.python.org/dev/peps/pep-0008/](https://www.python.org/dev/peps/pep-0008/))
- Pylint tool ([https://www.pylint.org](https://www.pylint.org/))은 PEP 8 style guide와 다른 에러들을 자동으로 잡아내준다.  
IDE나 editor들도 linting tool이나 비슷한 plug-in들을 제공한다.

### Whitespace (공백)

1. Tab 대신에 Four Spaces (스페이스 4번) 사용
2. 각 줄은 79자 이하로 작성
3. 다음 줄로 넘어가게 될 때에는 그들의 기본 들여쓰기에서 4개의 space를 더 들여쓰기
4. File 안에서, function과 class 사이는 2줄씩 띄어쓰기
5. Class 안에서, 각 method 사이는 한 줄씩 띄어쓰기
6. Dictionary의 띄어쓰기는, `key: value` 형식 (key와 colon은 붙이고, value 앞은 한 칸 띄어쓰기)
7. Variable assignment 할 때,  `= operator` 앞뒤로는 한칸씩 띄어쓴다. (`a = 2`)
8. Type annotation(타입에 관해 주석을 달 때에는), `name: type` 형식

### Naming

1. Function(함수), Variable(변수), Attribute(속성) : `lowercase_underscore` (모두 소문자로 작성하고, 단어 사이는 underscore로 연결)
2. Protected instance attributes : `_leading_underscore` (맨 앞에 underscore 1개 붙이기)
3. Private instance attributes: `__double_leading_underscore` (맨 앞에 underscore 2개 붙이기)
4. Class (exceptions도 해당) : `CapitalizedWord`
5. Module-level constants (모듈 수준의 상수) : `ALL_CAPS`
6. Class의 Instance method는 first parameter로 `self` 를 사용 (self는 해당 instance object를 뜻한다)
7. Class method는 first parameter로 `cls` 를 사용 (cls는 해당 class를 뜻한다)

Protected vs Private
protected(`_name`): 부모 class와 상속받은 자식 class에서만 사용 가능하고, class 외부에서는 접근하지 못하는 attributes
private(`__name`): 해당하는 class 내부에서만 사용 가능. 자식 class 및 외부 접근 불가

### Expressions and Statements

1. 긍정의 부정(`if not a is b`) 보다는, Inline negation (`if a is not b`)을 사용한다.
if not os.path.exists(...):
if os.path.doesnt_exitsts(...):
a != b 를 해야지 ~a == b하면 안 된다
2. `[]` 나 `''` 와 같은 빈 값을 체크할 때, 길이를 비교(`if len(somelist) == 0`) 하지 말고, `if not somelist` 와 같이 사용한다.
(빈 값은 `False` 로 처리하기 때문. 빈 값이 아닌 list는 `if somelist` 를 했을 때, `True`로 처리된다.)
3. Avoid single-line `if` statements, `for` and `while` loops, and `except` compound statements. Spread these over multiple lines for clarity.
4. 한 줄에 다 못 쓰겠으면, parentheses(괄호)를 사용해서 줄을 나누고, indentation도 적용한다.
5. `\` 를 사용해서 줄을 연결하는 것보다, `parentheses(괄호)` 를 사용해서 여러줄로 표현하는 것을 선호한다.

### Imports

1. `import` 는 항상 파일의 맨 위에 적는다.
2. 현재의 module에 대한 상대적인 import가 아니라, module의 절대적인 경로와 name을 적는다.
`from bar import foo` (O)
`import foo` (X)
3. 상대적인 import를 꼭 해야한다면, `from . import foo` 와 같이 명확하게 적는다.
4. import를 할 때는 다음과 같은 순서대로 section을 구분해 import 한다. 각 section은 알파벳 순서대로 import 한다.
- standard library modules
- third-party modules (내가 만든 것도, python을 만든 사람이 만든 것도 아닌 module)
- your own modules

## Item 3: Know the Differences Between bytes and str (bytes vs str)

- Python에서 character sequence를 나타내는 방식 : `bytes` (8-bit values), `str` (Unicode code points)
- `Encode` : Unicode data ⇒ Binary data
`Decode` : Binary data ⇒ Unicode data
- 어떤 encoding을 사용할 것인지 명시할 수 있는데, 보통 default는 `UTF-8`

    ```python
    bytes_ins.decode('utf-8')
    str_ins.encode('utf-8')
    ```

- 함수를 사용해서 input의 character sequence type을 확실히 하자.
- system의 default text encoding을 조심하자. 잘 모른다면, encoding parameter를 확실하게 넣어주자.

    ```python
    # default text encoding 찾기
    import locale
    print(locale.getpreferredencoding())
    ```

### Unicode sandwich

- bytes는 밖에 두고 안에서는 str만 사용할 수 있도록, encoding과 decoding은 interface의 경계에서 이루어질 수 있도록 한다.

- bytes(`b'hello'`)와 str(`hello`)은 `>, ==, +, %` 등의 operator에서 같이 사용될 수 없다. (서로 대체될 수 없음)
- `%s`의 활용

    ```python
    b'red %s' % 'blue'
    >> TypeError

    'red %s' % b'blue'
    >> red b'blue'
    # 예상한 return 값은 아니지만 위의 코드가 가능한 이유는,
    # `__repr__` method를 호출하기 때문 (자세한 내용은 Item 75 참조)
    ```

- `with open` statement
    - 기본적으로 file handles operation은 Unicode strings이 default로 요구되는 것이고, binary를 사용하려면 말을 해줘야한다.

    ```python
    with open('data.bin', 'w') as f:
    	f.write(b'\xf1\xf2')
    >> TypeError
    # 'w'(write text mode) 대신에 'wb'(write binary mode)로 적어줘야한다.

    with open('data.bin', 'r') as f:
    	data = f.read()
    >> UnicodeDecodeError: 'utf-8' codec can't decode byte 0xf1 in ...
    # binary data는 읽을 때도 'r'이 아닌 'rb'로 읽어와야한다.
    ```