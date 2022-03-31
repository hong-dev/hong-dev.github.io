---
title: "Wildcards in generics"
date: "2022-03-31T19:37:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Generics"
  - "Wildcard"
description: "Wildcards in generics"
socialImage: ""
---


# Wildcard: ?

- **물음표(?)**는 generic programming에서 wildcard로 사용된다.
- Unknown type을 나타낸다.
- Parameter, field, 지역 변수, return의 type 등과 같이 다양한 상황에서 사용할 수 있다.

<br>
<br>

# Types of wildcards

## Upper Bounded Wildcards

> Collectiontype<? extends A>
> 
- A와 그의 child를 구현한 객체들만 parameter로 사용 가능
- Type의 제한을 완화시켜줄 때 사용한다. 상위 generic type으로 묶어준다.
- 예를 들어 `List<Integer>`, `List<Double>`, `List<Number>`에서 동작하는 method를 작성하고 싶을 때, 아래와 같이 사용할 수 있다.
    
    ```java
    public static void add(List<? extends Number> list)
    ```

<br>


## Lower Bounded Wildcards

> Collectiontype<? super A>
> 
- A와 그의 parent를 구현한 객체들만 parameter로 사용 가능
- Type을 제한할 때 사용한다. 해당 type의 상위 type만 허용한다.
- 아래의 경우, `Integer`와 Integer의 super class인 `Number`는 가능하지만, `Double`이 전달된다면 compilation error가 날 것이다.
    
    ```java
    public static void add(List<? super Integer> list)
    ```

<br>

## Unbounded Wildcard

> Collectiontype<?>
> 
- 위의 두 가지 wildcard와 달리 제한이 없다.
- `List<?>`와 같이 사용된다면, 이것은 unknown type들의 list이다.
- `Object` class에서 제공하는 functionality를 사용하여 method를 작성할 때 유용하다.
- Type parameter에 의존하지 않는 generic class의 method를 사용하는 경우 유용하다.


<br>
<br>
<br>

### *Reference*

> *[Wildcards in Java](https://www.geeksforgeeks.org/wildcards-in-java/)*
