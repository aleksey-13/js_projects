const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const canvas = document.getElementById('canvas')
const rules = document.getElementById('rules')

let score = 0

const brickRowCount = 9
const brickColumnCount = 5

rulesBtn.addEventListener('click', () => rules.classList.add('show'))
closeBtn.addEventListener('click', () => rules.classList.remove('show'))


// Create canvas context
const ctx = canvas.getContext('2d')

// Create ball props 
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

// Create paddle props 
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

// Create brick props 
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create bricks
const bricks = []

for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []

    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        
        bricks[i][j] = { x, y, ...brickInfo }
    }
}

// Draw ball on canvas 
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

// Draw score on canvas
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// Draw brigs on canvas
function drawBrigs() {
    bricks.forEach(column => {
        column.forEach(brick => {
            const {w, h, x, y, visible} = brick
            ctx.beginPath()
            ctx.rect(x, y, w, h)
            ctx.fillStyle = visible ? '#0095dd' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

// Move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx
    
    // Wall detection
    if (paddle.x + paddle.w > canvas.width - 5) {
        paddle.x = canvas.width - paddle.w - 5
    }

    if (paddle.x < 5) {
        paddle.x = 5
    }
}

function moveBall() {
    ball.x += ball.dx
    ball.y += ball.dy

    // Wall collision (x)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    } 

    // Wall collision (y)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }

    if (ball.x - ball.size > paddle.x && 
        ball.x + ball.size < paddle.x + paddle.w && 
        ball.y + ball.size > paddle.y)  {
        ball.dy = -ball.speed
    }

    // Brick collision
    bricks.forEach(collumn => {
        collumn.forEach(brick => {
            const {w, h, x, y, visible} = brick
            if (visible) {
                if (ball.x - ball.size > x && 
                    ball.x + ball.size < x + w && 
                    ball.y + ball.size > y &&
                    ball.y - ball.size < y + h)  {
                    ball.dy *= -1
                    brick.visible = false

                    increaseScore()
                }
            }
        })
    })

    // Hit bottom wall - Lose 
    if (ball.y + ball.size > canvas.height) {
        showAllBricks()
        score = 0
    }
}

function increaseScore() {
    score++

    if (score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks()
    }
}

function showAllBricks() {
    bricks.forEach(column => column.forEach(brick => brick.visible = true))
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()
    drawScore()
    drawBrigs()
}

// Update canvas drawing and animation
function update() {
    movePaddle()
    moveBall()

    // Draw everything
    draw()

    requestAnimationFrame(update)
}

update()

function keyDown(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight' || 
        e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0
    }
}

// Keyboad event
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
