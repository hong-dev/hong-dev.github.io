---
title: "[Python] How Import statement finds Modules & Packages"
date: "2020-02-11T15:12:03.284Z"
template: "post"
draft: false
slug: "python/import_modules"
category: "python"
tags:
  - "Python"
description: "Import 할 때 파이썬이 모듈이나 패키지 찾는 순서"
socialImage: ""
---



## Import 할 때 파이썬이 모듈이나 패키지 찾는 순서

- import를 할 경우, python은 다음의 순서대로 file(module)이나 directory(package)를 찾는다.

    1) `sys.modules`

    2) `built-in modules`

    3) `sys.path`

    4) sys.path에서도 못 찾으면 `ModuleNotFoundError`를 return한다.

### sys.modules

- python이 module이나 package를 찾기 위해 가장 먼저 확인하는 곳
- 단순한 **dictionary**이며, 한번이라도 이미 import된 module과 package들을 저장하고 있다.\
그러므로 새로 import 하는 module은 sys.modules에서 찾을 수 없다.

### built-in modules

- python에서 제공하는 파이썬 공식 라이브러리들
- 이미 python에 포함되어 나오므로 python이 쉽게 찾을 수 있다.

### sys.path

- 기본적으로 **list**이며, 경로를 나타내는 string 요소들을 가지고 있는 list
- python은 list의 각 경로를 하나하나 확인하면서 해당 경로에 import 하고자 하는 package가 위치해 있는지 확인한다.
- pip을 통해 설치한 외부 module 및 package는 자동으로 site-packages라는 디렉토리에 설치되는데, 이 site-packages는 sys.path에 이미 포함되어 있다.
- current directory라고 하는 현재의 프로젝트 디렉토리는 default로 sys.path에 포함된다.

## python은 sys module의 위치를 어떻게 찾을까?

- sys도 import 해야하는 module이다.

- sys module은 이미 python에서 제공하는 built-in module이다.

    ![sys module](https://user-images.githubusercontent.com/53142539/77428452-738cc880-6e1b-11ea-94dc-66296a031c10.png)

    ![sys module](https://user-images.githubusercontent.com/53142539/77428457-7687b900-6e1b-11ea-896d-3f53c830a405.png)

- 따라서 import sys 할 때 python은 sys를 built-in modules에서 찾을 수 있다.\
만약 sys가 한번이라도 import 되었다면 sys.modules에서 바로 찾을 수 있다.

#### built-in modules에는 뭐가 있는지 알고 싶다면:

```python
import sys

sys.builtin_module_names
```

![built-in modules](https://user-images.githubusercontent.com/53142539/77428547-9b7c2c00-6e1b-11ea-8c78-53dcefe0ac36.png)

#### module의 위치(path)를 알고 싶다면:

```python
import inspect

inspect.getfile(<modulename>)
```

![module_path](https://user-images.githubusercontent.com/53142539/77428552-9dde8600-6e1b-11ea-938c-eb1ab246a46a.png)

## Local package를 import 하는 경로

- built-in module이나 pip을 통해 설치한 외부 module은 일반적으로 import 하는 데 큰 문제가 되지 않는다.
- 그러나 직접 개발한 local package를 import 할 때는 해당 package의 위치에 맞게 import 경로를 잘 선언해야 한다.

### Absolute path

- 경로가 프로젝트의 가장 최상위 디렉토리에서 시작한다.
- 일반적으로 사용하는 방식이다.

```python
'''
my_app.package1.subpackage1.module1.py와 같은 형식인데,
1) my_app이라는 프로젝트 안에 있으므로 가장 최상위 디렉토리인 my_app은 생략한다.
2) import를 사용할 때 module의 확장자는 생략한다.
'''

from package1.subpackage1.module1 import function1
```

### Relative path

- 경로를 import 하는 위치를 기준으로 정의한다.
- `dot(.)`; import가 선언되는 파일의 현재 위치\
`two dots(..)`; 현재 위치에서 상위 디렉토리로 가는 경로

- 경로가 길어질 수 있는 absolute path의 단점을 보완하기 위해서 사용할 수 있다.\
선언해야 하는 경로의 길이를 줄여준다.

- 헷갈리기 쉽고, 파일 위치가 변경되면 경로 위치도 변경되어야 하는 단점이 있다.\
웬만한 경우 absolute path를 사용하는 걸 권장한다.

- 일반적으로 local package 안에서 다른 local package를 import 할 때 사용한다.

```python
#해당 디렉토리에서 찾기
from . import class1
from .subpackage1.module1 import function1
```

```python
#상위 디렉토리로 올라가서 찾기
from ..module1 import class1
```

