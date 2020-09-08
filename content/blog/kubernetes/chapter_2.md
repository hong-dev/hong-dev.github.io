---
title: "[Kubernetes in Action] Chapter 2: 도커와 쿠버네티스 첫걸음"
date: "2020-09-08T23:12:03.284Z"
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


## Docker

- 도커는 이미지가 로컬 컴퓨터에 존재하는지 확인하고, 존재하지 않으면 도커 허브 레지스트에서 이미지를 알아서 다운로드한다.

    다운로드가 완료되면 도커는 이미지로부터 컨테이너를 생성하고 컨테이너 내부에서 명령어를 실행한다.

```bash
$ docker run busybox echo "Hello world"
```

```bash
$ docker run <image>:<tag>

# tag를 지정하지 않으면 'latest' 태그를 참조한 것으로 간주
$ docker run <image>
```

## 간단한 node.js 애플리케이션 컨테이너 생성 (Docker)

- 간단한 request/response 작업을 하는 **app.js 애플리케이션을 생성**한다.

    ```bash
    # app.js

    const http = require('http');
    const os = require('os');

    console.log("Kubia server starting...!!!!!");

    var handler = funtion(request, response) {
    	console.log("Received request from ... " + request.connection.remoteAddress);
    	response.writeHead(200);
    	response.end("You've hit ... " + os.hostname() + "\n");
    };

    var www = http.createServer(handler);
    www.listen(8080);
    ```

- Node.js를 다운로드하고 설치하지 않아도, 도커를 통해 애플리케이션을 컨테이너 이미지로 패키징하면 설치하지 않고도 어디에서든 실행 가능하다.

- 애플리케이션을 이미지로 패키징하기 위해 `**Dockerfile`을 생성**해야 한다.

    Dockerfile에는 도커가 이미지를 생성하기 위해 수행해야 할 지시 사항이 담겨있다.

    ```docker
    # Dockerfile

    FROM node:7
    ADD app.js /app.js
    ENTRYPOINT ["node", "app.js"]
    ```

    - `**FROM**` : 시작점(이미지 생성의 기반이 되는 기본 이미지)으로 사용할 컨테이너 이미지 정의

        이 경우에는 node 컨테이너 이미지의 태그 7 사용
        이 애플리케이션은 Node.js 애플리케이션이기 때문에 애플리케이션을 실행하려면 node 바이너리 실행파일이 포함된 이미지가 필요

    - `**ADD**` : 로컬 디렉터리의 app.js 파일을 이미지의 루트 리텍터리에 app.js 라는 이름으로 추가
    - `**ENTRYPOINT**` : 이미지를 실행했을 때 수행되어야 할 명령어 정의

        이 경우에는 node app.js

- `Dockerfile`과 `app.js` 파일을 생성 후, **이미지를 빌드**하기 위한 도커 명령어 실행

    ```bash
    $ docker build -t kubia .
    ```

    ⇒ 현재 디렉터리의 콘텐츠를 기반으로, 기본 이미지는 node:7로 하여, kubia라고 부르는 새로운 이미지를 빌드하라고 요청했다.

    - 빌드 프로세스틑 도커 클라이언트가 수행하지 않는다.
    그 대신 디렉터리의 전체 콘텐츠가 도커 데몬에 업로드되고 그곳에서 기본 이미지를 pull 하기도 하고 새로운 이미지를 빌드한다.
    빌드 디렉터리에 불필요한 파일은 포함시키지 말라. 모든 파일이 데몬에 업로드되어야 하기 대문에 속도 저하를 가져온다.
    - node 이미지를 pull 하는 과정에서 여러개의 레이어가 pull 되는데, 이미지는 여러 개의 레이어로 구성되기 때문이다.
    즉, 컨테이너 이미지는 다른 이미지에게 공유 가능한 레이어로 구성된다.
    - 따라서, 기본 이미지의 모든 레이어를 가져온 다음, 도커는 그 위에 새로운 레이어를 생성하고 app.js 파일을 그 위에 추가한다.
    그런 다음 이미지가 실행될 때 수행되어야 할 명령을 지정하는 또 하나의 레이어를 추가한다. 이 마지막 레이어는 `kubia:latest` 라고 태그를 지정한다.

- 이미지 빌드 프로세스가 완료되면 새로운 이미지가 로컬에 저장된다.

    로컬에 저장된 이미지 리스트를 도커에게 요청할 수 있다.

    ```bash
    $ docker images

    >>>
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    kubia               latest              eda54fd951dd        8 minutes ago       660MB
    ....
    ```

