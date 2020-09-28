import { sel } from "./native/Utils.js";
import Game from "./host/Game.js";
import TitlePanel from "./native/panel/TitlePanel.js";
import IntroPanel from "./native/panel/IntroPanel.js";
import PlayPanel from "./native/panel/PlayPanel.js";
import GameOverPanel from "./native/panel/GameOverPanel.js";

const App = (() => {
  const initGame = () => {
    const game = new Game(sel("#game"));

    game.addPanel(Game.title, new TitlePanel());
    game.addPanel(Game.intro, new IntroPanel());
    game.addPanel(Game.play, new PlayPanel());
    game.addPanel(Game.gameOver, new GameOverPanel());

    game.setState(Game.title);
  };

  const init = () => {
    initGame();
  };

  return {
    init: init,
  };
})();

App.init();
