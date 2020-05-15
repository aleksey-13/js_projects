import Game from "../src/game.js";
import View from "../src/view.js";

const root = document.getElementById("root");

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37: // LEFT ARR
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 38: // UP ARR
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 39: // RIGHT ARR
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 40: // RIGHT ARR
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
});
