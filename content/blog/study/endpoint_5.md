---
title: "[Django] Create Endpoint(5); sign-up, log-in, comments"
date: "2020-02-15T16:12:03.284Z"
template: "post"
draft: false
slug: "django/endpoint_5"
category: "django"
tags:
  - "Django"
  - "Endpoint"
description: "회원가입, 로그인, 댓글올리기 관련하여 endpoint 만들기: urls.py"
socialImage: ""
---

<p>

```
[App 만드는 순서]
models.py ⇒ views.py ⇒ urls.py
```

## urls.py 에서 path 추가하기

### Root directory의 urls.py에서 app으로 path 설정하기

- request가 오면 가장 먼저 root directory의 urls.py에서 처리를 한다.\
    그리고 urlpatterns에서 해당되는 path가 있으면 해당 app의 urls.py로 이동할 수 있도록 보낸다.

- root_dir/urls.py는 app들의 urls.py가 다 연결되어 있어야 한다. main page는 우리가 결정하는 것이 아니므로, path('', )와 같은 main page는 고려하지 않는다. 우리는 그냥 app들의 기능들을 가져와서 엔드포인트를 만들어주는 것일뿐!
- include를 사용할 것이므로, include를 import 해주는 것을 잊지 않기!

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
from django.urls import path, include

urlpatterns = [
        path('user', include('user.urls'))
]
```

### App directory의 ulrs.py에서 views.py의 로직으로 path 설정하기

- views.py에 있는 class의 함수들을 참조하기 위해서는 class를 import 해야한다.

```bash
#app_dir/urls.py
    
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
from django.urls import path
from .views import UserView

urlpatterns = [
        path('/sign-up', UserView.as_view()),
        path('', UserView.as_view())
]
```

* 주소 url에 slash(/)가 겹치지 않도록:
root(main)의 urls에서 뒤에 slash를 붙이지 않고, app의 urls에는 앞에 slash를 붙인다.
* django가 처음에는 8000/ 이렇게 알아서 붙여주므로, root urls에서는 앞에 붙이지 않는다.