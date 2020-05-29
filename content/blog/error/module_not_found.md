---
title: "ModuleNotFoundError"
date: "2020-02-20T10:12:03.284Z"
template: "post"
draft: false
slug: "error/module_not_found"
category: "error"
tags:
  - "Django"
  - "Error"
description: "ModuleNotFoundError: No module named 'bcrypt'"
socialImage: ""
---


```bash
ModuleNotFoundError: No module named 'bcrypt'
```
<br>

## Situation

views.py에서 import bcrypt를 했는데,  
Django project에서 python manage.py runserver 를 했을 때 발생한 error

<br>

## Cause

bcrypt를 인식하지 못하고 없는 모듈로 나온다.  
bcrypt는 pip install로 설치해줘야 하는 모듈이다.  
conda 가상환경을 잘못 설정해서 bcrypt가 설치되지 않은 가상환경에서 runserver를 실행했다.

<br>

## Solution

들어온 가상환경에 `pip install bcrypt`를 한다.  
또는 bcrypt가 설치된 가상환경으로 이동하여 실행한다.