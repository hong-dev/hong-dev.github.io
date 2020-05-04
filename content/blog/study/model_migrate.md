---
title: "[Django] App(2); Model, migrate"
date: "2020-02-13T17:12:03.284Z"
template: "post"
draft: false
slug: "django/model_migrate"
category: "django"
tags:
  - "Django"
description: "model, migrate"
socialImage: ""
---
<p>

```bash
#현재 프로젝트 폴더
    
firstproject/  #하위 폴더 중 같은 이름의 폴더가 자동으로 생성되므로(mysite), 이름 바꿔도 됨
    manage.py

    polls/  #startapp으로 생성
            __init__.py
            admin.py
            apps.py  #PollsConfig 함수가 기본적으로 입력되어 있다.
                                    #이 함수 경로를 settings.py의 installed_apps에 추가해서 앱을 포함시킨다
            migrations/
                __init__.py
            models.py
            tests.py
            views.py  #결과를 실행할 함수들이 들어있음. request는 ip
                urls.py  #새로 생성한 파일. path가 view의 함수를 실행하도록 만듦.

    mysite/  #startproject으로 생성
        __init__.py
        settings.py
        urls.py  #최상위 URLconf에서 polls.urls 모듈을 바라보게 설정
        asgi.py
        wsgi.py
```

## views.py

```bash
import json
from django.views import View
from django.http import JsonResponse

class MainView(View):
    def get(self, request):
        return JsonResponse({"Hello":"World"}, status=200)
```

####[엔드포인트 뷰를 꾸릴 때 항상 사용하게 되는 대표적인 요소들]

1) **json**은 json 데이터를 처리하기 위해 import 한다.\
JSON(JavaScript Object Notation)은 인터넷에서 자료를 주고받을때 널리쓰이는 데이터타입
2) **View 클래스**는 직접 생성하지 않고 장고 프레임워크에 내장된 클래스를 상속받아 쓴다.
3) **JsonResponse**는 서버의 요청에 대한 응답을 Json으로 응답하기 위해 사용한다.


##### MainView 클래스는 View 클래스의 서브클래스.
View 클래스의 속성 및 메소드까지 다 상속 받아서 사용가능하다.\
원래 존재하는 메소드인데 서브클래스에서 새로 정의할 경우에는 덮어씌우기가 된다.

## urls.py

```bash
from django.urls import path
from main.views  import MainView

urlpatterns = [
    path('', MainView.as_view())
]
```

- path는 장고에서 url 경로를 처리하기 위한 모듈
- views.py에서 작성한 MainView 클래스를 import
- 장고에서 경로를 명시할 때 항상 'urlpatterns'와 같은 리스트 안에 경로를 저장하고 읽어 들인다.무조건 'urlpatterns'라는 이름으로 쓰는 게 규칙이며, 다르게 쓰면 에러가 난다.
- MainView 클래스에 내장된 as\_view() 함수를 실행\
 as_view() 메소드는 현재 주소인 나를 호출하면 그 호출을 한 http 메소드가 GET인지 POST인지 DELETE인지 UPDATE인지 등을 판별해서 그에 맞는 함수를 실행시켜준다.\
 http method는 http 통신과 관련된 것이고, views.py에 존재한다.\
 겉으로 보이지는 않지만 장고에 내재되어 있는 method이다.

### Httpie

- Http 메소드를 전송할 수 있는 프로그램

```bash
#설치방법 Ubuntu
sudo apt install httpie

#설치방법 Mac
brew install httpie
```



### ORM

- 장고는 별도로 DB를 설치하지 않아도 `SQLite3`라는 경량화 된 DB를 제공한다. 그리고 이를 컨트롤 하기 위해 `ORM`을 제공한다.

    Object Relational Mapping, ORM을 통해 객체 간의 관계를 바탕으로 SQL을 자동으로 생성하여 불일치를 해결한다.
    데이터베이스 데이터 <—매핑—> Object 필드 객체를 통해 간접적으로 데이터베이스 데이터를 다룬다.

    ORM을 사용하면서 원하는 모델을 작성하고 다루는 곳이 models.py 파일. DATABASE를  잘 몰라도 models.py 를 통해 DB를 관리할 수 있다.

## Model 만들기

- model이란: 부가적인 메타데이터를 가진 데이터베이스의 구조(layout)

    ```
    [Metadata]

    data에 대한 data. 속성정보
    data를 표현하기 위한 목적(ex.HTML)과 data를 빨리 찾기 위한 목적으로 주로 사용
    database에서는 data의 index구실을 하므로, data를 빨리 찾을 수 있다.
    ```

- 저장하는 데이터의 필수적인 필드들과 동작들을 포함하고 있다.\
데이터 모델을 한 곳에서 정의하고, 이것으로부터 자동으로 뭔가를 유도하는 것이 목표

- Django는 DRY 원칙을 따른다.
```
    [DRY 원칙]: 반복하지 말 것
    고유한 개념 및 데이터는 단 한 번, 단 한 곳에 존재하는 것으로 족한다.
    중복성은 나쁜 것, 정규화는 좋은 것
    Django는 이 원칙에 따라 최소한의 것들을 가지고 최대한의 것을 만들어내도록 한다.
```

- Database의 각 필드는 Field 클래스의 인스턴스로서 표현된다.
    1) `class CharField(max_length=None, **options)`:\
    문자(character) 필드를 표현. 각 필드가 어떤 자료형을 가질 수 있는지 django에게 말해준다.

    2) `class DateTimeField(auto_now=False, auto_now_add=False, **options)`:\
    날짜와 시간(datetime) 필드를 표현. 각 필드가 어떤 자료형을 가질 수 있는지 django에게 말해준다.

    3) `class ForeignKey(to, on_delete, **options)`: 관계설정\
    `to`; model과 연관되는 class명
    `on_delete=models.CASCADE`; ForeignKey가 바라보는 값이 삭제될 때, ForeignKey를 포함하는 model instance(row)도 삭제된다.

```bash
#polls/models.py

from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
                                #question_text;이게 필드이며, database의 column명으로 사용된다.
                                #아니그럼... CharField 이건 뭐야? 다 field라고 붙는데??
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

- model에 입력된 정보를 가지고 django는:

    1) 이 앱을 위한 database schema 생성(CREATE TABLE 문)

    2) Question과 Choice 객체에 접근하기 위한 Python database 접근 API 생성

## Django에게 app이 포함된 것을 알게 하기

- polls/apps.py의 PollsConfig 함수를 settings.py에 추가해준다

```bash
#mysite/settings.py

INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

## models.py를 변경시킨 후 적용하기

### 1) migrations를 만들고; 틀(table) 만들기

```bash
#firstproject; 가장 상위의 directory에서 입력

$ python manage.py makemigrations polls
```

- model을 생성했거나 변경했다고 알려주고, 이 변경사항을 migration으로 저장하겠다는 것을 django에게 알려준다.

![migrations](https://user-images.githubusercontent.com/53142539/77429274-bd29e300-6e1c-11ea-9b25-d68f84816504.png)

### 2) migrate를 해준다; 실제로 실행

```bash
#firstproject; 가장 상위의 directory에서 입력

$ python manage.py sqlmigrate polls 0001
                                #이건 실제로 run the migration 하는 게 아니라 보여주기만 하는 것

$ python manage.py migrate  #초기 세팅할 때 했던 명령과 같다.
```

- 아직 적용되지 않은 migrations를 모두 수집해 실행한다.

![migrations](https://user-images.githubusercontent.com/53142539/77429273-bc914c80-6e1c-11ea-8914-be9deeb46a8e.png)

### makemigrations와 migrate의 차이

- `makemigrations`

    -models.py에서 생성, 변경한 내용으로 테이블의 틀을 만들어 놓는다.\
    -테이블 모양과 구조 등만 잡아줄 뿐 실제로 테이블이 생기는 것은 아니다.

- `migrate`

    -makemigrations만 한다고 테이블이 생기는 게 아니다.\
    -migrations를 실행(run)해서 실제 database query에 날려서 data를 저장하고 테이블을 만드는 명령어.\
    -model에서의 변경 사항들과 database schema의 동기화가 이루어진다.


##### [요약] model 생성 및 변경 순서

1) `app_name.models.py`에서 model을 생성 및 변경한다.
2) `python manage.py makemigrations`로 이 변경사항에 대한 migration을 만든다.
3) `python manage.py migrate`로 변경사항을 database에 적용한다.

## Shell

- 대화식 python shell

```bash
$ python manage.py shell
```

## 개발 서버 동작시키기

```bash
    $ python manage.py runserver
```

## 관리자 생성하기

```bash
    $ python manage.py createsuperuser
```

## request.POST

- 키로 전송된 자료에 접근할 수 있도록 해주는 사전과 같은 객체
- request.POST의 값은 항상 문자열

## date class 관련

![date](https://user-images.githubusercontent.com/53142539/77429272-bbf8b600-6e1c-11ea-8379-069de6af2f00.png)

![date2](https://user-images.githubusercontent.com/53142539/77429270-bac78900-6e1c-11ea-9a0e-7c43f1bb4904.png)

<p>

```
Reference:
- https://docs.djangoproject.com/ko/3.0/intro/tutorial02/
- https://docs.djangoproject.com/ko/3.0/misc/design-philosophies/#dry
- https://lee-seul.github.io/django/backend/2018/01/28/django-model-on-delete.html
```