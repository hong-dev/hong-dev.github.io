---
title: "[ZARA Clone] Retrospective 1"
date: "2020-03-07T11:12:03.284Z"
template: "post"
draft: false
slug: "retrospective_1"
category: "project"
tags:
  - "Python"
  - "Django"
  - "Retrospective"
  - "ZARA"
  - "Project"
description: "프로젝트 회고: 새롭게 알게 된 것"
socialImage: ""
---


## lambda
```python
def validate(password):
    validate_condition = [
        lambda s: any(x.isupper() for x in s),
        lambda s: any(x.islower() for x in s),
        lambda s: any(x.isdigit() for x in s),
        lambda s: len(s) >= 8
    ]
    is_password_valid = True
    for validator in validate_condition:
        if not validator(password):
            return False
    return is_password_valid
```

## validate_email / ValidationError
* email에 `@`와 `.`이 필수로 들어가 있는지 (email 형태인지) 체크해주는 validator

```python
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
```

## KeyError
* 요청한 key 값이 front에서 들어오지 않았을 때 생기는 error
* POST일 경우에는 request.body에 key가 담겨서 오기 때문에 except KeyError 처리는 꼭 필요하다.
* 그럼 GET은 KeyError가 필요없나? 아니다. GET일 경우에도, query parameter로 key값을 받아올 수 있으므로 KeyError 처리가 필요하다.

```python
#GET이지만 query parameter로 keyword를 받아오는 경우

keyword = request.GET.get('keyword', None)
```

```python
except KeyError:
    return JsonResponse({"message": "INVALID_KEYS"}, status = 400)
```

## contains / icontains
* 검색 기능 구현 시, keyword 값이 들어있는지 check
* contains는 대소문자를 구분하며, icontains는 대소문자 구분없이 모두 보여준다.
* 단, 한글의 경우에는 온전한 글자 단위(자음+모음)로 체크가 되어서, 자음만 입력할 때는 검색이 되지 않는다.

```python
clothes_list = ClothesImage.objects.select_related('clothes').filter(clothes__name__icontains = keyword)
```

## 함수로 뽑아내기
* 중복되거나, 너무 길게 입력되는 코드의 경우에는 함수로 따로 만들어서 적용하는 것도 방법이다.

