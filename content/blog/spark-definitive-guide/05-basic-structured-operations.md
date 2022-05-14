---
title: "Chapter 5. Basic Structured Operations"
date: "2022-05-14T22:08:03.284Z"
template: "post"
draft: false
category: "[Spark: The Definitive Guide]"
tags:
  - "Spark"
  - "Spark: The Definitive Guide"
  - "Apache Spark"
description: "
[Part 2] Structured APIs: DataFrames, SQL, and Datasets
Chapter 5. Basic Structured Operations
"
socialImage: ""
---


> _Spark: The Definitive Guide 내용 정리_

<br>


# Schema

- DataFrame의 column name과 data type을 정의
- Data source에서 schema를 얻거나 직접 정의 가능
- 여러 개의 `StructField` type filed로 구성된 `StructType` object
- Spark는 runtime에 data type이 schema의 data type과 일치하지 않으면 오류를 발생시킨다.

### StructField

- Column name, Data type, Missing이나 null value를 가질 수 있는지 여부(boolean)를 값으로 가진다.
- 필요한 경우 column과 관련된 metadata를 지정할 수 있다.

### Example

```python
spark.read.format("json").load("/data/flight-data.json").schema

>>> StructType(List(StructField(DEST_COUNTRY_NAME,StringType,true),StructField(ORIGIN_COUNTRY_NAME,StringType,true),StructField(count,LongType,true)))
```

<br>

# Columns

- `col` 함수 or `column` 함수: column을 생성하고 참조하는 간단한 방법
    
    Column은 column name을 **catalog**에 저장된 정보와 비교하기 전까지 unresolved 상태이다.
    
    **Analyzer** 단계에서 column과 table을 분석한다. (chapter 4 참조)
    
    ```python
    from pyspark.sql.functions import col, column
    col("someColumnName")
    column("someColumnName")
    
    >>> Column<someColumnName>
    ```
    

### Explicit column references

- column을 refer 하는 데 사용하는 `col` method는 join 시에 유용하다.
    
    예를 들어 DataFrame의 특정 column을 다른 DataFrame의 join 대상 column에서 참조하기 위해 사용한다.
    
- `col` method를 사용해 explicit 하게 column을 정의하면, spark는 analyzer 단계에서 column resolve 절차를 생략할 수 있다.

```scala
// scala
df.col("count")
```

<br>

# Expressions

- DataFrame record의 여러 값에 대한 transformation 집합
- 여러 column name을 input으로 받아 식별하고, single value(Map이나 Array 등의 complex type 포함)를 만들기 위해 다양한 expressions를 각 record에 적용하는 함수
- 표현식은 `expr` 함수로 가장 간단히 사용할 수 있다. (column reference도 가능)

### Columns as expressions

- **Columns는 단지 expressions일 뿐이다.**
- **Columns와 transformations는 parsed expressions와 동일한 logical plan으로 compile 된다.**
- 아래의 3가지 모두 동일한 transformation 과정을 거친다.
    - `expr("someCol - 5")`
    - `col("someCol") - 5`
    - `expr("someCol") - 5`
    

### Access DataFrame’s columns

- `printSchema` method: DataFrame의 전체 column 정보를 확인할 수 있다.
- 그러나 programming 방식으로 column에 접근할 때는 DataFrames의 `columns` property를 사용한다.

```python
spark.read.format("json").load("/data/flight-data.json").columns

>>> ['DEST_COUNTRY_NAME', 'ORIGIN_COUNTRY_NAME', 'count']
```

<br>

# Records/Rows

- Spark에서 DataFrame의 각 row는 하나의 record
- Row object는 내부에 byte array를 가진다.      
    이 byte array interface는 오직 column expressions로만 다룰 수 있으므로, user에게 절대 노출되지 않는다.
    
- Row object는 schema 정보를 가지고 있지 않다. (DataFrame만 유일하게 schema를 가진다.)
- Row object를 직접 생성하려면 DataFrame의 **schema와 같은 순서로** 값을 명시해야 한다.
    
    ```python
    from pyspark.sql import Row
    myRow = Row("Hello", None, 1, False)
    ```
    
