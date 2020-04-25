const settingsBtn = document.getElementById('settings-btn')
const settingsForm = document.getElementById('settings-form')
const settings = document.getElementById('settings')
const difficultySelect = document.getElementById('difficulty')
const wordEl = document.getElementById('word')
const textEl = document.getElementById('text')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const endGameContainer = document.getElementById('end-game-container')

const wordsArr = [ 'area', 'argue', 'arm', 'around', 'arrive', 'art', 'article', 'artist', 'beautiful', 'because', 'become', 'bed', 
    'before', 'begin', 'behavior', 'behind', 'believe', 'benefit', 'best', 'better', 'between', 'beyond' ]

let randomWord
let score = 0
let time = 10
let difficulty = localStorage.getItem('difficulty') || 'easy'

const timeInterval = setInterval(updateTimeToDOM, 1000)

timeEl.textContent = time + 's'

difficultySelect.value = difficulty

textEl.addEventListener('input', checkCorrectlyWord)
textEl.focus()

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

settingsForm.addEventListener('change', changeLevelGame)

function getRandomWord(words) {
    const rndIdx = Math.floor(Math.random() * words.length)
    return words[rndIdx]
}

function addWordToDOM() {
    randomWord = getRandomWord(wordsArr)
    wordEl.textContent = randomWord
}

function updateScoreToDOM() {
    score++
    scoreEl.textContent = score
}

function updateTimeToDOM() {
    if (time > 0) {
        time--
        timeEl.textContent = time + 's'
    } else {
        clearInterval(timeInterval)
        gameOver()
    }
}

function checkCorrectlyWord(e) {
    const text = e.target.value.trim()
    textEl.value = text

    if (text === randomWord) {
        addWordToDOM()
        updateScoreToDOM()
        textEl.value = ''

        if (difficulty === 'easy') {
            time += 8
        } else if (difficulty === 'medium') {
            time += 5
        } else if (difficulty === 'hard') {
            time += 2
        }

        updateTimeToDOM()
    }
}

function gameOver() {
    endGameContainer.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `
    endGameContainer.style.display = 'flex'
}

function changeLevelGame(e) {
    difficulty = e.target.value
    localStorage.setItem('difficulty', e.target.value)

    location.reload()
}

addWordToDOM()
