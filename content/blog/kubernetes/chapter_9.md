---
title: "[Kubernetes in Action] Chapter 9. 디플로이먼트: 선언적 애플리케이션 업데이트"
date: "2020-09-23T23:12:03.284Z"
template: "post"
draft: true
category: "book"
tags:
  - "Kubernetes in Action"
  - "k8s"
description: "Kubernetes Deployment"
socialImage: ""
---


> _Kubernetes in Action 번역본 내용 정리_

## 파드에서 실행 중인 애플리케이션 업데이트

- 파드를 만든 후에는 기존 파드의 이미지를 변경할 수 없으므로 기존 파드를 제거하고 새 이미지를 실행하는 새 파드로 교체해야 한다.

### **기존 파드를 모두 삭제한 다음 새 파드 시작**

- 버전 v1 파드 세트를 관리하는 rc가 있는 경우, 이미지 버전 v2를 참조하도록 파드 템플릿을 수정한 다음, 이전 파드 인스턴스를 삭제해 자동으로 교체되게 한다.
- 짧은 시간 동안 애플리케이션을 사용할 수 없다.

### **새로운 파드를 시작하고, 기동하면 기존 파드 삭제**

- 애플리케이션이 동시에 두 가지 버전을 실행해야 한다.
- 애플리케이션이 데이터 저장소에 데이터를 저장하는 경우, 새 버전이 이전 버전을 손상시킬 수 있는 데이터 스키마나 데이터의 수정을 해서는 안 된다.
- 잠시동안 동시에 두 배의 파드가 실행되므로 더 많은 하드웨어 리소스가 필요

- **Blue-green deployment**

    새 버전을 실행하는 파드와 rc를 생성하는 동안 서비스를 파드 이전 버전에 계속 연결시키다가, 새 파드가 모두 실행되면 서비스의 레이블 셀렉터를 변경하고 새 파드로 전환한다.

    새 버전이 올바르게 작동하면 이전의 rc를 삭제해 이전 파드를 삭제한다.

    `kubectl set selector` : 서비스의 파드 셀렉터 변경

- **롤링 업데이트**

    파드를 단계별로 교체. 이전 rc를 천천히 스케일 다운하고, 새 파드를 스케일 업.

    이 경우 서비스의 파드 셀렉터에 이전 파드와 새 파드를 모두 포함하게 해 요청을 두 파드 세트로 보낼 수 있다.

## 레플리케이션컨트롤러로 자동 롤링 업데이트

- **v1 이미지 생성**

    ```jsx
    # v1/app.js

    const http = require('http');
    const os = require('os');

    console.log("Kubia server starting...");

    var handler = function(request, response) {
      console.log("Received request from " + request.connection.remoteAddress);
      response.writeHead(200);
      response.end("This is v1 running in pod " + os.hostname() + "\n");
    };

    var www = http.createServer(handler);
    www.listen(8080);
    ```

- **v1의 rc와 service 생성**

    ```yaml
    # kubia-rc-and-service-v1.yaml

    apiVersion: v1
    kind: ReplicationController
    metadata:
      name: kubia-v1
    spec:
      replicas: 3
      template:
        metadata:
          name: kubia
          labels:
            app: kubia
        spec:
          containers:
          - image: luksa/kubia:v1
            name: nodejs
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: kubia
    spec:
      type: LoadBalancer
      selector:
        app: kubia
      ports:
      - port: 80
        targetPort: 8080
    ```

- 생성한 service의 EXTERNAL-IP를 찾아 접근해서 실행

    ```bash
    $ kubectl get svc kubia

    $ while true; do curl <external-ip>; done
    >>>
    This is v1 running in pod kubia-vi-qr192
    This is v1 running in pod kubia-vi-kbtsk
    ....
    ```

- **v2 이미지 생성시 참조사항**

    애플리케이션을 수정하고 동일한 이미지 태그로 변경 사항을 푸시하지 말자.

    워커 노드에서 일단 이미지를 한 번 가져오면 이미지는 노드에 저장되고 동일한 이미지를 사용해 새 파드를 실행할 때 이미지를 다시 가져오지 않는다.

    latest 이외의 태그를 사용할 때 태그를 변경하지 않고 이미지를 변경하는 경우, imagePullPolicy를 올바르게 설정해야 한다.

