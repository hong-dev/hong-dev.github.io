---
title: "[Python] 두 개의 list element 값 위치 바꾸기"
date: "2020-02-05T11:12:03.284Z"
template: "post"
draft: false
slug: "python/change_list_element_location"
category: "python"
tags:
  - "Python"
description: "주어진 2개의 리스트를 하나의 리스트로 합친 후 리스트의 첫 element와 마지막 element를 서로 바꿔준 후 리스트 전체를 출력하라."
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
주어진 2개의 리스트를 하나의 리스트로 합친 후 리스트의 첫 element와 마지막 element를 서로 바꿔준 후 리스트 전체를 출력하라.
</div>

### My Solution

- 두 개의 리스트를 합쳐준 다음, 첫번째 element를 리스트 마지막에 append 해준다.\
첫번째 element는 뒤에 합쳐진 리스트에 있던 마지막 element로 바꿔준다.\
뒤에 합쳐진 리스트의 마지막 element를 삭제한다.

```python
def merge_and_swap(list1, list2):
  if len(list1) == 0 and len(list2) == 0:
    return []
  else:
    new_list = list1 + list2
    new_list.append(new_list[0])
    new_list[0] = new_list[-2]
    new_list.pop(-2)
    return new_list
```

### **_list.pop(index)_**

- index에 해당하는 element를 삭제한다.
- index 없이 실행하면 list의 가장 마지막 요소를 삭제한다.
- 원본 list 자체가 수정된다.
- list.pop()은 삭제된 element를 return한다.

### Model Solution

- first element와 last element를 변수에 미리 넣어두었다.\
이렇게 하면 추가하고, 바꾸고, 빼는 과정을 줄일 수 있다.

```python
def merge_and_swap(list1, list2):
  list1 = list1 + list2
  
  length = len(list1)
  
  if length > 1:
    first             = list1[0]
    last              = list1[length - 1]
    list1[0]          = last
    list1[length - 1] = first

    return list1
  else:
    return list1
```