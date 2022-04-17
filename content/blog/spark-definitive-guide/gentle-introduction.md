---
title: "Chapter 2. A Gentle Introduction to Spark"
date: "2022-04-17T21:34:03.284Z"
template: "post"
draft: false
category: "[Spark: The Definitive Guide]"
tags:
  - "Spark"
  - "Spark: The Definitive Guide"
  - "Apache Spark"
description: "
[Part 1] Gentle Overview of Big Data and Spark
Chapter 2. A Gentle Introduction to Spark
"
socialImage: ""
---


> _Spark: The Definitive Guide 내용 정리_

<br>

# Cluster

- 여러 컴퓨터의 자원을 모아 하나의 컴퓨터처럼 사용할 수 있게 만든다.
- Cluster에서 작업을 조율할 수 있는 framework가 필요한데, spark가 그런 역할을 하는 framework

<br>
<br>

# Spark Application

- Spark는 사용 가능한 자원을 파악하기 위해 cluster manager(ex. spark standalone cluster manager, hadoop YARN, Mesos)를 사용

## Driver process

- SparkSession
- Cluster node 중 하나에서 실행된다.
- `main()` 함수를 실행
- Spark application 정보 관리, 입력에 대한 응답, 전반적인 executor process의 작업과 관련된 분석, 배포, scheduling 역할 수행
- Application 수명 주기 동안 관련 정보를 모두 유지
- Spark의 언어 API를 통해 다양한 언어(scala, java, python, SQL, R)로 실행 가능

## Executor process

- Driver process가 할당한 코드를 실행하고, 진행 상황을 driver node에 보고
- 각 node에 할당할 executor 수 지정 가능
- 대부분 spark code를 실행하는 역할

<br>
<br>

# SparkSession

- SparkSession이라 불리는 driver process로 spark application을 제어한다.
- SparkSession instance는 사용자의 처리 명령을 cluster에서 실행
- 하나의 SparkSession은 하나의 Spark application에 대응한다.
- 대화형 모드(python의 경우 command: `pyspark`)로 spark를 시작하면 SparkSession이 자동으로 생성된다.
    
    ```python
    spark
    
    >>> <pyspark.sql.session.SparkSession object at 0x7fe4d2281280>
    ```
    

<br>

### Example: Spark DataFrame 생성

- Cluster mode에서 아래의 예제를 실행하면, 숫자 범위의 각 부분이 서로 다른 executor에 할당된다.
- 이 숫자들은 **distributed collection**이다.
    
    ```python
    my_range = spark.range(1000).toDF("number")
    
    my_range
    >>> DataFrame[number: bigint]
    
    my_range.toPandas()
    >>>
         number
    0         0
    1         1
    2         2
    3         3
    4         4
    ..      ...
    995     995
    996     996
    997     997
    998     998
    999     999
    [1000 rows x 1 columns]
    ```
    

<br>
<br>

# DataFrame

- 가장 대표적인 **Structured API**
- Table의 data를 row와 column으로 단순하게 표현
- **Schema:** column과 column type을 정의한 목록
- Spark DataFrame은 데이터센터의 수천 대의 컴퓨터에 분산되어 있다.
- Python과 R의 DataFrame은 일반적으로 분산 컴퓨터가 아닌 단일 컴퓨터에 존재
- Spark는 Python 과 R 언어를 지원하기 때문에, Python Pandas library의 DataFrame과 R의 DataFrame을 Spark DataFrame으로 쉽게 변환 가능

<br>

# Partition

- Cluster의 물리적 machine에 존재하는 row의 집합으로, 실행 중에 data가 computer cluster에서 물리적으로 분산되는 방식을 나타낸다.
- 모든 executor가 병렬로 작업을 수행할 수 있도록 partition이라 불리는 chunk 단위로 데이터를 분할
- Partition이 하나이면 executor가 많아도 병렬성은 1이 되고, partition이 많고 executor가 하나인 경우에도 병렬성은 1이 된다.
- DataFrame을 사용하면, partition을 수동 혹은 개별적으로 처리할 필요가 없다.

<br>
<br>

# Transformation

- Spark의 핵심 데이터 구조는 immutable 하다.
- DataFrame을 변경하려면 원하는 방법을 spark에 알려줘야 하는데, 이 때 사용하는 명령을 transformation이라고 한다.

<br>

### Example: Find even number

- 아래의 코드를 실행해도 결과는 출력되지 않는다.
    
    추상적인 transformation만 지정한 상태이기 때문에, action을 호출하지 않으면 실제 transformation을 수행하지 않는다.
    
    ```python
    even_num = my_range.where("number % 2 = 0")
    ```
    

