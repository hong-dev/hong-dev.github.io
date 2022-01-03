---
title: "OOP: Java vs Python"
date: "2022-01-03T21:34:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Python"
  - "OOP"
  - "Object Oriented Programming"
description: "Java OOP vs Python OOP"
socialImage: ""
---


# 1. Class

### [Java]

- Java class는 class와 동일한 이름을 가진 파일에 정의된다. 각 파일에는 하나의 class만 정의할 수 있다.
    
    ```java
    public class Car {
        private String color;
        private int year;
    
        public Car(String color, int year) {
            this.color = color;
            this.year = year;
        }
    
        public String getColor() {
            return color;
        }
    
        public int getYear() {
            return year;
        }
    }
    ```
    

### [Python]

- Python에서는 언제 어디서나 어떤 파일에서든 class를 선언할 수 있다.
    
    ```python
    class Car:
        def __init__(self, color, year):
            self.color = color
            self.year = year
    ```
    
<br>

# 2. Object Attributes

- 모든 객체 지향 언어에는 object에 대한 data를 저장하는 방법이 있다.
    
    Java와 Python에서는 data가 **attributes**에 저장되는데, 이것은 각 특정한 object와 연결되어 있다.
    

## **Declaration and Initialization**

### [Java]

- Java는 다른 methods의 외부이지만 class body의 내에서 attributes를 선언한다.
    
    명확한 Type과 함께 선언한다.
    
    Class attributes는 사용되기 전에 정의해야한다.
    
    ```java
    public class Car {
        // declare
        private String color;
        private int year;
    
    		// define
        public Car(String color, int year) {
            this.color = color;
            this.year = year;
        }
    ```
    

### [Python]

- Python은 class의 `__init__()` 내에서 attributes를 선언하고 정의한다.
    
    변수 앞에 `self`를 붙임으로써, python에게 이것들이 attributes라는 것을 알려준다.
    
    `__init__()` 밖에서도 instance 변수를 생성할 수는 있지만, scope가 종종 혼동되기 때문에 모범적인 방법은 아니다.
    
    ```python
    def __init__(self, color, year):
        # declare and define
        self.color = color
        self.year = year
    ```
    

## Public and Private

### [Java]

- Java는 public data와 private data를 구별하여, methods 및 attributes에 대한 접근을 제어한다.
- 그러나 Java에서는 public attributes를 선언하는 것을 best practice로 간주하지 않는다.
    
    Attributes는 private로 선언하고 public access methods를 사용해야 한다.
    

### [Python]

- Python에서는 private이나 protected data의 개념이 없다. 모든 것이 public이다.
- 대신에 non-public instance variable이라는 개념이 있는데, `_`(밑줄)로 시작하는 모든 변수는 non-public으로 정의된다.
    
    이 naming convention은 변수에 접근하기 어렵게 만들지만, 그저 naming convention일 뿐, 여전히 직접 access 할 수 있다.
    
- 또 한가지는, `__`(double underscore)인데 변수 앞에 붙이면 숨김 속성이 된다.
    
    Python에서 이중 밑줄 변수를 발견하면, 내부적으로 변수 이름을 변경하여 직접 access하기 어렵게 만든다.
    
    그러나 변경되는 변수명은 규칙이 있기 때문에, 바뀐 변수명으로 접근하면 여전히 직접 접근이 가능하다.
    

## Access Control

### [Java]

- Java는 private attributes에 접근하기 위해 **setters**와 **getters**를 사용한다.
    
    ```java
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    ```
    

### [Python]

- Python은 모든 것이 public 이므로, 이름을 통해 attributes를 set하고 get 할 수 있다.
    
    Java에서는 불가능한, attributes 삭제도 가능하다.
    
    ```python
    my_car = Car("yellow", 1969)
    
    my_car.year = 1966
    del my_car.year
    
    my_car.year
    >>> AttributeError: 'Car' object has no attribute 'year'
    ```
    

## `self` and `this`

### [Java]

- Java는 class가 자신을 참조하는 것으로 `this`를 사용한다.
- Java code에서 `this`는 implicit 되어있다.
    
    같은 이름을 가진 두 변수 사이에 혼동이 생기지 않는 한 일반적으로 작성할 필요가 없다.
    
    ```java
    public void setColor(String color) {
        this.color = color;
    }
    
    public void setColor(String newColor) {
        color = newColor;
    }
    ```
    

### [Python]

- Python의 `self`는 java의 `this`와 비슷한 역할을 하지만, 각 attributes를 생성하거나 참조할 때 꼭 붙여야 한다.
    
    `self`를 생략하면 python은 class의 attribute 대신 local 변수를 생성한다.
    
<br>

# 3. Methods and Functions

- 간단히 말해서 python에는 function이 있고, java에는 없다.

### [Python]

- Python은 global function을 정의하고, 보이는 모든 곳에서 그 함수를 호출할 수 있다.
- Global 하게 정의된 함수는 `self`에 대한 참조가 없다.
- 이러한 함수는 class의 data를 바꾸거나 저장할 수는 없지만, local 변수나 global 변수를 사용할 수 있다.

    ```python
    def say_hi():
        print("Hi!")

    say_hi()
    >>> Hi!
    ```

### [Java]

- Java의 모든 code line은 class에 속한다.
- Functions는 class 외부에서 존재할 수 없고, 즉 java functions는 모두 methods라는 의미이다.
- Java에서 pure function에 가장 가까운 것은 static method를 사용하는 것이다.
    
    아래의 `Utils.SayHi()`는 Utils의 instance를 생성하지 않아도 호출될 수 있다.
    
    object를 먼저 생성하지 않고 호출할 수 있기 때문에, `this` 참조도 없다.
    

    ```java
    public class Utils {
        static void SayHi() {
            System.out.println("Hi!")'
        }
    }
    ```

<br>

# 4. Inheritance

- Python에서는 multiple inheritance를 지원해서, 하나 이상의 parent class의 behavior를 상속할 수 있다.
- Java에서는 단일 상속만 지원하므로, 하나의 parent class에서만 상속할 수 있다.
    
    그러나 java objects는 다양한 interfaces의 behavior를 상속할 수 있다.
    
    Interface는 object가 구현해야 하는 관련 methods들을 제공하며, 여러 child class들이 비슷하게 동작하도록 한다.
    
- Java의 class와 interface는 각각 고유한 자체 파일에 저장되어야 한다.
- Python이 parent class에서 구현한 것을 재사용하는 것과는 달리, Java에서는 interface를 구현하는 모든 class에 같은 functionality를 구현할 것을 요구한다.
    
    Interface는 methods만 정의할뿐, instance data나 구체적인 구현은 정의할 수 없다.
    

<br>
<br>

### _Reference_ 
> [_Object-Oriented Programming in Python vs Java_](https://realpython.com/oop-in-python-vs-java/)
