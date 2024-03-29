---
title: '[BF-TEST] Retrospective'
date: 2020-5-3 16:21:13
category: 'project'
thumbnail: ''
tags:
  - "Backend"
  - "Project"
  - "BFTEST"
  - "Retrospective"
  - "Python"
  - "Django"
description: ""
draft: false
---



### [BF-TEST 해보기](http://bftest.wecode.co.kr/)

<br>

<u>**프로젝트 소개**</u>

Front-end vs Back-end, 나의 성향에 맞는 포지션을 알아보는 심리테스트

<br>

<u>**프로젝트를 하게 된 계기**</u>

개발을 시작하고 프론트엔드와 백엔드 사이에서 선택하지 못하고 고민했던 시간들.
양쪽을 비교하는 글과 영상을 많이도 찾아봤다. 네 성향은 이러니까 넌 이거 하라고 누군가 답을 정해줬으면 좋겠다는 생각을 참 많이 했다. 같이 공부하는 동기들과 이런 얘기를 했고, 사이드 프로젝트로 이어졌다.

<br>

<u>**프로젝트 후기**</u>

**1. Content**\
개발보다 기획에 투자한 시간이 더 많았다. 변별력 있고 신뢰할 만한 질문들을 고르고, 결과를 어떤 방식으로 계산할 것인지 고민했다. 컨텐츠를 기획하는 과정이 어려웠지만, 팀원들과 같이 고민하고 이야기하는 것이 즐거웠다. 팀원들로는 표본이 한계가 있을 것 같아, 사전 설문조사 및 베타테스트를 진행하여 신뢰성을 높이고자 하였다. 

간단하게 생각했는데 실제로 고민해보니, 복잡한 성향 테스트를 만드는 사람들이 얼마나 머리를 많이 싸맸을 지 새삼 존경스러워졌다. MBTI 만든 그들은.. 대체.. :speak_no_evil:

<br>

**2. Management**\
일시적인 프로젝트가 아니라 지속적으로 관리할 사이트를 만들었다. 처음부터 예상한 것은 아니었지만, 너무나 감사하게도 wecode에서 지원해주신 덕에 세상의 빛을 보게 되었다. 그렇게 되면서 프로젝트 때는 알지 못했던 상황들을 겪었다.

![502 bad gateway](https://user-images.githubusercontent.com/53142539/80914626-a6fe3380-8d87-11ea-858f-564b6ae5f90e.png)

배포 하자마자 예상보다 접속자 수가 많아 새벽에 서버가 다운되는 경험. (502 Bad Gateway 에러를 보는데 입꼬리가 올라가는 경험:joy:) 상용중인 서비스에서는 코드 update 후에 어떻게 하면 접속자들이 불편하지 않게 재빌드 시간을 최소화할 수 있을지도 고려해야했다. Git Flow의 필요성을 배우고 갑니다..

<br>

**3. Data**\
배포하고 이틀동안 접속자 만명이 넘으면서 쌓이는 data가 많았다. Google Analytics를 심어놓아서 사용자 통계를 쉽게 볼 수 있었는데, 이렇게까지 자세한 통계를 내어주는 줄은 정말 몰랐다. 갓구글..:thumbsup: 마케팅에 왜 필수인지 알겠다.

DB에도 user가 선택한 값들이 쌓였는데, 비율로 통계도 내고 결과값을 보고 변별력 없는 문제 이미지를 수정하면서 이런게 data 활용이구나 느꼈다. 빅데이터가 왜 중요한지 알겠다.

<br>

**4. Feedback**\
생활코딩 페이스북을 시작으로, 전달 전달 되어 다른 커뮤니티 사이트들에도 공유가 되었다. 역시 놀랍도록 빠른 인터넷 세상.. 
여기저기서 피드백을 받으면서, 서비스 배포에는 책임감이 따른다는 것을 깨달았다. 접속자 수가 늘어나고 공유되는 걸 보며 부담이 되기도 하고. 좋아해주시는 것을 보며 뿌듯하기도 하고.

따로 피드백을 받을 수 있는 기능은 넣지 못했는데, 앞으로 그런 기능을 업데이트할 수 있었으면 좋겠다. 쓴소리 피드백은 성장의 밑거름이 됩니다:pray: 우쭈쭈 피드백은 동기부여에 아주 좋습니다:pray: Any 피드백 환영!!

<br>
<br>

<details>
<summary>:books: BF-TEST README.md</summary>

## Introduction
프론트엔드와 백엔드 중에 당신의 성향에 맞는 포지션이 무엇인지 알아보는 테스트
- 기간 : 20.04.20 - 20.04.29
- 구성 : Front-end 4명, Back-end 3명
- [백엔드 깃헙주소](https://github.com/hong-dev/BF-TEST-backend)
- [프론트엔드 깃헙주소](https://github.com/Wanderlust-sol/BF_test_front-end)
- [Notion 프로젝트 소개](https://www.notion.so/BF-TEST-b76d5545f45f487ebb3cf2b20a86b3d7)

## Demo
[![BF-TEST Project Demo](https://user-images.githubusercontent.com/53142539/80863617-9337cc00-8cb8-11ea-8111-02f4d2e9bbc9.png)](https://www.youtube.com/watch?v=nHvdmvbjPJM)

## DB modeling
![BF-TEST Databases](https://user-images.githubusercontent.com/53142539/80863686-f32e7280-8cb8-11ea-9875-46550ec5124e.png)

## Technologies
- Python
- Django Web Framework
- AWS EC2, RDS, S3
- CORS headers
- MySQL
- Git, Github

## Features
**Poll**
- 질문 및 선택지 정보 (GET)
- User의 테스트 결과 (POST)

## API Documentation
- [API Documentation](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/040d260d-5a87-4c79-a92e-c5f745167567/index.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200502%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200502T121441Z&X-Amz-Expires=86400&X-Amz-Signature=29a1eec8b0ebd9fcb00af9557f62cec13b244a5a7895f338ab991612f065f2bd&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22API%2520Doc_Swagger.html%22)
- [API Documentation(detail)](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/087e07c0-8f8e-4fa8-8477-c3180d10077d/screencapture-app-swaggerhub-apis-docs-hong-dev-BF-TEST-API-1-0-0-oas3-2020-05-02-19_30_35.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200502%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200502T121235Z&X-Amz-Expires=86400&X-Amz-Signature=881cbcbd47450b295bdbad38a027b818fcefbadd6b1bcfe74cfdcc7db9e6a588&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22API%2520Doc_Swagger.pdf%22)


</details>
