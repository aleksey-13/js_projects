import Game from "../src/game.js";
import View from "../src/view.js";
import Controller from "../src/controller.js";

const root = document.getElementById("root");

const configPlayField = {
  width: 480,
  height: 640,
  rows: 20,
  columns: 10,
};

const game = new Game();
const view = new View(root, configPlayField);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;
