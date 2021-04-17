---
title: "Item 4: C-style, str.format(), F-Strings"
date: "2020-08-23T10:12:03.284Z"
template: "post"
draft: false
category: "[Effective Python]"
tags:
  - "Effective Python"
  - "Python"
  - "PEP 8"
description: "
[Part 1] Pythonic Thinking
Item 4: Prefer Interpolated F-Strings Over C-style Format Strings and str.format
"
socialImage: ""
---


> _Effective Python: Second Edition 내용 정리_


## Item 4: Prefer Interpolated F-Strings Over C-style Format Strings and str.format

- **F-Strings를 사용하라!**
- Formatting : 미리 정해져있는 text에 data 값을 결합해서, 사람이 읽을 수 있는 하나의 문자열로 만드는 과정

<br>

## 1. C-style (% formatting operator)

- `%` 의 왼쪽에는 predefined text를, 오른쪽에는 input 값을 적는다.
- `%`를 placeholder가 아니라 문자 그대로 사용하고 싶다면, `%%` 두번 연속으로 적어준다.
- input으로 들어갈 수 있는 것: 하나의 값 or 여러 개 값의 tuple 형태 or 여러 개 값의 dictionary 형태

    ```python
    a = 0b10111011
    b = 0xc5f
    print('Binary is %d, hex is %d' % (a, b))

    >>> Binary is 187, hex is 3167
    ```

<br>

- ### [Problem]
    ### #1.
    input 값은 predefined text에서 정한 type으로 정해져있기 때문에, tuple 형태의 input에서는 순서가 바뀐다면 type conversion incompatibility (타입 변경에 대해 호환이 되지 않음) 때문에 `TypeError` 가 발생할 수 있다.  
    이런 error가 안 생기려면 변경할 때마다 순서를 잘 보고 %의 양쪽이 호환이 잘 되는지 체크해야 하는 불편함이 있다.

    **⇒ Solution** : input 값이 tuple이 아니라 `dictionary` 로 가능하고, 이건 값의 순서에 상관없이 key 값으로 match 되기 때문에  input 값끼리의 순서를 바꾸어도 error가 생기지 않는다.

    ```python
    key = 'age'
    value = 20

    old_way = 'My %s is %d' % (key, value)
    # 이 경우에는 key, value 값의 순서를 바꾸면 error 발생

    new_way = 'My %(key)s is %(value)d' % {'key': key, 'value': value}
    # 이 경우에는 key, value 순서를 바꿔 {'value': value, 'key': key} 라고 넣어도 ok

    >>> 'My age is 20'
    assert old_way == new_way
    ```

    <br>

    ### #2.
    input을 간단한 변수가 아니라 그 변수를 조금 수정시킨 형태로 넣는다면, 한줄이 아니라 여러줄이 될 수 있고 그건 가독성에 좋지 않다.
    
    <br>

    ### #3.
    predefined text에서 같은 변수가 2개 이상 들어가면, 그 숫자만큼 input tuple 값에 반복해서 적어줘야 한다.  
    (predefined text에 들어있는 % 개수와 tuple 안에 들어있는 값들의 개수가 같아야 한다.)  
    만약에 단순한 변수만 넣는게 아니라 변수를 다른 method로 처리해서 넣어야 한다면 (대문자로 변경이라든지), 그걸 똑같이 몇 번이고 적어줘야 해서 매우 성가시고 오류가 나기 쉽다.

    **⇒ Solution** : input 값을 `dictionary`로 입력한다. 그러면 중복 input 값 없이 dictionary에 해당 key 값만 한 번 넣어주면 된다.

    <br>

    ### #4.
    problem #1과 #3의 해결책으로 input 값에 tuple 대신 dictionary를 넣으라고 했는데, dictionary를 사용하는 것은 코드가 길어지고 장황해진다.  
    `key` name과 colon operator(`:`)가 추가로 더 들어가기 때문이다.  
    그리고 dictionary에 들어가는 key 값은 predefined text에도 동일하게 적어줘야 하고, dictionary value에 들어갈 값도 변수로 따로 적어줘야할지 모른다.  
    dictionary의 사용은 단점 #2의 문제를 더 악화시킨다.

    ```python
    name = 'Hong'
    'My name is %(name)s.' % {'name': name}
    # dictionary를 사용하면 `name`을 많이 사용할 수밖에 없다.
    ```

    만약에 dictionary 자체를 다른 변수에 할당하고 predefined text도 따로 변수에 할당한 후, 둘이 합치는 방식이라면 key, value 값이 많을수록 앞 뒤로 왔다갔다 하면서 해석해야 할 것이다. 이렇게 되면 bug 찾기도 힘들고, 가독성도 떨어진다.

<br>


## 2. The `format` Built-in and `str.format`

### `format()` function

```python
format(1234.5678, ',.2f')
>>> '1,234.57'
# `,`는 천 단위 쉼표
# `.2`는 소수점 두자리까지 표시
# 다만, str 형태로 return 된다.

format('my string', '^20s')
>>> '     my string      '
# `^`는 가운데 정렬
# `20`은 총 20칸의 str
```

