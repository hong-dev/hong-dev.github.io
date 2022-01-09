---
title: "트럭들이 모두 다리를 통과하는 데 걸리는 시간"
date: "2020-05-20T11:21:03.284Z"
template: "post"
draft: false
category: "algorithm"
tags:
  - "Python"
  - "Algorithm"
description: "각각 다른 무게를 가진 트럭들이 모두 다리를 통과하는 데 걸리는 시간"
socialImage: ""
---


> **bridge\_length**: 다리길이(num) / **weight**: 다리가 견딜 수 있는 무게(num) / **truck\_weights**: 트럭별 무게(list)  
> 위의 3가지를 input으로 받아서, 모든 트럭이 다리를 지나려면 몇 초가 걸리는 지 구하시오.  
> (트럭은 1초에 1만큼 움직인다.)

<br>

## My Solution 1 (Fail)
* 트럭들을 하나씩 for문으로 돌리고, 다리 위에 있는 트럭들을 new list에 append 한다.  
다리의 무게 제한으로 트럭이 못 올라가면 0을 append해서 new list가 다리 길이와 똑같은 length를 가지도록 한다.  
new list에 element가 다리 길이 이상으로 append 되려고 하면 첫번째 값을 pop하여 다리를 다 건넌 트럭이 생기도록 한다.  
for문이 다 돌 때까지 반복한 후에, list를 append한 count에 다리 길이를 더해서(마지막에 올라선 트럭도 다리길이만큼 다 건너야 하기 때문) return 한다.  
* 이 방법으로 답을 얻을 수는 있었으나, 시간 초과 때문에 실패하는 test case가 나왔다.

```python
def solution(bridge_length, weight, truck_weights): 
    time_count = 0
    trucks = []  #다리 위에 있는 트럭 현황
    
    for truck in truck_weights:
        if len(trucks) == bridge_length:
            trucks.pop(0)

        while sum(trucks) + truck > weight:
            trucks.append(0)
            time_count += 1
            if len(trucks) == bridge_length:
                trucks.pop(0)
                
        trucks.append(truck)
        time_count += 1

    answer = time_count + bridge_length
    return answer
```
<br>

**My Solution 1의 Test Case 실행 결과**
```
테스트 1 〉	통과 (6.52ms, 10.6MB)
테스트 2 〉	통과 (1433.00ms, 10.8MB)
테스트 3 〉	통과 (0.04ms, 10.8MB)
테스트 4 〉	통과 (335.27ms, 10.8MB)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	통과 (1697.82ms, 10.8MB)
테스트 7 〉	통과 (5.26ms, 10.7MB)
테스트 8 〉	통과 (0.26ms, 10.6MB)
테스트 9 〉	통과 (6.24ms, 10.8MB)
테스트 10 〉통과 (0.30ms, 10.8MB)
테스트 11 〉통과 (0.05ms, 10.7MB)
테스트 12 〉통과 (0.31ms, 10.8MB)
테스트 13 〉통과 (2.14ms, 10.7MB)
테스트 14 〉통과 (0.05ms, 10.7MB)
```

<br>

## My Solution 2 (Fail)
* for문 안에서 while문이 돌던 solution 1에서, 중복되는 값들을 한번만 적을 수 없을까 고민했다.  
while문을 가장 바깥으로 빼고, if문을 넣어서 append 되는 값을 다르게 했다.
* 여전히 시간 초과. 오히려 더 느려진 부분도 있다. 왜지..?

```python
def solution(bridge_length, weight, truck_weights): 
    time_count = 0
    trucks = []
    index = 0
    
    while index < len(truck_weights):
        time_count += 1
        
        if len(trucks) == bridge_length:
            trucks.pop(0)
            
        if sum(trucks) + truck_weights[index] <= weight:
            trucks.append(truck_weights[index])
            index += 1
            continue    
            
        trucks.append(0)
    
    answer = time_count + bridge_length
    return answer
```

<br>

**My Solution 2의 Test Case 실행 결과**
```
테스트 1 〉	통과 (6.63ms, 10.7MB)
테스트 2 〉	통과 (1353.07ms, 10.7MB)
테스트 3 〉	통과 (0.04ms, 10.8MB)
테스트 4 〉	통과 (357.46ms, 10.7MB)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	통과 (1799.70ms, 10.8MB)
테스트 7 〉	통과 (5.74ms, 10.7MB)
테스트 8 〉	통과 (0.28ms, 10.7MB)
테스트 9 〉	통과 (6.53ms, 10.7MB)
테스트 10 〉통과 (0.34ms, 10.8MB)
테스트 11 〉통과 (0.04ms, 10.7MB)
테스트 12 〉통과 (0.42ms, 10.6MB)
테스트 13 〉통과 (2.38ms, 10.8MB)
테스트 14 〉통과 (0.04ms, 10.7MB)
```

