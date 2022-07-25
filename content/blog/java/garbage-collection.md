---
title: "Garbage Collection (GC)"
date: "2022-01-08T21:29:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Garbage Collection"
description: "What is Garbage Collection? How does it work?"
socialImage: ""
---

# Garbage Collection

- Java 프로그램이 자동으로 메모리 관리를 수행하는 프로세스
- Java에서 객체가 만들어지면 **Heap**이라는 메모리 공간에 저장된다.
    
    객체를 만들면, 자바에서는 그 객체의 크기에 따라 heap 안에 적당한 메모리 공간을 할당한다.
    
- 모든 객체는 (언제, 어디에서, 어떻게 만들어졌든 상관없이) garbage collection 기능이 있는 Heap에 산다.
- JVM에서 어떤 객체가 절대로 다시 쓰이지 않을 것이라는 결론을 내릴 수 있으면 그 객체는 garbage collection 대상이 된다.
    
    더이상 필요하지 않은 객체들은 삭제되고, 그 객체들에 할당되었던 메모리를 되찾아온다.
    
- GC는 개발자가 메모리 할당 해제를 수동으로 처리하지 않아도 되게 한다.
    
    결과적으로 메모리 문제들과 관련된 몇몇 버그들이 GC에 의해 제거되거나 크게 감소한다.

<br>  

# Types of GC

### Minor GC

- Young generation heap memory에서 접근불가능(unreachable)한 상태가 된 객체들이 제거된다.
- **Young Generation** 영역: 새롭게 생성한 객체의 대부분이 여기에 저장된다.
    
    금방 unreachable한 상태가 되기 때문에, 매우 많은 객체가 이 영역에서 생성되었다가 사라진다.
    

### Major GC

- Old generation이나 Permanent generation에서 접근불가능(unreachable)한 상태가 된 객체들이 제거된다.
- **Old Generation** 영역: Minor GC (Young generation)에서 살아남은 객체들이 여기로 복사된다.
    
    대부분 Young 영역보다 크게 할당하며, 크기가 큰 만큼 young generation 보다 GC가 적게 발생한다.
    
- **Permanent Generation** 영역: 프로그램에서 사용되는 class와 method를 설명하기 위해 JVM이 필요로하는 metadata가 포함된다. (런타임 시에 JVM에 의해 채워진다.)
    
    Old 영역에서 살아남은 객체가 영원히 남아있는 곳이 **아니다.**
    
    이 영역에서도 GC가 발생할 수 있는데, 이곳의 GC도 Major GC에 포함된다.

<br>

# How GC works

### Stop The World

- 메모리를 확보하기 위해, JVM이 잠시 application 실행을 중지하고 GC를 실행한다.
- GC thread를 제외한 모든 thread는, GC가 완료될 때까지 실행이 중지된다.
- 최근 GC 구현에서는, 별도의 thread를 사용하는 background에서 가능한 한 많은 작업을 수행하여 stop-the-world의 영향을 최소화하려고 한다. 예를 들어, application process가 실행되는 동안, unreachable한 garbage instances를 marking 해놓는다.
- GC는 해제할 메모리를 결정하기 위해 CPU resource를 사용한다.
- 시간이 지남에 따라 다양한 GC가 개발되어, GC 중에 발생하는 application 일시 중지 시간을 줄이고, GC와 관련된 성능 저하를 개선되고 있다.

### Mark and Sweep

- **Mark**: 사용되는 메모리와 사용하지 않는 메모리를 식별한다.
- **Sweep**: Mark 단계에서 사용하지 않는 것으로 분류된 객체들을 제거함으로써 메모리를 해제한다.

<br>
<br>

### _Reference_ 
>[_What is Garbage Collection in Java and Why is it Important?_](https://www.eginnovations.com/blog/what-is-garbage-collection-java/)  
>[_Garbage Collection(가비지 컬렉션)의 개념 및 동작 원리_](https://mangkyu.tistory.com/118)
>[_Garbage Collection in Java_](https://www.scaler.com/topics/garbage-collection-in-java/)
