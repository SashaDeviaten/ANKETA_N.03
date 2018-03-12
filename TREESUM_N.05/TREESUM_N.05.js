'use strict';

function treeSum(arr) {
    let sum = 0;
    function getSumOfElement(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array)
                getSumOfElement(arr[i]);
            else sum += +arr[i]
        }
    }
    getSumOfElement(arr);
    return sum
}

let arr = [5, 7,
    [4, [2], 8, [1, 3], 2],
    [9, []],
    1, 8];
console.log(treeSum(arr));
