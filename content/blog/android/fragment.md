---
title: "Android Fragment"
date: "2022-01-21T00:02:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Activity"
  - "Fragment"
  - "Lifecycle"
description: "Android Fragment"
socialImage: ""
---

# Fragment

- App UI의 재사용 가능한 부분을 나타낸다.
- 자체 layout을 정의 및 관리하고, 자체 lifecycle을 가지며, 자체 input events를 처리할 수 있다.
- 단독으로는 존재할 수 없으며, activity 또는 다른 fragment에서 hosting 되어야 한다.
    
    Fragment의 view 계층은 host의 view 계층의 일부가 되거나 연결된다.
    
- UI를 개별 chunks로 나눔으로써 activity의 UI에 Modularity와 Reusability가 가능하도록 한다.

<br>

# Activity vs Fragment

- Activity는 user interface 주위에 navigation drawer 같은 global elements를 배치하기에 이상적인 곳이다.
    
    반대로 fragment는 단일 화면 또는 화면 일부의 UI를 정의하고 관리하는 데에 더 적합하다.
    
- 만약에 navigation drawer와 grid list가 있을 때, screen 사이즈에 따라서 그 배치가 달라진다.
    
    이 때 이 모든 변형을 activity에서 전부 관리하는 것은 어려울 수 있다.
    
    이 역할을 분리하면, acitivity는 navigation UI를 정확히 표시하고, fragment는 적절한 layout으로 list를 표시하도록 할 수 있다.
    
- UI를 fragments로 나누면, runtime에 activity의 appearance를 더 쉽게 수정할 수 있다.
    
    Activity가 `STARTED` lifecycle state 또는 그 이상일 때, fragments를 추가, 교체 또는 제거할 수 있다.
    

<br>

# Lifecycle

<br>

<img src="https://user-images.githubusercontent.com/53142539/150360751-2fdffd0d-5891-4c0d-9170-77e7c9f994a3.png" alt="fragment-view-lifecycle" width="500px">

[_Ref. Fragment and view lifecycle_](https://developer.android.com/guide/fragments/lifecycle#states)

<br>

- 각각의 fragment instance는 각자의 own lifecycle을 가진다.
- Fragment가 lifecycle을 통해 진행됨에 따라, states가 위아래로 이동한다.
    
    예를 들어, back stack의 맨 위에 추가된 fragment는 `CREATED`에서 `STARTED`, `RESUMED`로 위쪽으로 이동한다.
    
    반대로, fragment가 back stack에서 튀어나오면 `RESUMED`, `STARTED`, `CREATED`, 마지막으로 `DESTROYED`까지 아래로 이동한다.
    
- Fragment와 View의 lifecycle에는 `PAUSE`와 `STOP`에 해당하는 상태가 없다.


<br>
<br>

### *Reference*

> [*Fragments*](https://developer.android.com/guide/fragments)  
>[*Fragment lifecycle*](https://developer.android.com/guide/fragments/lifecycle)
