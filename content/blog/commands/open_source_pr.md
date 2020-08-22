---
title: "[Github] How to create Pull Request in a Public Repository"
date: "2020-08-22T11:12:03.284Z"
template: "post"
draft: false
category: "commands"
tags:
  - "GitHub"
  - "Git"
  - "Blog"
description: "GitHub에서 Open source repository에 Pull Request를 날리는 방법"
socialImage: ""
---


Open Source에 기여한다, 이런 말을 많이 듣는다.  
그게 어떻게 이루어지는지 몰랐는데, 이번에 간단한 pull request를 날려볼 기회가 생겼다.  
contribute는 절대 아니고!! :joy: 현재 쓰고 있는 이 [블로그 template (starter-bee)](https://github.com/JaeYeopHan/gatsby-starter-bee)의 README.md에 use case를 추가하는 것!  
이걸 만드신 게 너무 대단하고 감사해서ㅠㅠ 개인적으로 use case에 올라가는 게 꿈이었는데..헤헤.. 드디어 해보기로 했다! :relaxed:

<br>

### 어느 Repository에서??
* git에서 merge 되는 과정을 생각하면.. local에서 수정하고 PR을 날리고 merge가 되는 것 같은데..  
그럼 어느 repo에서 수정하고 어디로 push 해야하는 거지..?

  #### 1. 해당 template을 사용해서 만든 내 개인 repo..? (X)
    * 라고 처음에 떠올렸다가, 정말 말도 안되는 소리라는 걸 바로 깨달았다.  
    posting 정보까지 다 들어있는, 마구 수정해놓은 repo에서 pr을 날릴리가 없잖아 :joy:

  #### 2. original repo..? (X)
    * original repo를 pull 받았다. 그리고 수정했다. 그리고 add, commit, push를 날렸다.
    권한이 없다는 403 error가 날라왔다. :joy: <br>
    <br>
    ![error_unable_to_access](https://user-images.githubusercontent.com/53142539/90909506-ca212180-e410-11ea-92ee-d1c697f88f9c.png)

<br>

### Fork한 Repository에서!!
* 예전에 누가 말해준 게 생각이 났다. 다른 사람이 만든 repo를 fork 해서 수정했는데, 이게 내 fork repo만 수정되는 게 아니라 original repo에 pr를 날리게 되어있다는 것. 오오 그게 연결이 된다고..? 생각했었는데 바로 그 방법이 생각나서 fork를 해왔다.
* **original repo를 fork하고, fork한 repo를 git clone 받고, 수정하고, add, commit, push를 날렸다.**
* 여기서 고민이 되었던 건, master branch에서 작업해야하는 건가..?  
master branch를 건드린다는 것은 왠지 큰 죄를 짓는 느낌이라 불안했는데 :joy:  
original repo의 closed 된 PR을 열어보니, 이런 식으로 되어있기에 master로 하는 건가보다 생각했다.
```
commits into `{OriginalCreatorName}:master` from `{PullRequestUserName}:master`
```
<br>

* push까지 한 후에 fork한 repo를 가보면, merge가 되어있고, 그 위에 `commit ahaed of ~` 라는 말이 써있다.  
  그 옆의 `Pull request`를 클릭하면 original repo에서 pr을 작성할 수 있는 곳으로 넘어간다.

![after push to fork repo](https://user-images.githubusercontent.com/53142539/90950885-c3d28a00-e490-11ea-83c3-75fd4bee5833.png)

<br>

* 아래 page로 들어왔으면 `Creat pull request`를 눌러 작성한다.  
친절하게 base repository와 head repository가 어디인지 적혀있다. :thumbsup:  
여기에서는 바뀐 코드가 무엇인지 볼 수 있어서, 변경사항을 다시 확인해보면 좋겠다!

![make pull request](https://user-images.githubusercontent.com/53142539/90950899-e369b280-e490-11ea-8e41-437732bf3689.png)

<br>

* 드디어..! 익숙한 pull request 작성 페이지다.  
처음 봤던 건, `Allow edits by maintainers` 체크 부분. 체크되어 있는 게 default인데, maintainer가 내 걸 변경할 수 있도록 해준다.  

  > On user-owned forks, if you do not want to allow anyone with push access to the upstream repository to make changes to your pull request, unselect **Allow edits from maintainers**.  --from [Github Docs](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork)

<br>

![pull request form](https://user-images.githubusercontent.com/53142539/90950913-fd0afa00-e490-11ea-86de-f5d42df660dc.png)

<br>

* 그리고 또 한 가지 발견.. 저렇게 맨 밑에 contribute guide [(How To Contribute)](https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/CONTRIBUTING.md)가 있었다.. 이게 있는 줄 몰랐다.. :joy:  
열어보니 `CONTRIBUTING.md` 파일인데, 이게 `README.md`처럼 git에서 인식하는 파일로, contribute 하는 방법에 대해 적어놓는 그런 파일인가보다. :hushed:  
Fork하고 commit push 하라고 매우 친절하게 적혀있고.. 심지어 commit message rule 까지 있었는데 지키지 못했쥬..? :sob: :pray:  
**Open source에 pr을 날리고 싶을 때는, contributing rules가 있는지 미리 살펴보는 게 좋겠다!**

<br>

* Pull Request를 날렸다면, original repository의 pull requests에 올라가 있는 걸 볼 수 있다.  
이제 merge 되기를 기다리면 끝! :pray:
