---
title: "shell commands: find"
date: "2020-06-01T11:12:03.284Z"
template: "post"
draft: false
category: "commands"
tags:
  - "Shell"
  - "Linux"
  - "Commands"
description: "shell에서 directory나 file을 검색할 때 사용하는 명령어 `find` 사용하기, migration 파일 찾아서 삭제하기"
socialImage: ""
---



## 1. `find`
* 현재 directory의 모든 파일 찾기 (숨겨진 파일과 하위 directory와 파일들도 모두 찾는다.)
```bash
$ find
```


## 2. `-name`
* 찾고자 하는 파일 및 directory의 이름으로 검색
```bash
$ find -name "tests.py"
```

* 특정 확장자가 들어간 파일을 찾고 싶다면 name에 `*`를 붙여서 검색
```bash
$ find -name "*.py"
```

* 중간에 특정 단어가 들어간 파일을 찾고 싶다면 앞뒤로 `*`를 붙여서 검색
```bash
$ find -name "*test*"
```

> `find -name`으로 찾을 때는 중간 경로는 고려하지 않고, 특정 파일의 이름만 고려한다.  
예를 들어, test라는 디렉토리 안에 user.py 파일이 있다면, `find -name "test"`로 검색했을 때 해당 파일은 결과에서 제외된다.  

## 3. `-path`
* 중간 경로에 들어가는 디렉토리명도 포함해서 검색  
`-path`를 사용할 때는 중간 경로이기 때문에 앞뒤로 `*`을 붙여줘야 한다.
```bash
$ find -path "*user*"
$ find -path "*/user/*"
```

## 4. `~/`
* find 뒤에 경로를 넣으면 해당 경로에서 파일을 찾는다.  
아무것도 넣지 않거나 `.`을 넣으면 현재 디렉토리에서 검색한다. 
```bash
$ find ~/project -name "tests.py"
$ find . -name "tests.py"  #현재 디렉토리에서 검색
```

## 5. `-type`
* directory만 혹은 file만 검색
```bash
$ find -name "test*" -type d  #디렉토리만 검색
$ find -name "test*" -type f  #파일만 검색
```

## 6. `-empty`
* 빈 파일 찾기
```bash
$ find -empty
```

## 7. `-mexdepth`
* 하위 경로를 몇 단계까지 검색할 것인지 입력
```bash
$ find -maxdepth 2 -path "*/user/*"
```

<br>

## find로 migration 파일 삭제하기
django로 프로젝트를 하다가 MySQL에서 table이나 database를 drop하고 다시 생성했던 적이 있다. (꽤 많이..)  
이 때 django에서는 이미 migrate를 했기 때문에, 기존의 migrate된 파일들을 삭제하고 다시 table을 생성하는 과정이 필요하다.
기존 migration 파일들을 삭제하는 명령어를 아래와 같이 사용했다.
1. `find` : 찾기
2. `.` : 현재 directory에서
3. `-path "*/migrations/*.py"` : /migrations/라는 폴더 안에 .py 확장자를 가진 파일
4. `-not -name "__init__.py"` : init 파일을 제외하고
5. `-delete` : 삭제

migrate를 하면 migrations directory 안에 저장되기 때문에 그 안에 있는 파일들을 삭제하겠다는 것.  
> `__init__.py`는 해당 디렉터리가 패키지의 일부임을 알려주는 역할을 한다.  
하지만, python 3.3 버전부터는 이 파일이 없어도 패키지로 인식한다고 한다.  
어쩐지.. init 파일까지 모두 삭제하고 migrate를 다시 해도 문제없이 인식하고 테이블을 생성되더라..

```bash
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
```


<br>
<br>

> Reference : [점프 투 파이썬 - 패키지](https://wikidocs.net/1418#:~:text=__init__.py%20%ED%8C%8C%EC%9D%BC%EC%9D%80%20%ED%95%B4%EB%8B%B9%20%EB%94%94%EB%A0%89%ED%84%B0%EB%A6%AC%EA%B0%80%20%ED%8C%A8%ED%82%A4%EC%A7%80,%ED%8C%A8%ED%82%A4%EC%A7%80%EB%A1%9C%20%EC%9D%B8%EC%8B%9D%EB%90%98%EC%A7%80%20%EC%95%8A%EB%8A%94%EB%8B%A4.)