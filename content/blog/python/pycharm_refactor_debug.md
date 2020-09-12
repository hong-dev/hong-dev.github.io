---
title: "[PyCharm] Refactor, Debug"
date: "2020-09-12T23:12:03.284Z"
template: "post"
draft: false
category: "python"
tags:
  - "PyCharm"
  - "Python"
  - "IDE"
description: "파이참의 리팩토링과 디버깅 기능. Refactor, Debug, Break Point, Working Directory"
socialImage: ""
---


> _파이참 쓴지 한달.. 얕은 경험으로 얕은 기능만 써본 후기:joy:_

<br>

Visual Studio Code를 사용하다가 PyCharm으로 갈아탄지 얼마 안 되었다.  
사실 갈아탄건 아니고 둘 다 사용중인데, vscode의 기능이 pycharm에서는 어떻게 쓰는지 잘 몰라서 번갈아가며 쓰는 중..:joy:  

vscode를 쓰는 사람들은,  
pycharm이 `community`와 `professional`이 있는데 advanced한 기능들을 사용하려면 돈을 내야해서 vscode로 갈아탔다는 사람도 있고.  
pycharm이 아무래도 python에 최적화 되어있어서(다른 언어 안 써봐서 잘 모름:joy:), general하게 사용하는 vscode를 쓴다는 사람도 있고.  

개인적으로는 파이참의 쨍하지 않은 색? 살짝 톤 다운된 차분한 느낌?이 더 마음에 든다.

놀랍게도 회사에서는 vscode와 pycharm의 사용률이 반반이었다! 그만큼 별 차이는 없는 것으로...?  
물어봐도 별다른 큰 이유는 없었다.. 사실 기능은 둘 다 비슷하게 다 가지고 있다고 한다.

그러나 모두가 똑같이 하는 말은 vscode보다 **파이참이 디버깅할 때 매우 좋다는 것!**  
당시에는 pycharm의 debug mode를 사용해보기 전이어서 뭐가 그리 다르다는 걸까 했었는데.. 웬걸..

파이참에서 신세계라고 느꼈던 기능은(겨우 한 달 써 본 경험으로는:joy:) `refactoring`과 `debugging`!!

<br>

# Refactor
### Move
* 파일이나 파일 안의 있는 class, variable 등을 다른 곳으로 이동할 때 사용한다.
* **방법:** 옮기고 싶은 것 `오른쪽 클릭` > `Refactor` > `Move`를 선택한다. (단축키: `F6`)
* `Bulk move`를 눌러서 class를 여러개 선택하면 한꺼번에 옮길 수 있다.
* Refactor에서 move 기능은 그냥 옮기는 게 아니다.  
예를 들어 class 하나를 다른 file로 옮기고 싶을 때, 해당 class에 필요한 import 정보까지 같이 옮겨준다.  
(놀라운건 import도 정렬까지 해서 예쁘게 옮겨준다.)  
그리고 이동한 class의 path가 바뀌었을테니, class를 사용하는 곳에는 새로운 path를 자동 적용시켜준다.

<br>

### Rename
* 파일이나 파일 안의 class, function, variable 등의 이름을 usage들과 함께 한꺼번에 바꿀 때 사용한다.
* **방법:** 바꾸고 싶은 이름 `오른쪽 클릭` > `Refactor` > `Rename`을 선택한다. (단축키: `Shift+F6`)  
  아래와 같은 창이 뜨면 원하는 이름으로 바꿔서 입력해준다.
* Project files 전체인지, 열려있는 파일들만인지, 현재 파일만인지 `Scope`도 설정할 수 있다.
* 지금보니 `Search in comments and strings` 체크하는 것도 있다. 주석이나 string 처리된 것들도 바꿔주나보다.  
이 기능이 있는줄도 모르고 docstring, comments 따로 찾아서 바꿔줬는데.. 이렇게 또 배워갑니다:joy::thumbsup:

  ![PyCharm Rename](https://user-images.githubusercontent.com/53142539/92941918-eb16e880-f48b-11ea-963d-9ecd238a5134.png)

<br>
<br>

# Debug

### Debug mode
* test하고 싶은 코드를 오른쪽 클릭하면 `:arrow_forward: Run`과 `:bug: Debug`가 있다.  
Run은 test를 그냥 쭉 돌려서 pass/fail을 보는 거고, Debug는 test를 돌리면서 error가 발생하면 그 부분에서 debugging을 할 수 있다.
* **pycharm이 디버깅이 편한 이유!**  
error 발생 즉시 멈춰주고 console 창이 있어서 그 부분에서 사용한 변수라든지 다른 정보들을 console로 바로바로 입력해볼 수 있다.  
그리고 정말 신세계다 싶었던 건, 원본 코드에도 오른쪽에 회색으로 input 값을 보여준다는 것!  
예를 들어, function의 input parameter로 어떤 것들이 들어왔는지를 코드 옆에 적어준다.  
많이 해보지 않았는데도 이래서 파이참 디버깅이 좋다고 하는구나 싶었다:clap:
* IDE로 debugging 처음 해볼 때 그냥 무작정 test code 아닌 code를 눌러서 run을 했었다.  
그래놓고 계속 안된다고 했는데, test 코드만 돌려볼 수 있는 구조였다..:joy:  
그럼 test code가 없는 코드는 debug 해볼 수가 없다는..? 이래서 unittest, TDD가 중요하다고 하나보다..

<br>

### Breakpoint
* PyCharm에서는 Debug로 실행시켰을 때만 breakpoint를 사용할 수 있다.  
맨 왼쪽에 코드 row 번호 왼쪽 공간을 누르면 빨간색 동그라미가 생기는데 이게 `breakpoint`다.
* Debug 실행 시에 error가 발생하면 그 자리에서 멈춰주지만, breakpoint가 있으면 error가 발생하지 않아도 그 자리에서 멈춰준다.
* 뭐가 들었는지 알고 싶을 때 `print`로 찍어보는 대신 breakpoint를 활용해서 console 창에 쉽게 찍어볼 수 있다.  
그러나 이것도 test code가 있을 때 가능한 일 아닌가..?:sob: 기승전 test code..

<br>

### Working Directory
* 전체를 debug 돌리지 않고, 폴더 혹은 파일 하나 이렇게 작은 단위로 돌릴 때 error가 생기기도 하는데,  
import를 할 수 없다느니 그런 module이 없다느니 결과값이 이상하다든지 하는.. 왠지 얘가 파일 같은 걸 제대로 인식 못해서 생기는 error 같다면?!  
:arrow_right: working directory를 의심해본다.
* 최상단의 메뉴바에서 `Run` > `Edit Configurations` > `Run/Debug Configurations 창`이 뜨면 왼쪽에서 해당하는 파일 및 폴더를 선택하고 > `Working directory`를 상황에 맞게 변경해준다.
* 코드가 project root 폴더를 기준으로 import 하도록 짜여져 있다면, 보통 파일 하나의 working directory는 그 파일만을 기준으로 설정되기 때문에 그 파일 기준으로 import 하려니 없다고 나오는 것. 이 때는 프로젝트 전체를 기준으로 working directory를 설정해준다.

<br>

<br>

3달 전까지만해도 vim이 간지다!!를 외치다가.. (물론 여전히 잘 쓰고 싶은 맘은 한가득이지만:joy:)  
왜 IDE를 쓰는지 이제 알겠다.. 이걸 어떻게 만든거지:scream: 만든 사람들 누구보다도 대단해..:flushed::thumbsup: