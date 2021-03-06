---
title: 'git master branch에서 push 못하게 설정'
date: 2020-4-21 16:21:13
category: 'commands'
thumbnail: ''
tags:
  - "Backend"
  - "Project"
  - "BFTEST"
  - "Git"
  - "Python"
  - "Django"
description: ""
draft: false
---


Github은 협업하기에 아주 좋은 툴이다.  
여러 사람이 함께 작업을 하다보면 git flow와 버전 관리를 위해, branch를 따서 작업을 하고 branch에서 작업한 것을 push 한다.

간혹 실수로 master에서 작업하고 master에서 commit하고 push하는 경우가 있다.  
이를 막기위해 github repository 자체에서 master branch로는 push하지 못하도록 설정할 수 있다.

<br>

> **repo ➡ Settings ➡ Branches ➡ Branch protection rules**

<br>

![Screenshot from 2020-06-10 23-33-35](https://user-images.githubusercontent.com/53142539/84280933-eaac4000-ab72-11ea-99da-b0129b6de296.png)

✅ _만약 Settings에서 왼쪽에 `Branches` 항목이 보이지 않는다면?_  
아직 initial setting(초기세팅)을 하지 않은, 한번도 push를 하지 않은 레포 상태인지를 확인한다.  
한번이라도 master로 push를 해야, branches 설정을 할 수 있다.

<br>
<br>

branch protection rules에서 `add rule`을 클릭한 후, `master`를 입력한다.  

![Screenshot from 2020-05-10 03-16-33](https://user-images.githubusercontent.com/53142539/81481687-c7892a80-926c-11ea-8652-6f5cd92def73.png)

<br>
<br>

여기에서 주의할 점은, 가장 위에 있는 `Require pull request reviews before merging`를 꼭 체크해야 한다는 것!

![Screenshot from 2020-05-10 03-17-14](https://user-images.githubusercontent.com/53142539/81481689-c952ee00-926c-11ea-8361-ed0c68bfe453.png)

<br><br>

이렇게 하면 master branch로 push 했을 때 아래와 같이 error message가 나온다.  
애초에 Pull Request를 날리지 못하도록 차단!  

![master branch error](https://user-images.githubusercontent.com/53142539/81481643-8f81e780-926c-11ea-834e-c9aa685efb88.png)

그리고 administrator (repository를 생성한 user)만 merge가 가능해진다.  
PR 날리고 스스로 merge 하지 못하며 admin만 merge가 가능하므로, git 관리가 잘 이루어질 수 있다.

