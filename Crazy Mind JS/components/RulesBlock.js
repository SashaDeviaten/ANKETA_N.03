"use strict";
import './RulesBlock.css';

let rulesBlock = document.createElement('div');
rulesBlock.className='rulesBlock';
let backButton= document.createElement('div');
backButton.className='backButton';
backButton.innerHTML='Back to menu';
backButton.onclick=()=> location.hash='Main';
rulesBlock.appendChild(backButton);
let rules=document.createElement('div');
rules.className='rules';
rules.innerHTML='Пройди тест отвечая на вопросы и поставь рекорд. Если вариант ответа совпадают по тексту с основным параметром - кликай левой кнопкой мыщи либо жестом влево на сенсоре. Если вариант ответа совпадают по стилю с основным параметром - кликай правой кнопкой мыщи либо жестом вправо на сенсоре. У тебя есть право на три ошибки! Не дай обмануть себя! И поспеши - тест на время!'
rulesBlock.appendChild(rules);
export {rulesBlock};