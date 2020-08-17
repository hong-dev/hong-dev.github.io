---
title: "`yarn deploy` doesn't seem to work"
date: "2020-08-17T10:12:03.284Z"
template: "post"
draft: false
category: "gatsby"
tags:
  - "Blog"
  - "Gatsby"
description: "gatsby blog가 local에서는 잘 뜨는데, yarn deploy 적용이 되지 않을 때"
socialImage: ""
---



github blog를 사용할 때 가장 무서운 게, 정체모를 원인모를 error들이다.. 나한테 왜 그러는 거야 대체.. :sob:  
코드 한 줄 잘못 입력해서 에러가 나는 것과는 또 다른, 이걸 fix 하지 못하면 내 블로그 전부가 날아갈 수 있겠구나 하는 굉장히 무서운 기분 :scream:  
git을 잘 모르고 gatsby 구조를 잘 몰라서 더 무서운 거겠지..

<br>

---

### 1. pull request from master

오늘은 갑자기 blog repo의 master가 develop branch로 merge를 요청하는.. 그런 알 수 없는 일이 생겼다.  
`merge into develop from master`  
develop이 master에 merge 하고 싶어하는 건 봤어도, master가 develop으로 merge 하고 싶어하다니.. 이게 무슨일이지.. :fearful:

<br>

모르긴 몰라도 두 개가 conflict가 나는 것 같으니, develop이랑 master랑 merge를 해서 똑같이 만들어주면 되지 않을까 생각했다.  
현재 내 블로그는 master와 develop 두 개의 branch가 존재하고, develop을 default branch로 해서 develop에서만 작업하는 중이었다.  

:arrow_right: 그래서 master를 develop 하고 merge 한 후에 그걸 push 해서, 어찌어찌 pull request에 있는 conflict를 해결하고 merge 시켰다.  
(한줄로 끝날 얘기지만 실제로는 온갖 git command 다 동원해서 겨우 merge 시켰다.. 고통.. :joy:)

<br>

---

### 2. yarn deploy

겨우 master와 develop을 merge 시켜놨더니, 이제는 `yarn deploy`가 문제다.  
내 블로그를 아예 띄우지를 못한다. 들어가면 그냥 빈 하얀 화면.  
local로 띄웠을 때는 매우 잘 작동한다. (여기서 좀 안심.. :joy:)  

<br>

**think 1**  
`package.json`에 deploy 설정이 혹시 지워졌나?  
:arrow_right: 매우 잘 적혀있다.

<br>

**think 2**  
github settings에 github pages가 혹시 주소가 잘못 입력되었나?  
:arrow_right: 내 주소 그대로다.

<br>

**think 3**  
settings에 들어왔다가 `Source`라는 걸 발견했다.  
내 경우에는 Branch가 develop으로 되어 있었다. 혹시 이건가 하고 **master로 바꿔서 저장**했다.  
deploy 다시 안했는데도 바로 잘 된다!! 오예!! :clap:


![github pages settings](https://user-images.githubusercontent.com/53142539/90359210-3c050e00-e093-11ea-9a92-bf73942b0c89.png)