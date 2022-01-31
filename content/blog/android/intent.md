---
title: "Android Intent (Explicit & Implicit)"
date: "2022-02-01T01:19:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Intent"
  - "Explicit Intent"
  - "Implicit Intent"
description: "Android Intent (Explicit & Implicit)"
socialImage: ""
---


# Intent

- 다른 app component의 작업을 요청하는 데 사용할 수 있는 messaging object
- 여러 가지 방법으로 components 간의 communication을 용이하게 한다.

<br>
<br>

# Fundamental Usecases

## Starting an activity

- Intent를 `startActivity()`에 전달하여 app의 single screen인 `Activity`의 new instance를 시작할 수 있다.
- 끝났을 때 결과를 activity로부터 받고 싶다면, `startActivityForResult()`를 호출한다.
- Acitivity는 `onActivityResult()`에서 별도의 intent object로 결과를 수신한다.

## Starting a service

- `Service`는 user interface 없이 background에서 작업을 수행하는 component다.  
    Android 5.0 이상에서는 `JobScheduler`로 service를 시작할 수 있다.
    
- Intent를 `startService()`에 전달하여 파일 다운로드와 같은 one-time operation를 수행할 수 있다.
- Service가 client-server interface로 설계된 경우, intent를 `bindService()`에 전달하여 service를 다른 component에 binding 할 수 있다.

## Delivering a broadcast

- `Broadcast`는 모든 app이 수신할 수 있는 message다.
- Intent를 `sendBroadcast()` 또는 `sendOrderedBroadcast()`에 전달하여 다른 app에 broadcast를 전달할 수 있다.

<br>
<br>

# Explicit Intent

- Target app의 package name 또는 component class name을 제공하여, intent를 충족할 application을 지정한다.
- 시작하려는 activity나 service를 알고 있기 때문에, 일반적으로 explicit intent를 사용하여 component를 시작한다.
- 예를 들어, user action에 대한 응답으로 app 내에서 새로운 acitivity를 시작하거나 background에서 파일을 다운로드하는 service를 시작한다.
- Example code: 웹에서 파일을 다운로드하도록 설계된 `DownloadService` 라는 service를 app에 구축하는 경우
    
    ```java
    Intent downloadIntent = new Intent(this, DownloadService.class);
    downloadIntent.setData(Uri.parse(fileUrl));
    startService(downloadIntent);
    ```

<br>

# Implicit Intent

- 특정 component의 이름을 지정하지 않고 수행할 general action을 선언하므로, 다른 app의 component가 이를 처리할 수 있다.
- 예를 들어, 사용자에게 지도를 표시하려는 경우 지원 가능한 다른 app에서 지도에 위치를 표시하도록 요청한다.
- Example code: 사용자가 다른 사람들과 공유하기를 원하는 content가 있는 경우
    
    ```java
    Intent sendIntent = new Intent();
    sendIntent.setAction(Intent.ACTION_SEND);
    sendIntent.putExtra(Intent.EXTRA_TEXT, textMessage);
    sendIntent.setType("text/plain");
    
    try {
        startActivity(sendIntent);
    } catch (ActivityNotFoundException e) {
        // intent를 처리할 수 있는 activity가 없는 경우
    }
    ```

<br>
<br>

### *Reference*

> *[Intents and Intent Filters](https://developer.android.com/guide/components/intents-filters)*