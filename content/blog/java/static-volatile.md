---
title: "Static vs Volatile variables"
date: "2022-01-08T18:09:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Volatile"
  - "Static"
description: "Java static and volatile variable"
socialImage: ""
---

# Static variable

- 만약 2개의 threads(t1, t2)가 같은 object에 접근해서 **static**으로 선언된 변수를 update 한다고 하자.
    
    이때 t1과 t2는 **static 변수들을 포함하여** 해당 object에 대한 local copy를 각자의 cache에 저장한다.
    
    따라서 t1의 local cache에서 static 변수를 변경하면, t2 cache의 static 변수에는 반영되지 않는다.
    
- 한 object의 변경이, 같은 class의 다른 objects에 적용되는 **context of Object**에서 사용된다.
    
    그러나, 한 thread의 static 변수 변경이 즉시 다른 threads에도 적용되는 **context of Thread**에서는 **사용되지 않는다.**
    
<br>

# Volatile variable

- 만약 2개의 threads(t1, t2)가 같은 object에 접근해서 **volatile**로 선언된 변수를 update 한다고 하자.
    
    이때 t1과 t2는 **volatile 변수들은 제외하고** 해당 object에 대한 각자의 local cache를 만든다.
    
- Volatile 변수는 오직 하나의 shared main copy만 가지게 된다.
- Volatile 변수는 다양한 threads에 의해 변경되고, 하나의 thread에서 volatile 변수를 변경하면 즉시 다른 threads에도 반영된다.
- Volatile 변수는 CPU의 cache를 거치지 않고 main memory에 직접 read/write를 수행
- 주로 여러 threads가 동시에 접근할 수 있는 변수를 volatile로 선언

<br>
<br>

### _Reference_ 
>[_Volatile vs Static in Java_](https://newbedev.com/volatile-vs-static-in-java)