<br>

## My Solution 3 (Fail)
* list는 물리적으로 서로 길게 붙어있어서, 요소를 삭제하게 되면 뒤에 있는 모든 값들이 앞으로 한칸씩 이동해야한다.  
이전 solution에서 trucks의 첫번째 요소를 pop 시키는 부분이 계속 그러한 무의미한 이동을 하게 한다고 생각했다.  
pop을 없애고 list를 그냥 두는 대신에, list slicing을 이용하여 필요한 부분만 잘라서 쓰도록 바꿨다.
* 시간 초과 test case가 하나 더 늘었다.. 대체 왜..?

```python
def solution(bridge_length, weight, truck_weights): 
    time_count = 0
    trucks = []
    index = 0
    
    while index < len(truck_weights):
        time_count += 1
        sum_trucks = sum(trucks)
        
        if len(trucks) >= bridge_length:
            sum_trucks = sum(trucks[-bridge_length+1:])
            
        if sum_trucks + truck_weights[index] <= weight:
            trucks.append(truck_weights[index])
            index += 1
            continue
        
        trucks.append(0)
        
    answer = time_count + bridge_length
    return answer
```

<br>

**My Solution 3의 Test Case 실행 결과**
```
테스트 1 〉	통과 (6.28ms, 10.7MB)
테스트 2 〉	통과 (5068.36ms, 10.7MB)
테스트 3 〉	통과 (0.04ms, 10.7MB)
테스트 4 〉	통과 (3173.03ms, 10.9MB)
테스트 5 〉	실패 (시간 초과)
테스트 6 〉	실패 (시간 초과)
테스트 7 〉	통과 (15.90ms, 10.6MB)
테스트 8 〉	통과 (0.72ms, 10.5MB)
테스트 9 〉	통과 (365.49ms, 10.8MB)
테스트 10 〉통과 (1.06ms, 10.6MB)
테스트 11 〉통과 (0.04ms, 10.7MB)
테스트 12 〉통과 (2.61ms, 10.7MB)
테스트 13 〉통과 (33.71ms, 10.6MB)
테스트 14 〉통과 (0.04ms, 10.8MB)
```

<br>

## My Solution 4
* 위의 solution에서는 트럭이 건너지 않게 되더라도 빈 값인 0을 list에 append 해줘서 순서를 알게 했다.  
그러나 아무래도 list의 길이가 길어질수록 pop이나 sum을 계산할 때 엄청난 시간이 걸릴 것 같다.  
빈값인 0을 넣지 않고, 트럭 무게와 트럭이 다리를 건너는 순서를 tuple 값으로 묶어서 순서를 알 수 있도록 변경했다.
* Test case가 드디어 전부 통과했다. 하지만 이게 과연 최선인지.. 분명 더 좋은 방법이 있을 것 같은데..

```python
def solution(bridge_length, weight, truck_weights): 
    time_count = 1
    index1 = 1
    trucks = [(1, truck_weights[0])]
    index2 = 0
    
    while index1 < len(truck_weights):
        time_count += 1
        
        if time_count - trucks[index2][0] >= bridge_length:
            index2 += 1
            
        if sum(x[1] for x in trucks[index2:]) + truck_weights[index1] <= weight:
            trucks.append((time_count, truck_weights[index1]))
            index1 += 1
    
    answer = time_count + bridge_length
    return answer
```

<br>

**My Solution 4의 Test Case 실행 결과**
```
테스트 1 〉	통과 (0.87ms, 10.7MB)
테스트 2 〉	통과 (18.85ms, 10.7MB)
테스트 3 〉	통과 (0.04ms, 10.8MB)
테스트 4 〉	통과 (41.61ms, 10.8MB)
테스트 5 〉	통과 (329.19ms, 10.8MB)
테스트 6 〉	통과 (117.35ms, 10.7MB)
테스트 7 〉	통과 (0.87ms, 10.8MB)
테스트 8 〉	통과 (0.22ms, 10.6MB)
테스트 9 〉	통과 (6.17ms, 10.8MB)
테스트 10 〉통과 (0.27ms, 10.8MB)
테스트 11 〉통과 (0.04ms, 10.8MB)
테스트 12 〉통과 (0.46ms, 10.7MB)
테스트 13 〉통과 (1.56ms, 10.8MB)
테스트 14 〉통과 (0.03ms, 10.7MB)
```

<br>

## Model Solution
* Class를 만들어서 문제를 푸는 방법이 있다. 다른 solution들보다도 처리 속도가 매우 빠르다.  
class를 만들고 사용하는 방법부터 공부해야겠다.

<br>
<br>

> Reference: [프로그래머스 스택/큐 다리를 지나는 트럭 문제](https://programmers.co.kr/learn/challenges)
