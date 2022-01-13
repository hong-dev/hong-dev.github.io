---
title: "String vs StringBuilder vs StringBuffer"
date: "2022-01-13T09:30:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "String"
  - "StringBuilder"
  - "StringBuffer"
description: "Java String vs StringBuilder vs StringBuffer"
socialImage: ""
---

# String

### Immutable
- 변경되지 않으므로 데이터 불일치에 대한 우려가 없고, multi-threaded 환경에서 사용하기에 적합하다.
- String은 변경이 되지 않으므로, String으로 정의된 변수를 바꾸면 기존의 값은 GC(Garbage Collection)의 대상이 되고 새로운 값이 생성된다.
- 계속 변경되는 값을 String으로 지정하면 heap에 GC 대상이 되는 값들이 늘어나서, heap memory에 문제가 생길 수 있다.
- string이 프로그램 전체에서 일정하게 유지될 경우에, String class object를 사용한다.
- String concatenation operator(문자열 연결 연산자 `+`)를 String class에서 사용하게 되면, 기존의 값들은 버리고 연결된 문자열이 새롭게 생성된다. 따라서 문자열 연결 연사자의 경우에는 내부적으로 StringBuffer 또는 StringBuilder class를 사용한다.

<br>

# StringBuilder

### Mutable / Not synchronized
- StringBuilder와 StringBuffer는 정의된 변수 자체의 값을 변경할 수 있다.
- string이 변경될 수 있고, **single thread**에서만 access 할 수 있는 경우 사용한다.
- Thread-safety를 원하지 않는 경우에 사용할 수 있다.
- Performance 측면에서 StringBuffer보다 **빠르고** 효율적이다.
- append(), insert(), delete(), substring()과 같은 methods를 제공한다.
    
<br>    

# StringBuffer

### Mutable / Synchronized
- StringBuilder와 마찬가지로, 정의된 변수 자체의 값을 변경할 수 있다.
- 동기식이므로 thread-safety를 보장한다.
    
    (**Thread-safety**: Multi-thread programming에서 어떤 함수나 변수, 객체가 여러 threads로부터 동시에 접근이 이루어져도 프로그램의 실행에 문제가 없음을 뜻한다.)
    
- string이 변경될 수 있고, **multiple threads**에서 access 할 경우 사용한다.
- Performance 측면에서 StringBuilder보다 **느리고** 덜 효율적이다.
- append(), insert(), delete(), substring()과 같은 methods를 제공한다.

<br>
<br>

### _Reference_ 
>[_String vs StringBuffer vs StringBuilder_](https://www.journaldev.com/538/string-vs-stringbuffer-vs-stringbuilder)