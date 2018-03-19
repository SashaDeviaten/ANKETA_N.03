'use strict';

let vocabulary = ["ТАРА", "ЛИПА", "ТУРА", "ЛУЖА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ", "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"];

console.log(getChain('ружа', "слон"));
console.log(getChain('лиса', "лось"));
console.log(getChain('лось', "лиса"));
console.log(getChain('муха', "слон"));

//доп тест
/*let vocabulary=['лужа','лика','рика','рука','рупа','лупа'];
console.log(getChain('лука', "рапа"));*/

/*функция получает два слова, и строит за несколько шагов из первого слова второе, за каждый шаг меняя не более одной буквы,
так, чтобы на каждом шаге получалось допустимое слово (слово из словаря)*/
function getChain(word1, word2) {
    if (word1.length !== word2.length) return 'Слова для функции getChain() должны иметь одинаковую длину!';
    let reserve=[];
    try {
        return getThisChain(word1, word2, vocabulary)
    }
    catch (e) {
        if (e.name==='myError') return e.message;
        else throw e
    }

    function getThisChain(word1, word2, thisVocabulary) {
        let sortVocabulary = thisVocabulary.filter(function (elem) {
            return (elem !== word1)
        });
        let chain = '' + word1;
        let similarWords = getSimilarWords(word1, sortVocabulary);

        let nextWord = getWordWithMaxCoincidence(word2, similarWords);
        if (similarWords.length !== 1) {

            if (similarWords.length>1) {
                let newReserve=similarWords.filter(function (elem) {
                    return (elem !== nextWord)
                });
                reserve=reserve.concat(newReserve)
            }
            if (similarWords.length===0) {
                if (reserve.length!==0) nextWord=reserve.shift();
                else throw {message: 'Цепочку для данных слов составить не удалось',name:'myError'};
            }
        }
        if (getCoincidence(nextWord, word2) === word2.length - 1) {
            chain += '-' + nextWord + '-' + word2;
            return chain;
        }
        else return chain += '-' + getThisChain(nextWord, word2, sortVocabulary);
    }
}



//ф возвращает массив похожих слов(с расхождением в одну букву)
function getSimilarWords(word, arrOfWords) {
    let similarWords = [];
    for (let i = 0; i < arrOfWords.length; i++) {
        let count = getCoincidence(word, arrOfWords[i]);
        if (count === word.length - 1) similarWords.push(arrOfWords[i])
    }
    return similarWords
}

//ф возвращает количество совпадений букв по порядку
function getCoincidence(word1, word2) {
    word1 = word1.toLowerCase();
    word2 = word2.toLowerCase();
    let count = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] === word2[i]) count++
    }
    return count
}

function getWordWithMaxCoincidence(word, arrOfWords) {
    let count = 0;
    let wordWithMaxCoincidence = arrOfWords[0];
    for (let i = 0; i < arrOfWords.length; i++) {
        let thisCount = getCoincidence(word, arrOfWords[i]);
        if (thisCount > count) {
            count = thisCount;
            wordWithMaxCoincidence = arrOfWords[i]
        }
    }
    return wordWithMaxCoincidence
}



