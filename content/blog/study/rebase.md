---
title: "git rebase"
date: "2020-03-13T11:12:03.284Z"
template: "post"
draft: false
slug: "git/rebase"
category: "commands"
tags:
  - "Git"
description: "git rebase: commit 정리하기"
socialImage: ""
---


* git을 통해 작업할 때 중간중간 add와 commit을 하게 되는데, 여러 개의 commit을 날린 후 push를 하면 그동안의 모든 commit들이 남는다.\
commit 뿐만 아니라 push 할 때 conflict 수정하고 다시 날리는 merge commit 또한 남아서 commit 및 버전 관리가 복잡해진다.

* 이를 방지하기 위해서 push를 할 때에는 기존의 commit들을 하나로 합친 후에 push를 한다.

### git rebase
* rebase는 나의 현재 branch의 base를 최신으로 만든다는 의미로, base가 최신이기 때문에 push를 할 때의 conflict는 없게 된다.

<p>

1. 내 branch에서 rebase 하기 전에 master를 최신으로 만들어준다.

```bash
git checkout master

git pull origin master
```

2. branch로 돌아와서 rebase를 해준다.
rebase 하기 전에 이미 add와 commit이 완료되어 있어야 한다.

```bash
git checkout branch

git rebase -i master
```

3. commit 목록 중에 제일 윗줄만 남기고 나머지는 squash 혹은 s로 바꾸어준다.
<p>

4. `:wq` 하고 나오면 commit message 수정할 수 있는 창이 뜨는데, 정성스러운 commit message만 남기고 나머지는 삭제한다.\
*tip: 중간중간 남기는 commit은 '`wip`'(work in process)으로만 간단히 남겨도 된다.

<p>

5. 역시 `:wp`로 나와서 successfully rebase 되었다는 메세지가 남겨져 있으면 성공!

<p>

6. git에 push 명령어를 날린다.

```bash
git push origin branch
```

* 만약에 이미 PR이 올라가 있는 상태에서 rebase를 했을 경우에는, git 입장에서 base가 달라졌다고 생각하여 다른 branch로 인식하여 reject를 해버린다. 이 경우에는 force 명령어를 추가한다.
```bash
git push origin branch --force
```
