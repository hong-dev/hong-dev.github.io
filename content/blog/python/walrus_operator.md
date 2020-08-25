---
title: "PEP 572. Walrus operator ( := )"
date: "2020-08-25T23:12:03.284Z"
template: "post"
draft: false
category: "python"
tags:
  - "Python"
description: "Python 3.8에서 새로 추가된 기능인 PEP 572. assignment expression인 := 모양의 walrus operator"
socialImage: ""
---


`Python 3.8` 버전 이후로 새로 추가된 기능이 있다.  
`:=` 또는 `PEP 572` 또는 `assignment expression` 또는 `walrus operator`

<br>

왜 walrus인가 했더니.  
바다코끼리가 영어로 walrus인데 `:=` 이 모양이 바다코끼리의 눈과 엄니를 닮았다고 해서 붙여졌다고 한다.  
이런 귀여운 이름이라니 :joy:  
![Walrus](https://user-images.githubusercontent.com/53142539/91169544-811fe480-e712-11ea-9ef0-1ed0a4c7a24c.png)


## How to use

* 이 operator의 기능은, 변수를 assign 하고 그것을 표현식 안에서 바로 사용할 수 있도록 한다.

```python
nums = [1, 2, 3, 4]
length_nums = len(nums)

if length_nums > 3:
    print(length_nums)
```

* 위의 코드를 walrus operator를 사용해서 바꿔본다면,

```python
nums = [1, 2, 3, 4]

if (length_nums := len(nums)) > 3:
    print(length_nums)
```

:arrow_right: len(nums)를 새로운 변수 lenght_nums에 할당을 해주고 if문에 넣어야 하는데, `:=`를 사용하면 할당하는 동시에 if문에서 변수로 사용 가능하다는 것!

<br>

* if문 말고도 while문, list, list comprehension, lambda, f-strings 등 다양한 곳에서 사용할 수 있다.

* `python 3.8` 이후부터 적용되는 것이어서, 이전 버전에서 `:=` 를 사용하면 `SyntaxError: invalid syntax`가 발생한다.

<br>

## Criticisms

이 operator가 만들어질 때 논란도 많았다고 한다. 반대하는 입장은 이러했다.

* assignment를 위한 operator는 `=`가 이미 있는데, `:=`으로도 assign만 하는 게 가능하기 때문에 처음하는 사람들은 헷갈릴 수 있다.

* Zen of Python에 따르면, 단 한가지 분명한 방법만 있어야 한다고 했다.  
그런데 `:=`는 이미 존재하는 방법들과 똑같은 기능을 한다. 굳이 왜 또 만든다는 것이냐.

* Zen of Python에 따르면, 복잡한 것보다 심플한 게 낫다고 했다.  
`:=`는 심플해보이지만 공백을 줄인다는 명목으로 실제로는 더 복잡성이 증가된다.

* 얼마나 많은 개발자들이 이걸 사용할지 테스트가 충분히 되지 않았다.

<br>

`:=` operator에 대해 많은 커뮤니티 구성원들이 엄청나게 반발했고, 격양되고 감정적인 논쟁마저 벌어졌다고 한다.  
그 과정에서 Python 창시자인 Guido van Rossum (귀도 반 로섬)을 비난하기도 하고.  
이것은 Guido가 python 개발 의사결정 과정에서 손 떼고 싶다며 사임하는 계기가 되었다.. :sob:  

<br>

## I used it for

* 문득, 예전에 아무것도 모르고 이유도 모르고 stackoverflow에서 겨우겨우 찾은 방법으로 list comprehension을 만들었던 기억이 났다.  
생각해보니 그 때 사용한, 신기하게 생겼던 operator가 이거였다.  
찾아보니 예전에 [Pandas Dataframe 사용 관련 글](https://hong-dev.github.io/gopizza/dataframe/)에서 `List Comprehension에서 짧은 변수명으로 바꾸기` 라고 언급도 해놨었다 :joy:

  ```python
  store_ranking = [
      {
          "id"    : store.id,
          "name"  : store.name,
          "count" : store.total_count
      } for id_number in ordered_table['id'] if (store := ranking_list.get(id = id_number))
  ]
  ```

* 이 코드에서 `:=`를 사용했던 이유는, store에 ranking\_list.get(id = id_number)를 할당해서 간단한 변수로 사용하고 싶었기 때문이다.  
만약에 저걸 사용하지 못했다면, store 대신에 전체를 다 적어줘야 했을 것이다.  
여기서는 3줄로 잘라왔지만, store 정보가 많았기 때문에 줄마다 이렇게 중복해서 적는다면 보기에 굉장히 안 좋았을 것..
  ```python
  store_ranking = [
      {
          "id"    : ranking_list.get(id = id_number).id,
          "name"  : ranking_list.get(id = id_number).name,
          "count" : ranking_list.get(id = id_number).total_count
      } for id_number in ordered_table['id']
  ]
  ```

* 사실 이렇게 쓰는 게 맞는 방법인지도 모르겠고. 당시의 나는 이게 최선이었다.. 결론은, 나에게는 매우매우 신박하고 꼭 필요한 고마운 operator 였다는 것 :joy:  

<br>

* 큰 논란을 불러왔던 PEP 572. 이런 논란에도 최종적으로 승인되어 바다코끼리 연산자로 잘 사용되고 있다. :elephant:  
사람들이 반대했던 이유, 과연 이 연산자가 얼마나 많이 사용되고 있는가. 이건 궁금하긴 하다! :open_mouth:

<br>

### _Reference_
> [_PEP 572 -- Assignment Expressions_](https://www.python.org/dev/peps/pep-0572/)  
> [_Walrus Operator in Python 3.8 - GeeksforGeeks_](htthttps://www.geeksforgeeks.org/walrus-operator-in-python-3-8/ps://www.geeksforgeeks.org/walrus-operator-in-python-3-8/)  
> [_The most controversial Python feature | Walrus operator_](https://www.youtube.com/watch?v=KN2TTiGpDvM&feature=youtu.be)