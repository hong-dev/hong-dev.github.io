---
title: "[Kubernetes in Action] Chapter 5. 서비스: 클라이언트가 파드를 검색하고 통신을 가능하게 함"
date: "2020-09-22T23:12:03.284Z"
template: "post"
draft: true
category: "book"
tags:
  - "Kubernetes in Action"
  - "k8s"
description: "Kubernetes, Service, Pod, Client"
socialImage: ""
---


> _Kubernetes in Action 번역본 내용 정리_

- 쿠버네티스가 아닌 세계에서는 시스템 관리자가 클라이언트 구성 파일에 서비스를 제공하는 서버의 정확한 IP 주소나 호스트 이름을 지정한다.
- 쿠버네티스에서는 파드는 일시적이며, 파드 IP는 스케줄링하면서 할당된다.
또한 클라이언트는 서비스를 지원하는 파드의 수와 IP에 상관하지 않아야 하므로, 개별 IP 목록을 유지할 필요가 없다.

## 서비스

- 동일한 서비스를 제공하는 파드 그룹에 지속적인 단일 접점을 단들려고 할 때 생성
- 각 서비스는 파드의 서비스가 존재하는 동안 절대 바뀌지 않는 IP 주소와 포트가 있다.
- 클라이언트는 서비스를 제공하는 개별 파드의 위치를 알 필요가 없고, 파드는 언제든지 클러스터 안에서 이동할 수 있다.
- 내부 클라이언트와 외부 클라이언트 모두 서비스로 파드에 접속한다.

## 서비스 생성

- 가장 쉬운 방법은 `kubectl expose`를 사용하는 것 (2장에서 rc 노출하는 데 사용했었다.)

    expose는 rc에서 사용된 것과 동일한 파드 셀렉터를 사용해 서비스 리소스를 생성하고 모든 파드를 단일 IP 주소와 포트로 노출한다.

### Kubernetes API 서버에 yaml을 게시해 수동으로 생성

```yaml
#kubia-svc.yaml

apiVersion: v1
kind: Service
metadata:
  name: kubia
spec:
  ports:
  - port: 80  #서비스가 사용할 포트
    targetPort: 8080  #서비스가 포워드할 컨테이터 포트
  selector:     # 해당 레이블이 있는 모든 파드가 이 서비스에 포함
    app: kubia
```

⇒ 포트 80을 연결하고, 각 연결을 app=kubia 레이블 셀렉터와 일치하는 파드의 포트 8080으로 라우팅한다. (80 → app=kubia 파드들 → 컨테이너 8080)

- **서비스 생성**

    ```bash
    $ kubectl create -f kubia-svc.yaml
    ```

- **서비스 조회**

    서비스의 `PORT`와 내부 클러스터 IP 주소(`CLUSTER-IP`)가 할당된 것을 볼 수 있다.

    ```bash
    $ kubectl get svc

    >>>
    NAME   TYPE   CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
    ```

- 클러스터 IP는 클러스터 내부에서만 액세스 할 수 있다.
External-IP가 none이라면 아직 외부에 노출되지는 않은 것

### 클러스터 내에서 서비스 테스트

1. 서비스의 클러스터 IP로 요청을 보내고 응답을 로그로 남기는 파드 생성
2. 쿠버네티스 노드로 ssh 접속하고 curl 명령 실행
3. kubectl exec 명령어로 기존 파드에서 curl 명령 실행

    `exec` : 기존 파드의 컨테이너 내에서 원격으로 임의의 명령어 실행 가능 (컨테이너의 내용, 상태, 환경을 검사할 때 유용)

    ```bash
    $ kubectl exec <pod_name> -- curl -s <service_cluster_ip>
    ```

**Double Dash (`--`)**
kubectl 명령줄 옵션의 끝을 의미
더블 대쉬 뒤의 모든 것은 파드 내에서 실행되어야 하는 명령
명령줄에 대시 옵션이 없으면 상관없지만, 있다면 kubectl exec 옵션으로 인식해서 오류가 발생하므로 더블대시 사용

### Session Affinity

- 동일한 클라이언트에서 요청하더라도 기본적으로 서비스 프록시는 임의의 파드와 연결해서, 요청할 때마다 다른 파드가 선택된다.
- 동일한 클라이언트 IP의 모든 요청을 동일한 파드로 전달하려면 `sessionAffinity`를 설정해준다.

    ```yaml
    # kubia-svc-client-ip-session-affinity.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: kubia
    spec:
      sessionAffinity: ClientIP  #None과 ClientIP 두 가지 유형만 지원
      ports:
      - port: 80
        targetPort: 8080
      selector:
        app: kubia
    ```

- 서비스는 TCP와 UDP 패킷을 처리하고 그들이 가지고 있는 payload는 신경쓰지 않는다.

    쿠키는 HTTP 프로토콜의 구성이기 때문에 서비스는 쿠키를 알지 못하여, 세션 어피니티를 쿠키 기반으로 할 수 없다.

### 여러 개의 포트 노출

- 서비스는 여러 포트를 지원할 수 있다.

    예를 들어 파드가 두 개의 포트를 수신한다면, 굳이 두 개의 서비스를 만들지 않고 하나의 서비스를 사용해 전달할 수 있다.

- 하나의 서비스를 사용해 멀티 포트 서비스를 사용하면, 단일 클러스터 IP로 모든 서비스 포트가 노출된다.
- 여러 포트가 있는 서비스를 만들 때는 **각 포트의 이름을 지정**해야 한다.
- 레이블 셀렉터는 서비스 전체에 적용되며, 각 포트를 개별적으로 구성할 수는 없다.

    ```yaml
    # kubia-svc-multiports.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: kubia
    spec:
      ports:
      - name: http
        port: 80
        targetPort: 8080
      - name: https
        port: 443
        targetPort: 8443
      selector:
        app: kubia
    ```

    ⇒ 포트 80은 파드의 포트 8080에, 포트 443은 파드의 포트 8443에 매핑된다.

