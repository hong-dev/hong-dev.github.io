---
title: "dictionary.get() method"
date: "2020-08-28T23:12:03.284Z"
template: "post"
draft: false
category: "python"
tags:
  - "Python"
description: "python dictionary의 key값을 parameter로 넣으면 value값을 return 해주는 get() method"
socialImage: ""
---


### Dictionary에서 특정 Key값에 해당하는 Value값을 가져오는 방법

<br>

### 1. dict[_keyname_]

```python
book = {
    "title": "Python",
    "page": 350,
    "year": 2014
}

book["year"]
>>> 2014
```

만약 dictionary에 들어있지 않은 key값을 넣는다면?
```python
book["price"]
>>> KeyError: 'price'
```
:arrow_right: KeyError가 발생한다.

<br>

---

### 2. dict.get(_keyname_)

```python
book = {
    "title": "Python",
    "page": 350,
    "year": 2014
}

book.get("year")
>>> 2014
```

만약 dictionary에 들어있지 않은 key값을 넣는다면?
```python
book.get("price")
>>>
```
:arrow_right: 아무것도 return 하지 않는다. error도 내지 않는다.

<br>

> ### dict.get(keyname, default)
> * get() method는 key값 말고도 다른 parameter를 입력할 수 있다. (default값)  
> * 입력한 keyname이 dict에 없다면, default값을 return 한다. 

```python
book = {
    "title": "Python",
    "page": 350,
    "year": 2014
}

book.get("price", 30000)
>>> 30000
```

:arrow_right: book dictionary에 price는 없으므로 default 값인 30000을 return

<br>

### _Reference_
> [_Python Dictionary get() Method -- w3schools_](https://www.w3schools.com/python/ref_dictionary_get.asp)  
