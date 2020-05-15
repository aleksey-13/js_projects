import Game from "../src/game.js";
import View from "../src/view.js";

const root = document.getElementById("root");

const game = new Game();

const configPlayField = {
  width: 320,
  height: 640,
  rows: 20,
  columns: 10,
};

const view = new View(root, configPlayField);

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
