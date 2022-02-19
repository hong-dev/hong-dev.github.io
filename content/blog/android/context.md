---
title: "Android Context: activity, application"
date: "2022-02-19T15:31:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Context"
  - "Activity Context"
  - "Application Context"
description: "Android Context: Activity context, Application context"
socialImage: ""
---


# Context

- Application의 current/active state의 context
    
    Activity와 Application의 정보를 얻기위해 사용한다.
    
- App 환경의 global information에 대한 interface이며, android system에서 제공하는 abstract class
- Resources, databases, shared preferences 등에 접근할 때 사용한다.
- Messages를 보내서 다른 Android components와 interact 할 수 있게 한다.
- Activity와 Application classes는 모두 Context class를 extend 한다.

<br>
<br>

# Activity Context

- 각 모든 화면에는 activity가 있다.
- Activity의 life cycle과 연결된다.

## `getContext()`

- 호출된 Activity에 연결된 context를 return
- 현재 실행 중인 활동에서만 context를 호출하려는 경우에 유용하다.

## Example

```java
@Override
public void onItemClick(AdapterView<?> parent, View view, int pos, long id) {
  // start the activity
  Intent intent = new Intent(view.getContext(), <your java classname>.class);
  intent.putExtra(pid, ID);
  view.getContext().startActivity(intent);
}
```

<br>
<br>

# Application Context

- Application의 life cycle과 연결된다.
- 주로 singleton이며, `getApplicationContext()` 를 통하여 access 할 수 있다.
- **UI와 관련이 없다.** Service를 시작하거나 resource values를 load 하는 등에만 사용해야 한다.

## `getApplicationContext()`

- 내부에서 실행 중인 모든 activities를 가지고 있는 application에 연결된 context를 return
- 일반적으로 application level에서 사용되며, 모든 activities를 참조하는 데 사용할 수 있다.
- Android app 전체 범위에서 변수에 접근하려면 `getApplicationContext()`를 통해 사용해야 한다.

## Example

```java
import android.app.Application;
   
public class GlobalExampleClass extends Application {
  private String globalName;
  private String globalEmail;
       
  public String getName() {
      return globalName;
  }
       
  public void setName(String aName) {
      globalName = aName;    
  }
      
  public String getEmail() {
      return globalEmail;
  }
       
  public void setEmail(String aEmail) {
      globalEmail = aEmail;
  }
}

// Activity
public class <your activity1> extends Activity {
  private <yourapplicationname> globarVar;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    final GlobalExampleClass globalExampleVariable = (GlobalExampleClass) getApplicationContext();
      
    // 여기서 이름과 이메일을 설정하고, 다른 Activity에서 reuse 가능
    globalExampleVariable.setName("getApplicationContext example");
    globalExampleVariable.setEmail("xxxxxx@gmail.com");
}
```

<br>
<br>

### **Reference**

> *[What is Context in Android?](https://www.geeksforgeeks.org/what-is-context-in-android/)*