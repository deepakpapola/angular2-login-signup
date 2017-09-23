import { Injectable } from '@angular/core';

@Injectable()
export class LstorageService {

    constructor( ) { }

    set(name, value) {
        let stringValue = JSON.stringify(value);
        let setVal = localStorage.setItem(`${name}`, stringValue);
        return setVal;
    }

    get(key) {
        let getValue =  JSON.parse(localStorage.getItem(key)) ;
        return getValue;
    }

    delete(key) {
        localStorage.removeItem(key);
    }
}
