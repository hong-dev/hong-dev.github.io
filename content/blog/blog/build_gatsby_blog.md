---
title: "Start Github Blog (Gatsby)"
date: "2020-05-04T10:12:03.284Z"
template: "post"
draft: false
slug: "blog/build_gatsby_blog"
category: "react"
tags:
  - "React"
  - "Blog"
  - "Gatsby"
description: "Gatsby starter를 활용한 Github Blog 시작하기"
socialImage: ""
---



개발을 시작한 후, Github Blog를 쓰기 시작했다.  
처음부터 끝까지 웹사이트를 만들기에는 막막했던 터라 Gatsby starter를 활용하여 만들었다.  
Gatsby에서는 starter를 위한 template을 제공해주고 있어서 가져다가 조금만 수정해서 사용할 수 있다.

▶ [gatsby starter template 구경하기](https://www.gatsbyjs.org/starters?v=2)

<br>

첫 gatsby blog는 [gatsby-starter-lumen](https://www.gatsbyjs.org/starters/alxshelepenok/gatsby-starter-lumen/) 을 활용한 블로그였다.  
3달 넘게 잘 쓰고 있다가 이모티콘을 블로그에 넣어보고자 검색하다가 [gatsby-remark-emoji](https://www.gatsbyjs.org/packages/gatsby-remark-emoji/) 라는 것을 발견!

링크에서 하라는대로 `yarn add`도 하고 `gatsby-config.js`에도 추가했는데 알 수 없는 에러창이 떴다..  
급히 되돌려보고 package 삭제까지 했다.. git에 올려져있는 것을 다시 clone 받아도 봤다..  
뭘해도 에러는 사라지지 않아서(리액트알못..😭), 결국은 새로운 Gatsby blog 만들기!

<br>

평소에 예쁘다고 생각한 [gatsby-starter-bee](https://www.gatsbyjs.org/starters/JaeYeopHan/gatsby-starter-bee/) 템플릿으로 도전!  
1. 이모티콘을 지원한다! 조마조마하며 패키지 설치하지 않아도 됨!
2. 한글 지원! (다른 탬플릿 중에는 한글이 깨지기도 한다더라) 한글로 된 readme도 있다! 갓재엽님..
3. 어떤 부분을 바꾸면 되는지 친절한 설명 + 다른 사용자들의 코드 참고 가능!
4. 반응형까지 너무 예쁘게 잘 되어있다!

<br>


# 초기 세팅
**1. git 설치**  
**2. npm 설치**  
**3. yarn 설치**
```
npm install -g yarn
```
**4. gatsby-cli 설치**
```
npm install -g gatsby-cli
```
> npm install시에 `-g` option은 `--global`과도 같은 의미이며, 어디에서도 사용할 수 있도록 전역에 설치하는 것을 뜻한다.

<br>

# Gatsby Theme 가져오기
블로그를 만들고 싶은 directory에서 아래의 명령어를 실행한다.
```
gatsby new gatsby-starter-bee https://github.com/JaeYeopHan/gatsby-starter-bee
```
>  `gatsby-starter-bee`라는 디렉토리에 선택한 테마의 소스코드를 가져온다는 뜻이다.  

명령어를 실행시 `gatsby-starter-bee`라는 디렉토리가 자동으로 생성되므로, new 다음에 원하는 디렉토리 이름을 적으면 된다.  
디렉토리명 다음 부분에는 원하는 테마의 github 주소를 적는다.

위의 명령어를 실행하면 package manager를 yarn으로 할 것인지 npm으로 할 것인지 선택하라고 한다.  
yarn을 설치했으므로 default인 `yarn`을 선택해준다.


<br>

# 로컬환경에서 블로그 띄우기
생성된 gatsby 블로그 폴더에 들어간다.
```
cd gatsby-starter-bee
```
해당 폴더 안에서 로컬 서버를 띄워준다.
```
yarn develop
```
> 권한이 없다는 에러가 뜨면 `sudo yarn develop` 로 sudo를 붙여서 실행해본다.

<br>

서버가 실행되면, 크롬 주소창에 `localhost:8000` 을 입력한다.  
선택한 테마의 기본 블로그 화면이 뜨면 성공!

서버가 실행되고 있는 동안은 localhost에 접속가능하다.  
코드를 바꾸고 git에 올리고 deploy(배포)까지 한 다음 확인하는 것은 비효율적이다.  
바뀐 코드가 적용되는 것을 바로바로 볼 수 있도록 서버를 계속 실행하면서 로컬환경에서 띄워보는 것이 좋다.  
서버를 끄려면 서버가 켜져있는 터미널에서 `ctrl + c` 를 입력한다.

<br>

# Gatsby 소스코드 수정
gatsby-starter-bee에서는 Netlify로도 배포할 수 있도록 하는데, netlify의 도메인을 가지게 된다.  
그 방법은 해당 테마 repository의 readme.md를 참고하도록 하고, 여기서는 github.io 도메인으로 배보하는 방법을 적는다.

github pages를 통해 배포하고 싶다면, 코드 소스에서 `package.json` 파일의 `scripts`부분에 아래의 내용을 추가한다.  
scripts에 이미 다른 것들도 기재되어 있으므로, 마지막 부분에 deploy 한줄을 추가하면 된다.

```
"scripts": {
    "deploy": "gatsby build && gh-pages -d public -b master"
}
```

<br>

# github.io
github에서 새로운 repository를 만든다.  
repo 이름은 `{github_username}.github.io`로 만든다.
> ex) hong-dev.github.io
Public으로 만들어야 github.io 도메인으로 접속하는 주소를 사용할 수 있다.

<br>

새로 만든 깃헙 레포지토리로 로컬에 있는 블로그 소스코드를 올린다.
서버를 켰었던 터미널에서 다음 명령어를 차례로 입력한다.
```
git init
git remote add origin https://github.com/hong-dev/hong-dev.github.io.git
```
> 새로 생성한 repository에 들어가면 Quick setup 밑에 주소가 적혀있는데, 그 github 주소를 복사해서 입력한다.

<br>

아래의 명령어를 실행하면 origin 주소가 잘 연결되어 있는지 확인 할 수 있다.
```
git remote -v
```

<br>

명령어를 차례로 실행하여 github repository에 소스코드를 올린다.
```
git add .
git commit -m "first commit"
git push origin master
```
> `.` 은 현재 디렉토리에 있는 모든 코드를 다 포함한다는 의미다.

<br>

github repo에 push 한 소스코드가 잘 올라왔다면 성공!


<br>

# Deploy
github repo에 코드를 올린다고 해서 블로그가 자동으로 생기는 것은 아니다.  
github.io 도메인으로 블로그를 사용하기 위해서 배포 과정이 필요하다.

우선, github 블로그 도메인이 잘 지정되어 있는지 확인해본다.  
> **Repo ➡ Settings ➡ Options ➡ GitHub Pages**  

settings에 가면 아래와 같이 내 블로그 도메인 주소를 확인할 수 있다.  
Repo가 Private이라면 깃헙 페이지는 생성할 수 없다.


![github domain address](https://user-images.githubusercontent.com/53142539/81479740-21372800-9260-11ea-8677-5abdbae3ea5b.png)

<br>

Github repo에 push 한 소스코드를 모든 사람들이 접근해서 볼 수 있도록 배포한다.
```
yarn deploy
```
> 권한 error가 발생한다면, `sudo yarn deploy` 를 실행한다.

<br>

만약에 gh-pages가 없다는 error 메시지가 뜬다면, gh-pages 모듈을 설치해야 한다.

```
npm install gh-pages
```

deploy 명령어가 실행되어, 마지막에 `Done` 이라고 뜬다면 성공!  
배포 후에는 블로그 도메인 주소로 들어가서 확인하면 되는데, 배포가 바로 안 되고 한참 뒤에 적용이 될 수 있다는 점..

<br>

# Branch 따기
master branch는 사용하지 않고, develop이라는 브랜치를 따로 만들어서 여기로만 올리도록 한다.
```
git branch develop
git checkout develop
```
> `git checkout -b develop` 는 위의 두줄을 실행한 것과 동일한 명령어다.

<br>

develop branch에서 수정한 소스코드를 git에 올리는 과정
```
git add .
git commit -m “commit message”
git push -u origin develop
```

<br>

다만, 이렇게 하면 매번 repository에 Pull Request를 올리고, merge를 하는 과정을 거쳐야한다.  
그래서 develop branch를 github default branch로 바꾼다.  
> **Repo ➡ Settings ➡ Branches ➡ Default branch**

default branch를 develop으로 바꾸고 update를 눌러 적용한다.

![default branch](https://user-images.githubusercontent.com/53142539/81480486-1cc13e00-9265-11ea-9dae-7f6c01f33d3b.png)

이제 PR 날리지 않아도 develop branch에서 push 하면 repo에 바로 update 된다!

<br>

# Customize
정말 감사하게도 bee 테마는 기본적인 프로필 정보를 어디서 어떻게 바꾸면 되는지 친절하게 설명해준다.

[▶ bee 테마의 README.ko.md](https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/README.ko.md)

그 외에 레이아웃이나 소소한 css 같은 것들을 바꾸고 싶다면, 하나하나 뜯어보는 수밖에..  
그렇지만 bee 테마는 readme에 다른 사용자들의 링크가 있어서 코드를 참고할 수 있다!  
뜯어보고 참고하고 이거저거 바꿔보면서 조금씩 수정해봐야지.. 🐤

<br>
<br>
<br>
<br>

> Reference: [Gatsby로 블로그 만들기](https://yeri-kim.github.io/posts/how-to-install-gatsby/)

> \#wecode #위코드