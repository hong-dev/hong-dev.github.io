---
title: "[ZARA Clone] Retrospective 2"
date: "2020-03-08T11:12:03.284Z"
template: "post"
draft: false
slug: "retrospective_2"
category: "project"
tags:
  - "Python"
  - "Django"
  - "Retrospective"
  - "ZARA"
  - "Project"
description: "프로젝트 회고: 아쉬운 점, 보충할 점"
socialImage: ""
---


## Modeling: composition
* Clothes table에 composition(구성요소) field가 있다. 처음에 이걸 어떻게 처리해야 할까 고민이 많았다. 정석은 many to many라고 생각했지만 모든 요소들을 다 분석하고 고려하기가 어려울 것 같아서 하나의 field에 한줄로 넣기로 하였다.
* front에게 data를 보내주려고 보니, composition을 string 형태로 그대로 보내줄 수가 없어서 dictionary 형태로 바꾸는 작업이 필요했다.
* 애초에 table에 넣을 때 겉감, 안감, 밑창 등을 field로 넣고 없는 것은 null 처리하는 방식으로 진행했으면 어땠을까 하는 생각.

```python
#clothes/views.py에서 dictionary 처리

composition = clothes_detail.composition.split("}, ")
for index, value in enumerate(composition[:-1]):
    composition[index] = value + "}"
...

'composition'  : [literal_eval(element) for element in composition]
```

```
mysql> select composition from clothes;

+----------------------------------------------------------------------------------------------------------+
| composition                                                                                              |
+----------------------------------------------------------------------------------------------------------+
| {'겉감': '주요소재50% 나일론,50% 비스코스'}                                                                    |
| {'겉감': '주요소재100% 아크릴'}                                                                              |
| {'겉감': '80% 비스코스, 20% 나일론'}                                                                         |
| {'겉감': '주요소재9% 모직,62% 나일론,29% 아크릴'}                                                               |
| {'겉감': '100% 폴리우레탄'}, {'안감': '100% 폴리우레탄'}, {'밑창': '100% TPU'}, {'안창': '100% 폴리우레탄'}         |
| {'겉감': '100% TPU'}, {'밑창': '100% 열가소성 고무'}, {'안창': '100% 폴리우레탄'}                                |
| {'겉감': '100% 폴리우레탄'}, {'안감': '100% 폴리우레탄'}, {'밑창': '100% TPU'}, {'안창': '66% TPU, 34% 폴리우레탄'} |
```

## Modeling: ClothesImage, ClothesColor
* ClothesImage와 ClothesColor의 table은 중복되는 field(clothes_id, color_id)를 가지고 있다.\
ClothesImage는 ClothesColor에 image까지 포함된 table로, ClothesColor는 필요없는 table이었다.
* 중복되는 data와 table이 없는지, modeling 할 때 더 꼼꼼히 봐야겠다.

```
mysql> desc clothes_images;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| main_image | varchar(200) | NO   |     | NULL    |                |
| image1     | varchar(200) | YES  |     | NULL    |                |
| image2     | varchar(200) | YES  |     | NULL    |                |
| image3     | varchar(200) | YES  |     | NULL    |                |
| image4     | varchar(200) | YES  |     | NULL    |                |
| image5     | varchar(200) | YES  |     | NULL    |                |
| image6     | varchar(200) | YES  |     | NULL    |                |
| image7     | varchar(200) | YES  |     | NULL    |                |
| clothes_id | int(11)      | YES  | MUL | NULL    |                |
| color_id   | int(11)      | YES  | MUL | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
11 rows in set (0.01 sec)

mysql> desc clothes_colors;
+------------+---------+------+-----+---------+----------------+
| Field      | Type    | Null | Key | Default | Extra          |
+------------+---------+------+-----+---------+----------------+
| id         | int(11) | NO   | PRI | NULL    | auto_increment |
| clothes_id | int(11) | YES  | MUL | NULL    |                |
| color_id   | int(11) | YES  | MUL | NULL    |                |
+------------+---------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```