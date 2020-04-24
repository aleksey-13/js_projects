const filterInput = document.getElementById('filter')
const postsContainer = document.getElementById('posts-container')
const loader = document.querySelector('.loader')

let limit = 100
let page = 1

async function getPosts() {
    showLoading()
    const responce = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit},page=${page}`)
    const data = await responce.json()

    return data
}

async function renderPosts() {
    const posts = await getPosts()

    const postItems = posts.map((post) => {
        const { id, title, body } = post
        
        const postItem = `
            <div class="post">
                <div class="number">${id}</div>
                <div class="post-info">
                    <h2 class="post-title">${title}</h2>
                    <p class="post-body">${body}</p>
                </div>
            </div>`

        return postItem
    })

    postsContainer.innerHTML = postItems.join(' ')

    hideLoading()
}

function showLoading() {
    loader.classList.add('show')
}

function hideLoading() {
    loader.classList.remove('show')
}

renderPosts()

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement


    if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (limit >= 100) {
            return
        }

        limit += 10
        page++
        renderPosts()
    }

})

function filterPosts(e) {
    const value = e.target.value.toLowerCase()
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase()
    
        if (title.indexOf(value) > -1) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }

    })
}

filterInput.addEventListener('input', filterPosts)