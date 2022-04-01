---
title: "Fragment Transaction"
date: "2022-04-01T09:02:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Fragment"
  - "Transaction"
description: "Android Fragment Transaction"
socialImage: ""
---


# Transaction

- Runtime에서, `FragmentManager`는 유저와의 인터랙션에 대한 응답으로 fragments를 추가, 제거, 교체, 또는 다른 동작들을 수행할 수 있다.
- 이러한 fragment 변경들을 `transaction`이라고 하며, `FragmentTransaction` class에서 제공하는 API를 사용하여 transaction 내에서 수행할 작업을 지정할 수 있다.
- 하나의 transaction에 여러 개의 action을 포함할 수 있다. 예를 들어, 하나의 transaction이 여러 개의 fragment를 추가하거나 교체할 수 있다.
- 각각의 transaction을 back stack에 저장할 수도 있고, activity를 통해 뒤로가기 하는 것과 유사하게 사용자는 fragment 변경 사항을 뒤로가기 할 수 있다.
    
    기본적으로 `FragmentTransaction`의 changes를 back stack에 추가되지 않는데, 저장하려면 `addToBackStack()`를 호출하면 된다.
    

<br>

# How to use

- `FragmentManager`에서 `beginTransaction()`을 호출함으로써 `FragmentTransaction`의 instance를 만들 수 있다.
- `FragmentTransaction`에 대한 최종 호출은 transaction을 commit 해야 한다.
    
    `commit()` 호출은 모든 작업이 transaction에 추가되었음을 `FragmentManager`에 알린다.
    
    ```java
    FragmentManager fragmentManager = ...
    FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
    
    fragmentTransaction.commit();
    ```
    

## add

- `FragmentManager`에 fragment를 추가하려면 `add()`를 호출해야 한다.
- Fragment를 위한 **container**의 ID와 fragment의 class 이름을 parameter로 받는다.
- 추가된 fragment는 `RESUMED` 상태가 된다.
- 이 때, **container**는 view hierarchy의 일부인 `FragmentContainerView`인 것이 좋다.

## remove

- Host에서 fragment를 제거하려면, `remove()`를 호출해야 한다.
- `findFragmentById()` 또는 `findFragmentByTag()`를 통해 fragment manager에서 검색된 fragment instance를 parameter로 넘긴다.
- 제거된 fragment는 `DESTROYED` 상태가 된다.

## replace

- Container에서 기존의 fragment를 새로운 fragment class의 instance로 교체할 때 `replace()`를 호출한다.
- `replace()`를 호출하는 것은, `remove()`를 호출하고 동일한 container에 새로운 fragment를 추가하는 것과 같다.

    ```java
    FragmentManager fragmentManager = ...
    FragmentTransaction transaction = fragmentManager.beginTransaction();

    transaction.replace(R.id.fragment_container, ExampleFragment.class, null);
    transaction.commit();
    ```

<br>
<br>
<br>

### *Reference*

> *[Fragment transactions](https://developer.android.com/guide/fragments/transactions)*