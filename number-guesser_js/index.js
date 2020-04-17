// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNumber(min, max),
  guessesLeft = 3;

// UI elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.getElementById("guess-btn"),
  guessInput = document.getElementById("guess-input"),
  messageInfo = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMassage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    //Game over - won
    gameOver(true, "Yoy win!");
  } else {
    // Wrong number
    guessesLeft--;

    if (guessesLeft === 0) {
      //Game over - lost
      gameOver(false, `Yoy lose! The correct answer was ${winningNum}`);
    } else {
      // Game continues
      setMassage(
        `${guess} is not correct, you have, ${guessesLeft} guesses left`,
        "red"
      );

      guessInput.value = "";
    }
  }
});

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

function setMassage(message, color) {
  messageInfo.style.color = color;
  messageInfo.textContent = message;
}

function gameOver(won, msg) {
  const isWonColor = won ? "green" : "red";

  guessInput.disabled = true;
  guessInput.style.borderColor = isWonColor;

  guessBtn.value = "PLAY AGAIN";
  guessBtn.className += "play-again";

  setMassage(msg, isWonColor);
}

function getRandomNumber(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
