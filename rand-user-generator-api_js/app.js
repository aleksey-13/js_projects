const addUser = document.getElementById('add-user');
const double = document.getElementById('double-money');
const onlyMillionaires = document.getElementById('only-millionaires');
const sort = document.getElementById('sort-by-richest');
const calculate = document.getElementById('calc-wealth');

const userList = document.getElementById('user-list');
const totalWealth = document.getElementById('total-wealth')

const data = []

async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api/')
    const data = await response.json()


    const user = {
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
        money: Math.floor(Math.random() * 1600000)
    }

    addData(user)
}

function addData(obj) {
    data.push(obj)

    updateDOM()
}

function updateDOM(providedData = data) {
    totalWealth.parentElement.classList.remove('show')
    userList.innerHTML = ''
    providedData.forEach(({name, money}) => userList.innerHTML += `<li><h4>${name}</h4><p>$${formatMoney(money)}</p></li>`)
}

function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ')
}

function doubleMoney() {
    const doubledMoney = data.map(({name, money}) => ({name, money: money * 2}))
    updateDOM(doubledMoney)
}

function showOnlyMillionaires() {
    const millionaires = data.filter(({money}) => money >= 1000000)
    updateDOM(millionaires)
}

function sortByRichest() {
    const sortedByRichest = data.sort((a, b) => a.money - b.money)
    updateDOM(sortedByRichest)
}

function calculateEntireWealth() {
    const calc = data.reduce((acc, val) => acc += val.money, 0)
    totalWealth.textContent = '$' + formatMoney(calc)

    totalWealth.parentElement.classList.add('show')
}

addUser.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
onlyMillionaires.addEventListener('click', showOnlyMillionaires)
sort.addEventListener('click', sortByRichest)
calculate.addEventListener('click', calculateEntireWealth)