<br>

### Narrow dependency

- 좁은 의존성을 가진 transformation은 각 입력 partition이 하나의 출력 partition에만 영향을 미친다. (1:1)
- **Pipelining**이 자동으로 수행된다.
    
    즉, DataFrame에 여러 필터를 지정하는 경우 모든 작업이 메모리에서 일어난다.
    
- 위의 where 구문은 좁은 의존성을 가진다.

### Wide dependency

- 넓은 의존성을 가진 transformation은 하나의 입력 partition이 여러 출력 partition에 영향을 미친다. (1:N)
- **Shuffle:** 스파크가 cluster에서 partition을 교환하는 것
- 스파크는 shuffle의 결과를 disk에 저장한다.


<br>
<br>

# Lazy Evaluation

- Spark가 연산 그래프를 처리하기 직전까지 기다리는 동작 방식
- 실제 코드를 실행하기 전에 그 로직을 기본 실행 계획으로 compile 한다.
- Example: DataFrame의 **Predicate Pushdown**(조건절 푸시다운)
    - 복잡한 spark job이 원시 data에서 하나의 row만 가져오는 filter를 가지고 있다면, 필요한 record 하나만 읽는 것이 가장 효율적이다.
        
        spark는 이 filter를 data source로 위임하는 최적화 작업을 자동으로 수행한다.
        
        예를 들어 데이터 저장소가 database라면 where 절의 처리를 database에 위임하고, spark는 하나의 record만 받는다.
        

<br>

# Action

- Transformation으로부터 결과를 실제로 계산하도록 지시하는 명령
- Action을 지정하면 Spark **Job**이 시작된다.
- **Spark Job**은 개별 action에 의해 trigger되는 다수의 transformation으로 이루어져있다.

<br>

### Example: Return the number of records

- 아래의 예시에서 spark Job은 filter (narrow transformation)를 수행한 후 partition 별로 record 수를 count (wide transformation) 한다.
    
    그리고 각 언어에 적합한 native 객체에 결과를 모은다.
    
    이 때 spark가 제공하는 spark UI로 cluster에서 실행 중인 spark job을 monitoring 할 수 있다.
    
    ```python
    even_num.count()
    >>> 500
    ```
    

<br>

# Spark UI

- Spark Job의 진행 상황을 monitoring 할 때 사용
- Spark Job의 상태, 환경 설정, cluster 상태 등 확인 가능
- Spark Job을 tuning 하고 debugging 할 때 매우 유용
- Driver node의 4040 port로 접속 가능 (ex. `http://localhost:4040`)


<br>
<br>

# Examples

### read

- **SparkSession**의 **DataFrameReader** class를 사용해서 데이터를 읽는다.
- DataFrame은 불특정 다수의 row와 column을 가지는데, data를 읽는 과정이 lazy 연산 형태의 transformation이기 때문에 row 수를 알 수 없다.
- **`inferSchema`:** DataFrame의 schema 정보를 알아내는 **schema inference** 기능 사용 가능
    
    각 column의 data type을 추론하기 위해 적은 양의 data를 읽는다.
    
- **`header`:** true인 경우 파일의 첫 row를 header로 지정

```python
data = spark\
  .read\
  .option("inferSchema", "true")\
  .option("header", "true")\
  .csv("/data/summary.csv")
```

<br>

### take

- DataFrame의 `take` action을 호출하면, `head` 명령과 같은 결과를 확인할 수 있다.
- csv file⇒ `read` ⇒ DataFrame ⇒ `take(n)` ⇒ Array(Row(...), Row(...))

```python
data.take(2)

>>>
[Row(DEST_COUNTRY_NAME=u'United States', ORIGIN_COUNTRY_NAME=u'Romania', count=15),
Row(DEST_COUNTRY_NAME=u'United States', ORIGIN_COUNTRY_NAME=u'Ireland', count=344)]
```

<br>

### sort

- `sort` method는 DataFrame을 변경하지 않는다.
- Transformation으로 `sort` method를 사용하면, 이전 DataFrame을 변환한 새로운 DataFrame을 생성해 return 한다.
- 단지 transformation이기 때문에 호출 시 data에 아무런 변화도 일어나지 않지만, spark는 실행 계획을 만들고 검토하여 cluster에서 처리할 방법을 알아낸다.
- csv file ⇒ `read (narrow transformation)` ⇒ DataFrame ⇒ `sort (wide transformation)` ⇒ DataFrame ⇒ `take(n)` ⇒ Array(...)

