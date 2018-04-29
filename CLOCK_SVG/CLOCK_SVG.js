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

let svgClockBody = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
svgClockBody.setAttribute("width", ClockBodyDiameter);
svgClockBody.setAttribute("height", ClockBodyDiameter);
svgClockBody.setAttribute("xmlns", "http://www.w3.org/2000/svg");
container.appendChild(svgClockBody);

(() => {
    let currTime = new Date();
    let milliSeconds = currTime.getMilliseconds();
    updateTime();
    setTimeout(setInterval(updateTime, 1000), 1000 - milliSeconds + 20)
})();

function drawClockBody() {
    let clockBody = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    clockBody.setAttribute("fill", "#FCCA66");
    clockBody.setAttribute("r", ClockBodyRadius);
    clockBody.setAttribute("cx", ClockBodyRadius);
    clockBody.setAttribute("cy", ClockBodyRadius);
    svgClockBody.appendChild(clockBody);

    drawHourNum()
}

function drawEClock(timeStr) {
    let eTimeBlock = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    eTimeBlock.setAttribute("x", ClockBodyRadius);
    eTimeBlock.setAttribute("width", ClockBodyDiameter);
    eTimeBlock.setAttribute("y", ClockBodyDiameter / 3);
    eTimeBlock.setAttribute("fill", "chartreuse");
    eTimeBlock.setAttribute("text-anchor", "middle");
    eTimeBlock.innerHTML=timeStr;
    svgClockBody.appendChild(eTimeBlock)
}

function drawHourNum () {
    for (let i = 1; i < 13; i++) { //12 - число часовых делений на циферблате
        let clockHour = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        clockHour.setAttribute("fill", "#48B382");
        clockHour.setAttribute("r", ClockHourRadius);
        let cx = ClockBodyRadius + (ClockBodyRadius * 0.8 * Math.sin((i * 360 / 12) / 180 * Math.PI));
        let cy = ClockBodyRadius - (ClockBodyRadius * 0.8 * Math.cos((i * 360 / 12) / 180 * Math.PI));
        clockHour.setAttribute("cx", cx);
        clockHour.setAttribute("cy", cy);
        svgClockBody.appendChild(clockHour);

        let text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.innerHTML = i.toString();
        text.setAttribute("x", cx);
        text.setAttribute("y", cy + ClockHourRadius / 2);
        text.setAttribute("text-anchor", "middle");
        svgClockBody.appendChild(text);
    }
}

function drawClockHand(value, coefficient, thickness) {
    let hand = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    let handX1 = ClockBodyRadius - (ClockBodyRadius * (coefficient * 0.08) * Math.sin((value * 360 / 60) / 180 * Math.PI));
    let handY1 = ClockBodyRadius + (ClockBodyRadius * (coefficient * 0.08) * Math.cos((value * 360 / 60) / 180 * Math.PI));
    let handX2 = ClockBodyRadius + (ClockBodyRadius * coefficient * Math.sin((value * 360 / 60) / 180 * Math.PI));
    let handY2 = ClockBodyRadius - (ClockBodyRadius * coefficient * Math.cos((value * 360 / 60) / 180 * Math.PI));
    hand.setAttribute("x1", handX1);
    hand.setAttribute("y1", handY1);
    hand.setAttribute("x2", handX2);
    hand.setAttribute("y2", handY2);
    hand.setAttribute("stroke", "black");
    hand.setAttribute("stroke-linecap", "round");
    hand.setAttribute("stroke-width", thickness);
    svgClockBody.appendChild(hand);
}

function updateTime() {
    svgClockBody.innerHTML='';
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
    drawClockHand(time.hours+time.minutes/12, HourHandLengthCoefficient, HourHandThickness);
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
