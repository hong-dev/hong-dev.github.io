---
title: "Android Thread, Handler, Looper"
date: "2022-02-13T17:57:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Thread"
  - "Handler"
  - "Looper"
description: "Running Android tasks in background threads: Handler, Looper"
socialImage: ""
---


# Background threads

- 모든 안드로이드 앱은 main thread를 사용하여 UI operations를 처리한다.
- 이 main thread에서 long-running operations를 호출하면 앱이 정지하거나 응답하지 않을 수 있다.
    
    만약 network request를 main thread에서 처리한다면, network response를 받을 때까지 UI가 멈춘다.
    
- **Background threads**를 생성하여 이러한 long-running operations를 처리한다면, main thread는 그동안 UI updates를 처리할 수 있다.

<br>

# Thread pool

- Thread pool은 queue에서 병렬로 작업을 실행하기위해 관리되는 threads의 집합이다.
- Thread pool에 task를 보내기 위해서, `ExecutorService` interface가 사용된다.  
    (`ExecutorService`는 android application component의 Service와는 아무 관련이 없다.)
    
- Threads를 생성하는 것은 expensive 하므로, thread pool은 app이 initialize될 때 딱 한 번만 생성해야 한다.
    
    ```java
    // background tasks에서 사용할 threads 4개의 thread pool 생성
    
    public class MyApplication extends Application {
        ExecutorService executorService = Executors.newFixedThreadPool(4);
    }
    ```
    

## :bulb:

- 앱의 모든 thread는 main thread 포함하여 다른 threads와 병렬로 실행될 수 있으므로, code가 **thread-safe** 한지 확인해야 한다.      
    Threads 간에 공유되는 variables에 write 하는 것을 피하고, immutable data를 전달한다.
    
- Threads 간에 state를 공유해야 하는 경우, **lock**과 같은 동기화 메커니즘을 사용하여 access 관리에 주의해야 한다.      
    일반적으로, 가능하면 threads 간에 mutable state를 공유하지 않아야 한다.
    
<br>

# Handler

- Handler를 사용하여 다른 thread에서 수행할 작업을 queue에 넣을 수 있다.
- 각 Handler instance는 single thread 및 해당 thread의 message queue와 연결된다.
- 새로운 Handler를 생성하면, `Looper`에 바인딩 된다.
- 즉, Handler는 미래의 어떤 시점에서 실행될 messages와 runnables를 schedule 하고, 다른 thread에서 수행할 작업을 queue에 추가한다.

<br>

# Looper

- Thread에 대한 message loop를 실행하는 데 사용되는 class
- 기본적으로 thread에는 연결된 message loop가 없다.  
    생성하려면 loop를 실행할 thread에서 `prepare()`를 호출한 다음, loop가 stop 할 때까지 message를 처리하도록 `loop()`를 호출한다.
    
- Message loop와의 대부분의 interaction은 `Handler` class를 통해 이루어진다.
- Looper에는 main thread의 Looper를 검색하는 `getMainLooper()` helper function이 있다.  
    이 Looper를 사용하여 Handler를 생성함으로써, main thread에서 코드를 실행할 수 있다.      
    꽤 자주 사용할 수 있으므로, 위에서 선언한 `ExecutorService`와 동일한 위치에 Handler의 instance를 저장할 수도 있다.
    
    ```java
    public class MyApplication extends Application {
        ExecutorService executorService = Executors.newFixedThreadPool(4);
        Handler mainThreadHandler = HandlerCompat.createAsync(Looper.getMainLooper());
    }
    ```
    
<br>

# How does it work

- 수행되어야 할 여러 개의 tasks들이 들어있는 `MessageQueue`가 있다.
- `Handler`는 background로 수행되어야 할 task를 UI threads에서 분리해서  `MessageQueue`에 넣는다.  
    이 때, 단순히 처음이나 끝에 넣는 것이 아니라 언제 실행할 것인지 지정할 수 있다.
    
- `Looper`는 이 `MessageQueue`를 계속 반복해서 돌면서, 현재 실행되어야 하는 message를 찾는다.
- `Looper`가 실행되어야 하는 message를 `Handler`에게 보내면, `Handler`는 그 작업을 처리한다.

<br>
<br>
<br>

### *Reference*

> *[Running Android tasks in background threads](https://developer.android.com/guide/background/threading)  
> [Handler](https://developer.android.com/reference/android/os/Handler)  
> [Looper](https://developer.android.com/reference/android/os/Looper)*
