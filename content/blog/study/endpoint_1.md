---
title: "[Django] Create Endpoint(1); sign-up, log-in, comments"
date: "2020-02-14T09:12:03.284Z"
template: "post"
draft: false
slug: "django/endpoint_1"
category: "django"
tags:
  - "Django"
  - "Endpoint"
description: "회원가입, 로그인, 댓글올리기 관련하여 endpoint 만들기: startproject, settings.py 수정"
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
회원가입, 로그인, 댓글올리기 관련하여 endpoint 만들기
</div>

## Web Server

- Response; 요청을 받아서 뭔가를 준다.
- body에 데이터를 담아서 주고받는다.
- http protocol을 사용하여 통신을 한다.
- http; 서버 80번, https: 443

- django를 사용해서 프론트에서 오는 http request를 받아서 다시 response 해주면 된다.

    ```python
    #이런 형식으로 request-response 가능

    def function(request)
        return
    ```

#### JSON
- 프론트와 데이터를 주고 받을 때에는 JSON 타입의 데이터를 가장 많이 쓴다.
- JSON은 프론트와의 소통을 위해서만 쓰고, DB랑 데이터를 주고 받을 때에는 python 언어를 쓴다. 물론, 데이터 때려박기식의 NoSQL 같은 걸 쓰면 DB랑 데이터 주고받을 때도 key, value 형식으로 JSON 타입이 사용될 수도 있다.



---

```
[새 프로젝트 시작]
가상환경 설치 ⇒ django 설치 ⇒ start project ⇒ project.settings.py ⇒ start app

[App 만드는 순서]
models.py ⇒ views.py ⇒ urls.py
```


## 가상환경 만들기 + 장고 설치

- 프로젝트마다 별개의 가상환경을 새로 만들 것을 권장한다.
- 가상환경마다 django를 새로 설치해야 한다.

```bash
conda create -n instagram python=3.8
pip -V          #가상환경의 python version 확인 가능

pip install django
django-admin    #장고 설치되어 있는지 확인 가능
```

## 새 프로젝트 만들기

- 원하는 디렉토리로 가서 프로젝트 생성
- home에 바로 만들기 보다는 project를 한곳에 모아두는 디렉토리를 하나 만든 후 안에 넣는 걸 권장

```bash
django-admin startproject project_name
```

## Tree 실행

- project가 잘 만들어졌는지 tree를 실행해본다.
- tree는 default로 설치되어 있는 것이 아니기 때문에 새로 설치를 해야한다.

```bash
#mac에서 설치
brew install tree

#ubuntu에서 설치
sudo apt install tree
```
<p>

```bash
#westagram 디렉토리에서 tree 명령어 입력

.    #이 최상위 디렉토리의 이름도 westagram
├── manage.py
└── westagram   #root directory
    ├── asgi.py
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py

1 directory, 6 files
```

- `.` 으로 나타난 최상위 directory가 프로젝트 directory인데, 하위의 directory에도 같은 이름이 있다. 헷갈릴 경우에는 최상위 directory이름을 바꿔도 된다. 최상의 directory는 껍데기일뿐, 그 아래의 directory가 실제 가장 중요한 핵심 directory다.

    ```bash
    #맨 뒤에 .을 붙여주고 현재 디렉토리에 바로 생성해준다.

    django-admin startproject project_name .
    ```

- `manage.py` : django-admin 명령어와 같은 역할을 한다. 실행해주는 역할.\
프로젝트 만들 때는 django-admin을 사용했는데, 이제부터는 프로젝트 안에서 진행을 하게 되니 manage.py를 사용하면 된다.

- `asgi.py` : Asynchronous Server Gateway Interface. 비동기 통신을 할 수 있도록 해준다. 실시간 메시지, socket 통신, 핸드폰 push 기능 등에서 활용된다. js는 언어자체가 비동기 통신이다. 이 프로젝트에서는 사용하지 않는다.
- `wsgi.py` : Web Server Gateway Interface. python으로 웹서비스를 만들때 표준으로 쓰는 인터페이스. 프레인워크든 라이브러리든 다 가지고 있다.

---

## project/settings.py (사전작업)

- project 전체의 setting을 보면서, 필요없는 것은 주석처리하고 필요한 건 추가하면서 기본 setting을 한다.

- 이 프로젝트에 적용된 Django version을 알 수 있다. 낮은 버전의 django는 startproject 했을 때 asgi.py 등을 생성 안 해줄 수가 있다.
```bash
Generated by 'django-admin startproject' using Django 3.0.3.
```

- path를 알려준다.
```bash
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
```

- django는 기본적으로 admin(관리자)과 auth(회원정보) 기능을 제공한다.\
공개하지 않는 secret key라서, 해킹의 위험 때문에 git에는 올리지 않는다.
```bash
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'h939u-wwx6c1zsk!@aalkvnz6e&-9#iv*gx(24q0cjar(lyg1%'
```

