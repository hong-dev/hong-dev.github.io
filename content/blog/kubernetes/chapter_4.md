---
title: "[Kubernetes in Action] Chapter 4. 레플리케이션과 그 밖의 컨트롤러: 관리되는 파드 배포"
date: "2020-09-10T23:12:03.284Z"
template: "post"
draft: true
category: "book"
tags:
  - "Kubernetes in Action"
  - "k8s"
description: "Kubernetes, Pod, Replication, Controller"
socialImage: ""
---


> _Kubernetes in Action 번역본 내용 정리_


- 앞에서 파드를 수동으로 생성, 감독, 관리하는 방법을 배웠지만 실환경에서는 배포한 애플리케이션이 자동으로 실행되고 수동적인 개입 없이도 안정적인 상태로 유지되길 원할 것이다.
- 이를 위해 파드를 직접 생성하는 일은 거의 없고, 대신 레플리케이션컨트롤러 또는 디플로이먼트와 같은 유형의 리소스를 생성해 실제 파드를 생성하고 관리한다.

## Liveness Probe

1. **HTTP GET 프로브 :** 지정한 IP 주소, 포트, 경로에 HTTP GET 요청을 수행

    ⇒ 서버가 응답하지 않거나, 오류 응답 코드를 반환하면 실패한 것으로 간주되어 컨테이너 다시 시작 (응답코드 2xx or 3xx는 성공, 4xx or 5xx는 실패)

2. **TCP 소켓 프로브 :** 컨테이너의 지정된 포트에 TCP 연결 시도

    ⇒ 연결에 성공하면 프로브가 성공한 것이고, 그렇지 않으면 컨테이너 다시 시작

3. **Exec 프로브 :** 컨테이너 내의 임의의 명령을 실행하고 명령의 종료 상태 코드 확인 (Readiness 관련)

    ⇒ 상태 코드가 0이면 프로브가 성공한 것. 모든 다른 코드는 실패로 간주

## HTTP GET 라이브니스 프로브가 포함된 Pod 생성

```yaml
# kubia-liveness-probe.yaml

apiVersion: v1
kind: Pod
metadata:
  name: kubia-liveness
spec:
  containers:
  - image: luksa/kubia-unhealthy  #의도적으로 error code를 발생시키는 애플리케이션을 포함한 이미지
    name: kubia
    livenessProbe:
      httpGet:      #HTTP GET을 수행하는 라이브니스 프로브
        path: /     #HTTP 요청 경로
        port: 8080  #프로브가 연결해야 하는 네트워크 포트
```

- 파드의 컨테이너가 다시 시작한 횟수 조회

    `RESTARTS`의 숫자가 컨테이너가 몇 번 다시 시작되었는지를 보여준다.

    ```bash
    $ kubectl get po kubia-liveness
    ```

- 애플리케이션 로그 출력

    아래의 명령어는 컨테이너가 다시 시작되면 현재 컨테이너의 로그를 표시한다.

    ```bash
    $ kubectl logs kubia-liveness
    ```

- 종료된 이전 컨테이너의 로그 출력

    ```bash
    $ kubectl logs kubia-liveness --previous
    ```

- 컨테이너가 다시 시작된 이유 확인

    `Containers` 정보를 보면, Exit Code, Events 등 컨테이너 종료 관련 정보를 볼 수 있다.

    ```bash
    $ kubectl describe po kubia-liveness
    ```

## 종료 코드

- 137 : 외부 시그널에 의해 프로세스가 종료되었음 (128 + 9 (SIGKILL))
- 143 : (128 + 15 (SIGTERM))

## 라이브니스 프로브 속성

- 라이브니스 프로브에 관한 정보 출력

    `Liveness` 정보를 보면, 명시적으로 지정한 옵션 외의 추가 속성도 볼 수 있다.

    ```bash
    $ kubectl describe po kubia-liveness
    ```

    - `delay` : 컨테이너가 시작된 후 프로브 시작 시간 (0s는 컨테이너 시작 후 프로브가 바로 시작된다는 것)
    - `timeout` : 컨테이너가 응답해야 하는 제한 시간 (1s는 컨테이너가 1초 안에 응답해야 하며, 그렇지 않으면 실패한 것으로 카운트)
    - `period` : 프로브를 수행하는 시간 간격 (10s는 컨테이너가 10초마다 프로브를 수행한다는 것)
    - `failure` : 컨테이너가 다시 시작되는 프로브 실패 횟수 (3은 프로브가 3번 연속 실패하면 컨테이너가 다시 시작된다는 것)
    - `success` : 성공 카운트는 당연히 1

