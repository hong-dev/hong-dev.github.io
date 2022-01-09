---
title: "[Python] find longest word"
date: "2020-02-13T09:12:03.284Z"
template: "post"
draft: false
slug: "python/longest_word"
category: "python"
tags:
  - "Python"
description: "주어진 리스트안에 있는 단어중 가장 긴 단어를 찾을수 있도록 함수를 작성하라."
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
주어진 리스트안에 있는 단어중 가장 긴 단어를 찾을수 있도록 함수를 작성하라.
</div>

### My Solution

- 앞뒤 단어의 길이를 비교해서 더 큰 쪽을 longest\_word가 되도록 하면서 for문을 돌렸다.\
그리고 마지막에 longest\_word를 return하는 방식으로 풀었다.

- for문 안에 if가 들어 갈 수 밖에 없는 구조가 되었다.

```python
def find_longest_word(words):
    for index in range(len(words)-1):
        if len(words[index]) > len(words[index+1]):
            longest_word = words[index]
        else:
            longest_word = words[index+1]
    return longest_word
```

### Model Solution

- for문을 돌리면서 단어의 길이와 단어 내용을 tuple로 묶어서 list에 append했다.\
그 뒤 sort()로 오름차순 정렬을 한 뒤에 맨 뒤에 있는 tuple 단어를 return 했다.

- for문 한번으로 처리하였고, 코드의 길이도 짧고 한줄한줄이 늘어지지 않는다.

```python
#model solution

def find_longest_word(words):
    word_len = []
    for n in words:
        word_len.append((len(n), n))
    word_len.sort()
    return word_len[-1][1]
```

### _list.sort()_

- 오름차순 및 내림차순으로 정렬하는 method이다. default는 오름차순
- 따로 변수에 넣지 않는 이상, 실행을 하면 원본 list 자체가 정렬이 된다.

```python
list_name.sort()              #오름차순

list_name.sort(reverse=True)  #내림차순
```
