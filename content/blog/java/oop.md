---
title: "Java OOP (Object Oriented Programming)"
date: "2022-01-03T21:28:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "OOP"
  - "Object Oriented Programming"
description: "Java OOP"
socialImage: ""
---

# POP vs OOP

- **Procedure Oriented Programming:** data에 대한 작업을 수행하는 절차나 method를 작성
- **Object Oriented Programming:** data와 method를 모두 포함하는 object를 작성

<br>

# Class vs Object

- **Class:** Object의 template
- **Object:** Class의 instance

- 예를 들어, **class**가 Fruit 라면 **objects**는 Apple, Banana, Mango 등이다.
- Object가 생성되면, object는 class에서 모든 변수와 method를 상속한다.

<br>

# OOP concepts

## 1. **Abstraction**

- 추상화의 주요 목적은 사용자에게 불필요한 세부사항을 숨기는 것이다.
- Class의 실행과 interface를 분리하고 interface에 집중할 수 있다면, 프로그램을 추론하고 설계하는 것이 더 쉽다.
    
    Class의 복잡한 구현 세부 사항을 추상화하고, clean하고 사용하기 쉬운 interface만 제공한다.
    
- 추상화는 변경사항이 있을 때, 외부 코드가 아닌 class 내의 세부 구현에만 영향을 미치게 한다.

## 2. **Encapsulation**

- Class에 포함된 정보에 코드의 나머지 부분들과 구분되는 보호 장벽을 형성한다.
    
    Data와 functions를 class 단위로 묶어서 캡슐화한다.
    
- 외부로부터 class의 private details를 숨길 수 있고, interfacing에 중요한 기능만 노출할 수 있다.
    
    Class가 자신의 private data에 직접 접근하는 것을 허용하지 않으면, encapsulation이 잘 되었다고 한다.
    

## 3. **Inheritance**

- Class는 하나 이상의 parent/child classes를 가지는 계층으로 구성될 수 있다.
- Class가 다른 class에서 상속되면, 자동으로 해당 class에서 동일한 functionality와 properties를 가져온다.
    
    동시에, 별도의 code와 data를 포함하도록 확장할 수도 있다.
    
    상위 클래스의 기능이 하위 클래스에서 재정의 될 필요가 없기 때문에, 코드의 재사용이 가능하다.
    

## 4. **Polymorphism**

- OOP에서 다형성을 사용하면, 계층 구조에서 class를 균일하게 처리할 수 있다.
    
    Calling code는 계층의 root에서만 작성되고, 계층 구조에서 child class에 의해 instance화 된 모든 object들은 동일한 방식으로 처리된다.
    
- 각 child class에서 해당 함수가 다르게 정의되었다면, 같은 calling이어도 다른 동작이 발생할 수 있다.


<br>
<br>

### _Reference_ 
> [_Java OOP_](https://www.w3schools.com/java/java_oop.asp)  
> [_What Is Object-Oriented Programming? The Four Basic Concepts of OOP_](https://www.indeed.com/career-advice/career-development/what-is-object-oriented-programming)
