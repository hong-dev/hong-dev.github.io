---
title: "Shell"
date: "2020-02-15T19:12:03.284Z"
template: "post"
draft: false
slug: "linux/shell"
category: "concepts"
tags:
  - "Linux"
  - "Shell"
description: "shell의 개념, 종류, 꾸미기"
socialImage: ""
---


## Shell의 개념

```
User ↔ Shell ↔ OS
```

- 터미널 환경에서 운영체제의 커널(kernel)과 사용자의 유저 스페이스(user space)를 이어주는 인터페이스(interface) 역할을 하는 프로그램
- 사용자의 명령어를 운영체제에 전달하여 실행하게 하고, 그 결과물을 유저에게 전달한다.
- Shell Script(쉘 스크립트)라는 쉘 전용 프로그래밍 언어를 사용해서 터미널 환경에서 다양한 자동화를 실행할 수도 있다.

## Shell의 종류

- Bash(Bourne-Again Shell) : 대부분의 리눅스 기반 운영체제에서 기본 쉘로 설치된다.
- ZSH(Z Shell) : 최근에 인기를 얻고 있는 쉘

    `Oh My Zsh`라는 ZSH 설정 매니저 플러그인을 통해서 편리하게 쉘 설정을 할 수 있다.

## Package Manager

- package(프로그램)를 설치할 때:\
    예전에는 프로그램의 소스코드를 직접 컴파일 해야했는데, 지금은 package manager라는 시스템으로 terminal 상에서 쉽게 원하는 프로그램을 설치하고 사용할 수 있다.

- Mac에서는 `homebrew`를 사용한다.
- Ubuntu에서는 `apt` 혹은 apt-get을 사용한다.\
    apt는 apt-get보다 더 발전된 package manager이다.\
    Ubuntu 구버전들은 apt-get을 사용해야 하고, 최신 버전들은 둘 다 가능하지만 apt을 권장한다.

## Z Shell 테마 바꾸기 reference

참조1: [[Linux] 기본 터미널을 z shell(zsh)로 바꾸고 oh my zsh 적용해서 스타일링 하기](https://teddylee777.github.io/linux/linux%EC%97%90%EC%84%9C-%EA%B8%B0%EB%B3%B8%ED%84%B0%EB%AF%B8%EB%84%90-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81%ED%95%98%EA%B8%B0)

참조2: [oh-my-zsh를 이용한 터미널 꾸미기](https://ulfrid.github.io/development/oh-my-zsh/)

```bash
#powerlevel10k 테마 적용

git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>! ~/.zshrc
```

#### pluging

- osx
- autojump
- gnu-utils
- zsh-syntax-highlighting
- history-substring-search
- colored-man-pages

<p>

```
Reference:
wecode stackoverflow: https://stackoverflow.com/c/wecode/questions/303/304#304
```