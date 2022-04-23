---
title: "Chapter 3. A Tour of Spark's Toolset"
date: "2022-04-23T17:59:03.284Z"
template: "post"
draft: false
category: "[Spark: The Definitive Guide]"
tags:
  - "Spark"
  - "Spark: The Definitive Guide"
  - "Apache Spark"
description: "
[Part 1] Gentle Overview of Big Data and Spark
Chapter 3. A Tour of Spark's Toolset
"
socialImage: ""
---


> _Spark: The Definitive Guide 내용 정리_

<br>


# Production Application

- Spark를 사용하면 big data program을 쉽게 개발 할 수 있다.

### spark-submit

- 대화형 shell에서 개발한 program을 production application으로 쉽게 전환 가능
- application code를 cluster에 전송해 실행시키는 역할
- application 실행에 필요한 resource와 실행 방식, 그리고 다양한 option 지정 가능

```python
./bin/spark-submit \
  --master local \
  ./examples/pi.py 10
```

<br>

# Dataset

> **Statically typed (정적 타입):** 자료형이 고정된 언어. Java, Scala, C, C++ 등.  
**Dynamically typed (동적 타입):** Python, JavaScript 등
> 

- Type-safe를 제공하는 structured API
- Statically typed code를 지원하기 위해 고안된 API로, 동적 타입 언어인 python과 R에서는 사용할 수 없다.
- DataFrame은 다양한 data type의 tabular data를 보관할 수 있는 Row type의 객체로 구성된 분산 collection.  
    Dataset API는 이러한 DataFrame의 record를 사용자가 java나 scala로 정의한 class에 할당하고, 고정 타입형 collection으로 다룰 수 있는 기능을 제공
    
- Type-safe 하므로, 초기화에 사용한 class 대신 다른 class를 사용해 접근하는 것은 불가
- 다수의 engineer가 잘 정의된 interface로 interact 하는 대규모 application을 개발하는 데 특히 유용

<br>

# Structured Streaming

- Spark 2.2 version에서 production-ready(안정화) 된 stream 처리용 고수준 API
- Structured API로 개발된 batch mode의 연산을 streaming 방식으로 실행할 수 있으며, latency를 줄이고 incremental processing을 할 수 있다.
- Structured streaming의 장점은 코드의 변경이 거의 없이 streaming 처리를 수행하고 값을 빠르게 얻을 수 있다는 것이다.
- Prototype을 batch job으로 개발한 다음 streaming job으로 변환할 수 있으므로 개념 잡기가 쉽다.

<br>

### Example: static dataset

- 정적 데이터셋의 data를 분석해 DataFrame을 생성
    
    이 때 정적 데이터셋의 schema도 함께 생성
    
    
```python
# Read static dataset

staticDataFrame = spark.read.format("csv")\
    .option("header", "true")\
    .option("inferSchema", "true")\
    .load("/data/retail-data/by-day/*.csv")

staticDataFrame.createOrReplaceTempView("retail_data")
staticSchema = staticDataFrame.schema

staticSchema
>>>
StructType(List(StructField(InvoiceNo,StringType,true),StructField(InvoiceDate,TimestampType,true),...))
```



```python
# Filter

from pyspark.sql.functions import window, col

staticDataFrame\
    .selectExpr(
    "CustomerId",
    "(UnitPrice * Quantity) as total_cost",
    "InvoiceDate")\
    .groupBy(
    col("CustomerId"), window(col("InvoiceDate"), "1 day"))\
    .sum("total_cost")\
    .show(5)

>>>
+----------+--------------------+-----------------+
|CustomerId|              window|  sum(total_cost)|
+----------+--------------------+-----------------+
|   16057.0|[2011-12-05 00:00...|            -37.6|
|   14126.0|[2011-11-29 00:00...|643.6300000000001|
|   13500.0|[2011-11-16 00:00...|497.9700000000001|
|   17160.0|[2011-11-08 00:00...|516.8499999999999|
|   15608.0|[2011-11-11 00:00...|            122.4|
+----------+--------------------+-----------------+
only showing top 5 rows
```

<br>

### Example: streaming

