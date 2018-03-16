"use strict";

class HashStorage {
    constructor() {
        this.storage = {}
    }

    addValue(key, value) {
        this.storage[key] = value
    }

    getValue(key) {
        return this.storage[key]
    }

    deleteValue(key) {
        if (key in this.storage) {
            delete this.storage[key];
            return true
        }
        else return false
    }

    getKeys() {
        return Object.keys(this.storage)
    }
}

