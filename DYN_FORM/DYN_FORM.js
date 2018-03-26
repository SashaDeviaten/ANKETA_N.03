'use strict';

let formDef1 =
    [
        {label: 'Название сайта:', kind: 'longtext', name: 'sitename'},
        {label: 'URL сайта:', kind: 'longtext', name: 'siteurl'},
        {label: 'Посетителей в сутки:', kind: 'number', name: 'visitors'},
        {label: 'E-mail для связи:', kind: 'shorttext', name: 'email'},
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{text: 'здоровье', value: 1}, {text: 'домашний уют', value: 2}, {
                text: 'бытовая техника',
                value: 3
            }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{text: 'бесплатное', value: 1}, {text: 'платное', value: 2}, {text: 'VIP', value: 3}]
        },
        {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
        {label: 'Описание сайта:', kind: 'memo', name: 'description'},
        {label: 'Опубликовать:', kind: 'submit'},
    ];

let formDef2 =
    [
        {label: 'Фамилия:', kind: 'longtext', name: 'lastname'},
        {label: 'Имя:', kind: 'longtext', name: 'firstname'},
        {label: 'Отчество:', kind: 'longtext', name: 'secondname'},
        {label: 'Возраст:', kind: 'number', name: 'age'},
        {label: 'Зарегистрироваться:', kind: 'submit'},
    ];

function buildForm(form,arr) {
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    arr.forEach(function (elem) {

        switch (elem.kind) {
            case 'combo':

                let select = document.createElement('select');
                elem.variants.forEach(function (selectElem) {
                    let option = document.createElement('option');
                    option.innerHTML = selectElem.text;
                    option.value = selectElem.value;
                    select.appendChild(option);
                });

                createRow(elem, select);

                break;
            case 'radio':

                let div = document.createElement('div');
                elem.variants.forEach(function (radioElem) {
                    let input = document.createElement('input');
                    input.type = 'radio';
                    input.name = elem.name;
                    input.value = radioElem.value;
                    div.appendChild(input);
                    let radioLabel = document.createElement('label');
                    radioLabel.innerHTML = radioElem.text;
                    div.appendChild(radioLabel);
                });

                createRow(elem, div);

                break;
            case 'check':

                let check = document.createElement('input');
                check.type = 'checkbox';


                createRow(elem, check);

                break;
            case 'memo':

                createUnitedRow(document.createTextNode(elem.label));

                let textarea = document.createElement('textarea');
                textarea.name = elem.name;
                textarea.className = elem.kind;

                createUnitedRow(textarea);

                break;
            case 'submit':

                let submit = document.createElement('input');
                submit.type = 'submit';
                submit.value = elem.label.slice(0, -1);

                createUnitedRow(submit);

                break;
            case 'longtext':
            case 'number':
            case 'shorttext':

                let input = document.createElement('input');
                input.type = 'text';

                createRow(elem, input);

                break;

            default:
                console.log(`Unknown kind ${elem.kind} of ${elem.name}`);
                break;
        }

    });
    table.appendChild(tbody);
    form.appendChild(table);

    function createRow(elem, tag) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = elem.label;
        tr.appendChild(td);
        let td2 = document.createElement('td');
        tag.className = elem.kind;
        tag.name = elem.name;
        td2.appendChild(tag);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }

    function createUnitedRow(tag) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.colSpan = 2;
        td.appendChild(tag);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}

let form1=document.createElement('form');
form1.action='http://fe.it-academy.by/TestForm.php';
buildForm(form1,formDef1);
document.body.appendChild(form1);
document.body.innerHTML+='<hr>';
let form2=document.createElement('form');
form2.action='http://fe.it-academy.by/TestForm.php';
buildForm(form2,formDef2);
document.body.appendChild(form2);