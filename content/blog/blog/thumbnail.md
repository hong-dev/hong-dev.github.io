---
title: "Edit Post Thumbnail"
date: "2020-05-09T10:12:03.284Z"
template: "post"
draft: false
slug: "blog/thumbnail"
category: "react"
tags:
  - "React"
  - "Blog"
  - "Gatsby"
description: "gatsby blog의 thumbnail list 바꾸기"
socialImage: ""
---


포스팅 썸네일 리스트 css를 바꿔보자! (gatsby-starter-bee 테마 기준)

<br>


🔽 블로그 테마의 원래 css는 아래 사진과 같다. (두번째가 hover 되었을 때의 모습)
<br>

<img alt="original format" src="https://user-images.githubusercontent.com/53142539/81528064-ce13c100-9396-11ea-8360-424b782e677a.png" height="400">


<br>

🔽 css 바꾼 후 모습 (두번째가 hover 되었을 때의 모습)

<img alt="revised format" src="https://user-images.githubusercontent.com/53142539/81528056-cbb16700-9396-11ea-9a91-d053cf544618.png" height="400">

<br>
<br>

#### thumbnail에서 바꿔야 할 부분은,
1. border
2. hover
3. 날짜가 나오도록 설정

---

<br>
<br>

❗_수정한 부분의 코드만 기재함_

## border
> src/components/thumbnail-item/index.scss
```css
.thumbnail {
  margin: 15px 0 15px 0;
  padding: 0px 25px;
  padding-bottom: 10px;
  border: 1px solid #ecf0f2;  /*카드처럼 보이도록 테두리 넣기*/
  border-radius: 4px;         /*모서리 둥글게*/
  box-shadow: 0 1px 3px #00000023, 0 1px 2px #a9ceff7c;  /*입체감있게 그림자*/
}
```

## hover
> src/styles/light-theme.scss
```css
.thumbnail {
  &:hover {
    // text-shadow: $light-hover-text-shadow; /*글자 자체의 변화는 삭제*/
    background-color: #7ca7df28;
    border: 1px solid #7ca7df0c;
  }
}
```

## date
> src/components/thumbnail-item/index.jsx

p 태그 사이에 time 태그로 date를 넣었다.  
기본으로 적용되는 폰트가 마음에 들지 않아, 날짜에 'thumbnail-date'라는 className을 붙여 폰트를 수정하기로 한다.
```js
export const ThumbnailItem = ({ node }) => (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
      <h3>
        {node.frontmatter.title || node.fields.slug}
      </h3>
      <p>   //date 시작
        <time className="thumbnail-date">
          {node.frontmatter.date}
        </time>
      </p>  //date 끝
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link>
```

<br>

> src/styles/light-theme.scss

'thumbnail-date'라는 className을 생성했으니, scss 파일로 가서 새롭게 css를 설정해준다.
```css
.thumbnail-date{
  color: #a9a9a9;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
} 
```