### initialDelaySeconds 속성

- 초기 지연을 설정하지 않으면 프로브는 컨테이너가 시작되자마자 프로브를 시작한다.
이 경우 대부분 애플리케이션이 요청 받을 준비가 되어 있지 않기 때문에 프로브가 실패한다.
실패 횟수가 실패 임곗값을 초과하면 요청을 올바르게 응답하기 전에 컨테이너가 다시 시작되므로, 애플리케이션 시작 시간을 고려해 초기 지연을 설정해야 한다.

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: kubia-liveness
    spec:
      containers:
      - image: luksa/kubia-unhealthy
        name: kubia
        livenessProbe:
          httpGet:
            path: /
            port: 8080
          initialDelaySeconds: 15  #첫 번째 프로브 실행까지 15초 대기
    ```

## 효과적인 라이브니스 프로브

- 운영 환경에서 실행 중인 파드는 반드시 라이브니스 프로브를 정의해야 한다. 그렇지 않으면 쿠버네티스가 애플리케이션이 살아 있는지를 알 수 있는 방법이 없다.
- 특정 URL 경로에 요청하도록 프로브를 구성해 애플리케이션 내에서 실행 중인 모든 주요 구성 요소가 살아 있는지 확인하도록 할 수 있다.

    단, HTTP 엔드포인트에 인증이 필요하지 않은지 확인해야 한다. 그렇지 않으면 프로브가 항상 실패해 컨테이너가 무한정으로 재시작된다.

- 라이브니스 프로브는 애플리케이션의 내부만 체크하고, 외부 요인의 영향을 받지 않도록 해야 한다.

    (예를 들어, 프론트엔드 웹서버의 라이브니스 프로브는 웹서버가 백엔드 데이터베이스에 연결할 수 없을 때 실패를 반환하면 안 된다.
    원인이 데이터베이스 자체에 있으면, 웹서버 컨테이너를 재시작한다고 해도 문제가 해결되지 않는다.)

- 너무 많은 연산 리소스를 사용해서는 안 된다. 기본적으로 프로브는 비교적 자주 실행되며 1초 내에 완료되어야 한다.
너무 많은 일을 하는 프로브는 컨테이너의 속도를 상당히 느려지게 만든다.

    프로브의 CPU 사용 시간은 컨테이너의 CPU 시간 할당량으로 계산되므로, 프로브가 무거우면 메인 애플리케이션 프로세스에 사용할 수 있는 CPU 시간이 줄어든다.

- Exec, TCP 프로브?

- 실패 임계값을 1로 설정하더라도, 쿠버네티스는 실패를 한 번 했다고 간주하기 전에 프로브를 여러 번 재시도 한다.
따라서 프로브에 자체적인 재시도 루프를 구현하는 것은 헛수고다.

## 레플리케이션 컨트롤러

- 컨테이너를 재시작 하는 작업은 파드를 호스팅하는 노드의 Kubelet가 수행한다. (마스터에서 실행 중인 쿠버네티스 컨트롤 플레인 구성 요소는 이 프로세스에 관여하지 않는다.)
그러나, 노드 자체에 크래시가 발생한 경우 노드 크래시로 중단된 모든 파드의 대체 파드를 생성해야 하는 것은 컨트롤 플레인의 몫이다.

    단, 직접 생성한 파드는 Kubelet에서만 관리되는데, Kubelet은 노드에서 실행되기 때문에 노드 자체가 고장나면 아무것도 할 수 없다.
    ⇒ 애플리케이션이 다른 노드에서 다시 시작되도록 하려면 레플리케이션컨트롤러 또는 이와 유사한 메커니즘으로 파드를 관리해야 한다.

- 쿠버네티스 리소스로서 파드가 항상 실행되도록 보장한다.
사라진 파드를 감지해 교체 파드를 생성한다.
- 파드의 여러 복제본(레플리카)을 작성하고 관리하기 위한 것이다.
특정 type의 실제 파드 수가 의도하는 수와 일치하는 지 지속적으로 모니터링하고, 새 복제본을 만들거나 초과 복제본을 제거한다.
- 레플리케이션컨트롤러의 역할은 정확한 수의 파드가 항상 레이블 셀렉터와 일치하는지 확인하는 것

### 레플리케이션컨트롤러의 세 가지 요소

- `Label Selector` : 레플리케이션컨트롤러의 범위에 있는 파드를 결정
- `Replica Count` : 실행할 파드의 의도하는(desired) 수를 지정
- `Pod Template` : 새로운 파드 레플리카를 만들 때 사용

- 레플리카 수, 레이블 셀렉터, 파드 템플릿은 언제든지 수정할 수 있지만, 레플리카 수의 변경만 기존 파드에 영향을 미친다.

## 레플리케이션컨트롤러 생성

```yaml
# kubia-rc.yaml

