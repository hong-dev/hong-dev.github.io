---
title: "[JS] Math method"
date: "2020-01-30T11:12:03.284Z"
template: "post"
draft: false
slug: "javascript/math"
category: "javascript"
tags:
  - "JavaScript"
description: "Math method"
socialImage: ""
---


## Math.round

- 반올림하여 int 값을 반환

```js
Math.round(2.5);   //3
Math.round(2.49);  //2
```

## Math.ceil

- 올림하여 값을 반환

## Math.floor

- 내림하여 값을 반환

## Math.random()

- 0.0000000000000000에서 0.9999999999999999 사이의 값에서 랜덤수를 반환
- Math.random()의 값에 *10 해서 1의 자리수 + 소수자리로 값을 구한 후, 내림함수 등을 활용하여 0~10 사이의 랜덤수를 구할 수 있다.