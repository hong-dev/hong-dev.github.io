---
title: "Logout API using Cache"
date: "2020-05-25T11:12:03.284Z"
template: "post"
draft: false
slug: "logout"
category: "django"
tags:
  - "Django"
  - "API"
  - "Cache"
description: "Cache를 활용한 Logout API"
socialImage: ""
---


Login과 Logout을 구현할 때 다음과 같은 절차로 진행한다.  
1. `Front` : 아이디와 비밀번호를 담아 log-in 요청
2. `Back`  : 정보를 확인 후 로그인 성공 시 access-token 발행
3. `Front` : 전달 받은 access-token을 browser storage에 저장 (쿠키 혹은 세션 스토리지)

4. `Front` : storage에 저장되어 있는 token을 request.headers에 담아서 원하는 정보를 요청
5. `Back`  : token을 확인해서 요청한 정보를 return

6. `Front` : user가 log-out을 하면, browser storage에 저장되어 있는 token을 삭제

<br>

위의 방법을 보면, 서버에 로그아웃 요청을 따로 하지 않아도 front에서 token 삭제로 구현이 가능하다.  
즉, browser storage의 관리는 front가 하고, backend는 그 session에 접근하지 못한다.

<br>

그렇다면 backend에서 access-token 만료와 log-out을 관리할 수는 없을까?

> ## Cache(캐시)
> 한 번 사용했던 데이터를 저장하여, 다시 사용할 때 빠르게 가져올 수 있도록 한다.  
> 입출력이 잦거나 자주 바뀌는 정보 같은 경우에는 database에 저장하면 속도와 보안 문제가 생길 수 있다.  
> 그래서 임시로 저장할 수 있는 공간에 저장해서 빠르게 꺼내쓸 수 있도록 한다.

<br>

## LOGIN
* [1] django에서 cache를 사용하려면 import 해야한다.
* 로그인할 때 front로 token을 바로 넘겨주는 것이 아니라, cache에 token을 저장하고 token을 열 수 있는 열쇠를 넘겨준다.
* token과 열쇠는 `cache.set(key, token)` 를 사용하여 둘을 묶어서 캐시에 저장한다.
* [2] 열쇠는 token과 마찬가지로 쉽게 해킹되지 않는 정보여야 하므로, random으로 user_number를 만들어서 저장했다.

```python
from django.core.cache import cache  #---[1]

class LogInView(View):
    def post(self, request):
        token = jwt.encode({'email' : user.email},
                            SECRET_KEY,
                            algorithm = 'HS256'
                          ).decode('utf-8')

        user_number = random_number_generator()  #---[2]
        cache.set(user_number, token)

        return JsonResponse({"token" : user_number}, status = 200)
```

<br>

## LOGOUT
* token과 열쇠가 서로 매치되어 cache에 저장되어 있는데, `cache.delete(key)` 를 사용하여 그 캐시를 삭제하면 열쇠와 token의 연결고리가 사라진다.
* front에서 열쇠를 넘겨준다고 해도 이미 캐시가 삭제되었기 때문에, token과 매치되었던 그 열쇠는 이제 사용할 수 없다.


```python
from django.core.cache import cache

class LogOutView(View):
    @login_required
    def get(self, request):
        cache.delete(request.token)
        return HttpResponse(status = 200)
```

<br>

##  💬
* 로그인 할 때마다 새로운 랜덤 번호를 생성하는 것이 효율적일까?  
회원가입을 할 때 랜덤 회원번호를 생성하고, 그걸 database에 넣어두고 그걸 token의 열쇠로 사용하는 것은 어떨까?  
그렇게 한다면 여러 개의 기기에 로그인을 해놓은 경우, 한 기기에서 로그아웃을 한다면 모든 기기가 로그아웃 되는 현상이 생길 것이다.  
이런 이유로 여기에서는 로그인 할 때마다 새로운 번호를 생성해서 각 기기별로 다른 열쇠들을 가지도록 하였다.