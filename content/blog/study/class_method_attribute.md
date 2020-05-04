---
title: "[Python] Class method, attribute 만들기"
date: "2020-02-10T11:12:03.284Z"
template: "post"
draft: false
slug: "python/class_method_attribute"
category: "python"
tags:
  - "Python"
description: "Class에 data들을 insert, select, update, delete하는 method 만들기"
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
Class에 data들을 insert, select, update, delete하는 method 만들기
</div>

* delete method는 정상 작동하는데, 나머지 method들이 계속 에러가 났다.\
문제는, dictionary에 해당 요소가 없어서 None이 return 되어야 하는데, 내 코드에서는 자꾸 유효한 값이 return되는 것이다.\
delete가 잘 작동되는데 요소가 안 사라지고 남아있을 수가 있나?\
알고보니 delete가 문제가 아니라 insert였던 것. 값이 안 사라진 게 아니라 아예 들어가지를 않았던 것이다. 이걸 왜 생각을 전혀 못 했는지..

- dictionary의 총 size가 Database class의 size 속성보다 크면 더이상 새로운 값들이 못들어온다.\
그래서 말 그대로 len(Database.dict_data) > self.size 라고 적었는데, 생각해보면 두 개의 size가 같아도 더이상 못들어온다.

##### 해당 상황이 발생할 수 있는 모든 경우의 수를 생각하자!!

```python
class Database:
    def __init__(self, name, size):
        self.name = name
        self.size = size

    dict_data = {}  #1)생각해보니 이건 완전 잘못된 선택이었다.
    def insert(self, field, value):
        if len(Database.dict_data) >= self.size:  #요녀석이 문제였다. 크거나 같을 때.
            pass  #2)웬만하면 pass를 안쓰고 뒤집어 생각하자.
        else:
            Database.dict_data[field] = value
        
    def select(self, field):
        if field not in Database.dict_data:
            return None
        else:
            return Database.dict_data[field]
    
    def update(self, field, value):
        if field not in Database.dict_data:
            pass
        else:
            Database.dict_data[field] = value
        
    def delete(self, field):
        if field not in Database.dict_data:
            pass
        else:
            del Database.dict_data[field]
```   

<p>

**Model solution과 비교했을 때, 내 코드의 문제점과 좀 더 깔끔한 코드를 위해 정리를 해보자면:**

1. data를 모아두는 dictionary(dict_data)를 어디에다가 넣어야 하나 고민을 했었다.\
class 밖인가(global scope), class 안인가, \__init__ 안에 attribute로 넣을까. class 안에 일반 변수로 넣어두었는데, 지금 쓰면서 생각해보니까 완전 잘못 짚었다.

    dict\_data는 모든 class의 instance가 공유한다. 즉, instance가 하나라면 dict\_data를 독점하겠지만, 여러 개의 instance가 있다면 각각의 instance에서 method를 실행하면 같은 dict\_data의 요소들이 움직인다. 아주 큰 에러다.

**각각의 instance가 고유한 dictionary를 가지기 위해서는, instance가 생성될 때 자동으로 넘겨받는 \_\_init__ 속성에 self.dict_data 형태로 입력한다.**


2. 문자 그대로 적용하다보니, 아무것도 발생하지 않을 때는 pass를 전부 적어주었다.\
사실 pass가 들어가게 if-else를 사용하지말고, else에 들어갈 조건을 if에 적기만 하면 된다.


**문자 그대로 코드를 옮기는 게 중요한 게 아니라, 쓸모없는 코드가 있지는 않은지 생각하고 또 생각하자!**

```python
#정리된 코드

class Database:
    def __init__(self, name, size):
        self.name = name
        self.size = size
        self.dict_data = {}

    def insert(self, field, value):
        if len(self.dict_data) < self.size:
            self.dict_data[field] = value           
        
    def select(self, field):
        if field not in self.dict_data:
            return None
        else:
            return self.dict_data[field]
    
    def update(self, field, value):
        if field in self.dict_data:
            self.dict_data[field] = value         
        
    def delete(self, field):
        if field in self.dict_data:
            del self.dict_data[field]
```