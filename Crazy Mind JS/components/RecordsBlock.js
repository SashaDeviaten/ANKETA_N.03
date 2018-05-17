"use strict";
import './RecordsBlock.css';
import $ from "jquery";

const AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
const StringName='DEVIATEN_CRAZY_MIND_RECORDS';
let lastRecords;
let RecordsBlock = document.createElement('div');

function buildRecordBlock() {

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
        lastRecords.forEach((elem) => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td1.innerHTML = elem.name;
            td2.innerHTML = elem.seconds;
            tr.appendChild(td1);
            tr.appendChild(td2);
            recordsTable.appendChild(tr)
        });
        RecordsBlock.appendChild(recordsTable);
    }


    return RecordsBlock;
}
export {buildRecordBlock}