- **롤링 업데이트 실행**

    명령어를 실행하면 kubia-v2라는 새 rc가 즉시 만들어진다.

    그러나 이 명령어는 1.11버전에서 deprecated 되었다고 한다.

    ```bash
    $ kubectl rolling-update kubia-v1 kubia-v2 --image=luksa/kubia:v2

    # --v 옵션을 사용하면 verbose logging을 출력할 수 있다.
    $ kubectl rolling-update kubia-v1 kubia-v2 --image=luksa/kubia:v2 --v 6
    ```

    kubectl 명령을 실행할 때 `--v` 옵션을 사용하면 kubectl이 API 서버로 보내는 요청도 볼 수 있다.

- **새로 만들어진 rc의 상세 정보 출력**

    초기 desired 레플리카 수가 0으로 설정되어 있다.

    ```bash
    $ kubectl describe rc kubia-v2
    ```

- **롤링 업데이트를 하면 kubectl이 수행하는 단계**
    1. kubia-v2 rc 생성
    2. kubia-v2 rc의 파드 셀렉터를 app=kubia 뿐만 아니라 deployment=random_num 레이블도 넣는다.
    3. kubia-v1 rc와 기존 파드들의 레이블에 deployment=random_num2 레이블을 추가한다.
    4. 새 컨트롤러를 스케일 업해 파드를 하나씩 교체하기 시작한다.
    5. 이전 레플리케이션컨트롤러를 하나씩 스케일 다운한다.
    6. 완전히 교체되면, 이전 rc를 삭제한다.

    ⇒ 다운타임 없이 롤링 업데이트 수행 완료

    ⇒ 공통된 app=kubia 레이블 이외의 구별되는 레이블을 만드는 이유는, 공통된 레이블만 있으면 각각의 rc들이 같은 파드 세트를 공유하게 되고 desired 파드 개수 또한 동일한 파드 세트에서 카운트하기 때문에 의미가 없어진다.

- kubectl rolling-update를 더 이상 허용하지 않는 이유 :
    1. 쿠버네티스가 파드의 레이블과 레플리케이션컨트롤러의 레이블 셀렉터를 임의로 수정해버린다.
    2. 롤링 업데이트의 모든 단계를 수행하는 것이 마스터가 아니라 kubectl 클라이언트이다.

        서버가 아닌 클라이언트가 업데이트 프로세스를 수행한다면, kubectl이 업데이트를 수행하는 동안 네트워크 연결이 끊어졌을 때 업데이트 프로세스는 중간에 중단될 것이다.

    3. 이 방법은 직접적인 실제 명령을 나타낸다.

## Deployment

- lower-level인 rc 또는 rs를 통해 수행하는 대신 애플리케이션을 배포하고 선언적(declarative)으로 업데이트하기 위한 high-level의 리소스
- 디플로이먼트를 생성하면 레플리카셋 리소스가 그 아래에 생성 (결과적으로 더 많은 리소스가 생성)

    디플로이먼트 ⇒ 레플리카셋 ⇒ 파드

- 롤링 업데이트 예제에서 알 수 있듯이, 애플리케이션을 업데이트할 때는 추가 rc를 도입하고 두 컨트롤러가 잘 조화되도록 조정해야 한다. 전체적으로 통제하는 역할을 디플로이먼트 리소스가 한다.

### 디플로이먼트 생성

- 레이블 셀렉터, 원하는 레플리카 수, 파드 템플릿으로 구성

    레플리케이션컨트롤러는 특정 버전의 파드를 관리했지만, 디플로이먼트는 그보다 상위 버전이므로, 특정 시점에 디플로이먼트는 여러 개의 파드 버전을 실행할 수 있다.

    ```yaml
    # kubia-deployment-v1.yaml

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: kubia  #디플로이먼트 이름에 버전은 필요없다.
    spec:
      replicas: 3
      template:
        metadata:
          name: kubia
          labels:
            app: kubia
        spec:
          containers:
          - image: luksa/kubia:v1
            name: nodejs
      selector:
        matchLabels:
          app: kubia
    ```

