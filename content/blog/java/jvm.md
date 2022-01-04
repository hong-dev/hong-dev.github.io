---
title: "JVM (Java Virtual Machine)"
date: "2022-01-04T22:35:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "JVM"
  - "Java Virtual Machine"
description: "Java Virtual Machine"
socialImage: ""
---

# JVM

- 자바 가상 머신
- Java 프로그램을 모든 장치 또는 OS에서 실행할 수 있도록 한다. (”Write once, run anywhere”)
- Java와 OS 사이에서 동작하며, Java가 OS에 영향을 받지 않고 재사용이 가능하도록 한다.
- **메모리 관리(Garbage Collection)**를 수행
- 코드를 load, verify, execute 하며, fatal error를 report

<br>
<br>

# How Java works

### Java Source code ⇒ (Compiler) ⇒ Java Bytecodes ⇒ (JVM) ⇒ Machine language

<br>

- Java 코드는 bytecode로 compile 된다.
    
    `.java` 파일을 compile 하면, compiler는 `.java` 파일에 있는 class의 이름과 동일한 이름을 가진 `.class` 파일(byte-code 포함)을 생성한다.
    
- Bytecode로 compile 된 `.class` 파일은 JVM을 거쳐 machine language로 변환된다.

<br>
<br>

# JVM Architecture

## **Class Loader**

- `.class` 파일들을 load해서 분석한 뒤에, 실제 메모리 영역(Runtime Data Area)에 배치

## **Runtime Data Area (Memory)**

- Class Loader에서 분석된 class 파일 데이터를 저장하고, 실행 도중에 필요한 데이터를 저장
- 메모리를 효율적으로 관리하기 위해 크게 5개의 영역(Static, Heap, Stack, PC Register, Native Method Stack)으로 구분
    1. **Static (Method Area):** 가장 먼저 데이터가 저장되며, class loader에 의해 로딩된 class, method, static, global variable 등 저장
    2. **Heap**: Object allocation이 일어나는 영역
    3. **Stacks:** 프로그램의 부분적 결과와 local variable 저장
        
        Thread가 생성될 때마다 JVM stack이 동시에 생성된다.
        
        Method를 호출하면 호출 프로세스가 완료되는 동시에 새로운 stack frame이 생성되고 소멸된다.
        
    4. **PC Registers:** 현재 실행중인 JVM 명령어의 주소를 저장
    5. **Native Method Stack:** 모든 application에 필요한 모든 기본 method를 포함
        
        Bytecode가 아닌 기계어로 작성된 코드를 실행하는 공간
        
        다른 언어로 작성된 코드를 수행하기 위함
        

## **Execution Engine**

- Runtime Date Area에 배치된 byte code를 해석하며, CPU가 해석 가능한 기계어로 변환하여 실행
- Interpreter 방식(bytecode를 한 줄씩 읽고 해석)과 JIT 컴파일 방식(bytecode를 런타임 시점에 바로 기계어로 변환)을 혼합하여 해석
    
    Interpreter 방식은 실행 속도가 느리고, JIT compile은 실행 속도는 빠르지만 변환하는 데 비용이 발생
    
    그래서 interpreter 방식을 사용하다가 일정한 기준이 넘어가면 JIT 컴파일 방식으로 실행


<br>
<br>

### _Reference_ 
> [_JVM – Java Virtual Machine Working and Architecture_](https://techvidvan.com/tutorials/java-virtual-machine/)  
> [_자바의 구동 원리와 JVM(Java Virtual Machine)_](https://gbsb.tistory.com/2)
