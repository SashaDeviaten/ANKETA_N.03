"use strict";

function randomDiap(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
    let colors = ['красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
    let msg = '';
    if (colorsCount > colors.length) {
        colorsCount = colors.length;
        msg = ' (все, что заданы)';

    }
    console.log('цветов: ' + colorsCount + msg);
    for (let i = 1; i <= colorsCount; i++) {
        let n = randomDiap(0, colors.length - 1);
        let colorName = colors.splice(n, 1);
        console.log(colorName[0]);
    }
}

mood(8);
mood(5);
