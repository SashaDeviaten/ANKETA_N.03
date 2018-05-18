
'use strict';

import $ from "jquery";

const AjaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
const StringName='DEVIATEN_CRAZY_MIND_RECORDS';
let updatePassword=Math.random();
let lastRecords;
let seconds;
let userName = null;

restoreInfo();

function restoreInfo() {
    $.ajax(
        {
            url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : StringName },
            success : readReady, error : errorHandler,
        }
    );
}


function readReady(callresult) {
    if ( callresult.error!=undefined ) {
        console.log(callresult.error);
    }
    else if ( callresult.result!="" ) {
        lastRecords=JSON.parse(callresult.result);
        // console.log(lastRecords);
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}


function storeInfo(sec) {
    seconds=sec;
    // updatePassword=Math.random();
    $.ajax( {
            url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : StringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        console.log(callresult.error);
    else {
        // console.log(lastRecords.some(isRecord));
        if (lastRecords.some(isRecord) || lastRecords.length < 10){
            setTimeout(setRecord, 1000);
        }
        else {
            location.hash='Main';
            return;
        }
    }
}

function updateReady(callresult) {
    ( callresult.error!=undefined )
        ? alert(callresult.error)
        : location.hash='Records';
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

let isRecord = (V, I, A) => {return seconds < V["seconds"]};                //функция-стрелка проверки попадает ли рекорд в топ 10

function setRecord() {
    userName = prompt('Введите Ваше имя для внесения в таблицу рекордов!');
    if (!userName){
        location.hash='Main';
        return;
    }
        for (let i = 0; i <lastRecords.length; i++){
            if (seconds < lastRecords[i]["seconds"]){
                lastRecords.splice(i, 0, {name: userName, seconds: seconds });
                if (lastRecords.length > 10){
                    lastRecords.pop();
                }
                break;
            }
        }
    updateAJAX(lastRecords);
}

function updateAJAX(lastRecords){
    $.ajax( {
            url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : StringName, v : JSON.stringify(lastRecords), p : updatePassword },
            success : updateReady, error : errorHandler
        }
    );
}

export {lastRecords, storeInfo};