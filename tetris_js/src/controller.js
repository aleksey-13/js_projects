export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlay = false;
    this.interval = null;

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);

    this.view.renderStartScreen();
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.gameOver();
    } else {
      if (!this.isPlay) {
        this.view.renderPauseScreen();
      } else {
        this.view.renderMainScreen(state);
      }
    }
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  pause() {
    this.isPlay = false;
    this.stopTimer();
    this.updateView();
  }

  play() {
    this.isPlay = true;
    this.startTimer();
    this.updateView();
  }

  gameOver() {
    this.view.renderEndScreen(this.game.getState());

    this.stopTimer();
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100;
    if (!this.interval) {
      this.interval = setInterval(() => this.update(), speed > 0 ? speed : 100);
    }
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handleKeyDown = (e) => {
    const state = this.game.getState();

    switch (e.keyCode) {
      case 13: // ENTER ARR
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlay) {
          this.pause();
        } else {
          this.play();
        }
        break;
      case 37: // LEFT ARR
        this.game.movePieceLeft();
        this.updateView();
        break;
      case 38: // UP ARR
        this.game.rotatePiece();
        this.updateView();
        break;
      case 39: // RIGHT ARR
        this.game.movePieceRight();
        this.updateView();
        break;
      case 40: // DOWN ARR
        this.stopTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
    }
  };

  handleKeyUp = (e) => {
    switch (e.keyCode) {
      case 40: // DOWN ARR
        this.startTimer();
        break;
    }
  };

  reset() {
    this.game.reset();
    this.play();
  }
}
