---
title: "github dependabot"
date: "2020-06-08T11:12:03.284Z"
template: "post"
draft: false
category: "concepts"
tags:
  - "Github"
  - "Version"
description: "자동으로 보안 경고 및 수정 pull request를 날려주는 github dependabot"
socialImage: ""
---




Github에서 메일이 잔뜩 왔다. dependabot은 또 뭐고.. security advisory는 또 뭐여..  
처음에는 계정이 털린 건가 무슨 문제가 생긴 건가 싶었다.

![dependabot mail alert](https://user-images.githubusercontent.com/53142539/83963757-42347c80-a8e3-11ea-9daf-65c640f5a271.png)

<br>

알아보니, `Dependabot`은 자동화된 보안 수정 프로그램이라고 한다.  
**보안 경고를 하고, 수정을 위해 pull request까지 보내주는** 매우 친절한 봇이다!  
새로운 버전의 release 정보도 알려준다고 하는데, 내 경우에는 django version 알림이었다.

<br>

## dependabot setting
`github repository의 settings`에 가면, dependabot alerts가 체크되어 있다.  
요녀석의 쓰임새를 이제서야 알았군..!

![github repo settings: dependabot](https://user-images.githubusercontent.com/53142539/83974547-04f2dd80-a929-11ea-8fd5-397116af1650.png)

<br>

## dependabot alert

알림을 받은 repo에 들어가보니, 경고문구가 떠있고 PR도 하나 있고 security에도 1 표시가 있다.  

<br>

![github repo security alert](https://user-images.githubusercontent.com/53142539/83974611-9cf0c700-a929-11ea-9aa0-328d5746d05c.png)

<br>
<br>

경고문구를 눌러보니 security에 django라는 이름으로 `dependabot alerts`가 생겼다.  
어느 정도 심각한지 알려주는데, high severity 실화인가.. django 버전업 안했다고 그..정도야..?  

<br>

![dependabot alerts](https://user-images.githubusercontent.com/53142539/83974709-446df980-a92a-11ea-8719-b80ba7622813.png)

<br>
<br>

클릭해보면 더 자세한 내용을 알려준다.  
여기서는 django를 최소 3.0.7 version으로 적으라고 조언해줬다.

<br>

![dependabot alerts detail](https://user-images.githubusercontent.com/53142539/83974766-ae869e80-a92a-11ea-9954-56a83e86ffc2.png)

<br>
<br>

이렇게 바꾸라고 조언해줄뿐만 아니라 친절한 우리의 dependabot은 `pull request`까지 날려줬다!  
내용을 보니 이렇게 버전업을 해놓았다.  
dependabot이 올려놓은 pull request를 `merge`만 해주면 아주 간단하게 수정 완료!

<br>

![pull request detail](https://user-images.githubusercontent.com/53142539/83974850-3bc9f300-a92b-11ea-94ba-f48a21add903.png)

<br>
<br>

## dependabot alert는 얼마나 빠를까?
여기서, dependabot이 django의 version update를 얼마나 빠르게 반영한 걸까 궁금해진다.  
django website에 들어가서 버전을 확인해봤다.  
release notes 6월 3일, github에서 메일이 온 것은 6월 6일.  
와우🙊 dependabot 꽤나 열일하고 있었다..!

<br>

![django version 3.0.7](https://user-images.githubusercontent.com/53142539/83975359-7d0fd200-a92e-11ea-8ca8-432403340afe.png)

프로젝트에서 사용했던 언어나 framework의 버전 업데이트를 수시로 체크해서 update 하기가 쉽지 않을 것 같다는 생각을 했었다.  
큰 업데이트도 아니고 작은 bug 수정 정도의 update는 더더욱.  
그래서 dependabot의 존재가 굉장히 고맙고 신기하다. 많은 것들이 이미 이렇게 자동화되어 있구나🐤

<br>
<br>

### _Reference_

> [_django release notes_](https://docs.djangoproject.com/en/3.0/releases/)
