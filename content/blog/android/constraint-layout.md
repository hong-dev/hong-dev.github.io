---
title: "Android ConstraintLayout"
date: "2022-01-22T00:02:03.284Z"
template: "post"
draft: false
category: "android"
tags:
  - "Android"
  - "Layout"
  - "ConstraintLayout"
description: "Android ConstraintLayout"
socialImage: ""
---

# ConstraintLayout

- View 위젯의 위치와 크기를 유연하게 조절할 수 있게 만들어주는 레이아웃
- Layout에 배치되는 view들에 여러 제약(constraint)를 적용하여 각 뷰의 위치와 크기를 결정한다.
- 예를 들어, 특정 뷰 왼쪽 사이드를 다른 뷰의 오른쪽 사이드에 맞추거나 부모 레이아웃의 왼쪽 사이드에 맞추는 등의 constraint가 있다.
- 이러한 각각의 constraint는 ConstraintLayout이 가지는 하나의 layout 속성으로 mapping 된다.

<br>

# Types of constraints

## Relative positioning

- 하나의 widget을 다른 widget에 relative 하게 배치할 수 있다.
- 가로 및 세로축으로 widget을 constrain 할 수 있다.
    - Horizontal Axis: left, right, start, end sides
    - Vertical Axis: top, bottom sides, text baseline
- 예를 들어, Button B의 left side가 Button A의 right side로 constrained 된다.
    
    ```java
    <Button android:id="@+id/buttonA" ... />
    <Button android:id="@+id/buttonB" ...
        app:layout_constraintStart_toEndOf="@+id/buttonA" />
    ```
    

## Margins

- Side margins가 설정되면, 해당하는 constraints(존재한다면)에 적용되어, target과 다른 source side 사이의 공간 여백을 적용한다.
- Matgin은 양수이거나 0이어야 한다.


## Centering positioning and bias

- ConstraintLayout이 Button과 정확히 같은 크기를 가지지 않는 이상, 아래 두 개의 constraints를 동시에 충족할 수 없다.
    
    이 경우, constraints는 widget을 동등하게 분리하는 정반대의 양쪽 힘처럼 작용한다.
    
    따라서 widget이 parent container의 중앙에 위치하도록 한다.
    
    Vertical constraints의 경우에도 유사하게 적용된다.
    
    ```java
    <android.support.constraint.ConstraintLayout ...>
        <Button android:id="@+id/button" ...
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent" />
    </>
    ```
    

- 양쪽에서 이러한 opposite constraints가 발생할 때, 기본값은 widget을 중앙에 배치하는 것이다.
    
    하지만 bias attributes를 사용하면, 한 쪽으로 기울도록 위치를 조정할 수 있다.
    
    아래의 경우, default 50%가 아닌 30% bias가 적용되어 widget이 왼쪽으로 더 기울어지게 된다.
    
    ```java
    <android.support.constraint.ConstraintLayout ...>
        <Button android:id="@+id/button" ...
            app:layout_constraintHorizontal_bias="0.3"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent" />
    </>
    ```
    

## Circular positioning

- Angle과 distance를 설정하여, 다른 widget center를 기준으로 widget center를 constrain 할 수 있다.
- Widget을 circle에 배치할 수 있다.
    
    ```java
    <Button android:id="@+id/buttonA" ... />
    <Button android:id="@+id/buttonB" ...
        app:layout_constraintCircle="@+id/buttonA"
        app:layout_constraintCircleRadius="100dp"
        app:layout_constraintCircleAngle="45" />
    ```
    

> layout\_constraintCircle : 기준이 되는 다른 widget id  
> layout\_constraintCircleRadius : 다른 widget center와의 거리  
> layout_constraintCircleAngle : widget이 위치해야 하는 각도(0-360)


## Visibility behavior

- ConstraintLayout에는 `View.GONE`으로 표시되는 widget에 대해 특별히 처리한다.
    
    GONE widget은 일반적으로 displayed 되지 않으며 layout의 일부가 아니다.
    
    그러나 Layout을 계산하는 데에 있어서는, GONE widgets는 여전히 중요하게 존재한다.
    
- Visibility behavior를 통해 layout을 손상시키지 않고, widget을 일시적으로 GONE으로 표시할 수 있는 layout을 만들 수 있다.

## Dimension constraints

- ContraintLayout 자체의 최소 및 최대 크기를 지정할 수 있다.
- 위젯의 한 dimension을 다른 dimension의 비율로 지정할 수도 있다.
    
    즉, 가로와 세로의 길이를 비율로 지정할 수 있다.
    
    이 때는 최소 하나의 constrained dimension을 0dp로 설정해야 한다.
    
    ```java
    <Button android:layout_width="wrap_content"
        android:layout_height="0dp"
        app:layout_constraintDimensionRatio="1:1" />
    ```
    

## Chains

- Single axis(수평 또는 수직)에서 group과 같은 동작을 제공한다.
- Chain은 chain의 첫 번째 element에 설정된 attributes에 의해 제어된다.
- **`layout_constraintHorizontal_chainStyle`** 또는 **`layout_constraintVertical_chainStyle`** attribute를 사용하여 chain style을 지정할 수 있다.

## Virtual Helpers objects

- `Guideline` object를 사용하면 ConstraintLayout container를 기준으로 가로/세로 guidelines를 만들 수 있다.
    
    그러한 guildelines에 따라 widget을 배치할 수 있다.
    
- 1.1에서는 `Barrier`와 `Group`도 추가되었다.

## Optimizer

- 1.1에서 constraints optimizer가 추가되었다.
- `app:layout_optimizationLevel` tag를 추가하여 적용할 optimizations를 결정할 수 있다.
- 이 속성은 mask이므로, 원하는 optimizations를 나열하여 on/off 할 수 있다.
    
    ```java
    app:layout_optimizationLevel="direct|barrier|chain"
    ```
    
<br>
<br>

### *Reference*

> [*ConstraintLayout*](https://developer.android.com/reference/android/support/constraint/ConstraintLayout)