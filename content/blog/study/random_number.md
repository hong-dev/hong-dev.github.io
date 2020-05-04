---
title: "[JS] get random number between two numbers"
date: "2020-01-30T11:12:03.284Z"
template: "post"
draft: false
slug: "javascript/quiz_random_number"
category: "javascript"
tags:
  - "JavaScript"
description: "get random number between two numbers"
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
  두 숫자 사이의 random number를 return하는 함수를 구현하라.
</div>

- Math.random()은 0.0000000000000000에서 0.9999999999999999 사이의 random한 값을 return한다.
- Math.floor()는 값을 내림하여 반환한다.

###Model Solution

```js
function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); 
}
```