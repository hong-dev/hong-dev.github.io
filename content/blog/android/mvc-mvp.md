---
title: "MVC vs MVP Design Pattern"
date: "2022-01-15T20:05:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Design Pattern"
  - "MVC"
  - "MVP"
description: "Android Architecture Pattern: MVC vs MVP"
socialImage: ""
---


# Android Architecture Patterns

- Android application을 개발할 때는 software architecture pattern을 사용하여 개발하는 것이 선호된다.
- Architecture pattern은 project files에 **modularity(모듈성)**를 부여하고, 모든 코드가 Unit tests에서 cover 되도록 한다.
- Software를 유지 관리하고 application의 기능을 확장하는 작업을 쉽게 만든다.
- 하나의 잘못된 변경이 architecture의 integrity를 망칠 수 있으므로, 개발팀의 strict discipline이 필요하다.

<br>
<br>

# MVC (Model-View-Controller)
## 1. Components

### Model

- Application data를 저장
- Interface에 대해 알지 못한다.
- Domain logic(실제 business rules)를 처리하고, database 및 network layer와의 통신을 담당

### View

- 화면에 보이는 components를 담고 있는 UI(User Interface) layer
- Model에 저장된 data의 시각화를 제공하고, 사용자와의 상호 작용을 제공

### Controller

- View와 Model 간의 관계를 설정
- 핵심 application logic이 포함되어 있다.
- 사용자의 behavior에 대한 정보를 얻고, 필요에 따라 model을 업데이트 한다.

## 2. 동작방식

- **사용자의 action이 Controller에 전달된다.**
- Controller는 Model의 data를 update 하고, View의 presentation을 update 한다.
- View는 Model에서 data를 가져와서 화면에 보여준다.

## 3. 특징

- 가장 오래된 design pattern
- Code testability를 높인다.
- Separation을 강력하게 지원하므로, 새로운 기능을 더 쉽게 구현할 수 있다.
- MVC가 제대로 적용되었더라도, code layer는 서로 의존성이 있다.
    
    UI(View)와 Data-access mechanism(Model)은 밀접하게 결합되어 있다.
    
    Unit testability가 MVP보다 어렵다.
    
- Controller와 View layer는 동일한 activity/fragment에 속한다.
- 하나의 Controller가 다양한 View를 선택할 수 있으므로, Controller와 View 간에 many-to-one 관계가 존재한다.
- Data를 어떻게 display 할 것인지에 대한 UI logic를 처리하는 parameter가 없다.

<br>
<br>

# MVP (Model-View-Presenter)

## 1. Components

### Model

- Data를 저장하기 위한 layer
- Domain logic(실제 business rules)를 처리하고, database 및 network layer와의 통신을 담당

### View

- UI(User Interface) layer
- Data 시각화를 제공하고, Presenter에게 알리기 위해 사용자의 action을 추적한다.

### Presenter

- Model에서 data를 가져오고, UI logic을 적용하여 어떤 것을 display 할지 결정한다.
- View의 상태를 관리하고, View에서 사용자의 input notification에 따라 동작한다.

## 2. 동작방식

- **사용자의 action이 View에 전달된다.**
- View는 Presenter에게 data를 요청하고, Presenter는 Model에게 data를 요청한다.
- Model이 Presenter로 data를 넘기고, Presenter는 View에게 data를 return 한다.
- View는 Presenter로부터 받은 data를 화면에 나타낸다.

## 3. 특징

- MVC에서 발전된 design pattern
- Android components 간의 conceptual relationship이 없다.
- Model, View, Presenter later가 분리되어 있어, 코드 유지 및 테스트가 용이하다.
    
    MVC와 다르게, View는 Model에 느슨하게 연결된다.
    
    Unit testing is highly supported.
    
- View-Presenter와 Presenter-Model 간의 통신은 interface를 통해 이루어진다.
- 하나의 Presenter class가 한 번에 하나의 View를 관리하므로, Presenter와 View 사이에는 one-to-one 관계가 존재한다.
- Single responsibility principle을 따르지 않는다면, Presenter layer가 거대한 클래스로 확장되는 경향이 있다.


<br>
<br>

### _Reference_ 
> [_Difference Between MVC and MVP Architecture Pattern in Android_](https://www.geeksforgeeks.org/difference-between-mvc-and-mvp-architecture-pattern-in-android/)  
> [_Difference Between MVC and MVP Patterns_](https://www.baeldung.com/mvc-vs-mvp-pattern)