apiVersion: v1
kind: ReplicationController
metadata:
  name: kubia
spec:
  replicas: 3
  selector:     #파드 셀렉터로 레플리케이션컨트롤러가 관리하는 파드
    app: kubia
  template:     #새 파드에 사용할 템플릿
    metadata:
      labels:
        app: kubia  #selector와 완전히 일치해야 한다
    spec:
      containers:
      - name: kubia
        image: luksa/kubia
        ports:
        - containerPort: 8080
```

⇒ 레이블 셀렉터 app=kubia와 일치하는 파드 인스턴스가 3개를 유지하도록 하는 kubia라는 이름의 새로운 레플리케이션컨트롤러 생성

- 템플릿의 파드 레이블은 레플리케이션컨트롤러의 레이블 셀렉터와 완전히 일치해야 한다.
그렇지 않으면 컨트롤러에서 새 파드를 무한정 생성할 수 있다.
- yaml 파일에서 셀렉터를 지정하지 않으면, 템플릿의 레이블로 자동 설정된다. 이렇게 하면 yaml을 좀 더 간결하게 유지할 수 있다.

- yaml 파일로 **레플리케이션컨트롤러 생성**

    ```bash
    $ kubectl create -f kubia-rc.yaml
    ```

- **레플리케이션컨트롤러 정보 출력**

    ```bash
    $ kubectl get rc

    >>>
    NAME    DESIRED   CURRENT   READY   AGE
    kubia   3         3         3       3m7s
    ```

- 레플리케이션 컨트롤러는 생성되자마자 작동해서, pod가 3개가 생긴 것을 확인할 수 있다.

    ```bash
    $ kubectl get pods
    ```

- 파드를 하나 수동으로 삭제해도, 레플리케이션컨트롤러는 새로운 파드를 즉시 기동해 파드 수를 다시 3개로 되돌린다.

    ```bash
    $ kubectl delete pod <pod_name>
    ```

- **레플리케이션컨트롤러의 추가 정보 출력**

    ```bash
    $ kubectl describe rc kubia
    ```

    - Events: 컨테이너 종료 / pod 종료

## 노드 장애 대응

- 쿠버네티스를 사용하지 않는 환경에서 노드에 장애가 발생하면, 운영 팀은 해당 노드에서 실행 중인 애플리케이션을 수동으로 다른 시스템에 마이그레이션해야 할 것이다.

    쿠버네티스는 이를 자동으로 수행한다. rc는 노드의 파드가 다운되었음을 감지하자마자 파드를 대체하기 위해 새 파드를 기동한다.

     (Minikube는 마스터와 워커 노드 역할을 하는 노드가 하나만 있으므로 이 예제는 수행할 수 없다.)

- 구글 쿠버네티스 엔진 접속

    ```bash
    $ gcloud compute ssh <gke-..>
    ```

- ssh 접속 후 네트워크 인터페이스 종료

    ```bash
    $ sudo ifconfig eth0 down
    ```

- 노드 상태 확인

    노드가 다운되었다면 `STATUS`가 NotReady로 표시된다.

    ```bash
    $ kubectl get node
    ```

- 노드가 몇 분 동안 접속할 수 없는 상태로 유지될 경우, 해당 노드에 스케줄된 파드는 `STATUS`가 Unknown으로 변경된다.
그리고 rc는 즉시 새 파드를 기동할 것이다.

- 노드 되돌리기

    ```bash
    $ gcloud compute instances reset <gke-..>
    ```

- 노드가 다시 부팅되면 노드의 status는 Ready 상태로 돌아오고, Unknown 상태였던 파드는 삭제된다.

## RC의 범위 안팎으로 파드 이동

- 파드는 `metadata.ownerReferences` 필드에서 해당 파드가 속한 rc를 쉽게 찾을 수 있다.
- 파드는 rc에 묶여있지 않다. rc는 레이블 셀렉터와 일치하는 파드만을 관리하므로, 파드의 레이블을 변경하면 rc의 범위에서 제거되거나 추가될 수 있다.

- **파드에 레이블을 추가**하더라도 rc는 상관하지 않는다.
파드가 레이블 셀렉터에서 참조하는 모든 레이블을 가지고 있는지만 고려한다.

    ```bash
    $ kubectl label pod <pod_name> type=special
    ```

    ⇒ 레이블을 추가하더라도 rc와 관련해서 어떤 변경도 발생하지 않았기 때문에, 이전과 동일하게 파드는 3개가 표시된다.

- 관리되는 **파드의 레이블 변경**

    ```bash
    $ kubectl label pod <pod_name> app=foo --overwrite
    ```

    - `--overwrite`를 입력하지 않으면 kubectl은 경고만 표시하고 레이블을 변경하지 않는다.
    이는 새로운 레이블을 추가하려고 할 때 실수로 기존 레이블 값을 변경하지 않도록 하기 위함이다.

    ⇒ 레이블 변경으로 rc가 관리하지 않는 파드가 되었고, rc는 범위에서 제거된 파드를 대체해 새롭게 파드를 생성한다. (파드 하나 추가)

- 특정 파드에 어떤 작업을 할 때, rc의 범위에서 제거하면 작업이 훨씬 쉬워진다.

    예를 들어, 파드가 오작동한다는 것을 안다면 파드를 rc 범위 밖으로 빼내 컨트롤러가 새 파드로 교체하도록 한 다음, 원하는 방식으로 파드를 디버그하거나 문제를 재연해 볼 수 있다. 완료되면 파드를 삭제한다.

- rc의 레이블 셀렉터를 변경한다면, 모든 파드가 rc의 범위를 벗어나기 때문에 전부 새로운 파드를 생성할 것이다.

## 파드 템플릿 변경

- 레플리케이션컨트롤러의 파드 템플릿은 언제든지 수정할 수 있다.
- 파드 템플릿을 변경하면 변경 이후에 생성된 파드만 영향을 미치며, 기존 파드는 영향을 받지 않는다.

- rc 편집

    ```bash
    $ kubectl edit rc kubia
    ```

    ⇒ 기본 텍스트 편집기에서 yaml 정의가 열리고, 수정하고 저장한 후 편집기를 종료하면 kubectl이 rc를 업데이트한다.

- kubectl edit 명령어에서 다른 텍스트 편집기를 사용하고 싶다면, 아래와 같이 설정한다. (여기서는 nano)

    ```bash
    # ~/.bashrc 또는 이에 상응하는 설정 파일

    export KUBE_EDITOR = "/usr/bin/nano"
    ```

## 수평 파드 스케일링

- 명령어로 rc scale up

    ```bash
    $ kubectl scale rc kubia --replicas=10
    ```

- rc 정의를 편집해 scale up

    `spec.replicas` 필드를 찾아 값 변경

    ```bash
    $ kubectl edit rc kubia
    ```

- 오래된 것을 우선적으로 남기나?

## 레플리케이션컨트롤러 삭제

- rc를 삭제하면 파드도 삭제된다.
- rc로 생성한 파드는 rc의 필수적인 부분이 아니며 관리만 받기 때문에 rc만 삭제하고 파드는 실행 상태로 둘 수 있다.

    이 작업은 파드에 영향을 주지 않고 수행할 수 있으며, 파드를 관리하는 rc를 교체하는 동안 중단 없이 실행할 수 있다.

    ```bash
    $ kubectl delete rc kubia --cascade=false
    ```

## ReplicaSet (rs)

- 차세대 레플리케이션컨트롤러이며, rc를 완전히 대체할 것이다. 앞으로는 rc 대신 레플리카셋을 만들어야 한다.
이 둘은 거의 동일하기 때문에 대신해서 사용하는 데 아무 문제가 없을 것이다.
- 일반적으로 레플리카셋을 직접 생성하지는 않고, 상위 수준의 디플로이먼트 리소스를 생성할 때 자동으로 생성되게 한다. (9장 참조)

- 레플리케이션컨트롤러보다 풍부한 표현식을 사용하는 파드 셀렉터를 가지고 있다.

    rc는 특정 레이블이 있는 파드만 매칭 가능, rs는 값에 상관없이 레이블의 키만 있으면 매칭 가능

## 레플리카셋 생성

### 1. matchLabels 셀렉터 사용

```yaml
# kubia-replicaset.yaml