- **디플로이먼트 생성**

    파드 레플리카 3개가 생성된다.

    ```bash
    $ kubectl create -f kubia-deployment-v1.yaml --record
    ```

    create를 사용할 때는 반드시 `--record` 명령줄 옵션을 포함시켜야 한다. 이 명령은 revision history에 명령어를 기록해 나중에 유용하게 사용할 수 있다.

- **디플로이먼트 정보 출력**

    ```bash
    $ kubectl get deployment

    $ kubectl describe deployment

    $ kubectl rollout status deployment kubia
    ```

- **디플로이먼트 vs 레플리카셋**

    디플로이먼트에서 생성한 파드의 이름에는 중간에 다른 값이 추가로 포함된다.
    (<디플로이먼트 이름>-<레플리카셋 해시값(파드 템플릿의 해시값)>-<파드 해시값>)

    ```bash
    # 레플리카셋으로 생성한 파드 이름
    ex) kubia-m33mv

    # 디플로이먼트로 생성한 파드 이름
    ex) kubia-1506449474-vmn7s
    ```

- 디플로이먼트는 파드를 직접 관리하지 않고, 대신 레플리카셋을 생성하고 이들이 파드를 관리하도록 맡겨둔다.
- 디플로이먼트는 파드 템플릿의 각 버전마다 하나씩 여러 개의 레플리카셋을 만든다.

    파드 템플릿의 해시값을 사용하면, 디플로이먼트에서 지정된 버전의 파드 템플릿에 관해 항상 동일한(기존의) 레플리카셋을 사용할 수 있다.

### 디플로이먼트 업데이트

- 디플로이먼트 리소스에 정의된 파드 템플릿을 수정하기만 하면, 쿠버네티스가 실제 시스템 상태를 리소스에 정의된 상태로 만드는 데 필요한 모든 단계를 수행한다.
- **Recreate 전략 :** 새 파드를 만들기 전에 이전 파드를 모두 삭제하고 새로운 파드를 만든다.
- **RollingUpdate 전략 :** 이전 파드를 하나씩 제거하고 동시에 새 파드를 추가제 전체 프로세스에서 애플리케이션을 계속 사용할 수 있도록 하고 서비스 다운 타임이 없도록 한다.
단, 애플리케이션에서 이전 버전과 새 버전을 동시에 실행할 수 있는 경우네만 이 전략을 사용해야 한다.

    여기서는 롤링 업데이트 전략을 예제로 사용한다.

- 데모 목적으로 롤링 업데이트 속도 느리게 하기

    ```bash
    $ kubectl patch deployment kubia -p '{"spec": {"minReadySeconds": 10}}'
    ```

    **kubectl patch**
    텍스트 편집기에서 정의를 편집하지 않고도 리소스 속성 한 두 개 정도를 수정하는 데 유용하다.

- **롤링 업데이트 진행사항 추적을 위한 curl 요청**

    처음에는 v1 파드만 요청을 받으며, 모든 v1 파드가 삭제된 후 v2 파드만 요청을 받을 때까지 점점 더 많은 요청이 v2 파드로 보내지는 것을 확인할 수 있다.

    ```bash
    $ while true; do curl <서비스의 외부 IP>; done
    ```

- **디플로이먼트의 파드 컨테이너에 사용된 이미지 변경**

    애플리케이션이 최신 버전으로 업데이트된다.

    ```bash
    $ kubectl set image deployment kubia nodejs=luksa/kubia:v2
    ```

- 레플리카셋을 조회하면 기존 rs와 새 rs를 확인할 수 있다.

    ```bash
    $ kubectl get rs

    >>>
    NAME               DESIRED   CURRENT   READY   AGE
    kubia-74967b5695   0         0         0       47m
    kubia-bcf9bb974    3         3         3       15m
    ```

