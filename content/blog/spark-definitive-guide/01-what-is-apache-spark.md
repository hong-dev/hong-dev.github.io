---
title: "Chapter 1. What is Apache Spark"
date: "2022-04-04T22:53:03.284Z"
template: "post"
draft: false
category: "[Spark: The Definitive Guide]"
tags:
  - "Spark"
  - "Spark: The Definitive Guide"
  - "Apache Spark"
description: "
[Part 1] Gentle Overview of Big Data and Spark
Chapter 1. What is Apache Spark?
"
socialImage: ""
---


> _Spark: The Definitive Guide 내용 정리_

<br>

# Apache Spark

- 빅데이터를 위한 **통합(unified)** **컴퓨팅 엔진**과 **라이브러리** 집합
- 클러스터 환경에서 데이터를 병렬로 처리하는 오픈소스 엔진
- Python, Java, Scala, R 을 지원

<br>

# Features

- 다양한 데이터 분석 작업을 일관성 있는 API로 수행할 수 있도록 설계 (consistent and composable)
- 그전에는 사용자가 다양한 API와 시스템을 직접 조합해서 application을 작성해야 했는데, 스파크에서 통합 엔진을 제공
- 기능의 범위가 컴퓨팅 엔진으로 제한된다.      
    저장소 시스템의 데이터를 연산하는 역할만 수행할 뿐 영구 저장소 역할은 수행하지 않는다.
    
- 데이터 저장 위치에 상관없이 처리에 집중 (연산 기능에 초점)
- 엔진에서 제공하는 표준 library와 오픈소스 커뮤니티에서 third party package 형태로 제공하는 다양한 외부 library를 지원

<br>

# Background

- 컴퓨터의 프로세서 성능은 해마다 빨라졌고, 대규모 application은 이런 경향을 따라 만들어지고 대부분 단일 프로세서에서만 실행되도록 설계되었다.  
그러나 하드웨어의 성능 향상은 2005년경 멈췄고, 단일 프로세서의 성능 향상이 아닌 병렬 CPU 코어를 더 많이 추가하는 방향으로 선회했다.  
즉, application의 성능 향상을 위해 병렬 처리가 필요해졌다.
    
- 데이터 수집 비용은 극히 저렴해졌지만, 데이터는 cluster에서 처리해야 할 만큼 거대해졌다.

<br>

# Start spark console

- `pyspark`: python console
- `spark-shell`: scala console
- `spark-sql`: spark SQL console


<br>
<br>
<br>

### _Reference_
> [_Spark: The Definitive Guide_](https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/)  