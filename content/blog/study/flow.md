---
title: "git flow"
date: "2020-03-17T11:12:03.284Z"
template: "post"
draft: false
slug: "git/flow"
category: "git"
tags:
  - "Git"
description: "git flow: 어떻게 git을 활용해야 할 것인가"
socialImage: ""
---


## Git Flow
: "어떻게 git을 효율적으로 사용할 수 있는가?"에 대한 process

#### Five Branches

1. **Hot fix**: 급하게 수정을 해야할 때\
실제 상용되고 있는 서비스에서 문제가 생겼을 때 여기에서 작업 (master branch를 기준으로 깐다.)\
⇒ 다 고쳐지면 Master와 Develop에 merge : 그때그때 삭제하고 다시 까고.
<p>
2. **Release**: 배포 테스트용\
배포 후보를 여기에 올리고 test 진행\
⇒ 테스트까지 완료하면 master에 올리고 develop에 merge: 그때그때 삭제하고 다시 까고.
<p>
3. **Master**: 배포가 '된' 코드를 여기에 저장(배포용)
<p>
4. **Develop**: 개발용 branch\
여기에서 Feature branch를 까서 개발 후 develop branch에 다시 merge한다.\
개발용 master branch 역할
<p>
5. **Feature**: develop에서 feature branch를 깐다.\
개개인이 여기에서 작업해서 develop에 pr 날리는 구조

