---
title: "Java Collection Framework"
date: "2022-01-11T21:29:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Collection"
  - "List"
  - "Set"
  - "Map"
description: "Collection Framework, Interface, Class"
socialImage: ""
---

# Collection Framework

- 데이터를 저장하는 **자료 구조**와 데이터를 처리하는 **알고리즘**을 구조화하여 클래스로 구현해 놓은 것
- Collection Framework는 java의 **interface**를 사용하여 구현된다.

<br>

# Collection Interface

- Collection을 표현하기 위한 abstract data type을 제공한다.
- `java.util.Collection`: Framework의 Root Interface

## List Interface

- List와 Set interface는 모두 Collection interface를 상속받는다.
    
    따라서 List와 Set interface의 공통된 부분을 Collection interface에서 정의하고 있다.
    
- **순서가 있는** 데이터의 집합
- 데이터의 **중복 허용**
- *구현 Class:* Vector, ArrayList, LinkedList, Stack, Queue

## Set Interface

- List interface와 마찬가지로 Collection interface를 상속받는다.
- **순서가 없는** 데이터의 집합
- 데이터의 **중복을 허용하지 않는다.**
- *구현 Class:* HashSet, TreeSet

## Map Interface

- Collection interface를 직접 확장한 것은 아니지만, Map도 Collection Framework에 포함되는 것으로 간주된다.
- **Key-Value**의 한 쌍으로 이루어지는 데이터의 집합
- **순서가 없다.**
- **Key는 중복을 허용하지 않지만, Value는 중복될 수 있다.**
- *구현 Class:* HashMap, TreeMap, Hashtable, Properties

<br>

# Collection Class

- Collection Frame에 속하는 Interface를 구현한 class (각 interface의 *구현 Class* 부분 참조)
- Vector나 Hashtable과 같은 예전 collection class보다는 새로 추가된 ArrayList나 HashMap class를 사용하는 것이 성능 면에서도 더 나은 결과를 얻을 수 있다.

<br>
<br>

### _Reference_ 
>[_컬렉션 프레임워크의 개념_](http://www.tcpschool.com/java/java_collectionFramework_concept)  
>[_What are Java Collections? Get started with the framework_](https://www.educative.io/blog/what-are-java-collections)