const clearBtn = document.getElementById('clear')
const showBtn = document.getElementById('show')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const hideBtn = document.getElementById('hide')
const addCardBtn = document.getElementById('add-card')

const cardsContainer = document.getElementById('cards-container')
const addContainer = document.getElementById('add-container')
const currentEl = document.getElementById('current')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')

// Keep track of current card
let currentActiveCard = 0

// Store DOM card
const cards = []

const getCardsData = () => JSON.parse(localStorage.getItem('card-data'))
// Store card data
const cardsData = getCardsData() || []

// Create single card add add to DOM
const createCard = (data, index) => {
    const card = document.createElement('div')
    const isActive = index === 0 ? 'active' : ''

    card.className = `card ${isActive}`
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `

    card.addEventListener('click', () => card.classList.toggle('show-answer'))
    cards.push(card)

    cardsContainer.appendChild(card)

    updateCurrentText()
} 

// Create all cards 
const createCards = () => cardsData.forEach((data, idx) => createCard(data, idx))

// Show number of card
const updateCurrentText = () => currentEl.textContent = `${currentActiveCard + 1}/${cards.length}`

createCards()

nextBtn.addEventListener('click', () => {

    cards[currentActiveCard].className = 'card left'

    currentActiveCard++

    if (currentActiveCard > cards.length - 1) {
        currentActiveCard = cards.length - 1
    }

    cards[currentActiveCard].className = 'card active'
    
    updateCurrentText()
})

prevBtn.addEventListener('click', () => {

    cards[currentActiveCard].className = 'card right'

    currentActiveCard--

    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }

    cards[currentActiveCard].className = 'card active'
    
    updateCurrentText()
})

const toggleModal = () => addContainer.classList.toggle('show')

showBtn.addEventListener('click', toggleModal)
hideBtn.addEventListener('click', toggleModal)

const setCardDataInLS = (cards = cardsData) => localStorage.setItem('card-data', JSON.stringify(cards))

const addNewCard = () => {
    if (questionEl.value.trim() && answerEl.value.trim()) {
        const newCardData = {question: questionEl.value, answer: answerEl.value}
        
        cardsData.push(newCardData)
        
        setCardDataInLS()
    
        createCard(newCardData)
    
        answerEl.value = ''
        questionEl.value = ''

        addContainer.classList.remove('show')
    }
}

addCardBtn.addEventListener('click', addNewCard)

const deleteCards = () => {
    localStorage.removeItem('card-data')
    window.location.reload()
}

clearBtn.addEventListener('click', deleteCards)