### 디플로이먼트 롤백

- 처음 요청 4개만 제대로 처리하도록 하는 버그가 포함된 v3 만들기

    ```jsx
    const http = require('http');
    const os = require('os');

    var requestCount = 0;

    console.log("Kubia server starting...");

    var handler = function(request, response) {
      console.log("Received request from " + request.connection.remoteAddress);
      if (++requestCount >= 5) {
        response.writeHead(500);
        response.end("Some internal error has occurred! This is pod " + os.hostname() + "\n");
        return;
      }
      response.writeHead(200);
      response.end("This is v3 running in pod " + os.hostname() + "\n");
    };

    var www = http.createServer(handler);
    www.listen(8080);
    ```

- 디플로이먼트 스펙에서 이미지를 변경해 새 버전을 배포

    ```bash
    $ kubectl set image deployment kubia nodejs=luksa/kubia:v3
    ```

- 롤아웃 진행 상황 확인

    ```bash
    $ kubectl rollout status deployment kubia

    >>>
    Waiting for deployment "kubia" rollout to finish: 1 out of 3 new replicas have been updated...
    Waiting for deployment "kubia" rollout to finish: 2 out of 3 new replicas have been updated...
    Waiting for deployment "kubia" rollout to finish: 2 old replicas are pending termination...
    Waiting for deployment "kubia" rollout to finish: 1 old replicas are pending termination...
    deployment "kubia" successfully rolled out
    ```

- 요청 중 오류 발생

    ```bash
    $ while true; do curl <external-ip>; done
    ```

- **수동으로 롤아웃 되돌리기**

    이전에 배포된 버전으로 롤백된다.

    ```bash
    $ kubectl rollout undo deployment kubia
    ```

- 롤아웃 프로세스가 진행 중인 동안에도 롤아웃을 중단하려면 실행 취소 명령을 사용 가능하다.
롤아웃 프로세스 중에 이미 생성된 파드는 제거되고 이전 파드로 다시 교체된다.

- **revision history 조회**

    디플로이먼트는 revision history를 유지하므로 롤아웃의 롤백이 가능하다.

    `--record` 명령줄 옵션이 없으면 이력의 CHANGE-CAUSE 열이 비어 있어서 각 개정 뒤에 무엇이 있는지 알아내는 것이 훨씬 더 어려워질 것이다.

    ```bash
    $ kubectl rollout history deployment kubia
    ```

- **특정 디플로이먼트 개정으로 롤백**

    revision history는 기본 레플리카셋에 저장된다.
    롤아웃이 완료되면 이전 레플리카셋은 삭제되지 않으므로 이전 버전뿐만 아니라 모든 버전으로 롤백할 수 있다.

    ```bash
    $ kubectl rollout undo deployment kubia --to-revision=1
    ```

- 각 레플리카셋은 해당 특정 버전에서 디플로이먼트의 전체 정보를 저장하므로 수동으로 삭제해서는 안 된다.
그렇게 하면 디플로이먼트 기록에서 특정 버전을 잃어 롤백할 수 없게 된다.
- 하지만 과거 rs가 레플리카셋 목록을 복잡하게 만드는 것은 이상적이지 않으므로, 개정 내역의 수를 제한할 수 있다. (디플로이먼트 리소스의 `editionHistoryLimit` 속성)
기본값은 10이다. 그보다 이전의 레플리카셋은 자동으로 삭제된다.

## 롤링 업데이트 전략의 속성

- maxSurge와 maxUnavailable 속성은, 디플로이먼트의 롤링 업데이트 중에 한 번에 몇 개의 파드를 교체할지를 결정한다.

    ```yaml
    spec:
      strategy:
        rollingUpdate:
          maxSurge: 1
          maxUnavailable: 0
        type: RollingUpdate
    ```

### maxSurge

