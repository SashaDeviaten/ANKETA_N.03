"use strict";

import {mainBlock} from "./components/MainBlock";
import './components/App.css';
import {rulesBlock} from "./components/RulesBlock";
import {buildRecordBlock} from "./components/RecordsBlock";
import {buildGame} from "./components/Game";

window.onhashchange=switchToStateFromURLHash;


let SPAState={};
let app= document.getElementById('app');
app.addEventListener('contextmenu', (e)=>e.preventDefault());

function switchToStateFromURLHash() {
    let URLHash=window.location.hash;
    let stateStr=URLHash.substr(1);

    if ( stateStr!="" ) {
        let parts=stateStr.split("_");
        SPAState={ pagename: parts[0] };
    }
    else
        SPAState={pagename:'Main'};

    app.innerHTML='';
    switch ( SPAState.pagename ) {
        case 'Main':
            app.innerHTML=mainBlock;
            break;
        case 'Game':
            app.appendChild(buildGame());
            break;
        case 'Rules':
            app.appendChild(rulesBlock);
            break;
        case 'Records':
            app.appendChild(buildRecordBlock());
            break;
    }

}

switchToStateFromURLHash();