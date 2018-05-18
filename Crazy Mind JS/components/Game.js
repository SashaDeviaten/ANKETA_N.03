'use strict';

// import './components/App.css';
import ColorTest from "./ColorTest";
import ShapeTest from "./ShapeTest";
import {restoreInfo, storeInfo} from "./getRecords";
import './gameOverBlock.css';

let tests = require('../tests.json');

function buildGame() {


    let testTypes = Object.keys(tests);
    testTypes = testTypes.concat(testTypes, testTypes);
    const RoundsAmount = testTypes.length;
    let testDOM, mainOption, rightAnswersAmount;

    let gameBlock = document.createElement('div');

    let correctAudio = new Audio;
    correctAudio.src = "./audio/correct.wav";

    function correctSound() {
        incorrectAudio.pause();
        correctAudio.currentTime = 0;
        correctAudio.play();
    }


    let incorrectAudio = new Audio;
    incorrectAudio.src = "./audio/incorrect.mp3";

    function incorrectSound() {
        correctAudio.pause();
        incorrectAudio.currentTime = 0;
        incorrectAudio.play();
    }

    let gameOverAudio = new Audio;
    gameOverAudio.src = "./audio/game-over.wav";

    function gameOverSound() {
        incorrectAudio.pause();
        gameOverAudio.play();
    }

    let winAudio = new Audio;
    winAudio.src = "./audio/win.wav";

    function winSound() {
        correctAudio.pause();
        winAudio.play();
    }

    let rounds = 0;
    let startTime = Date.now();
    buildNewTest();

    function buildNewTest() {
        let currentTest = testTypes.shift();
        gameBlock.innerHTML = '';
        switch (currentTest) {
            case "colorTest":
                [testDOM, mainOption, rightAnswersAmount] = new ColorTest(checkColorTestAnswer);
                gameBlock.appendChild(testDOM);
                testDOM.style.animationName = 'slowShow';
                break;

            case "shapeTest":
                [testDOM, mainOption, rightAnswersAmount] = new ShapeTest(checkShapeTestAnswer);
                gameBlock.appendChild(testDOM);
                testDOM.style.animationName = 'slowShow';
                break;
        }
    }


    let testRightAnswers = 0;
    let wrongAnswers = 0;

    function checkShapeTestAnswer(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.type === 'click') checkShapeTestText(e.currentTarget);
        if (e.type === 'contextmenu') checkShapeTestStyle(e.currentTarget);

    }

    function checkShapeTestStyle(elem) {
        if (elem.dataset.shape === mainOption) {
            correctSound();
            testRightAnswers++;
            hideAnswer(elem, '+')
        }
        else {
            wrongAnswers++;
            incorrectSound()
        }
        checkTest()
    }

    function checkShapeTestText(elem) {
        if (elem.dataset.text === mainOption) {
            correctSound();
            testRightAnswers++;
            hideAnswer(elem, '-')
        }
        else {
            wrongAnswers++;
            incorrectSound()
        }
        checkTest()
    }

    function checkColorTestAnswer(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.type === 'click') checkColorTestText(e.currentTarget);
        if (e.type === 'contextmenu') checkColorTestStyle(e.currentTarget);
    }

    function checkColorTestStyle(elem) {
        if (tests.colorTest[elem.style.color] === mainOption) {
            correctSound();
            testRightAnswers++;
            hideAnswer(elem, '+')
        }
        else {
            wrongAnswers++;
            incorrectSound()
        }
        checkTest()
    }

    function checkColorTestText(elem) {
        if (elem.innerHTML === mainOption) {
            correctSound();
            testRightAnswers++;
            hideAnswer(elem, '-')
        }
        else {
            wrongAnswers++;
            incorrectSound()
        }
        checkTest()
    }

    function checkTest() {
        if (wrongAnswers >= 4) { //право на три ошибки
            testRightAnswers = 0;
            gameBlock.removeChild(testDOM);
            gameBlock.appendChild(buildGameOverBlock('Are You out of your mind?!'));
            console.log('Game Over!!!');
            gameOverSound();
            setTimeout(()=>location.hash='Main',3000)
        }
        if (testRightAnswers === rightAnswersAmount) {
            testRightAnswers = 0;
            gameBlock.removeChild(testDOM);
            if (++rounds < RoundsAmount) {
                buildNewTest()
            }
            else {
                let endTime = Date.now();
                let gameTime = endTime - startTime;
                let seconds = Math.floor(gameTime / 1000);
                gameBlock.appendChild(buildGameOverBlock('Your win! Your time - '+seconds+ ' seconds'));
                setTimeout(()=>storeInfo(seconds),1500);
                console.log('Время игры - ' + seconds + ' секунд');
                winSound()
            }
        }

    }

    function hideAnswer(elem, sign) {
        elem.style.transform = "translateX(" + sign + elem.offsetWidth * 3.5 + "px)";
        elem.style.animationName = 'fade';
        elem.style.animationFillMode = 'forwards';
    }

    function buildGameOverBlock(text) {
        let gameOverBlock=document.createElement('div');
        gameOverBlock.className='gameOverBlock';
        let img=document.createElement('img');
        img.src="./images/are_you.png";
        gameOverBlock.appendChild(img);
        let textWrap=document.createElement('div');
        textWrap.innerHTML=text;
        gameOverBlock.appendChild(textWrap);
        return gameOverBlock

    }

    return gameBlock;

}

export {buildGame};