apiVersion: apps/v1
kind: ReplicaSet 
metadata:
  name: kubia
spec:
  replicas: 3
  selector:
    matchLabels:   #rc와 유사한 matchLabels 셀렉터 사용(가장 단순한 방법)
      app: kubia
  template:
    metadata:
      labels:
        app: kubia
    spec:
      containers:
      - name: kubia
        image: hongdev22/kubia
```

**API 버전 속성
-** API 그룹/API 버전 (ex. apps/v1)
- core API 그룹에 속하는 어떤 쿠버네티스 리소스들은 apiVersion 필드를 지정할 필요가 없이 버전만 지정하면 된다.
최신 쿠버네티스 버전에서 도입된 다른 리소스는 여러 API 그룹으로 분류된다.

- 레플리카셋 생성

    ```bash
    $ kubectl create -f kubia-replicaset.yaml
    ```

- 레플리카셋 조회

    ```bash
    $ kubectl get rs
    or
    $ kubectl describe rs
    ```

- rc를 삭제하면서 남겨졌던 pod 3개는 rs가 생성되면서 rs가 관리하게 되었고, desired 수가 똑같기 때문에 기존의 pod는 그대로 유지된다.

### 2. matchExpressions 셀렉터 사용

```yaml
# kubia-replicaset-matchexpressions.yaml

