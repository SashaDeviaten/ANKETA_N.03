'use strict';

let ballSpeedX;
let ballSpeedY;
let leftPlayerSpeed;
let rightPlayerSpeed;


let FIELD_WIDTH = 600;
let FIELD_HEIGHT = FIELD_WIDTH / 2;

let BALL_DIAMETER = FIELD_WIDTH / 25;

let RACKET_WIDTH = FIELD_WIDTH / 60;
let RACKET_HEIGHT = FIELD_WIDTH / 8;

let timer;
let timeOut;
let oldBrowserTimeOut;
let RAF_ID;


let RAF =
    // находим, какой метод доступен
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    // ни один не доступен
    // будем работать просто по таймеру
    function (callback) {
        oldBrowserTimeOut = window.setTimeout(callback, 1000 / 60);
    }
;

let container = document.querySelector('div.container');

let scoreboard = document.createElement('p');
scoreboard.className = 'scoreboard';
let leftPlayerWins = 0;
let rightPlayerWins = 0;
updateScore();
container.appendChild(scoreboard);


let field = document.createElement('div');
field.className = 'field';
field.style.width = FIELD_WIDTH + 'px';
field.style.height = FIELD_HEIGHT + 'px';
container.appendChild(field);

let leftPlayer = document.createElement('div');
leftPlayer.className = 'leftPlayer';

leftPlayer.style.width = RACKET_WIDTH + 'px';
leftPlayer.style.height = RACKET_HEIGHT + 'px';
field.appendChild(leftPlayer);

let rightPlayer = document.createElement('div');
rightPlayer.className = 'rightPlayer';

rightPlayer.style.width = RACKET_WIDTH + 'px';
rightPlayer.style.height = RACKET_HEIGHT + 'px';
field.appendChild(rightPlayer);

let ball = document.createElement('div');

ball.className = 'ball';
ball.style.width = BALL_DIAMETER + 'px';
ball.style.height = BALL_DIAMETER + 'px';
field.appendChild(ball);

let startGameBtn = document.createElement('button');
startGameBtn.className = 'btn';
container.appendChild(startGameBtn);
startGameBtn.innerHTML = 'Start new game';

window.addEventListener('keydown', playerMove);
window.addEventListener('keyup', playerStop);

startGameBtn.addEventListener('click', startNewGame);

function startNewGame() {
    (window.cancelAnimationFrame(RAF_ID) ||
    window.webkitCancelAnimationFrame(RAF_ID) ||
    clearTimeout(oldBrowserTimeOut));  //не кроссбраузерно
    leftPlayerWins = 0;
    rightPlayerWins = 0;
    updateScore();
    setInitialConditions();
    clearInterval(timer);
    clearTimeout(timeOut);
}

function moveBall() {
    RAF_ID = RAF(updatePositions);
}

function updatePositions() {

    leftPlayer.posY += leftPlayerSpeed;
    if (leftPlayer.posY > FIELD_HEIGHT - RACKET_HEIGHT) leftPlayer.posY = FIELD_HEIGHT - RACKET_HEIGHT;
    else if (leftPlayer.posY < 0) leftPlayer.posY = 0;
    leftPlayer.style.top = leftPlayer.posY + 'px';

    rightPlayer.posY += rightPlayerSpeed;
    if (rightPlayer.posY > FIELD_HEIGHT - RACKET_HEIGHT) rightPlayer.posY = FIELD_HEIGHT - RACKET_HEIGHT;
    else if (rightPlayer.posY < 0) rightPlayer.posY = 0;
    rightPlayer.style.top = rightPlayer.posY + 'px';

    if (ball.posX >= FIELD_WIDTH - BALL_DIAMETER - RACKET_WIDTH && (ball.posY + BALL_DIAMETER >= rightPlayer.posY && ball.posY <= rightPlayer.posY + RACKET_HEIGHT))
        ballSpeedX = -(ballSpeedX * 1.05);  //ускорение после отбивания на 5%
    else if (ball.posX <= RACKET_WIDTH && (ball.posY + BALL_DIAMETER >= leftPlayer.posY && ball.posY <= leftPlayer.posY + RACKET_HEIGHT))
        ballSpeedX = -(ballSpeedX * 1.05);
    else if (ball.posX >= FIELD_WIDTH - BALL_DIAMETER) {
        ball.style.left = FIELD_WIDTH - BALL_DIAMETER + 'px';
        return win(leftPlayer)
    }
    else if (ball.posX <= 0) {
        ball.style.left = 0 + 'px';
        return win(rightPlayer);
    }

    if (ball.posY >= FIELD_HEIGHT - BALL_DIAMETER || ball.posY <= 0) ballSpeedY = -ballSpeedY;

    ball.posX += ballSpeedX;
    ball.style.left = ball.posX + 'px';

    ball.posY += ballSpeedY;
    ball.style.top = ball.posY + 'px';

    moveBall()
}

function win(winner) {

    timer = setInterval(ballFlashing, 400);
    timeOut = setTimeout(startNewRound, 3000);
    if (winner === leftPlayer) leftPlayerWins++;
    else rightPlayerWins++;
    updateScore()
}

function updateScore() {
    scoreboard.innerHTML = '';
    scoreboard.innerHTML = leftPlayerWins + ':' + rightPlayerWins;
}

let flag = true;

function ballFlashing() {

    flag = !flag;
    (flag) ? ball.style.display = 'block' : ball.style.display = 'none'
}

function startNewRound() {
    clearInterval(timer);
    setInitialConditions();
}

function setInitialConditions() {
    flag = true;
    ball.style.display = 'block';

    ball.posX = (FIELD_WIDTH - BALL_DIAMETER) / 2;
    ball.posY = (FIELD_HEIGHT - BALL_DIAMETER) / 2;

    ballSpeedY = Math.floor(Math.random() * 3) + 1; //начальная скорость по оси Y от 1 до 3
    ballSpeedX = 5 - ballSpeedY; //начальная сумма скоростей по осям = 5


    let randomBool = Math.floor(Math.random() * 2);
    if (randomBool) ballSpeedX = -ballSpeedX;
    randomBool = Math.floor(Math.random() * 2);
    if (randomBool) ballSpeedY = -ballSpeedY;

    leftPlayer.posY = (FIELD_HEIGHT - RACKET_HEIGHT) / 2;
    rightPlayer.posY = (FIELD_HEIGHT - RACKET_HEIGHT) / 2;

    leftPlayerSpeed = 0;
    rightPlayerSpeed = 0;

    moveBall()
}

function playerMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    switch (EO.keyCode) {
        case 16:
            leftPlayerSpeed = -3;
            break;

        case 17:
            leftPlayerSpeed = 3;
            break;

        case 38:
            rightPlayerSpeed = -3;
            break;

        case 40:
            rightPlayerSpeed = 3;
            break;
    }
}

function playerStop(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    switch (EO.keyCode) {
        case 16:
        case 17:
            leftPlayerSpeed = 0;
            break;

        case 38:
        case 40:
            rightPlayerSpeed = 0;
            break;
    }
}