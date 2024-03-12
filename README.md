# react_emotional_diary
리액트 스터디 프로젝트 2

## json-server 사용 방법
프로젝트 경로 내에 db.json 파일 생성 후 아래 명령어 수행
``` bash
npx json-server --port 9999 --watch db.json
```
## .env.local 세팅
스프링으로 치면 .properties 파일과 같은 개념.
전체적으로 사용되는 호스트네임 등과 같은 설정값을 저장해놓고 변수로 불러서 사용한다.
```properties
#.env.localg
[변수명]=[값]
```
client-side rendering 페이지에서 env 변수를 사용하기 위해서는
변수명을 다음과 같이 설정한다
```properties
#.env.local
NEXT_PUBLIC_[변수명]=[값]
```