### 이름이 지정된 파드의 포트 사용

- 포트 번호를 참조하지 않고, 각 파드 포트에 이름을 지정하고 서비스 스펙에서 이름으로 참조할 수도 있다.
- 나중에 서비스 스펙을 변경하지 않고도 포트 번호를 변경할 수 있다는 장점 (이름으로 참조 중이라면, 이름 변경 없이 파드 스펙에서 포트 번호를 변경하기만 하면 된다.)

    ```yaml
    # 파드 yaml

    kind: Pod
    spec:
      containers:
      - name: kubia
        ports:
        - name: http
          containerPort: 8080
        - name: https
          containerPort: 8443
    ```

    ```yaml
    # 서비스 yaml

    apiVersion: v1
    kind: Service
    spec:
      ports:
      - name: http
        port: 80
        targetPort: http
      - name: https
        port: 443
        tartgetPort: https  #포트 번호 대신에 이름 사용
    ```

## 서비스 검색

- 서비스를 만들면 파드에 엑세스할 수 있는 안정적인 IP 주소와 포트가 생긴다.

    이 서비스의 파드는 생성되고 사라지기도 하는데 파드의 IP나 개수가 변경되어도, 항상 서비스의 IP 주소로 액세스 할 수 있어야 한다.

- 쿠버네티스는 클라이언트 파드가 서비스의 IP와 포트를 검색할 수 있는 방법을 제공한다.
- 아래의 모든 방법은 기존 파드(클라이언트 파드) 내에서 실행되어야 하므로 `exec` 명령어를 이용한다.

### 1. 환경변수 이용

- 파드가 시작되면 쿠버네티스는 해당 시점에 존재하는 각 서비스를 가리키는 환경변수 세트를 초기화한다.
- 파드를 만든 후에 서비스를 만들면 서비스에 대한 환경변수를 설정할 수 없다.
**서비스를 먼저 만들고 파드가 생성되어야 한다.**

- 파드 전체 삭제

    ```bash
    $ kubectl delete pods --all
    ```

- replicaset이 파드를 새로 생성하면, 아래의 명령어를 실행해 **환경변수 조회**

    클러스터에 존재하는 모든 서비스들의 환경변수가 목록에 포함된다.
    이러한 방법으로 클라이언트 파드는 다른 파드에 접근하기 위한 서비스의 IP와 포트를 찾을 수 있다.

    ```bash
    $ kubectl exec <pod_name> env

    >>>
    ....
    KUBIA_SERVICE_HOST=xxxx   #서비스의 클러스터 IP
    KUBIA_SERVICE_PORT=xx     #서비스가 제공되는 포트
    ....
    ```

### 2. DNS 이용

- kube-system 네임스페이스에 있는 파드 중 하나는 dns 관련 파드다.

    이 파드는 DNS 서버를 실행하며, 클러스터에서 실행 중인 다른 모든 파드는 자동으로 이를 사용하도록 구성된다.
    (쿠버네티스는 각 컨테이너의 /etc/resolv.conf 파일을 수정해 이를 수행한다.)

- 파드에서 실행 중인 프로세스에서 수행된 모든 DNS 쿼리는 시스템에서 실행 중인 모든 서비스를 알고 있는 쿠버네티스의 자체 DNS 서버로 처리된다.
- 파드가 내부 DNS 서버를 사용할지 여부는 각 파드 스펙의 dnsPolicy 속성으로 구성할 수 있다.
- 각 서비스는 내부 DNS 서버에서 DNS 항목을 가져오고, 서비스 이름을 알고 있는 클라이언트 파드는 환경변수 대신 **FQDN**(정규화된 도메인 이름)으로 접근할 수 있다.
- 클라이언트는 여전히 서비스의 포트 번호를 알아야 한다. 서비스가 표준 포트(ex. HTTP는 80, Postgres는 5432)를 사용하는 경우는 문제 없지만, 그렇지 않다면 클라이언트는 환경 변수에어 포트 번호를 얻을 수 있어야 한다.

- **FQDN (Fully Qualified Domain Name)**

    ```bash
    #example

    kubia.default.svc.cluster.local
    ```

    `kubia` : 서비스 이름

    `default` : 서비스가 정의된 네임스페이스

    `svc.cluster.local` : 모든 클러스터의 로컬 서비스 이름에 사용되는 클러스터의 도메인 접미사

    ⇒ 만약 클라이언트 파드가 kubia의 파드와 동일한 네임스페이스에 있는 경우 접미사와 네임스페이스는 생략하고 단순히 `kubia` 로 서비스에 연결할 수 있다.

- bash shell로 **서비스 access**

    (위에서 실행했던 것처럼 exec에서 직접 curl을 실행하는 방식도 가능)

    아래의 방법들로 접근하는 것이 모두 가능

    ```bash
    $ kubectl exec -it <pod_name> bash

    root@kubia-5l8dg:/# curl kubia
    >>> You\'ve hit ... kubia-4h852

    root@kubia-5l8dg:/# curl kubia.default
    >>> You\'ve hit ... kubia-4h852

    root@kubia-5l8dg:/# curl kubia.default.svc.cluster.local
    >>> You\'ve hit ... kubia-8kvt4

    root@kubia-5l8dg:/# curl kubia.default.svc.cluster.local:80
    >>> You\'ve hit ... kubia-4h852

    root@kubia-5l8dg:/# curl http://kubia
    >>> You've hit ... kubia-4h852
    ```

- 각 파드 컨테이너 내부의 DNS resolver가 구성되어 있기 때문에 네임스페이스와 svc.cluster.local 접미사 생략 가능

    ```bash
    root@kubia-5l8dg:/# cat /etc/resolv.conf

    >>>
    ....
    search default.svc.cluster.local svc.cluster.local cluster.local
    ....
    ```

### 3. Ping test