- 디플로이먼트가 desired 레플리카 수보다 얼마나 많은 파드 인스턴스 수를 허용할 수 있는지 결정한다.
- 기본적으로 25%로 설정되고, 의도한 개수보다 최대 25% 더 많은 파드 인스턴스가 있을 수 있다.
ex) desired 레플리카 수가 4로 설정된 경우 업데이트 중에 동시에 5개 이상의 파드 인스턴스가 실행되지 않는다.
- 백분율을 절대 숫자로 변환하면 숫자가 **반올림**된다. 백분율 대신 값이 절댓값일 수도 있다. (하나 또는 두 개의 추가 파드가 허용될 수 있음)

### maxUnavailable

- 업데이트 중에 **desired 레플리카 수를 기준**으로 사용할 수 없는 파드 인스턴스 수를 결정한다.
- 기본적으로 25%로 설정되고 사용 가능한 파드 인스턴스 수는 desired 레플리카 수의 75% 이하로 떨어지지 않아야 한다.

    ex) desired 레플리카 수가 4로 설정된 경우 하나의 파드만 사용할 수 없다. 전체 롤아웃 중에 요청을 처리할 수 있는 파드 인스턴스 3개가 항상 있어야 한다.

- 백분율을 절대 숫자로 변환하면 숫자가 **내림**된다. 백분율 대신 절댓값을 지정할 수도 있다.

## 롤아웃 프로세스 일시 중지

- 기존 버전의 파드 옆에 새로운 버전의 파드 하나를 실행하고, 일부 사용자만 작동하는지 확인

- 새로운 이미지로 변경해 롤아웃을 시작한 즉시 **롤아웃을 일시 중지**

    새 파드를 하나 생성했지만 모든 원본 파드도 계속 실행중이라면, 서비스에 관한 요청의 일부가 새 파드로 전달된다.

    ```bash
    $ kubectl set image deployment kubia nodejs=luksa/kubia:v4

    $ kubectl rollout pause deployment kubia
    ```

- **Canary Release :** 잘못된 버전의 애플리케이션이 롤아웃되어 모든 사용자에게 영향을 주는 위험을 최소화하는 기술
- 새 버전을 모든 사람에게 롤아웃하는 대신 하나 도는 적은 수의 이전 파드만 새 버전으로 바꾼다.

- **롤아웃 재개**

    ```bash
    $ kubectl rollout resume deployment kubia
    ```

## 잘못된 버전의 롤아웃 방지

### minReadySeconds

- 파드를 사용 가능한 것으로 취급하기 전에 새로 만든 파드를 준비할 시간을 지정한다.

    파드가 사용 가능할 때까지 롤아웃 프로세스가 계속되지 않는다.

    모든 파드의 레디니스 프로브가 성공하면 파드가 준비된다.

- 일반적으로 파드는 실제 트래픽을 수신하기 시작한 후 파드가 준비 상태를 계속 보고할 수 있도록 minReadySeconds를 훨씬 높게 설정한다.
- 파드를 프로덕션 환경에 배포하기 전에 테스트 환경과 스테이지 환경에서 모두 파드를 테스트해야 하지만 minReadySeconds를 사용하는 것은 버그가 있는 버전이 프로덕션 환경으로 흘러들더라도 애플리케이션이 큰 혼란을 일으키지 않도록 하는 에어백과 같다.

### 잘못된 버전이 완전히 롤아웃되는 것을 방지하기 위한 레디니스 프로브 정의

- 파드 템플릿의 이미지 업데이트뿐만 아니라 컨테이너에 대한 **레디니스 프로브도 같이 정의**

    ```yaml
    # kubia-deployment-v3-with-readinesscheck.yaml

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: kubia
    spec:
      replicas: 3
      minReadySeconds: 10      #설정
      strategy:
        rollingUpdate:
          maxSurge: 1
          maxUnavailable: 0    #디플로이먼트가 파드를 하나씩 교체하도록 설정
        type: RollingUpdate
      selector:
        matchLabels:
          app: kubia
      template:
        metadata:
          name: kubia
          labels:
            app: kubia
        spec:
          containers:
          - image: luksa/kubia:v3
            name: nodejs
            readinessProbe:
              periodSeconds: 1   #매초마다 실행될 레디니스 프로브 정의
              httpGet:           #컨테이너에 HTTP GET 요청 수행
                path: /
                port: 8080
    ```

