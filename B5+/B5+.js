'use strict';

function buildWrapper(tag) {
    let decoder = {"'": '&apos;', '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&lt;'};
    return function (text) {
        let decodeText = '';
        for (let i = 0; i < text.length; i++) {
            if (text[i] in decoder) decodeText += decoder[text[i]];
            else decodeText += text[i]
        }
        return `<${tag}>${decodeText}</${tag}>`;
    }
}

function buildWrapper2(tag) {
    let decoder = {'&': '&amp;', "'": '&apos;', '"': '&quot;', '<': '&lt;', '>': '&lt;'};
    return function (text) {
        let thisText = text.slice();
        for (let key in decoder) {
            let reg = new RegExp('\\' + key, 'g');
//            let reg = `/\\${key}/g`;    не получается!!!!
            thisText = thisText.replace(reg, decoder[key]);
        }
        return `<${tag}>${thisText}</${tag}>`;
    }
}

let wrapH1 = buildWrapper("H1");
let wrapP = buildWrapper2("P");
console.log(wrapH1("СТИХИ"));
console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Вкусные M&M's"));
