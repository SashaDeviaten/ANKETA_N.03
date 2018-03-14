"use strict";

let drinkStorage = new HashStorage();

let newDrink = document.querySelector('#newDrink');
let drinksName_i = document.querySelector('#name_i');
let alcoholic = document.getElementsByName('alcoholic');
let recipe = document.querySelector('#recipe');
let information = document.querySelector('#information');
let msg = document.querySelector('#msg');

let drinkDescription = document.querySelector('#drinkDescription');
let drinksName_p = document.querySelector('#name_p');
let description_p = document.querySelector('#description_p');

let listOfDrinks = document.querySelector('#listOfDrinks');
let listOfDrinks_p = document.querySelector('#listOfDrinks_p');

function setDrink() {
    closeAllDiv();
    newDrink.style.display = 'block';
}

function notSaveDrink() {
    cleanNewDrink()
}

function cleanNewDrink() {
    newDrink.style.display = 'none';
    drinksName_i.value = '';
    alcoholic[0].checked = false;
    alcoholic[1].checked = false;
    recipe.value = '';
    information.value = '';
    msg.innerHTML='';
}

function saveDrink() {
    if (!testInputs()) return;

    let key = drinksName_i.value;
    let inf = {};

    if (alcoholic[0].checked) inf['алкогольный'] = 'да';
    else inf['алкогольный'] = 'нет';

    inf['рецепт'] = recipe.value;
    inf['информация'] = information.value;
    drinkStorage.addValue(key, inf);
    cleanNewDrink()
}

function getDescription() {
    closeAllDiv();
    let key = prompt('Введите название напитка');
    if (!key) return;
    if (key in drinkStorage) {
        drinkDescription.style.display = 'block';
        drinksName_p.innerHTML = key;
        description_p.innerHTML = showObjectLikeText(drinkStorage.getValue(key));
    }
    else {
        alert('Такого напитка нет')
    }
}

function showObjectLikeText(obj) {
    let text = '';
    for (let key in obj) {
        text += '' + key + ': ' + obj[key] + '<br>'
    }
    return text
}

function deleteDrink() {
    closeAllDiv();
    let key = prompt('Введите название напитка');
    drinkStorage.deleteValue(key);
}

function showListOfDrinks() {
    closeAllDiv();
    listOfDrinks.style.display = 'block';
    listOfDrinks_p.innerHTML = drinkStorage.getKeys();
}

function closeAllDiv() {
    let divs = document.querySelectorAll('div');
    divs.forEach(function (elem) {
        elem.style.display = 'none';
    })
}

function testInputs() {
    if (drinksName_i.value === '') {
        msg.innerHTML = '<br>Не введено название!';
        return false;
    }
    if (!alcoholic[0].checked && !alcoholic[1].checked) {
        msg.innerHTML = '<br>Укажите, являеться ли напиток алкогольным!';
        return false;
    }
    if (recipe.value === '') {
        msg.innerHTML = '<br>Опишите рецепт!';
        return false;
    }
    return true
}