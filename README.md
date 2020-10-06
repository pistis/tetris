# tetris

> OOP 적인 사고 연습을 위해 테트리스를 만들어 봅니다.  
> 기존의 틀에 얽매이지 않기 위해 최대한 모르는 도메인으로 트레이닝 합니다.(게임 개발 알못)  
> 트레이닝 이므로 최대한 framework, library는 사용하지 않고 직접 구현합니다.  
> 이것저것 가능하면 최신 브라우저 기술이나 개발 환경을 도입해봅니다.

```
$ npm install -g http-server
$ cd src
$ http-server
$ open http://localhost:8080/
```

## Class Diagram

![image](https://github.com/pistis/tetris/blob/ranking_game_version/doc/class_diagram.png)

## Screenshot

![image](https://user-images.githubusercontent.com/4979560/95230394-cc163700-083c-11eb-9a4b-302d2347c077.png)


## Todos

- refactoring
  - GameOverPanel -> Ranking Score Panel and remove GameOverPanel
- features
  - save score (need server)
  - ranking panel (need server)
  - controll view
  - next three block
  - game over popup
- improve design
- improvement
  - block의 최종 도착지점 가이드라인 표시
  - clear/adjust line animation/effect
  - continueus key input and space key action
  - class diagram
    - https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml 로 해보자.
- 참고
  - 팩맨 만들기 https://www.youtube.com/watch?v=YBtzzVwrTeE&feature=youtu.be&fbclid=IwAR3ahXg6_vG9m22XyxJ57BYxQ74HF_B5MbFLb5SGkqbmXF_xKjG9EbgCJp4

### 참고 tetris game

- https://ko.y8.com/games/trixology
- https://ko.y8.com/games/tetris_pro

### tech

- front-end
  - html/css
    - view
  - js
    - 바닐라 with oop
- back-end
  - express
    - server
  - mongoose
    - database
  - pug
    - template engine
  - passport
    - sign up, log-in
- advanced
  - graphQL, typescript
