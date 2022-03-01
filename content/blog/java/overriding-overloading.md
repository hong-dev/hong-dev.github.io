---
title: "Overriding vs Overloading"
date: "2022-03-01T11:47:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Overriding"
  - "Overloading"
description: "Overriding vs Overloading"
socialImage: ""
---



# Overriding

- Runtime polymorphism
- Parent class 또는 superclass에서 이미 정의되어 있는 method를 구체적으로 구현하기 위해 사용된다.
- 상속 관계에 있는 2개의 class에서 발생한다.  
    즉, overriding에는 항상 inheritance가 성립되어야 한다.
    
- Parent와 Child class의 method 이름, parameter의 개수, parameter type이 동일해야 한다.
- Method의 return type도 동일해야 한다.

<br>

### Example

```java
class Dog {
    public void bark() {
        System.out.println("woof");
    }
}

class Hound extends Dog {
    public void bark() {
        System.out.println("bowl");
    }
}
```

<br>

# Overloading

- Compile-time polymorphism
- 하나의 class 안에서 같은 이름을 가진 method가 2개 이상일 때 발생한다.
- 상속이 꼭 필요한 것은 아니다.
- Method들의 name은 동일하되, parameter의 개수나 type은 달라야 한다.
- Return type은 같을 수도, 같지 않을수도 있다.
- Methods가 동일한 이름을 가지고 있더라도 parameter 등 method signature가 다르기 때문에, compiler는 각 method를 다른 것으로 인식한다.

<br>

### Example

```java
class Dog {
    public void bark() {
        System.out.println("woof");
    }

    public void bark(int num) {
        for (int i = 0; i < num; i++) {
            System.out.println("woof");
        }
    }
}
```

<br>
<br>

### *Reference*

> *[Overloading vs. Overriding](https://www.educative.io/edpresso/overloading-vs-overriding)*