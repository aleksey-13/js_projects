const form = document.getElementById('form') // submit
const result = document.getElementById('result')
const more = document.getElementById('more') 
const searchInput = document.getElementById('search')

const corsApiHost = 'https://cors-anywhere.herokuapp.com/';
const apiURL = 'https://api.lyrics.ovh'

async function searchSong(term) {
    const responce = await fetch(`${apiURL}/suggest/${term}`)
    const data = await responce.json()

    renderDataSongToDOM(data)
}

function renderDataSongToDOM(data) {
    const list = document.createElement('ul')
    list.classList.add('songs')

    data.data.forEach(song => {
        const {title, artist} = song
        const li = document.createElement('li')
        li.innerHTML = `
            <span><strong>${artist.name}</strong> - ${title}</span>
            <button 
                class="btn" 
                data-artist="${artist.name}"
                data-songtitle="${title}"
            >
                Get Lyrics
            </button>
        `

        list.appendChild(li)
    })

    result.innerHTML = ''
    result.appendChild(list)

    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `
    } else { 
        more.innerHTML = ''
    }
}

async function getMoreSongs(url) {
    const responce = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await responce.json()

    renderDataSongToDOM(data)
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = searchInput.value.trim()

    
    if (searchTerm) {
        searchSong(searchTerm)
    } else {
        alert('Please type in a search term')
    }
})

async function getLyrics(artist, songTitle) {
    const responce = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
    const data = await responce.json()

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>        
    `
    more.innerHTML = ''
}

result.addEventListener('click', e => {
    const clickedEl = e.target
    if (clickedEl.tagName === 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist')
        const songTitle = clickedEl.getAttribute('data-songtitle')
       
        getLyrics(artist, songTitle)
    }

})