### `str.format()` method

```python
key = 'age'
value = 20

'My {} is {}'.format(key, value)
>>> 'My age is 20'
```

<br>

- input 값을 그대로 쓰지 않고 customize 하고 싶을 때는, `{ }` 안에 `:` 을 사용하면 된다.

  ```python
  '{:,}'.format(1234567890)
  >>> '1,234,567,890'

  import datetime
  d = datetime.datetime(2020, 8, 23, 12, 9, 58)
  '{:%Y-%m-%d %H:%M:%S}'.format(d)
  >>> '2020-08-23 12:09:58'
  ```

- customize에 대한 자세한 사항은 Python interpreter 창에 help 명령어를 입력하면, 사용할 수 있는 option들과 예시까지 알려준다. 👍

  ```python
  help('FORMATTING')
  ```

<br>

- `{}`를 placeholder가 아니라 문자 그대로 사용하고 싶다면, `{{}}` 라고 적어준다.

<br>

- `{}` 안에 index를 적어서 `.format()` 의 괄호 안에 나열된 input 값의 순서에 따라 사용가능하다.  

  ⇒ 값을 추가하거나 순서를 바꿀 때마다 양쪽이 순서대로 호환되는지 매번 체크할 필요가 없다. (위에서 언급한 **Problem #1 해결**)  

  ⇒ predefined text에서 같은 index를 여러번 반복될 수 있는데, index에 맞는 input은 한번만 적어줘도 된다. (위에서 언급한 **Problem #3 해결**)

<br>

- `{}` 안에서는 dictionary key, list index, Unicode나 repr strings 등을 조합해서 사용할 수 있다.

    ```python
    student = {
    	'name': 'Hong',
    	'age': 15
    }

    'First letter is {student[name][0]!r}'.format(student=student)
    >>> "First letter is 'H'"
    ```

<br>

- formatting 하기 전에 input 값을 수정해서 format 한다면, 여전히 코드는 길어지고 읽기 힘들어질 것이다. (**Problem #2를 해결할 수 없다.**)

<br>

- C-style에서 dictionary를 사용했을 때, key 값들이 불필요하게 반복되는 문제가 있었다. args로 적는 방법은 dictionary를 사용할 때보다 몇 글자는 줄일 수 있겠지만, 매우 미미하여 이 `format` 방법으로도 중복을 크게 줄일 수는 없다. (**Problem #4를 해결할 수 없다.**)

    ```python
    c_style_template = (
      'My name is %(name)s. '
      'My age is %(age)d.'
    )
    >>> c_style_template % {
      'name': 'Hong',
      'age': 15
    }

    format_template = (
      'My name is {name}. '
      'My age is {age}.'
    )

    >>> format_template.format(
      name='Hong',
      age=15
    )
    ```

<br>

## 3. Interpolated Format Strings (f-strings)

- Python 3.6에서는 위의 방식들의 단점들을 한번에 모두 해결하기 위해 f-strings 기능을 추가했다.
- byte string을 적을 때 `b` 를 앞에 붙이거나 raw string을 적을 때 `r`을 붙이는 것처럼, f-string은 predefined text 앞에 `f`를 붙여 작성한다.

<br>

### Problem #1, #2, #4 해결
- predefined text를 작성하고 뒤에 input 값을 따로 붙일 필요없이, placeholder 안에 key값을 그대로 넣으면 되기 때문에 중복을 완전히 없앤다. 값을 변경할 때 placeholder와 input의 순서대로 잘 호환이 되는지 고려하지 않아도 된다.

    ```python
    name = 'Hong'
    age = 15

    f'My name is {name}. My age is {age}.'
    >>> 'My name is Hong. My age is 15.'
    ```

<br>

* placeholder 안에 `:` 을 붙이면, `str.format` method처럼 값을 customize 할 수 있다.

  ```python
  f'My name is {name:<5}. My age is {age!r}.'
  >>> 'My name is Hong . My age is 15.'
  ```

* f-strings는 C-style의 tuple case와 dictionary case, format method의 args case와 keyword case, 모든 경우보다도 가장 짧다.

<br>

### Problem #2 해결
- input 값을 수정해서 formatting 하고 싶을 때, C-style과 format method이 여러줄로 나눠져야 했다면 f-strings는 placeholder 괄호 안에 바로 적용하면 된다. 한줄로 간단하게 끝낼 수 있다.
너무 길어서 한줄로 안 끝난다고 해도, 다른 경우들보다 코드가 훨씬 clear 하다.

<br>

- format specifier options (input 값을 customize 하는 option들) 에 관해서도 `{}`를 사용할 수 있다.

    ```python
    places = 2
    number = 123456.789

    f'The number is {number:,.{places}f}'
    >>> 'The number is 123,456.79'
    ```

<br>

### 결론

- f-strings은 그가 제공하는 표현력, 간결함, 명료함으로 python programmers에게는 최고의 built-in option이다.
- string으로 format 할 일이 있다면 f-strings를 사용하자.

<br>

### _Reference_
> [_Effective Python : Second Edition_](https://effectivepython.com/)  