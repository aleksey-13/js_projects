const draggableList = document.getElementById('draggable-list')
const checkBtn = document.getElementById('check')

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]

const listItems = []

let dragStartIdx

function createList() {
    richestPeople
        .map(person => ({ value: person, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(personData => personData.value)
        .forEach((person, idx) => {
            const item = document.createElement('li')
            item.setAttribute('data-index', idx)
            item.innerHTML = `
                <span class="number">${idx + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `
            listItems.push(item)
            draggableList.appendChild(item)
        })

    addEventListeners()
}

function dragStart() {
    dragStartIdx = +this.closest('li').getAttribute('data-index')
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop() {
    const dragEndIdx = +this.getAttribute('data-index')
    swapItems(dragStartIdx, dragEndIdx)

    this.classList.remove('over')
}

function dragEnter() {
    this.classList.add('over')
}

function dragLeave() {
    this.classList.remove('over')
}

function swapItems(fromIdx, toIdx) {
    const itemOne = listItems[fromIdx].querySelector('.draggable')
    const itemTwo = listItems[toIdx].querySelector('.draggable')

    listItems[fromIdx].appendChild(itemTwo)
    listItems[toIdx].appendChild(itemOne)
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

createList()

function checkOrder() {
    listItems.forEach((item, idx) => {
        const presonName = item.querySelector('.draggable .person-name').textContent
        
        if (presonName === richestPeople[idx]) {
            item.classList.add('right')
        } else {
            item.classList.add('wrong')
        }

        setTimeout(() => {
            item.classList.remove('right')
            item.classList.remove('wrong')
        }, 3000)
    })
}

checkBtn.addEventListener('click', checkOrder)
