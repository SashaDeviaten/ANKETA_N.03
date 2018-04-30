'use strict';
//Через диаметр часов просчитываются соотношением размеры составных частей
let ClockBodyDiameter = 200;
let ClockHourDiameter = ClockBodyDiameter / 8;
let SecondHandRotationRadius = ClockBodyDiameter * 0.8;
let MinuteHandRotationRadius = ClockBodyDiameter * 0.75;
let HourHandRotationRadius = ClockBodyDiameter * 0.5;
let SecondHandLength = SecondHandRotationRadius / 2 * 1.1;
let MinuteHandLength = MinuteHandRotationRadius / 2 * 1.1;
let HourHandLength = HourHandRotationRadius / 2 * 1.1;

let clockBody = document.querySelector('div.container');

clockBody.className = 'clockBody';
clockBody.style.width = ClockBodyDiameter + 'px';
clockBody.style.height = ClockBodyDiameter + 'px';

let clockAxisRotationX = clockBody.offsetWidth / 2;
let clockAxisRotationY = clockBody.offsetHeight / 2;

let eTimeBlock = document.createElement('div');
eTimeBlock.className = 'eTimeBlock';
eTimeBlock.style.top = ClockBodyDiameter * 0.25 + 'px';
clockBody.appendChild(eTimeBlock);

for (let i = 1; i <= 12; i++) { //12 - число часовых делений на циферблате
    let clockHour = document.createElement('div');
    clockHour.className = 'clockHour';
    clockHour.style.width = ClockHourDiameter + 'px';
    clockHour.style.height = ClockHourDiameter + 'px';
    clockHour.style.lineHeight = ClockHourDiameter + 'px';
    clockHour.innerHTML = i.toString();
    clockBody.appendChild(clockHour);
    let clockHourCenterX = clockAxisRotationX + ClockBodyDiameter / 2 * 0.8 * Math.sin((i * 360 / 12) / 180 * Math.PI); //0.8 - коэф. расстояния от центра до нумерации часов
    let clockHourCenterY = clockAxisRotationY - ClockBodyDiameter / 2 * 0.8 * Math.cos((i * 360 / 12) / 180 * Math.PI);
    clockHour.style.left = Math.round(clockHourCenterX - clockHour.offsetWidth / 2) + 'px';
    clockHour.style.top = Math.round(clockHourCenterY - clockHour.offsetHeight / 2) + 'px';
}

let secondHand = createClockHand('secondHand', SecondHandRotationRadius, SecondHandLength);
let minuteHand = createClockHand('minuteHand', MinuteHandRotationRadius, MinuteHandLength);
let hourHand = createClockHand('hourHand', HourHandRotationRadius, HourHandLength);

function createClockHand(name, rotationRadius, length) {
    let hand = document.createElement('div');
    hand.className = name;
    hand.style.height = rotationRadius + 'px';
    clockBody.appendChild(hand);
    hand.style.top = (ClockBodyDiameter - rotationRadius) / 2 + 'px';

    let handVisible = document.createElement('div');
    handVisible.className = name + 'Visible';
    handVisible.style.height = length + 'px';
    hand.appendChild(handVisible);

    hand.style.left = clockAxisRotationX - hand.offsetWidth / 2 + 'px';
    return hand
}

(() => {
    let currTime = new Date();
    let milliSeconds = currTime.getMilliseconds();
    updateTime();
    setTimeout(setInterval(updateTime, 1000), 1000 - milliSeconds + 20)
})();


function updateTime() {
    let currTime = new Date();
    let time = getCurrentTime(currTime);
    let currTimeStr = getCurrentTimeStr(time);
    let angles = setClockHandsAngles(time);
    setClockHands(angles);
    eTimeBlock.innerHTML = currTimeStr;
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

function setClockHandsAngles(time) {
    let secondHandAngle = 360 / 60 * time.seconds;    //360 градусов / 60 сек
    let minuteHandAngle = 360 / 60 * (time.minutes + time.seconds / 60);
    let hour;
    (time.hours > 12) ? hour = time.hours - 12 : hour = time.hours;
    let hourHandAngle = 360 / 12 * (hour + time.minutes / 60);
    return {secondHandAngle, minuteHandAngle, hourHandAngle}
}

function setClockHands(angles) {
    secondHand.style.transform = "rotate(" + angles.secondHandAngle + "deg)";
    minuteHand.style.transform = "rotate(" + angles.minuteHandAngle + "deg)";
    hourHand.style.transform = "rotate(" + angles.hourHandAngle + "deg)";
}

// дополняет строку val слева нулями до длины Len
function str0l(val, len) {
    let strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
}


