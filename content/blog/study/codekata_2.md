---
title: "[CodeKata] 2"
date: "2020-02-13T18:12:03.284Z"
template: "post"
draft: false
slug: "python/codekata_2"
category: "python"
tags:
  - "Python"
  - "CodeKata"
description: "숫자인 num을 인자로 넘겨주면, 뒤집은 모양이 num과 똑같은지 True/False로 반환하라."
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
숫자인 num을 인자로 넘겨주면, 뒤집은 모양이 num과 똑같은지 True/False로 반환하라.
</div>

###My Solution1
* python list slicing : `list[start_index:end_index:step]`
* 받은 숫자를 string으로 바꿔서, slicing을 활용하여 거꾸로 나열한 후 비교한다.

```python
def same_reverse(num):
    return str(num)[::-1] == str(num)
```

###My Solution2
* for문도 써보기로 했다.
* 빈 list를 만들고, string화 된 num 값을 하나씩 돌려서 맨 앞부분에 insert 한다.\
list를 join method로 string으로 변환한 후 비교한다.


####*list.insert(index, element)*
list에 element를 추가하고 싶을 때, 넣고 싶은 자리의 index를 적고, 값을 넣는다.

####*'between'.join(list)*
list의 element들을 차례대로 붙여서 string을 만든다.\
element 사이사이에 넣고 싶은 값을 앞에 붙이면 element 사이를 구분할 수 있다.\
`''.join(list)` : 공백 없이 차례대로 붙인다.

```python
def same_reverse(num):
    reversed_num = []
    for value in str(num):
      reversed_num.insert(0, value)
    if ''.join(reversed_num) == str(num):
      return True
    return False
```

###Model Solution
* for문을 돌릴 때 string화 된 num 길이의 반만큼만 돌린다.\
맨 앞과 맨 뒤부터 차례대로 안쪽으로 들어오면서 비교한다.

```python
def same_reverse(num):
  	num =str(num)
   	is_palindrome = True
   	for i in range(len(num) // 2):
   		if num[i] != num[-1 - i]:
   			is_palindrome = False
    			
   	return is_palindrome
```