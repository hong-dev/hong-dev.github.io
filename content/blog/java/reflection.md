---
title: "Reflection in Java"
date: "2022-01-31T22:54:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Reflection"
description: "Reflection"
socialImage: ""
---

# Reflection

- Runtime에 methods, classes, interfaces의 동작을 검사하거나 수정하는 데 사용되는 API
- New object를 instance화 하거나 method를 호출하고 field 값을 get/set 할 수도 있다.
- 필요한 class는 `java.lang.reflect` package에서 제공된다.
- Class, method, field information을 access 하려면, `getClass` method를 호출한다.
    
    `getClass` method는 runtime class represetaion을 return 한다.
    
<br>

# Methods

- `getClass()`: object가 속한 class의 이름을 가져오는 데 사용된다.
- `getConstructors()`: object가 속한 class의 public constructors를 가져오는 데 사용된다.
- `getMethod()`: object가 속한 class의 public methods를 가져오는 데 사용된다.

<br>

# Pros and Cons

- Extensibility objects의 instance를 생성해서 외부의 user-defined classes를 사용할 수 있다.
- Debuggers는 reflection 속성을 사용하여, class의 private members를 검사한다.
- Reflective operations는 성능이 느리므로, performance-sensitive한 프로그램에서 자주 호출되는 부분에서는 사용을 피해야 한다.
- Abstractions를 깨뜨리므로, platform upgrade에 따라 동작이 변경될 수 있다.

<br>

# Example code

```java
// Method는 없고 name, age field만 있는 Person class
public class Person {
    private String name;
    private int age;
}

// Reflection을 사용하여 class의 모든 field 이름 검색
public void givenObject_whenGetsFieldNamesAtRuntime_thent() {
    Object person = new Person();
    Field[] fields = person.getClass().getDeclaredFields();
}

```

<br>
<br>

### *Reference*

> [*Guide to Java Reflection*](https://www.baeldung.com/java-reflection)  
> [_Reflection in Java_](https://www.geeksforgeeks.org/reflection-in-java/)
