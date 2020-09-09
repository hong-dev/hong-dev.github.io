---
title: "[Kubernetes in Action] Chapter 3. 파드: 쿠버네티스에서 컨테이너 실행"
date: "2020-09-09T23:12:03.284Z"
template: "post"
draft: true
category: "book"
tags:
  - "Kubernetes in Action"
  - "k8s"
description: "Kubernetes, Pod"
socialImage: ""
---


> _Kubernetes in Action 번역본 내용 정리_


## 파드

- 일반적으로 파드는 하나의 컨테이너만 포함한다.
- 하나의 파드 안에 있는 모든 컨테이너는 항상 하나의 워커 노드에서 실행되며 여러 워커 노드에 걸쳐 실행되지 않는다.

- 단일 컨테이너보다 다중 컨테이너가 나은 이유:

    컨테이너는 단일 프로세스를 실행하는 것을 목적으로 설계했다. (프로세스가 자식 프로세스를 생성하는 것을 제외하면)

    단일 컨테이너에서 관련 없는 다른 프로세스를 실행하는 경우 모든 프로세스를 실행하고 로그를 관리하는 것은 모두 사용자 책임이다.
    모든 프로세스틑 동일한 표준 출력으로 로그를 기록하기 때문에 어떤 프로세스가 남긴 로그인지 파악하는 것이 매우 어렵다.

- 단일 컨테이너에 단일 프로세스를 묶기 때문에, 컨테이너를 함께 묶고 하나의 단위로 관리할 수 있는 또 다른 상위 구조가 팔요한데, 이게 `파드`다.

⇒ 파드는 밀접하게 연관된 프로세스를 함께 실행하고 단일 컨테이너 안에서 모두 함께 실행되는 것처럼 (거의) 동일한 환경을 제공하면서도 이들을 격리된 상태로 유지할 수 있다.

- 쿠버네티스는 파드 안에 있는 모든 컨테이너가 자체 네임스페이스가 아닌 동일한 리눅스 네임스페이스를 공유하도록 도커를 설정한다.

    그룹 안에 있는 컨테이너가 특정한 리소스를 공유하기 위해 각 컨테이너가 완벽하게 격리되지 않도록 한다.

    ⇒ 모든 컨테이너는 같은 호스트 이름과 네트워크 인터페이스를 공유한다.

- 파드 안의 컨테이너가 동일한 네트워크 네임스페이스에서 실행되기 때문에, 동일한 IP 주소와 포트 공간을 공유한다.
즉, 동일한 파드일 때, 컨테이너에서 실행 중인 프로세스가 같은 포트 번호를 사용하지 않도록 주의해야 한다.

## 파드 안에서 여러 컨테이너를 사용해야 하는가?

- 특정한 이유가 있는 게 아니라면, 기본적으로 분리된 파드에서 컨테이너를 실행하는 것이 좋다.

- **단일 파드 vs 별도 파드**
    1. 컨테이너를 함께 실행해야 하는가 vs 서로 다른 호스트에서 실행할 수 있는가
    2. 여러 컨테이너가 모여 하나의 구성 요소를 나타내는가 (주 컨테이너 + 지원 컨테이너) vs 개별적인 구성 요소인가
    3. 컨테이너가 함께 vs 개별적으로 스케일링 되어야 하는가?

## YAML or JSON 디스크립터

