---
title: "[Python] Delete elements from list"
date: "2020-02-04T11:12:03.284Z"
template: "post"
draft: false
slug: "python/list_delete"
category: "python"
tags:
  - "Python"
description: "List에 element 삭제하기"
socialImage: ""
---


- list의 기본 형식; [element, element, ...]
- list()를 써서 list 만들 수 있다.
- mutable; 원본 list를 변경, 수정, 추가가 가능하다.

## 1) del

```python
list1 = [1, 2, 3, 4]
del list1[2]

# list1 = [1, 2, 4]
```

## 2) remove

```python
list1 = [1, 2, 3, 4]
list1.remove(3)

# list1 = [1, 2, 4]
```