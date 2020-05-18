---
title: "Terminal"
date: "2020-02-15T20:12:03.284Z"
template: "post"
draft: false
slug: "linux/terminal"
category: "concepts"
tags:
  - "Linux"
  - "Terminal"
description: "Terminal의 개념, 색상 테마 변경"
socialImage: ""
---


- 소위 말하는 검은 화면, dark screen으로 불리는 terminal
- Backend system이 대부분 Linux 기반의 서버에서 운영된다. 따라서 Linux server에 접속해서 작업 할 때, terminal을 통해 작업하는 경우가 대부분이다.
- CLI(Command Line Interface): 명령어 인터페이스. UI나 편리한 툴에 의존하는 것을 최소화하고, 터미널을 통해서 개발하는 것을 습관화해야 한다.

- Mac에서는 기본 터미널이 설치되어 있는데, 많은 개발자들이 편리한 기능을 제공하는 iTerm을 사용한다.

### Ubuntu Terminal 색상 테마 변경

- Ubuntu에서도 기본 터미널이 설치되어 있는데, default terminal이 Gnome terminal이다.
- Gogh라고 하는 Gnome 터미널 색상 테마 변경 툴을 사용할 수 있다.

```bash
sudo apt install dconf-cli

wget -O gogh https://git.io/vQgMr && chmod +x gogh && ./gogh && rm gogh
```

- 위의 두 가지를 실행하면, 색상 테마 옵션들이 나열되는데, 그 중 마음에 드는 테마의 번호를 입력한다.

    [https://mayccoll.github.io/Gogh/](https://mayccoll.github.io/Gogh/) : Gogh로 설정할 수 있는 테마 리스트 보기