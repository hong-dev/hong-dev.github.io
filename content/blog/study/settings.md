---
title: "[Django] App(1); 초기세팅"
date: "2020-02-13T15:12:03.284Z"
template: "post"
draft: false
slug: "django/setting"
category: "django"
tags:
  - "Django"
description: "django settings, startproject"
socialImage: ""
---


## Install Django

**1.** ubuntu에서 terminal 열기: `Ctrl + Alt + T`\
전체화면으로 키우기: `Window키 + 위쪽화살표`

<p>

**2.** django 설치

```bash
$ pip install django
```

<p>

**3.** django 설치 여부 및 version 확인\
    *제대로 설치가 되어 있지 않다면, `No module named django`와 같은 error 발생
```bash
$ python -m django --version
```

## Start Project

- 새로운 가상환경을 만들고, 원하는 directory에서 폴더를 만든다.

```bash
$ django-admin startproject mysite
```

* startproject를 하면 다음과 같은 파일 및 디렉토리가 생성된다.
    1) manage.py

    2) \__init__.py

    3) settings.py

    4) urls.py

    5) asgi.py

    6) wsgi.py

```bash
mysite/  #이건 이름 바꿔도 됨. 이 directory는 껍데기일뿐
    manage.py
    mysite/  #진짜 project 이름과 설정 등등은 다 여기 directory가 한다.
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```


#### 생성한 new django project가 제대로 작동하는 지 확인

기본적으로 runserver 명령은 내부 IP의 8000번 포트로 개발 서버를 띄운다.

```bash
$ python manage.py runserver
```

![runserver](https://user-images.githubusercontent.com/53142539/77429582-3cb7b200-6e1d-11ea-83c4-77b170fe4978.png)

이런 문구가 뜨면, [http://127.0.0.1:8000/](http://127.0.0.1:8000/) 에 접속하여 로켓을 확인한다.

![runserver](https://user-images.githubusercontent.com/53142539/77429581-3c1f1b80-6e1d-11ea-8761-15023b4421ec.png)

#### 앱 생성하기

manage.py가 존재하는 디렉토리인 mysite에서 polls app을 만든다.

```bash
$ python manage.py startapp polls
```

생성된 polls 디렉토리의 구조는 다음과 같다.

```bash
#현재 프로젝트 폴더

firstproject/  #하위 폴더 중 같은 이름의 폴더가 자동으로 생성되므로(mysite), 이름 바꿔도 됨
    manage.py

    polls/  #startapp으로 생성
            __init__.py
            admin.py
            apps.py
            migrations/
                __init__.py
            models.py
            tests.py
            views.py  #결과를 실행할 함수들이 들어있음. request는 ip
                **urls.py**  #새로 생성한 파일. path가 view의 함수를 실행하도록 만듦.

    mysite/  #startproject으로 생성
        __init__.py
        settings.py
        urls.py  #최상위 URLconf에서 polls.urls 모듈을 바라보게 설정
        asgi.py
        wsgi.py
```

- **'view.py'**는 로직을 담당하는 파일. 가장 많이 다루게 될 파일\
class나 function 정의하고, request를 받아서 return 값을 준다.

- **'migrations 디렉토리'**는 models.py 파일에 정의한 테이블 구조를 manage.py의 makemigrations 옵션을 통해 생성되는 파일이 저장되는 디렉토리
- **'models.py'**는 장고의 핵심 기능중 하나인 ORM과 관련되어 있는 파일. 단순하게는 데이터베이스의 테이블을 정의하는 파일
- **'settings.py'**는 프로젝트 관련 모든 설정 정보를 담고 있는 파일
- **'urls.py'**는 url 경로에 대한 부분

*django는 URLconf(URL configuration)을 사용하는데, URLconf는 django에서 URL과 일치하는 뷰를 찾기 위한 패턴들의 집합이다.

## path(); path(route, view, kwargs, name)

`route` : URL 패턴을 가진 문자열

`view` : django에서 일치하는 패턴을 찾으면, 경로로부터 캡처된 값을 키워드 인수로 하여 특정한 view 함수를 호출한다.

`kwargs` : 임의의 키워드 인수들은 목표한 view에 사전형으로 전달된다.

`name` : URL에 이름을 부여

- path()는 길고 긴 URL 중에서 route가 들어있으면, view를 실행하도록 한다.\
아래의 예시에서, `admin/` 이 있으면 `admin.site.urls`가 실행되고, `polls/` 가 있으면 `include('polls.urls')`가 실행된다.

## include()

- URL의 그 시점까지 일치하는 부분을 잘라내고, 그 후의 문자열 부분을 처리하기 위해 include 된 url 파일 경로에 전달하여 참조하게 한다.
- 아래의 예시에서, `path('polls/', include('polls.urls'))` 코드는 `path/` 까지 `mysite/urls.py` 파일에서 해석하고, `include('polls.ulrs')` 함수를 통해서 그 다음 url 부분을 `polls` 디렉토리 아래의 `urls.py` 모듈에서 해석할 수 있게 된다.
- 다른 URL 패턴을 포함할 때마다 항상 include()를 사용해야 한다. `admin.site.urls`가 유일한 예외다.

```bash
#mysite/urls.py

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
            #각각의 app.urls.py에서 입력한 url path를 참조할 수 있게 한다.
            #그리고 각 app.urls.py에서는 또다시 app.views.py에 입력된 함수값을 실행하게 한다.
    path('admin/', admin.site.urls)
            #기본 default값
]
```

## 프로젝트명/settings.py 내용

### INSTALLED_APPS

현재 django 인스턴스에서 활성화된 모든 django 어플리케이션들의 이름이 담겨 있다. 앱들은 다수의프로젝트에서 사용될 수 있고, 다른 프로젝트에서 쉽게 사용될 수 있도록 패키징하여 배포할 수 있다.

```
django.contrib.admin; 관리용 사이트
django.contrib.auth; 인증 시스템
django.contrib.contenttypes; 컨텐츠 타입을 위한 프레임워크
django.contrib.sessions; 세션 프레임워크
django.contrib.messages; 메세징 프레임워크
django.contrib.staticfiles; 정적 파일을 관리하는 프레임워크
```

## migrate

- 위와 같은 기본 어플리케이션들 중 몇몇은 최소한 하나 이상의 database table을 사용하는데, 그러기 위해서는 database에서 table을 미리 만들 필요가 있다.
- migrate는 INSTALLED_APPS setting을 보고 필요한 database table을 만들어준다.

```bash
#firstproject; 가장 상위의 directory에서 입력

$ python manage.py migrate
```

- 실행하면, 각각의 migration들이 적용되었다는 메시지가 나타난다.

![migration](https://user-images.githubusercontent.com/53142539/77429573-3aedee80-6e1d-11ea-9f65-603b99f837a2.png)

- migrate 명령은 INSTALLED\_APPS에 등록된 어플리케이션에 한하여 실행된다.\
필요없는 어플리케이션은 installed_apps에서 주석처리(comment-out)하거나 삭제하면 된다.

```
Reference:
- https://docs.djangoproject.com/ko/3.0/intro/tutorial01/
- https://suwoni-codelab.com/django/2018/03/24/Django-Url-function/
```