- 명시적인 레디니스 프로브가 정의되지 않았을 때는, 애플리케이션이 실제로 준비되지 않았거나 오류를 반환하더라도 컨테이너와 파드는 항상 준비된 것으로 간주되었다.

- kubectl apply로 디플로이먼트를 업데이트할 때 원하는 레플리카 수를 변경하지 않으려면 YAML에 replicas 필드를 포함하면 안 된다.

- **롤아웃 진행사항 조회**

    파드 하나만 생성되고 그 뒤로 멈춰있다.

    ```bash
    $ kubectl rollout status deployment kubia

    >>>
    Waiting for deployment "kubia" rollout to finish: 1 out of 3 new replicas have been updated...
    ```

- **파드 조회**

    새로 생성된 파드가 준비되지 않고 있다.

    ```bash
    $ kubectl get po
    ```

- **롤아웃이 정지된 이유**

    새 파드가 시작되자마자 레디니스 프로브가 매초마다 시작된다. 요청이 에러코드를 반환하면 레디니스 프로브가 실패하기 시작한다.

    결과적으로 파드는 서비스의 엔드포인트에서 제거된다.

    파드가 사용 가능한 것으로 간주되려면 10초 이상 준비되어 있어야 한다. (레디니스 프로브가 10초 뒤에 준비가 되었는지 검증한다.)

- minReadySeconds와 레디니스 프로브가 적절하게 설정되어야 한다.

    레디니스 프로브만 정의하는 경우 레디니스 프로브의 첫 번째 호출이 성공하면 즉시 새 파드가 사용 가능한 것으로 간주되기 때문이다. 레디니스 프로브가 곧 실패하면 모든 파드에서 잘못된 버전이 롤아웃된다.

### 롤아웃 데드라인 설정

- 기본적으로 롤아웃이 10분 동안 진행되지 않으면 실패한 것으로 간주된다.
- **ProgressDeadlineExceeded 조건 표시**
디플로이먼트를 진행하는 데 너무 오래 걸렸다는 표시

    ```bash
    $ kubectl describe deploy kubia

    >>>
    ....
    Conditions:
      Type           Status  Reason
      ----           ------  ------
      Available      True    MinimumReplicasAvailable
      Progressing    False   ProgressDeadlineExceeded
    ```

- 디플로이먼트가 실패한 것으로 간주되는 시간은 디플로이먼트 스펙의 `progressDeadlineSeconds` 속성으로 설정할 수 있다.

### 잘못된 롤아웃 중지

- 롤아웃이 계속 진행되지 않기 때문에 롤아웃을 취소해 중단한다.

    ```bash
    $ kubectl rollout undo deployment kubia
    ```

## 기존의 리소스 수정

- **kubectl edit**
기본 편집기로 오브젝트의 메니페스트를 오픈
ex) kubectl edit deployment kubia
- **kubectl patch**
오브젝트의 개별 속성을 수정
ex) kubectl patch deployment kubia -p '{"spec": {"minReadySeconds": 10}}'
- **kubectl apply**
전체 yaml/json 파일의 속성 값을 적용해 오브젝트를 수정 (지정된 오브젝트가 아직 없으면 생성된다.)
파일에는 리소스의 전체 정의가 포함되어야 한다.
ex) kubectl apply -f kubia-deployment-v2.yaml
- **kubectl replace**
yaml/json 파일로 오브젝트를 새 것으로 교체한다.
apply 명령어와 달리 이 명령은 오브젝트가 있어야 한다. 그렇지 않으면 오류 출력
ex) kubectl replace -f kubia-deployment-v2.yaml
- **kubectl set image**
정의된 컨테이너 이미지를 변경
ex) kubectl set image deployment kubia nodejs=luksa/kubia:v2


<br>

### _Reference_
> [_쿠버네티스 인 액션_](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791161754048&orderClick=LA6)  