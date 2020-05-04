---
title: "[CodeKata] 4"
date: "2020-02-22T11:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_4"
category: "python"
tags:
  - "Python"
  - "CodeKata"
description: "'(', ')', '[', ']', '{', '}' 총 6개 종류의 괄호 조합이 조건에 맞는지 확인하기"
socialImage: ""
---

```
'(', ')', '[', ']', '{', '}' 총 6개 종류의 괄호 조합을 string으로 받는다. 
 
1) 한 번 괄호를 시작했으면, 같은 괄호로 끝내야 한다.
2) 괄호 순서가 맞아야 한다.

위의 두 가지 조건을 만족하는지 True/False를 반환하라.
```

### My Solution : Fail

- 괄호의 한 쌍이 각각 같은 개수로 존재하는지 확인한 후, 쌍이 맞으면 닫힌 괄호를 열린 괄호로 바꾼다.
- 함수 안에 함수 2가지를 만든 후, 2가지 중에 하나라도 만족하면 True를 반환한다.\
    1)맨 앞과 맨 뒤에서부터 차례로 안쪽으로 들어오면서 형태가 같은지 확인\
    2)괄호가 앞뒤로 붙어서 형태가 같은지 확인

- **문제점**: '`{{}}[]`' 이런 형태의 괄호들은 함수 2가지의 경우가 섞여 있어서 True로 걸러낼 수 없다.

```python
def is_valid(string):
    if (string.count('(') == string.count(')')) and (string.count('[') == string.count(']')) and (string.count('{') == string.count('}')):
        string = string.replace(')', '(')
        string = string.replace(']', '[')
        string = string.replace('}', '{')
    else:
        return False
    
    def check1(string):
        for i in range(len(string)//2):
            if string[i] != string[-1-i]:
                return False
        return True
    
    
    def check2(string):
        for index, char in enumerate(string[:len(string)-1:2]):
            if char != string[index+1]:
                return False
        return True
    
    return check1(string) or check2(string)
```

### Model Solution

- **주어진 데이터들이 있으면, 그걸 미리 dictionary나 list로 넣어서 활용하기!**
- 빈 리스트를 만들어서, for문으로 열린 괄호들을 차례대로 들어가게 한다.\
    닫힌 괄호가 나오면, 만든 리스트의 마지막 요소를 pop해서 그 값이 같은지 확인한다.

- 마지막에는 만들었던 리스트가 빈 리스트인지 확인하고 True를 반환한다.
- **짝을 맞추는 문제에서는 pop을 활용하는 방법을 생각해보자!**

```python
def is_valid(string):
  left = ['(', '{', '[']
  right = [')', '}', ']']
  stack = []
  for letter in string:
    if letter in left:
      stack.append(letter)
    elif letter in right:
      if len(stack) <= 0:
        return False
      if left.index(stack.pop()) != right.index(letter):
        return False
  return len(stack) == 0
```