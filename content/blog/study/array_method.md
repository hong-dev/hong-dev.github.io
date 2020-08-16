---
title: "[JS] Array([ ]) method"
date: "2020-01-30T11:12:03.284Z"
template: "post"
draft: false
category: "javascript"
tags:
  - "JavaScript"
description: "Array(배열)에 적용되는 method"
socialImage: ""
---

<p>

- Array에 꼭 차례대로 요소를 추가하지 않아도 원하는 위치에 할당 가능하다.
- 그런 경우에 비어있는 index에는 undefined가 자동으로 할당된다.

```js
let cities = [];
cities[0] = "서울";
cities[1] = "대전";
cities[2] = "대구";
cities[4] = "제주도";

//cities = ["서울", "대전", "대구", undefined, "제주도"]
```

## push

- array의 맨 마지막에 요소를 추가

```js
array1.push("경주");
```

## unshift

- array의 맨 앞부분에 요소를 추가

```js
array1.unshift("인천");
```

## pop

- array의 맨 마지막 요소가 제거되고, 제거된 값을 반환한다.

```js
array1.pop();
```