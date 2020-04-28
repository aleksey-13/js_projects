const container = document.getElementById('container')
const textEl = document.getElementById('text')

const totalTime = 7500
const breathTime = (totalTime / 5) * 2
const holdTime = totalTime / 5

breathAnimation()

function breathAnimation() {
    textEl.textContent = 'Breathe In!'

    container.className = 'container grow'

    setTimeout(() => {
        textEl.textContent = 'Hold'
        
        setTimeout(() => {
            textEl.textContent = 'Breathe Out!'
            container.className = 'container shrink'
        }, holdTime)
    }, breathTime)
}

setInterval(breathAnimation, totalTime)
