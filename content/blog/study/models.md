---
title: "[Modeling] Django models.py에 적용하기"
date: "2020-02-20T11:12:03.284Z"
template: "post"
draft: false
slug: "django/modeling"
category: "django"
tags:
  - "Django"
  - "Modeling"
description: "Modeling 설계 한 것 django app models.py에 적용하기"
socialImage: ""
---


```
Starbucks 메뉴 modeling 하기
**Modeling 설계 한 것 django app에 models.py에 적용하기
```

![modeling_aquerytool](https://user-images.githubusercontent.com/53142539/77428924-37a63300-6e1c-11ea-8549-680be3aaeaa1.png)

- conda 가상환경 생성 ⇒ startproject ⇒ startapp ⇒ app의 models.py 작성

```python
# starbucks/models.py

from django.db import models

class MainCategory(models.Model):
    name = models.CharField(max_length = 50) 

    class Meta:
        db_table = 'maincategories'


class SubCategory(models.Model):
    name          = models.CharField(max_length = 50) 
    main_category = models.ForeignKey('MainCategory', on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = 'subcategories'


class Size(models.Model):
    size = models.CharField(max_length = 50) 

    class Meta:
        db_table = 'sizes'


class ProductSize(models.Model):
    product = models.ForeignKey('Product', on_delete = models.SET_NULL, null = True)
    size    = models.ForeignKey('Size', on_delete = models.SET_NULL, null = True)

    class Meta:
        db_table = 'product_sizes'
  
  
class Product(models.Model):
    main_category = models.ForeignKey('MainCategory', on_delete=models.SET_NULL, null=True)    
    sub_category  = models.ForeignKey('SubCategory', on_delete=models.SET_NULL, null=True)
    name          = models.CharField(max_length = 50) 
    description   = models.CharField(max_length = 500, default='good!')
    image         = models.URLField(max_length = 500, default='image')
    size          = models.ManyToManyField('Size', through = 'ProductSize')

    class Meta:
        db_table = 'products'
```

### 1) 화살표를 받는 요소들을 먼저 class 생성하는 것이 좋다.

- 참조할 것이 있는 요소를 먼저 생성하면, 참조할 대상이 아직 만들어져 있지 않기 때문이다.
- `ForeignKey('class')` 이런 방식으로 quotation('') 처리를 하면, class 순서상 아래에 있어도 찾아서 해준다. quotation marks를 안 붙이면 import 된 class나, 이것보다 위에 있는 class만 가져올 수 있다. 이건 선언적인 표현으로, 붙여놓으면 순서로 인한 문제는 신경쓰지 않아도 된다.

### 2) class field의 max_length

- 실제로 max를 체크해주는 것은 아니다. 이 길이가 넘어가도 data가 입력된다. 그냥 보기에 이 field에서 내가 어느정도 길이의 data를 받겠다라고 말해주는 것일 뿐이다.

### 3) ForeignKey 적용시, field명 뒤에 자동으로 장고가 _id를 넣어준다.

- main_category_id 처럼 넣어버리면 table의 최종 field명이 main_category_id_id 가 된다.

### 4) ForeignKey 적용시, on_delete는 필수

- on_delete는 참조하는 것이 지워지면 같이 지워질 것인지를 알려준다.

1) CASCADE : 참조값이 지워지면 나도 지워진다. (연관된 것을 다같이 지울 때)

2) SET_NULL : 참조값이 지워져도 나는 null로 세팅된다.

3) NO ACTION : 참조값이 지워져도 나는 변동없이 남아있는다.

4) RESTRICT : 참조값을 변경/삭제하려 하면 실행이 제한된다.

### 5) null = True

- 해당 field가 null 값이어도 되는가(True) 안되는가(False)
- ManytoMany일 경우에는 null = True가 의미가 없다.
- 모든 field가 null = True의 옵션을 가질 수 있다. (Primary key는 제외. 무조건 있어야 한다.)
- null = True를 안 넣었는데, 값을 할당해주지 않으면 에러가 난다.

---

models.py에서 table들을 만드는 것을 끝났다! (makemigrations, migrate 해주는 것 잊지 말고!)\
실제 data가 아직 없으니 data를 직접 넣어보자.

## Python Shell로 Data 넣기

