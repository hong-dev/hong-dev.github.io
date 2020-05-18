---
title: "[Codekata] 3"
date: "2020-02-17T11:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_3"
category: "algorithm"
tags:
  - "Python"
  - "CodeKata"
description: "로마자를 숫자로 바꾸기"
socialImage: ""
---



```
Q: 로마자를 숫자로 바꾸기
```

### My Solution

- 한글자로 의미가 있는 문자열들과, 두개가 합쳐졌을 때 다른 의미를 가지는 문자열들을 따로 dictionary로 만들었다.
- 두글자의 문자열들을 먼저 치환하고, 한글자 문자열들을 치환하여 값을 도출했다.
- 한번에 두가지를 동시에 하지는 못하고, for문을 2번 돌릴 수 밖에 없었다.

```python
def roman_to_num(string):
    string_dict = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    string_dict2 = {'IV' : 4, 'IX' : 9, 'XL' : 40, 'XC' : 90, 'CD' : 400, 'CM' : 900}
    
    result = 0
    new_string = string

    for index in range(len(string)-1):
        str_sub = string[index] + string[index + 1]
        if str_sub in string_dict2.keys():
            result += string_dict2[str_sub]
            new_string = new_string.replace(str_sub, '')

    for value in new_string:
        if value in string_dict.keys():
            result += string_dict[value]
        
    return result
```

### Model Solution

- 함수 안에 함수가 또 돌아가게 만들어서 for문 대신 활용하였다!
- 문자를 앞에서부터 2개씩 끊어서 해당하면 치환하고, 그 다음 문자열부터 같은 함수에 넣어서 return
- 2개씩 끊은 문자열이 해당되지 않는다면, 1개의 문자를 치환하고 그 다음 문자열부터 함수에 넣어서 return

<p>

전혀 생각지도 못한 solution이었다.\
**함수 안에 함수를 또 실행**시킨다는 생각을 왜 못 했을까?!

```python
numbers = {
        "I" : 1,
        "IV" : 4,
        "V" : 5,
        "IX" : 9,
        "X" : 10,
        "XL" : 40,
        "L" : 50,
        "XC" : 90,
        "C" : 100,
        "CD" : 400,
        "D" : 500,
        "CM" : 900,
        "M" : 1000,
    }
def roman_to_num(string):
    if not string:
        return 0
    if numbers.get(s[:2]):
        return numbers.get(s[:2]) + roman_to_num(s[2:])
    return  numbers.get(s[:1]) + roman_to_num(s[1:])
```

<p>

    Reference:
    wecode codekata day6