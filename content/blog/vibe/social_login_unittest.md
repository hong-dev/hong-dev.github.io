---
title: "Unit test : Naver Social Log-in"
date: "2020-03-25T11:12:03.284Z"
template: "post"
draft: false
slug: "unittest/naver_social_login"
category: "django"
tags:
  - "Python"
  - "Django"
  - "Social Login"
  - "Unit test"
  - "VIBE"
  - "Project"
description: "Unit test(tests.py) : Naver Social Log-in"
socialImage: ""
---



#### [Naver Social Login original API code](http://hong-dev.github.io/posts/project_vibe/naver_social_login)

### Unit test
Django에서는 Unit test를 위한 모듈을 제공하고 있다.\
startapp을 만들면 자동으로 생성되는 `tests.py`에 작성하고,\
test를 실행할 때는 `python manage.py test`로 모든 test를 돌려볼 수 있다.
모든 api를 직접 request/response를 보내볼 수 없기 때문에, unit test는 runserver를 하지 않아도 test 가능하도록 만드는 것이 목적이다.

### Mocking
소셜 로그인을 실행하려면 해당 소셜 사이트와의 api request와 response가 있어야 하는데, unit test는 요청을 보내지 않고 테스트를 해야하므로 mock data로 테스트를 진행한다.

* `@patch()` : 괄호 안에 있는 것을 중간에서 바꿔치기 하겠다는 의미\
아래의 경우에는 user/views.py에 있는 requests를 mock data로 대체하겠다는 것

* `MagicMock(return_value)` : return\_value에 해당하는 값으로 mocking 하겠다는 의미\
아래의 경우에는 request.get을 return_value값으로 대체하겠다는 것

### HTTP_Authorization
* unittest에서는 그냥 Authorization으로 적으면 작동을 안하고, HTTP_Authorization으로 적어야 한다.

```python
# user/tests.py

from unittest.mock import patch, MagicMock

class NaverSignInTest(TestCase):
    client = Client()
    def setUp(self):
        Theme.objects.create(
            id   = 1,
            name = "기본테마"
        )

    def tearDown(self):
        Theme.objects.all().delete()

    @patch('user.views.requests')
    def test_user_signin_success(self, mocked_request):
        class NaverResponse:
            def json(self):
                return {
                    "resultcode": "00",
                    "message": "success",
                    "response": {
                        "email": "test@email.com",
                        "nickname": "test_nickname",
                        "profile_image": "test_image",
                        "age": "20-29",
                        "gender": "F",
                        "id": "12345678",
                        "name": "test_name",
                        "birthday": "10-11"
                    }
                }
        mocked_request.get = MagicMock(return_value = NaverResponse())

        client = Client()
        header = {'HTTP_Authorization': 'naver_token'}
        response = client.get('/user/naver_auth', content_type = 'applications/json', **header)

        self.assertEqual(response.status_code, 200)

    def test_user_signin_post_fail(self):
        client   = Client()
        header   = {'No_Authorizaeion' : '1234'}
        response = client.post('/user/naver_auth', content_type='application/json', **header)

        self.assertEqual(response.status_code, 405)

```