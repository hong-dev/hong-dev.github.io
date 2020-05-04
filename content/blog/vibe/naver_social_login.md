---
title: "Naver Social Log-in"
date: "2020-03-24T11:12:03.284Z"
template: "post"
draft: false
slug: "naver_social_login"
category: "python"
tags:
  - "Python"
  - "Django"
  - "Social Login"
  - "VIBE"
  - "Project"
description: "Naver Social Log-in"
socialImage: ""
---




#### [Naver Social Login Unit test code](http://hong-dev.github.io/posts/project_vibe/unittest/naver_social_login)

Vibe는 기본적으로 Naver의 자회사여서 회원가입 자체가 네이버 회원가입이며, 로그인 또한 네이버를 통하는 방법으로 진행하고 개별 회원가입과 로그인은 따로 없다.

네이버 소셜로그인을 진행하기 위해, 네이버 개발자센터에서 앱 사용 등록을 해야한다.

### Social Log-in
**1)** 프론트에서 아이디와 비밀번호를 입력해서(body) 네이버에 요청(request)을 보내면, 네이버에서 네이버 계정이 맞다는 token을 보내준다.

**2)** 프론트는 네이버에서 받은 token을 request.headers에 담아 백엔드로 전달해준다.

**3)** 백엔드는 프론트가 보내준 token을 headers에 담아 네이버로 요청을 하고, 네이버는 token을 확인한 후 회원정보를 response한다.


### requests format
* [네이버 개발자센터 (Naver Developers)](https://developers.naver.com/docs/login/profile/)에서 회원 프로필을 가져올 수 있는 방법이 자세하게 적혀있다.
* Bearer, url 등 네이버에 requests를 보낼 때의 format은 네이버 개발자 센터에서 요청한대로 적어주면 된다.

### Timeout
* request를 보내고 response를 받기까지 시간이 너무 오래걸릴 경우에, timeout을 사용하여 네트워크를 계속 기다리지 않고 멈출 수 있도록 설정한다.
* 기본적으로 requests는 timeout이 설정되어 있지 않아서, return을 받지 않으면 무기한으로 기다릴 것이다.



```python
# user/views.py

class NaverSignInView(View):
    def get(self, request):
        naver_token = request.headers.get('Authorization', None)

        header = {'Authorization' : f"Bearer {naver_token}"}
        url = "https://openapi.naver.com/v1/nid/me"

        try:
            response = requests.get(url, headers = header, timeout = 2)
            user_data = response.json()['response']

            if User.objects.filter(naver_id = user_data.get('id')).exists():
                user = User.objects.get(naver_id = user_data.get('id'))
                token = jwt.encode({"user_id": user.naver_id}, SECRET_KEY['secret'], algorithm = 'HS256').decode('utf-8')

                return JsonResponse({"token": token,
                                     "user" : {"nickname": user.nickname, "image": user.image}}, status = 200)

            else:
                User(
                    naver_id    = user_data.get('id'),
                    nickname    = user_data.get('nickname'),
                    name        = user_data.get('name'),
                    email       = user_data.get('email'),
                    image       = user_data.get('profile_image'),
                    birthday    = datetime.strptime(user_data.get('birthday'), "%m-%d").date(),
                    gender      = user_data.get('gender'),
                ).save()

                user = User.objects.get(naver_id = user_data['id'])
                token = jwt.encode({"user_id": user.naver_id}, SECRET_KEY['secret'], algorithm = 'HS256').decode('utf-8')

                return JsonResponse({"token": token,
                                     "user" : {"nickname": user.nickname, "image": user.image}}, status = 200)

        except KeyError:
            return JsonResponse({"message": "INVALID_KEYS"}, status = 400)

```


<br>

Reference:
https://stackabuse.com/the-python-requests-module/