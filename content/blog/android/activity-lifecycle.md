---
title: "Android Activity Lifecycle"
date: "2022-01-08T22:57:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Activity"
  - "Lifecycle"
description: "Android Activity Lifecycle"
socialImage: ""
---

# Lifecycle

- Component에 대한 lifecycle 상태 정보를 가지고 있는 class이며, 다른 objects들이 이 lifecycle 상태를 관찰할 수 있도록 한다.
- **Event**: Framework나 Lifecycle class에서 전달되는 lifecycle events.
    
    Activity나 fragment의 callback events에 mapping 된다.
    
- **State**: Lifecycle object가 추적하는 component의 현재 상태

<br>

# Activity Lifecycle

![Activity Lifecycle Graph](https://user-images.githubusercontent.com/53142539/148647019-aba67bc9-4bb6-4a46-afc7-5ae5b0dce169.png)

[_A simplified illustration of the activity lifecycle_](https://developer.android.com/guide/components/activities/activity-lifecycle.html#alc)


## onCreate()

- System이 처음 activity를 생성할 때 실행되는 callback
- 반드시 구현해야 한다.
- Activity 생성 시, activity는 `Created` 상태가 된다.
- Activity의 전체 life 동안 한번만 발생해야 하는 startup logic을 구현한다.
- `onCreate()` method의 실행이 완료되면, activity는 `Started` 상태가 되고 system은 `onStart()`를 호출한다.

## onStart()

- 사용자에게 activity가 보여지도록 만든다.
- 예를 들면, app이 UI를 유지하는 코드를 초기화한다.
- `onStart()` method는 매우 빠르게 완료된다.
- 이 callback이 완료되면, activity는 `Resumed` 상태가 되고 system은 `onResume()`를 호출한다.

## onResume()

- App이 사용자와 상호작용하는 상태
- App에서 focus를 잃을 때까지(ex. 전화를 받거나 다른 activity로 이동하는 등) app은 이 상태를 유지한다.
- 방해되는 event가 발생하면, activity가 `Paused` 상태가 되고, system은 `onPause()` callback을 호출한다.
- Activity가 `Paused` 상태에서 `Resumed` 상태로 돌아오면, system은 다시한번 `onResume()`을 호출한다.

## onPause()

- 사용자가 activity를 떠나는 첫번째 표시로 호출된다. (항상 activity가 destroyed 되는 것은 아님)
- Activity가 더이상 전면(foreground)에 있지 않는다. (사용자가 multi-window 모드일 경우에는 여전히 표시될 수 있음)
- Activity가 `Paused` 상태인 동안 작업을 일시중지하거나 조정하기 위해 이 method를 사용한다.

## onStop()

- Activity가 사용자에게 더이상 보이지 않게 되면, `Stopped` 상태가 되고 system은 `onStop()`을 호출한다.
- 예를 들어, 새로 launch된 activity가 전체 화면을 덮을 때 발생할 수 있다.
- System은 activity가 실행을 완료하고 종료되려고 할 때 `onStop()`을 호출할 수도 있다.
- App이 사용자에게 표시되지 않는 동안, 필요하지 않은 resource를 release 하거나 조정해야 한다.
- 상대적으로 CPU를 많이 사용하는 작업을 수행하기 위해서도 `onStop()`을 사용한다.
    
    (예를 들어 database에 정보를 저장할 적절한 시간을 찾을 수 없으면, `onStop()` 중에 할 수 있다.)
    
- `Stopped` 상태에서, activity는 사용자와 interact 하기 위해 돌아오거나 실행을 완료하고 사라진다.
    
    돌아오는 경우 system은 `onRestart()`를 호출하고, 실행이 종료되면 system은 `onDestroy()`를 호출한다.
    

## onDestroy()

- Activity가 소멸되기 전에 호출된다.
- Activity가 destroyed 되기 전에 필요한 모든 것을 정리할 수 있다.
- Activity가 종료된다면, `onDestroy()`는 activity가 수신하는 마지막 lifecycle callback이다.
- 만약 configuration 변경으로 인해 `onDestroy()`가 호출된 것이라면, system은 즉시 새로운 activity instance를 만들고 새로운 configuration의 instance에서 `onCreate()`를 호출한다.
- `onDestroy()`는 `onStop()`과 같은 이전의 callback에서 완전히 release 되지 않은 resources를 모두 release 해야 한다.

## onRestart()

- `onStop()` 이후 activity가 사용자에게 다시 표시될 때 호출된다.
- `onRestart()` 다음에는 `onStart()`와 `onResume()`이 호출된다.


<br>
<br>

### _Reference_ 
> [_The Activity Lifecycle_](https://developer.android.com/guide/components/activities/activity-lifecycle.html)