- `read` method 대신 `readStream` method 사용
- `maxFilesPerTrigger` 옵션: 한 번에 읽을 파일 수 설정      
    아래의 예시를 streaming 답게 만들어 주는 역할이지만, production 환경에서는 적용하는 것을 추천하지 않는다.
    
    ```python
    # Read streaming data
    
    streamingDataFrame = spark.readStream\
        .schema(staticSchema)\
        .option("maxFilesPerTrigger", 1)\
        .format("csv")\
        .option("header", "true")\
        .load("/data/retail-data/by-day/*.csv")
    
    streamingDataFrame
    >>> DataFrame[InvoiceNo: string, StockCode: string, Description: string, Quantity: int, InvoiceDate: timestamp, UnitPrice: double, CustomerID: double, Country: string]
    
    streamingDataFrame.isStreaming
    >>> True
    ```
    

- 기존 DataFrame 처리와 동일한 business logic을 적용
    
    이 작업 역시 lazy operation이므로 data flow를 실행하기 위해 streaming action을 호출해야 한다.
    
    ```python
    # Filter (same as static example above)
    
    purchaseByCustomerPerHour = streamingDataFrame\
      .selectExpr(
        "CustomerId",
        "(UnitPrice * Quantity) as total_cost",
        "InvoiceDate")\
      .groupBy(
        col("CustomerId"), window(col("InvoiceDate"), "1 day"))\
      .sum("total_cost")
    
    purchaseByCustomerPerHour.isStreaming
    >>> True
    ```
    
- **Streaming action**
    
    Trigger가 실행된 다음, data를 갱신할 in-memory table에 데이터를 저장
    
    아래의 예시에서는 파일마다 trigger 실행 (Production 환경에서 사용하는 것은 좋지 않다.)
    
    Spark는 이전 집계값보다 더 큰 값이 발생한 경우에만 in-memory table을 갱신하므로, 언제나 가장 큰 값을 얻을 수 있다.
    
    ```python
    # Write to in-memory table
    
    purchaseByCustomerPerHour.writeStream\
        .format("memory")\                  # "memory": in-memory table에 저장 ("console": 콘솔에 결과 출력)
        .queryName("customer_purchases")\   # in-memory에 저장될 table name
        .outputMode("complete")\            # 모든 count 수행 결과를 table에 저장
        .start()
    ```
    
- Stream이 시작되면 쿼리 실행 결과가 어떤 형태로 in-memory table에 기록되는지 확인 가능
    
    더 많은 data를 읽을수록 (각 파일에 있는 data에 따라) 결과가 변경될 수 있고 변경되지 않을 수도 있다.
    
    ```python
    spark.sql("""
      SELECT *
      FROM customer_purchases
      ORDER BY `sum(total_cost)` DESC
      """)\
      .show(5)
    
    >>>
    +----------+--------------------+------------------+
    |CustomerId|              window|   sum(total_cost)|
    +----------+--------------------+------------------+
    |   17450.0|[2011-09-20 00:00...|          71601.44|
    |      null|[2011-11-14 00:00...|          55316.08|
    |      null|[2011-11-07 00:00...|          42939.17|
    |      null|[2011-03-29 00:00...| 33521.39999999998|
    |      null|[2011-12-08 00:00...|31975.590000000007|
    +----------+--------------------+------------------+
    only showing top 5 rows
    ```
    
<br>

# Machine Learning and Advanced Analytics

- 내장된 MLlib을 사용해 대규모 머신러닝을 수행할 수 있다.
- 대용량 데이터를 대상으로 Preprocessing, Munging(Wrangling), Model training, Prediction을 할 수 있다.
- Classification, Regression, Clustering, Deep learning에 이르기까지 관련된 API를 제공

## Example

### StringIndexer

- 값을 수치형으로 반환 (예를 들어 토요일을 6, 월요일을 1로 반환)
- 그러나 번호 지정 체계는 암묵적으로 특정 값이 다른 값보다 더 크다는 것을 의미하게 된다. 이것은 잘못된 방식이다.

```python
from pyspark.ml.feature import StringIndexer

indexer = StringIndexer()\
  .setInputCol("day_of_week")\
  .setOutputCol("day_of_week_index")
```

