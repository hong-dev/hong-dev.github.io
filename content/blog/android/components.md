---
title: "Android Application Components"
date: "2022-01-05T22:34:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Activity"
  - "Service"
  - "Broadcast Receiver"
  - "Content Provider"
description: "Android Application Components"
socialImage: ""
---

# 안드로이드 4대 컴포넌트

- **Activity, Service, Broadcast Receiver, Content Provider**
- 각 component들은 하나의 독립된 형태로 존재
- 각 component들은 **Intent**라는 일종의 메시지 객체를 사용하여 상호 통신
- 4개의 컴포넌트 요소가 모두 앱에 있어야 하는 것은 아니지만, activity는 반드시 하나 이상은 존재해야 한다.
- Android에는 `main()`이라는 시작점이 존재하지 않고, component 단위로 객체가 생성하고 소멸된다.

<br>

# Activity

- UI 화면을 담당
- 가장 많이 사용되는 component
- Android application은 반드시 하나 이상의 activity를 가지고 있어야 한다.
- Java의 activity class를 상속해서 사용
- 생성 시 manifest 파일에 등록 필수
- 각 activity들은 다른 activity를 실행할 수 있다.
- 단, 두 개의 activity를 동시에 display 할 수 없다.
- Activity 내에서는 **Fragment**를 사용하여 화면을 분할시킬 수 있다.
- LifeCycle을 가지고 있으며, 이 생명주기에 따라 적절한 method가 호출되므로 이를 숙지해서 activity를 작성해야 한다.
- Activity 이동 시에는 flag를 주거나 이전 activity를 종료하지 않으면, stack 구조로 쌓인다.
- **Ex)** 카메라 화면, 지도 화면 등 사용자들에게 보여지는 화면

<br>

# Service

- 백그라운드에서 실행되는 프로세스
- 화면이 존재하지 않는다.
- Service class를 상속해서 사용
- 생성 시 manifest 파일에 등록 필수
- 네트워크를 통해서 데이터를 가져올 수 있다.
- **Ex)** 음악어플을 켜놓고 다른 화면을 실행하여도 음악은 백그라운드로 재생

<br>

# Broadcast Receiver (BR)

- Android에서 다양한 이벤트와 정보를 받아 반응한다.
- Device에서 발생하는 일 중에서 application이 알아야 하는 상황이 발생하면 알려준다.
- 수신기를 통해 device의 상황을 감지하고 적절한 작업 수행
- BroadcastReceiver라는 class를 상속해서 사용
- 대부분 UI가 존재하지 않는다.
- **Ex)** 이어폰 연결이 해체되었을 경우, 그 정보를 수신해서 음악을 일시정지 시킨다.

<br>

# Content Provider (CP)

- 중간 저장소의 역할을 하고, data access를 관리
- Database의 데이터를 전달할 때 많이 사용
- ContentProvider class를 상속해서 사용
- LifeCycle이 존재하지 않는다.
- 다른 application의 data를 변경할 수 있다. (이 때 읽기, 쓰기 등 접근 권한 필요)
- **Ex)** 사용자의 연락처 앱을 통해 연락처 정보를 가져온다.


<br>
<br>

### _Reference_ 
>[_안드로이드 4대 컴포넌트(구성요소)란 무엇인가?_](https://coding-factory.tistory.com/205)  
>[_안드로이드 4대 컴포넌트 설명 / 예시_](https://taewooblog.tistory.com/114)