- 쿠버네티스 리소스는 일반적으로 쿠버네티스 REST API 엔드포인트에 JSON 혹은 YAML 매니페스트를 전송해 생성한다.
- YAML 파일에 모든 쿠버네티스 오브젝트를 정의하면 버전 관리 시스템에 넣는 것이 가능해진다.
- 쿠버네티스 API Reference 문서 참고 ([https://kubernetes.io/docs/reference/](https://kubernetes.io/docs/reference/))

- 파드의 yaml 정의 조회

    ```bash
    $ kubectl get po <pod_name> -o yaml
    ```

### 쿠버네티스 API 오브젝트의 일반적인 구조

- **Metadata** : 이름, 네임스페이스, 레이블, 어노테이션 및 파드에 관한 기타 정보를 포함
- **Spec** : 파드 컨테이너 목록, 볼륨, 기타 데이터 등 파드 자체에 관한 실제 명세
- **Status** : 파드 상태, 각 컨테이너 설명과 상태, 파드 내부 IP, 기타 기본 정보 등 현재 실행 중인 파드에 관한 현재 정보를 포함

## 파드를 정의하는 간단한 YAML 작성

```yaml
# kubia-manual.yaml

apiVersion: v1  #쿠버네티스 API 버전
kind: Pod       #오브젝트 종류
metadata:
	name: kubia-manual  #파드 이름
spec:
	containers:
	- image: hub_id/kubia  #컨테이너를 만드는 이미지
		name: kubia          #컨테이너 이름
		ports:               #애플리케이션이 수신하는 포트
		- containerPort: 8080
			protocol: TCP
```

- 매니페스트를 작성할 때, 쿠버네티스 레퍼런스 문서를 참조하거나([https://kubernetes.io/docs/concepts/overview/kubernetes-api/](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)), 명령어로 파드 속성에 관한 설명을 요청할 수 있다.

    ```bash
    $ kubectl explain pods
    ```

    ```bash
    # 각 속성을 자세히 알아보는 것도 가능하다.
    $ kubectl explain pods.spec
    ```

## yaml을 이용한 파드 생성

- yaml 파일을 이용한 파드 생성

    ```bash
    $ kubectl create -f kubia-manual.yaml

    >>>
    pod/kubia-manual created
    ```

- 생성된 파드 전체 정의 출력

    ```bash
    $ kubectl get po kubia-manual -o yaml
    ```

    ```bash
    # json으로도 출력 가능 (yaml을 이용해 파드를 생성했더라도)
    $ kubectl get po kubia-manual -o json
    ```

## 애플리케이션 로그

- 컨테이너화된 애플리케이션은 로그를 파일에 쓰기보다는 표준 출력과 표준 에러에 로그를 남기는 게 일반적이다.
이를 통해 사용자는 다른 애플리케이션 로그를 간단하고 동일한 방식으로 볼 수 있다.

- 컨테이너 런타임(여기서는 도커)은 이러한 스트림을 파일로 전달하고, 다음 명령을 이용해 컨테이너 로그를 가져온다.

    ```bash
    $ docker logs <container_id>
    ```

- ssh로 파드가 실행 중인 노드에 접속해 docker logs 명령으로 로그를 가져올 수도 있지만, 쿠버네티스는 더 쉬운 방법을 제공한다.

    ```bash
    $ kubectl logs kubia-manual
    ```

    - 컨테이너 로그는 하루 단위로, 로그 파일이 10MB 크기에 도달할 때마다 순환된다.
    kubectl logs 명령은 마지막으로 순환된 로그 항목만 보여준다.

- 컨테이너를 여러 개 포함한 파드인 경우에는, 컨테이너 이름을 명시적으로 포함해야 한다.

    ```bash
    $ kubectl logs kubia-manual -c <container_name>
    ```

- 파드가 삭제되면 해당 로그도 같이 삭제된다.

    파드가 삭제된 후에도 파드의 로그를 보기 위해서는 모든 로그를 중앙 저장소에 저장하는 클러스터 전체의 중앙집중식 로깅을 설정해야 한다. (17장 참조)

## Port Forwarding

- 서비스를 거치지 않고 (테스트, 디버깅 등의 이유로) 특정 파드와 대화하고 싶을 때, 포트 포워딩을 사용한다.

- **포트 포워딩 구성**

    ```bash
    $ kubectl port-forward kubia-manual 8888:8080

    >>>
    Forwarding from 127.0.0.1:8888 -> 8080
    Forwarding from [::1]:8888 -> 8080
    ```

    ⇒ 머신의 로컬 포트 8888을 kubia-manual 파드의 8080 포트로 향하게 한다.

- 포트 포워딩이 실행됐다면, 다른 터미널에서 HTTP 요청을 해당 파드에 보낼 수 있다.

    ```bash
    $ curl localhost:8888

    >>>
    You've hit ... kubia-manual
    ```

## Labels

- 어떤 파드가 어떤 것인지 쉽게 알 수 있도록 임의의 기준에 따라 작은 그룹으로 조직하는 방법이 필요하다. (파드를 부분 집합으로 분류할 필요가 있다.)
- 각 파드에 대해 개별적으로 작업을 수행하기보다 특정 그룹에 속한 모든 파드에 관해 한 번에 작업이 가능하게 한다.
- 레이블을 통해 파드와 기타 다른 쿠버네티스 오브젝트의 조직화가 이뤄진다.

- 리소스에 첨부하는 키-값 쌍
이 쌍은 레이블 셀렉터를 사용해 리소스를 선택할 때 활용한다. (리소스는 셀렉터에 지정된 레이블을 포함하는 지 여부에 따라 필터링된다.)
- 레이블 키가 해당 리소스 내에서 고유하다면, 하나 이상 원하는 만큼 레이블을 가질 수 있다.
- 일반적으로 리소스를 생성할 때 레이블을 붙이지만, 나중에 레이블을 추가하거나 기존 레이블 값을 수정할 수도 있다.

## 레이블을 가진 파드 생성

```yaml
# kubia-manual-with-labels.yaml

apiVersion: v1
kind: Pod
metadata:
  name: kubia-manual-v2
  labels:     #레이블 2개
    creation_method: manual
    env: prod
spec:
  containers:
  - image: hongdev22/kubia
    name: kubia
    ports:
    - containerPort: 8080
      protocol: TCP
```

- 위에서 생성한 yaml 파일로 파드 생성

    ```bash
    $ kubectl create -f kubia-manual-with-labels.yaml

    >>>
    pod/kubia-manual-v2 created
    ```

- pods의 **labels 정보 출력**

    ```bash
    $ kubectl get po --show-labels
    ```

- 특정 레이블을 자체 열로 생성하여 표시

    여기에서 레이블 이름끼리는 띄어쓰기를 하지 않는다.

    ```bash
    $ kubectl get po -L creation_method,env
    ```

- 기존 파드에 **레이블 추가**

    ```bash
    $ kubectl label po kubia-manual creation_method=manual
    ```

- 기존 파드의 **레이블 수정**

    ```bash
    $ kubectl label po kubia-manual-v2 env=debug --overwrite
    ```

## Label Selector

- 기본 명령어: `kubectl get po -l`
- 응용하기

    ```bash
    $ kubectl get po -l creation_method=manual
    $ kubectl get po -l creation_method!=manual

    $ kubectl get po -l env
    $ kubectl get po -l '!env'

    $ kubectl get po -l 'env in (prod,debug)'
    $ kubectl get po -l 'env notin (prod,debug)'
    ```

## 워커 노드에 레이블 사용

- 파드뿐만 아니라 노드를 포함한 모든 쿠버네티스 오브젝트에 레이블을 부착할 수 있다.
- 파드에 레이블을 생성하고, 레이블 셀렉터를 사용한 것처럼 같은 명령어를 통해 (pod 대신 node로 변경) 노드도 레이블로 분류할 수 있다.

## 특정 노드에 파드 스케줄링

```yaml
# kubia-gpu.yaml

apiVersion: v1
kind: Pod
metadata:
  name: kubia-gpu
spec:
  nodeSelector:
    gpu: "true"   #gpu=true 레이블을 포함한 노드에 이 파드를 배포하도록 지시
  containers:
  - image: hongdev22/kubia
    name: kubia
```

- 각 노드는 `kubernetes.io/hostname=hostname` 으로 설정되어 있는 고유한 레이블이 있기 때문에, 특정 노드를 선택해서 스케줄링도 가능하다.
하지만, 해당 노드가 오프라인 상태인 경우 파드가 스케줄링되지 않을 수 있다.

    개별 노드로 생각하지 말고, 레이블 셀렉터를 통해 지정한 특정 기준을 만족하는 노드의 논리적인 그룹을 생각해야 한다.

## Annotations

- 파드 및 다른 오브젝트는 레이블 외에 어노테이션을 가질 수 있다.
- 키-값 쌍으로 레이블과 거의 비슷하지만, 식별 정보를 갖지 않는다. 어노테이션으로 오브젝트를 셀렉트 할 수 없다.
- 특정 어노테이션은 쿠버네티스에 의해 자동으로 오브젝트에 추가되지만, 나머지 어노테이션은 사용자에 의해 수동으로 추가된다.

- **어노테이션 조회**

    ```bash
    $ kubectl describe pod kubia-manual
    or
    $ kubectl get po kubia-manual -o yaml
    ```

- **어노테이션 추가 및 수정**

    ```bash
    $ kubectl annotate pod kubia-manual mycompany.com/someannotation="foo bar"
    ```

    - 키 충돌을 방지하기 위해 어노테이션 키로 고유한 접두사를 사용하는 것이 좋다.
    그렇지 않으면 다른 도구나 라이브러리가 오브젝트에 어노테이션을 추가하면서 기존에 있던 어노테이션을 덮어버릴 수 있다.

## 네임스페이스

- 각 오브젝트는 여러 레이블을 가질 수 있기 때문에, 오브젝트 그룹은 서로 겹쳐질 수 있다.
- 오브젝트를 겹치지 않는 그룹으로 분할하여 한 번에 하나의 그룹 안에서만 작업할 수 있도록, 네임스페이스를 사용한다.
- 리소스 이름은 네임스페이스 안에서만 고유하면 된다. 서로 다른 두 네임스페이스는 동일한 이름의 리소스를 가질 수 있다.

- 클러스터에 있는 모든 **네임스페이스 출력**

    ```bash
    $ kubectl get ns
    ```

- kubectl get 명령을 이용해 리소스를 나열할 때, 네임스페이스를 명시적으로 지정하지 않으면 default 네임스페이스에 있는 오브젝트만 출력된다.

- **특정 네임스페이스의 파드 출력** (여기서는 kube-system라는 네임스페이스)

    ```bash
    $ kubectl get po --namespace kube-system
    or
    $ kubectl get po -n kube-system
    ```

- 모든 네임스페이스의 모든 파드 출력

    ```bash
    $ kubectl get po -A
    ```

## 네임스페이스 생성

### 1. yaml 파일로 생성

```yaml
# custom-namespace.yaml

apiVersion: v1
kind: Namespace
metadata:
  name: custom-namespace
```

- 작성한 yaml 파일을 쿠버네티스 API 서버로 전송해서 생성

    ```bash
    $ kubectl create -f custom-namespace.yaml
    ```

### 2. 명령어로 생성

```bash
$ kubectl create namespace custom-namespace
```

## 리소스를 특정 네임스페이스로 지정

### 1. yaml 파일의 metadata 섹션 추가

```yaml
# kubia-manual.yaml

apiVersion: v1
kind: Pod
metadata:
  name: kubia-manual
  namespace: custom-namespace  #네임스페이스 지정
spec:
  containers:
  - image: hongdev22/kubia
    name: kubia
    ports:
    - containerPort: 8080
      protocol: TCP
```

### 2. kubectl create 명령 시 네임스페이스를 지정

```bash
$ kubectl create -f kubia-manual.yaml -n custom-namespace
```

⇒ 이전에 kubia-manual 이라는 pod가 있었더라도, 네임스페이스가 다르다면 동일한 이름으로 생성 가능하다.

## 네임스페이스가 제공하는 격리

- 다른 네임스페이스 안에 있는 오브젝트를 나열하거나 어노테이션 달기, 수정 또는 삭제할 때는 —namespace(또는 -n) 플래그를 kubectl에 전달해야 한다.
네임스페이스를 지정하지 않으면 kubectl은 현재 kubectl context에 구성되어 있는 기본 네임스페이스에서 작업을 수행한다.

- 현재 컨텍스트의 네임스페이스와 현재 컨텍스트 자체는 `kubectl config` 명령으로 변경 가능 (부록 A 참조)

    ```bash
    # current context 확인
    $ kubectl config current-context

    # current context를 특정 namespace로 변경
    $ kubectl config set-context <current-context> --namespace <namespace_name>
    ```

- 서로 다른 네임스페이스에 파드를 배포할 때 해당 파드가 서로 격리되어 통신할 수 없다고 생각할 수 있지만, 반드시 그런 것은 아니다.

    쿠버네티스와 함께 배포되는 네트워킹 솔루션이 네임스페이스 간 격리를 제공하지 않는다면, HTTP 요청과 같은 트래픽을 다른 파드로 보내는 것에 아무런 제약 사항이 없다. (다른 네임스페이스 안에 있는 파드의 IP 주소를 알고 있다면)

## 파드 중지 및 제거

### 1. 이름으로 삭제

- 파드를 삭제하면 쿠버네티스는 파드 안에 있는 모든 컨테이너를 종료하도록 지시한다.
- 두 개 이상의 파드를 삭제하려면, 여러 파드의 이름을 공백으로 구분해서 입력한다. (`kubectl delete po pod1 pod2`)

```bash
$ kubectl delete po <pod_name>
```

### 2. 레이블 셀렉터로 삭제

```bash
$ kubectl delete po -l creation_method=manual
```

### 3. 네임스페이스 자체를 삭제

- 파드는 네임스페이스와 함께 자동으로 삭제된다.

```bash
$ kubectl delete ns <namespace_name>
```

### 4. 네임스페이스 안의 모든 파드 삭제

- 네임스페이스는 유지하면서, 현재 네임스페이스에 있는 모든 파드 삭제

```bash
$ kubectl delete po --all
```

- 파드를 삭제했더라도 레플리케이션컨트롤러가 있다면, 즉시 새로운 파드를 생성한다.

    파드를 삭제하기 위해서는 레플리케이션컨트롤러도 삭제해야 한다.

### 5. 파드를 포함한 리소스 삭제

- 현재 네임스페이스에 있는 (거의) 모든 리소스를 삭제 (레플리케이션컨트롤러, 파드, 생성한 모든 서비스)

```bash
$ kubectl delete all --all
```

- 첫번째 `all`은 모든 유형의 리소스를 의미
- 두번째 `--all`은 특정 리소스 이름이 아닌 모든 리소스 인스턴스를 의미
- all 키워드를 사용했더라도 모든 것이 완전히 삭제되는 것은 아니다. (7장의 시크릿 등) 특정 리소스는 보존되어 있기 때문에 명시적으로 삭제해야 한다.
- 이 명령은 `service "kubernetes"`도 삭제하지만 잠시 후에 자동으로 다시 생성된다.


<br>

### _Reference_
> [_쿠버네티스 인 액션_](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791161754048&orderClick=LA6)  