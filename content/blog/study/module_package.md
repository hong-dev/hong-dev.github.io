---
title: "[Python] Module, Package"
date: "2020-02-11T11:12:03.284Z"
template: "post"
draft: false
slug: "python/module_package"
category: "python"
tags:
  - "Python"
description: "Module, Package"
socialImage: ""
---


## Modules

- 변수나 함수, 클래스 등을 모아놓은 파일이다.
- 따로 모듈로 모아놓는 이유는:
    1) 여러 파일들에서 사용 할 수 있도록 하기 위해서

    2) 전체 코드를 한 파일에 넣기에는 많고 따로 정리하기 위해서

### Module 사용 방법

- python 파일(.py)을 만든 후, 함수나 클래스, 변수 등을 구현한다.
- 다른 파일에서 불러올 때는:


    **case1)** `import`: 확장자 .py는 제외하고 파일 이름만 사용한다.\
    **case2)** `from-import`: 특정 모듈에서 특정 함수나 변수 등만 import 할 수 있다.\
    **case3)** `from-import *`: 해당 모듈의 모든 요소가 곧바로 import 된다.\
    **case4)** `(from) import as`: 모듈명이나 함수 등 불러오는 것의 이름을 바꿔서 가져올 수 있다.
    여러 모듈을 사용하면 이름 충돌이 있을 수 있고, 원하는 모듈의 이름이 너무 길 수도 있어서 새로운 이름을 주어서 사용할 수 있다.


- 불러온 module을 사용할 때는:

    **case1)** module 이름을 dot 앞에 붙이고, 불러오고자 하는 것을 호출한다.\
    **case2)** from-import를 사용할 때는 어떤 case든지 module 이름을 붙이지 않고 호출 가능하다.
    module에서 사용하는 것이 명확할 때 from import를 사용하면 편리하다.\
    **case3)** from-import 방식이므로 모듈명 없이 원하는 것 호출 가능하다.
    그러나 별표*를 사용하는 것은 권장하지 않는다. local scope를 가지고 있는 다른 변수/함수/클래스와 이름 충돌이 있을 수 있기 때문이다.\
    **case4)** 새로운 명칭으로 호출한다.
    import 방식은 모듈명을 붙이고 호출하고, from-import 방식은 모듈명 없이 호출한다.

```python
# case1)
import my_module

my_module.my_module_func()


# case2)
from my_module import my_module_func, my_module_var

my_module_func()


# case3)
from my_module import *

my_module_func()


# case4)
import my_module as m1
from my_module  import my_func as f1
from my_module2 import my_func as f2

m1.my_module_func()
f1()
f2()
```

## Packages

- module보다 더 크고 복잡한 코드 (module은 단순한 python file)
- python files(modules)로 이루어져 있는 directory가 하나의 package가 된다.

- 호출 시에는, dot notation을 사용하여 해당 package의 원하는 module을 import 하면 된다.

```python
import pkg.mod1
from pkg.mod2 import func2
```

### Package Initialization

- package가 import 될 때 초기 설정을 해줘야 할 때가 있다.\
python은 \__init\__.py 파일을 통해 package 초기 설정을 가능하게 해준다.\
package 안에 \__init\__.py 파일이 있으면 package가 import 될 때 \__init\__.py 파일의 코드들이 자동으로 실행된다.

### \__init__.py 파일의 역할

**1. Import 할 때 경로의 총 길이 줄여주기**

```python
#원래의 방식은 아래처럼 main.py에서 매번 경로를 타입해야한다.
import pkg.mod1

pkg.mod1.func2()


#그런데 pkg안에 있는 __init__.py에서 아래처럼 해주면:
from mod1 import func2


#main.py에서는 아래처럼 간단히 호출가능:
from pkg import func2

func2()
```

<p>

**2. `__all__` : Package중 import 할 수 있는 변수/함수/클래스 제한하기**

* 내부적으로만 사용해야 하는 함수도 있을 수 있으니, import 가능한 함수만 정의해준다.

* 아래의 경우, 다른 파일에서 func2와 func3는 import 되지만, func4는 \__all__에 정의되지 않았으므로 호출하면 error 발생

```python
# __init__.py에서:
from mod1 import func2
from mod2 import func3

__all__ = ['func2', 'func3']
```

**3. 그 외 package가 import 될 때 꼭 먼저 실행되어야 하는 코드들**