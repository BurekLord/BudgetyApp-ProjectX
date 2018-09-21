// import { formatDate } from '@angular/common';

export class Expense {
    /*fields*/
    private expenseName: string;
    private value: number;
    private category: string;
    private timeStamp: string;

    constructor(eName: string, val: number, cat: string, time: Date) {
        this.expenseName = eName;
        this.value = val;
        this.category = cat;
        // this.timeStamp = formatDate(newDate, 'dd.MM.yyyy hh:mm:ss', 'en');
    }

    /*setters*/
    public set expenseNameSet(exp: string) {
        this.expenseName = exp;
    }
    public set valueSet(val: number) {
        this.value = val;
    }
    public set categorySet(cat: string) {
        this.category = cat;
    }
    /*das mu obekat new Date() i formatira vreme i datum
    custom kao u datom stringu.
    Ne znam zasto nema ovog modula 'formatDate. Pogleaj*/

    // public set timestampSet(newDate: Date) {
    //     this.timeStamp = formatDate(newDate, 'dd.MM.yyyy hh:mm:ss', 'en');
    // }

    /*getters*/
    public get expenseNameGet() {
        return this.expenseName;
    }
    public get valueGet() {
        return this.value;
    }
    public get categoryGet() {
        return this.category;
    }
    public get timeStampGet() {
        return this.timeStamp;
    }
}
