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
![image](https://user-images.githubusercontent.com/4979560/94512307-b01bff80-0256-11eb-8869-3d9d94e7e5d6.png)



## Todos

- refactoring
  - GameOverPanel -> Ranking Score Panel and remove GameOverPanel
  - Game 종료 조건 오류
    - 맨 윗칸 한줄만 남은 경우 무한 nextTick
- features
  - improve design
    - next block view
    - score, level
    - panel
    - game over view
    - clear view
  - next block view
  - score / stage / speed
  - save score
  - ranking panel
  - controll view
- improvement
  - checking game over logic
  - clear/adjust line animation/effect
  - continueus key input and space key action
