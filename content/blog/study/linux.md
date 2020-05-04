---
title: "Linux"
date: "2020-02-15T21:12:03.284Z"
template: "post"
draft: false
slug: "linux"
category: "linux"
tags:
  - "Linux"
description: "Linux의 개념, path"
socialImage: ""
---



- 1991년 Linus Torvals가 개발한 운영체제
- 오픈소스이며 누구나 코드를 볼 수 있다.

## Linux File System Hierarchy (FHS)

- Linux의 directory는 windows의 folder와 동일한 개념이다.
- FHS의 가장 위에는 `/` directory가 있다. Root directory
- root directory 안에 하위 directory들이 있고 또 하위 directory들이 있는 tree 형태
- 각 directory들은 slash(`/`)로 구분한다.\
windows는 back slash(`\`)로 구분한다.

## Home directory

- 가장 중요하고 기본이 되는 directory. User의 공간
- `/home/username`\
Mac에서는 `/Users/username`

## Configs(설정파일)

### shell 설정 파일

- Linux는 설정을 주로 파일에서 하는데,  가장 중요한 설정 파일이 shell 설정 파일이다.
- 각 shell마다 고유 설정 파일이 있다. 숨김 파일이므로 .으로 시작한다.\
ex)Bash는 .bashrc를, Zsh는 .zshrc라는 설정 파일을 사용한다.

### Environment Variable

환경 변수: shell의 어떠한 설정 값을 가지고 있는 변수. shell이 돌아가는 동안 계속 존재하며 사용된다.

1. `HOME` : 유저의 home directory 경로를 저장한 환경 변수

2. `USER` : 유저의 아이디를 저장한 환경 변수

3. `PATH` : PATH 값을 저장한 환경 변수.\
 명령어들을 찾을 수 있는 경로들을 저장해놓은 환경 변수.\
명령어들도 결국 프로그램이기 때문에 어디에 위치해 있는지 정확한 경로를 알아야 shell이 찾아서 실행할 수 있다.\
그러나 경로 없이도 명령어들이 실행되는 이유는, shell이 PATH 환경 변수에 저장되어 있는 경로들을 하나하나 보면서 찾고 실행시키기 때문이다.

<p>

- 환경변수(environment variable) 보기
```bash
    echo $HOME  #유저의 home directory 경로를 저장한 환경변수 -> /home/username
    echo $USER  #유저의 아이디를 저장한 환경변수 -> username
    echo $PATH  #PATH 값을 저장한 환경변수
```

- 명령어의 위치 찾기
```bash
    whereis ls  #ls 명령어가 어디에 있는지 path를 알려준다
```

### PATH Environment Variable

- 새로운 package를 설치하거나 system을 설정하거나 할 때 PATH가 설정이 제대로 안 되면 실행이 안 되는 경우가 있다.
- PATH는 shell 설정 파일에서 설정 (Zsh는 .zshrc 파일, Bash는 .bashrc 파일에서 설정\
    export를 하면 PATH 값의 맨 앞쪽에 새로운 경로가 추가된다.
```bash
    #/home/hong/.bashrc
    
    export PATH="<PATH에 추가하고자 하는 경로>:$PATH"
```

## Piping

`|` : pipe라고 한다. 2개의 명령어를 이어주는 역할을 한다.
```bash
#command1의 결과값을 command2의 input으로 넘겨준다.

$ command1 | command2
$ history | grep ls  #history가 출력하는 값들 중 ls만 필터링하여 출력
```

## Man page (Manual page)

- 명령어를 어떻게 쓰는지 설명해준다.
- `man` page는 너무 길어서, 최근에 나온 유용한 package인 tldr(Too Long Didn't Read)가 있다.\
    `tldr`은 자주 사용하는 option이나 사용법만 간략하게 알려준다. 다만, default package는 아니므로 설치 후 사용해야 한다.
```bash
    $ man ls  #ls 사용법 출력
    $ tldr ls  #간략한 ls 사용법 출력
```
<p>


```
Reference:
wecode stackoverflow: https://stackoverflow.com/c/wecode/questions/301/302#302
```