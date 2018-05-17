'use strict';

import './Test.css';
import {randomInt} from './randomInt.js'

let tests = require('../tests.json');

export default class ShapeTest {
    constructor(cbCheckAnswer) {
        this.test = tests.shapeTest;
        this.cbCheckAnswer = cbCheckAnswer;
        return this.render()
    }

    touchStart(e) {
        e.currentTarget.touchStartX=e.targetTouches[0].screenX;
        e.currentTarget.touchStartY=e.targetTouches[0].screenY;
    }
    touchEnd(e) {
        let deltaX=e.currentTarget.touchStartX-e.changedTouches[0].screenX;
        let deltaY=e.currentTarget.touchStartY-e.changedTouches[0].screenY;
        if (deltaX<0 && Math.abs(deltaX)>Math.abs(deltaY)) {
            let event = new Event("contextmenu");
            e.currentTarget.dispatchEvent(event)
        }
        if (deltaX>0 && Math.abs(deltaX)>Math.abs(deltaY)) {
            let event = new Event("click");
            e.currentTarget.dispatchEvent(event)
        }
    }

    drawSvg(shape, i) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svg.setAttribute("width", 300);
        svg.setAttribute("height", 100);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
        let textShape = document.createElementNS("http://www.w3.org/2000/svg", 'path');

        switch (shape) {
            case 'line':
                let randomLine = randomInt(25, 45);
                textShape.setAttribute("d", 'M 15 ' + randomLine + ' A 0 240 0 1 1 285 ' + randomLine);
                break;
            case 'path-top':
                textShape.setAttribute("d", 'M 30 75 A 70 30 0 1 1 270 75');
                break;
            case 'path-bottom':
                textShape.setAttribute("d", 'M 30 25 A 70 30 0 1 0 270 25');
                break;
        }
        textShape.setAttribute('fill', 'none');
        textShape.setAttribute('id', 'line_' + i);
        svg.appendChild(textShape);
        return svg;

    }

    render() {
        let testBlock = document.createElement('div');
        testBlock.className = 'testBlock';
        let question = document.createElement('div');
        question.className = 'question';
        let shapes = Object.keys(this.test);
        let texts = Object.values(this.test);
        let mainOption = texts[randomInt(0, texts.length - 1)];
        let questionHeader = document.createElement('div');
        questionHeader.className = 'questionHeader';
        questionHeader.innerHTML = 'Основной параметр:';
        let questionMainOption = document.createElement('div');
        questionMainOption.className = 'questionMainOption';
        questionMainOption.innerHTML = mainOption;
        question.appendChild(questionHeader);
        question.appendChild(questionMainOption);
        testBlock.appendChild(question);
        let rightAnswersAmount = 0;
        let amountToAdd = 9 - shapes.length;
        while (amountToAdd > 0) {
            shapes.splice(randomInt(0, shapes.length), 0, shapes[randomInt(0, shapes.length - 1)]);
            texts.splice(randomInt(0, texts.length), 0, texts[randomInt(0, texts.length - 1)]);
            --amountToAdd
        }
        let container = document.createElement('div');
        container.className = 'container';
        let answerBlock = document.createElement('div');
        answerBlock.className = 'row';
        for (let i = 1; i <= 9; i++) {
            let answer = document.createElement('div');
            answer.className = 'answer col-12 col-md-6 col-lg-4';
            let shape = shapes.shift();
            let svg = this.drawSvg(shape, i);
            let text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            text.setAttribute('font-size', 24);
            text.setAttribute('text-anchor', 'middle');
            let textPath = document.createElementNS("http://www.w3.org/2000/svg", 'textPath');
            textPath.setAttribute('href', '#line_' + i);
            textPath.setAttribute('startOffset', 140);
            textPath.innerHTML = texts.shift();
            text.appendChild(textPath);
            svg.appendChild(text);
            answer.appendChild(svg);
            if (textPath.innerHTML === mainOption || this.test[shape] === mainOption) rightAnswersAmount++;
            answer.dataset.shape = this.test[shape];
            answer.dataset.text = textPath.innerHTML;
            answer.addEventListener('click', this.cbCheckAnswer);
            answer.addEventListener('contextmenu', this.cbCheckAnswer);
            answer.addEventListener('touchstart', this.touchStart);
            answer.addEventListener('touchend', this.touchEnd);
            answerBlock.appendChild(answer);
        }
        container.appendChild(answerBlock);
        testBlock.appendChild(container);
        return [testBlock, mainOption, rightAnswersAmount]
    }


}