- 서비스의 클러스터 IP가 가상 IP이므로 서비스 포트와 결합된 경우에만 의미가 있다.
- 즉, 서비스에 ping test를 해도 응답이 없으므로 당황하지 말 것 (11장 참조)

    ```bash
    root@kubia-5l8dg:/# ping kubia

    >>>
    PING kubia.default.svc.cluster.local : 56 data bytes
    ^C--- kubia.default.svc.cluster.local ping statistics ---
    117 packets transmitted, 0 packets received, 100% packet loss
    ```

## 클러스터 외부에 있는 서비스 연결

- 클러스터 내부에서 파드가 외부 서비스를 사용하는 방법

### 서비스 엔드포인트 리소스

- 서비스는 파드에 직접 link되지 않고, 엔드포인트 리소스가 그 사이에 있다.

    파드 셀렉터는 연결을 전달할 때 직접 사용하지는 않고, IP와 포트 목록을 작성하는 데 사용된다.

    ```bash
    $ kubectl describe svc kubia

    >>>
    ....
    Selector: app=kubia   #파드 셀렉터는 엔드포인트 목록을 만드는 데 사용
    Endpoints: 10.108.1.4:8080,10.108.2.5:8080  #서비스의 엔드포인트를 나타내는 파드 IP와 포트 목록
    ....
    ```

- **Endpoints 조회**

    ```bash
    $ kubectl get endpoints         #전체 엔드포인트 조회

    $ kubectl get endpoints kubia   #kubia 서비스의 엔드포인트 조회
    ```

### 1. 서비스 엔드포인트 수동 구성으로 외부 서비스 노출

- 파드 셀렉터 없이 서비스를 만들면, 서비스에 포함된 파드가 무엇인지 알 수 없기 때문에 쿠버네티스는 엔드포인트 리소스를 만들지 못한다.
- 수동으로 관리되는 엔드포인트를 사용해 서비스를 만들려면, 서비스와 엔드포인트 리소스를 모드 만들어야 한다.

    ```yaml
    # external-service.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: external-service  #엔드포인트 이름과 일치해야 한다.
    spec:
      ports:
      - port: 80
    ```

    ```yaml
    # external-service-endpoints.yaml

    apiVersion: v1
    kind: Endpoints
    metadata:
      name: external-service  #서비스 이름과 일치해야 한다.
    subsets:
      - addresses:  #서비스가 연결을 전달한 엔드포인트의 IP
        - ip: 11.11.11.11
        - ip: 22.22.22.22
        ports:
        - port: 80  #엔드포인트의 대상 포트
    ```

- 나중에 외부 서비스를 쿠버네티스 내에서 실행되는 파드로 마이그레이션하기로 결정한 경우, 서비스에 셀렉터를 추가해 엔드포인트를 자동으로 관리할 수 있다.
- 서비스에서 셀렉터를 제거하면 쿠버네티스는 엔드포인트 업데이트를 멈춘다.

    서비스의 실제 구현이 변경되는 동안에도 서비스 IP 주소는 일정하게 유지될 수 있다.

### 2. FQND으로 외부 서비스 참조

- 파드 → 서비스 → 외부 서비스
- Service spec의 type 필드를 `ExternalName`으로 설정 (type의 default는 `ClusterIP`)

    ```yaml
    # external-service-externalname.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: external-service
    spec:
      type: ExternalName  #서비스 유형 설정
      externalName: api.somecompany.com  #실제 서비스의 FQDN
      ports:
      - port: 80
    ```

- 서비스를 사용하는 파드에서 실제 서비스(외부 서비스) 이름과 위치가 숨겨져, 나중에 서비스 스펙을 수정하면 다른 서비스를 가리킬 수도 있다.
- ExternalName 서비스는 DNS 레벨에서만 구현된다. 서비스에 관한 간단한 CNAME DNS 레코드(IP 주소 대신 FQDN)가 생성된다.
따라서 서비스에 연결하는 클라이언트는 서비스 프록시를 완전히 무시하고 외부 서비스에 직접 연결된다.
이러한 이유로 ExternalName 유형의 서비스는 `Cluster-IP`를 얻지 못하고, `External-IP`만 가지게 된다.

    ```bash
    $ kubectl get svc

    >>>
    NAME               TYPE           CLUSTER-IP       EXTERNAL-IP           PORT(S)   AGE
    external-service   ExternalName   <none>           api.somecompany.com   80/TCP    7s
    kubia              ClusterIP      10.111.249.153   <none>                80/TCP    165m
    ```

## 외부 클라이언트에 서비스 노출

- 특정 서비스를 외부에 노출해 외부 클라이언트가 액세스할 수 있게 하는 방법

### 1. NodePort로 서비스 유형 설정

- 외부 클라이언트 ⇒ **노드포트** ⇒ 서비스 ⇒ 파드
- 각 클러스터 노드는 노드 자체에서 포트를 열고 해당 포트로 수신된 트래픽을 서비스로 전달 (p.228)
- 노드포트 서비스를 만들면 쿠버네티스는 모든 노드에 특정 포트를 할당하고(모든 노드에서 동일한 포트 번호가 사용된다.), 서비스를 구성하는 파드로 들어오는 연결을 전달한다.
- 이 서비스는 일반 서비스(ClusterIP)와 유사하지만, `<내부 클러스터 IP>:<포트>`뿐만 아니라 `<모든 노드의 IP>:<할당된 노드포트>`로 서비스에 액세스 가능

- **NodePort Service 생성**

    ```yaml
    # kubia-svc-nodeport.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: kubia-nodeport
    spec:
      type: NodePort  #서비스 유형
      ports:
      - port: 80          #서비스 내부 클러스터 IP 포트
        targetPort: 8080  #서비스 대상 파드의 포트
        nodePort: 30123   #각 클러스터 노드의 포트로 서비스에 액세스 가능 (생략하면 임의의 포트)
      selector:
        app: kubia
    ```

