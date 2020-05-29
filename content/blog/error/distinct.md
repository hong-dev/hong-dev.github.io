---
title: "NotSupportedError: DISTINCT"
date: "2020-05-15T10:12:03.284Z"
template: "post"
draft: false
slug: "error/distinct"
category: "error"
tags:
  - "MySQL"
  - "Error"
  - "Django"
description: "django.db.utils.NotSupportedError: DISTINCT ON fields is not supported by this database backend"
socialImage: ""
---


```bash
django.db.utils.NotSupportedError: DISTINCT ON fields is not supported by this database backend
```

<br>

## Situation

Django ORM으로, User별로 가장 최근 결제한 주문 건을 return 하고자 하였다.  
그래서 결제일자를 기준으로 정렬한 후, user를 기준으로 distinct 하고자 하였다.

> ## _distinct()_  
> 중복값을 제거하고 중복값들은 하나만 남겨서 return 한다.

<br>

```python
order_list = (
    Order
    .objects
    .order_by('-payment_date')
    .distinct('user')
)
```

결과는, NotSupportedError 발생

<br>

## Cause

MySQL에서는 `.distinct({field_name})` 기능을 사용할 수 없다.  
PostgresSQL에서만 해당 코드가 작동한다고 한다.  
MySQL에서는 `.distinct()`의 형태로만 사용할 수 있고, 특정 field를 기준으로 중복값을 제거할 수는 없다.

<br>

## Solution

Order table을 기준으로 user의 중복값을 없애려고 하지말고, User table을 기준으로 잡으면 user 중복을 고려하지 않아도 된다.  
그러나 가장 최신의 payment date를 기준으로 뽑아내야 하므로, user table에서는 그 작업을 할 수가 없고 order table에서 `.latest('payment_date')`를 해야했다.  
그래서 order table을 기준으로 하되 모든 user를 for문으로 돌려서 하나씩 가장 최신 주문을 찾았다.  
`distinct` 하나면 해결되었을 것을 이렇게나 비효율적으로 querying 해야하나 싶은데..😭

```python
order_list = (
    Order
    .objects
    .select_related('user')
)

users = User.objects.all()

orders = [
    {
        "id"           : order.id,
        "user_id"      : order.user.id,
        "user_name"    : order.user.name,
        "user_email"   : order.user.email,
        "order_number" : order.order_number,
        "product"      : order.product,
        "payment_date" : order.payment_date
    }
    for user in users if
    (order := order_list.filter(user = user.id).latest('payment_date'))
]
```

<br>
<br>

> Reference: [DISTINCT ON fields is not supported by this database backend](https://stackoverflow.com/questions/54249017/distinct-on-fields-is-not-supported-by-this-database-backend)