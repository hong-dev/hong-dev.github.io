---
title: "[Python] Add elements to list"
date: "2020-02-03T11:12:03.284Z"
template: "post"
draft: false
slug: "python/list_add"
category: "python"
tags:
  - "Python"
description: "List에 element 추가하기"
socialImage: ""
---


- list의 기본 형식; [element, element, ...]
- list()를 써서 list 만들 수 있다.
- mutable; 원본 list를 변경, 수정, 추가가 가능하다.

## 1) append

```python
num1 = [1, 2, 3, 4]
num1.append(5) 

# num1 = [1, 2, 3, 4, 5]
```

## 2) +

*  이 방법을 사용할 때는 square brackets([])를 사용하려 리스트의 형태로 만든 후 추가해야한다. 아니면 TypeError 발생

*  합한 값들을 다시 저장하고자 하는 변수에 할당해줘야 한다. +는 기존의 list가 수정되지 않고 새로운 list가 생성되기 때문

```python
num1 = [1, 2, 3, 4]
num1 = num1 + [5, 6, 7]

# num1 = [1, 2, 3, 4, 5, 6, 7]
```

## 3) insert

**_list이름.insert(삽입할 위치(index), 삽입할 값)_**

insert의 특성상 중간에 얼마든지 element를 삽입 가능하다.

```python
num1 = [1, 2, 3, 4]
num1.insert(1, "add")

# num1 = [1, 'add', 2, 3, 4]
```