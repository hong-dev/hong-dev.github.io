---
title: "[Django] westagram views.py code review"
date: "2020-02-18T11:12:03.284Z"
template: "post"
draft: false
slug: "django/westagram_review"
category: "django"
tags:
  - "Django"
description: "회원가입, 로그인, 댓글 View 작성하기"
socialImage: ""
---

```
회원가입, 로그인, 댓글 View 작성하기
```

### 1. App 분리

- Account(User정보)랑 Comment랑 app을 분리해야 한다.\
    App을 분리하면 문제가 생겼을 때 빨리 찾을 수 있다.\
    App 분리는 어떤 기준으로 하는 게 좋을지 처음에 잘 생각하는 것이 좋다.\
    레거시(Legacy)를 개선할 때 이런 식의 app 분리 작업이 진짜 많다.

### 2. jsonresponse

- jsonresponse({"message":""})는 user의 화면에 띄우는 것이 아니라 front에게 보내주는 것이다.\
    보안을 위해서라도 message는 웬만하면 보내지 않는 것이 좋다.

- message를 보낼 때는, 대문자_연결 로 보내주는 것이 좋다. USER_DOES_NOT_EXIST 이런식으로. 그래야 프론트에서 읽기 좋겠지?
- jsonresponse는 body에 데이터를 넣어서 보내는 것이고, httpresponse는 body에 데이터가 없고, header에 데이터(status)를 넣어서 보내준다.

### 3. sign-up 으로 했으면, log-in 보다는 sign-in

### 4. class based view / function based view

- class based view : class 걸어 놓고, get, post 이런 거 해놓고, as_view만 쓰면 다 알아서 해준다.
- function based view(함수형 뷰) : 다 수동이다. 어떻게 get인지 post인지 체크해서 실행시키는 것 모두 다 개발자가 해야한다.

### 5. Secure coding

- endpoint가 거기서 거기지 라는 생각은 오산!
- 검증을 잘해야 하고, 검증을 잘 할수록 보안장비를 싼 것으로 쓸 수 있다.
- secure coding은 계속 해야하는 것

### 6. KEY ERROR

- key들이 잘 넘어왔나 아닌가를 체크하는 것으로, 항상 따라다녀야 하는 검증이다.
- try-exception으로 처리한다.

### 7. import 작성 방법

- 적는 순서: 기본 패키지 ⇒ 내가 만든 것 ⇒ 장고에서 가져오는 것
- import만 적는 것은, 웬만하면 콤마를 쓰지말고 한줄한줄 import 하게 한다.

### 8. Convention

- 가독성을 위해 띄어쓰기를 맞춰준다.

### 9. DB에 있는 지 체크

- db의 전체 data를 하나하나 for문으로 돌린다는 건 매우매우 불필요한 작업
- `exists()` 라는 좋은 함수가 있다!

```python
class LoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if Account.objects.filter(email = data['email']).exists():
                user = Account.objects.get(email=data['email'])
                if user.password == data['password']:
                    return HttpResponse(status = 200)
                return HttpResponse(status = 401)  #비번 틀림
            return HttpResponse(status = 400)  #없는 계정
        except KeyError:
            return JsonResponse({"message":"INVALID_KEYS"}, status = 400)  #입력값X
```


### 10. 코드 생략하기

- 줄일 수 있는 코드는 줄이자.
- else 같은 경우는 굳이 없어도 될 때가 많으니 잘 생각하고 넣자.\
    코드를 작성할 때, **이게 어떤 의미가 있는지 꼭 필요한 것인지**를 생각하자!

### 11. filter()의 and/or

- name, email, phone 중에 하나로 로그인 가능하도록 구현하기
- `User.objects.filter(name="aaa")` 의 방식으로 진행할 때, 콤마(`,`)는 and를 의미한다.
- filter() 함수에서 or를 사용하려면 `Q`를 쓸 수 있다.\
    Q를 쓸려면 미리 import 해야한다.
- user_data는 dictionary로 넘어온다.


```python
from django.db.models import Q

class LoginView(View):
    def post(self, request):
        user_data  = json.loads(request.body)

        user_name  = user_data.get('name', None)
        user_email = user_data.get('email',None)
        user_phone = user_data.get('phone',None)

        if User.objects.filter(Q(name=user_name)|Q(email=user_email)|Q(phone=user_phone)).exists():
            user = User.objects.filter(Q(name=user_name)|Q(email=user_email)|Q(phone=user_phone))[0]
            if user_data['password'] == user.password:
                return HttpResponse(status = 200)
            return HttpResponse( status = 400)
        return HttpResponse(status = 400)
```

### 12. migrate 오류

- app 분리를 하고 migrate를 했는데, 이미 있는 table이라는 에러가 나왔다.

    원인은, 기존의 app에서 만들었던 table이 있는데, 새로운 app에서 같은 table을 만들려고 하니 이미 있다는 에러가 나온 것.

- 아래의 방법으로 initial migration을 이미 진행한 것처럼 fake 처리하여 진행했더니 성공이다.

    근데 문제는, 기존 app에서 만들었던 db 내용이 사라졌다는 것.\
    그냥 옮겨올 수 있을 줄 알았는데, 기존 app의 테이블을 delete 하고 새로운 app의 table이 만들어지고 db가 비어진 채로 생성되었다..

```bash

$ python manage.py migrate --fake-initial
```


참조: [[Django] Django 마이그레이션 초기화하기](https://yuda.dev/216)

---

### 회원가입 및 로그인 view 수정 완료

```python
# user/views.py

from .models import User

from django.views import View
from django.http  import HttpResponse, JsonResponse
from django.db.models import Q


class UserView(View):
    def post(self, request):
        user_data = json.loads(request.body)
        User(
            name     = user_data['name'],
            email    = user_data['email'],
            phone    = user_data['phone'],
            password = user_data['password']
        ).save()

        return HttpResponse(status=200)

    def get(self, request):
        user_data = User.objects.all()
        users     = []
        for user in user_data:
            users.append({
                'name'     : user.name,
                'email'    : user.email,
                'phone'    : user.phone, 
                'password' : user.password
            })

        return JsonResponse({'users':users}, status = 200)

class LoginView(View):
    def post(self, request):
        user_data  = json.loads(request.body)

        user_name  = user_data.get('name', None)
        user_email = user_data.get('email',None)
        user_phone = user_data.get('phone',None)

                try:
                if User.objects.filter(Q(name=user_name)|Q(email=user_email)|Q(phone=user_phone)).exists():
                user = User.objects.filter(Q(name=user_name)|Q(email=user_email)|Q(phone=user_phone))[0]
                if user_data['password'] == user.password:
                    return HttpResponse(status = 200)
                return HttpResponse( status = 400)
            return HttpResponse(status = 400)
                except KeyError:
                        return JsonResponse({"message":"INVALID_KEYS"}, status = 400)
```

### Comment view 수정 완료

```python
# comment/views.py

import json
    
from .models     import Comment
from user.models import User

from django.views import View
from django.http  import HttpResponse, JsonResponse

class CommentView(View):
    def post(self, request):
        user_data   = json.loads(request.body)
        try:
            if User.objects.filter(name = user_data['name']).exists():
                Comment(
                    name    = user_data['name'],
                    comment = user_data['comment']
                ).save()
                return HttpResponse(status=200)
            return HttpResponse(status=400)
        except KeyError:
            return HttpResponse(status=400)

    def get(self, request):
        comment_data = Comment.objects.values()
        return JsonResponse({'comments':list(comment_data)}, status=200)
```