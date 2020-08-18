---
title: "UnicodeEncodeError: 'charmap' codec can't encode characters"
date: "2020-08-18T10:12:03.284Z"
template: "post"
draft: false
category: "error"
tags:
  - "Database"
  - "Error"
description: "Database에서 한글 입출력이 안 될 때"
socialImage: ""
---


**Database에 한글 data를 입력하거나 출력할 때 생기는 문제**

## Error

1) MySQL에 있는 한글 data를 **입력**할 때, `UnicodeEncodeError`가 발생했다.
  > UnicodeEncodeError: 'charmap' codec can't encode characters in position 252-255: character maps to \<undefined>

<br>

2) 이미 입력된 한글 data를 **출력**하면, `???` 이런식으로 값이 출력된다. (글자수에 맞게 물음표가 나오는 것도 신기..)  
  :arrow_right: db 자체에 잘못 들어갔나 싶어 MySQL에 들어가봤는데, 한글이 아주 잘 보인다.  
  그렇다면 server와 db의 연결부분에 문제가 있을 가능성이 컸다.

<br>

## Solution

### ?charset=utf8

database와의 접속을 위해 보통 `config.py`나 `my_settings.py`와 같은 별개의 setting file에 db 관련 정보를 넣는다.  
(이 파일들은 꼭 `.gitignore`에 넣어서 git에 올라가지 않도록 해야한다! 안그러면 나의 db 정보가 모두 공개되는 끔찍한 일이..)

db 관련해서 필요한 정보들을 아래의 예시와 같이 넣는데, 마지막줄 `DB_CONNECTION_URL`에 charset을 넣어주면 해결!  
**`?charset=utf8`** 만 추가해주면 한글이 잘 들어가고 출력도 잘 된다!

test를 위한 test db가 따로 있다면, test db 관련 settings에도 동일하게 추가해주면 된다.

```python
DB_HOST = 'db_host'
DB_PORT = 'db_port' #실제로는 숫자로 작성됨
DB_NAME = 'db_name'
DB_USER = 'db_user'
DB_PASSWORD = 'db_password'
DB_CONNECTION_URL = f"mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8"
```