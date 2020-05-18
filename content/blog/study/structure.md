---
title: "Data Structure 자료구조"
date: "2020-03-12T11:12:03.284Z"
template: "post"
draft: false
slug: "data/structure"
category: "concepts"
tags:
  - "Data"
description: "자료구조 : List, Set, Dictionary, Tuple, Tree, Stack, Queue"
socialImage: ""
---


## List [ ]
1. data끼리 물리적으로 바로 옆에 붙어서 저장되기 때문에 순차적으로 데이터를 저장할 수 밖에 없다. 그래서 순서가 있고, index가 있다.
2. 중복값도 저장된다.
3. index가 있기 때문에 특정 요소를 호출할 때 매우 빠르게 가져올 수 있다.
4. 무조건 물리적으로 옆에 붙어서 나열되어야 하기 때문에 저장되는 data가 많아지면 resizing을 해야하는 단점이 있다.
5. 요소들 사이에 data를 저장하거나 삭제하면 뒤에 있는 모든 요소들이 붙어서 이동해야되기 때문에 비효율적이다.

## Set { }
1. data의 순서가 없다.
2. data가 들어오면 hashing 해서 그 hash 값에 해당하는 bucket에 값을 저장한다.
3. hash값 기반의 bucket이기 때문에 같은 값은 같은 위치에 저장되고 이 때문에 중복된 값을 저장할 수 없다. 중복된 값이 들어오면 이전의 값을 replace한다.


```
Difference between List & Set
: 중복, 순서
```

## Tuple ( )
1. immutable : 값을 수정할 수 없다.
2. 주로 2개~5개 정도의 소규모 data를 저장할 때 사용한다.
3. 함수에서 한 개 이상의 값을 return하고 싶을 때 사용한다.
4. example: 좌표

## Dictionary {key: value}
1. 순서가 없다.
2. mutable : 수정 가능하다.
3. Key값은 set와 마찬가지로 hash 값 방식으로 저장되기 때문에 key값은 중복될 수 없다. 중복된 key가 들어오면 먼저 저장된 key와 value를 replace 한다.
4. 다른 언어에서는 hashmap, hash table이라고 하기도 한다.

## Tree
1. binary tree(이진 트리) : 두 개의 자식 node를 가진 트리 형태
2. data 저장의 의미보다는 저장된 데이터를 더 효과적으로 탐색하기 위해서 사용한다.
3. 일반 list는 검색이 O(N) 이지만, 이진 트리는 O(log N)이므로 검색이 훨씬 효율적이다. set의 경우에는 data의 양이 얼마나 많은지와는 상관없이 O(1)로 검색 속도가 일정하다.

## Stack, Queue
1. **Stack** : FILO(First In Last Out)\
example: 함수 안의 함수 호출, 브라우저 뒤로가기 기능, stackoverflow 에러
2. **Queue** : FIFO(First In First Out)\
example: 맛집 예약 시스템, 줄 서기, OS 프로세스

<br>
<br>

```
Reference: wecode stackoverflow "What Is Data Sturcture?"
```