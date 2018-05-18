"use strict";
import './RecordsBlock.css';
import $ from "jquery";

const AjaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
const StringName='DEVIATEN_CRAZY_MIND_RECORDS';
let lastRecords;


function buildRecordBlock() {

    let recordsBlock = document.createElement('div');
    recordsBlock.className='recordsBlock';

    let backButton= document.createElement('div');
    backButton.className='backButton';
    backButton.innerHTML='Back to menu';
    backButton.onclick=()=> location.hash='Main';
    recordsBlock.appendChild(backButton);

    restoreInfo();

    function restoreInfo() {
        $.ajax(
            {
                url: AjaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
                data: {f: 'READ', n: StringName},
                success: readReady, error: errorHandler,
            }
        );
    }


    function readReady(callresult) {
        if (callresult.error != undefined) {
            console.log(callresult.error);
        }
        else if (callresult.result != "") {
            lastRecords = JSON.parse(callresult.result);
            buildTable(lastRecords)
        }
    }

    function errorHandler(jqXHR, statusStr, errorStr) {
        alert(statusStr + ' ' + errorStr);
    }

    function buildTable(lastRecords) {

        let recordsTable = document.createElement('table');
        lastRecords.forEach((elem,i) => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td2.className='userName';
            let td3 = document.createElement('td');
            td1.innerHTML=`${i+1}.`;
            td2.innerHTML = elem.name;
            td3.innerHTML = elem.seconds;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            recordsTable.appendChild(tr)
        });
        recordsBlock.appendChild(recordsTable);
    }


    return recordsBlock;
}
export {buildRecordBlock}