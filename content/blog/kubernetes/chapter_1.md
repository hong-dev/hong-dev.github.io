---
title: "[Kubernetes in Action] Chapter 1. 쿠버네티스 소개"
date: "2020-09-07T23:12:03.284Z"
template: "post"
draft: true
category: "book"
tags:
  - "Kubernetes in Action"
  - "k8s"
description: "Monolith, Micro Service, Virtual Machine, Container, Docker, Kubernetes"
socialImage: ""
---


> _Kubernetes in Action 번역본 내용 정리_



## Monolith

- 전체가 하나의 운영체제 프로세스로 실행되기 때문에, 애플리케이션의 한 부분을 변경하더라도 전체 애플리케이션을 재배포해야 한다.
- 시간이 지남에 따라 구성 요소 간의 경계가 불분명해지고 상호의존성의 제약이 커지면서 전체 시스템의 복잡성이 증가하고 품질이 저하된다.
- release 주기가 느리고 비교적 업데이트가 자주 되지 않는다.
- 개발자는 전체 릴리스 주기가 끝날 때마다 전체 시스템을 패키징하고 운영 팀한테 넘기면, 운영 팀은 이를 배포하고 모니터링한다.
- 운영 팀은 하드웨어 장애가 발생하면 이를 사용 가능한 서버로 직접 마이그레이션 한다.
- 시스템의 증가하는 부하를 처리하기 위해 scale up이나 scale out을 하지만, 이것도 한계가 있거나 항상 가능한 것이 아니다.

## Micro Service

- 독립적으로 실행되는 더 작은 구성 요소로 세분화
- 각 마이크로서비스는 독립적인 프로세스로 실행된다.
- 개별적으로 개발, 배포, 업데이트, 확장 가능
- 신속하게 구성 요소 변경 가능
- 일반적으로 RESTful API를 제공하는 HTTP와 같은 동기 프로토콜과, AMQP 같은 비동기 프로토콜로 통신한다.  
이런 프로토콜은 단순하고, 대부분의 개발자가 잘 이해할 수 있으며 **특정 개발 언어에 종속적이지 않다.**

<br>

- 구성 요소가 많아지면 배포 조합의 수뿐만 아니라 구성 요소 간의 상호 종속성 수가 훨씬 많아지므로 배포 관련 결정이 점점 어려워진다.
- 마이크로서비스는 여러 개가 서로 함께 작업을 수행하므로 서로를 찾아 통신해야 한다. 배포할 때 전체가 하나의 시스템처럼 동작할 수 있도록 누군가 또는 무언가가 제대로 구성해야 한다.
- 여러 프로세스와 시스템이 분산돼 있기 때문에 실행 호출을 디버그하고 추적하기 어렵다. (이런 문제는 현재 Zipkin과 같은 분산 추적 시스템으로 해결)
- 서로 다른 버전의 공유 라이브러리가 필요하거나 환경별로 다른 특수한 요구 사항이 있는 동적으로 연결된 애플리케이션을 배포하는 것은 어렵다.
- 동일한 호스트에 배포해야 하는 구성 요소 수가 많을수록 모든 요구 사항을 충족시키려 모든 종속성을 관리하기가 더 어려워진다.

<br>

## Kubernetes

- 구성 요소의 서버 배포를 자동으로 스케줄링하고 구성, 관리, 장애 처리를 포함하는 자동화를 위한 것
- 개발자가 운영 팀의 도움 없이도 자신의 애플리케이션을 구성, 배포할 수 있으며 시스템 관리자는 실제 실행되는 애플리케이션을 알 필요 없이 인프라를 유지하고 운영하는 데 집중할 수 있다.
- 하드웨어 장애 발생 시 해당 애플리케이션을 자동으로 모니터링하고 스케줄링을 조정해 운영 팀을 도와준다.
- 시스템 관리자 ⇒ 쿠버네티스 + 나머지 인프라 관리 ⇒ 쿠버네티스가 애플리케이션 관리
- 프로덕션 환경에서만 나타나는 문제를 줄이려면, 애플리케이션 개발과 프로덕션이 정확히 동일한 환경에서 실행된다면 이상적일 것이다.

