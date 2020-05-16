---
title: "list 간의 차집합"
date: "2020-04-07T11:12:03.284Z"
template: "post"
draft: false
slug: "counter"
category: "algorithm"
tags:
  - "Python"
  - "Algorithm"
  - "Collections"
  - "Counter"
  - "List"
description: "2가지 list의 차집합 구하기 (겹치지 않는 하나의 값 구하기)"
socialImage: ""
---


```
참가자(participant) 중에서 완주하지 못한 사람은 1명이다.
참가자끼리는 이름이 같은 사람이 있을 수 있다.
완주하지 못한 사람(completion 명단에 없는 사람)을 찾아라. 
```

### Solution 1 : Fail
* 집합 연산을 쉽게 할 수 있는 set을 사용할 수 있지 않을까?\
[Set 집합 연산 사용하기](hong-dev.github.io/posts/python/set)
* case\_1이든 case_2든 각각의 list를 set으로 만들어준다음 연산을 해야하는데, 여기에서는 이름이 같은 참가자들이 있으므로 set을 씌우면 중복값이 사라져서 의미가 없다.

```python
def solution(participant, completion):
    set(participant) - set(completion) #case_1

    set.symmetric_difference(set(participant),set(completion))) #case_2
```

### Solution 2
* participant와 completion 각각의 list를 sort해서 순서를 맞춘 다음, element를 순서대로 비교하면서 다르면 해당 값을 return 한다.

```python
def solution(participant, completion):
    participant.sort()
    completion.sort()
    answer = ""
    for i in range(0, len(completion)):
        if participant[i] !=  completion[i]:
            answer = participant[i]
            break
    return answer
```

### collections.Counter()

* list의 각 element들의 개수를 `{element : count}` 형태의 dictionary로 만든다.
```python
Counter({'mislav': 1})
```

* Counter 객체끼리 빼면(-) 객체 간의 차집합만 남는다.

* Counter.keys(), values(), items()를 하면 아래의 값처럼 return 되어 그 값을 바로 쓸 수 있는 것이 아니다.\
list를 씌우면 앞 부분이 사라지고 ()안에 있는 list만 남는다.
```python
dict_keys(['mislav'])
dict_values([1])
dict_items([('mislav', 1)])
```

### Model Solution
```python
import collections

def solution(participant, completion):
    answer = collections.Counter(participant) - collections.Counter(completion)
    return list(answer.keys())[0]
```


* Reference: [프로그래머스 코딩테스트 연습](https://programmers.co.kr/learn/challenges)