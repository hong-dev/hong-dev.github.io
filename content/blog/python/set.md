---
title: "Set Operation"
date: "2020-04-08T11:12:03.284Z"
template: "post"
draft: false
category: "python"
tags:
  - "Python"
  - "Set"
description: "set 집합 연산 : union, intersection, difference, symmetric_difference"
socialImage: ""
---




### 1. 합집합(union)
* **set.union(set1, set2)**
* **set1 | set2**

```python
set1 = {1,2,3,4}
set2 = {3,4,5,6}

set1 | set2
=> {1,2,3,4,5,6}
```


### 2. 교집합(intersection)
* **set.intersection(set1, set2)**
* **set1 & set2**

```python
set1 = {1,2,3,4}
set2 = {3,4,5,6}

set1 & set2
=> {3,4}
```

### 3. 차집합(difference)
* **set.difference(set1, set2)**\
* **set1 - set2**

```python
set1 = {1,2,3,4}
set2 = {3,4,5,6}

set1 - set2
=> {1,2}
```



### 4. 대칭차집합(symmetric difference)
* **set.symmetric_difference(set1, set2)**\
* **set1 ^ set2**

```python
set1 = {1,2,3,4}
set2 = {3,4,5,6}

set1 ^ set2
=> {1,2,5,6}
```

<br>
<br>

* Reference: [파이썬 코딩 도장 Unit 26.2 집합 연산 사용하기](https://dojang.io/mod/page/view.php?id=2315)