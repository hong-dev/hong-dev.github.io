---
title: "[JS] argument가 parameter 개수보다 적을 경우의 문제"
date: "2020-01-30T11:12:03.284Z"
template: "post"
draft: false
category: "javascript"
tags:
  - "JavaScript"
description: "parameter는 3개인데 argument를 다 주지 않을 경우, 각각 return값을 다르게 하라."
socialImage: ""
---

<p>
<div style="background-color:PowderBlue">
parameter는 3개인데 argument를 다 주지 않을 경우, 각각 return값을 다르게 하라.
</div>

###My Solution
- parameter로 받을 argument가 적으면, 나머지 parameter들은 undefined로 입력된다.\
각각의 값이 undefined일 경우를 if문을 사용하여 구현했다.

```js
function meetAt(year, month, date) {
  if(date === undefined) {
    if(month === undefined) {
      return year + "년"
    } return year + "년 " + month + "월"  //format을 적용하지 않을 때
  } return `${year}/${month}/${date}`  //format을 적용했을 때
}
```

###Model Solution
- undefined가 false로 작용하고, 값이 입력되어 있으면 true가 된다는 점을 이용하여 작성했다.


```js
function meetAt(year, month, date) {
  if (date) {
    return year + '/' + month + '/' + date;
  }
  if (month) {
    return year + '년 ' + month + '월';
  }
  if (year) {
    return year + '년';
  }
}
```
