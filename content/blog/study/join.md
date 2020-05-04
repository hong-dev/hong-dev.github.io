---
title: "[Django] Table 연결 (ORM의 Join 기능)"
date: "2020-02-21T11:12:03.284Z"
template: "post"
draft: false
slug: "django/join"
category: "django"
tags:
  - "Django"
  - "Join"
description: "Foreign Key로 연결되어 있는 table들의 data 가져오기 : select_related, prefetch_related, __"
socialImage: ""
---


- Table 간에 foreign key로 참조 관계를 만들었으면 data를 뽑아낼 때 그 관계를 활용해야겠지.
- 정보를 가져올 때 주로 쓰인다.

### Join

- 원하는 테이블을 조건을 통해서 합친다.
- Query의 효율성을 위해서 생겼다.\
    원래는 select를 2-3번씩 하면서 query가 도는데, join은 그걸 한번에 할 수 있다.

- join은 참조되는 테이블끼리 하는 거고, 연관관계가 없으면 join은 불가능하다.\
    연관관계 없는 것들끼리의 조인은 다른 방법이 있다.

- **주의할 점!** : 주체가 누구인지를 잘 알아야해! 뭐가 중심인지를 명확히 해야해!

```bash
#data를 가져올 때 아래의 방식은 효율성이 매우 떨어진다.

drink1 = Product.objects.get(id=1)    #<Product: Product object (1)>

SubCategory.objects.filter(id=drink1.category_id)[0].name
```

## 방법 1

1) 정참조일 때: 그냥 가져오면 된다.

```bash
drink = Product.objects.get(id=1)
drink.sub_category.name    #drink1의 sub_category라는 field의 name
```

2) 역참조일 때: `_set`으로 가져온다.

- _set 전에 기재되는 이름은 class명을 모두 소문자로 바꾼 것이다.

```bash
category = SubCategory.objects.get(id=1)

category.product_set.all()  
# 카테고리1번을 보고 있는 역참조 관계에 있는 product들이 반환된다.(쿼리셋 형태)
```

## 방법 2

- 방법 1의 문제점이 있다. 참조하는 테이블과 참조 받는 테이블을 차례대로 불러와야 하므로 쿼리가 그만큼 돌아간다.
- `related` 방식으로 사용하면 우리 눈에는 보이지 않지만, 연결되는 각각의 테이블을 한번에 소환하기 때문에 효율이 높아진다.

### One to One

- `select_related`
- 정참조. 좌변에서 우변을 본다

```bash
drink = Product.objects.select_related('sub_category').get(id=1)

drink.sub_category.name


SubCategory.objects.select_related('main_category')[1].main_category.name
```

### One to Many / Many to Many

- `prefetch_related`
- 역참조
- prefetch를 쓰면 역참조이기 때문에 querying을 한번 더 할 수밖에 없다.
- drink3은 객체로 나왔는데, set을 붙여서 다시 쿼리셋으로 만들어준다.????

```bash
drink3 = SubCategory.objects.filter(id=1).prefetch_related("product_set")

drink3     ## 쿼리셋 형태: <QuerySet [<SubCategory: SubCategory object (1)>]>
drink3[0]  ## 객체 형태 : <SubCategory: SubCategory object (1)>


drink3[0].name
drink3[0].product_set.values()


drink3[0].product_set.get(id=1).name  ## 객체 형태
drink3[0].product_set.filter(id=1)    ## 쿼리셋 형태
```



### select_related를 사용하는 이유

- select_related 해버리면 아예 Join이 되어서 입력되기 때문에, 연결 테이블의 data를 찾을 때 또 쿼리가 돌지 않아도 된다.
- select_related의 join 관계는 cache에 저장되고, 창을 닫으면 사라진다.

```bash
>>> a = Product.objects.all()
>>> print(a.query)
SELECT `products`.`id`, `products`.`main_category_id`, `products`.`sub_category_id`, `products`.`name`, `products`.`description`, `products`.`image` FROM `products`


>>> b = Product.objects.select_related('sub_category')
>>> print(b.query)
SELECT `products`.`id`, `products`.`main_category_id`, `products`.`sub_category_id`, `products`.`name`, `products`.`description`, `products`.`image`, `subcategories`.`id`, `subcategories`.`name`, `subcategories`.`main_category_id` FROM `products` LEFT OUTER JOIN `subcategories` ON (`products`.`sub_category_id` = `subcategories`.`id`)


>>> c = Product.objects.select_related('sub_category', 'main_category')
>>> print(c.query)
SELECT `products`.`id`, `products`.`main_category_id`, `products`.`sub_category_id`, `products`.`name`, `products`.`description`, `products`.`image`, `maincategories`.`id`, `maincategories`.`name`, `subcategories`.`id`, `subcategories`.`name`, `subcategories`.`main_category_id` FROM `products` LEFT OUTER JOIN `maincategories` ON (`products`.`main_category_id` = `maincategories`.`id`) LEFT OUTER JOIN `subcategories` ON (`products`.`sub_category_id` = `subcategories`.`id`)


>>> d = Product.objects.select_related('main_category')
>>> print(d.query)
SELECT `products`.`id`, `products`.`main_category_id`, `products`.`sub_category_id`, `products`.`name`, `products`.`description`, `products`.`image`, `maincategories`.`id`, `maincategories`.`name` FROM `products` LEFT OUTER JOIN `maincategories` ON (`products`.`main_category_id` = `maincategories`.`id`)
```

### **Queryset / Object

- Queryset : 메소드를 활용하여 추가 작업을 할 수 있다.
- Object : 그냥 데이터로 딱 빠져나온 것이므로, 추가 작업을 할 수가 없다. 쿼리가 아니기 때문에 filter 같은 메소드를 못 쓴다. select_related, .query도 모두 쿼리셋일 때 가능하다.

## 방법 3

- `__` 로 가져오는 방법
- 연결만 되어 있다면, 역참조든 정참조든 다 가능하다.

```bash
>>> SubCategory.objects.filter(id=1).values('main_category__name')
<QuerySet [{'main_category__name': '음료'}]>

>>> SubCategory.objects.filter(id=1).values('product__name')
<QuerySet [{'product__name': '나이트로 바닐라 크림'}, {'product__name': '쇼콜라 클라우드'}, {'product__name': '돌체 콜드 브루'}, {'product__name': '레이즌 스콘'}, {'product__name': '녹차 머핀'}, {'product__name': '치즈 베이글'}]>
```