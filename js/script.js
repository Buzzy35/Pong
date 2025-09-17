const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: '#000000',
    speed: 1,
    direction: Math.random() % Math.PI * 2,
}

const paddle = {
    x: (canvas.width / 2) - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
    color: '#1a57ca',
    speed: 1,
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // x, y, rayon, angleDébut, angleFin
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function updateBall() {
    ball.x = ball.x + (10 * ball.speed * Math.cos(ball.direction));
    ball.y = ball.y + (10 * ball.speed * Math.sin(ball.direction));
    drawBall()
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
}

function updatePaddle(direction) {
    paddle.x += direction * 10;
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    drawPaddle()
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBall();
    drawPaddle();
}

function game() {
    update()
    timer = requestAnimationFrame(game);
}

startButton.addEventListener('click', game);

document.addEventListener('keydown', evt => {
    switch (evt.key) {
        case 'ArrowRight':
            updatePaddle(1);
            break;
        case 'ArrowLeft':
            updatePaddle(-1);
            break;
    }
})


drawBall()
drawPaddle();

