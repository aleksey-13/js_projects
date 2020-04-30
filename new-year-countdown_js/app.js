const yearEl = document.getElementById('year')
const countdownEl = document.getElementById('countdown')
const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const loadingEl = document.getElementById('loading')

const currentYear = new Date().getFullYear()

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`)

function calculateData() {
    const currentTime = new Date()
    const diff = newYearTime - currentTime

    const seconds = Math.floor(diff / 1000) % 60
    const minutes = Math.floor(diff / 1000 / 60) % 60
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24
    const days = Math.floor(diff / 1000 / 60 / 60 / 24) 

    return { seconds, minutes, hours, days }
}

function setData() {
    const { seconds, minutes, hours, days } = calculateData()

    yearEl.textContent = currentYear + 1
    secondsEl.textContent = seconds
    minutesEl.textContent = minutes
    hoursEl.textContent = hours
    daysEl.textContent = days
}

function init() {
    setTimeout(() => {
        loadingEl.remove()
        countdownEl.style.display = 'flex'
    }, 1000)

    setData()
}

init()

setInterval(setData, 1000);
