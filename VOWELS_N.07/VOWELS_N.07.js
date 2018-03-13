'use strict';

let str = prompt('Введите строку');
alert(getRussianVowels(str));

function getRussianVowels(str) {
    str=str.toLowerCase();
    let russianVowels = 'аоэиуыеёюя';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (russianVowels.indexOf(str[i]) !== -1)
            ++count;
    }
    return count;
}
