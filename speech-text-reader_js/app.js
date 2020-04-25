const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textarea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')
const textBox = document.getElementById('text-box')

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  },
  {
    image: './img/grandma.jpg',
    text: 'Как роза на навозе'
  }
]

function createBox(item) {
    const { image, text } = item

    const div = document.createElement('div')
    div.classList.add('box')
    div.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `

    div.addEventListener('click', () => {
        setTextMessage(text)
        speakText()

        // Add active effect
        div.classList.add('active')
        setTimeout(() => div.classList.remove('active'), 1000)
    })

    main.appendChild(div)
}

data.forEach(createBox)

// Init speech synth
const message = new SpeechSynthesisUtterance()


function toggleModal() {
    textBox.classList.toggle('show')
}
// Toggle text box
toggleBtn.addEventListener('click', toggleModal)
closeBtn.addEventListener('click', toggleModal)

let voices

function getVoices() {
    voices = speechSynthesis.getVoices()

    voices.forEach(voice => {
        const { name, lang } = voice

        const option = document.createElement('option')
        option.value = voice.name
        option.textContent = `${name} ${lang}`

        voicesSelect.appendChild(option)
    })
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

function setTextMessage(text) {
    message.text = text
}

function speakText() {
    speechSynthesis.speak(message)
}

voicesSelect.addEventListener('change', setVoise)

function setVoise(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value)
    speakText()
})

getVoices()
