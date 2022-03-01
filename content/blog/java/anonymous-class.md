---
title: "Inner Class, Anonymous Class"
date: "2022-03-02T08:46:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Inner Class"
  - "Anonymous Class"
  - "Anonymous Inner Class"
description: "Inner Class and Anonymous Class in Java"
socialImage: ""
---



# Inner Class (내부 클래스)

- 클래스 안에 있는 클래스
- Inner class에서는 Outer class의 모든 method와 variables를 사용할 수 있다.  
    Private으로 지정된 것도 접근가능하다.
    
- 서로 다른 내부 클래스에서 똑같은 interfaces를 구현할 수 있기 때문에, overriding methods가 필요한 경우 유용하다.

<br>

### Example

```java
public class OuterClass {
    private int x;

    public class InnerClass {
        void go() {
            x = 42;
        }
    }
}
```

<br>
<br>

# Anonymous inner class (익명 내부 클래스)

- 이름이 없는 class
- 일반 class는 여러 개의 interface를 구현할 수 있지만, 익명 class는 한번에 하나의 interface만 구현 가능하다.
- 일반 class는 class를 extend 하면서 동시에 interface도 여러 개 구현할 수 있지만, 익명 class는 한번에 하나만 할 수 있다.
- 일반 class의 경우, 원하는 수만큼 constructor를 작성할 수 있지만, 익명 class에 대한 constructor는 작성할 수 없다.  
 익명 class에는 이름이 없으며, 정의할 때 constructor class 이름과 constructor 이름이 같아야 하기 때문이다.

<br>

### Example

```java
class MyThread {
    public static void main(String[] args) {
        Thread t = new Thread() {
            ....
        };
    }
}
```

<br>
<br>

### *Reference*

> *[Anonymous Inner Class in Java](https://www.geeksforgeeks.org/anonymous-inner-class-java/)*
