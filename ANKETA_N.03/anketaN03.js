"use strict";
let surname = prompt('Укажите Вашу фамилию');
surname = testText(surname, 'фамилию');
let name = prompt('Укажите Ваше имя');
name = testText(name, 'имя');
let patronymic = prompt('Укажите Ваше отчество');
patronymic = testText(patronymic, 'отчество');
let age = testAge();
let gender = (confirm('Нажмите ОК, если Вы мужского пола, или Отмена, если женского')) ? 'мужской' : 'женский';
let ageInDays = getDaysInYears(age);
let ageInFiveYears = getAgeInFewYears(age, 5);
let pensioner = isPensioner(gender, age);
let text = `
    ваше ФИО: ${surname} ${name} ${patronymic}
    ваш возраст в годах: ${age}
    ваш возраст в днях: >${ageInDays}
    через 5 лет вам будет: ${ageInFiveYears}
    ваш пол: ${gender}
    вы на пенсии: ${pensioner}
    `;
alert(text);

// не использую функцию стрелку, чтобы не путаться с областью видимости функции
function getDaysInYears(years) {
    return years * 365
}

function getAgeInFewYears(age, years) {
    return +age + years
}

//льготные пенсии игнорируються
function isPensioner(gender, age) {
    if ((gender === 'мужской' && age >= 61) || (gender === 'женский' && age >= 56)) return 'да';
    else return 'нет'
}

// value указывать в винительном падеже
function testText(text, value) {
    while (!text) text = prompt('Пожалуйста, введите ' + value);
    return text
}

function testAge() {
    let age = prompt('Укажите Ваш возраст (колличество полных лет)');
    while (!isFinite(+age) || age < 0 || age > 145|| !age) age = prompt('Пожалуйста, укажите корректно Ваш возраст');
    return age
}

