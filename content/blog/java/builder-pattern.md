---
title: "Builder Pattern"
date: "2022-01-31T16:34:03.284Z"
template: "post"
draft: false
category: "java"
tags:
  - "Java"
  - "Design Pattern"
  - "Builder"
description: "Design Pattern: Builder"
socialImage: ""
---

- `House` object를 만들고 싶다고 하자.
    
    기본 집의 구조(4개의 벽, 바닥, 문, 창문, 지붕)만으로 집을 만들 수도 있지만, 더 크거나 밝거나 마당 또는 다른 것들이 추가된 집을 만들고 싶다면 어떻게 할까?

    아래의 3가지 방법을 떠올릴 수 있다.
    

## 1. Base class + subclasses

- 방법: `House` 라는 base class를 만들고, parameter들을 다양하게 조합할 수 있는 subclass들을 생성한다.
- 문제는, 너무 많은 subclasses가 생성될 것이다.
- Parameter들이 다양하게 사용됨에 따라 계층이 더 복잡해질 것이다.

## 2. Giant constructor in base class

- 방법: `House` object를 control 하는 모든 parameter를 사용하는 거대한 constructor를 생성한다.
    
    (`House(windows, doors, rooms, hasGarage, ...)`)
    
- 대부분 사용되는 parameter는 몇 개 되지 않아서 constructor의 호출이 지저분해진다.
    
    예를 들어 수영장이 있는 집은 몇 없으므로, 수영장과 관련된 parameter는 대부분의 경우 쓸모가 없어진다.
    

## 3. Builder pattern

- 자체 class에서 construction code를 따로 `builders`라고 하는 별도의 object로 옮기도록 한다.
    
    `buildWalls`, `buildDoor`과 같은 각각의 step을 나누고, 필요한 step만 호출할 수 있다.
    
- 이렇게 해서 복잡한 object를 단계별로 구성할 수 있다.
- 동일한 construction code를 사용하여 다양한 type의 objects를 생성할 수 있다.
- Builder는 object가 build 되는 동안 다른 objects가 product에 access하는 것을 허용하지 않는다.
- builder에 있는 step을 client에서 각각 호출할 수도 있지만, `director` class를 따로 둘 수도 있다.
    
    `director`는 각 step이 호출되는 순서를 알고 `builder`에 있는 step을 호출해서 실행시킨다.
    
    `director`가 있다면 client code에서 product 구성의 세부 정보는 완전히 숨길 수 있다.
    
<br>

# Pros and Cons

- Object를 단계별로 구성하거나, 구성 단계를 연기하거나, 재귀적으로 단계를 실행할 수 있다.
- Product의 다양한 표현을 구현할 때, construction code를 재사용할 수 있다.
- Business logic에서 복잡한 construction code를 분리할 수 있다. (Single Responsibility Principle)
- 여러 개의 new classes를 생성하기 때문에, 코드의 전반적인 복잡성이 증가한다.

<br>

# Example code

```java
// Base class
interface HousePlan {
    public void setBasement(String basement);
	public void setRoof(String roof);
}

class House implements HousePlan {
	private String basement;
	private String roof;

	public void setBasement(String basement) {
		this.basement = basement;
	}

	public void setRoof(String roof) {
		this.roof = roof;
	}
}

// Builder
interface HouseBuilder {
	public void buildBasement();
	public void buildRoof();
	public House getHouse();
}

class IglooHouseBuilder implements HouseBuilder {
	private House house;

	public IglooHouseBuilder() {
		this.house = new House();
	}

	public void buildBasement() {
		house.setBasement("Ice Bars");
	}

	public void buildRoof() {
		house.setRoof("Ice Dome");
	}

	public House getHouse() {
		return this.house;
	}
}

// Director
class CivilEngineer {
	private HouseBuilder houseBuilder;

	public CivilEngineer(HouseBuilder houseBuilder)	{
		this.houseBuilder = houseBuilder;
	}

	public House getHouse()	{
		return this.houseBuilder.getHouse();
	}

	public void constructHouse() {
		this.houseBuilder.buildBasement();
		this.houseBuilder.buildRoof();
	}
}

class Builder {
	public static void main(String[] args) {
		HouseBuilder iglooBuilder = new IglooHouseBuilder();
		CivilEngineer engineer = new CivilEngineer(iglooBuilder);

		engineer.constructHouse();

		House house = engineer.getHouse();
	}
}
```

<br>
<br>

### *Reference*

> [_Builder_](https://refactoring.guru/design-patterns/builder)  
> [_Builder Design Pattern_](https://www.geeksforgeeks.org/builder-design-pattern/)