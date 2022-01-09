---
title: "Virtual Environment (가상환경)"
date: "2020-02-12T15:12:03.284Z"
template: "post"
draft: false
slug: "python/virtual_environment"
category: "django"
tags:
  - "Settings"
  - "Virtual Environment"
description: "가상환경, conda commands"
socialImage: ""
---


- 여러 프로젝트를 하는 데 있어, 각 프로젝트 별로 독립적인 파이썬 버전 및 라이브러리가 설치된 개별적인 환경을 가지게 된다.
- 개발 도중에도 편리하지만 나중에 배포 관리를 하는 데 있어서도 매우 편리하다.
- python의 대표적인 가상환경 프로그램은 conda와 virtualenv가 있다.
- 여기서는 **conda**를 예시로 설명한다.

#### conda 가상환경 목록을 보는 명령어

```python
conda env list
```

#### conda 가상환경 만들기
* 가상환경의 이름은 프로젝트 이름으로 통일하는 것을 권장한다.

```python
conda create -n "가상환경이름" python=3.7
```

#### conda 내가 만든 가상환경으로 활성화하기

```python
conda activate "가상환경이름"
```

#### conda 실행된 가상환경 비활성화하기

```python
conda deactivate
```

#### conda 가상환경 삭제하기

```python
conda env remove -n "가상환경이름"
```

#### conda 가상환경 export하기(배포용 yaml만들기)
```python
conda env export> "가상환경이름.yaml"
```

#### conda export한 가상환경 import하기
```python
conda env create -f "가상환경이름.yaml"
```
