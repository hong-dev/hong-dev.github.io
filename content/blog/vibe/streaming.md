---
title: "Audio 파일 streaming 방식으로 내보내기"
date: "2020-03-20T11:12:03.284Z"
template: "post"
draft: false
slug: "streaming"
category: "python"
tags:
  - "Python"
  - "Django"
  - "Project"
  - "Vibe"
  - "Stream"
description: "StreamingHttpResponse : Django에서 audio 파일을 streaming 방식으로 return 하기"
socialImage: ""
---


### MEDIA_ROOT
* 프로젝트 settings.py에서 파일이 있는 경로를 MEDIA_URL로 표시해준다.


```python
# vibe/settings.py

MEDIA_URL = './stream/'
MEDIA_ROOT= os.path.join(os.path.dirname(BASE_DIR), "media_root")
```



### StreamingHttpResponse
* django에서 HttpResponse, JsonResponse 말고 StreamingHttpResponse를 import 한다.


### data 읽어오기
* `open(file_path, mode, encoding)` : open할 파일경로, 파일 모드, 인코딩 방식 등을 지정할 수 있다.

#### 파일 모드
* `r` : 읽기 (default)
<p>
* `w` : 쓰기 (파일이 있으면 모든 내용 삭제)
* `x` : 쓰기 (파일이 있으면 오류 발생)
* `a` : 쓰기 (파일이 있으면 뒤에 내용을 추가)
<p>
* `+` : 읽기쓰기
<p>
* `t` : 텍스트 모드 (default)
* `b` : 바이너리 모드


### Content-Disposition
* Unit test를 위해 filename을 적어두었다.\
내 짧은 지식으로는 스트리밍 기능을 어떻게 유닛테스트를 돌려야할 지 도저히 판단이 안 섰기 때문에, filename과 content-length로 테스트를 구현했다.

### Accept-Ranges / Content-Length
* 스트리밍 방식으로 음악은 보내줬지만, 중간을 클릭해서 중간부터 듣는 seek 기능(오디오 탐색 기능)이 작동이 안 되었다.\
특이한 점은 Firefox에서는 작동이 되는데 Chrome에서는 되지 않았다.
* `HTTP Range Requests` : HTTP Response Headers에 `Accept-Ranges` 항목이 있으면 해당 서버가 range 요청을 지원하는 상태인 것이다.
* Chrome의 경우에는 Accept-Ranges를 추가해서 작성했더니 정상적으로 오디오 탐색이 가능해졌다.\
다만, Content-Length도 필요했다. 재생 길이를 알아야 range가 성립되는 것일까? 왜인지는 좀 더 고민해봐야 할 문제다.

### Duration(재생시간)
* 노래마다 재생시간이 있는데, front-end에서 발견한 바로는 Safari에서는 재생시간이 안 나오는데, Chrome에서는 자동으로 재생시간을 받을 수 있었다고 한다.\
이 프로젝트의 경우에는 Chrome으로 진행해서 별 문제가 없었지만, 브라우저마다 다르게 적용되는 것들도 체크할 필요가 있겠다.


```python
# music/views.py

from django.http import JsonResponse, StreamingHttpResponse

class MusicStreamView(View):
    def get(self, request, music_id):
        try:
            music    = Music.objects.get(id = music_id)
            content  = MEDIA_URL + f"{music_id}.mp3"
            response = StreamingHttpResponse(self.iterator(content), status = 200)

            response['Cache-Control']       = 'no-cache'
            response['Content-Disposition'] = f'filename = {music_id}.mp3'
            response['Content-Type']        = 'audio/mp3'
            response['Content-Length']      = len(open(content,'rb').read())
            response['Accept-Ranges']       = 'bytes'
            return response

        except Music.DoesNotExist:
            return JsonResponse({"message": "MUSIC_DOES_NOT_EXIST"}, status = 400)

        except FileNotFoundError:
            return JsonResponse({"message": "FILE_DOES_NOT_EXIST"}, status = 400)

    def iterator(self, content):
        with open(content, 'rb') as music:
            while True:
                read_music = music.read()
                if read_music:
                    yield read_music
                else:
                    break

```


---


**Reference:**\
[[SoundHub] HTTP Range Requests](https://nachwon.github.io/byterange/)\
[MDN: Range-Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)\
[MDN: Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
