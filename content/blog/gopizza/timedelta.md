---
title: "Timedelta를 사용하여 period range 설정"
date: "2020-04-02T11:12:03.284Z"
template: "post"
draft: false
slug: "timedelta"
category: "python"
tags:
  - "Python"
  - "Django"
  - "Timedelta"
  - "Datetime"
  - "Wepizza"
  - "Project"
description: "datetime, timedelta, date, earliest"
socialImage: ""
---


### Filter Condition
* Django에서 User.objects.filter()에 사용되는 filter 조건이 복잡하거나 다른 view에서도 사용해야 한다면 따로 함수로 빼는 것이 가능
* filter할 parameter를 받아서, dictoionary에 filter condition들을 넣는다.\
함수에서 최종 return한 filter condition을 사용할 때는 `**`를 붙여서 사용한다.
```python
User.objects.filter(**get_filter_condition(time_delta))
```

* [Filter condition 함수가 사용되는 get view](https://hong-dev.github.io/posts/project_wepizza/dataframe)


### created\_at\_\_range = (start\_date, end_date)
* 시작 날짜와 마지막 날짜 사이의 data

### Score.objects.earliest('created_at')
* created_at의 날짜가 가장 빠른 object (제일 처음 저장된 data를 알 수 있다.)

### timedelta
* datetime instance 간의 기간 차이를 나타낸다.\
timedelta를 더하거나 빼서 기준 날짜의 전후를 계산한다.
```python
timedelta(weeks = 7) #7주 후
timedelta(days = -7) #7일 전
timedelta(hours = 7)
timedelta(seconds = 7)
timedelta(days = 1, hours =-7) #1일 후의 7시간 전
```

### date.today() / datetime.now()
* `date.today()` : 오늘 날짜
* `datetime.now()` : 현재 시간
* timedelta를 사용해서 지금보다 1일 전을 설정할 때, datetime.now()를 적용한다면 어제의 현재 시간보다 빠른 시간의 data는 return되지 않는다.\
따라서 `date.today()`를 적용해서 하루 전체의 data가 return 되도록 하였다.
* timedelta가 0일 경우(오늘 입력된 data만 보여줄 경우) :\
date range를 설정할 때 end_date 부분에 date.today()를 적용하면, 시작날짜도 오늘, 끝날짜도 오늘이 되어서 아무런 data도 return 되지 않는다.\
따라서 range를 적을 때는 `datetime.now()`를 사용하여 현재시간까지 들어온 오늘의 data가 보여질 수 있도록 했다.


### Filter Function Code
```python
from datetime import datetime, timedelta, date

def get_filter_condition(time_delta):
    filter_condition = {}

    if time_delta:
        start_date = date.today() - timedelta(days = int(time_delta))
    else:
        start_date = Score.objects.earliest('created_at').created_at.date()

    filter_condition["score__created_at__range"] = (start_date, datetime.now())

    return filter_condition
```