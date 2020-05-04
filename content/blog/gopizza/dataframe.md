---
title: "Pandas DataFrame"
date: "2020-04-04T11:12:03.284Z"
template: "post"
draft: false
slug: "dataframe"
category: "python"
tags:
  - "Python"
  - "Django"
  - "Pandas"
  - "DataFrame"
  - "Wepizza"
  - "Project"
description: "pandas.DataFrame 만들기"
socialImage: ""
---



### User별 점수 Ranking View

### Filter
* 아래의 filter를 front에서 query string으로 받아서 처리

```
1) limit : 몇 순위까지 보여줄 것인지 선택
2) time_delta : 최근 얼마간의 data를 보여줄 것인지 선택
3) pizza_id : 피자별로 선택
4) order_by : 어떤 기준으로 순위를 보여줄 것인지 선택
   - total_count => 누적 판수 기준
   - average_time => 평균 시간 기준
   - shortest_time => 최단 시간 기준
   - completion_score => 완성도 기준
   - total_score => 위의 4개를 합친 총점 기준
```

### Dataframe
* [pandas.DataFrame으로 정규화하기](https://hong-dev.github.io/posts/project_wepizza/normalization)

* 모든 user data를 dataframe으로 만든 다음, dataframe 안에서 order_by로 정렬을 하고, limit로 top 몇 순위까지 보여줄 것인지 잘라서 넘긴다.


```python
import pandas as pd

from sklearn.preprocessing import MinMaxScaler

def get_ranking(ranking_list, order_by, limit):
    completion_importance, time_importance, count_importance = 50, 30, 20

    scores = pd.DataFrame({
        "completion_score" : [rank.completion_score for rank in ranking_list],
        "time_score"       : [-rank.average_time for rank in ranking_list],
        "count_score"      : [rank.total_count for rank in ranking_list],
    })

    scores[ : ] = MinMaxScaler().fit_transform(scores[ : ])

    total_score = (
        scores.completion_score * completion_importance
        + scores.time_score * time_importance
        + scores.count_score * count_importance
    )

    rank_table = pd.DataFrame(ranking_list.values())
    rank_table['total_score'] = total_score

    ascending = (
        True
        if order_by == 'average_time' or order_by == 'shortest_time'
        else False
    )
    ordered_table = rank_table.sort_values(order_by, ascending = ascending)[:limit]

    return ordered_table
```


### Annotate
* User별로 가진 score 정보들의 평균, 총합 등을 계산해서 return하기 위해 annotate 사용
```python
User.objects.annotate(total_count = Count('score'))
```

### DataFrame에서 값 추출
* dataframe의 id 필드의 값이 1이다
```python
dataframe['id'] == 1
```
* dataframe에서 위의 조건을 적용한 row의 total\_score 가져오기
```python
dataframe[dataframe['id'] == 1]['total_score']
```
* 위의 방법으로 return하면 dataframe 형태로 return이 되어서, 해당 값(total\_score)만 가져오도록 float 사용
```python
float(dataframe[dataframe['id'] == 1]['total_score'])
```

### List Comprehension에서 짧은 변수명으로 바꾸기
* original 방법\
dictionary에서 값을 적을 때, 전체 변수명을 다 적어줘야 한다.
```python
[{"key" : ranking_list.get(id = id_number)}
   for ranking_list.get(id = id_number) in dataframe]
```

* 변수명 바꾸기 (if :=)\
ranking\_list.get(id = id_number)라는 변수를 user에 새로 할당해줘서 변수명 'user'를 사용한다.
```python
[{"key" : user.name}
   for id_number in dataframe
   if (user := ranking_list.get(id = id_number))]
```

### UserRankView Code
```python
from django.db.models import Sum, Avg, Min, Count

class UserRankView(View): #Thinking_2
    def get(self, request):
        limit      = request.GET.get('limit', User.objects.count())
        pizza_id   = request.GET.get('pizza_id')
        order_by   = request.GET.get('order_by', 'total_score')
        time_delta = request.GET.get('time_delta')

        ranking_list = (
            User
            .objects
            .filter(**get_filter_condition(pizza_id, time_delta))
            .select_related('store')
            .prefetch_related('score_set')
            .annotate(
                total_count      = Count('score'),
                average_time     = Avg('score__time'),
                shortest_time    = Min('score__time'),
                average_quality  = Avg('score__quality'),
                average_sauce    = Avg('score__sauce'),
                average_cheese   = Avg('score__cheese'),
                average_topping  = Avg('score__topping'),
                completion_score = sum(
                    [
                        Avg('score__quality'),
                        Avg('score__sauce'),
                        Avg('score__cheese'),
                        Avg('score__topping')
                    ]  #Thinking_1
                )
            )
        )

        ordered_table = get_ranking(ranking_list, order_by, int(limit))

        user_ranking = [
            {
                "id"               : user.id,
                "name"             : user.name,
                "image"            : user.image,
                "store_id"         : user.store_id,
                "store_name"       : user.store.name,
                "count"            : user.total_count,
                "average_time"     : round(user.average_time),
                "shortest_time"    : user.shortest_time,
                "quality"          : round(user.average_quality),
                "sauce"            : round(user.average_sauce),
                "cheese"           : round(user.average_cheese),
                "topping"          : round(user.average_topping),
                "completion_score" : round(user.completion_score),
                "total_score"      : round(float(ordered_table[ordered_table['id'] == user.id]['total_score']))
            } for id_number in ordered_table['id'] if (user := ranking_list.get(id = id_number))]

        return JsonResponse({"ranking" : user_ranking}, status = 200)
```

### Thinking
* **Thinking_1 :** annotate로 만든 average field들을 또 사용해서 계산하고 싶을 때, annotate 안에서는 방금 만든 field를 그대로 사용할 수가 없다.\
그래서 어쩔 수 없이 average 계산을 또 해서 sum으로 묶어야 했다.\
annotate 안에 계산식이 중복으로 들어가야 하는게 매우 비효율적이다.

* **Thinking_2 :** UserRankView와 똑같은 구조의 StoreRankView가 있다.\
filter와 계산식이 똑같지만, user별로 보여주느냐 store별로 ranking을 보여주느냐에 따라 나뉜다.\
중복이 많아서 하나의 view로 합치고 싶었으나, User.objects냐 Store.objects냐의 기준이 너무 달라서 따로 view를 만들 수밖에 없었다.