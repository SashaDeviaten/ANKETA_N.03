"use strict";

class HashStorage {

    addValue(key, value) {
        this[key] = value
    }

    getValue(key) {
        return this[key]
    }

    deleteValue(key) {
        if (key in this) {
            delete this[key];
            return true
        }
        else return false
    }

    getKeys() {
        let arrOfKeys = [];
        for (let keys in this) {
            arrOfKeys.push(keys)
        }
        return arrOfKeys
    }
}