- Row data에 접근하려면 원하는 위치를 지정하면 된다.      
    Scala나 java에서는 helper method를 사용하거나 명시적으로 data type을 지정해야 하지만, python이나 R에서는 올바른 data type으로 자동 변환된다.
    
    ```scala
    myRow(0)  // Any type
    myRow(0).asInstanceOf[String]
    myRow.getString(0)
    ```
    
    ```python
    myRow[2]
    >>> 1
    ```
    
<br>

# DataFrame Transformations

### Create DataFrame

```python
# 방법 1
df = spark.read.format("json").load("/data/flight-data.json")
```

```python
# 방법 2
from pyspark.sql import Row
from pyspark.sql.types import StructField, StructType, StringType, LongType

mySchema = StructType([
  StructField("some", StringType(), True),
  StructField("col", StringType(), True),
  StructField("names", LongType(), False)
])

myRow = Row("Hello", None, 1)

myDf = spark.createDataFrame([myRow], mySchema)

myDf.show()
>>>
+-----+----+-----+
| some| col|names|
+-----+----+-----+
|Hello|null|    1|
+-----+----+-----+
```

<br>

### select

- DataFrame의 column을 다룰 때 SQL을 사용할 수 있다.
- `select` method는 string column name을 parameter로 받는다.

```python
# SELECT col1, col2 FROM table LIMIT 2
df.select("DEST_COUNTRY_NAME", "ORIGIN_COUNTRY_NAME").show(2)

>>>
+-----------------+-------------------+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|
+-----------------+-------------------+
|    United States|            Romania|
|    United States|            Croatia|
+-----------------+-------------------+
```

```python
from pyspark.sql.functions import expr, col, column

df.select(
    expr("DEST_COUNTRY_NAME"),
    col("DEST_COUNTRY_NAME"),
    column("DEST_COUNTRY_NAME"))\
  .show(2)

>>>
+-----------------+-----------------+-----------------+
|DEST_COUNTRY_NAME|DEST_COUNTRY_NAME|DEST_COUNTRY_NAME|
+-----------------+-----------------+-----------------+
|    United States|    United States|    United States|
|    United States|    United States|    United States|
+-----------------+-----------------+-----------------+
```

```python
df.select(expr("DEST_COUNTRY_NAME as destination").alias("DEST_COUNTRY_NAME")).show(2)

>>>
+-----------------+
|DEST_COUNTRY_NAME|
+-----------------+
|    United States|
|    United States|
+-----------------+
```

<br>

### selectExpr

- `selectExpr` method는 string expressions를 사용한다.

```python
# SELECT *, (col1 = col2) as col3 FROM table LIMIT 2

df.selectExpr(
  "*", # all original columns
  "(DEST_COUNTRY_NAME = ORIGIN_COUNTRY_NAME) as withinCountry")\
  .show(2)

>>>
+-----------------+-------------------+-----+-------------+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|count|withinCountry|
+-----------------+-------------------+-----+-------------+
|    United States|            Romania|   15|        false|
|    United States|            Croatia|    1|        false|
+-----------------+-------------------+-----+-------------+
```

```python
# SELECT avg(col1), count(distinct(col2)) FROM table LIMIT 2

df.selectExpr("avg(count)", "count(distinct(DEST_COUNTRY_NAME))").show(2)

>>>
+-----------+---------------------------------+
| avg(count)|count(DISTINCT DEST_COUNTRY_NAME)|
+-----------+---------------------------------+
|1770.765625|                              132|
+-----------+---------------------------------+
```

<br>

### lit (literal)

- 새로운 column이 아닌 explicit한 value를 전달할 때 사용
- 어떤 constant나 프로그래밍으로 생성된 variable이 특정 column의 값보다 큰지 등을 확인할 때 사용