<br>

### OneHotEncoder

- 위의 StringIndexer의 문제점을 보완하기 위해 사용 가능
- 각 값을 자체 column으로 encoding
- 특정 data가 해당 값인지 아닌지 boolean type으로 나타낼 수 있다.

```python
from pyspark.ml.feature import OneHotEncoder

encoder = OneHotEncoder()\
  .setInputCol("day_of_week_index")\
  .setOutputCol("day_of_week_encoded")
```

<br>

### VectorAssembler

- Spark의 모든 ML 알고리즘은 수치형 벡터 타입을 입력으로 사용한다.

```python
from pyspark.ml.feature import VectorAssembler

vectorAssembler = VectorAssembler()\
  .setInputCols(["UnitPrice", "Quantity", "day_of_week_encoded"])\
  .setOutputCol("features")
```

<br>

### Pipeline

- 위의 3가지 process를 거쳐 input data가 변환되도록 파이프라인 설정

```python
from pyspark.ml import Pipeline

transformationPipeline = Pipeline()\
  .setStages([indexer, encoder, vectorAssembler])
```

<br>

### fit

- Transformer를 dataset에 fit 시켜야 한다.

```python
fittedPipeline = transformationPipeline.fit(trainDataFrame)
```

<br>

### transform

- fitted pipeline을 사용해서 일관되고 반복적인 방식으로 모든 data를 변환

```python
transformedTraining = fittedPipeline.transform(trainDataFrame)
```

<br>

### cache

- caching을 사용하면 중간 변환된 dataset의 복사본을 memory에 저장하므로, 전체 pipeline을 재실행하는 것보다 훨씬 빠르게 반복적으로 dataset에 접근 가능

```python
transformedTraining.cache()
```

<br>

### Training model

- Spark에서 머신러닝 모델을 학습시키는 과정은 크게 두 단계로 진행된다.
    
    첫 번째 단계는 아직 학습되지 않은 모델을 초기화하고, 두 번째 단계는 해당 모델을 학습시킨다.
    
    MLlib의 DataFrame API에서 제공하는 모든 algorithm은 항상 두 가지 유형으로 구성되어 있으며, 학습 전에는 Algorithm으로 학습 후에는 AlgorithmModel의 명명규칙을 따른다.
    

```python
from pyspark.ml.clustering import KMeans

kmeans = KMeans()\
  .setK(20)\
  .setSeed(1L)   # 1L only works in Python 2

kmModel = kmeans.fit(transformedTraining)
```

<br>

### Compute cost

- Model training이 완료되면, 몇 가지 성과 평가지표에 따라 학습 dataset에 대한 cost를 계산할 수 있다.

```python
kmModel.computeCost(transformedTraining)

transformedTest = fittedPipeline.transform(testDataFrame)
kmModel.computCost(transformedTest)
```

<br>

# Lower-Level API

- Spark는 RDD를 통해 java와 python object를 다루는 데 필요한 다양한 기본 기능(lower-level API)을 제공한다.
- Spark의 거의 모든 기능은 RDD를 기반으로 만들어졌다. (DataFrame 연산도 RDD를 기반으로 만들어졌다.)
- 최신 버전의 spark에서는 기본적으로 RDD를 사용하지 않지만, unstructured data나 raw unprocessed data를 처리해야 한다면 RDD를 사용해야 하는 경우도 있다.
- Scala뿐만 아니라 Python에서도 사용할 수 있지만, 언어와 관계없이 동일한 실행 특성을 제공하는 DataFrame API와는 다르게, RDD는 세부 구현 방식에서 언어 간의 차이를 보인다.

### Example

- Driver system의 memory에 저장된 row data를 parallelize(병렬처리) 하는 데 사용할 수 있다.
- 아래의 예시에서는 병렬처리 후 다른 DataFrame과 함께 사용할 수 있도록 DataFrame으로 변환한다.

<br>
<br>
<br>

### _Reference_
> [_Spark: The Definitive Guide_](https://www.oreilly.com/library/view/spark-the-definitive/9781491912201/)  