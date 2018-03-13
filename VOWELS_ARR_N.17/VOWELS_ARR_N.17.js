'use strict';

let str = prompt('Введите строку');
console.log(getRussianVowels(str));
console.log(getRussianVowels2(str));
console.log(getRussianVowels3(str));

//вариант с forEach
function getRussianVowels(str) {
    let russianVowels = 'аоэиуыеёюя';
    let count = 0;
    str.toLowerCase().split('').forEach(function (elem) {
        if (russianVowels.indexOf(elem) !== -1)
            ++count;
    });
    return count;
}

//вариант с filter
function getRussianVowels2(str) {
    let russianVowels = 'аоэиуыеёюя';
    let arr = str.toLowerCase().split('').filter(function (elem) {
        return russianVowels.indexOf(elem) + 1
    });
    return arr.length;
}

//вариант с reduce
function getRussianVowels3(str) {
    let russianVowels = 'аоэиуыеёюя';
    return str.toLowerCase().split('').reduce(function (count, elem) {
        if (russianVowels.indexOf(elem) !== -1)
            ++count;
        return count
    }, 0);
}
