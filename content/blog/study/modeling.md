---
title: "[Modeling] aquerytool Review"
date: "2020-02-19T10:12:03.284Z"
template: "post"
draft: false
slug: "modeling"
category: "data"
tags:
  - "Modeling"
  - "Aquerytool"
description: "aquerytool을 활용하여 Starbucks 메뉴 modeling 하기"
socialImage: ""
---

```
Starbucks 메뉴 modeling 하기
```

- Modeling은 aquerytool을 이용하여 아래와 같이 작성하였다.

![modeling_starbucks](https://user-images.githubusercontent.com/53142539/77428924-37a63300-6e1c-11ea-8549-680be3aaeaa1.png)

### 1) modeling의 각 table 제목은 database명과 동일하게 한다.

    class name: 첫글자 대문자 + 단수    /띄어쓰기 대신에 camel case를 사용한다.
    
    db name: 소문자 + 복수

### 2) Naming할 때, 축약하는게 제일 안좋은 습관이다.

- img 보다는 image라고 다 써준다.

### 3) 하나의 category가 여러 개의 product를 가질 수 있다면: `product ⇒ category`

### 4) product 테이블 자체에서 상위 테이블을 모두  참조 해놓는 게 좋다.

- 대분류, 중분류, 제품 테이블이 있을 때: 제품 ⇒ 중분류 ⇒ 대분류 해놓으면 참조에 참조를 타고 가서 필터링을 하게 된다.
- 제품 ⇒ 중분류, 제품 ⇒ 대분류 를 따로 해주고 중분류 ⇒ 대분류도 따로 해주면, 제품에서 바로 대분류로의 필터링이 가능하다.

### 5) 테이블 분리 기준

- 똑같은 정보가 여러 개가 들어가야 한다면, 중복되는 데이터들을 따로 테이블로 뺀다.
- 나라는 복제품이 여러 개가 있어서 반복적으로 써야되지 않고, 조금씩 다 정보가 다르다면 테이블 분리는 별로 의미가 없다. Data는 어짜피 그저 row 한 줄 추가일 뿐이니까.

### 6) Decimal(총길이, 소수점자리)

- 숫자를 줘야할 때는 decimal을 사용하는 것도 좋은 방법이다.\
    int 같은 것은 길이의 제한이 없으니까, 길이 제한을 둘 수 있는 decimal이 필요할 때가 있다.

- 물론 프론트와 상의하여, 단위(g, kcal)도 같이 넘겨줘야 할 때는 string으로 해야겠지.\
    그렇지만 연산해야 되는 금액, 달러 등 통화, 지도좌표 등은 decimal로 해서 소수점으로 넘어가야 한다.