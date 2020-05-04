---
title: "웹의 역사와 구성"
date: "2020-01-29T11:12:03.284Z"
template: "post"
draft: false
slug: "web_history"
category: "web"
tags:
  - "Web"
  - "Internet"
  - "developer"
description: "웹의 역사와 구성, 개발자 직군"
socialImage: ""
---

**Internet**은 1950년대 군사적 목적으로 만들어졌다.

물리적으로 떨어져 있는 각각의 군사기지끼리 데이터를 전송하는 목적.

요즘 우리가 흔히 말하는 인터넷, **www**(world wide web)은 1990년대에 만들어졌고, **http**(Hypertext Transfer Protocol)와 **html**(HyperText Markup Language)도 함께 개발되었다.

인터넷의 등장으로 생긴 가장 중요한 변화는 '**유통의 혁신**'이었다. 물리적인 유통이 사라졌다는 건데, 예전에는 게임이나 소프트웨어 프로그램 하나를 내 컴퓨터에 설치하려면 CD가 필요했다. 소프트웨어는 하드웨어와 함께 유통될 수 밖에 없었다. 그러나 인터넷이 등장하면서 소프트웨어를 인터넷으로 언제 어디서나 다운 받을 수 있게 되었다.

인터넷이 생기면서 인터넷 기반 기업인 닷컴 기업들이 우후죽순 생겨났고, 닷컴 붐, 닷컴 버블이라는 단어가 등장했다.

**1세대 인터넷**은 HTML와 CSS 기반으로, 정적인 요소들로 가득한 인터넷이었다.

**2세대 인터넷**은 Javascript의 등장으로, 정적인 HTML/CSS에 동적인 Javascript가 추가되어 작동하였다.

**요즘 인터넷**은 주객전도가 되어 Javascript가 거의 모든 것을 하고, HTML/CSS는 매우 적은 비중을 차지하게 되었다.

**SPA(single page application)** 방식인데, javascript 페이지 하나만 받고 그 페이지가 모든 것을 구현시키게 되는 것이다. React가 그러한 역할을 잘 해주고 있다. 예전에는 각각의 페이지에 해당하는 html 파일을 서버에서 매번 받아왔다면, 그런 부분까지도 하나의 javascript 페이지가 동적으로 구성이 가능하게 되었다.

이러한 방식으로 인해 트래픽이 크게 줄었는데, 프론트에서 렌더링 해주는 파일을 한번만 받으면 되기 때문이다. 서버랑은 데이터들만 주고받으면 된다. 그러면서 프론트엔드와 백엔드의 역할이 명확하게 나뉘게 되었다. 트래픽을 감당해야 하는 쪽이 백엔드가 되면서, 데이터 처리에 더 유용한 언어를 사용하게 되었다. 즉, 사용하는 코드 베이스와 서버 전송시기가 달라지면서, 각각 서버를 나누게 되었다.

**Frontend**는 UI(User Interface), UX(User Experience)를 구현하고,

**Backend**는 Data 처리가 중요하다.

요즘 핫한 개념인 **빅데이터(Big Data)**. 빅데이터는 구글이 만든 기술이며, 빅데이터 기술 덕분에 엄청난 용량의 데이터를 처리하고 수집이 가능해졌다.

Backend 개발;

API Gateway <=> API <=> databases <=> ETL/Data Pipeline. Machine Learning, other batch tasks 등등

Data양이 방대해지면서 백엔드 API(Application Programming interface) 서버들도 많이 분산시켰다.

ETL; Extract, Transform, Load. 데이터를 추출, 변환, 적재

Data Pipeline; 한 데이터 처리 단계의 출력이 다음 단계의 입력으로 이어지는 형태로, 연결된 데이터 처리

관련 직업들;

- PM(Product Manager)기획자; 뭘 만들지. 어떤 기능들이 필요한지, 우선순위 기능은 뭔지, 유저 피드백을 어떻게 적용할지 등을 알려준다. PM과 개발자는 직군이 다르다.
- Designer; UI UX 디자인을 하는 웹디자이너
- Backend; 1) API 개발 2) 완전뒤쪽 데이터관련
- DevOps; 백엔드가 서버, 시스템 운영 등 system infrastructure 관리까지 같이한다. AWS 등의 cloud가 생기면서 하드웨어 필요없이 서버 관리가 가능해지고, IAC(Infrastructure As Code) tool들이 발전하면서 성장했다. 주니어는 DevOps까지 무리고 시니어 개발자들이 가능
- SysOps; 서버 관리, 생성, 관리, 배포. 하드웨어적 측면까지 들어간다. but, AWS 같은 cloud 서비스가 많아지면서 점점 사라지는 사장 직군
- Data Scientist; Machine Learning, AI 등 데이터 분석 알고리즘과 데이터 분석 modeling을 구현하는 직군. 방대한 데이터에서 새로운 insight를 도출해내며, 학위적인 능력이 중요하다.
- Data Engineer; data scientist들이 대부분 코딩을 아주 잘하지는 못하기 때문에 data modeling을 도와주는 개발자
- Tester; 1) QA(Quality Assurance); manual testing / 2) Software Engineer in Test; Test Automation(테스트자동화)
- Fullstack; node.js 때문에 가능해졌으나, front/back 중 하나를 더 깊게 파는 것을 추천
- Project Manager
- Scrum Master; scrum process 를 관리하고 코치
- Software Architecture; 요즘은 waterfall 방식보다 그때그때 업데이트하는 방식으로 개발하기 때문에 점점 사라지는 사장 직군

- [ ]  데이터 거래소; 기업이 필요한 데이터들을 매번 각자 수집하는 것이 아니라, 다른 기업의 데이터를 살 수 있다면 수집 비용을 줄일 수 있지 않을까. 그러나 현재는 각 기업마다 데이터 format이 다르기 때문에 사오더라도 다시 재가공 할 수 밖에 없는 상황이 발생한다.

```
Reference:
- Wecode 송은우님 '웹의 역사' 강연
- 데이터가 왜 중요한가? http://www.cctvnews.co.kr/news/articleView.html?idxno=35477
```