## 가상머신 vs 컨테이너

- 컨테이너 기술은 동일한 호스트 시트템에서 여러 개의 서비스를 실행할 수 있으며 동시에 서로 다른 환경을 만들어줄 뿐만 아니라 가상머신과 유사하게 서로 격리하지만 오버헤드가 훨씬 적다.
- 가상머신은 프로세스가 별도의 운영체제에서 실행된다. 컨테이너는 호스트 운영체제 내에서 실행된다.
- 가상머신은 구성 요소 프로세스뿐만 아니라 시스템 프로세스를 실행해야 하기 때문에 추가 컴퓨팅 리소스가 필요하다.  
컨테이너는 모두 동일한 OS에서 실행되므로 시스템 서비스를 실행하지 않는다. (부팅이 필요없다.)
- 가상머신의 오버헤드로 인해 각 애플리케이션별로 하나의 VM을 전용으로 사용하기에는 리소스가 충분하지 않다. ⇒ 각 가상머신에 여러 애플리케이션을 그룹으로 배포하는 경우가 있다.  
컨테이너를 사용하면 애플리케이션마다 하나의 컨테이너를 가질 수 있다.
- 가상머신이 자체 리눅스 커널을 실행해 완전한 격리를 제공하는 데 반해, 컨테이너는 모두 동일한 커널을 호출함으로 보안 위험이 발생할 수 있다.

## 컨테이너

- 동일한 운영체제에서 실행 중인 경우 얼마나 정확하게 프로세스를 격리할 수 있는가
    1. 리눅스 네임스페이스
    2. 리눅스 컨트롤 그룹

<br>

- **Linux namespace**

    기본적으로 각 리눅스 시스템은 초기 구동 시 하나의 네임스페이스가 있다.  
    파일 시스템, 프로세스 ID, 사용자 ID, 네트워크 인터페이스 등과 같은 모든 시스템 리소스는 하나의 네임스페이스에 속한다.

    추가 네임스페이스를 생성하고 리소스를 구성 가능  
    프로세스를 실행할 때 해당 네임스페이스 중 하나에서 프로세스를 실행. 프로세스는 동일한 네임스페이스 내에 있는 리소스만 볼 수 있다.  
    프로세스는 여러 네임스페이스에 속할 수 있다.

    네임스페이스를 사용해 컨테이너에서 실행하는 애플리케이션을 분리하는 방법을 알 수 있다.

<br>

- **cgroups**

    프로세스(또는 프로세스 그룹)의 리소스 사용을 제한하는 리눅스 커널 기능

    프로세스는 설정된 양 이상의 CPU, 메모리, 네트워크 대역폭 등을 사용할 수 없다.  
    프로세스는 다른 프로세스용으로 예약된 리소스를 사용할 수 없으며, 이는 각 프로세스가 별도의 시스템에서 실행될 때와 비슷하다.

<br>

## Docker

- 애플리케이션을 패키징, 배포, 실행하기 위한 플랫폼  
애플리케이션을 전체 환경과 함께 패키지화 가능 (필요한 라이브러리나 운영체제의 파일시스템에 설치되는 모든 파일을 포함 가능)
- 도커로 패키징된 애플리케이션을 실행하면, 개발 머신에서 실행되는지 프로덕션 머신에서 실행되는지에 관계없이 동일한 파일을 볼 수 있다.
- 컨테이너 이미지가 여러 이미지에서 공유되고 재사용될 수 있는 레이어로 구성  
동일한 레이어를 포함하는 다른 컨테이너 이미지를 실행할 때 다른 레이어가 이미 다운로드된 경우 이미지의 특정 레이어만 다운로드하면 된다.

    <br>

    >### 이미지
    애플리케이션과 해당 환경을 패키지화한 것  
    애플리케이션에서 사용할 수 있는 파일시스템, 이미지가 실행될 때 실행돼야 하는 실행파일 경로와 같은 메타데이터 포함 
    >### 레지스트리
    도커 이미지를 저장하고 다른 사람이나 컴퓨터 간에 해당 이미지를 쉽게 공유할 수 있는 저장소  
    여기에서 이미지를 push하거나 pull 할 수 있다.
    >### 컨테이너 
    도커 기반 컨테이너 이미지에서 생성된 일반적인 리눅스 컨테이너  
    프로세스는 cgroups로 리소스 사용이 제한돼 있으므로 할당된 리소스의 양만 액세스하고 사용 가능

    <br>