- mysql에서도 data를 넣을 수 있지만, django에서 하는 것이 훨씬 편하고 쉽다.
- product.models의 class들을 *로 다 import 했다.

    근데 class가 20개 넘어갈 때나 쓰고, 웬만하면 지양하자. `import *` 가 좋은 것만은 아니다.

- Data 입력방법: `ClassName(name='a').save()`, `ClassName.objects.create(name='a')`
- Bulk create : 여러 개의 data를 같이 넣어야 할 때 사용한다. 여러번 쿼리를 수행하는 것보다 한번 쿼리를 수행할 때 여러 개의 data를 넣는 것이 로드가 덜 걸리고 효율이 좋다. 여기에서는 다루지 않았다.

```python
# python manage.py shell

from product.models import *

MainCategory(name='음료').save()   #data 입력 방법 1
SubCategory.objects.create(name='콜드브루', main_category_id=1)  #data 입력 방법 2
```


### create 할 때, 직접 값을 넣어주는 방법과 객체를 참조하여 넣어주는 방법

#### 1) 직접 값 넣기

-`main_category_id=1` 의 형식으로 작성

-field로 값으로 바로 direct 적용한다.

#### 2) 객체 참조하여 넣기

-`main_category=MatinCategory.objects.get(id=1)` 의 형식으로 작성

-객체를 넣어주면 어짜피 foreignkey는 id 참조니까 장고가 알아서 해준다.

-MySQL에서는 이런 객체참조의 방식으로 data 넣는 것은 절대 못한다.

```python
# 값을 바로 적용
SubCategory.objects.create(name='콜드브루', main_category_id=1)  

# 객체참조
SubCategory.objects.create(name='콜드브루', main_category=MainCategory.objects.get(id=1))
```

-이런 식으로 하면 방금 만든 객체를 변수에 넣어서 객체참조로 넣을 수 있지!

```python
a = Resume(name='b')  #resume의 새 객체를 변수에 넣고.
a.save()     #save 해서 만들어주고.
Career.objects.create(name='c', resume=a)  #career의 새 객체를 resume 객체 참조로 생성

a = Resume.object.create(name='b')  #resume의 새 객체를 만들어서 변수에 넣고.
Career.objects.create(name='c', resume=a)  #career의 새 객체를 resume 객체 참조로 생성
```

-주의할 점! 변수에 넣을 때 save까지 하면 안 된다.

```python
a = Resume(name='b').save()  #이건 a에 남겨지지 않아! a에 return이 없어!
```

### Field Lookup(__)

- select_related와는 상관없이 값을 다 불러올 수 있는 방식
- 여기서 field 호출할 때는 table name 소문자로 호출한다.
- 정참이든 역참이든 참조관계가 뭐라도 있으면 다 된다. depth도 상관없이 참조 가능.\
    ForeignKey가 있어야 한다는 말이지.

```python
City.objects.values('store__subcity__name')
SubCity.objects.values('city__name')
City.objects.filter(id=16).values('store__name')   # 만약에 city와 store에 관계가 없으면 안된다!
```

### For문으로 data 넣기

- 처음 data 넣을 때 못 넣었으면 나중에 한꺼번에 넣을 수도 있다.
- product data를 for문으로 하나하나 돌려서 size(foreignkey이므로 field명은 size_id가 될 것)에 값을 부여하고 save 해준다.
- 하기 내용은 통일된 수정일 때 가능하다.

```python
for i in Product.objects.all():
    i.size=1
    i.save()
```

### ManyToMany Field 값 연결하기

- data를 넣을 때 `ManyToManyField`는 입력하지 않았다.
- 해당 product 객체의 category에 add로 size 각각을 넣어준다.
- Product에 ManyToMany Field(아래의 예시에서는 size field)는 생성되지 않는다.\
    왜냐? Product는 size를 참조하지 않기 때문! add하면 중간 테이블(ProductSize)에만 data가 입력될 뿐이다.

```python
>>> product1 = Product.objects.get(id=1)
>>> product1
<Product: Product object (1)>
>>> product1.size.add(Size.objects.get(id=1),Size.objects.get(id=2))

>>> ProductAllergy.objects.values()
<QuerySet [{'id': 1, 'product_id': 1, 'size_id': 1}, {'id': 2, 'product_id': 1, 'size_id': 2}]>
```