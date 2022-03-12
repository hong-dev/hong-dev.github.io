---
title: "JNI (Java Native Interface)"
date: "2022-03-12T20:55:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "JNI"
  - "Java Native Interface"
description: "Java Native Interface (JNI)"
socialImage: ""
---



# JNI

- JVM에서 돌아가는 bytecode와 native code 사이의 bridge
- Application이 완전히 java로 쓰여질 수 있지만, java 하나로는 application 요구사항을 충족시키지 못하는 경우가 있다. 이렇게 application이 java만으로 작성되지 못하는 경우, JNI을 사용하여 **Java native methods**를 작성한다.
- VM을 제공하는 곳에서 각각 다른 native method interfaces를 제공했고, 개발자들은 platform에 따라 다양한 버전의 native method library를 만들어야 했다. 이에 통일된 표준 interface가 필요하게 되었다.
- Java Virtual Machine(JVM)에서 돌아가는 java code가, C, C++ 등과 같은 다른 프로그래밍 언어로 쓰여있는 library와 application 간에 상호운용할 수 있도록 해준다.
- JNI의 가장 중요한 장점은, 기본 JVM의 구현에 제한을 가하지 않는다는 것이다.
    
    따라서 JVM에서는 다른 부분에 영향을 주지 않고 JNI에 대한 support를 추가할 수 있다.
    
<br>

# Pros

- VM 제공자들은 더 많은 native code를 제공할 수 있다.
- Tool 개발자들은 여러 개의 native method interfaces를 관리할 필요가 없다.
- Application 개발자들은 native code를 하나의 버전만 작성하면 되고, 그 버전은 다양한 VM에서 동작한다.

<br>

# 동작원리

- JNI은 JVM 안에 들어있다.
- Java bytecode를 JVM이 읽을 때, native call을 수행하는 java code가 있으면 JNI을 통해서 해당 java code와 native library에서 일치하는 native function을 mapping 한다.
- JNI이 중간에서 동작함으로써, Java 모듈과 C/C++ 모듈이 상호 작용하며 서로 호출할 수 있다.

<br>
<br>

### *Reference*

> [_Oracle Java SE Documentation_](https://docs.oracle.com/javase/7/docs/technotes/guides/jni/spec/intro.html)  
> [_JNI 동작 구조_](https://jung-max.github.io/2019/09/16/Android-JNI-%EB%8F%99%EC%9E%91%EA%B5%AC%EC%A1%B0/)
