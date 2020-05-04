---
title: "[Web] HTTP"
date: "2020-02-17T13:12:03.284Z"
template: "post"
draft: false
slug: "web/http"
category: "web"
tags:
  - "Web"
  - "HTTP"
description: "HTTP 개념, Request/Response, HTTP Method, HTTP Status Code"
socialImage: ""
---



## HTTP(HyperText Transfer Protocol)

- 하이퍼텍스트(HTML) 문서를 교환하기 위해 만들어진 protocol(통신 규약)
- 프론트엔드 서버와 클라이언트 간의 통신에 사용된다.\
    백엔드와 프론트엔드 서버 간의 통신에도 사용된다.

- TCP/IP 기반으로 되어 있다.

### HTTP 통신 방식

1) 요청(request) / 응답(response) 구조로 되어있다.

2) Stateless: 상태를 저장하지 않는다. 요청이 오면 응답할 뿐. 각각의 요청/응답은 독립적이며, 여러 요청/응답끼리 연결되어 있지 않다. 여러 요청/응답의 진행과정이나 데이터가 필요할 때는 쿠키나 세션 등을 사용한다.

## HTTP Request 구조

#### 1) Start Line

- HTTP Method: 요청의 성격 ex) GET, POST, PUT, DELETE, OPTIONS
- Request target: 받는 사람 주소
- HTTP Version

```bash
GET /search HTTP/1.1
```

#### 2) headers: meta data

key:value로 되어 있음

- Host\
요청이 전송되는 target의 host url\
        ex) google.com

- User-Agent\
요청을 보내는 클라이언트의 대한 정보\
        ex) 웹브라우저에 대한 정보. 광고용으로 많이 쓰인다.

- Accept\
해당 요청이 받을 수 있는 응답(response) 타입

- Connection\
해당 요청이 끝난후에 클라이언트와 서버가 계속해서 네트워크 컨넥션을 유지 할것인지 아니면 끊을것인지에 대해 지시하는 부분

- Content-Type\
해당 요청이 보내는 메세지 body의 타입\
        ex) JSON을 보내면 `application/json`

- Content-Length:\
메세지 body의 길이

```bash
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Type: application/json
Content-Length: 257
Host: google.com
User-Agent: HTTPie/0.9.3
```

#### 3) body: 본문. 실제 data

- body가 없을 수도 있다. (get같은 경우)

```bash
POST /payment-sync HTTP/1.1

Accept: application/json
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 83
Content-Type: application/json
Host: intropython.com
User-Agent: HTTPie/0.9.3

{
    "imp_uid": "imp_1234567890",
    "merchant_uid": "order_id_8237352",
    "status": "paid"
}
```

* target 주소를 endpoint 주소라고 한다.\
endpoint; 한 서버에 기능들이 많고 그 기능(함수)를 말한다.

## HTTP Response 구조

####1) Status line

- HTTP version
- Status code
- Status text

```bash
HTTP/1.1 404 Not Found  #host(startline)는 정확한데, target(headers)이 잘못 된겨.
```

#### 2) Headers

- User-Agent 대신에 server 헤더가 사용된다.

3) Body: 실제 데이터

- 터미널로 보기 때문에 html이 rendering이 안되니까 쌩 html로 보여준다.

```bash
HTTP/1.1 404 Not Found

Connection: close
Content-Length: 1573     #body의 총 글자수
Content-Type: text/html; charset=UTF-8
Date: Mon, 20 Aug 2018 07:59:05 GMT

<!DOCTYPE html>
<html lang=en>
    <meta charset=utf-8>
    <meta name=viewport content="initial-scale=1, minimum-scale=1, width=device-width">
    <title>Error 404 (Not Found)!!1</title>
    <style>
    *{margin:0;padding:0}html,code{font:15px/22px arial,sans-serif}html{background:#fff;color:#222;padding:15px}body{margin:7% auto 0;max-width:390px;min-height:180px;padding:30px 0 15px}* > body{background:url(//www.google.com/images/errors/robot.png) 100% 5px no-repeat;padding-right:205px}p{margin:11px 0 22px;overflow:hidden}ins{color:#777;text-decoration:none}a img{border:0}@media screen and (max-width:772px){body{background:none;margin-top:0;max-width:none;padding-right:0}}#logo{background:url(//www.google.com/images/branding/googlelogo/1x/googlelogo_color_150x54dp.png) no-repeat;margin-left:-5px}@media only screen and (min-resolution:192dpi){#logo{background:url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) no-repeat 0% 0%/100% 100%;-moz-border-image:url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) 0}}@media only screen and (-webkit-min-device-pixel-ratio:2){#logo{background:url(//www.google.com/images/branding/googlelogo/2x/googlelogo_color_150x54dp.png) no-repeat;-webkit-background-size:100% 100%}}#logo{display:inline-block;height:54px;width:150px}
    </style>
    <a href=//www.google.com/><span id=logo aria-label=Google></span></a>
    <p><b>404.</b> <ins>That’s an error.</ins>
    <p>The requested URL <code>/payment-sync</code> was not found on this server.  <ins>That’s all we know.</ins>
```

