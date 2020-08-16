---
title: "Change width, Delete dark-mode"
date: "2020-05-10T10:12:03.284Z"
template: "post"
draft: false
category: "gatsby"
tags:
  - "React"
  - "Blog"
  - "Gatsby"
description: "gatsby blog의 본문 width 변경, dark mode 삭제"
socialImage: ""
---


width를 바꾸고 darkmode를 없애보자! (gatsby-starter-bee 테마 기준)

<br>

1. 여백의 미를 참 좋아하지만, content 들어가는 부분의 너비가 너무 작지 않은가 하는 생각이 들었다.  
2. thumbnail을 light-mode 기준으로 바꿨더니 dark-mode는 너무 안 예쁘다..

<br>

## 본문의 width 변경하기
> src/layout/index.jsx

```js
export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <React.Fragment>
      <Top title={title} location={location} rootPath={rootPath} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(35), //여기 숫자를 바꾸면 너비가 변경된다!
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}>
        <ThemeSwitch />
        <Header title={title} location={location} rootPath={rootPath} />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  )
}
```

## dark-mode switch 안 보이게 하기
> src/components/theme-switch/index.scss

엄하게 layout 자체를 삭제하거나 건들였다가는 error 파티될 것 같아서, switch가 밖으로 보이지 않도록 설정했다.
```css
.switch-container {
  visibility: hidden; /*이 부분만 추가!*/
  text-align: right;

  .icon {
    text-align: center;
    color: #222;
    font-size: 14px;
    font-weight: 900;
  }
}
```

## dark-mode 없애기
> src/components/theme-switch/index.jsx

dark mode를 눌렀다가 블로그에 새로 접속했을 때에는, dark mode를 기억하지 않고 light mode로 reset 된다.  
그렇지만 혹시나 다크모드인 채로 남아 스위치가 없어 바꾸지도 못하는 불상사가 생기지는 않을까 하는 마음에..  
스위치가 on이든 off든 언제나 light-mode만 적용되도록 바꿨다.
```js
function getTheme(checked) {
  return checked ? THEME.LIGHT : THEME.LIGHT  
  //DARK:LIGHT 였는데 LIGHT:LIGHT 로 바꿨다.
}
```