```python
# SELECT *, 1 as One FROM table LIMIT 2

from pyspark.sql.functions import lit

df.select(expr("*"), lit(1).alias("One")).show(2)

>>>
+-----------------+-------------------+-----+---+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|count|One|
+-----------------+-------------------+-----+---+
|    United States|            Romania|   15|  1|
|    United States|            Croatia|    1|  1|
+-----------------+-------------------+-----+---+
```

<br>

### withColumn

- Column을 추가
- `withColumn(column_name, expression)`

```python
df.withColumn("withinCountry", expr("ORIGIN_COUNTRY_NAME == DEST_COUNTRY_NAME"))\
  .show(2)

>>>
+-----------------+-------------------+-----+-------------+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|count|withinCountry|
+-----------------+-------------------+-----+-------------+
|    United States|            Romania|   15|        false|
|    United States|            Croatia|    1|        false|
+-----------------+-------------------+-----+-------------+
```

<br>

### withColumnRenamed

- `withColumnRenamed(original_name, new_name)`

```python
df.columns
>>>
['DEST_COUNTRY_NAME', 'ORIGIN_COUNTRY_NAME', 'count']

df.withColumnRenamed("DEST_COUNTRY_NAME", "dest").columns
>>>
['dest', 'ORIGIN_COUNTRY_NAME', 'count']
```

<br>

### Reserved Characters

- Expression에서 공백이나 dash(`-`) 같은 reserved characters를 column name로 사용하려면 backtick(```)을 사용해 escaping 해야 하는 경우가 있다.
- Expression이 아닌 string을 사용해 명시적으로 column을 참조하면, literal로 해석되기 때문에 reserved characters를 사용할 수 있다.  
    그러나 expression에서는 escaping 처리가 필요하다.
    

```python
# SELECT col1, col2 as col3 FROM table LIMIT 2

dfWithLongColName.selectExpr(
    "`This Long Column-Name`",
    "`This Long Column-Name` as `new col`")\
  .show(2)

>>>
+---------------------+-------+
|This Long Column-Name|new col|
+---------------------+-------+
|              Romania|Romania|
|              Croatia|Croatia|
+---------------------+-------+
```

<br>

### Case Sensitivity

- 기본적으로 spark는 대소문자를 가리지 않는다.
- 대소문자를 구분하게 하려면 아래와 같이 설정한다.
    
    ```sql
    set spark.sql.caseSensitive true
    ```
    

<br>

### cast

- 특정 data type을 다른 data type으로 변환

```python
# SELECT *, cast(col1 as string) AS col2 FROM table

df.withColumn("col2", col("col1").cast("string"))
```

<br>

### filter, where

- Spark는 filter의 순서와 상관없이 동시에 모든 filtering 작업을 수행하기 때문에 항상 유용한 것은 아니다.
    
    여러 개의 AND filter를 지정하려면 차례대로 filter를 연결해야 하고, 판단은 spark에 맡겨야 한다.
    

```python
# SELECT * FROM table WHERE col1 < 2 LIMIT 2

df.filter(col("count") < 2).show(2)
df.where("count < 2").show(2)

>>>
+-----------------+-------------------+-----+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|count|
+-----------------+-------------------+-----+
|    United States|            Croatia|    1|
|    United States|          Singapore|    1|
+-----------------+-------------------+-----+
```

```python
# SELECT * FROM table WHERE col1 < 2 AND col2 != 'something' LIMIT 2

df.where(col("count") < 2).where(col("ORIGIN_COUNTRY_NAME") != "Croatia").show(2)
df.where("count < 2 and ORIGIN_COUNTRY_NAME != 'Croatia'").show(2)

>>>
+-----------------+-------------------+-----+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|count|
+-----------------+-------------------+-----+
|    United States|          Singapore|    1|
|          Moldova|      United States|    1|
+-----------------+-------------------+-----+
```

<br>

### union

- DataFrame은 immutable 하다.      
    DataFrame에 record를 추가하는 것은 DataFrame을 변경하는 작업이기 때문에 불가능하다.      
    Record를 추가하려면 원본 DataFrame을 새로운 DataFrame과 union 해야한다.
    
- Union은 2개의 DataFrame을 단순히 결합하는 것이다.      
    2개의 DataFrame은 반드시 동일한 schema와 column 수를 가져야 한다.      

```python
from pyspark.sql import Row

schema = df.schema
newRows = [
  Row("New Country", "Other Country", 5L),     # L only works on python 2
  Row("New Country 2", "Other Country 3", 1L)
]

parallelizedRows = spark.sparkContext.parallelize(newRows)
newDF = spark.createDataFrame(parallelizedRows, schema)

df.union(newDF)\
  .where("count = 1")\
  .where(col("ORIGIN_COUNTRY_NAME") != "United States")\
  .show()

>>>
+-----------------+-------------------+-----+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|count|
+-----------------+-------------------+-----+
|    United States|            Croatia|    1|
|    United States|          Singapore|    1|
|    United States|          Gibraltar|    1|
|    United States|             Cyprus|    1|
|    United States|            Estonia|    1|
|    United States|          Lithuania|    1|
|    United States|           Bulgaria|    1|
|    United States|            Georgia|    1|
|    United States|            Bahrain|    1|
|    United States|   Papua New Guinea|    1|
|    United States|         Montenegro|    1|
|    United States|            Namibia|    1|
|    New Country 2|    Other Country 3|    1|
+-----------------+-------------------+-----+
```

<br>

### sort, orderBy

- Row 정렬 (default는 오름차순)
- 두 method는 완전히 같은 방식으로 동작하는데, spark code를 살펴보면, orderBy method 내부에서 sort method를 호출한다.

```python
from pyspark.sql.functions import desc, asc

df.orderBy(expr("count desc")).show(2)
>>>
+-----------------+-------------------+-----+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME|count|
+-----------------+-------------------+-----+
|          Moldova|      United States|    1|
|    United States|            Croatia|    1|
+-----------------+-------------------+-----+

# SELECT * FROM table ORDER BY col1 DESC, col2 ASC LIMIT 2
df.orderBy(col("count").desc(), col("DEST_COUNTRY_NAME").asc()).show(2)
>>>
+-----------------+-------------------+------+
|DEST_COUNTRY_NAME|ORIGIN_COUNTRY_NAME| count|
+-----------------+-------------------+------+
|    United States|      United States|370002|
|    United States|             Canada|  8483|
+-----------------+-------------------+------+
```

<br>

### repartition

- 향후에 사용할 partition 수가 현재 partition 수보다 많거나, column을 기준으로 partition을 만드는 경우에만 사용해야 한다.
- repartition method를 호출하면 무조건 전체 data를 shuffle 한다.
- 특정 column을 기준으로 자주 filtering 한다면, 자주 filtering 되는 column을 기준으로 partition을 재분배하는 것이 좋다.

```python
df.rdd.getNumPartitions()
>>> 1

df.repartition(5)
df.repartition(col("DEST_COUNTRY_NAME"))
df.repartition(5, col("DEST_COUNTRY_NAME"))
```

<br>

### coalesce

- 전체 data를 shuffle 하지 않고 partition을 병합하려는 경우에 사용한다.
- Partition 수를 줄이려면 shuffle이 일어나는 repartition 대신 coalesce를 사용해야 한다.

```python
df.repartition(5, col("DEST_COUNTRY_NAME")).coalesce(2)
```

<br>

### Collecting rows to the driver

- Driver로 모든 data collection을 수집하는 작업은 매우 큰 비용이 발생하며, 대규모 data set에 수행할 경우 비정상적으로 종료될 수도 있다.
- `collect`: 전체 DataFrame의 모든 data를 수집
- `take`: 상위 N개의 row return
- `show`: 여러 rows를 보기 좋게 출력
- `toLocalIterator`: iterator로, 모든 partition의 data를 driver에 전달 (data set의 partition을 차례로 반복 처리 가능)
    
    그러나 연산을 병렬로 수행하지 않고, 차례로 수행하기 때문에 매우 큰 처리 비용이 발생

<br>
<br>
<br>

### _Reference_
> [_Spark: The Definitive Guide_](https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/)  