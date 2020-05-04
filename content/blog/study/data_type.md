---
title: "[JS] Data Type"
date: "2020-01-30T11:12:03.284Z"
template: "post"
draft: false
slug: "javascript/data_type"
category: "javascript"
tags:
  - "JavaScript"
description: "Data Type"
socialImage: ""
---


## typeof

```js
typeof things
```

- `undefined`: 정의되지 않은 변수
- `boolean`
- `string`
- `number`
- `object`: 함수를 제외한 객체 또는 "object"
- `function`

## null

- null이라는 data type은 object로 반환된다.\
빈 객체를 참조하고 있기 때문이다.

```js
console.log(typeof null)
    
//object
```

## [ ]

- Array(배열)는 확장된 Object(객체)이다.
- 빈 배열도 data type은 object로 반환된다.

```js
console.log(typeof [])
    
//object
```

## undefined

- var, let, const를 사용해서 변수를 정의할 때 초기화 하지 않았다면, undefined가 자동으로 할당된다.

## boolean

###1) true

- false가 아니면 모두 true

###2) false

`""` (빈 문자열)\
`0`\
`NaN` (Not a Number)\
`null`\
`undefined`


###String ⇒ Number
```js
Number("100");
parseInt("1.9");  //1 ; 버림하여 정수로 변환
parseFloat("1.9");  //1.9 ; 실수로 변환
```

###Number ⇒ String
```js
let num1 = 1234
num1.toString();
```