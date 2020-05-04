---
title: "[JS] Math Expressions"
date: "2020-01-30T11:12:03.284Z"
template: "post"
draft: false
slug: "javascript/math_expressions"
category: "javascript"
tags:
  - "JavaScript"
description: "++"
socialImage: ""
---


- ++가 1을 더하는 것인데, ++가 뒤에 있으면 변수 할당을 먼저 실행하고 +1이 된다.

```js
let num = 1;
let newNum = num++;

//num = 2
//newNum = 1
```

- ++가 앞에 있으면 +1을 먼저 실행하고 그 후에 변수할당을 한다.

```js
let num = 1;
let newNum = ++num;

//num = 2
//newNum = 2
```