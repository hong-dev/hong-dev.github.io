---
title: "[Django] Create Endpoint(2); sign-up, log-in, comments"
date: "2020-02-14T13:12:03.284Z"
template: "post"
draft: false
slug: "django/endpoint_2"
category: "django"
tags:
  - "Django"
  - "Endpoint"
description: "회원가입, 로그인, 댓글올리기 관련하여 endpoint 만들기: startapp"
socialImage: ""
---

<p>

프로젝트의 기본 Setting이 끝났다!\
**틈틈이 runserver를 해보는 습관!! :)**

```bash
python manage.py runserver
```

LookupError가 뜬다.

root\_dir/settings.py 에서 admin app을 주석처리 해놓고, root_dir/urls.py에는 admin app 관련 경로가 아직 남아있기 때문이다.

```bash
LookupError: No installed app with label 'admin'.
```

`root_dir/urls.py`에서 admin 관련 내용을 삭제한다.

*이 프로젝트에서는 admin 기능을 사용하지 않기 때문에 삭제하는 것이다. admin 기능이 필요한 곳에서는 아주 유용한 기능 중 하나이다. 이게 없다면 admin 기능을 전부 새로 구현해야하기 때문.

```bash
#root_dir/urls.py

"""westagram URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin  #삭제
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),  #삭제
]
```

runserver를 다시 해보면 잘 작동한다.

migration 안했다고 나오는 것은 무시해도 된다. 내가 만들지 않은 app들의 이름이 나오는데, django에서 필요한 것들을 생성시킨 것이다. 이것들은 내 model을 만들고 나서 같이 migration 하면 된다.

runserver를 빠져나오는 방법은 `ctrl + c`

```bash
#python manage.py runserver

Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 3 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

February 07, 2020 - 11:32:50
Django version 3.0.3, using settings 'westagram.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

---

## 새 APP 만들기

- root directory와 같은 레벨의 directory로 app을 생성한다.

```bash
python manage.py startapp user
```

***startapp인데 기존에 있는 이름을 똑같이 쓰면 어떻게 되나요?

```bash
#tree를 실행해보니 다음과 같이 user app이 잘 생성되었다.

.
├── db.sqlite3
├── manage.py     #실행 파일
├── user          #새로 생성한 app
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
└── westagram     #root directory. project명과 동일
    ├── asgi.py
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-38.pyc
    │   ├── settings.cpython-38.pyc
    │   ├── urls.cpython-38.pyc
    │   └── wsgi.cpython-38.pyc
    ├── settings.py
    ├── urls.py
    └── wsgi.py

4 directories, 18 files
```

## urls.py 복사

- startapp을 했을 때 아쉬운 점이 하나 있다. urls.py가 자동으로 생성이 안 된다.\
    따라서 root_directory/urls.py를 app directory 안으로 복사해온다.\
    이 과정은 app을 하나 생성하면 무조건 해야하는 기본적인 작업!

****근데.. 장고가 안하는 데는 이유가 있지 않을까? 앱 중에서 urls.py 필요없는 경우도 있나?

```bash
cp root_dir/urls.py app/.

#tree를 해보면 copy 해온 urls.py가 생겼다.

.
├── db.sqlite3
├── manage.py
├── user
│   ├── admin.py
│   ├── apps.py
│   ├── __init__.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py      #복사해온 urls.py
│   └── views.py
└── westagram
    ├── asgi.py
    ├── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-38.pyc
    │   ├── settings.cpython-38.pyc
    │   ├── urls.cpython-38.pyc
    │   └── wsgi.cpython-38.pyc
    ├── settings.py
    ├── urls.py     #이 원본 urls.py를 app directory로 복사
    └── wsgi.py

4 directories, 19 files
```

## settings.py에 app 이름 넣기

- 해당 프로젝트에서 새로 만든 app을 연결시키고 참조할 수 있도록 하기 위한 작업이 필요하다.

```bash
#root_dir/settings.py

INSTALLED_APPS = [
    #'django.contrib.admin',
    #'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user'   #새로 추가하는 app의 이름을 하단에 기재
]
```