- 개발자 ⇒ 이미지 만듦 ⇒ 레지스트리로 푸시 ⇒ 도커가 실행되는 다른 컴퓨터로 이미지 가져옴 ⇒ 이미지를 기반으로 격리된 컨테이너 만듦

<br>

- 도커 이미지는 레이어로 구성돼 있다. 모든 도커 이미지는 다른 이미지 위에 빌드되며 두 개의 다른 이미지는 기본 이미지로 동일한 부모 이미지를 사용 가능  
첫 번째 이미지의 일부로 전송한 레이어를 다른 이미지를 전송할 때 다시 전송할 필요가 없기 때문에 네트워크로 이미지를 배포하는 속도가 빨라진다.
- 컨테이너 이미지 레이어는 읽기 전용. 각 레이어는 동일 호스트에 한 번만 저장된다.  
    동일한 기본 레이어를 기반으로 한 두 개의 이미지에서 생성한 두 개의 컨테이너: 동일한 파일을 읽을 수 있지만 그중 하나가 해당 파일을 덮어쓰면 다른 컨테이너는 해당 변경 사항을 볼 수 없다.  
    기본 레이어 중 하나에 있는 파일에 쓰면 전체 파일의 복사본의 최상위 레이어에 만들어지고 프로세스는 복사본에 쓴다.

<br>

- 컨테이너화된 애플리케이션이 특정 커널 버전이 필요하다면 모든 시스템에서 작동하지 않을 수 있다.  
컨테이너는 가상머신에 비해 훨씬 가볍지만 컨테이너 내부에서 실행되는 애플리케이션은 일정한 제약이 있다. 각 가상머신은 자체 커널을 실행하기 때문에 이런 제약이 없다.  
커널뿐만 아니라 특정 하드웨어 아키텍처용으로 만들어진 컨테이너화된 애플리케이션은 해당 아키텍처 시스템에서만 실행될 수 있다.

<br>

- 도커 자체가 프로세스 격리를 제공하지 않는다. 컨테이너의 격리는 리눅스 네임스페이서와 cgroup과 같은 커널 기능으로 리눅스 커널 수준에서 수행. 도커는 이런 기능들을 사용하기 쉽게 한다.

<br>

## OCI (Open Container Initiative)

- 컨테이너 형식과 런타임에 관한 개방된 업계 표준을 만들기 위해 탄생

<br>

## Kubernetes

- Google의 Borg ⇒ Omega ⇒ Kubernetes (오픈소스 시스템)
- 컨테이너화된 애플리케이션을 쉽게 배포하고 관리할 수 있게 해주는 소프트웨어 시스템
- 모든 노드가 하나의 거대한 컴퓨터인 것처럼 수천 대의 컴퓨터 노드에서 소프트웨어 애플리케이션을 실행할 수 있다.
- 클러스터에 노드가 몇 개가 있든 쿠버네티스에 애플리케이션을 배포하는 것은 항상 동일하다. 클러스터의 크기와는 상관이 없다.  
클러스터 노드를 추가하는 것은 단순히 배포된 애플리케이션이 사용 가능한 리소스 양이 추가되는 것을 의미

<br>

- 애플리케이션은 어떤 노드에서 실행되든 상관이 없기 때문에 쿠버네티스는 언제든지 애플리케이션을 재배치하고 조합함으로써 리소스를 수동 스케줄링보다 훨씬 더 잘 활용할 수 있다.

<br>