- 저장된 이미지로 **컨테이너 실행**

    ```bash
    $ docker run --name kubia-container -p 8080:8080 -d kubia
    ```

    ⇒ kubia 이미지에서 kubia-container라는 이름의 새로운 컨테이너를 실행하도록 요청했다.

    - `-d` : 컨테이너가 콘솔에서 분리되어 백그라운드에서 실행된다.
    - `-p 8080:8080` : 로컬 머신의 8080포트가 컨테이너 내부의 8080포트와 매핑된다. (http://localhost:8080으로 애플리케이션에 접근 가능)

- 실행 중인 모든 컨테이너 조회

    ```bash
    $ docker ps
    ```

- 실행이 종료된 것까지 포함한 모든 컨테이너 조회

    ```bash
    $ docker ps -a
    ```

- 특정 컨테이너에 대한 자세한 정보 조회

    ```bash
    $ docker inspect <container_name>
    # ex) docker inspect kubia-container
    ```

- 이미지 빌드에 문제가 생겼을 때 오류 확인

    ```bash
    $ docker run -it <image_name> /bin/bash
    # ex) docker run -it kubia /bin/bash
    ```

- **애플리케이션에 접근**

    ```bash
    $ curl localhost:8080
    ```

- 실행 중인 **컨테이너 내부에서 shell 실행**

    ```bash
    $ docker exec -it kubia-container bash
    ```

    - `-i` : 표준 입력(STDIN)을 오픈 상태로 유지. 이걸 빼면 셸에 명령어를 입력할 수 없다.
    - `-t` : pseudo 터미널(TTY)을 할당. 이걸 빼면 명령어 프롬프트가 화면에 표시되지 않는다.

- 내부에서 컨테이너 탐색

    컨테이너 내부의 프로세스만 볼 수 있고, 호스트 운영체제의 다른 프로세스는 볼 수 없다.

    ```bash
    # 컨테이너 내부 shell
    $ ps aux
    ```

    - 호스트 운영체제에서 `ps aux` 를 해보면 컨테이너에서 실행 중인 프로세스도 볼 수 있다.

        다만, 호스트 운영체제와 컨테이너 내부에서 조회한 프로세스의 ID가 다르다.
        컨테이너는 자체 리눅스 PID 네임스페이스를 사용하며 고유의 시퀀스 번호를 가지고 완전히 분리된 프로세스 트리를 가지고 있기 때문이다.

- 컨테이너 중지

    ```bash
    $ docker stop kubia-container
    ```

- 컨테이너 삭제

    ```bash
    $ docker rm kubia-container
    ```

## Image Registry에 Image Push (Docker Hub)

- 위에서 빌드한 이미지는 로컬 컴퓨터에서만 사용 가능하다.
다른 컴퓨터에서도 실행하려면 외부 이미지 저장소에 이미지를 push 해야 한다.
- 널리 사용되는 레지스트리에는 Docker Hub, Quay.io, Google Container Registry가 있다.

- **이미지 태그 변경**
이미지를 푸시하기 전에 도커 허브([https://hub.docker.com/](https://hub.docker.com/))의 규칙에 따라 이미지 태그를 다시 지정해야 한다.
도커 허브는 이미지의 repository 이름이 도커 허브 ID로 시작해야만 이미지를 push 할 수 있다.

    ```bash
    $ docker tag kubia hub_id/kubia
    ```

    ⇒ kubia로 태그된 이미지를 hub_id/kubia로 태그 변경 요청했다. (hub_id는 실제 본인의 도커 허브 id를 적어주어야 한다.)

    이 명령어는 실제로 태그를 변경하는 것이 아니라, 같은 이미지에 추가적인 태그를 생성하는 방식으로 작동한다.
    `docker images` 명령어로 조회해보면 실제로 kubia와 hub_id/kubia 두 가지 태그가 모두 조회되는 것을 볼 수 있다.
    그러나 두 태그 모두 동일한 Image ID를 가리키므로 같은 이미지에 두 개의 태그를 가지는 것이다.

- **도커 로그인**

    입력한 hub_id로 image를 push 하기 위해서는 도커에 로그인을 먼저 해야한다.

    ```bash
    $ docker login
    ```

- **도커 허브에 이미지 push**

    로컬에 빌드한 이미지는 로컬에서만 사용할 수 있기 때문에, 도커 데몬이 실행 중인 다른 워커 노드에서 컨테이너 이미지를 접근하게 하고자 이 절차가 필요하다.

    ```bash
    $ docker push hub_id/kubia
    ```

- 도커 허브에 이미지 푸시가 완료되면 모든 사람이 이미지를 사용할 수 있다.
다른 머신에서 아래의 명령어만 입력하면 이미지를 실행할 수 있다.

    ```bash
    $ docker run -p 8080:8080 -d hub_id/kubia
    ```

- 이렇게 하면 애플리케이션이 언제 어디서나 동일한 환경을 유지한다.
사용자의 머신에서 정상적으로 실행되면 어느 리눅스 머신에서도 잘 실행된다.
- 호스트 머신에 Node.js가 설치되어 있는지 걱정할 필요가 없다. 설치되어 있다고 해도 애플리케이션은 설치된 것을 사용하지 않고 이미지 내부에 설치된 것을 사용한다.

## 쿠버네티스 클러스터 설치

- 도커에서 직접 실행하는 대신 쿠버네티스 클러스터에 배포할 수 있다.
- 쿠버네티스는 로컬 개발 머신, 기업 조직의 컴퓨터 클러스터, 클라우드 공급자(구글 컴퓨트 엔진, 아마존 EC2, 마이크로소프트 애저 등)에서 제공된 가상머신에서 실행될 수도 있고,
GKE(구글 쿠버네티스 엔진)이나 Amazon EKS, MS Azure의 AKS, Oracle의 OKE와 같은 관리형 쿠버네티스 클러스터를 사용할 수도 있다.

### Minikube를 활용한 단일 노드 쿠버네티스 클러스터 실행

- **Minikube 설치** ([https://github.com/kubernetes/minikube](https://github.com/kubernetes/minikube) 참조)

    ```bash
    $ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
    ```

- 쿠버네티스를 다루기 위한 **kubectl CLI 클라이언트 설치**

    ```bash
    $ curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
    && chmod +x kubectl && sudo mv kubectl /usr/local/bin/
    ```

- Minikube로 쿠버네티스 **클러스터 시작**

    ```bash
    $ minikube start
    ```

- **클러스터 작동 여부 확인**

    ```bash
    $ kubectl cluster-info

    >>>
    Kubernetes master is running at ....
    KubeDNS is running at ....
    ```

- minikube ssh를 사용해 minikube 가상머신에 로그인해서 노드에 실행 중인 프로세스 확인 등 내부를 살펴볼 수 있다.

- **클러스터의 모든 노드 조회**

    ```bash
    $ kubectl get nodes

    >>>
    NAME       STATUS   ROLES    AGE     VERSION
    minikube   Ready    master   2m48s   v1.19.0
    ```

- **노드의 상세 정보 조회**

    맨 뒤에 특정 node 이름을 생략하면 모든 노드들의 상세정보를 출력

    ```bash
    $ kubectl describe node <node_name>
    ```

## 쿠버네티스에 애플리케이션 실행

- 보통 배포하고자 하는 모든 구성 요소를 기술한 JSON이나 YAML 매니페스트를 준비해야 하지만, 여기서는 간단히 명령어 한 줄로 애플리케이션을 실행해보자.

- `kubectl run` 명령어를 사용하면 json이나 yaml을 사용하지 않고 필요한 모든 구성 요소를 생성할 수 있다.

    ```bash
    $ kubectl run kubia --image=hub_id/kubia --port=8080 --generator=run/v1
    ```

    - `--image` : 실행하고자 하는 컨테이너 이미지
    - `--port` : 쿠버네티스에 애플리케이션이 8080 포트를 수신 대기해야 한다.
    - `--generator` : 보통은 사용하지 않지만, deployment(9장에서 설명) 대신 replicationcontroller(뒤에서 설명)를 생성하기 때문에 사용했다.

        하지만! 이렇게 실행해보니 `Flag --generator has been deprecated, has no effect and will be removed in the future.` 라고 뜬다. 더이상 사용되지 않는다는 것.
        결과도 replicationcontroller "kubia" created 가 아닌 pod/kubia created 메시지가 뜬다.

        앞으로는 `kubectl run --generator=run-pod/v1` 또는 `kubectl create` 를 사용하는 것이 좋다.

## 파드

- 쿠버네티스는 개별 컨테이너들을 직접 다루지 않는다.

    대신 함께 배치된 다수의 컨테이너 그룹, `파드` 라는 개념을 사용한다.

- 파드는 하나 이상의 밀접하게 연관된 컨테이너의 그룹으로, 같은 워커 노드에서 같은 리눅스 네임스페이스로 함께 실행된다.
- 자체 IP, 호스트 이름, 프로세스 등이 있는 논리적으로 분산된 머신
- 파드에서 실행 중인 모든 컨테이너는 동일한 논리적인 머신에서 실행하는 것처럼 보이는 반면, 다른 파드에 실행 중인 컨테이너는 같은 워커 노드에서 실행 중이라 할지라도 다른 머신에서 실행 중인 것으로 나타난다.

- **컨테이너 < 파드 < 워커 노드**
- 컨테이너는 독립적인 쿠버네티스 오브젝트가 아니기 때문에 개별 컨테이너를 조회할 수 없다. 대신 파드를 조회해야 한다.

    ```bash
    $ kubectl get pods

    >>>
    NAME    READY   STATUS    RESTARTS   AGE
    kubia   1/1     Running   0          2m35s
    ```

    - `READY`가 0/1 이고 `STATUS`가 Pending이라면, 워커 노드가 컨테이너를 실행하기 전에 컨테이너 이미지를 다운로드하는 중일 것

- **파드가 생성되어 컨테이너가 실행되는 과정**
    1. 로컬에서 빌드한 이미지를 도커 허브에 push 한다.
    2. kubectl 명령어를 입력하면, kubectl은 REST API를 호출한다.
    3. 파드가 생성되고 마스터 노드의 스케줄러가 워커 노드에 파드를 스케줄링한다.
    4. 워커 노드의 Kubelet이 통지를 받는다.
    5. Kubelet은 도커에 이미지를 실행하라고 지시한다.
    6. 워커 노드 안에 파드 안에 컨테이너가 만들어진다.

- **파드 삭제**

    ```bash
    $ kubectl delete pods <pod_name>
    ```

## 서비스 오브젝트

- 각 파드는 자체 IP 주소를 가지고 있지만 이 주소는 클러스터 내부에 있으며 외부에서 접근이 불가능하다.

    외부에서 파드에 접근하려면 서비스 오브젝트를 통해 노출해야 한다.

- 파드와 마찬가지로 일반적인 서비스(Cluster IP 서비스)를 생성하면 이것은 클러스터 내부에서만 접근 가능하기 때문에 LoadBalancer 유형의 서비스를 생성해야 한다.
그러면 로드 밸런서의 퍼블릭 IP를 통해 파드에 연결할 수 있다.

- 서비스 생성을 위해 **파드 노출**

    ```bash
    $ kubectl expose rc kubia --type=LoadBalancer --name kubia-http

    >>>
    service/kubia-http exposed
    ```

    ⇒ kubia-http 라는 load balancer service를 생성

    - 약어 : pod는 `po`, service는 `svc`, replicationcontroller는 `rc` 등

- **Minikube**는 LoadBalancer 서비스를 지원하지 않으므로 expose 하는 것으로는 서비스의 외부 IP를 얻지 못한다.

    대신 아래의 명령어를 실행해 서비스에 접근 가능한 IP와 포트를 얻을 수 있다.

    ```bash
    $ minikube service kubia-http
    ```

- **서비스 조회**

    서비스를 조회하면, Cluster-IP와 External-IP가 함께 조회된다.
    로드밸런서의 가동이 완료되면 서비스의 외부 IP 주소(External-IP)가 표시되어서 어디에서나 해당 주소 + port로 접근이 가능하다.

    ```bash
    $ kubectl get services
    or
    $ kubectl get svc
    ```

- 서비스 삭제

    ```bash
    $ kubectl delete service <service_name>
    ```

- External IP를 이용해 서비스 접근

    서비스의 외부 IP와 포트를 통해 파드에 요청을 보낼 수 있다.

    ```bash
    $ curl <external_ip>

    >>>
    You've hit ... kubia
    ```

    - `os.hostname()` : 애플리케이션에서 파드 이름을 호스트 이름으로 사용한다는 것을 알 수 있다.
    각 파드는 자체 IP 주소와 호스트 이름을 가진 별도의 독립 머신처럼 동작하기 때문이다.
    애플리케이션이 워커 노드 운영체제에서 실행 중이라 할지라도 애플리케이션은 다른 프로세스와 함께 실행 중인 상태가 아니며 애플리케이션 전용으로 분리된 머신에서 실행 중인 것으로 나타난다.

## 파드와 컨테이너

- 시스템의 가장 중요한 구성 요소는 파드다.
- 파드는 원하는 만큼의 컨테이너를 포함시킬 수 있다.
- 여기에서, 컨테이너 내부에는 Node.js 프로세스가 있고 특정 포트에 바인딩 되어 HTTP 요청을 기다리고 있다.
- 파드는 자체의 고유한 사설 IP 주소와 호스트 이름을 가진다.

## Replication Controller

- 파드를 복제하고 항상 실행 상태로 만든다.
- 항상 정확히 하나의 파드 인스턴스를 실행하도록 지정한다.
- 어떤 이유로 파드가 사라진다면 레플리케이션컨트롤러는 사라진 파드를 대체하기 위해 새로운 파드를 생성할 것이다.

## 서비스

- 파드는 일시적(ephemeral)이다. 언제든 사라질 수 있다. 대체된 새로운 파드는 다른 IP 주소를 할당받는다.
- 서비스는 항상 변경되는 파드의 IP 주소 문제와 여러 개의 파드를 단일 IP와 포트의 쌍으로 노출시키는 문제를 해결한다.
- 서비스는 동일한 서비스를 제공하는 하나 이상의 파드 그룹의 정적 위치를 나타낸다.
서비스의 IP와 포트로 유입된 요청은 그 순간 서비스에 속해 있는 파드 중 하나에게 전달된다.

## **쿠버네티스의 방식**

1. 어떤 액션을 수행해야 하는지 정확하게 알려주는 대신에, 시스템의 의도하는 상태 (`Desired state`)를 선언적으로 변경
2. 쿠버네티스가 실제 현재 상태(`Current state`)를 검사한다.
3. current가 desired와 다르다면 의도한 상태로 조정(reconcile) 한다.

## Scale Out

- 쿠버네티스를 사용하는 주요 이점 중 하나는 간단하게 배포를 확장할 수 있다는 것이다.

    다만 애플리케이션 자체에서 수평 확장을 지원하도록 만들어야 한다.

- 파드는 레플리케이션컨트롤러에 의해 관리된다.

    ```bash
    $ kubectl get replicationcontrollers
    ```

    - `Desired` : 레플리케이션컨트롤러가 유지해야 할 파드의 레플리카 수
    - `Current` : 현재 실행 중인 파드의 실제 개수

- 파드의 레플리카 수를 늘리려면, 레플리카 컨트롤러의 `Desired` 레플리카 수를 변경해야 한다.

    ```bash
    $ kubectl scale rc kubia --replicas=3

    >>>
    replicationcontroller "kubia" scaled
    ```

- 실행 중인 애플리케이션이 다수의 인스턴스를 가질 때, 서비스 URL을 호출했을 때 **서비스는 무작위로 파드를 호출**한다.

    서비스는 다수 파드 앞에서 로드밸런서 역할을 한다.

- **파드가 IP가 변경되어도 서비스는 항상 동일한 주소**를 가지므로, 얼마나 많은 파드가 존재하고 위치가 변경되는지에 관계없이 클라이언트가 파드에 쉽게 연결할 수 있다.

## 파드와 노드

- 쿠버네티스에서는 파드가 적절히 실행하는 데 필요한 CPU와 메모리를 제공하는 노드에 스케줄링됐다면, 어떤 노드에 파드가 실행 중인지는 중요하지 않다.
- 파드가 스케줄링된 노드와 상관없이 컨테이너 내부에 실행 중인 모든 애플리케이션은 동일한 유형의 운영체제 환경을 갖는다.
- 각 파드는 자체 IP를 가지고 다른 파드가 같은 노드에 있는지 혹은 다른 노드에서 실행 중인지에 상관없이 통신할 수 있다.

- 파드가 실행 중인 노드를 알고 싶다면 :

    ```bash
    $ kubectl get pods -o wide
    ```

    ```bash
    $ kubectl describe pod <pod_name>
    ```

## 쿠버네티스 대시보드

- 파드, 레플리케이션컨트롤러, 서비스 같은 클러스터의 많은 오브젝트를 조회, 생성, 수정, 삭제 가능
- 오브젝트를 생성, 수정한 뒤 클러스터에 무엇이 배포됐는지 그래픽 화면으로 빠르게 확인 가능

- GKE를 사용하는 경우 :

    ```bash
    $ kubectl cluster-info | grep dashboard
    ```

    - 대시보드의 사용자 이름과 암호 찾기 (GKE)

        ```bash
        $ gcloud container clusters describe kubia | grep -E "(username|password):"
        ```

- Minikube를 사용하는 경우 :

    ```bash
    $ minikube dashboard
    ```


<br>

### _Reference_
> [_쿠버네티스 인 액션_](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791161754048&orderClick=LA6)  