- Service 조회

    ```bash
    $ kubectl get svc

    >>>
    NAME               TYPE           CLUSTER-IP       EXTERNAL-IP           PORT(S)        AGE
    external-service   ExternalName   <none>           api.somecompany.com   80/TCP         20m
    kubia              ClusterIP      10.111.249.153   <none>                80/TCP         3h6m
    kubia-nodeport     NodePort       10.105.153.12    <nodes>               80:30123/TCP   29s
    ```

    `EXTERNAL-IP` : <nodes> (minikube에서는 <none>으로 표시된다. 외부 IP 생성방법 2장 참조)

    `PORT` : 클러스터 IP의 내부 포트(80)와 노드포트(30123)

- 위에서 생성된 NodePort Service는 다음 주소에서 액세스 가능
    1. <service의 CLUSTER-IP>:80
    2. <첫 번째 노드의 IP>:30123
    3. <두 번째 노드의 IP>:30123 등

- 첫 번째 노드의 포트 30123에서 수신된 연결은 서비스로 전달되고, 서비스는 임의의 파드를 선택하기 때문에 꼭 첫 번째 노드에서 실행 중인 파드로 전달되지 않을 수 있다. (다른 노드의 파드로 전달될 수 있다.)

- 외부 클라이언트가 노드포트 서비스에 액세스할 수 있도록 방화벽 규칙 변경 (GKE)

    ```bash
    # 해당 노드포트에 대한 외부 연결 허용

    $ gcloud compute firewall-rules create kubia-svc-rule --allow=tcp:30123
    ```

