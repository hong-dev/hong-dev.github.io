---
title: "Access modifiers (접근제한자)"
date: "2022-02-28T21:51:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Access modifiers"
description: "Access modifiers in Java"
socialImage: ""
---



# Access modifier

- Class, constructor, variable, method 등의 scope를 제한한다.
- Java에서는 default, private, protected, public의 4가지 접근제한자가 있다.

<br>
<br>

|  | default | private | protected | public |
| --- | --- | --- | --- | --- |
| Same Class | O | O | O | O |
| Same package | O | X | O | O |
| Different package subclass | X | X | O | O |
| Different package non-subclass | X | X | X | O |

<br>

## Default

- 접근제한자가 지정되지 않는 경우, default로 간주된다.
- **같은 package 안에서만** 접근가능하다.

## Private

- **정의된 class 내부에서만** 접근가능하다.
- Top-level class나 interface는 private으로 선언될 수 없다.
    
    즉, class 중에서는 nested class에서만 사용될 수 있다.
    

## Protected

- **같은 package + 다른 package의 subclass**에서 접근가능하다.
- 다른 package의 subclass란, 다른 package에서 해당 class를 상속받은 경우를 말한다.

## Public

- 가장 넓은 scope를 가진다.
- **Program 내의 어디에서든** 접근가능하다.
    
    즉, scope에 제한이 없다.
    
<br>

# 💡

- Access level을 최대한 제한적으로 사용하자.
- 특별한 이유가 있지 않은 이상, private을 사용하자.
- Constants를 제외하고는 public fields를 지양하자.

<br>
<br>

### *Reference*

> *[Access Modifiers in Java](https://www.geeksforgeeks.org/access-modifiers-java/)*
