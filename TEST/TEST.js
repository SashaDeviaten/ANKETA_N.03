'use strict';

function squareRoots(a, b, c) {
    var d = b * b - 4 * a * c; // дискриминант

    if (a != 0) {

        if (d < 0)
            return []; // нет корней

        if (d == 0)
            return [-b / (2 * a)]; // один корень

        var x1 = (-b + Math.sqrt(d)) / (2 * a);
        var x2 = (-b - Math.sqrt(d)) / (2 * a);
        if (x1.toString()==='NaN' || x2.toString()==='NaN') return [];
         else return [x1, x2]; // два корня
    } else {
        var x = -(c / b);
        if (x.toString()==='NaN') return [];
        return [x]
    }
}

function squareRootsTests() {

    console.log('тест 1,1,1 -> нет корней');
    var roots = squareRoots(1, 1, 1);
    console.log((roots.length == 0) ? 'пройден' : 'НЕ ПРОЙДЕН!')

    console.log('тест 1,-2,-3 -> два корня 3,-1');
    var roots = squareRoots(1, -2, -3);
    console.log(((roots.length == 2) && (roots[0] == 3) && (roots[1] == -1)) ? 'пройден' : 'НЕ ПРОЙДЕН!')

    console.log('тест -1,-2,15 -> два корня -5,3');
    var roots = squareRoots(-1, -2, 15);
    console.log(((roots.length == 2) && (roots[0] == -5) && (roots[1] == 3)) ? 'пройден' : 'НЕ ПРОЙДЕН!')

    console.log('тест 1,12,36 -> один корень -6');
    var roots = squareRoots(1, 12, 36);
    console.log(((roots.length == 1) && (roots[0] == -6)) ? 'пройден' : 'НЕ ПРОЙДЕН!')

    console.log('тест 0,5,-5 -> один корень 1');
    var roots = squareRoots(0, 5, -5);
    console.log(((roots.length == 1) && (roots[0] == 1)) ? 'пройден' : 'НЕ ПРОЙДЕН!')
}

function ttt() {
    var a=Number(prompt('Введите a'));
    var b=Number(prompt('Введите b'));
    var c=Number(prompt('Введите c'));
    var roots=squareRoots(a,b,c);

    if ( !roots.length )
        alert('корней нет!');
    else if ( roots.length==1 )
        alert('один корень: '+roots[0]);
    else
        alert('два корня: '+roots[0]+' и '+roots[1]);
}