apiVersion: apps/v1beta2
kind: ReplicaSet
metadata:
  name: kubia
spec:
  replicas: 3
  selector:
    matchExpressions:
      - key: app       #파드의 키가 'app'인 레이블 선택
        operator: In
        values:        #레이블의 값은 'kubia'
         - kubia
  template:
    metadata:
      labels:
        app: kubia
    spec:
      containers:
      - name: kubia
        image: luksa/kubia
```

- matchExpressions는 matchLabels 셀렉터보다 좀 더 표현적인 레이블 셀렉터다.
- 여러 표현식을 지정하는 경우, 셀렉터가 파드와 매칭되기 위해서는 모든 표현식이 true여야 한다.

    matchLabels, matchExpressions를 모두 지정하면, 모든 레이블이 일치하고 모든 표현식이 true로 평가되어야 한다.

### 사용 가능한 operator

- `In` : 레이블의 값이 지정된 값 중 하나와 일치해야 한다.
- `NotIn` : 레이블의 값이 지정된 값과 일치하지 않아야 한다.
- `Exists` : 파드는 지정된 키를 가진 레이블이 포함되어야 한다. 값은 중요하지 않다. 이 연산자를 사용할 때는 values 필드를 지정하지 않아야 한다.
- `DoesNotExist` : 파드에 지정된 키를 가진 레이블이 포함되어 있지 않아야 한다. values 필드를 지정하지 않아야 한다.

### 레플리카셋 삭제

- rc를 삭제하는 것과 같은 방법으로 rs를 삭제할 수 있다.

    레플리카셋을 삭제하면 모든 파드가 삭제된다.

    ```bash
    $ kubectl delete rs kubia
    ```

---

# DaemonSet (ds)

- 레플리케이션컨트롤러와 레플리카셋은 쿠버네티스 클러스터 내 어딘가에 지정된 수만큼의 파드를 실행하는 데 사용된다.
(클러스터 전체에서 무작위로 파드를 분산시킨다.)
- 데몬셋은 클러스터의 각 노드에서 정확히 하나의 파드 복제본만 실행한다.

    예를 들어, 모든 노드에서 로그 수집기와 리소스 모니터를 실행하려는 경우, 쿠버네티스의 kube-proxy 프로세스가 서비스를 작동시키기 위해 모든 노드에서 실행되어야 하는 경우 등

- 쿠버네티스를 사용하지 않는 환경에서는 일반적으로 노드가 부팅되는 동안에 시스템 초기화 스크립트(init script) 또는 systemd 데몬을 통해 시작된다.

- 데몬셋 오브젝트는 rc 또는 rs와 매우 유사하다.
그러나 데몬셋에 의해 생성되는 파드는 타깃 노드가 이미 지정되어 있고, 쿠버네티스 스케줄러를 건너뛴다.
- 데몬셋은 노드 수만큼 파드를 만들고 각 노드에 배포한다.
- desired 복제본 수라는 개념이 없다.
파드 셀렉터와 일치하는  파드 하나가 각 노드에서 실행 중인지 확인하는 것이 데몬셋의 역할이다.
- 노드가 다운되면 데몬셋은 다른 곳에서 파드를 생성하지 않는다.
그러나 새 노드가 클러스터에 추가되면 데몬셋은 즉시 새 파드 인스턴스를 새 노드에 배포한다.

## 데몬셋으로 특정 노드에서만 파드 실행

- 특별히 지정하지 않으면 데몬셋은 클러스터의 모든 노드에 파드를 배포
- 특정 노드에서만 파드를 실행하려면 데몬셋 정의의 일부인 파드 템플릿에서 `nodeSelector` 속성을 지정하면 된다.
(rs 또는 rc의 파드 템플릿과 유사)
- 데몬셋이 관리하는 파드는 스케줄러와는 무관하기 때문에, 데몬셋은 스케줄링되지 않는 노드에도 파드를 배포한다.
일반적으로 스케줄링되지 않는 노드에서도 시스템 서비스를 실행할 수 있어야 하기 때문에 데몬셋을 사용하는 것이 바람직하다.

- **데몬셋 yaml 정의**

    ```yaml
    # ssd-monitor-daemonset.yaml

    apiVersion: apps/v1
    kind: DaemonSet
    metadata:
      name: ssd-monitor
    spec:
      selector:
        matchLabels:
          app: ssd-monitor
      template:
        metadata:
          labels:
            app: ssd-monitor
        spec:
          nodeSelector:
            disk: ssd
          containers:
          - name: main
            image: luksa/ssd-monitor
    ```

    ⇒ 파드 템플릿은 disk=ssd 레이블이 있는 노드를 선택하는 노드 셀렉터를 갖는다.
    (파드의 인스턴스는 disk=ssd 레이블이 있는 각 노드에 생성될 것이다.)

- **데몬셋 생성**

    ```bash
    $ kubectl create -f ssd-monitor-daemonset.yaml
    ```

- **데몬셋 조회**

    ```bash
    $ kubectl get ds
    ```

- 노드에 레이블 추가

    disk=ssd 레이블이 있는 노드가 있어야 파드가 배포된다.

    ```bash
    $ kubectl label node minikube disk=ssd
    ```

- 노드에서 레이블 제거

    ```bash
    $ kubectl label node minikube disk=hdd --overwrite
    ```

- **데몬셋 제거**

    데몬셋을 삭제하면 데몬셋에 의해 관리되는 데몬 파드도 삭제된다.

    ```bash
    $ kubectl delete ds ssd-monitor
    ```

---

# 잡 리소스

- 레플리케이션컨트롤러, 레플리카셋, 데몬셋은 지속적인 태스크를 실행한다. 이런 파드의 프로세스가 종료되면 다시 시작된다.
- 완료 가능한 태스크(completable task)를 위한 기능을 잡 리소스가 지원하며, Job은 파드의 컨테이너 내부에서 실행 중인 프로세스가 성공적으로 완료되면 컨테이너를 다시 시작하지 않는 파드를 실행할 수 있다.
이때 파드는 완료된 것으로 간주된다.

- 노드에 장애가 발생한 경우(Job이 관리하는 파드가 성공적으로 끝나지 않았을 때), Job은 rs 파드와 같은 방식으로 해당 파드를 다른 노드로 다시 스케줄링한다.
- 프로세스 자체에 장애가 발생한 경우(프로세스가 에러 종료 코드를 리턴할 때), Job에서 컨테이너를 다시 시작할 것인지 설정할 수 있다.

## Job 리소스 생성

```yaml
# batch-job.yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: batch-job
spec:
  template:
    metadata:
      labels:
        app: batch-job
    spec:
      restartPolicy: OnFailure
      containers:
      - name: main
        image: luksa/batch-job
