---
title: "Generics in Java"
date: "2022-03-22T21:19:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Generics"
description: "Generics in Java"
socialImage: ""
---



# Generics

- Parameterized types
- Integer, String 등의 타입을 methods, classes, interfaces의 parameter로 사용하기 위함이다.
- Generics를 사용하면, 각각 다른 data types와 동작하는 class들을 생성할 수 있다.

<br>

# Advantages

- Code Reuse: method, class, interface를 한 번만 작성하면 원하는 모든 type에 사용할 수 있다.
- Type safety: Generics는 runtime이 아닌 compile time에 error가 나타나도록 한다.  
    또한, 개별 type casting이 필요하지 않다.
    
    ```java
    // Not use generics
    ArrayList al = new ArrayList();
    al.add(10);
    String s = (String)al.get(0);  // Runtime error
    ```
    
    ```java
    // Use generics
    ArrayList <String> al = new ArrayList<String> ();
    al.add(10);  // Compile error
    String s = al.get(0);  // Doesn't need type casting
    ```
    
<br>

# How to use

- C++과 마찬가지로, generic class의 parameter type을 특정하기 위해 `<>`를 사용한다.
    
    ```java
    // Generic class의 instance 생성
    BaseType <Type> obj = new BaseType <Type>()
    ```
    
- Parameter type 에서는 `int`, `char`, `double` 등과 같은 primitives를 사용할 수 없다.
    
    ```java
    // Compile-time error
    Test<int> obj = new Test<int>(20);
    ```
    
- Primitive type들의 Array는 reference type이기 때문에 type parameter에 전달될 수 있다.
    
    ```java
    ArrayList<int[]> a = new ArrayList<>();
    ```
    
- Generic class에 여러 개의 Type parameters를 전달할 수 있다.
    
    ```java
    class Test<T, U> {
        T obj1;
        U obj2;
    }
    ```

<br>

# Naming conventions

- `T`: Type
- `E`: Element
- `K`: Key
- `N`: Number
- `V`: Value

<br>

# Example

```java
class Test {
	static <T> void genericDisplay(T element)
	{
		System.out.println(element.getClass().getName()
						+ " = " + element);
	}

	public static void main(String[] args)
	{
		genericDisplay(11);
		genericDisplay("GeeksForGeeks");
		genericDisplay(1.0);
	}
}

// Output
java.lang.Integer = 11
java.lang.String = GeeksForGeeks
java.lang.Double = 1.0
```

<br>
<br>

### *Reference*

> *[Generics in Java](https://www.geeksforgeeks.org/generics-in-java/)*