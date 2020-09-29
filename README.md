# tetris

```
$ npm install -g http-server
$ cd src
$ http-server
$ open http://localhost:8080/
```

## Class Diagram
![image](https://github.com/pistis/tetris/blob/ranking_game_version/doc/class_diagram.png)


## Screenshot
![image](https://user-images.githubusercontent.com/4979560/94468772-ee3a0480-01ff-11eb-92a0-9d65027af49a.png)


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
