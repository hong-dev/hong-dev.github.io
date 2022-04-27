---
title: "Chapter 4. Structured API Overview"
date: "2022-04-28T08:43:03.284Z"
template: "post"
draft: false
category: "[Spark: The Definitive Guide]"
tags:
  - "Spark"
  - "Spark: The Definitive Guide"
  - "Apache Spark"
description: "
[Part 2] Structured APIs: DataFrames, SQL, and Datasets
Chapter 4. Structured API Overview
"
socialImage: ""
---


> _Spark: The Definitive Guide 내용 정리_

<br>

# Overview

- Apache Spark Community는 2.0 version을 출시하면서 structured API를 도입했다.
- 1.x 버전에서는 RDD와 같은 lower-level API를 활용하는 방법이 주를 이루었으나, 2.0 출시 이후에는 자동화된 최적화 기능과 장애 대응 능력을 제공하는 structured API의 사용이 필수적이다.
- Structured API 종류: Dataset, DataFrame, SQL table/View
- Batch와 Streaming 처리에서 structured API 사용 가능

<br>

# DataFrame and Dataset

- 잘 정의된 row와 column을 가지는 분산 table 형태의 collection
- 결과를 생성하기 위해 어떤 data에 어떤 연산을 적용해야 하는지 정의하는 지연 연산의 실행 계획
- Immutable

<br>

# Schema

- 분산 collection에 저장할 data type을 정의하는 방법. DataFrame의 column name과 data type을 정의
- Data source에서 얻거나 (schema-on-read) 직접 정의 가능

<br>

# Structured data type

- Spark는 사실상 programming 언어

<br>

### Catalyst Engine

- Spark는 실행 계획 수립과 처리에 사용하는 자체 data type 정보를 가지고 있는 catalyst engine을 사용
- 다양한 실행 최적화 기능을 제공

<br>

### DataFrame vs Dataset

- Untyped `DataFrame` vs Typed `Dataset`
- DataFrame에도 data type이 있지만, schema에 명시된 data type 일치 여부를 **runtime**이 되어서야 확인  
    Dataset은 schema에 명시된 data type 일치 여부를 **compile time**에 확인
    
- Dataset은 JVM 기반의 언어인 scala와 java에서만 지원  
    Dataset의 data type을 정의하려면 scale의 `case class`나 `JavaBean`을 사용해야 한다.
    
- DataFrame은 Row type으로 구성된 Dataset  
    Row type을 사용하면 garbage collection과 객체 초기화 부하가 있는 JVM data type 대신, 자체 data format을 사용하기 때문에 매우 효율적인 연산 가능  
    **DataFrame을 사용하면 spark의 최적화된 내부 format을 사용할 수 있다.**  
    최적화된 내부 format을 사용하면, 어떤 언어 API를 사용하더라도 동일한 효과와 효율성을 얻을 수 있다.
    

<br>

### Column

- Integer나 string 같은 **simple type**, array나 map 같은 **complex type**, 그리고 **null value**를 표현한다.
- Spark는 data type의 모든 정보를 추적하며 다양한 column transformation 방법을 제공

<br>

### Row

- Data record
- DataFrame의 record는 Row type으로 구성된다.
- Row는 SQL, RDD, Data source에서 얻거나 직접 만들 수 있다.

  ```python
  spark.range(2).collect()
  >>> [Row(id=0), Row(id=1)]
  ```

<br>

### Spark Data Type

- Spark는 여러 가지 내부 data type을 가지고 있다.
- Spark data type을 python에서 사용
    
    ```python
    from pyspark.sql.types import *
    
    b = ByteType()
    
    b
    >>> ByteType
    ```
   

<br>

### Python-Spark data type mapping

| Spark data type | Python data type |
| --- | --- |
| ByteType | int, long (1 byte, -125~127) |
| ShortType | int, long (2 bytes, -32768~32767) |
| IntegerType | int, long (숫자값이 너무 크면 LongType 사용) |
| LongType | long (8 bytes, 더 큰 숫자는 decimal.Decimal 사용) |
| FloatType | float (4 bytes, single-precision floating point) |
| DoubleType | float |
| DecimalType | decimal.Decimal |
| StringType | string |
| BinaryType | bytearray |
| BooleanType | bool |
| TimestampType | datetime.datetime |
| DateType | datetime.date |
| ArrayType | list, tuple, array |
| MapType | dict |
| StructType | list, tuple (ex. StructType([StructField, ...])) |
| StructField | 각 field의 type (ex. StructField(name, dataType, [nullable])) |


<br>

# Structured API Execution

### Execution steps

1. DataFrame/Dataset/SQL을 이용해 코드 작성
2. Valid code라면, spark가 code를 **Logical Plan**으로 convert
3. Spark는 Logical Plan을 **Physical Plan**으로 transform하며, 그 과정에서 optimizations을 할 수 있는지 확인
4. Cluster에서 **Physical Plan**(RDD manipulations) 실행

<br>

### Logical Planning

- Abstract transformation만 표현
- driver나 executor의 정보를 고려하지 않는다.
- 사용자의 다양한 표현식을 최적화된 버전으로 변환

```python
User code
-> Unresolved logical plan
   코드의 유효성과 table/column의 존재 여부만 판단
   실행 계획 검증 X
   Spark analyzer는 column/table을 검증하기 위해 catalog(a repository of all table and DF info)를 활용
   필요한 table이나 column이 catalog에 없다면 unresolved logical plan이 만들어지지 않는다.
-> Resolved logical plan
-> Catalyst Optimizer로 전달 (Logical optimization)
   Catalyst Optimizer: Predicate pushing down이나 selections를 이용해 logical plan을 optimize 하는 규칙 모음
-> Optimized logical plan
```

<br>

### Physical Planning

- Spark plan 이라고도 불린다.
- Logical plan을 cluster 환경에서 실행하는 방법을 정의
- Physical plan은 일련의 RDD와 transformation으로 변환된다.
    
    Spark는 DataFrame, Dataset, SQL로 정의된 query를 RDD transformation으로 compile 한다.
    
    따라서 spark를 **compiler**라고 부르기도 한다.
    

```python
Optimized logical plan
-> 다양한 physical plan 생성
-> Cost model을 이용해서 비교
   ex) table의 크기나 partition 수 등의 physical attributes를 고려해 연산 수행에 필요한 비용을 계산하고 비교
-> Best physical plan
-> Execute on the cluster
```

<br>

### Execution

- Best physical plan이 선정되면, lower-level programming interface인 RDD를 대상으로 모든 코드를 실행한다.
- Spark는 runtime에 전체 task나 stage를 제거할 수 있는 java byte code를 생성해 추가적인 optimization을 수행
- 그렇게 처리한 결과를 user에게 return

<br>
<br>
<br>

### _Reference_
> [_Spark: The Definitive Guide_](https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/)  