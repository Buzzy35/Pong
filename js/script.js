const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');
const scoreLabel = document.getElementById('score');

const keys = {
    ArrowLeft: false, ArrowRight: false
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: '#000000',
    speed: 5,
    direction: Math.random() % Math.PI * 2,
}

const paddle = {
    x: (canvas.width / 2) - 50,
    y: canvas.height - 50,
    width: 100,
    height: 10,
    color: '#1a57ca',
    speed: 5,
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // x, y, rayon, angleDébut, angleFin
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function updateBall() {
    ball.x = ball.x + (ball.speed * Math.cos(ball.direction));
    ball.y = ball.y + (ball.speed * Math.sin(ball.direction));

    if ((ball.y + ball.radius >= paddle.y) && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
        ball.direction = (Math.PI - ball.direction) % Math.PI * 2;
        ball.y = paddle.y - ball.radius - 1;
    } else if (ball.x - ball.radius <= 0) {
        ball.direction = (Math.PI - ball.direction) % Math.PI * 2;
        ball.x = ball.radius + 1;
    } else if (ball.x + ball.radius >= canvas.width) {
        ball.direction = (Math.PI - ball.direction) % Math.PI * 2;
        ball.x = canvas.width - ball.radius - 1;
    } else if (ball.y - ball.radius <= 0) {
        ball.direction = (ball.direction + 2 * Math.PI) % Math.PI * 2;
        ball.y = ball.radius + 1;
    } else if (ball.y + ball.radius >= canvas.height) {
        game = false;
    }
    drawBall()
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
}

function updatePaddle() {
    if (keys.ArrowLeft) {
        paddle.x -= paddle.speed;
    }
    if (keys.ArrowRight) {
        paddle.x += paddle.speed;
    }
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    drawPaddle();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBall();
    updatePaddle();
    scoreLabel.innerHTML = (Date.now() - startTime) / 1000;
    if (game) {
        requestAnimationFrame(update);
    } else {
        endGame()
    }
}

function startGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.direction = Math.random() % Math.PI * 2;
    paddle.x = (canvas.width / 2) - 50;

    startTime = Date.now();
    game = true;
    update();
}

function endGame() {
    startButton.textContent = "Rejouer";
    console.log('endGame');
}

startButton.addEventListener('click', startGame);


document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = false;
    }
});


drawBall()
drawPaddle();

