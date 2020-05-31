---
title: "Thumbnail과 Post page에 category 정보 넣기"
date: "2020-05-31T10:12:03.284Z"
template: "post"
draft: false
category: "react"
tags:
  - "React"
  - "Blog"
  - "Gatsby"
description: "Gatsby 블로그에서 포스팅마다 설정한 category 정보를 썸네일과 본문 페이지에서 보여주기"
socialImage: ""
---

Gatsby 블로그에서 포스팅마다 설정한 category 정보를 썸네일과 본문 페이지에서 보여주기

## 1. Thumbnail에 category 추가

블로그 포스트 목록 위에는 category별로 분류할 수 있는 메뉴가 있다.  
누르면 해당하는 카테고리의 포스트들을 보여주지만, 포스트별로 어떤 카테고리에 담겨있는지는 썸네일만 보고는 알 수 없다.

예를 들어 logout API에 관한 포스팅을 했는데, 이 포스팅이 django 관련인지 뭔지는 제목만 보고는 알 수가 없다.  
제목 앞에 일일이 [django]를 적기에는 지저분한 것 같아, 날짜 앞에 카테고리 정보를 넣어보기로 한다.

썸네일에 날짜 넣는 것은 지난 포스팅에서 해봤으니, 그 앞에 카테고리만 추가하면 된다. ▶[thumbnail에 날짜 넣기](https://hong-dev.github.io/blog/thumbnail/)

<br>


🔽 _thumbnail의 날짜 앞에 category 정보가 들어가기 전과 후_

<img alt="original format" src="https://user-images.githubusercontent.com/53142539/83346774-6085ff80-a35a-11ea-868b-7a8dd7486b09.png" width="460" style="float:left">

<img alt="revised format" src="https://user-images.githubusercontent.com/53142539/83346776-62e85980-a35a-11ea-8b4a-36160d038137.png" width="460">

<br>
<br>

---

### Code

> src/components/thumbnail-item/index.jsx

* **[1]**  
React에서는 inline으로 css를 추가할 때,
  1. `style={{ }}`방식으로 괄호가 두번 쓰인다.  
  2. 각각의 css를 구분하는 것은 `;`가 아닌 `,`(comma)다.  
  3. font-size는 `fontSize`, font-weight는 `fontWeight`와 같은 형태로 사용한다.

<br>

* **[2]**  
{node.frontmatter.date} 앞에 `{node.frontmatter.category}`를 담은 span을 추가한다.  
여기서는 카테고리와 날짜를 구분하기 위해 `|` 기호도 함께 추가했다.

```js
export const ThumbnailItem = ({ node }) => (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
      <h3>
        {node.frontmatter.title || node.fields.slug}
      </h3>
      <p>
        <time className="thumbnail-date">
[1]       <span style={{ color: '#8fa8c4', fontSize: '16px', fontWeight: 'bold' }}>
[2]         {node.frontmatter.category} | </span>
          {node.frontmatter.date}
        </time>
      </p>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link >
)
```




<br>

## 2. Post page에 category 추가

thumbnail에서 category를 추가했으니, 본문 페이지에도 category를 추가하고 싶다.  
thumbnail과 비슷한 형식으로 날짜 앞에 category 정보를 넣어보기로 한다.

<br>

🔽 _post 날짜 앞에 category 정보가 들어가기 전과 후_

<img alt="original format" src="https://user-images.githubusercontent.com/53142539/83347390-bf9a4300-a35f-11ea-98b0-087486fe9c80.png" width="460" style="float:left">

<img alt="revised format" src="https://user-images.githubusercontent.com/53142539/83347391-c0cb7000-a35f-11ea-8bd0-19fe05b0e088.png" width="460">

<br>
<br>

---

### Code

> src/components/post-date/index.jsx

* **[1]**
date 옆에 category를 추가해준다.

* **[2]**
date를 span으로 감싸고, 그 앞에 category를 span으로 추가한다.

* **[3]**
span 2개를 감싸는 하나의 큰 태그를 씌우지 않으면 에러가 발생한다. 여기서는 p 태그를 씌웠다.

```js
[1] export const PostDate = ({ date, category }) => {
      return (
        <p className="post-date">
[2]       <span>{category} | </span>
          <span style={{ color: '#3f526b' }}>{date}</span>
[3]     </p>
      )
    }
```

<br>

> src/templates/blog-post.js

* **[1]**
여기에서 `category`를 추가해서 선언해줘야 아래의 return 값에서 category를 사용할 수 있다.

* **[2]**
위에서 index.jsx 파일의 PostDate에 category를 추가했으므로, `category={category}`로 category가 무엇인지 선언해준다.  
여기에서 category를 정의해주지 않으면, 에러는 없지만 category 정보가 나타나지 않는다.  
앞 부분의 `category`는 PostDate에 들어있는(index.jsx 파일에서 사용한) category를 말하고, `{category}`는 [1]에서 const로 선언한 category를 말한다.

* **[3]**
graphql을 사용하여 data를 가져와야 하는데, blog-post 페이지에서는 category를 가져오지 않고 있었다.  
이제 post 페이지에서도 category를 사용해야하므로, frontmatter 안에 `category`를 추가해서 data를 가져올 수 있도록 한다.

```js
  export default ({ data, pageContext, location }) => {
    [중략]
    const { disqusShortName, utterances } = comment
[1] const { title: postTitle, date, thumbnail, category } = post.frontmatter

    return (
        [중략]
        <PostTitle title={postTitle} />
[2]     <PostDate date={date} category={category} />
        <PostContainer html={post.html} />
    )
  }

  export const pageQuery = graphql`
        [중략]
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
[3]       category
          thumbnail {
            childImageSharp {
              fixed(width: 800) {
                src
              }
            }
          }
        }
  `
```

<br>
<br>

> \#wecode #위코드