- DEBUG: error가 뜨면 django가 해결방법을 추천해주거나 하면서 자세하게 알려주는 기능.\
개발할 때는 매우 좋은 기능이지만, 상용화 되고 있을 때는 해킹의 위험이 있으므로 주의한다.\
개발할 때는 True, 상용화 하면 False로 설정한다.
```bash
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
```

- ALLOWED_HOSTS : 접근할 수 있는 IP를 제한할 수 있다.\
default 빈칸이면 나만 볼 수 있고 외부접근이 안된다.\
`'*'`는 누구나 볼 수 있게 설정된다.
```bash
ALLOWED_HOSTS = []  #외부접근 불가
ALLOWED_HOSTS = ['*']  #누구나 접근 가능
```

- INSTALLED_APPS : django가 참조하고 사용할 app list\
여기에서는 admin 기능은 사용하지 않고, 회원가입과 로그인 기능도 직접 구현할 것이므로 admin과 auth를 주석처리한다.
```bash
# Application definition
INSTALLED_APPS = [
    'django.contrib.admin', #주석처리(관리자 설정)
    'django.contrib.auth',  #주석처리(회원가입,로그인 기능)
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

- MIDDLEWARE
    - csrf : 페이지 보안 관련된 것. 내가 제공한 페이지에서 작업을 하는 건지, 변조를 해서 해킹을 하고 있는 것인지 체크하는 것. 그러나 여기서는 페이지를 사용하지 않기 때문에 주석처리 한다. (주석처리 안하면 자꾸 뭐 필요하다고 에러가 뜰 것이다.)
    - auth : 이 기능은 위에서도 언급했듯이, 회원가입 및 로그인 등의 django 제공 기능을 사용하지 않기 때문에 주석처리 한다.
```bash
    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',  #주석처리
        'django.contrib.auth.middleware.AuthenticationMiddleware', #주석처리
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]
```

- ROOT_URLCONF : 기준이 되는 경로\
    웬만하면 바꾸지 않는다.
```bash
    ROOT_URLCONF = 'westagram.urls'
```

- TEMPLATES : 페이지를 만들 때 필요한 기능으로, 여기서는 사용하지 않고 그냥 둔다.\
template은 2세대(front와 back이 같이 합쳐져 있을때) 때 사용했던 것이고 이제 쓸 일이 없다.
```bash
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]
```

- WSGI_APPLICATION : wsgi 관련한 기능으로 django에서 기본으로 설정해준다.
```bash
    WSGI_APPLICATION = 'westagram.wsgi.application'
```

- DATABASES : db 관련한 정보\
   django에서는 db를 따로 만들지 않아도 sqlite3라는 가벼운 db를 기본 제공해준다.\
    즉, django는 db가 없으면 작동되지 않는다는 것을 의미한다.\
    여기서는 sqlite3를 사용할 것이므로 그냥 두지만, 따로 db를 만들었다면 수정하면 된다. 여러 개의 db도 관리 가능하다.

- ENGINE : 접속기
```bash
    # Database
    # https://docs.djangoproject.com/en/3.0/ref/settings/#databases
    
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
```

- AUTH\_PASSWORD_VALIDATORS : django에서 기본으로 제공해주는 auth 기능 중 하나이다.\
    password를 입력할 때 최소 길이 등을 체크할 수 있는 기능이다.\
    여기서는 django가 제공하는 auth의 기능을 사용하지 않을 것이므로 그냥 둔다.
```bash
    # Password validation
    # https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators
    
    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]
```

- 언어와 시간 관련한 설정
```bash
    # Internationalization
    # https://docs.djangoproject.com/en/3.0/topics/i18n/
    
    LANGUAGE_CODE = 'en-us'  #한국어는 'ko'
    
    TIME_ZONE = 'UTC'        #한국시간은 'Asia/Seoul'
    
    USE_I18N = True          #여러 언어를 support 하기 위한 기능
    
    USE_L10N = True          #여러 언어를 support 하기 위한 기능
    
    USE_TZ = True            #Timezone을 사용하겠다.
```

- 2세대 인터넷 시대에 사용했던 것
```bash
    # Static files (CSS, JavaScript, Images)
    # https://docs.djangoproject.com/en/3.0/howto/static-files/
    
    STATIC_URL = '/static/'
```

- APPEND_SLASH : urls.py에서 path의 맨 뒤에 '/'가 붙어있지 않으면 django에서 자동으로 붙여주는 기능. 이걸 false로 해놓으면 warning이 안 뜬다.
```bash
    ##Stop Warning about '/'
    APPEND_SLASH=False
```