```

- spec에서 파드 셀렉터를 지정하지 않으면, 파드 템플릿의 레이블을 기반으로 만들어진다.
- 파드 specification의 `restartPolicy` : 컨테이너에서 실행중인 프로세스가 종료될 때 쿠버네티스가 수행할 작업을 지정할 수 있다.

    기본값은 `Always` 지만, 잡 파드는 무한정 실행하지 않으므로 `OnFailure`나 `Never`를 명시적으로 설정해야 한다.

- rc나 rs에서 restartPolicy를 OnFailure로 하면 에러 발생
`The ReplicationController "kubia" is invalid: ...Unsupported value: "OnFailure": supported values: "Always"`

- OnFailure와 Never의 차이?

- Job 생성

    잡을 생성하면 즉시 파드가 시작된다.

    ```bash
    $ kubectl create -f batch-job.yaml
    ```

- Job 조회

    파드가 완료되면 Job의 `COMPLETIONS` 에도 count 된다.

    ```bash
    $ kubectl get jobs
    ```

- `kubectl get po -a` `kubectl get po --show-all` : unknown flag? completed도 다 보여주는데?

- 파드가 완료될 때 파드가 삭제되지 않고, `STATUS`만 Completed로 남는 이유는, 해당 파드의 로그를 검사할 수 있게 하기 위해서다.

    Job이 언제 시작했고 프로세스가 언제 끝났는지 확인 가능하다.

    ```bash
    $ kubectl logs <completed_pod_name>
    ```

- 파드를 삭제하거나 해당 파드를 생성한 Job을 삭제하면 파드가 삭제된다.

    ```bash
    $ kubectl delete job batch-job
    ```

## Job에서 여러 파드 인스턴스 실행

### 1. 순차적으로 잡 파드 실행

- 두 번 이상 실행해야 하는 경우, 잡의 파드를 몇 번 실행할지를 `completions`에 설정한다.

    Job은 completions에 설정된 숫자만큼의 파드를 순차적으로 실행한다.

    ```yaml
    # multi-completion-batch-job.yaml

    apiVersion: batch/v1
    kind: Job
    metadata:
      name: multi-completion-batch-job
    spec:
      completions: 5
      template:
        metadata:
          labels:
            app: batch-job
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: luksa/batch-job
    ```

    ⇒ 이 Job은 차례로 5개의 파드를 실행한다. 처음에는 파드 하나를 만들고, 파드의 컨테이너가 완료되면 두 번째 파드를 만들어 다섯 개의 파드가 성공적으로 완료될 때까지 위의 과정을 계속한다.

    파드 중 하나가 실패하면 잡이 새 파드를 생성하므로, 전체적으로는 잡이 다섯 개 이상의 파드를 생성할 수도 있다.

### 2. 병렬로 잡 파드 실행

- 잡 파드를 하나씩 차례로 실행하지 않고 여러 파드를 병렬로 실행할 수도 있다.

    잡 스펙의 `parallelism` 속성을 이용해 병렬로 실행할 파드 수를 지정한다.

    ```yaml
    # multi-completion-parallel-batch-job.yaml

    apiVersion: batch/v1
    kind: Job
    metadata:
      name: multi-completion-batch-job
    spec:
      completions: 5
      parallelism: 2
      template:
        metadata:
          labels:
            app: batch-job
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: luksa/batch-job
    ```

    ⇒ 이 Job은 5개의 파드를 성공적으로 완료해야 하며(completions), 2개까지 병렬로 실행할 수 있다(parallelism).

- **잡 스케일링**

    Job이 실행되는 동안 job의 parallelism 속성을 변경할 수 있다. 변경하면 즉시 반영된다.

    이것은 레플리카셋이나 레플리케이션컨트롤러를 스케일링하는 것과 유사하다.

    ```bash
    # 이 방법은 더이상 지원하지 않는 것 같다..
    $ kubectl scale job multi-completion-batch-job --replicas 3
    ```

    ```bash
    # 에디터를 열어서 parallelism을 직접 수정 가능
    $ kubectl edit job multi-completion-batch-job
    ```

### Job 파드가 완료되는데 걸리는 시간 제한

- 파드가 특정 상태에 빠져서 도무지 완료할 수 없거나 충분히 빠르게 완료할 수 없는 경우, 파드 스펙의 `activeDeadlineSeconds` 속성을 설정해 파드의 실행 시간을 제한할 수 있다.

    파드가 이보다 오래 실행되면 시스템이 종료를 시도하고 잡을 실패한 것으로 표시한다.

    ```yaml
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: time-limited-batch-job
    spec:
      activeDeadlineSeconds: 30
      template:
        metadata:
          labels:
            app: batch-job
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: luksa/batch-job
    ```

    - Job의 매니페스트에서 `spec.backoffLimit` 필드를 지정해, 실패한 것으로 표시되기 전에 job을 재시도할 수 있는 횟수를 설정할 수 있다. 명시적으로 지정하지 않으면 기본값은 6이다.

# CronJob

- **Cron 작업 :** 많은 배치 잡이 미래의 특정 시간 또는 지정된 간격으로 반복 실행하는 작업
- 크론잡은 잡을 주기적으로 또는 한 번 실행되도록 스케줄링한다.

    설정된 시간에 잡 리소스를 크론잡 오브젝트에 설정한 잡 템플릿에 따라 생성한다.

## 크론잡 생성

```yaml
# cronjob.yaml

apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: batch-job-every-fifteen-minutes
spec:
  schedule: "0,15,30,45 * * * *"
  jobTemplate:
    spec:
      template:
        metadata:
          labels:
            app: periodic-batch-job
        spec:
          restartPolicy: OnFailure
          containers:
          - name: main
            image: luksa/batch-job
```

- 크론잡 조회

    ```bash
    $ kubectl get cronjob
    ```

- 크론잡 삭제

    크론잡이 삭제되면, 크론잡에 의해 관리되던 Job과 Pod도 삭제된다.

    ```bash
    $ kubectl delete cronjob batch-job-every-fifteen-minutes
    ```

### schedule

- **"분, 시, 일, 월, 요일"**
- `"0,15,30,45 * * * *"` :  매시간, 매일, 매월, 모든 요일의 0, 15, 30, 45분에 실행
- `"0,30 * 1 * *"` : 매달 1일에 30분마다 실행
- `"0 3 * * 0"` : 일요일 3AM마다 실행

### jobTemplate

- 크론잡은 크론잡 스펙에 설정한 jobTemplate 특성에 따라 잡 리소스를 생성한다.
- 크론잡을 실행하면, schedule 되어 있는 시간마다 Job이 새로 생성된다. 그리고 그에 따른 파드도 생성된다.

### 스케줄된 Job의 실행 시간

- Job이나 Pod가 상대적으로 늦게 생성되고 실행될 수 있다. 그러나 예정된 시간을 너무 초과해서 시작하면 안 되는 경우에, `startingDeadlineSeconds` 필드를 지정해 데드라인을 설정할 수 있다.

    ```yaml
    apiVersion: batch/v1beta1
    kind: CronJob
    metadata:
      name: batch-job-every-fifteen-minutes
    spec:
      schedule: "0,15,30,45 * * * *"
      startingDeadlineSeconds: 15
      jobTemplate:
        spec:
          template:
            metadata:
              labels:
                app: periodic-batch-job
            spec:
              restartPolicy: OnFailure
              containers:
              - name: main
                image: luksa/batch-job
    ```

    - 정각에 실행되어야 하는데, 어떤 이유에서든 정각 15초까지 시작하지 않으면 Job이 실행되지 않고 실패로 표시된다.



<br>

### _Reference_
> [_쿠버네티스 인 액션_](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791161754048&orderClick=LA6)  