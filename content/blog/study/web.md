---
title: "[Web] How the web works?"
date: "2020-02-16T11:12:03.284Z"
template: "post"
draft: false
slug: "web"
category: "concepts"
tags:
  - "Web"
description: "Hosting, IP address, Domain, DNS, deploy"
socialImage: "Screenshot from 2020-02-16 19-33-32.png"
---

<p>

```
사용자 ↔ 브라우저 ↔ 서버
```    
* 요청과 응답으로 connect 된다.


### Hosting 호스팅

- 사용자들은 언제든지 들어오는데, 서버는 24시간 대기를 타고 있어야 한다.
- 인터넷을 통해서 요청, 응답하는 것이기 때문에 인터넷도 계속 연결되어 있어야 한다.
- 회사에서 자체적으로 이러한 인프라를 구축하기 어려워서, 이러한 서비스를 해주는 업체가 생겼다.\
    *Hosting 업체) cafe24, AWS 등

### IP address

- 인터넷에 연결되어 있는 모든 device에 부여된 고유한 값\
    핸드폰, 노트북, 네비게이션 등에도 다 부여된다. 

### Domain

- 문자로 된 고유 주소\
    IP 주소를 외워서 접속할 수 없기 때문에 domain으로 접속한다.

- IP와 도메인이 1:1로 매칭되어 있다\
    ex) www.wecode.com

![Domain](https://user-images.githubusercontent.com/53142539/77428714-e5651200-6e1b-11ea-9dc6-bbe912475228.png)

### DNS(Domain Name System)

- 전화번호부 같은 개념\
    Domain을 받으면 해당 domain의 IP 주소를 넘겨준다.

![DNS](https://user-images.githubusercontent.com/53142539/77428720-e72ed580-6e1b-11ea-81c6-1bd3187ecab8.png)

### 배포(deploy)

- 로컬에서 개발하던 것을 인터넷상에 공개하고 모든 사람들이 접근해서 볼 수 있게 한다.

### [요약]
1) 사용자가 브라우저에서 domain을 입력한다.
2) 브라우저가 DNS Server로 domain 정보를 전송하면, DNS Server에서 IP 주소를 return 해준다.
3) 브라우저가 DNS Server에서 받은 IP 주소를 host server에 전송하면, host server는 해당 페이지를 return 해준다.

<p>

#### 관련 Reference:

-[How Browsers Work](https://velog.io/@devzunky/TIL-no.97-WEB-3-How-Browsers-Work-xck59bsuxf)\
-[인터넷이 동작하는 아주 구체적인 원리](https://parksb.github.io/article/36.html?fbclid=IwAR15UeD4WM0Z0TZ4TTjjKGIfR3qnQiXPdEKWh73_2uPaSP12Qi51QjSm-Dw)\
-[What Is DNS? | How DNS Works](https://www.cloudflare.com/learning/dns/what-is-dns/)

<p>

- http 통신
- spa(single page application) vs csr(client side rendering) vs ssr(server side rendering)
- aws 세팅 및 배포

```
Reference:
wecode 예리님 session 'How the web works?'
```