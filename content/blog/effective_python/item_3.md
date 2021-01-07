---
title: "[Effective Python: Second Edition] Item 3: Know the Differences Between bytes and str"
date: "2020-08-19T10:12:05.284Z"
template: "post"
draft: false
category: "book"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 3: Know the Differences Between bytes and str
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_

## Item 3: Know the Differences Between bytes and str

- Python에서 character sequence를 나타내는 방식 : `bytes` (8-bit values), `str` (Unicode code points)
- `Encode` : Unicode data ⇒ Binary data  
`Decode` : Binary data ⇒ Unicode data
- 어떤 encoding을 사용할 것인지 명시할 수 있는데, 보통 default는 `UTF-8`

    ```python
    bytes_ins.decode('utf-8')
    str_ins.encode('utf-8')
    ```

<br>

- 함수를 사용해서 input의 character sequence type을 확실히 하자.
- system의 default text encoding을 조심하자. 잘 모른다면, encoding parameter를 확실하게 넣어주자.

    ```python
    # default text encoding 찾기
    import locale
    print(locale.getpreferredencoding())
    ```

<br>

* **Unicode sandwich :**  
  bytes는 밖에 두고 안에서는 str만 사용할 수 있도록, encoding과 decoding은 interface의 경계에서 이루어질 수 있도록 한다.

<br>

- bytes(`b'hello'`)와 str(`hello`)은 `>, ==, +, %` 등의 operator에서 같이 사용될 수 없다. (서로 대체될 수 없음)
- **`%s`의 활용**

    ```python
    b'red %s' % 'blue'
    >> TypeError

    'red %s' % b'blue'
    >> red b'blue'
    # 예상한 return 값은 아니지만 위의 코드가 가능한 이유는,
    # `__repr__` method를 호출하기 때문 (자세한 내용은 Item 75 참조)
    ```

<br>

- **`with open` statement**  
    기본적으로 file handles operation은 Unicode strings이 default로 요구되는 것이고, binary를 사용하려면 말을 해줘야한다.

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

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  