---
title: "[JS] 날짜와 시간"
date: "2020-01-30T11:12:03.284Z"
template: "post"
draft: false
slug: "javascript/date_time"
category: "javascript"
tags:
  - "JavaScript"
description: "Date, Time"
socialImage: ""
---


## new Date()

- 현재 날짜와 시간까지 나온다.
- 시간이 흐른다고 해서 이 값이 변하지는 않는다. 코드가 실행되는 순간의 현재 시간이 담긴다.

```js
let rightNow = new Date()
```

#### 특정 날짜를 parameter로 넘겨주면, 해당 날짜의 Date를 반환할 수 있다.

```js
let date1 = new Date('December 17, 2019 03:24:00');
let date2 = new Date('2019-12-17T03:24:00');
let date3 = new Date(2019, 5, 1);
```

## GMT (Greenwich Mean Time)

- 컴퓨터 언어에서는 GMT 기준으로 시간을 알려준다.
- 한국표준시는 GMT+0900으로 표시된다.

## new Date()에서 원하는 정보 뽑아내기

- new Date()가 반환된 값을 그대로 사용하지 않는다.\
new Date() 값에서 Date 타입이 가지고 있는 method를 활용하여 값을 받아온다.

```js
let rightNow = new Date(); //2020-02-09T11:58:06.187Z

let year = rightNow.getFullYear();       //2020
let month = rightNow.getMonth()+1;       //2
let date = rightNow.getDate();           //9
let day = rightNow.getDay();             //0
let currentHour = rightNow.getHours();   //20
let currentMin = rightNow.getMinutes();  //58
```

- `getMonth` 함수는, 현재 달보다 1 작은 값이 반환되므로 주의한다.

## getTime

- 날짜의 밀리초 표현을 반환한다.
- 기준이 되는 일자는 1970년 1월 1일로, 이 날짜로부터 getTime의 밀리초만큼 지났다는 의미다.
- getTime 함수로 비교연산을 통해 언제가 더 과거인지 판단할 수 있다.\
값이 작으면 과거이다.

```js
let rightNow = new Date();
let time = rightNow.getTime();

//1581250598788
```