- **method와 status는 개발자가 결정해줘야한다.

- https : secured. 보안적으로 암호화가 된 사이트. 택스트가 암호화되어 있어 요청응답이. 누가 snipping 해도 암호화 되어 있어서 몰라.

## HTTP Methods

#### GET

- 검색! 데이터를 가져옴. 데이터를 서버로 부터 받아(GET)올때 주로 사용하는 Method
- 데이터 생성/수정/삭제 없이 받아오기만 할때 사용된다.
- request에 body를 안 보내는 경우가 많다.

#### POST

- 데이터를 생성/수정/삭제 할때 주로 사용되는 Method
- 대부분의 경우 request body가 포함되서 보내진다.

#### OPTIONS

- 주로 요청 URI에서 사용할 수 있는 Method를 받아올때 사용된다.
- 예를 들어, `/update` uri에서 어떤 method를 요청 가능한가(`GET`? `POST`?)를 알고 싶으면 먼저 `OPTIONS` 요청을 사용해서 확인하게 된다.

```bash
http -v OPTIONS http://example.org

OPTIONS / HTTP/1.1   #target은 root(/)에다가 보냄
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 0
Host: example.org
User-Agent: HTTPie/0.9.3



HTTP/1.1 200 OK
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Content-Length: 0
Date: Mon, 20 Aug 2018 08:37:45 GMT
Expires: Mon, 27 Aug 2018 08:37:45 GMT
Server: EOS (vny006/0450)
```

#### PUT

- `POST`와 비슷하다. 데이터를 생성 할때 사용되는 Method.
- `POST`와 겹치기 때문에 `PUT`을 사용하는 곳도 있고 `POST`로 통일해서 사용하는 곳도 있는데, 최근 몇년 사이에 `POST`에 밀려서 잘 사용안되는 추세.

#### DELETE

- 특정 데이터를 서버에서 삭제 요청을 보낼때 쓰이는 Method
- `PUT`과 마찬가지로 `POST`에 밀려서 잘 사용안되는 추세.

## HTTP Status Code

#### 200 OK

- 가장 자주 보게되는 status code.
- 문제없이 다 잘 실행 되었을때 보내는 코드.

#### 301 Moved Permanently

- 해당 URI가 다른 주소로 바뀌었을때 보내는 코드.

```bash
HTTP/1.1 301 Moved Permanently
Location: http://www.example.org/index.asp
```

#### 400 Bad Request; 프론트에서 걸러줘야해

- 해당 요청이 잘못된 요청일 때 보내는 코드.
- 주로 요청에 포함된 input 값들이 잘못된 값들이 보내졌을때 사용되는 코드.

    ex) 예를 들어, 전화번호를 보내야 되는데 text가 보내졌을때 등등

#### 401 Unauthorized

- 비밀번호 잘못 입력했을 때
- 유저가 해당 요청을 진행 할려면 먼저 로그인을 하거나 회원 가입을 하거나 등등이 필요하다는것을 나타내려 할때 쓰이는 코드.

#### 403 Forbidden

- 로그인은 했어. 근데 결제를 안했거나 admin 페이지 접근하려 한다거나.
- 유저가 해당 요청에 대한 권한이 없다는 뜻.
- 예를 들어, 오직 과금을 한 유저만 볼 수 있는 데이터를 요청 했을때 등.

#### 404 Not Found

- 해당 host에 요청된 uri가 존재 하지 않는다는 뜻.
- host부터 잘못됐으면 요청이 안갔거나 다른 서버로 간다.

```bash
http -v google.com/no-such-uri

GET /no-such-uri HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: google.com
User-Agent: HTTPie/0.9.3

HTTP/1.1 404 Not Found
Content-Length: 1572
Content-Type: text/html; charset=UTF-8
Date: Mon, 20 Aug 2018 08:46:48 GMT
Referrer-Policy: no-referrer
```

#### 500 Internal Server Error

- 서버에서 에러가 났을때 사용되는 코드.
- API 개발을 하는 백앤드 개발자들이 싫어하는 코드.

참조: [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

```
Reference:
https://stackoverflow.com/c/wecode/questions/308
```