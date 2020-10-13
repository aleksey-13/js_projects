const app = document.getElementById('app')
const list  = app.querySelector('[data-type="list"]')
const input = app.querySelector('[data-type="input"]')
const label = app.querySelector('[data-type="label"]')

let userName = ''
let numOfAttempts = 0
const secretNumber = Math.floor(Math.random() * 100) + 1

input.addEventListener('keyup', inputHandler)
input.focus()

addMessage('Введите имя игрока:')

function inputHandler(e) {
    if (e.key === 'Enter') {
        if (!userName) {
            userName = input.value
            list.innerHTML = ''
            addMessage(`${userName}, загадано число от 0 до 100. Пропробуй отгадать его за наименьшее количество попыток. После каждой попытки я скажу "мало", "много" или "верно".`)
        } else {
            numOfAttempts++
            const number = +input.value

            if (isValidNum(number)) {
                addMessage('Введенное значение не является числом!')
                input.value = ''
                return false
            }

            addMessage(number)
            if (secretNumber > number) {
                addMessage('Мало. Попробуй ещё раз')
            } else if (secretNumber < number) {
                addMessage('Много. Попробуй ещё раз')
            } else if (secretNumber === number) {
                addMessage(`Верно, это число ${secretNumber}`)
                addMessage(`Количество попыток ${numOfAttempts}`)
                addMessage('GAME OVER')
                input.removeEventListener('keyup', inputHandler)
                label.parentNode.removeChild(label)
            }
        }
        input.value = ''
    }
}

function addMessage(msg) {
    const li = document.createElement('li')
    li.textContent = msg
    list.appendChild(li)
}

function isValidNum(val) {
    return isNaN(val)
}