- 컨테이너화된 애플리케이션은 이미 실행에 필요한 모든 것이 포함돼 있으므로, 시스템 관리자는 애플리케이션을 배포하고 실행하기 위해 아무것도 설치할 필요가 없다.  
쿠버네티스가 배포된 모든 노드에서는 시스템 관리자의 도움 없이 즉시 애플리케이션을 실행할 수 있다.
- 쿠버네티스는 모든 워커 노드를 하나의 배포 플랫폼으로 제공

<br>

- 쿠버네티스는 각 애플리케이션에서 사용하는 리소스를 모니터링하고 각 애플리케이션의 실행 중인 인스턴스 수를 계속 조정하도록 지시할 수 있다.  
클라우드 인프라에서 쿠버네티스가 실행 중인 경우, 배포된 애플리케이션의 부하에 따라 전체 클러스터 크기를 오토스케일링 가능

<br>

- 새로운 버전의 애플리케이션을 출시할 때 쿠버네티스가 새로운 버전이 잘못됐는지 자동으로 감지하고 즉시 롤아웃을 중지한다.

<br>

## Kubernetes Cluster Architecture

- **마스터 노드** : 전체 쿠버네티스 시스템을 제어하고 관리하는 컨트롤 플레인을 실행
- **워커 노드** : 실제 배포되는 컨테이너 애플리케이션을 실행

    <br>

    > ### Control Plane (마스터)
    > 클러스터를 제어하고 작동시킨다.
    >* **API 서버 :** 사용자, 컨트롤 플레인 구성 요소와 통신
    >* **스케줄러 :** 애플리케이션 배포 (애플리케이션의 배포 가능한 각 구성 요소를 워크 노드에 할당)
    >* **컨트롤러 매니저 :** 구성 요소 복제본, 워커 노드 추적, 노드 장애 처리 등과 같은 클러스터단의 기능 수행
    >* **Etcd :** 클러스터 구성을 지속적으로 저장하는 신뢰할 수 있는 분산 데이터 저장소 (노드들의 상태 저장)
    >
    > ⇒ 컨트롤 플레인의 구성 요소는 클러스터 상태를 유지하고 제어하지만, 애플리케이션을 실행하지는 않는다. 실행은 워커 노드가 한다.

    <br>

    >### (워커) 노드
    >컨테이너화된 애플리케이션을 실행하는 시스템
    >* **컨테이너 런타임 :** 컨테이너를 실행하는 도커, rkt 또는 다른 컨테이너 런타임
    >* **Kubelet :** API 서버와 통신하고 노드의 컨테이너를 관리. 도커 이미지 레지스트리에서 컨테이서 이미지를 가져와 컨테이너를 실행하도록 지시
    >* **kube-proxy :** 애플리케이션 구성 요소 간에 네트워크 트래픽을 로드밸런싱

<br>

## 애플리케이션 실행

- 애플리케이션이 실행되면 쿠버네티스는 애플리케이션의 배포 상태가 사용자가 제공한 디스크립션과 일치하는지 지속적으로 확인
- 프로세스가 중단되거나 응답이 중지될 때와 같이 인스턴스가 제대로 작동하지 않으면 쿠버네티스가 자동으로 다시 시작
- 워커 노드 전체가 종료되거나 액세스할 수 없게 되면 쿠버네티스는 이 노드에서 실행 중인 모든 컨테이너의 노드를 새로 스케줄링하고, 새로 선택한 노드에서 실행

<br>

- 애플리케이션이 실행되는 동안 복제본 수를 늘릴지 줄일지 결정할 수 있으며, 최적의 복제본 수를 결정하는 작업을 쿠버네티스에 맡길 수도 있다.

<br>

- 쿠버네티스는 컨테이너를 클러스터 안에서 이동시킬 수 있다.

    컨테이너가 다른 노드로 옮겨져 재시작하면 새 IP를 받지만 서비스는 여전히 동일한 IP를 가지므로, 클라이언트는 컨테이너가 클러스터 내에서 이동하더라도 컨테이너에 항상 연결할 수 있다.


<br>

### _Reference_
> [_쿠버네티스 인 액션_](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791161754048&orderClick=LA6)  