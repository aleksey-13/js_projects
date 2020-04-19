const wrongLettersElement = document.getElementById("wrong-letters");
const wordElement = document.getElementById("word");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playButton = document.getElementById("play-button");
const notification = document.getElementById("notification-container");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "javascript", "dom", "gta"];

let selectedWord = setRandomWord();

const correctLetters = [];
const wrongLetters = [];

function setRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  const showCorrectLetters = selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join(" ");

  wordElement.innerHTML = showCorrectLetters;

  const innerWord = wordElement.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "You have won! :)";
    popup.style.display = "flex";
  }
}

function updateWrongLettersEl() {
  const wrongs = wrongLetters.join(" ").replace(/\s/g, ",");
  const title = wrongLetters.length > 0 ? "<p>Wrong</p>" : "";
  wrongLettersElement.innerHTML = `${title}<span>${wrongs}</span>`;

  figureParts.forEach((figure, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });

  if (wrongLetters.length >= figureParts.length) {
    finalMessage.innerText = "You lose! :(";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => notification.classList.remove("show"), 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLocaleLowerCase();
    if (
      selectedWord.indexOf(letter) !== -1 &&
      !correctLetters.includes(letter)
    ) {
      correctLetters.push(letter);
      displayWord();
    } else if (
      selectedWord.indexOf(letter) === -1 &&
      !wrongLetters.includes(letter)
    ) {
      wrongLetters.push(letter);

      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
});

playButton.addEventListener("click", () => {
  selectedWord = setRandomWord();

  correctLetters.length = 0;
  wrongLetters.length = 0;

  popup.style.display = "none";

  updateWrongLettersEl();
  displayWord();
});

displayWord();
