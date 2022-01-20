---
title: "Singleton Pattern"
date: "2022-01-20T21:34:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Design Pattern"
  - "Singleton"
description: "Design Pattern: Singleton"
socialImage: ""
---


# Singleton Pattern

- **Class가 하나의 instance만** 가지도록 하며, 이 **instance에 대한 global access point**를 제공한다.

<br>

- Class의 여러 instances의 숫자를 컨트롤 하려는 이유는 대부분, shared resource에 대한 접근을 컨트롤 하기 위해서이다.
    
    Singleton Pattern의 경우, object를 하나 생성하고 다른 object를 또 생성하고 싶을 때, 새로운 object를 얻는 것이 아니라 이미 생성된 object를 얻게 된다.
    
    Regular constructor의 경우에는 항상 new object를 return 하도록 설계되었기 때문에, 이 방법으로는 singleton pattern을 구현할 수 없다.
    
    ⇒ 하나의 database object와 같이, 프로그램의 여러 군데에서 shared 되는 instance가 하나만 필요한 경우 사용한다.
    
- Global variable처럼, singleton pattern은 어디에서든 some object에 접근할 수 있게 한다.
    
    그러나 instance가 다른 code에 의해 overwritten 되는 것은 막는다.
    
    ⇒ Global variables를 strict 하게 관리해야 할 때 사용한다.
    
<br>

- Government는 singleton pattern의 적절한 예시다. 하나의 국가는 official government를 하나만 가질 수 있다.
    
    그 정부를 구성하는 개인의 identity와는 상관없이, ‘대한민국 정부’와 같은 타이틀은 그 그룹의 사람들을 식별하는 global access point 라고 볼 수 있다.
    
<br>

# Pros

- Class에 instance가 하나만 있다는 것을 알 수 있다.
- 해당 instance에 대해 global access point를 얻을 수 있다.
- Singleton object는 처음 요청되었을 때만 initialized 된다.

<br>

# Cons

- The Singleton pattern can mask bad design, for instance, when the components of the program know too much about each other.
- Multithreaded 환경에서는, 여러 개의 threads가 singleton object를 여러번 생성하지 않도록 따로 처리해주어야 한다.
- 많은 test frameworks가 mock objects를 생성할 때 inheritance에 의존하기 때문에, singleton의 client code를 unit test 하는 것이 어려울 수 있다.
    
    Singleton class의 constructor는 private 이고, static methods를 override 하는 것은 대부분의 언어에서 불가능하므로, singleton을 mock 할 수 있는 창의적인 방법을 생각해야 한다.
    
<br>

# Implement

- Singleton class에 대해 `new` operator를 사용하지 못하도록, default constructor를 private으로 만든다.
- Constructor의 역할을 하는 static creation method를 만든다.
    
    내부적으로 이 method는 private constructor를 호출하여 object를 생성하고 static field에 저장한다.
    
    그 뒤로 이 method가 호출되면, 새로운 object를 생성하지 않고 첫번째 호출에서 생성된 cached object를 return 한다.

<br>    

# Example code

```java
public class SingleObject {
    // Create an object
    private static SingleObject instance = new SingleObject();

    // Make the constructor private
    private SingleObject(){}

    // Get the only object available
    public static SingleObject getinstance() {
        return instance;
    }
}
```

<br>
<br>

### _Reference_

>[_Singleton_](https://refactoring.guru/design-patterns/singleton)  
>[_Design Pattern - Singleton Pattern_](https://www.tutorialspoint.com/design_pattern/singleton_pattern.htm)
