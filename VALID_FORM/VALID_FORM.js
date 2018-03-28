'use strict';
let myForm = document.forms.myForm;

let developers = myForm.querySelector('input[name="developers"]');
developers.addEventListener('blur', testTextValue);

let siteName = myForm.querySelector('input[name="siteName"]');
siteName.addEventListener('blur', testSiteName);

let siteUrl = myForm.querySelector('input[name="siteUrl"]');
siteUrl.addEventListener('blur', testUrl);

let startDate = myForm.querySelector('input[name="startDate"]');
startDate.addEventListener('blur', testStartDate);

let visitors = myForm.querySelector('input[name="visitors"]');
visitors.addEventListener('blur', testVisitors);

let email = myForm.querySelector('input[name="email"]');
email.addEventListener('blur', testEmail);

let description = myForm.querySelector('textarea[name="description"]');
description.addEventListener('blur', testTextValue);

let submitMyForm = myForm.querySelector('#submitMyForm');
submitMyForm.addEventListener('click', testForm);

let payment = document.getElementsByName('payment');
payment[0].parentNode.addEventListener('click', testPayment);

let division = myForm.querySelector('select[name="division"]');
division.addEventListener('change', testDivision);
division.addEventListener('blur', testDivision);

let votes = myForm.querySelector('input[name="votes"]');
votes.addEventListener('blur', testVotes);
votes.addEventListener('click', testVotes);

function testTextValue() {
    let warning = this.parentNode.nextSibling;
    if (warning) {
        this.parentNode.parentNode.removeChild(warning);
    }
    if (!this.value) {
        let td = document.createElement('td');
        td.className = 'warning';
        td.innerHTML = 'Поле должно быть заполнено!';
        this.parentNode.parentNode.appendChild(td)
    }
}

function createWarning(msg) {
    let td = document.createElement('td');
    td.className = 'warning';
    td.innerHTML = msg;
    this.parentNode.parentNode.appendChild(td)
}

function testSiteName() {
    testTextValue.call(this);
    if (this.value.length > 20) createWarning.call(this, 'Название не должно быть длинее 20 символов')
}

function testDivision() {
    testTextValue.call(this);
    if (this.value==0) createWarning.call(this, 'Необходимо выбрать рубрику')
}

function testUrl() {
    testTextValue.call(this);
    /*
    url должен начинаться с http:// или https:// , должен начинаться с англ.буквы либо цифры, название может разрываться точками
    в конце должен быть домен из 2-6 букв
    */
    let regexUrl = new RegExp(/^((https?):\/\/)([a-z0-9])((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})$/i);
    if (this.value && !(this.value.match(regexUrl))) createWarning.call(this, 'Некорректный URL')
}

function testStartDate() {
    testTextValue.call(this);
    //дата в формате дд.мм.гггг (разделители -/.) начиная  с 21века
    let regexDate = new RegExp(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](20)\d\d$/);
    if (this.value && !(this.value.match(regexDate))) {
        createWarning.call(this, 'Ведите дату в формате дд.мм.20гг');
        return
    }

    let startTimeBy = this.value;
    let startTime = startTimeBy.substr(6, 4) + '-' + parseInt(startTimeBy.substr(3, 2)) + '-' + startTimeBy.substr(0, 2);
    if (Date.now() > Date.parse(startTime)) createWarning.call(this, 'Ведите будущую дату');
}

function testVisitors() {
    testTextValue.call(this);

    //может принимать формы '<число' '>число' 'число' 'число-число'
    let regexAmount = new RegExp(/^(([<>]?\d+)|(\d+-\d+))$/);
    if (this.value && !(this.value.match(regexAmount))) createWarning.call(this, 'Ведите корректное число');
}

function testEmail() {
    testTextValue.call(this);

    //может содержать только англ.буквы, цифры, _ и - ,в конце домен из 2-6 букв
    let regexEmail = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
    if (this.value && !(this.value.match(regexEmail))) createWarning.call(this, 'Ведите корректный email');
}

function testVotes() {
    testTextValue.call(this);

    if(!this.checked) createWarning.call(this, 'Щелчок-разрешить, два-нет ');
    else {
        this.removeEventListener('blur', testVotes);
        this.removeEventListener('click', testVotes);
    }

}

function testPayment() {
    let flag = false;

    testTextValue.call(payment[0]);

    for (let i = 0; i < payment.length; i++) {
        if (payment[i].checked) flag = true
    }
    if (!flag) {
        createWarning.call(payment[0], 'Выберите способ размещения');
        return false
    }
    else return true
}

function testForm(e) {
    let blur = new Event("blur");
    let textInputs = [developers, siteName, siteUrl, startDate, visitors, email, division, votes, description];
    let warnings=[];
    textInputs.forEach(elem => {
            elem.dispatchEvent(blur);
            if (elem.parentNode.nextSibling) {
                e.preventDefault();
                warnings.push(elem)
            }
        }
    );

    if (!testPayment()) {
        e.preventDefault();
        if (warnings.some((elem,index) => {return ((elem===votes && index!==warnings.length-1))})) {warnings.splice(-2,0,payment[0])}
        else if (warnings.some((elem) => {return elem===description})) {warnings.splice(-1,0,payment[0])}
        else warnings.push(payment[0])
    }


    if (warnings[0]) {
        warnings[0].scrollIntoView(true);
        warnings[0].focus();
    }

}