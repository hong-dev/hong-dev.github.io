---
title: "순위 동점자 처리 : Pandas DataFrame Rank"
date: "2020-04-09T11:12:03.284Z"
template : "post"
draft: false
slug: "pandas/rank"
category: "python"
tags:
  - "Python"
  - "Django"
  - "Pandas"
  - "DataFrame"
  - "Wepizza"
  - "Project"
  - "Rank"
description: "pandas.DataFrame의 rank options: ascending, method(average, min, max, first)"
socialImage: ""
---



## dataframe.rank()
* Dataframe에서 특정 column을 기준으로 순위를 return
* rank의 결과는 소수점 한자리까지 나타남\
`example)` 2.0, 3.5

## Ascending (True, False)
```python
dataframe.rank(ascending = True)  #오름차순
dataframe.rank(ascending = False) #내림차순
```

## Method (average, min, max, first)
### 1) average
* 동점 발생 시 두 순위의 평균 순위를 반영
* method를 지정하지 않으면 average가 default method로 적용된다.

```python
dataframe.rank(method = 'average')

0   1.0
1   2.0
2   3.5
3   3.5
4   5.0
```

### 2) min
* 동점 발생 시 더 높은 순위로 공동 순위를 return

```python
dataframe.rank(method = 'min')

0   1.0
1   2.0
2   3.0
3   3.0
4   5.0
```

### 3) max
* 동점 발생 시 더 낮은 순위로 공동 순위를 return

```python
dataframe.rank(method = 'max')

0   1.0
1   2.0
2   4.0
3   4.0
4   5.0
```

### 4) first
* 동점 발생 시 위에 있는 데이터 (먼저 관측된 데이터)를 더 높은 순위로 적용

```python
dataframe.rank(method = 'first')

0   1.0
1   2.0
2   3.0
3   4.0
4   5.0
```


### Code
```python
import pandas as pd

rank_table = pd.DataFrame(ranking_list.values())

ordered_table = rank_table.sort_values('average_time', ascending = True)

ordered_table['total_score_rank']      = ordered_table['total_score'].rank(ascending = False, method = 'min')
ordered_table['total_count_rank']      = ordered_table['total_count'].rank(ascending = False, method = 'min')
ordered_table['completion_score_rank'] = ordered_table['completion_score'].rank(ascending = False, method = 'min')
ordered_table['average_time_rank']     = ordered_table['average_time'].rank(ascending = True, method = 'min')
ordered_table['shortest_time_rank']    = ordered_table['shortest_time'].rank(ascending = True, method = 'min')
```


### Thinking
* Rank마다 ascending(오름차순, 내림차순) option이 다르기 때문에, column마다 rank를 계산해서 따로 만들었다. dataframe column을 bulk로 한꺼번에 만들거나 계산할 수 있는 방법이 필요하다.


<br>
<br>

* `Reference`: [[Python] Pandas - DataFrame 관련 메서드](https://data-make.tistory.com/125)