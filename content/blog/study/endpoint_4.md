---
title: "[Django] Create Endpoint(4); sign-up, log-in, comments"
date: "2020-02-15T15:12:03.284Z"
template: "post"
draft: false
slug: "django/endpoint_4"
category: "django"
tags:
  - "Django"
  - "Endpoint"
description: "회원가입, 로그인, 댓글올리기 관련하여 endpoint 만들기: views.py"
socialImage: ""
---


## views.py에서 function 만들기

```
[App 만드는 순서]
models.py ⇒ views.py ⇒ urls.py
```

- 작성된 models를 가지고 data를 어떻게 가져오고 보내줄지에 대한 로직을 작성한다.
    - `json.loads(request.body)` : request.body에 담겨있는 data를 가져와서 python이 알 수 있는 언어로 바꿔준다. dictionary로 나온다.
    - get 함수에서 .objects.values()를 사용하지 않고 for문으로 작성한다면 다음과 같다.

```bash
#app_name/views.py

import json
from .models      import User   #models.py에서 만든 User class(user 정보가 담길 틀)
from django.views import View
from django.http  import HttpResponse, JsonResponse   #response를 할 때 사용

class UserView(View):
    def post(self, request):
        user_data = json.loads(request.body)
        User(
            name     = user_data['name'],
            email    = user_data['email'],
            phone    = user_data['phone'],
            password = user_data['password']
        ).save()

        return JsonResponse({'message':'Thank you for signing up!'}, status=200)
    
    def get(self, request):
        user_data = User.objects.all()
        users = []
        for user in user_data:  #하나의 객체씩 나온다.
            users.append({
                'name'     : user.name,
                'email'    : user.email,
                'phone'    : user.phone,
                'password' : user.passward
            })

            return JsonResponse({'users':users}, status = 200)
```

- get 함수에서 `.objects.values()`를 사용하여 작성한다면 코드가 훨씬 짧아진다.

* 다른 메소드들은 값이 object(객체)로 return 되는데, values()는 dictionary로 return 된다.

```bash
#app_name/views.py

import json
from .models      import User   #models.py에서 만든 User class(user 정보가 담길 틀)
from django.views import View
from django.http  import HttpResponse, JsonResponse   #response를 할 때 사용

class UserView(View):
    def post(self, request):
        user_data = json.loads(request.body)
        User(
            name     = user_data['name'],
            email    = user_data['email'],
            phone    = user_data['phone'],
            password = user_data['password']
        ).save()

        return JsonResponse({'message':'Thank you for signing up!'}, status=200)
    
    def get(self, request):
        account_data = Account.objects.values()
        return JsonResponse({'accounts':list(account_data)}, status=200)
```

### post vs get

- `post`는 사용자가 data를 request에 담아서 주면, 그걸 가지고 뭔가를 처리할 때
- `get`은 request에 data를 넣어주지 않는다. 그냥 기존에 있는 db의 data 가지고 뭔가를 처리할 때
- 로그인 기능은 post method!\
    사용자가 data를 request에 담아서 주면, 그 정보를 가지고 일치하는지 처리하는 과정이기 때문이다.