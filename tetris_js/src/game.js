export default class Game {
  score = 0;
  lines = 0;
  sizePlayField = {
    col: 10,
    row: 20,
  };
  playField = this.createPlayField();
  activePiece = this.createPiece();
  nextPiece = this.createPiece();

  get level() {
    return Math.floor(this.lines * 0.1);
  }

  createPlayField() {
    const playField = [];
    const { row, col } = this.sizePlayField;

    for (let r = 0; r < row; r++) {
      playField.push([]);
      for (let c = 0; c < col; c++) {
        playField[r].push(0);
      }
    }

    return playField;
  }

  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = "IJLOSTZ"[index];
    const piece = {};

    switch (type) {
      case "I":
        piece.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;
      case "J":
        piece.blocks = [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2],
        ];
        break;
      case "L":
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0],
        ];
        break;
      case "O":
        piece.blocks = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0],
        ];
        break;
      case "S":
        piece.blocks = [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0],
        ];
        break;
      case "T":
        piece.blocks = [
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0],
        ];
        break;
      case "Z":
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7],
        ];
        break;
      default:
        throw new Error("Неизестный тип фигуры");
    }

    piece.x = Math.floor((this.sizePlayField.col - piece.blocks[0].length) / 2);
    piece.y = -1;

    return piece;
  }

  getState() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;
    const playField = this.createPlayField();

    for (let y = 0; y < this.playField.length; y++) {
      playField[y] = [];
      for (let x = 0; x < this.playField[y].length; x++) {
        playField[y][x] = this.playField[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playField[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }

    return {
      score: this.score,
      level: this.level,
      lines: this.lines,
      nextPiece: this.nextPiece,
      playField,
    };
  }

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      this.updatePieces();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
    }
  }

  rotatePiece() {
    // Variant I
    /* this.activePiece.rotationIndex = (this.activePiece.rotationIndex + 1) % 4;

    if (this.hasCollision()) {
      this.activePiece.rotationIndex =
        this.activePiece.rotationIndex > 0
          ? this.activePiece.rotationIndex - 1
          : 3;
    }*/

    // Variant II
    /* const { blocks } = this.activePiece;
    const length = blocks.length;
    const temp = [];

    for (let i = 0; i < length; i++) {
      temp[i] = new Array(length).fill(0);
    }

    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        temp[x][y] = blocks[length - 1 - y][x];
      }
    }

    this.activePiece.blocks = [...temp];

    if (this.hasCollision()) {
      this.activePiece.blocks = [...blocks];
    }*/

    // Variant III
    this.rotateBlocks();

    if (this.hasCollision()) {
      this.rotateBlocks(false);
    }
  }

  rotateBlocks(clockwise = true) {
    const { blocks } = this.activePiece;
    const length = blocks.length;
    const x = Math.floor(length / 2);
    const y = length - 1;

    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        const temp = blocks[i][j];

        if (clockwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  }

  hasCollision() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          (this.playField[pieceY + y] === undefined ||
            this.playField[pieceY + y][pieceX + x] === undefined ||
            this.playField[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  lockPiece() {
    const { x: pieceX, y: pieceY, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playField[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }

  clearLines() {
    const { row, col } = this.sizePlayField;
    const lines = [];
    for (let r = row - 1; r >= 0; r--) {
      let counterBlocks = 0;

      for (let c = 0; c < col; c++) {
        if (this.playField[r][c]) {
          counterBlocks++;
        }
      }
      if (counterBlocks === 0) {
        break;
      }

      if (counterBlocks === col) {
        lines.unshift(r);
      }
    }

    for (let index of lines) {
      this.playField.splice(index, 1);
      this.playField.unshift(new Array(col).fill(0));
    }

    return lines.length;
  }

  updateScore(clearedLines) {
    const points = {
      "1": 40,
      "2": 100,
      "3": 300,
      "4": 1200,
    };

    if (clearedLines > 0) {
      this.lines += clearedLines;
      this.score += points[clearedLines] * (this.level + 1);
    }
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}
