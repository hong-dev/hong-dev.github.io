---
title: "Enum in Java"
date: "2022-02-12T17:23:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Enum"
description: "Enum in Java"
socialImage: ""
---

# enum in java

- 열거형(Enumerations)은 지정된 constants 그룹을 나타내는 목적으로 사용된다.
- Compile-time에서 가능한 values를 전부 알고 있을 때 사용된다.
- Enum type의 constants 집합이 항상 **고정되어 있을 필요는 없다.**
- Java 1.5부터 enums는 enum data type을 표현하도록 사용된다.
- Java의 enums는 C/C++의 enums보다 강력하다.
    
    Java에서는 variables, methods, constructors를 추가할 수 있다.
    
- Enum의 주요 목적은, **우리만의 data type을 정의**하는 것이다.

<br>

# Declaration

- Enum 선언은, class 외부 또는 내부에서 가능하지만 method 내부에서는 불가능하다.
- Java naming conventions에 따라, constant는 모두 대문자로 지정하는 것이 좋다.
- Enum 내부의 첫 줄은 constants 목록이어야 하고, 그 다음에 methods, variables, constructors 등이 온다.
    
    ```java
    // Enum declaration outside a class
    
    enum Color {
    	RED,
    	GREEN,
    	BLUE;
    }
    
    public class Test {
    	public static void main(String[] args)
    	{
    		Color c1 = Color.RED;
    		System.out.println(c1);
    	}
    }
    
    >> RED
    ```
    
    ```java
    // Enum declaration inside a class
    
    public class Test {
    	enum Color {
    		RED,
    		GREEN,
    		BLUE;
    	}
    
    	public static void main(String[] args)
    	{
    		Color c1 = Color.RED;
    		System.out.println(c1);
    	}
    }
    
    >> RED
    ```

<br>    

# Features

- 모든 Enum은 내부적으로 Class를 사용하여 구현된다.
    
    모든 enum constant는 type enum의 **object**를 나타낸다.
    
    ```java
    // internally above enum Color is converted to
    class Color
    {
         public static final Color RED = new Color();
         public static final Color BLUE = new Color();
         public static final Color GREEN = new Color();
    }
    ```
    
- switch statements에 argument로 넘길 수 있다.
- 모든 enum constant는 항상 암시적으로 **public static final**이다.
    
    **static**이므로 enum name을 사용해서 access 할 수 있고, **final**이므로 child enums를 생성할 수 없다.
    
- Enum 내부에 `main()` method를 선언할 수 있다.
    
    즉, Command Prompt에서 직접 enum을 호출할 수 있다.
    
- Enums에서 order(순서)는 중요하다.
    
    

## Inheritance

- 모든 enums은 암시적으로 `java.lang.Enum` class를 extend 한다.
    
    Java에서는 하나의 class가 오직 하나의 parent만 extend 할 수 있으므로, enum은 그 외에 다른 것을 extend 할 수 없다.
    
- `toString()` method는 enum constant name을 반환하도록 `java.lang.Enum` class에서 재정의된다.
- enum은 많은 interfaces를 구현할 수 있다.

## constructor

- enum은 constructor를 포함할 수 있으며, enum class loading 시에 각 enum constant에 대해 별도로 실행된다.
- enum objects를 명시적으로 생성할 수 없으므로, enum constructor를 직접 호출할 수 없다.

## methods

- enum은 **concrete** methods와 **abstract** methods를 모두 포함할 수 있다.
- 만약 enum class에 abstract method가 있는 경우, enum class의 각 instance들은 이를 구현해야 한다.

<br>
<br>
<br>

### *Reference*

> [*enum in Java*](https://www.geeksforgeeks.org/enum-in-java/)