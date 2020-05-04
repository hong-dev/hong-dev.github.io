---
title: "Normalization: 정규화"
date: "2020-04-03T11:12:03.284Z"
template: "post"
draft: false
slug: "normalization"
category: "python"
tags:
  - "Python"
  - "Django"
  - "DataFrame"
  - "Pandas"
  - "Normalization"
  - "Wepizza"
  - "Project"
description: "MinMaxScaler() : 서로 다른 단위와 범위의 값들을 0~1 사이로 정규화"
socialImage: ""
---



```
[example]

Completion : 0~100 사이의 점수 단위
Time       : second(초) 단위,
Count      : 일반 개수 단위
```

이처럼 각각 다른 단위와 범위의 값을 가진 점수들을, 통일된 점수로 계산할 수 있도록 바꾼다.


```python
import pandas as pd

from sklearn.preprocessing import MinMaxScaler

scores = pd.DataFrame({
    "completion_score" : [rank.completion_score for rank in ranking_list],
    "time_score"       : [-rank.average_time for rank in ranking_list],
    "count_score"      : [rank.total_count for rank in ranking_list],
})

scores[ : ] = MinMaxScaler().fit_transform(scores[ : ])
```

### pandas.DataFrame
한꺼번에 바꿀 수 있도록 모든 data들을 dataframe으로 넣어둔다.\
Dataframe을 만들 때에는 column name과 해당하는 값의 list를 dictionary로 넣는다.\
`{field : [value1, value2, ...]}`

#### <i>time_score에 -(minus)를 붙인 이유:
기본적으로는 숫자가 클수록 높은 점수를 받게 되는데, time의 경우에는 시간이 짧을수록 높은 점수를 받아야하기 때문이다. </i>

```
     completion_score  time_score  count_score
0            293.4000   -244.6000            5
1            311.3333   -263.6667            3
2            301.7857   -236.5000           14
3            296.5000   -240.5000            2
4            298.3333   -261.6667            3
..                ...         ...          ...
107          300.3333   -254.6667            3
108          312.5000   -249.0000            2
109          292.0000   -242.0000            3
110          281.6667   -225.0000            3
111          316.0000   -215.0000            1

[112 rows x 3 columns]
```


### MinMaxScaler
MinMaxScaler를 적용하면 0~1 사이의 값으로 변환을 시켜준다.\
원래대로라면 전체의 값을 줄 세운 다음 그 안에서 값을 부여해야 하는데, MinMaxScaler를 사용하면 한번에! range가 다른 값들을 정규화 시켜준다.\
`상대평가로 줄 세울 때` 아주 유용하다.


```
     completion_score  time_score  count_score
0            0.380881    0.463006     0.053333
1            0.493968    0.297688     0.026667
2            0.433761    0.533237     0.173333
3            0.400430    0.498555     0.013333
4            0.411990    0.315029     0.026667
..                ...         ...          ...
107          0.424602    0.375722     0.026667
108          0.501325    0.424856     0.013333
109          0.372053    0.485549     0.026667
110          0.306891    0.632948     0.026667
111          0.523396    0.719653     0.000000

[112 rows x 3 columns]
```

### Importance 적용
정규화가 된 각각의 field에 중요도(importance)를 곱하여 100점 만점의 total\_score를 만들었다.\
그리고 만들어진 다른 DataFrame(rank\_table)에 total_score column을 추가한다.


```python
completion_importance, time_importance, count_importance = 50, 30, 20

total_score = (
    scores.completion_score * completion_importance
    + scores.time_score * time_importance
    + scores.count_score * count_importance
)

rank_table = pd.DataFrame(ranking_list.values())
rank_table['total_score'] = total_score
```

### Thinking
* **Thinking_1 :** rank\_table이라는 기본 DataFrame을 하나 만들고, total_score를 계산하기 위한 DataFrame을 새로 만드는 과정이 과연 효율적인가?
* **Thnking_2 :** total\_score 값 목록을 rank\_table에 그대로 가져다가 붙이는데, 이 두가지 dataframe의 값 순서가 동일한가?\
물론 동일한 ranking_list(유저별 정보 list)를 가져다가 쓴다고는 하지만, user id가 같이 붙어서 적용되는 것도 아닌데.. 따로따로 만든 dataframe 끼리 붙여버린다고 순서가 맞을까?
