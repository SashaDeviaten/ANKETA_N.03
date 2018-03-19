'use strict';

let vocabulary = ["ТАРА", "ЛИПА", "ТУРА", "ЛУЖА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ", "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"];

console.log(getChain('лиса', "лось"));
console.log(getChain('лось', "лиса"));
console.log(getChain('муха', "слон"));
console.log(getChain('рука', "слон"));
console.log(getChain('стужа', "слон"));

//доп тест
/*let vocabulary=['лужа','лупа','рука','рупа'];
console.log(getChain('лука', "рапа"));*/

/*функция получает два слова, и строит за несколько шагов из первого слова второе, за каждый шаг меняя не более одной буквы,
так, чтобы на каждом шаге получалось допустимое слово (слово из vocabulary)*/
function getChain(firstWord, secondWord) {
    //проверка на одинаковую длину слов
    if (firstWord.length !== secondWord.length) return 'Слова для функции getChain() должны иметь одинаковую длину!';

    //исключает слово из словаря(чтобы слово попадало в цепочку лишь однажды) и оставляет слова равные заданному по длине
    let filteredVocabulary = vocabulary.filter(function (elem) {
        return (elem !== firstWord && elem.length===firstWord.length)
    });

    //массив вариантов цепочек
    let arrOfChains = [];
    getThisChain(firstWord, secondWord, filteredVocabulary, []);

    if (arrOfChains.length === 0) return `Церочку для слов ${firstWord} и ${secondWord} построить не удалось`;
    else return getMinStrInArr(arrOfChains);


    function getThisChain(word1, word2, thisVocabulary, arr) {
        let wordsArr = arr.slice();
        wordsArr.push(word1);

        let similarWords = getSimilarWords(word1, thisVocabulary);
        let filteredVocabulary = deleteArrFromArr(thisVocabulary, similarWords);

        for (let i = 0; i < similarWords.length; i++) {
            if (getCoincidence(similarWords[i], word2) === word2.length - 1) {
                wordsArr.push(similarWords[i], word2);
                let chain = wordsArr.join('-');
                arrOfChains.push(chain);
            }
            else getThisChain(similarWords[i], word2, filteredVocabulary, wordsArr);
        }

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

//ф возвращает массив arr1 исключив из него arr2
function deleteArrFromArr(arr1, arr2) {
    return arr1.filter(function (elem) {
        let flag = true;
        for (let i = 0; i < arr2.length; i++) {
            if (elem === arr2[i]) flag = false
        }
        return flag
    });
}

//ф возвращает min по длине элемент массива
function getMinStrInArr(arr) {
    let minStr = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length < minStr.length) minStr = arr[i]
    }
    return minStr
}