- **노드의 IP 찾기**

    노드의 JSON 또는 YAML 요약에서 IP 찾기도 가능

    ```bash
    $ kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type=="ExternalIP")].address}'
    ```

    - items 속성의 모든 항목 조회
    - 각 항목의 status 속성 조회
    - addresses 속성의 항목에서 type 속성이 ExternalIP로 설정된 항목으로 필터링
    - 필터링된 항목의 address 속성 출력

    kubectl + JSONPath 사용 방법 참조: [https://kubernetes.io/docs/reference/kubectl/jsonpath/](https://kubernetes.io/docs/reference/kubectl/jsonpath/)

- **노드 IP로 서비스 access**

    ```bash
    $ curl <any_node_ip>:<nodeport>
    ```

    ```bash
    # minikube를 사용하는 경우

    $ minikube service <service_name> [-n <namespace>]
    ```

### 2. LoadBalancer로 서비스 유형 설정

- 외부 클라이언트 ⇒ **로드밸런서** ⇒ 노드포트 ⇒ 서비스 ⇒ 파드
- 노트포트에서 클라이언트가 첫 번째 노드에만 요청하면 해당 노드가 장애가 났을 때 클라이언트는 더 이상 서비스에 접근할 수 없다.
그렇기 때문에 모든 노드레 요청을 분산시키고 해당 시점에 오프라인 상태인 노드로 요청을 보내지 않도록 노드 앞에 로드밸런서를 배치하는 것이 좋다.
- 로드밸런서는 노드포트 유형의 확장

    로드밸런서 서비스를 지원하지 않는 환경에서 실행하면, 로드밸런서는 프로비저닝되지는 않지만 서비스는 여전히 노드포트 서비스처럼 작동한다.

- **트래픽을 모든 노드의 노드포트로 전달.** 클라이언트는 로드밸런서의 IP로 서비스에 액세스

- **로드밸런서 서비스 생성**

    특정 `nodePort`를 지정할 수 있지만, 생략하면 쿠버네티스가 포트를 임의로 선택한다.

    ```yaml
    # kubia-svc-loadbalancer.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: kubia-loadbalancer
    spec:
      type: LoadBalancer
      ports:
      - port: 80
        targetPort: 8080
      selector:
        app: kubia
    ```

- **로드밸런서 IP로 서비스 access**

    노드포트 서비스와는 달리 방화벽 설정이 필요없다.

    ```bash
    # 해당 로드밸런서 서비스의 EXTERNAL-IP 확인
    $ kubectl get svc kubia-loadbalancer
    ```

    ```bash
    # external-ip로 서비스에 access
    $ curl <service_external_ip>

    # minikube의 경우
    $ minikube service kubia-loadbalancer
    ```

- **웹브라우저에서 서비스에 액세스하는 경우**

    현재 서비스가 외부에 노출되어 있으므로 웹브라우저에서도 접근이 가능하다.
    이때, 브라우저는 매번 정확히 같은 파드를 호출하는데, 이유가 뭘까?

    브라우저는 keep-alive 연결을 사용하고 같은 연결로 모든 요청을 보내지만, curl은 매번 새로운 연결을 한다.

    서비스는 연결 수준에서 동작하므로, sessionAffinity가 None이더라도 연결이 종료될 때까지 사용자는 항상 동일한 파드에 연결된다.

- 로드밸런서 유형 서비스는 추가 인프라 제공 로드밸런서가 있는 노드포트 서비스다.

    이전에 수행한 방식으로 노드포트 서비스에 대한 포트의 방화벽을 여는 경우, 로드밸런서 유형 서비스에 할당된 노드 IP로도 서비스에 액세스할 수 있다.

### 3. Ingress 리소스 생성

- 단일 IP 주소로 여러 서비스를 노출
- HTTP 레벨(네트워트 7계층)에서 작동하므로 4계층 서비스(TCP/UDP 등을 처리)보다 더 많은 기능을 제공할 수 있다.
- 뒤에서 자세히 설명

## 외부 연결의 특성

### externalTrafficPolicy

- 이전에 봤듯이, 외부 연결의 수신한 노드에서 실행 중이지 않은 파드에 연결이 될 수도 있다. 이런 경우 파드에 도달하려면 추가적인 네트워크 홉(컴퓨터 네트워크에서 출발지와 목적지 사이에 위치한 경로의 한 부분)이 필요할 수 있다.
- 외부의 연결을 수신한 노드에서 실행 중인 파드로만 외부 트래픽을 전달하도록 서비스를 구성해 추가 홉 방지 가능

    ```yaml
    # kubia-svc-nodeport-onlylocal.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: kubia-nodeport-onlylocal
    spec:
      type: NodePort
      externalTrafficPolicy: Local   #local 설정
      ports:
      - port: 80
        targetPort: 8080
        nodePort: 30124
      selector:
        app: kubia
    ```

- 이 경우 로컬 파드가 존재하지 않으면 연결이 중단된다.
따라서 로드밸런서는 그러한 파드가 하나 이상 있는 노드에만 연결을 전당하도록 해야 한다.
- 일반적으로 연결이 모든 파드에 균등하게 분산되지만, 이 경우에는 로드밸런서가 노드에 균등하게 연결해준다고 해도, 각 노드가 가진 파드 개수가 다르면 결과적으로 파드에는 균등하게 분산되지 않는다.
(적은 수의 파드를 가진 노드에서 실행되는 파드가 더 많이 수신하게 된다.)

### 클라이언트 IP가 보존되지 않음

- 일반적으로 클러스터 내의 클라이언트가 서비스로 연결할 때 서비스의 파드는 클라이언트의 IP 주소를 얻을 수 있다.
- 그러나 노드포트로 연결을 하면 패킷에서 소스 네트워크 주소 변환(SNAT)이 수행되므로 패킷의 소스 IP가 변경된다.
- 파드는 실제 클라이언트의 IP를 볼 수 없다. 이는 클라이언트의 IP를 알아야 하는 일부 애플리케이션에서 문제가 될 수 있다.
예를 들어 웹 서버의 경우 액세스 로그에 브라우저 IP를 표시하지 못한다는 것
- 앞의 로컬 외부 트래픽 정책(Local External Traffic Policy)은 연결을 수신하는 노드와 대상 파드를 호스팅하는 노드 사이에 추가 홉이 없기 때문에 클라이언트 IP 보존에 영향을 미친다. (SNAT가 수행되지 않는다.) - 보존이된다는것..?

## Ingress Resource

- 외부 클라이언트 ⇒ **인그레스** ⇒ 서비스 ⇒ 파드
- 인그레스는 **한 IP 주소로 수십 개의 서비스에 접근**이 가능하도록 지원해준다.
클라이언트가 HTTP 요청을 인그레스에 보낼 때, 요청한 호스트와 경로에 따라 요청을 전달할 서비스가 결정된다.
- 인그레스는 네트워크 스택의 애플리케이션 계층(HTTP)에서 작동하며 서비스가 할 수 없는 쿠키 기반 세션 어피니티 등과 같은 기능을 제공할 수 있다.
- 4계층은 포트로 제어(로드밸런서), 7계층은 경로path를 볼 수 있어(인그레스)
- 라우팅해주는 것이라고 생각하면 돼

### Ingress Controller

- 인그레스 리소스를 작동시키려면 클러스터에 인그레스 컨트롤러를 실행해야 한다.
- 구글 쿠버네티스 엔진은 구글 클라우드 플랫폼의 고유한 HTTP 로드밸런싱 기능을 사용해 인그레스 기능을 제공

- Minikube에서 인그레스 애드온 활성화

    ```bash
    # 모든 애드온을 조회해 활성화 여부 확인
    $ minikube addons list

    # ingress 활성화
    $ minikube addons enable ingress
    ```

    ⇒ 인그레스 컨트롤러가 또 다른 파드로 기동된다.

- 인그레스 컨트롤러 파드는 kube-system 네임스페이스에 있을 수 있지만 반드시 그런 것은 아니므로 모든 네임스페이스에서 실행 중인 모든 파드를 조회해서 확인할 수 있다.

    ```bash
    $ kubectl get po --all-namespaces

    >>>
    ....
    ingress-nginx-controller-....
    ```

    `nginx` : 오픈소스 HTTP 서버/ 리버스 프록시. 인그레스 기능을 제공하는 데 사용됨을 나타낸다.

### 인그레스 리소스 생성

```yaml
# kubia-ingress.yaml

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: kubia
spec:
  rules:
  - host: kubia.example.com  #인그레스는 해당 도메인 이름을 서비스에 매핑
    http:
      paths:
      - path: /
        backend:
          serviceName: kubia-nodeport  #모든 요청은 해당 서비스 포트 80으로 전달된다.
          servicePort: 80
```

⇒ Host kubia.example.com으로 요청되는 인그레스 컨트롤러에 수신된 모든 HTTP 요청을 포트 80의 kubia-nodeport 서비스로 전송

💡 클라우드 공급자 (ex. GKE)의 인그레스 컨트롤러는 인그레스가 노드포트 서비스를 가리킬 것을 요구하지만, 쿠버네티스 자체의 요구사항은 아니다.

### 인그레스로 서비스 액세스

- 해당 도메인으로 서비스에 액세스하려면 도메인 이름이 인그레스 컨트롤러의 IP와 매핑되도록 확인해야 한다.

- **인그레스의 IP 주소 얻기**

    `ADDRESS` 열에 IP가 표시된다.

    ```bash
    $ kubectl get ingresses

    >>>
    NAME    CLASS    HOSTS               ADDRESS          PORTS   AGE
    kubia   <none>   kubia.example.com   192.168.99.100   80      37s

    #ADDRESS 열에 IP 주소가 표시된다.
    ```

    💡 클라우드에서 실행하는 경우 인그레스 컨트롤러가 뒷단에서 로드밸런서를 프로비저닝하기 때문에 주소가 표시되는 데 시가이 걸릴 수 있다. 뿐만 아니라 의도치 않은 비용이 발생할 수 있으니 사용 시 주의해야 한다.

- **인그레스 컨트롤러가 구성된 호스트의 IP를 인그레스 엔드포인트로 지정**

    IP를 알고 나면, kubia.example.com을 해당 IP로 확인하도록 DNS 서버를 구성하거나, `/etc/hosts` 파일에 다음 줄을 추가한다.

    ```bash
    # /etc/hosts

    192.168.99.100  kubia.example.com
    ```

- **인그레스로 파드 액세스**

    ```bash
    $ curl kubia.example.com

    >>>
    You've hit ... kubia-4h852
    ```

- 인그레스 동작 방식
    1. 클라이언트가 kubia.example.com를 찾는다.
    2. DNS 서버(혹은 로컬 운영체제)가 인그레스 컨트롤러의 IP 반환
    3. 클라이언트는 HTTP GET 요청을 인그레스 컨트롤러로 전송 (헤더 Host: kubia.example.com)
    4. 컨트롤러는 해당 헤더에서 클라이언트가 액세스하려는 서비스를 결정하고, 서비스와 관련된 엔드포인트 오브젝트로 파드 IP를 조회한 다음 클라이언트 요청을 파드에 전달 (컨트롤러 ⇒ 파드)

- 인그레스 컨트롤러는 요청을 서비스로 전달하지 않는다. 서비스는 파드를 선택하는 데만 사용한다.

    모두는 아니지만 대부분의 컨트롤러는 이와 같이 작동한다.

### 하나의 인그레스로 여러 서비스 노출

- 인그레스는 여러 host와 path를 여러 서비스(backend.serviceName)에 매핑할 수 있다.

- **동일한 호스트, 여러 경로 ⇒ 여러 서비스**

    URL의 경로에 따라 각각 다른 서비스로 전송된다.

    클라이언트는 단일 IP 주소(인그레스 컨트롤러의 IP 주소)로 여러 서비스에 도달할 수 있다.

    ```yaml
    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
      name: kubia
    spec:
      rules:
      - host: kubia.example.com
        http:
          paths:
          - path: /kubia
            backend:
              serviceName: kubia
              servicePort: 80
          - path: /bar
            backend:
              serviceName: bar
              servicePort: 80
    ```

- **여러 호스트 ⇒ 여러 서비스**

    컨트롤러가 수신한 요청은 요청의 호스트 헤더(웹 서버에서 가상 호스트가 처리되는 방식)에 따라 각각 다른 서비스로 전달된다.

    DNS는 각각 다른 도메인 이름을 모두 인그레스 컨트롤러의 IP 주소로 지정해야 한다.

    ```yaml
    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
      name: kubia
    spec:
      rules:
      - host: foo.example.com
        http:
          paths:
          - path: /
            backend:
              serviceName: foo
              servicePort: 80
      - host: bar.example.com
        http:
          paths:
          - path: /
            backend:
              serviceName: bar
              servicePort: 80
    ```

### TLS 트래픽 처리

- 인그레스가 HTTP 트래픽을 전달하는 방법을 살펴보았다. 그러면 HTTPS는 어떨까?
- 클라이언트가 인그레스 컨트롤러에 대한 TLS 연결을 하면, 컨트롤러는 TLS 연결을 종료한다.

    클라이언트와 컨트롤러 간의 통신은 암호화되지만 컨트롤러와 백엔드 파드 간의 통신은 암호화되지 않는다.

- 파드에서 실행 중인 애플리케이션은 TLS를 지원할 필요가 없다.

    예를 들어 파드가 웹 서버를 실행하는 경우 HTTP 트래픽만 허용하고 인그레스 컨트롤러가 TLS와 관련된 모든 것을 처리하도록 할 수 있다.

- 컨트롤러가 그렇게 하려면 **인증서와 개인 키를 인그레스에 첨부**해야 한다.

- **개인 키 생성**

    tls.key 파일이 만들어진다.

    ```bash
    $ openssl genrsa -out tls.key 2048
    ```

- **TLS 인증서 생성**

    tls.cert 파일이 만들어진다.

    ```bash
    $ openssl req -new -x509 -key tls.key -out tls.cert -days 360 -subj /CN=kubia.example.com
    ```

- 개인 키와 인증서로 **시크릿 리소스 생성**

    개인 키와 인증서가 tls-secret이라는 시크릿에 저장된다.

    ```bash
    $ kubectl create secret tls tls-secret --cert=tls.cert --key=tls.key
    ```

**CertificateSigningRequest 리소스로 인증서 서명**

인증서를 직접 서명하는 대신 CSR 리소스를 만들어 서명할 수 있다.
사용자 또는 해당 애플리케이션이 일반 인증서 요청을 생성할 수 있고, CSR에 넣으면 그다음 운영자나 자동화된 프로세스가 다음과 같이 요청을 승인할 수 있다.

$ kubectl certificate approve <name of the CSR>

그런 다음 CSR의 status.certificate 필드에서 서명된 인증서를 검색할 수 있다.

인증서 서명자(signer) 구성 요소가 클러스터에서 실행 중이어야 한다.
그렇지 않으면 CSR의 생성과 승인 또는 거부가 전혀 작동하지 않는다.

- 시크릿 리소스 조회

    ```bash
    $ kubectl get secrets
    ```

- **인그레스 오브젝트 TLS 설정**

    ```yaml
    # kubia-ingress-tls.yaml

    apiVersion: extensions/v1beta1
    kind: Ingress
    metadata:
      name: kubia
    spec:
      tls:
      - hosts: 
        - kubia.example.com     #해당 호스트 이름의 TLS 연결 허용
        secretName: tls-secret  #개인키와 인증서는 tls-secret을 참조
      rules:
      - host: kubia.example.com
        http:
          paths:
          - path: /
            backend:
              serviceName: kubia-nodeport
              servicePort: 80
    ```

    ⇒ kubia.example.com에 대한 HTTPS 요청도 수락할 수 있다.

- **기존의 인그레스 업데이트**

    delete하고 다시 create 하는 대신, apply 명령어 실행

    ```bash
    $ kubectl apply -f kubia-ingress-tls.yaml
    ```

- **HTTPS로 인그레스를 통해 서비스에 액세스**

    명령어의 출력에는 애플리케이션의 응답과 인그레스에 구성한 서버 인증서가 표시된다.

    ```bash
    $ curl -k -v https://kubia.example.com/kubia
    ```

    - `-k` : https 사이트를 SSL certificate 검증없이 연결한다.
    - `-v` : 동작하면서 자세한 옵션을 출력한다.

- 인그레스는 현재 L7(HTTP/HTTPS) 수준의 로드밸런싱만 지원하지만 L4 수준의 로드밸런싱 지원도 계획되어 있다.

## Readiness Probe

- 파드의 label이 서비스의 파드 selector와 일치할 경우 파드가 서비스의 엔드포인트로 포함된다.
- 파드가 완전히 준비될 때까지 기동 중인 파드에 요청을 전달하지 않는 것이 좋다.

- 레디니스 프로브는 주기적으로 호출되며, 특정 파드가 클라이언트 요청을 수신할 수 있는지를 결정한다.
컨테이너의 레디니스 프로브가 성공을 반환하면 컨테이너가 요청을 수락할 준비가 되었다는 신호
- 레디니스 프로브를 사용하면 클라이언트가 정상 상태인 파드하고만 통신하고 시스템에 문제가 있다는 것을 절대 알아차리지 못한다.
- 애플리케이션 특성에 따라 상세한 레디니스 프로브를 작성하는 것은 애플리케이션 개발자의 몫

### 레디니스 프로브 유형

- **Exec 프로브 :** 프로세스를 실행. 컨테이너의 상태를 프로세스의 종료 상태 코드로 결정
- **HTTP GET 프로브 :** 컨테이너로 HTTP GET 요청. 응답의 HTTP 상태 코드를 보고 컨테이너 준비 여부 결정
- **TCP 소켓 프로브 :** 컨테이너의 지정된 포트로 TCP 연결을 연다. 소켓이 연결되면 컨테이너가 준비된 것으로 간주

### 레디니스 프로브 동작

- 주기적으로 프로브를 호출하고 프로브의 결과에 따라 작동
- 파드가 준비되거나 준비되지 않으면, 서비스의 엔드포인트에 추가되거나 제거된다.
- 라이브니스 프로브와는 달리 레디니스 프로브는, 컨테이너가 준비 상태 점검에 실패하더라도 컨테이너가 종료되거나 다시 시작되지 않는다.

### 파드에 레디니스 프로브 추가

- **기존의 파드 템플릿 열기**

    ```bash
    $ kubectl edit rc kubia
    ```

- `**spec.template.spec.containers` 설정 추가**

    ```yaml
    apiVersion: v1
    kind: ReplicationController
    metadata:
      name: kubia
    spec:
      replicas: 3
      selector:
        app: kubia
      template:
        metadata:
          labels:
            app: kubia
        spec:
          containers:
          - name: kubia
            image: luksa/kubia
            ports:
            - name: http
              containerPort: 8080
            readinessProbe:    #추가되는 부분
              exec:
                command:
                - ls
                - /var/ready
    ```

    ⇒ 레디니스 프로브는 컨테이너 내부에서 `ls /var/ready` 명령어를 주기적으로 수행

    `ls`는 파일이 존재하면 종료 코드 0을 반환, 그렇지 않으면 0이 아닌 값 반환. 파일이 있으면 레디니스 프로브 성공

    `/var/ready` 처럼 다소 이상한 프로브를 정의하는 이유는, 문제의 파일을 생성하거나 제거해 그 결과를 바로 전환할 수 있기 때문

- 레플리케이션컨트롤러의 파드 템플릿을 변경해도 기존 파드에는 영향을 미치지 않는다. (4장)

    기존 파드를 삭제하면 rc는 다시 파드를 생성하고, 새 파드는 레디니스 점검에 실패해서 /var/ready 파일을 만들 때까지 서비스의 엔드포인트에 포함되지 않는다.

    ```bash
    $ kubectl exec <pod_name> -- touch /var/ready
    ```

- **Readiness 정보 확인**

    ```bash
    $ kubectl describe <pod_name>

    >>>
    ....
    Readiness: exec [ls /var/ready] delay=0s timeout=1s period=10s #success=1 #failure=3
    ```

    ⇒ 레디니스 프로브는 기본으로 10초마다 주기적으로 프로브가 실행

- Endpoints에 잘 들어갔는지 확인

    ```bash
    $ kubectl get endpoints
    ```

- 서비스에서 파드를 수동으로 제거하려면, 수동으로 프로브의 스위치를 전환하는 대신 파드를 삭제하거나 파드 레이블을 변경해야 한다.

    서비스에서 파드를 수동으로 추가하거나 제거하려면 파드와 서비스의 레이블 셀렉터에 `enabled=true` 레이블을 추가한다. 서비스에서 파드를 제거하려면 레이블을 제거하라.

### 주의사항

- **레디니스 프로브를 항상 정의하라.**

    파드에 레디니스 프로브를 추가하지 않으면 파드가 시작하는 즉시 서비스 엔드포인트가 된다.
    애플리케이션이 수신 연결을 시작하는데 오래걸릴 수 있기 때문에, 기본 URL에 HTTP 요청을 보내더라도 항상 레디니스 프로브를 정의해야 한다.

- **레디니스 프로브에 파드의 종료 코드를 포함하지 마라.**

    파드가 종료될 때, 실행되는 애플리케이션은 종료 신호를 받자마자 연결 수락을 중단한다.
    종료 절차가 시작되는 즉시 레디니스 프로브가 실행하도록 만들어 파드가 모든 서비스에서 확실하게 제거되어야 한다고 생각할 수 있다.

    그러나 그건 필요치 않다. 쿠버네티스는 파드를 삭제하자마자 모든 서비스에서 파드를 제거하기 때문이다.

## Headless Service

- 클라이언트가 모든 파드에 연결해야 하는 경우 혹은 파드가 다른 파드에 각각 연결해야 하는 경우, 서비스로 연결하는 것은 확실한 방법이 아니다.
- 방법 1: 클라이언트가 쿠버네티스 API 서버를 호출해 파드와 IP 주소 목록을 가져오도록 하는 것

    ⇒ 애플리케이션을 쿠버네티스와 무관하게 유지하려고 노력해야 하기 때문에 항상 API 서버를 사용하는 것은 바람직하지 않다.

- 방법 2: DNS 조회로 클라이언트가 파드 IP를 찾는 것

### DNS 조회

- 일반적으로 서비스에 대한 DNS 조회를 수행하면 DNS 서버는 하나의 IP(서비스의 클러스터 IP)를 반환
- 그러나 쿠버네티스 서비스에 클러스터 IP가 필요하지 않다면 (서비스 스펙에서 clusterIP가 None일 경우), DNS 서버는 하나의 서비스 IP 대신 파드 IP들을 반환

### 헤드리스 서비스 생성

- 서비스 스펙의 clusterIP 필드를 None으로 설정하면, 쿠버네티스는 클라이언트가 서비스의 파드에 연결할 수 있는 클러스터 IP를 할당하지 않기 때문에 서비스가 headless 상태가 된다.

    ```yaml
    # kubia-svc-headless.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: kubia-headless
    spec:
      clusterIP: None  #헤드리스 설정
      ports:
      - port: 80
        targetPort: 8080
      selector:
        app: kubia
    ```

- service를 생성하고, kubectl get이나 kubectl describe 명령어로 확인할 수 있다. (ClusterIP가 없고, Endpoints에는 파드 셀렉터와 일치하는 파드가 포함되어 있다.)

### DNS로 파드 찾기

- DNS 조회로 실제 파드 IP를 얻을 수 있는데, 파드 내부에서 조회해야 한다.

- 안타깝게도 생성했던 kubia 컨테이너 이미지에는 nslookup(또는 dig) 바이너리가 포함되어 있지 않으므로 DNS 조회를 수행하는 데 사용할 수 없다.
필요한 바이너리가 포함된 이미지를 기반으로 새 파드를 실행한다.
DNS 관련 작업을 수행하려면 도커 허브의 nslookup 및 dig 바이너리를 모두 포함하는 `tutum/dnsutils` 컨테이너 이미지 사용 가능

- **yaml 매니페스트를 사용하지 않고 파드 실행**

    `--generator=run-pod/v1` 옵션을 통해, 어떤 종류의 rc나 그와 유사한 장치 없이 파드를 직접 생성

    ```bash
    $ kubectl run dnsutils --image=tutum/dnsutils --generator=run-pod/v1 --command -- sleep infinity

    >>>
    pod/dnsutils created
    ```

- **DNS 조회**

    ```bash
    $ kubectl exec dnsutils nslookup kubia-headless

    >>>
    Name:	kubia-headless.default.svc.cluster.local  #준비된 파드
    Address: 10.108.1.4   #준비된 파드의 IP
    Name:	kubia-headless.default.svc.cluster.local
    Address: 10.108.2.5
    Name:	kubia-headless.default.svc.cluster.local
    Address: 10.108.0.9
    ```

- 파드 IP 확인

    ```bash
    $ kubectl get po -o wide
    ```

- **헤드리스가 아닌 일반 서비스 DNS 조회**

    여기서 반환된 IP는 서비스의 클러스터 IP이다.

    ```bash
    $ kubectl exec dnsutils nslookup kubia

    >>>
    Name:	kubia.default.svc.cluster.local
    Address: 10.111.249.153
    ```

- 헤드리스 서비스를 이용하더라도 일반 서비스와 마찬가지로 서비스의 DNS 이름에 연결해 파드에 access 할 수 있다.
그러나 헤드리스 서비스에서는 DNS가 파드의 IP를 반환하기 때문에 클라이언트는 서비스 프록시 대신 파드에 직접 연결한다.

    즉, 헤드리스 서비스는 여전히 파드 간에 로드밸런싱을 제공하지만, 서비스 프록시 대신 DNS 라운드 로빈 메커니즘으로 제공한다.

### 모든 파드 검색 (준비되지 않은 파드 포함)

- DNS 조회 메커니즘을 사용해 준비되지 않은 파드도 찾을 수 있다.
- `publishNotReadyAddresses` 어노테이션을 추가하면 쿠버네티스는 파드의 레디니스 상태에 관계없이 모든 파드를 서비스에 추가한다.

    ```yaml
    # kubia-svc-publish-not-ready.yaml

    apiVersion: v1
    kind: Service
    metadata:
      name: kubia-all
    spec:
      ports:
      - port: 80
        targetPort: 8080
      selector:
        app: kubia
      publishNotReadyAddresses: true
    ```

## 서비스 문제 해결

서비스로 파드에 액세스 할 수 없는 경우, 다음 내용들을 확인한 후 다시 시작해본다.

- 외부가 아닌 클러스터 내에서 서비스의 클러스터 IP에 연결되는지 확인
- 레디니스 프로브를 정의했다면 성공했는지 확인
- 파드가 서비스의 일부인지 확인 : kubectl get endpoints
- FQDN으로 서비스에 액세스하려고 하는데 작동하지 않는 경우, FQDN 대신 클러스터 IP를 사용해서 액세스할 수 있는지 확인
- 대상 포트가 아닌 서비스로 노출된 포트에 연결하고 있는지 확인
- 파드 IP에 직접 연결해 파드가 올바른 포트에 연결되어 있는지 확인
- 파드 IP로 애플리케이션에 액세스할 수 없는 경우, 애플리케이션이 로컬호스트에만 바인딩하고 있는지 확인


<br>

### _Reference_
> [_쿠버네티스 인 액션_](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791161754048&orderClick=LA6)  