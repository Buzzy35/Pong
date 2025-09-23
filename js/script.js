const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');
const scoreLabel = document.getElementById('score');
const rightButton = document.getElementById('droite');
const leftButton = document.getElementById('gauche');
const scoresTable = document.getElementById('scores');

const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    left: false,
    right: false,
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: '#ffffff',
    speed: 5,
    yDirection: 0,
    xDirection: 0,
}

const paddle = {
    x: (canvas.width / 2) - 50,
    y: canvas.height - 50,
    width: 70, height: 10,
    color: '#ffffff',
    speed: 6,
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function updateBall() {

    ball.x += ball.xDirection * ball.speed;
    ball.y += ball.yDirection * ball.speed;

    a = (Math.random() - 0.5) / 100;

    ball.xDirection += a;
    ball.yDirection += a;

    if ((ball.y + ball.radius >= paddle.y) && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width) {
        ball.yDirection = -ball.yDirection
        ball.y = paddle.y - ball.radius - 1;
    } else if (ball.x - ball.radius <= 0) {
        ball.xDirection = -ball.xDirection
        ball.x = ball.radius + 1;
    } else if (ball.x + ball.radius >= canvas.width) {
        ball.xDirection = -ball.xDirection
        ball.x = canvas.width - ball.radius - 1;
    } else if (ball.y - ball.radius <= 0) {
        ball.yDirection = -ball.yDirection
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
    if (keys.left) {
        paddle.x -= paddle.speed;
    }
    if (keys.ArrowRight) {
        paddle.x += paddle.speed;
    }
    if (keys.right) {
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
    if (game === true) {
        return;
    }
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.yDirection = Math.random() - 1;
    ball.xDirection = (Math.random() * 2) - 1;
    paddle.x = (canvas.width / 2) - 50;

    startTime = Date.now();
    game = true;
    update();
}

function endGame() {
    game = false;
    startButton.textContent = "Rejouer";
    console.log('endGame');

    scores = JSON.parse(localStorage.getItem("scores"));
    if (scores === null) {
        scores = [];
    }
    nom = prompt("Entrez votre nom");
    scores.push([nom, scoreLabel.innerHTML]);

    localStorage.setItem("scores", JSON.stringify(scores));
    afficherScores();
}

function afficherScores() {
    scores = JSON.parse(localStorage.getItem("scores"));

    scores.sort((a, b) => b[1] - a[1]);

    scoresTable.innerHTML = '<tr><td class="title">Nom</td><td class="title">Score</td></tr>';

    scores.forEach(score => {
        scoresTable.innerHTML += `<tr><td>${score[0]}</td><td>${score[1]}</td></tr>`
    })
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

rightButton.addEventListener('mousedown', e => {
    keys.right = true;
})

rightButton.addEventListener('mouseup', e => {
    keys.right = false;
})

rightButton.addEventListener('touchstart', e => {
    e.preventDefault();
    keys.right = true;
})

rightButton.addEventListener('touchend', e => {
    e.preventDefault();
    keys.right = false;
})

leftButton.addEventListener('mousedown', e => {
    keys.left = true;
})

leftButton.addEventListener('mouseup', e => {
    keys.left = false;
})

leftButton.addEventListener('touchstart', e => {
    e.preventDefault();
    keys.left = true;
})

leftButton.addEventListener('touchend', e => {
    e.preventDefault();
    keys.left = false;
})

document.addEventListener("contextmenu", (e) => e.preventDefault());


drawBall()
drawPaddle();
afficherScores();