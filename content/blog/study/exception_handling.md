---
title: "[Python] Exception handling: try-except"
date: "2020-02-12T11:12:03.284Z"
template: "post"
draft: false
slug: "python/exception_handling"
category: "python"
tags:
  - "Python"
description: "try-except-(else)-finally"
socialImage: ""
---

<p>

- 의도하지 않은 error가 발생하는 상황
- exception이 발생하면, 발생한 코드 위치에서 곧바로 프로그램이 종료된다. 그다음 코드들이 실행되지 않는다.
- exception handling; try-except 방법을 쓰면 exception이 발생해도, 프로그램을 종료하지 않고 다른 로직을 실행한 후 프로그램이 계속 실행되게 할 수 있다.

## try-except-(else)-finally

- `try`: exception이 발생하지 않고 정상 작동 되었을 때 실행된다.
- `except <error>`: exception이 발생하면 실행된다.
- `except Exception (as e)`: 위의 except에서 말한 error가 아닌 다른 종류의 exception이 발생했을 때 실행된다. as를 사용해서 해당 exception의 객체를 받아서 정보를 더 얻을 수 있다.
- `else`: exception이 발생하지 않았을 때 실행된다.
- `finally`: exception 발생 여부와 상관없이 무조건 실행된다.

```python
def division(num1, num2):
    try:                    #정상 작동시
        div1 = num1 / num2
    except TypeError:       #typeerror 발생시
        div1 = "TypeError"
    except Exception as e:  #다른 exception 발생시
        div1 = f"TypeError가 아닌 다른 Exception 발생 ==> {e}"
    else:                   #정상 작동시(try가 실행되었을 때)
        print("exception이 발생하지 않았습니다.")
    return div1
```