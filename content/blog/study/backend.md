---
title: "Backend"
date: "2020-02-16T12:12:03.284Z"
template: "post"
draft: false
category: "concepts"
tags:
  - "Backend"
  - "Data"
description: "Backend에서 하는 일, 고민하는 것들, data 관리"
socialImage: ""
---


### Backend가 하는 일

- **백엔드 API 시스템**
- **Data Pipeline 시스템**\
    -많은 양의 데이터 수집, 가공, 인사이트 도출

- **Infrastructure 및 아키텍쳐**\
    -서버 생성, 운영, 관리. AWS 같은 서비스가 나오면서 인프라 부분도 backend에서 가능하게 되었다.

### Backend에서 고민하는 것

- **동시 접속 유저 증가에 따른 시스템 확장**\
    ex) 유저가 몰려서 서버가 다운이 되었다.

- **빅데이터 수집하고 분석은 어떻게 하지?**\
    ex) 하루에 10TB씩 들어오는 데이터를 어떻게 저장하지?\
    -빅데이터 관리는 오라클처럼 비싼 database를 구입해서 사용하거나, 기업 자체의 빅데이터 시스템을 구축한다.

- **이 서버들은 dmz 구역에 배포하고, db는 네트워크 존 따로 둬서 백엔드 쪽에서만 접속 가능하게 막아놓고..** 등의 고민들

### Data 관리

1) **Extract** : 수집

2) **Transform** : 우리가 쓸 수 있게 가공

3) **Load** : 우리의 db에 저장

<p>

**! 코드의 가독성이 매우 중요하다 !**
