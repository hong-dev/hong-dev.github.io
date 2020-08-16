---
title: "Django project Initial settings"
date: "2020-06-15T11:12:03.284Z"
template: "post"
draft: false
category: "django"
tags:
  - "Django"
  - "Project"
description: "Django project를 시작할 때 처음 설정해야하는 것들 (초기세팅)"
socialImage: ""
---

Django project를 처음 시작할 때 고려해야 하는 사항들이 있다.  
`django-admin startproject` 명령어로 프로젝트를 시작한 후, 아래의 내용들을 다 처리한 후에 git에 push 하면 초기세팅 완료!

## 1) .gitignore
기본적으로 git에 올리게 되면, 모든 소스코드가 공유된다.  
그러나 올리고 싶지 않은 것이나 올려서는 안 되는 정보들이 있다.  
그런 파일이나 폴더 등이 git에 올라가지 않도록 `.gitignore` 파일을 생성해서 관리해야 한다.

이미 git에 push해서 올라와 있다면, 나중에 ignore를 해도 git repo에서 자동으로 없어지지 않는다.  
물론 방법이 있겠지만, git rm 명령어로 하나씩 지워줘야 하는 번거로움이 있다.  
때문에 처음에 정리해서 git ignore 해놓아야 한다. 프로젝트 시작하면 무조건 제일 먼저 해야하는 초기세팅 단계!!

장고 프로젝트 최상위 폴더에 `.gitignore`파일을 생성한다.  
`django-admin startproject` 명령어로 project를 생성했다면, manage.py 파일이 있는 가장 상위 폴더에 ignore 파일을 만들면 된다.
```bash
vi .gitignore
```
> gitignore 앞에 `.`이 붙었기 때문에 숨김 파일로 생성된다.

<br>
<br>

이제, `.gitignore`는 생성하긴 했는데, 뭘 git에 올리지 말아야 하는지를 모른다.  
그걸 알려주는 좋은 사이트 하나가 있다.


![.gitignore 자동생성기](https://user-images.githubusercontent.com/53142539/84573167-c43c0e00-add9-11ea-80e9-c1ea1e70f0ea.png)

➡ [.gitignore 파일에 정의할 요소를 알려주는 사이트 바로가기](https://www.toptal.com/developers/gitignore)


위의 링크에서 기본적으로 `vim`, `linux`, `django`, `python`을 입력해주고, create를 하면 페이지가 하나 뜬다.  
(위의 예시들 말고 다른 키워드를 입력하거나 추가해도 그에 맞게 요소들을 알려준다.)  
이걸 전체 복사해서 생성한 .gitignore에 붙여넣기 하면 끝!

그리고 3)에서 만들 `my_settings.py`도 git ignore 처리 해줘야 한다.

## 2) cors-headers

## 3) my_settings

Database나 Secret key와 같은 정보는 git에 올라가면 안 되는, secret하게 관리되어야 하는 정보다.  
그래서 settings.py에 그 정보를 바로 넣는 것이 아니라 별도의 파일로 관리해야 한다.  



## 4) commentary (주석처리)

django에서 사용하지 않을 front(template) 기능이나, admin, auth 기능 등의 코드는 settings.py에서 주석처리를 해줘야 한다.  
자세한 주석처리 방법은 ➡ [settings.py에서 주석처리 할 것들](https://hong-dev.github.io/study/endpoint_1/)


## 5) requirements.txt
* 가상환경에서 설치해놓은 module을 볼 수 있는 명령어
```bash
pip freeze
```

<br>

* 협업을 할 때에는 개발환경을 공유해야 하는데, 필요한 모듈 리스트를 파일로 git에 올릴 수 있다.  
아래의 명령어를 입력하면, `requirements.txt` 파일에 내 가상환경에 설치된 모듈 리스트가 저장된다.  
생성된 requirements.txt 파일을 그대로 git에 올리면 끝.
```bash
pip freeze > requirements.txt
```

<br>

* requirements.txt 파일에 있는 모듈들을 내 가상환경에 한꺼번에 설치도 가능하다.
```bash
pip install -r requirements.txt
```

## 6) README.md
github repo에서 readme는 굉장히 중요하다. 원래 요약이 제일 중요하고 어렵지..  
해당 repo가 어떤 프로젝트인지를 readme만 보고 쉽게 이해할 수 있도록 작성하는 게 중요하다.  
개인적으로 readme를 잘 작성했을 때 뿌듯함을 느끼는 편 :relaxed:  
나중에 readme를 다 적으려면 막막하기도 해서 미리 만들어놓고 조금씩 수정해가는 것도 좋은 방법인 것 같다.

파일명을 README.md로 만들어서 깃에 다른 파일들과 같이 push 해도 되고, github repo에서 직접 생성하고 수정해도 된다.  
개인적으로는 repository에서 직접 생성하는 게 편한데, markdown으로 적은 readme 파일이 실제로 어떻게 보여지는지 preview 기능으로 확인 가능하기 때문!