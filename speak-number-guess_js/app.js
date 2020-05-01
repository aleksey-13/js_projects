const msgEl = document.getElementById('msg')

const randomNum = getRandomNumber()

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

console.log('Number:', randomNum)

let recognition = new window.SpeechRecognition()

// Start recognition and game
recognition.start()

function onSpeak(e) {
    const msg = e.results[0][0].transcript

    writeMessage(msg)
    checkNumber(msg)
}

function writeMessage(value) {
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${value}</span>
    `
}

function checkNumber(value) {
    const number = +value

    if (isNaN(number)) {
        msgEl.innerHTML += '<div>That is not valid number</div>'
        return
    }

    if (number > 100 || number < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 - 100!</div>'
        return
    }

    if (number === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number! <br><br> It was ${number}</h2>  
            <button class="play-again" id="play-again">Play Again</button>  
        `

        recognition.removeEventListener('end', recStart)
    }

    if (number < randomNum) {
        msgEl.innerHTML += '<div>Go lower</div>'
    } else if (number > randomNum) {
        msgEl.innerHTML += '<div>Go higher</div>'
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

function recStart() {
    recognition.start()
}

// Speak result
recognition.addEventListener('result', onSpeak)

// End SR service
recognition.addEventListener('end', recStart)

document.body.addEventListener('click', (e) => {
    if (e.target.id === 'play-again') {
        window.location.reload()
    }

})
