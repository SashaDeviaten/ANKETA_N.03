'use strict';
//Через диаметр часов просчитываются соотношением размеры составных частей
let ClockBodyDiameter = 200;
let ClockBodyRadius = ClockBodyDiameter / 2;
let ClockHourDiameter = ClockBodyDiameter / 8;
let ClockHourRadius = ClockHourDiameter / 2;
let SecondHandLengthCoefficient = 0.8;
let MinuteHandLengthCoefficient = 0.75;
let HourHandLengthCoefficient = 0.5;
let SecondHandThickness = ClockBodyDiameter/100;
let MinuteHandThickness = ClockBodyDiameter/50;
let HourHandThickness = ClockBodyDiameter/30;

let container = document.querySelector('div.container');

let cvs = document.createElement('canvas');
cvs.setAttribute("width", ClockBodyDiameter);
cvs.setAttribute("height", ClockBodyDiameter);
let context=cvs.getContext('2d');
container.appendChild(cvs);

(() => {
    let currTime = new Date();
    let milliSeconds = currTime.getMilliseconds();
    updateTime();
    setTimeout(setInterval(updateTime, 1000), 1000 - milliSeconds + 20)
})();

function drawClockBody() {

    context.beginPath();
    context.arc(ClockBodyRadius,ClockBodyRadius, ClockBodyRadius, 0,Math.PI*2);
    context.fillStyle='#FCCA66';
    context.fill();
    drawHourNum();
    context.restore();
}

function drawEClock(timeStr) {

    context.fillStyle='chartreuse';
    context.textAlign='center';
    context.textBaseline='middle';
    context.font='normal 20px TimesNewRoman';
    context.fillText(timeStr,ClockBodyRadius,ClockBodyDiameter / 3);

}

function drawHourNum () {
    for (let i = 1; i <= 12; i++) { //12 - число часовых делений на циферблате

        let cx = ClockBodyRadius + (ClockBodyRadius * 0.8 * Math.sin((i * 360 / 12) / 180 * Math.PI));
        let cy = ClockBodyRadius - (ClockBodyRadius * 0.8 * Math.cos((i * 360 / 12) / 180 * Math.PI));

        context.beginPath();
        context.arc(cx,cy, ClockHourRadius, 0,Math.PI*2, false);
        context.fillStyle='#48B382';
        context.fill();
        context.restore();

        context.fillStyle='black';
        context.textAlign='center';
        context.textBaseline='middle';
        context.font='normal 16px TimesNewRoman';
        context.fillText(i.toString(),cx,cy);

    }
}

function drawClockHand(value, coefficient, thickness) {

    context.strokeStyle='black';
    context.lineWidth=thickness;
    context.lineCap='round';
    context.beginPath();
    let handX1 = ClockBodyRadius - (ClockBodyRadius * (coefficient * 0.08) * Math.sin((value * 360 / 60) / 180 * Math.PI));
    let handY1 = ClockBodyRadius + (ClockBodyRadius * (coefficient * 0.08) * Math.cos((value * 360 / 60) / 180 * Math.PI));
    let handX2 = ClockBodyRadius + (ClockBodyRadius * coefficient * Math.sin((value * 360 / 60) / 180 * Math.PI));
    let handY2 = ClockBodyRadius - (ClockBodyRadius * coefficient * Math.cos((value * 360 / 60) / 180 * Math.PI));
    context.moveTo(handX1,handY1);
    context.lineTo(handX2,handY2);
    context.stroke();
}

function updateTime() {
    drawClockBody();
    let currTime = new Date();
    let time = getCurrentTime(currTime);
    let currTimeStr = getCurrentTimeStr(time);
    setClockHands(time);
    drawEClock(currTimeStr)
}

function setClockHands(time) {
    drawClockHand(time.seconds, SecondHandLengthCoefficient, SecondHandThickness);
    drawClockHand(time.minutes+time.seconds/60, MinuteHandLengthCoefficient, MinuteHandThickness);
    drawClockHand(time.hours*5+time.minutes/12, HourHandLengthCoefficient, HourHandThickness);
}

function getCurrentTime(dt) {
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    return {hours, minutes, seconds}
}

function getCurrentTimeStr(time) {
    return str0l(time.hours, 2) + ':' + str0l(time.minutes, 2) + ':' + str0l(time.seconds, 2);
}

// дополняет строку val слева нулями до длины Len
function str0l(val, len) {
    let strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
}