<br>

### explain

- DataFrame의 계보(lineage)나 spark의 query 실행 계획 확인 가능
- 출력된 실행 계획에서 최종 결과는 가장 위에, data source는 가장 아래에 있다.

```python
data.sort("count").explain()

>>>
== Physical Plan ==
*(2) Sort [count#130 ASC NULLS FIRST], true, 0
+- Exchange rangepartitioning(count#130 ASC NULLS FIRST, 200)   # 200은 partition 개수
   +- *(1) FileScan csv [DEST_COUNTRY_NAME#128,ORIGIN_COUNTRY_NAME#129,count#130] Batched: false, Format: CSV, Location: InMemoryFileIndex[file:/data/flight-data/csv/2015-summary.csv], PartitionFilters: [], PushedFilters: [], ReadSchema: struct<DEST_COUNTRY_NAME:string,ORIGIN_COUNTRY_NAME:string,count:int>
```

<br>

### shuffle.partitions

- Spark는 shuffle 수행 시 기본적으로 200개의 shuffle partition을 생성
- 이 값을 변경하면 runtime이 크게 달라질 수 있다.
- csv file ⇒ `read (narrow transformation)` ⇒ DataFrame (1 partition) ⇒ `sort (wide transformation)` ⇒ DataFrame (5 partitions) ⇒ `take(n)` ⇒ Array(...)

```python
spark.conf.set("spark.sql.shuffle.partitions", "5")

data.sort("count").take(2)
>>>
[Row(DEST_COUNTRY_NAME=u'United States', ORIGIN_COUNTRY_NAME=u'Singapore', count=1),
Row(DEST_COUNTRY_NAME=u'Moldova', ORIGIN_COUNTRY_NAME=u'United States', count=1)]
```


<br>
<br>

# DataFrame and SQL

- **`createOrReplaceTempView`**: 모든 DataFrame을 table이나 view(임시 table)로 등록한다.
    
    아래의 코드 실행 하면 SQL query를 실행할 수 있게 된다.
    
    ```python
    data.createOrReplaceTempView("data_table")
    ```
    
- SQL query는 DataFrame code와 같은 실행 계획으로 compile 되므로 둘의 성능 차이는 없다.

<br>

### sql

- `spark.sql`은 새로운 DataFrame을 return (`spark`는 `SparkSession`의 변수)

```python
# SQL
sqlWay = spark.sql("""
SELECT DEST_COUNTRY_NAME, count(1)
FROM data_table
GROUP BY DEST_COUNTRY_NAME
""")
sqlWay.explain()

>>>
== Physical Plan ==
*(2) HashAggregate(keys=[DEST_COUNTRY_NAME#128], functions=[count(1)])
+- Exchange hashpartitioning(DEST_COUNTRY_NAME#128, 5)
   +- *(1) HashAggregate(keys=[DEST_COUNTRY_NAME#128], functions=[partial_count(1)])
      +- *(1) FileScan csv [DEST_COUNTRY_NAME#128] Batched: false, Format: CSV, Location: InMemoryFileIndex[file:/data/flight-data/csv/2015-summary.csv], PartitionFilters: [], PushedFilters: [], ReadSchema: struct<DEST_COUNTRY_NAME:string>
```

```python
# DataFrame
dataFrameWay = data\
  .groupBy("DEST_COUNTRY_NAME")\
  .count()
dataFrameWay.explain()

>>>
== Physical Plan ==
*(2) HashAggregate(keys=[DEST_COUNTRY_NAME#128], functions=[count(1)])
+- Exchange hashpartitioning(DEST_COUNTRY_NAME#128, 5)
   +- *(1) HashAggregate(keys=[DEST_COUNTRY_NAME#128], functions=[partial_count(1)])
      +- *(1) FileScan csv [DEST_COUNTRY_NAME#128] Batched: false, Format: CSV, Location: InMemoryFileIndex[file:/data/flight-data/csv/2015-summary.csv], PartitionFilters: [], PushedFilters: [], ReadSchema: struct<DEST_COUNTRY_NAME:string>
```

<br>

### max

- DataFrame의 특정 column 값을 스캔하면서 이전 최댓값보다 더 큰 값을 찾는다.
- Filtering을 수행해 단일 row를 결과로 return 하는 transformation

<br>
<br>
<br>

### _Reference_
> [_Spark: The Definitive Guide_](https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/)  